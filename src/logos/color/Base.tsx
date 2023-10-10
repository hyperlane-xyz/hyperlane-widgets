import * as React from 'react';
import { SVGProps } from 'react';

const SvgBase = (props: SVGProps<SVGSVGElement>) => (
  <svg width={1200} height={1200} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#base_svg__a)">
      <circle cx={600} cy={600} r={600} fill="#0052FF" />
      <circle cx={600} cy={600} r={423} fill="#fff" />
      <path fill="#0052FF" d="M177 565h637v70H177z" />
    </g>
    <defs>
      <clipPath id="base_svg__a">
        <path fill="#fff" d="M0 0h1200v1200H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgBase;
