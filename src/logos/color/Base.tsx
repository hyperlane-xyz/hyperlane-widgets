import * as React from 'react';
import { SVGProps } from 'react';

const SvgBase = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1200"
    height="1200"
    viewBox="0 0 1200 1200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clip-path="url(#clip0_1967_68)">
      <circle cx="600" cy="600" r="600" fill="#0052FF" />
      <circle cx="600" cy="600" r="423" fill="white" />
      <rect x="177" y="565" width="637" height="70" fill="#0052FF" />
    </g>
    <defs>
      <clipPath id="clip0_1967_68">
        <rect width="1200" height="1200" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgBase;
