'use client';

import { useEffect, useRef, useState } from 'react';
import {
  LEAD_INTERESTS,
  LEAD_INTEREST_PLACEHOLDER,
  leadInterestLabel,
  type LeadInterest,
} from '@/lib/leadInterest';

type Props = {
  value: LeadInterest | '';
  onChange: (value: LeadInterest) => void;
  /** Shown under the field, e.g. when the visitor submits without choosing. */
  error?: string;
};

/**
 * "What brings you here today?" - a custom dropdown (it bypasses the theme's
 * nice-select). Shows the label; hands the value (the lead type, `Borrower` / `Partner`) up.
 */
export default function InterestSelect({ value, onChange, error }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <>
      <div className={`contact-interest-group${open ? ' open' : ''}`} ref={ref}>
        <div
          className={`contact-interest-trigger${value ? ' has-value' : ''}${error ? ' is-invalid' : ''}`}
          onClick={() => setOpen((prev) => !prev)}
        >
          <i className="fa-light fa-circle-question"></i>
          <span className="contact-interest-trigger-text">{leadInterestLabel(value) ?? LEAD_INTEREST_PLACEHOLDER}</span>
          <i className={`fa-light fa-chevron-down contact-interest-chevron${open ? ' rotated' : ''}`}></i>
        </div>
        {open && (
          <div className="contact-interest-dropdown">
            {LEAD_INTERESTS.map((option) => (
              <div
                key={option.value}
                className={`contact-interest-dropdown-item${value === option.value ? ' active' : ''}`}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                {value === option.value && <i className="fa-solid fa-check"></i>}
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && (
        <div className="invalid-feedback d-block mb-3" role="alert">
          {error}
        </div>
      )}
    </>
  );
}
