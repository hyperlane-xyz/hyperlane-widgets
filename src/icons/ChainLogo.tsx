import React, { ReactElement, useEffect, useState } from 'react';

import type { IRegistry } from '@hyperlane-xyz/registry';

import { Circle } from './Circle.js';
import { QuestionMarkIcon } from './QuestionMark.js';

type SvgIcon = (props: { width: number; height: number; title?: string }) => ReactElement;

export interface ChainLogoProps {
  chainName: string;
  registry: IRegistry;
  size?: number;
  background?: boolean;
  Icon?: SvgIcon; // Optional override for the logo in the registry
}

export function ChainLogo({
  chainName,
  registry,
  size = 32,
  background = false,
  Icon,
}: ChainLogoProps) {
  const title = chainName || 'Unknown';
  const bgColorSeed = title.charCodeAt(0);
  const iconSize = Math.floor(size / 1.9);

  const [svgLogos, setSvgLogos] = useState({});
  const logoUri = svgLogos[chainName];

  useEffect(() => {
    if (!chainName || svgLogos[chainName] || Icon) return;
    registry
      .getChainLogoUri(chainName)
      .then((uri) => uri && setSvgLogos({ ...svgLogos, [chainName]: uri }))
      .catch((err) => console.error(err));
  }, [chainName, registry, svgLogos, Icon]);

  if (!logoUri && !Icon) {
    return (
      <Circle size={size} title={title} bgColorSeed={bgColorSeed}>
        {chainName ? (
          <div style={{ fontSize: iconSize }}>{chainName[0].toUpperCase()}</div>
        ) : (
          <QuestionMarkIcon width={iconSize} height={iconSize} />
        )}
      </Circle>
    );
  }

  if (background) {
    return (
      <Circle size={size} title={title} classes="htw-bg-gray-100">
        {Icon ? (
          <Icon width={iconSize} height={iconSize} title={title} />
        ) : (
          <img src={logoUri} alt={title} width={iconSize} height={iconSize} />
        )}
      </Circle>
    );
  } else {
    return Icon ? (
      <Icon width={size} height={size} title={title} />
    ) : (
      <img src={logoUri} alt={title} width={size} height={size} />
    );
  }
}
