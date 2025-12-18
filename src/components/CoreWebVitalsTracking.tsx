'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function CoreWebVitalsTracking() {
  useReportWebVitals((metric) => {
    // Only track in production and if Google Analytics is available
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    // Send to Google Analytics if available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_category: 'Web Vitals',
        event_label: metric.id,
        non_interaction: true,
      });
    }
  });

  return null;
}
