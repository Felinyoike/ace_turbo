import { getSessionUser, isB2B } from "@/lib/auth";
import { getOrCreateSessionId } from "@/lib/session";
import { readAppData, updateAppData, type StoredCart } from "@/lib/persistence";
import { getTurboById, isLegacyTurboId } from "@/lib/data-access";

function createCart(id: string, userId?: number): StoredCart {
  return {
    id,
    userId,
    sessionId: id,
    items: [],
    updatedAt: new Date().toISOString()
  };
}

export async function getCurrentCart() {
  const sessionId = getOrCreateSessionId();
  const user = await getSessionUser();
  const data = await readAppData();
  let cart = data.carts.find((entry) => entry.sessionId === sessionId || (user && entry.userId === user.id));
  if (!cart) {
    cart = createCart(sessionId, user?.id);
    await updateAppData((draft) => {
      draft.carts.push(cart as StoredCart);
    });
  }
  return cart;
}

export async function addCartItem(turboId: number, quantity: number) {
  const turbo = await getTurboById(turboId);
  if (!turbo) throw new Error("Turbo not found");
  const enforceStock = !isLegacyTurboId(turboId);
  if (enforceStock && turbo.stock < quantity) throw new Error(`Only ${turbo.stock} units in stock`);
  const user = await getSessionUser();
  return updateAppData((data) => {
    const sessionId = getOrCreateSessionId();
    let cart = data.carts.find((entry) => entry.sessionId === sessionId || (user && entry.userId === user.id));
    if (!cart) {
      cart = createCart(sessionId, user?.id);
      data.carts.push(cart);
    }
    const item = cart.items.find((entry) => entry.turboId === turboId);
    const newQty = item ? item.quantity + quantity : quantity;
    if (enforceStock && newQty > turbo!.stock) throw new Error(`Only ${turbo!.stock} units in stock`);
    if (item) item.quantity = newQty;
    else cart.items.push({ turboId, quantity });
    cart.updatedAt = new Date().toISOString();
    return cart;
  });
}

export async function updateCartItem(turboId: number, quantity: number) {
  const user = await getSessionUser();
  return updateAppData((data) => {
    const sessionId = getOrCreateSessionId();
    const cart = data.carts.find((entry) => entry.sessionId === sessionId || (user && entry.userId === user.id));
    if (!cart) return null;
    cart.items = cart.items
      .map((item) => (item.turboId === turboId ? { ...item, quantity } : item))
      .filter((item) => item.quantity > 0);
    cart.updatedAt = new Date().toISOString();
    return cart;
  });
}

export async function clearCart() {
  const user = await getSessionUser();
  return updateAppData((data) => {
    const sessionId = getOrCreateSessionId();
    const cart = data.carts.find((entry) => entry.sessionId === sessionId || (user && entry.userId === user.id));
    if (cart) {
      cart.items = [];
      cart.updatedAt = new Date().toISOString();
    }
    return cart || null;
  });
}

export async function buildCartView() {
  const cart = await getCurrentCart();
  const user = await getSessionUser();
  const trade = isB2B(user);
  const items = (await Promise.all(cart.items.map(async (item) => {
    const turbo = await getTurboById(item.turboId);
    if (!turbo) return null;
    const unitPrice = trade && turbo.tradePrice != null ? turbo.tradePrice : turbo.price;
    return {
      turboId: turbo.id,
      sku: turbo.sku,
      name: `${turbo.make} ${turbo.model} ${turbo.engine}`,
      quantity: item.quantity,
      unitPrice,
      lineTotal: unitPrice * item.quantity
    };
  }))).filter(Boolean);
  const total = items.reduce((sum, item) => sum + (item?.lineTotal || 0), 0);
  return { cart, items, total };
}
