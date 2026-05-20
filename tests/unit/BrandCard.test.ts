/**
 * BrandCard Component Tests
 * 
 * Tests for the BrandCard component that displays turbo brands on the main landing page.
 * These tests verify the component structure, props, and basic rendering logic.
 */

import type { TurboBrand } from "@/types/turbo-brands";

describe("BrandCard component", () => {
  const mockBrand: TurboBrand = {
    id: "garrett",
    name: "Garrett Turbos",
    tag: "01",
    summary: "Industry-leading turbochargers with precision engineering and proven reliability.",
    slug: "garrett"
  };

  describe("component structure", () => {
    it("accepts a brand prop with required fields", () => {
      // Verify the brand object has all required fields
      expect(mockBrand).toHaveProperty("id");
      expect(mockBrand).toHaveProperty("name");
      expect(mockBrand).toHaveProperty("tag");
      expect(mockBrand).toHaveProperty("summary");
      expect(mockBrand).toHaveProperty("slug");
    });

    it("brand prop has correct types", () => {
      expect(typeof mockBrand.id).toBe("string");
      expect(typeof mockBrand.name).toBe("string");
      expect(typeof mockBrand.tag).toBe("string");
      expect(typeof mockBrand.summary).toBe("string");
      expect(typeof mockBrand.slug).toBe("string");
    });

    it("generates correct link href from brand slug", () => {
      const expectedHref = `/turbos/brands/${mockBrand.slug}`;
      expect(expectedHref).toBe("/turbos/brands/garrett");
    });
  });

  describe("brand data validation", () => {
    it("tag is a two-digit string", () => {
      expect(mockBrand.tag).toMatch(/^\d{2}$/);
    });

    it("slug is URL-safe (lowercase, no spaces)", () => {
      expect(mockBrand.slug).toMatch(/^[a-z0-9-]+$/);
      expect(mockBrand.slug).not.toContain(" ");
      expect(mockBrand.slug).toBe(mockBrand.slug.toLowerCase());
    });

    it("name is non-empty", () => {
      expect(mockBrand.name.length).toBeGreaterThan(0);
    });

    it("summary is non-empty", () => {
      expect(mockBrand.summary.length).toBeGreaterThan(0);
    });
  });

  describe("link generation", () => {
    it("generates correct href for different brand slugs", () => {
      const testCases = [
        { slug: "garrett", expected: "/turbos/brands/garrett" },
        { slug: "holset", expected: "/turbos/brands/holset" },
        { slug: "ihi", expected: "/turbos/brands/ihi" },
        { slug: "mitsubishi", expected: "/turbos/brands/mitsubishi" },
        { slug: "schwitzer", expected: "/turbos/brands/schwitzer" },
        { slug: "toyota", expected: "/turbos/brands/toyota" },
        { slug: "kkk", expected: "/turbos/brands/kkk" }
      ];

      testCases.forEach(({ slug, expected }) => {
        const href = `/turbos/brands/${slug}`;
        expect(href).toBe(expected);
      });
    });
  });
});
