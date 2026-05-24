"use client";

import React, { useState, useRef, useEffect } from 'react';

interface SearchableSelectProps {
  name: string;
  options: string[];           // first item is the placeholder, e.g. "Select Industry"
  value: string;
  onChange: (name: string, value: string) => void;
  required?: boolean;
  invalid?: boolean;
}

export default function SearchableSelect({
  name,
  options,
  value,
  onChange,
  required = false,
  invalid = false,
}: SearchableSelectProps) {
  const placeholder = options[0];                  // e.g. "Select Industry"
  const choices = options.slice(1);               // actual selectable options

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = choices.filter(o =>
    o.toLowerCase().includes(search.toLowerCase())
  );

  const displayLabel = value || placeholder;

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Reset search when props change
  useEffect(() => {
    setTimeout(() => setSearch(''), 0);
  }, [options, name, value]);

  // Debug invalid state
  useEffect(() => {
    if (invalid) {
      console.log(`[SearchableSelect:${name}] RECEIVED invalid=true prop`);
    }
  }, [name, invalid]);

  // Focus search input when opened
  useEffect(() => {
    if (open && searchRef.current) {
      searchRef.current.focus();
    }
  }, [open]);

  const handleSelect = (opt: string) => {
    onChange(name, opt);
    setOpen(false);
    setSearch('');
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(name, '');
    setSearch('');
  };

  return (
    <div
      ref={containerRef}
      className={`ss-wrapper${invalid ? ' prequal-error' : ''}`}
    >
      {/* Hidden native select for form submission */}
      <select
        name={name}
        value={value}
        onChange={() => {}}
        tabIndex={-1}
        aria-hidden="true"
        className="ss-hidden-select"
      >
        <option value="">{placeholder}</option>
        {choices.map(o => <option key={o} value={o}>{o}</option>)}
      </select>

      {/* Trigger */}
      <div
        className={`ss-trigger${open ? ' ss-open' : ''}${!value ? ' ss-placeholder' : ''}`}
        onClick={() => setOpen(prev => !prev)}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls="ss-dropdown-list"
        tabIndex={0}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setOpen(prev => !prev); }}
      >
        <span className="ss-trigger-label">{displayLabel}</span>
        <span className="ss-trigger-icons">
          {value && (
            <span className="ss-clear" onClick={handleClear} title="Clear">✕</span>
          )}
          <span className={`ss-chevron${open ? ' ss-chevron-up' : ''}`}>▾</span>
        </span>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="ss-dropdown" role="listbox" id="ss-dropdown-list">
          <div className="ss-search-wrap">
            <span className="ss-search-icon">🔍</span>
            <input
              ref={searchRef}
              type="text"
              className="ss-search"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onClick={e => e.stopPropagation()}
            />
          </div>
          <ul className="ss-list">
            {filtered.length > 0 ? (
              filtered.map(opt => (
                <li
                  key={opt}
                  className={`ss-option${opt.trim() === value.trim() ? ' ss-selected' : ''}`}
                  onClick={() => handleSelect(opt)}
                  role="option"
                  aria-selected={opt.trim() === value.trim()}
                >
                  {opt}
                  {opt.trim() === value.trim() && <span className="ss-check"><i className="fas fa-check"></i></span>}
                </li>
              ))
            ) : (
              <li className="ss-no-results">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
