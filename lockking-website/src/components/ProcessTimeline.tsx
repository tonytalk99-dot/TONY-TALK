export interface ProcessStep {
  number: string;
  title: string;
  body: string;
}

export default function ProcessTimeline({ steps, tone = 'light' }: { steps: ProcessStep[]; tone?: 'light' | 'dark' }) {
  return (
    <ol className={`process-timeline process-timeline--${tone}`}>
      {steps.map((step) => (
        <li key={step.number} className="process-step">
          <span className="process-step__number" aria-hidden="true">
            {step.number}
          </span>
          <h3>{step.title}</h3>
          <p>{step.body}</p>
        </li>
      ))}
    </ol>
  );
}