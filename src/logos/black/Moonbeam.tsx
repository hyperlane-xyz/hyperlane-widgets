import * as React from 'react';
import { SVGProps } from 'react';

const SvgMoonbeam = (props: SVGProps<SVGSVGElement>) => (
  <svg width={182} height={100} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M172 100c5.523 0 10.048-4.487 9.545-9.987-2.086-22.854-11.288-44.339-26.198-60.724C138.281 10.536 115.135 0 91 0 66.865 0 43.72 10.536 26.653 29.29 11.743 45.673 2.541 67.16.455 90.013-.048 95.513 4.477 100 10 100h162Z"
      fill="#010101"
    />
  </svg>
);
export default SvgMoonbeam;
