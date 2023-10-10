import * as React from 'react';
import { SVGProps } from 'react';

const SvgPolygonzkevm = (props: SVGProps<SVGSVGElement>) => (
  <svg width={1300} height={1300} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#polygonzkevm_svg__a)">
      <circle cx={650} cy={650} r={650} fill="#7F3CE0" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M251 840V460l3.5-25 14.5-20 349-200 30-4.5 30.5 4.5L1025 415l17 20 4.5 25v380l-5.5 23.5-16 22L678.5 1085l-27.5 7.5-33-7.5-349-199.5-11-21-7-24.5Zm59-110.5 26.5-33 32-22.5H912l39.5-12 35.5-17v195l-336 192.5L310 840V729.5ZM493 717h-61.5v105l17.5 25.5 27.5 16H583l28-16 15.5-25.5V717H568v88.5h-75V717Zm238.5 0H671v105l15 25.5 29 16h107.5l31-16 11-25.5V717H806v88.5h-74.5V717ZM310 645V460l341-191 336 191v100.5l-31 31-44 23.5H368.5l-32 11.5L310 645Zm121.5-75H493v-88.5h75V570h58.5V467l-16-26-27.5-19H476.5l-27 19-18 26v103Zm239.5 0h60.5v-88.5H806V570h58.5V467L852 441l-29.5-19H715l-27.5 19-16.5 26v103Z"
        fill="#fff"
      />
    </g>
    <defs>
      <clipPath id="polygonzkevm_svg__a">
        <path fill="#fff" d="M0 0h1300v1300H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgPolygonzkevm;
