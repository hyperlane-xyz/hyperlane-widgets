import React, { ReactElement, memo, useEffect, useState } from 'react';

import { IRegistry } from '@hyperlane-xyz/registry';

import { Circle } from './Circle.js';
import { QuestionMarkIcon } from './QuestionMark.js';

type SvgIcon = (props: { width: number; height: number; title?: string }) => ReactElement;

export interface ChainLogoProps {
  chainName: string;
  registry: IRegistry;
  size?: number;
  background?: boolean;
  Icon?: SvgIcon; // Override the default set used above. Necessary for PI chain logos.
}

function _ChainLogo({ chainName, registry, size = 32, background = false, Icon }: ChainLogoProps) {
  const title = chainName || 'Unknown';
  const bgColorSeed = chainName.charCodeAt(0);
  console.log('bgColorSeed', bgColorSeed);
  const iconSize = Math.floor(size / 1.9);

  const [svgLogo, setSvgLogo] = useState('');
  useEffect(() => {
    if (!chainName || Icon) return;
    registry
      .getChainLogoUri(chainName)
      .then((uri) => uri && setSvgLogo(uri))
      .catch((err) => console.error(err));
  }, []);

  if (!svgLogo) {
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
          <img src={svgLogo} alt={title} width={iconSize} height={iconSize} />
        )}
      </Circle>
    );
  } else {
    return Icon ? (
      <Icon width={size} height={size} title={title} />
    ) : (
      <img src={svgLogo} alt={title} width={size} height={size} />
    );
  }
}

export const ChainLogo = memo(_ChainLogo);
