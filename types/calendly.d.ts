interface Calendly {
  initInlineWidget: (options: {
    url: string;
    parentElement: HTMLElement;
    prefill?: Record<string, any>;
    utm?: Record<string, any>;
  }) => void;
}

interface Window {
  Calendly: Calendly;
}
