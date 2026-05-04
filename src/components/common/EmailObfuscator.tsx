'use client';

import React from 'react';

interface EmailObfuscatorProps {
  email: string;
  showIcon?: boolean;
  className?: string;
}

const EmailObfuscator: React.FC<EmailObfuscatorProps> = ({
  email,
  showIcon = true,
  className = ""
}) => {
  if (!email) return null;

  // Simple obfuscation by splitting the email
  const [user, domain] = email.split('@');

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `mailto:${user}@${domain}`;
  };

  return (
    <a
      href="#"
      onClick={handleClick}
      className={`email-obfuscator ${className}`}
      style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}
    >
      {showIcon && <i className="fa-solid fa-envelope me-2"></i>}
      <span>{user}</span>
      <span>[at]</span>
      <span>{domain}</span>
    </a>
  );
};

export default EmailObfuscator;
