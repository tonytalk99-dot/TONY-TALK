export const productCategoryKeys = ['residential', 'commercial', 'slim'] as const;
export type ProductCategory = (typeof productCategoryKeys)[number];
export type ProductVisualVariant = 'lever' | 'commercial' | 'slim';

export interface LocalizedText {
  en: string;
  zh: string;
}

export interface ProductImage {
  kind: 'concept-svg';
  variant: ProductVisualVariant;
  alt: LocalizedText;
}

export interface ProductSpecifications {
  status: 'unverified';
  items: [];
}

export interface ProductDirection {
  id: string;
  name: LocalizedText;
  category: ProductCategory;
  summary: LocalizedText;
  image: ProductImage;
  specifications: ProductSpecifications;
  verificationStatus: 'unverified';
  cta: {
    label: LocalizedText;
    intent: 'sample';
  };
}

const ctaLabel: LocalizedText = {
  en: 'Request sample / quote',
  zh: '申请样品 / 报价',
};

export const productDirections: ProductDirection[] = [
  {
    id: 'residential-smart-lever',
    name: {
      en: 'Residential Smart Lever',
      zh: '住宅智能执手锁',
    },
    category: 'residential',
    summary: {
      en: 'A category direction for residential entry doors. Access methods, materials, finish and connectivity are defined during project assessment.',
      zh: '面向住宅入户门的产品方向。开锁方式、材料、表面处理与连接能力将在项目评估中定义。',
    },
    image: {
      kind: 'concept-svg',
      variant: 'lever',
      alt: {
        en: 'Concept study of a residential smart lever lock on a door',
        zh: '住宅智能执手锁门体安装概念示意',
      },
    },
    specifications: {
      status: 'unverified',
      items: [],
    },
    verificationStatus: 'unverified',
    cta: { label: ctaLabel, intent: 'sample' },
  },
  {
    id: 'commercial-smart-lock',
    name: {
      en: 'Multi-Family & Commercial Smart Lock',
      zh: '多户住宅与商业智能门锁',
    },
    category: 'commercial',
    summary: {
      en: 'A category direction for apartment, rental and commercial access scenarios. Platform integration and project controls require technical review.',
      zh: '面向公寓、租赁与商业通行场景的产品方向。平台集成与项目控制需求需经技术评估。',
    },
    image: {
      kind: 'concept-svg',
      variant: 'commercial',
      alt: {
        en: 'Concept study of a multi-family and commercial smart lock on a door',
        zh: '多户住宅与商业智能门锁门体安装概念示意',
      },
    },
    specifications: {
      status: 'unverified',
      items: [],
    },
    verificationStatus: 'unverified',
    cta: { label: ctaLabel, intent: 'sample' },
  },
  {
    id: 'slim-frame-smart-lock',
    name: {
      en: 'Slim-Frame Smart Lock',
      zh: '窄边框智能门锁',
    },
    category: 'slim',
    summary: {
      en: 'A category direction for projects exploring narrow-profile door hardware. Installation context and structural feasibility must be confirmed.',
      zh: '面向窄型门体五金探索的产品方向。安装环境与结构可行性必须经确认。',
    },
    image: {
      kind: 'concept-svg',
      variant: 'slim',
      alt: {
        en: 'Concept study of a slim-frame smart lock on a narrow door profile',
        zh: '窄边框智能门锁窄型门体安装概念示意',
      },
    },
    specifications: {
      status: 'unverified',
      items: [],
    },
    verificationStatus: 'unverified',
    cta: { label: ctaLabel, intent: 'sample' },
  },
];

export function getProductDirection(id: string | null | undefined): ProductDirection | undefined {
  if (!id) return undefined;
  return productDirections.find((product) => product.id === id);
}