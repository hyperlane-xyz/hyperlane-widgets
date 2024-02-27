import * as React from 'react';
import { SVGProps } from 'react';

const SvgPlume = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 350 350" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx={175} cy={175} r={175} fill="url(#plume_svg__a)" />
    <path d="M285.938 65.823v81.645l-40.823-40.823 40.823-40.822Z" fill="#fff" fillOpacity={0.95} />
    <path d="M285.938 65.823h-81.646l40.823 40.822 40.823-40.822Z" fill="#fff" />
    <path d="M163.47 106.646v81.646l-40.823-40.823 40.823-40.823Z" fill="#fff" fillOpacity={0.75} />
    <path d="M122.648 147.47v81.646l-40.823-40.823 40.823-40.823Z" fill="#fff" fillOpacity={0.55} />
    <path
      d="M204.293 147.468h81.646l-40.823-40.823-40.823 40.823Z"
      fill="#fff"
      fillOpacity={0.85}
    />
    <path d="M163.47 188.292h81.646l-40.823-40.823-40.823 40.823Z" fill="#fff" fillOpacity={0.7} />
    <path d="M122.648 229.115h81.646l-40.823-40.824-40.823 40.824Z" fill="#fff" fillOpacity={0.5} />
    <path d="M285.938 147.468h-81.646l40.823 40.824 40.823-40.824Z" fill="#fff" fillOpacity={0.8} />
    <path
      d="M245.115 188.292h-81.646l40.823 40.823 40.823-40.823Z"
      fill="#fff"
      fillOpacity={0.65}
    />
    <path
      d="M204.293 229.115h-81.646l40.823 40.823 40.823-40.823Z"
      fill="#fff"
      fillOpacity={0.45}
    />
    <path d="M204.293 147.468V65.823l40.823 40.823-40.823 40.822Z" fill="#fff" fillOpacity={0.9} />
    <path d="M163.47 188.292v-81.646l40.823 40.823-40.823 40.823Z" fill="#fff" fillOpacity={0.8} />
    <path d="M122.648 229.115v-81.647l40.823 40.823-40.823 40.824Z" fill="#fff" fillOpacity={0.6} />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m81.822 269.938 40.822-40.823 40.823 40.823h-70.27l-30.713 19.337 19.338-19.337Z"
      fill="#F8F8F8"
      fillOpacity={0.3}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M81.823 258.567v-70.275l40.823 40.823-33.149 33.149.001.001-27.01 27.01 19.335-30.708Z"
      fill="#F9F9F9"
      fillOpacity={0.4}
    />
    <defs>
      <radialGradient
        id="plume_svg__a"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="rotate(-44.594 391.795 86.596) scale(348.966 454.21)"
      >
        <stop offset={0.232} stopColor="#0F0F0F" />
        <stop offset={0.871} stopColor="#737373" />
      </radialGradient>
    </defs>
  </svg>
);
export default SvgPlume;
