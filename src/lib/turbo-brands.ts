/**
 * Turbo Brands Data
 * 
 * This file contains comprehensive data for all turbocharger brands,
 * including identification guides, data plate images, and SEO metadata.
 */

export interface TurboBrand {
  id: string;
  name: string;
  tag: string;
  summary: string;
  slug: string;
}

export interface TurboBrandDetail extends TurboBrand {
  identificationGuide: string[];
  dataPlateImage: string;
  dataPlateAlt: string;
  seoTitle: string;
  seoDescription: string;
}

export const TURBO_BRANDS: TurboBrandDetail[] = [
  {
    id: "garrett",
    name: "Garrett Turbos",
    tag: "01",
    summary: "Industry-leading turbochargers with precision engineering and proven reliability across automotive and commercial applications.",
    slug: "garrett",
    identificationGuide: [
      "Garrett part numbers can be found on a machined surface on the compressor housing.",
      "They consist of a six digit number beginning with a 7 (eg - 753420-0012) or a 4 (454135-5001S) followed by a dash and then 2 to 4 more numbers.",
      "This will be in the bottom left hand corner of the rectangle. In some instance there will be a plate that is riveted on. In this case the part number will be in the centre of the plate."
    ],
    dataPlateImage: "/images/turbo-brands/garrett-dataplate.png",
    dataPlateAlt: "Garrett turbo data plate location diagram showing part number on compressor housing",
    seoTitle: "Garrett Turbos | Ace Turbo — Part Number Identification Guide",
    seoDescription: "Learn how to identify Garrett turbo part numbers. Find the data plate location on the compressor housing and decode the numbering system for accurate turbo identification."
  },
  {
    id: "holset",
    name: "Holset Turbos",
    tag: "02",
    summary: "Premium turbochargers designed for heavy-duty diesel engines, known for durability and performance in commercial vehicles.",
    slug: "holset",
    identificationGuide: [
      "A data plate is fitted to the compressor housing of your Holset turbocharger or actuator.",
      "This contains the information needed for parts and service assistance."
    ],
    dataPlateImage: "/images/turbo-brands/holset-dataplate.png",
    dataPlateAlt: "Holset turbo data plate location diagram on compressor housing",
    seoTitle: "Holset Turbos | Ace Turbo — Part Number Identification Guide",
    seoDescription: "Identify Holset turbo part numbers using the data plate on the compressor housing. Complete guide for finding the correct turbo number for your vehicle."
  },
  {
    id: "ihi",
    name: "IHI Turbos",
    tag: "03",
    summary: "Japanese-engineered turbochargers offering exceptional quality and performance for a wide range of automotive applications.",
    slug: "ihi",
    identificationGuide: [
      "IHI part numbers can be found on the compressor housing.",
      "The part number will be highlighted as 'Turbo Spec' and should begin 'VJ' or 'VV' followed by two numbers."
    ],
    dataPlateImage: "/images/turbo-brands/ihi-dataplate.jpg",
    dataPlateAlt: "IHI turbo data plate showing Turbo Spec part number on compressor housing",
    seoTitle: "IHI Turbos | Ace Turbo — Part Number Identification Guide",
    seoDescription: "Find IHI turbo part numbers on the compressor housing. Learn to identify Turbo Spec numbers beginning with VJ or VV for accurate turbo identification."
  },
  {
    id: "mitsubishi",
    name: "Mitsubishi Turbos",
    tag: "04",
    summary: "High-performance turbochargers from a trusted automotive manufacturer, delivering reliability and efficiency.",
    slug: "mitsubishi",
    identificationGuide: [
      "Mitsubishi part numbers can be found on the machined surface on the compressor housing.",
      "The part number will consist of two groups of 5 numbers, the first group beginning with a 4 and the second group beginning with a 0. An example of this would be 49173-07507.",
      "In some cases the number will be on a plate which has been riveted on the compressor housing. There may also be the possibility that the first two digits (49) will be absent."
    ],
    dataPlateImage: "/images/turbo-brands/mitsubishi-dataplate.jpg",
    dataPlateAlt: "Mitsubishi turbo data plate location showing part number format on compressor housing",
    seoTitle: "Mitsubishi Turbos | Ace Turbo — Part Number Identification Guide",
    seoDescription: "Identify Mitsubishi turbo part numbers on the compressor housing. Learn the two-group numbering format for accurate turbo identification."
  },
  {
    id: "schwitzer",
    name: "Schwitzer Turbos",
    tag: "05",
    summary: "Robust turbochargers engineered for heavy-duty applications, trusted in commercial and industrial sectors.",
    slug: "schwitzer",
    identificationGuide: [
      "Look for the identification name plate of the turbo, which you can usually find on the body of the turbo or on the inlet plate, held by 2 clinches.",
      "Once you find the identification name plate there are several possibilities:",
      "1. On the name plate there is a Schwitzer part number, usually (directly after the p/n or part number), where the turbo is already identified.",
      "2. Only the O.E.M. part number (that of the maker of the engine) appears on the name plate, this is normally the case with CATERPILLAR, DETROIT DIESEL, JOHN DEERE, PERKINS and K.H.DEUTZ, this is why we need to search for the crossing using the search of this Web site, introducing the O.E.M. part number and searching by O.E.M. part number (it should maintain the same style with spaces, hyphens, etc...)."
    ],
    dataPlateImage: "/images/turbo-brands/schwitzer-dataplate.png",
    dataPlateAlt: "Schwitzer turbo identification name plate location on turbo body or inlet plate",
    seoTitle: "Schwitzer Turbos | Ace Turbo — Part Number Identification Guide",
    seoDescription: "Find Schwitzer turbo part numbers on the identification name plate. Learn to identify both Schwitzer and O.E.M. part numbers for accurate turbo identification."
  },
  {
    id: "toyota",
    name: "Toyota Turbos",
    tag: "06",
    summary: "OEM turbochargers designed specifically for Toyota vehicles, ensuring perfect fit and optimal performance.",
    slug: "toyota",
    identificationGuide: [
      "In the old TOYOTA turbos, the turbo part number comes with a sticker stuck to the turbo actuator, although in the present turbos it is placed on the compressor housing.",
      "If the part number appears on the actuator you will see 5 numbers, for example: 54090, to complete the part number you just have to add in front 17201, to make the complete part number, 17201-54090. For the newer turbos the compete part number appears on the compressor housing next to the serial number.",
      "In the case that the sticker is lost or missing you must try to identify the turbo searching for the part number inscription on the turbine housing, this is a 5 digit number like 54030 (Note: This is not the turbo part number, just the number of the turbine housing). Contact us with the turbine housing part number and we will try to identify the turbo."
    ],
    dataPlateImage: "/images/turbo-brands/toyota-dataplate.png",
    dataPlateAlt: "Toyota turbo part number location on actuator sticker or compressor housing",
    seoTitle: "Toyota Turbos | Ace Turbo — Part Number Identification Guide",
    seoDescription: "Identify Toyota turbo part numbers on the actuator or compressor housing. Learn the numbering format for both old and new Toyota turbochargers."
  },
  {
    id: "kkk",
    name: "KKK Turbos",
    tag: "07",
    summary: "German-engineered turbochargers with distinctive blue identification plates, known for quality and performance.",
    slug: "kkk",
    identificationGuide: [
      "KKK part numbers can be found on a very distinctive blue plate which is riveted onto the compressor housing.",
      "The part number will be on the bottom row of numbers on the plate. An example of this would be 5304-970-0023. They also come in an abbreviated style such as KP04-0055 or BV04-023.",
      "Look for the name plate of the turbo. In the old series like 3LD, 4LF you can usually find the identification name plate on the bearing housing of the turbo or on the compressor housing, held by 2 screws. Although in the K series the name plate usually appears on the compressor housing, and in the new series KP and BV the identification name plate only appears in the compressor housing.",
      "Once you find the name plate there are several possibilities. In the name plate appears the 3K part number, usually directly after the 'p/n' or 'part number' inscription, which already identifies the turbo for us.",
      "In some of the K0 and KP the part numbers appear abbreviated, see the examples below: K03-011 = 5303-988-0011, K031-014 = 5303-988-0014, KP31-002 = 5431-988-0002, KP35-000 = 5435-988-0000, KP39-007 = 5439-988-0007."
    ],
    dataPlateImage: "/images/turbo-brands/kkk-dataplate.png",
    dataPlateAlt: "KKK turbo distinctive blue identification plate on compressor housing showing part number",
    seoTitle: "KKK Turbos | Ace Turbo — Part Number Identification Guide",
    seoDescription: "Identify KKK turbo part numbers on the distinctive blue plate. Learn the numbering format including abbreviated styles for accurate turbo identification."
  }
];

/**
 * Get all brands for the main landing page
 * Returns simplified brand data without detailed identification guides
 */
export function getAllBrands(): TurboBrand[] {
  return TURBO_BRANDS.map(({ id, name, tag, summary, slug }) => ({
    id,
    name,
    tag,
    summary,
    slug
  }));
}

/**
 * Get a single brand by its slug
 * Returns complete brand data including identification guide
 */
export function getBrandBySlug(slug: string): TurboBrandDetail | undefined {
  return TURBO_BRANDS.find(brand => brand.slug === slug);
}

/**
 * Get all brand slugs for static generation
 * Used by Next.js generateStaticParams
 */
export function getAllBrandSlugs(): string[] {
  return TURBO_BRANDS.map(brand => brand.slug);
}
