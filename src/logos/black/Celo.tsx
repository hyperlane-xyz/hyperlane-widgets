import * as React from 'react';
import { SVGProps } from 'react';

const SvgCelo = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 950 950" {...props}>
    <defs>
      <style>{'.celo_svg__cls-1{fill:#010101}'}</style>
    </defs>
    <path
      id="celo_svg__Bottom_Ring"
      data-name="Bottom Ring"
      className="celo_svg__cls-1"
      d="M375 850c151.88 0 275-123.12 275-275S526.88 300 375 300 100 423.12 100 575s123.12 275 275 275Zm0 100C167.9 950 0 782.1 0 575s167.9-375 375-375 375 167.9 375 375-167.9 375-375 375Z"
    />
    <path
      id="celo_svg__Top_Ring"
      data-name="Top Ring"
      className="celo_svg__cls-1"
      d="M575 650c151.88 0 275-123.12 275-275S726.88 100 575 100 300 223.12 300 375s123.12 275 275 275Zm0 100c-207.1 0-375-167.9-375-375S367.9 0 575 0s375 167.9 375 375-167.9 375-375 375Z"
    />
  </svg>
);
export default SvgCelo;
