"use client";

import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    turnstile: {
      render: (container: string | HTMLElement, options: {
        sitekey: string;
        callback?: (token: string) => void;
        'expired-callback'?: () => void;
        'error-callback'?: () => void;
        theme?: 'light' | 'dark' | 'auto';
      }) => string | undefined;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

interface TurnstileProps {
  onVerify: (token: string) => void;
  sitekey: string;
}

const Turnstile: React.FC<TurnstileProps> = ({ onVerify, sitekey }) => {
  const ref = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const renderWidget = () => {
      if (container && container.children.length === 0) {
        const widgetId = window.turnstile.render(container, {
          sitekey: sitekey,
          callback: onVerify,
          theme: 'dark',
        });
        widgetIdRef.current = widgetId || null;
      }
    };

    const scriptId = 'cf-turnstile-script';
    if (document.getElementById(scriptId)) {
      if (window.turnstile) {
        renderWidget();
      }
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback';
    script.async = true;
    script.defer = true;
    
    (window as any).onloadTurnstileCallback = () => {
      renderWidget();
    };

    document.head.appendChild(script);

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
      // Clean up the container in case the widget wasn't fully removed
      if (container) {
          container.innerHTML = '';
      }
    };
  }, [sitekey, onVerify]);

  return <div ref={ref} />;
};

export default Turnstile;
