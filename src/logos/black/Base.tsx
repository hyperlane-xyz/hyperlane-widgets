import * as React from 'react';
import { SVGProps } from 'react';

const SvgBase = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    id="Layer_1"
    x="0px"
    y="0px"
    viewBox="0 0 2500 2500"
    {...props}
  >
    <g id="Layer_x0020_1">
      <path d="M1247.8,2500c691.6,0,1252.2-559.6,1252.2-1250C2500,559.6,1939.4,0,1247.8,0C591.7,0,53.5,503.8,0,1144.9h1655.1v210.2H0   C53.5,1996.2,591.7,2500,1247.8,2500z"></path>
    </g>
  </svg>
);
export default SvgBase;
