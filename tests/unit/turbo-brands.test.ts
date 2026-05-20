import { getAllBrands, getBrandBySlug, getAllBrandSlugs, TURBO_BRANDS } from "@/lib/turbo-brands";
import type { TurboBrand, TurboBrandDetail } from "@/types/turbo-brands";

describe("turbo-brands helper functions", () => {
  describe("getAllBrands", () => {
    it("returns array of 7 brands with required fields", () => {
      const brands = getAllBrands();
      
      expect(brands).toHaveLength(7);
      
      brands.forEach((brand: TurboBrand) => {
        expect(brand).toHaveProperty("id");
        expect(brand).toHaveProperty("name");
        expect(brand).toHaveProperty("tag");
        expect(brand).toHaveProperty("summary");
        expect(brand).toHaveProperty("slug");
        
        // Ensure types are correct
        expect(typeof brand.id).toBe("string");
        expect(typeof brand.name).toBe("string");
        expect(typeof brand.tag).toBe("string");
        expect(typeof brand.summary).toBe("string");
        expect(typeof brand.slug).toBe("string");
      });
    });

    it("returns simplified brand data without detailed fields", () => {
      const brands = getAllBrands();
      
      brands.forEach((brand: any) => {
        // Should NOT have detailed fields
        expect(brand).not.toHaveProperty("identificationGuide");
        expect(brand).not.toHaveProperty("dataPlateImage");
        expect(brand).not.toHaveProperty("dataPlateAlt");
        expect(brand).not.toHaveProperty("seoTitle");
        expect(brand).not.toHaveProperty("seoDescription");
      });
    });

    it("includes all expected brand names", () => {
      const brands = getAllBrands();
      const brandNames = brands.map(b => b.name);
      
      expect(brandNames).toContain("Garrett Turbos");
      expect(brandNames).toContain("Holset Turbos");
      expect(brandNames).toContain("IHI Turbos");
      expect(brandNames).toContain("Mitsubishi Turbos");
      expect(brandNames).toContain("Schwitzer Turbos");
      expect(brandNames).toContain("Toyota Turbos");
      expect(brandNames).toContain("KKK Turbos");
    });

    it("returns brands with sequential tags from 01 to 07", () => {
      const brands = getAllBrands();
      const tags = brands.map(b => b.tag).sort();
      
      expect(tags).toEqual(["01", "02", "03", "04", "05", "06", "07"]);
    });
  });

  describe("getBrandBySlug", () => {
    it("returns Garrett brand for 'garrett' slug", () => {
      const brand = getBrandBySlug("garrett");
      
      expect(brand).toBeDefined();
      expect(brand?.name).toBe("Garrett Turbos");
      expect(brand?.tag).toBe("01");
      expect(brand?.slug).toBe("garrett");
    });

    it("returns complete brand detail with all fields", () => {
      const brand = getBrandBySlug("garrett");
      
      expect(brand).toHaveProperty("id");
      expect(brand).toHaveProperty("name");
      expect(brand).toHaveProperty("tag");
      expect(brand).toHaveProperty("summary");
      expect(brand).toHaveProperty("slug");
      expect(brand).toHaveProperty("identificationGuide");
      expect(brand).toHaveProperty("dataPlateImage");
      expect(brand).toHaveProperty("dataPlateAlt");
      expect(brand).toHaveProperty("seoTitle");
      expect(brand).toHaveProperty("seoDescription");
    });

    it("returns identification guide as array of strings", () => {
      const brand = getBrandBySlug("garrett");
      
      expect(Array.isArray(brand?.identificationGuide)).toBe(true);
      expect(brand?.identificationGuide.length).toBeGreaterThan(0);
      brand?.identificationGuide.forEach((guide: string) => {
        expect(typeof guide).toBe("string");
      });
    });

    it("returns undefined for invalid slug", () => {
      const brand = getBrandBySlug("invalid-brand");
      
      expect(brand).toBeUndefined();
    });

    it("returns undefined for empty slug", () => {
      const brand = getBrandBySlug("");
      
      expect(brand).toBeUndefined();
    });

    it("is case-sensitive for slug matching", () => {
      const brand = getBrandBySlug("GARRETT");
      
      expect(brand).toBeUndefined();
    });

    it("returns correct brand for each valid slug", () => {
      const testCases = [
        { slug: "garrett", name: "Garrett Turbos", tag: "01" },
        { slug: "holset", name: "Holset Turbos", tag: "02" },
        { slug: "ihi", name: "IHI Turbos", tag: "03" },
        { slug: "mitsubishi", name: "Mitsubishi Turbos", tag: "04" },
        { slug: "schwitzer", name: "Schwitzer Turbos", tag: "05" },
        { slug: "toyota", name: "Toyota Turbos", tag: "06" },
        { slug: "kkk", name: "KKK Turbos", tag: "07" }
      ];

      testCases.forEach(({ slug, name, tag }) => {
        const brand = getBrandBySlug(slug);
        expect(brand?.name).toBe(name);
        expect(brand?.tag).toBe(tag);
        expect(brand?.slug).toBe(slug);
      });
    });

    it("returns brand with valid data plate image path", () => {
      const brand = getBrandBySlug("garrett");
      
      expect(brand?.dataPlateImage).toMatch(/^\/images\/turbo-brands\/.+\.(jpg|png|jpeg)$/);
    });

    it("returns brand with non-empty alt text", () => {
      const brand = getBrandBySlug("garrett");
      
      expect(brand?.dataPlateAlt).toBeTruthy();
      expect(brand?.dataPlateAlt.length).toBeGreaterThan(0);
    });

    it("returns brand with SEO metadata", () => {
      const brand = getBrandBySlug("garrett");
      
      expect(brand?.seoTitle).toBeTruthy();
      expect(brand?.seoTitle).toContain("Garrett");
      expect(brand?.seoDescription).toBeTruthy();
      expect(brand?.seoDescription.length).toBeGreaterThan(0);
    });
  });

  describe("getAllBrandSlugs", () => {
    it("returns array of 7 slugs", () => {
      const slugs = getAllBrandSlugs();
      
      expect(slugs).toHaveLength(7);
    });

    it("returns all expected slugs", () => {
      const slugs = getAllBrandSlugs();
      
      expect(slugs).toContain("garrett");
      expect(slugs).toContain("holset");
      expect(slugs).toContain("ihi");
      expect(slugs).toContain("mitsubishi");
      expect(slugs).toContain("schwitzer");
      expect(slugs).toContain("toyota");
      expect(slugs).toContain("kkk");
    });

    it("returns only string values", () => {
      const slugs = getAllBrandSlugs();
      
      slugs.forEach((slug: string) => {
        expect(typeof slug).toBe("string");
      });
    });

    it("returns slugs that match brand slugs in TURBO_BRANDS", () => {
      const slugs = getAllBrandSlugs();
      const expectedSlugs = TURBO_BRANDS.map(b => b.slug);
      
      expect(slugs).toEqual(expectedSlugs);
    });

    it("returns URL-safe slugs (lowercase, no spaces)", () => {
      const slugs = getAllBrandSlugs();
      
      slugs.forEach((slug: string) => {
        expect(slug).toMatch(/^[a-z0-9-]+$/);
        expect(slug).not.toContain(" ");
        expect(slug).not.toContain("_");
        expect(slug).toBe(slug.toLowerCase());
      });
    });
  });

  describe("TURBO_BRANDS data integrity", () => {
    it("has exactly 7 brands", () => {
      expect(TURBO_BRANDS).toHaveLength(7);
    });

    it("has unique IDs for all brands", () => {
      const ids = TURBO_BRANDS.map(b => b.id);
      const uniqueIds = new Set(ids);
      
      expect(uniqueIds.size).toBe(TURBO_BRANDS.length);
    });

    it("has unique slugs for all brands", () => {
      const slugs = TURBO_BRANDS.map(b => b.slug);
      const uniqueSlugs = new Set(slugs);
      
      expect(uniqueSlugs.size).toBe(TURBO_BRANDS.length);
    });

    it("has unique tags for all brands", () => {
      const tags = TURBO_BRANDS.map(b => b.tag);
      const uniqueTags = new Set(tags);
      
      expect(uniqueTags.size).toBe(TURBO_BRANDS.length);
    });

    it("has non-empty identification guides for all brands", () => {
      TURBO_BRANDS.forEach((brand: TurboBrandDetail) => {
        expect(brand.identificationGuide).toBeTruthy();
        expect(brand.identificationGuide.length).toBeGreaterThan(0);
      });
    });

    it("has valid image paths for all brands", () => {
      TURBO_BRANDS.forEach((brand: TurboBrandDetail) => {
        expect(brand.dataPlateImage).toMatch(/^\/images\/turbo-brands\/.+\.(jpg|png|jpeg)$/);
      });
    });

    it("has non-empty alt text for all brands", () => {
      TURBO_BRANDS.forEach((brand: TurboBrandDetail) => {
        expect(brand.dataPlateAlt).toBeTruthy();
        expect(brand.dataPlateAlt.length).toBeGreaterThan(0);
      });
    });

    it("has SEO metadata for all brands", () => {
      TURBO_BRANDS.forEach((brand: TurboBrandDetail) => {
        expect(brand.seoTitle).toBeTruthy();
        expect(brand.seoTitle.length).toBeGreaterThan(0);
        expect(brand.seoDescription).toBeTruthy();
        expect(brand.seoDescription.length).toBeGreaterThan(0);
      });
    });
  });
});
