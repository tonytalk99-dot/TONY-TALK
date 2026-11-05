import type { ReactNode } from 'react';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

interface StatusMessageProps {
  kind: 'success' | 'error' | 'info';
  title: string;
  children?: ReactNode;
}

export default function StatusMessage({ kind, title, children }: StatusMessageProps) {
  const Icon = kind === 'success' ? CheckCircle2 : kind === 'error' ? AlertCircle : Info;

  return (
    <div
      className={`status-message status-message--${kind}`}
      role={kind === 'error' ? 'alert' : 'status'}
      aria-live={kind === 'error' ? 'assertive' : 'polite'}
    >
      <Icon className="status-message__icon" aria-hidden="true" size={20} />
      <div>
        <strong>{title}</strong>
        {children ? <div className="status-message__body">{children}</div> : null}
      </div>
    </div>
  );
}