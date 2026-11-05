import { useState } from 'react';
import { Info } from 'lucide-react';
import PageHero from '../components/PageHero';
import ProductCard from '../components/ProductCard';
import Seo from '../components/Seo';
import { productCategoryKeys, productDirections, type ProductCategory } from '../data/products';
import { useLanguage } from '../i18n/LanguageContext';
import { formatTemplate } from '../lib/format';

type Filter = 'all' | ProductCategory;

export default function ProductsPage() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<Filter>('all');
  const filters: Filter[] = ['all', ...productCategoryKeys];
  const filteredProducts =
    filter === 'all' ? productDirections : productDirections.filter((product) => product.category === filter);

  return (
    <>
      <Seo page="products" />
      <PageHero
        eyebrow={t.products.eyebrow}
        title={t.products.title}
        intro={t.products.intro}
        currentLabel={t.nav.products}
      />

      <section className="section">
        <div className="container">
          <div className="catalog-toolbar">
            <div className="catalog-filter" role="group" aria-label={t.products.filterLabel}>
              <span className="catalog-filter__label">{t.products.filterLabel}</span>
              <div className="catalog-filter__buttons">
                {filters.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`filter-button ${filter === item ? 'filter-button--active' : ''}`}
                    aria-pressed={filter === item}
                    onClick={() => setFilter(item)}
                  >
                    {t.products.categories[item]}
                  </button>
                ))}
              </div>
            </div>
            <p className="catalog-count" aria-live="polite">
              {formatTemplate(t.products.showing, { count: filteredProducts.length })}
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="product-grid product-grid--catalog">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h2>{t.products.emptyTitle}</h2>
              <p>{t.products.emptyBody}</p>
              <button className="button button--primary" type="button" onClick={() => setFilter('all')}>
                {t.products.clearFilter}
              </button>
            </div>
          )}

          <div className="catalog-note">
            <Info aria-hidden="true" size={20} />
            <p>{t.products.footnote}</p>
          </div>
        </div>
      </section>
    </>
  );
}