import type { SVGProps } from "react";

export function WordpressIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm5.06 10.63c-.15 2.33-1.04 4.35-2.67 6.06c-1.2 1.29-2.73 1.94-4.39 1.94s-3.19-.65-4.39-1.94c-1.63-1.71-2.52-3.73-2.67-6.06c-.04-.42-.06-.89-.06-1.41c0-2.53.64-4.74 1.92-6.64c1.28-1.9 3.02-2.85 5.22-2.85s3.94.95 5.22 2.85c1.28 1.9 1.92 4.11 1.92 6.64c0 .52-.02 1.13-.06 1.41zM8.04 15h2.13l1.1-2.7l1.24 3.1h2.13L12.53 11.23L15 6.4h-2.13l-1.6 4.1l-1.1-2.73l-2.13 8.63z"
      ></path>
    </svg>
  );
}
