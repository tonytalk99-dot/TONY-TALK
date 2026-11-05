import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { ProductDirection } from '../data/products';
import { useLanguage } from '../i18n/LanguageContext';
import ProductVisual from './ProductVisual';

export default function ProductCard({ product }: { product: ProductDirection }) {
  const { language, t } = useLanguage();
  const categoryLabel = t.products.categories[product.category];

  return (
    <article className="product-card">
      <ProductVisual
        variant={product.image.variant}
        ariaLabel={product.image.alt[language]}
        label={t.common.conceptStudy}
      />
      <div className="product-card__body">
        <span className="product-card__category">{categoryLabel}</span>
        <h3>{product.name[language]}</h3>
        <p>{product.summary[language]}</p>
        <div className="product-card__verification">
          <span>{t.products.verificationLabel}</span>
          <strong>{t.products.verificationValue}</strong>
        </div>
        {product.specifications.status === 'unverified' ? (
          <p className="product-card__spec">{t.products.specOnRequest}</p>
        ) : null}
        <Link
          className="button button--dark product-card__cta"
          to={`/contact?intent=${product.cta.intent}&product=${encodeURIComponent(product.id)}`}
        >
          {product.cta.label[language]}
          <ArrowUpRight aria-hidden="true" size={17} />
        </Link>
      </div>
    </article>
  );
}