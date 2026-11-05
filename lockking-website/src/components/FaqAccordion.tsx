import { useId, useState } from 'react';
import { Plus } from 'lucide-react';

export interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqAccordion({ items, idPrefix }: { items: FaqItem[]; idPrefix: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const generatedId = useId().replaceAll(':', '');

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${idPrefix}-${generatedId}-button-${index}`;
        const panelId = `${idPrefix}-${generatedId}-panel-${index}`;

        return (
          <div className={`faq-item ${isOpen ? 'faq-item--open' : ''}`} key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                className="faq-item__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span>{item.question}</span>
                <Plus className="faq-item__icon" aria-hidden="true" size={20} />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="faq-item__panel"
              hidden={!isOpen}
            >
              <p>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}