/**
 * Type definitions for Turbo Brands Finder feature
 * 
 * These types define the structure for turbocharger brand data used in:
 * - Main brands landing page (/turbos/brands)
 * - Individual brand detail pages (/turbos/brands/[brand-name])
 */

/**
 * Base turbo brand information displayed on brand cards
 * Used on the main brands landing page
 */
export type TurboBrand = {
  /** Unique identifier (e.g., "garrett") */
  id: string;
  /** Display name (e.g., "Garrett Turbos") */
  name: string;
  /** Numeric tag for card display (e.g., "01") */
  tag: string;
  /** Brief description for card summary */
  summary: string;
  /** URL-safe slug for routing */
  slug: string;
};

/**
 * Extended turbo brand information with identification details
 * Used on individual brand detail pages
 */
export type TurboBrandDetail = TurboBrand & {
  /** Array of guide paragraphs explaining how to identify part numbers */
  identificationGuide: string[];
  /** Path to data plate image (e.g., "/images/turbo-brands/garrett-dataplate.jpg") */
  dataPlateImage: string;
  /** Alt text for data plate image for accessibility */
  dataPlateAlt: string;
  /** Page title for SEO */
  seoTitle: string;
  /** Meta description for SEO */
  seoDescription: string;
};
