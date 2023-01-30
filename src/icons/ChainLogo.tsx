import React, { memo } from 'react';

import { chainIdToMetadata, chainMetadata } from '@hyperlane-xyz/sdk';
import ArbitrumBlack from '@hyperlane-xyz/sdk/logos/black/arbitrum.svg';
import AvalancheBlack from '@hyperlane-xyz/sdk/logos/black/avalanche.svg';
import BscBlack from '@hyperlane-xyz/sdk/logos/black/bsc.svg';
import CeloBlack from '@hyperlane-xyz/sdk/logos/black/celo.svg';
import EthereumBlack from '@hyperlane-xyz/sdk/logos/black/ethereum.svg';
import MoonbeamBlack from '@hyperlane-xyz/sdk/logos/black/moonbeam.svg';
import OptimismBlack from '@hyperlane-xyz/sdk/logos/black/optimism.svg';
import PolygonBlack from '@hyperlane-xyz/sdk/logos/black/polygon.svg';
import ArbitrumColor from '@hyperlane-xyz/sdk/logos/color/arbitrum.svg';
import AvalancheColor from '@hyperlane-xyz/sdk/logos/color/avalanche.svg';
import BscColor from '@hyperlane-xyz/sdk/logos/color/bsc.svg';
import CeloColor from '@hyperlane-xyz/sdk/logos/color/celo.svg';
import EthereumColor from '@hyperlane-xyz/sdk/logos/color/ethereum.svg';
import MoonbeamColor from '@hyperlane-xyz/sdk/logos/color/moonbeam.svg';
import OptimismColor from '@hyperlane-xyz/sdk/logos/color/optimism.svg';
import PolygonColor from '@hyperlane-xyz/sdk/logos/color/polygon.svg';

import { QuestionMarkIcon } from './QuestionMark';

// Keep up to date as new chains are added or
// icon will fallback to default (question mark)
const CHAIN_TO_LOGO = {
  [chainMetadata.alfajores.id]: { black: CeloBlack, color: CeloColor },
  [chainMetadata.arbitrum.id]: { black: ArbitrumBlack, color: ArbitrumColor },
  [chainMetadata.arbitrumgoerli.id]: { black: ArbitrumBlack, color: ArbitrumColor },
  [chainMetadata.avalanche.id]: { black: AvalancheBlack, color: AvalancheColor },
  [chainMetadata.bsc.id]: { black: BscBlack, color: BscColor },
  [chainMetadata.bsctestnet.id]: { black: BscBlack, color: BscColor },
  [chainMetadata.celo.id]: { black: CeloBlack, color: CeloColor },
  [chainMetadata.ethereum.id]: { black: EthereumBlack, color: EthereumColor },
  [chainMetadata.fuji.id]: { black: AvalancheBlack, color: AvalancheColor },
  [chainMetadata.goerli.id]: { black: EthereumBlack, color: EthereumColor },
  [chainMetadata.moonbasealpha.id]: { black: MoonbeamBlack, color: MoonbeamColor },
  [chainMetadata.moonbeam.id]: { black: MoonbeamBlack, color: MoonbeamColor },
  [chainMetadata.mumbai.id]: { black: PolygonBlack, color: PolygonColor },
  [chainMetadata.optimism.id]: { black: OptimismBlack, color: OptimismColor },
  [chainMetadata.optimismgoerli.id]: { black: OptimismBlack, color: OptimismColor },
  [chainMetadata.polygon.id]: { black: PolygonBlack, color: PolygonColor },
};

export interface ChainLogoProps {
  chainId?: number;
  size?: number;
  color?: boolean;
  background?: boolean;
  customLogos?: Record<number, { color: any; black: any }>;
}

function _ChainLogo({
  chainId,
  size = 32,
  color = true,
  background = false,
  customLogos = {},
}: ChainLogoProps) {
  const colorType = color ? 'color' : 'black';
  const imageSrc = chainId
    ? customLogos[chainId]?.[colorType] || CHAIN_TO_LOGO[chainId]?.[colorType]
    : '';
  const hasIcon = !!imageSrc;
  const title = getChainDisplayName(chainId);

  if (background) {
    const iconSize = Math.floor(size / 1.8);
    return (
      <div
        style={{ width: `${size}px`, height: `${size}px` }}
        className="flex items-center justify-center rounded-full bg-gray-100 transition-all"
        title={title}
      >
        {hasIcon ? (
          <img src={imageSrc} alt="" width={iconSize} height={iconSize} />
        ) : (
          <QuestionMarkIcon width={iconSize} height={iconSize} />
        )}
      </div>
    );
  } else if (hasIcon) {
    return <img src={imageSrc} alt="" width={size} height={size} title={title} />;
  } else {
    return <QuestionMarkIcon width={size} height={size} />;
  }
}

function getChainDisplayName(chainId?: number, shortName = false) {
  if (!chainId || !chainIdToMetadata[chainId]) return 'Unknown';
  const metadata = chainIdToMetadata[chainId];
  return shortName ? metadata.displayNameShort || metadata.displayName : metadata.displayName;
}

export const ChainLogo = memo(_ChainLogo);
