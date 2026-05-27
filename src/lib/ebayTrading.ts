import axios from "axios";
import { nextId, updateAppData } from "@/lib/persistence";
import { sanitizeText } from "@/lib/sanitize";
import { sanitizePartNumber } from "@/lib/sanitize-strings";
import { getValidAccessToken, isEbayConnected } from "@/lib/ebayAuth";

const API_URL = process.env.EBAY_SANDBOX === "true"
  ? "https://api.sandbox.ebay.com/ws/api.dll"
  : "https://api.ebay.com/ws/api.dll";

const SITE_ID = "3"; // UK

const CATEGORY_IDS = {
  Turbo: "174916",
  CHRA: "174917"
};

const CONDITION_IDS = {
  New: "1000",
  Remanufactured: "2000",
  Used: "3000"
};

export type EbayListingInput = {
  turboId?: number;
  listingType: "Turbo" | "CHRA";
  title: string;
  turboNumber: string;
  description: string;
  price: number;
  condition: "New" | "Remanufactured" | "Used";
  quantity?: number;
};

function buildAddItemXml(input: EbayListingInput, authToken: string): string {
  const categoryId = CATEGORY_IDS[input.listingType];
  const conditionId = CONDITION_IDS[input.condition];
  const qty = input.quantity || 1;

  return `<?xml version="1.0" encoding="utf-8"?>
<AddItemRequest xmlns="urn:ebay:apis:eBLBaseComponents">
  <RequesterCredentials>
    <eBayAuthToken>${authToken}</eBayAuthToken>
  </RequesterCredentials>
  <ErrorLanguage>en_GB</ErrorLanguage>
  <WarningLevel>High</WarningLevel>
  <Item>
    <Title>${escapeXml(input.title)}</Title>
    <Description><![CDATA[${input.description}]]></Description>
    <PrimaryCategory>
      <CategoryID>${categoryId}</CategoryID>
    </PrimaryCategory>
    <StartPrice currencyID="GBP">${input.price.toFixed(2)}</StartPrice>
    <ConditionID>${conditionId}</ConditionID>
    <Country>GB</Country>
    <Currency>GBP</Currency>
    <DispatchTimeMax>3</DispatchTimeMax>
    <ListingDuration>GTC</ListingDuration>
    <ListingType>FixedPriceItem</ListingType>
    <Quantity>${qty}</Quantity>
    <ShippingDetails>
      <ShippingType>Flat</ShippingType>
      <ShippingServiceOptions>
        <ShippingServicePriority>1</ShippingServicePriority>
        <ShippingService>UK_RoyalMailSecondClassStandard</ShippingService>
        <ShippingServiceCost currencyID="GBP">0.00</ShippingServiceCost>
        <FreeShipping>true</FreeShipping>
      </ShippingServiceOptions>
    </ShippingDetails>
    <ReturnPolicy>
      <ReturnsAcceptedOption>ReturnsAccepted</ReturnsAcceptedOption>
      <RefundOption>MoneyBack</RefundOption>
      <ReturnsWithinOption>Days_30</ReturnsWithinOption>
      <ShippingCostPaidByOption>Buyer</ShippingCostPaidByOption>
    </ReturnPolicy>
    <ItemSpecifics>
      <NameValueList>
        <Name>Part Number</Name>
        <Value>${escapeXml(input.turboNumber)}</Value>
      </NameValueList>
      <NameValueList>
        <Name>Type</Name>
        <Value>${input.listingType === "CHRA" ? "CHRA Cartridge" : "Turbocharger"}</Value>
      </NameValueList>
    </ItemSpecifics>
  </Item>
</AddItemRequest>`;
}

function escapeXml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

function getApiHeaders(callName: string) {
  return {
    "X-EBAY-API-COMPATIBILITY-LEVEL": "967",
    "X-EBAY-API-CALL-NAME": callName,
    "X-EBAY-API-SITEID": SITE_ID,
    "X-EBAY-API-APP-NAME": process.env.EBAY_APP_ID || "",
    "X-EBAY-API-DEV-NAME": process.env.EBAY_DEV_ID || "",
    "X-EBAY-API-CERT-NAME": process.env.EBAY_CERT_ID || "",
    "Content-Type": "text/xml"
  };
}

export async function submitEbayListing(input: EbayListingInput) {
  const draft = await updateAppData((data) => {
    const created = {
      id: nextId(data.ebayListings),
      turboId: input.turboId,
      listingType: input.listingType,
      title: sanitizeText(input.title, 80),
      turboNumber: sanitizePartNumber(input.turboNumber),
      status: "draft" as const,
      createdAt: new Date().toISOString()
    };
    data.ebayListings.push(created);
    return created;
  });

  const connected = await isEbayConnected();
  if (!connected) {
    return { ...draft, status: "draft" as const, ready: false };
  }

  try {
    const authToken = await getValidAccessToken();
    const xml = buildAddItemXml(input, authToken);

    const response = await axios.post(API_URL, xml, {
      headers: getApiHeaders("AddItem")
    });

    const responseXml = response.data as string;
    const itemIdMatch = responseXml.match(/<ItemID>(\d+)<\/ItemID>/);
    const ackMatch = responseXml.match(/<Ack>(Success|Warning)<\/Ack>/);

    if (!ackMatch) {
      const errorMatch = responseXml.match(/<ShortMessage>(.*?)<\/ShortMessage>/);
      throw new Error(errorMatch?.[1] || "eBay returned an error");
    }

    const ebayItemId = itemIdMatch?.[1] || "";

    await updateAppData((data) => {
      const listing = data.ebayListings.find((entry) => entry.id === draft.id);
      if (listing) {
        listing.status = "submitted";
        listing.ebayItemId = ebayItemId;
      }
    });

    return { ...draft, status: "submitted" as const, ebayItemId };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    await updateAppData((data) => {
      const listing = data.ebayListings.find((entry) => entry.id === draft.id);
      if (listing) listing.status = "failed";
    });
    return { ...draft, status: "failed" as const, error: errorMsg };
  }
}
