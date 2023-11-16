import * as React from 'react';
import { SVGProps } from 'react';

const SvgNeutron = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={56}
    height={56}
    viewBox="-6 -6 66 66"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M56 0H3.96l15.29 18.032A13.213 13.213 0 0 1 28 14.737c7.325 0 13.263 5.938 13.263 13.263a13.21 13.21 0 0 1-3.19 8.629L56 52.132V56 0Zm-6.724 56-14.22-16.768A13.2 13.2 0 0 1 28 41.263c-7.326 0-13.264-5.938-13.264-13.263 0-2.578.736-4.985 2.01-7.022L0 6.54V56h49.276Z"
      fill="#000"
    />
  </svg>
);
export default SvgNeutron;
