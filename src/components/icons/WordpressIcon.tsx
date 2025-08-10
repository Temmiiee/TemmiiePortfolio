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
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-2.6 12.32L7.54 6.8h2.3l1.18 4.34l.44 1.73l.42-1.73L13.12 6.8h2.3l-1.86 7.52l-1.44-3.23l-1.32 3.23z"
      ></path>
    </svg>
  );
}
