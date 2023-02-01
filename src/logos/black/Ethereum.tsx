import * as React from 'react';
import { SVGProps } from 'react';

const SvgEthereum = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="-5 0 29 33" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="m10.497 0-.23.752v21.815l.23.221 10.497-5.986L10.497 0Z" fill="#010101" />
    <path
      d="M10.497 0 0 16.802l10.497 5.986V0ZM10.497 24.705l-.13.152v7.772l.13.364L21 18.723l-10.503 5.982Z"
      fill="#010101"
    />
    <path
      d="M10.497 32.992v-8.287L0 18.723l10.497 14.27ZM10.497 22.788l10.496-5.986L10.497 12.2v10.588ZM0 16.802l10.497 5.986V12.2L0 16.802Z"
      fill="#010101"
    />
  </svg>
);
export default SvgEthereum;
