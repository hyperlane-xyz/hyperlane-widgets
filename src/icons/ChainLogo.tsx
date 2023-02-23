import React, { memo } from 'react';

import { chainIdToMetadata, chainMetadata } from '@hyperlane-xyz/sdk';

import ArbitrumBlack from '../logos/black/Arbitrum';
import AvalancheBlack from '../logos/black/Avalanche';
import BscBlack from '../logos/black/Bsc';
import CeloBlack from '../logos/black/Celo';
import EthereumBlack from '../logos/black/Ethereum';
import GnosisBlack from '../logos/black/Gnosis';
import MoonbeamBlack from '../logos/black/Moonbeam';
import OptimismBlack from '../logos/black/Optimism';
import PolygonBlack from '../logos/black/Polygon';
import ArbitrumColor from '../logos/color/Arbitrum';
import AvalancheColor from '../logos/color/Avalanche';
import BscColor from '../logos/color/Bsc';
import CeloColor from '../logos/color/Celo';
import EthereumColor from '../logos/color/Ethereum';
import GnosisColor from '../logos/color/Gnosis';
import MoonbeamColor from '../logos/color/Moonbeam';
import OptimismColor from '../logos/color/Optimism';
import PolygonColor from '../logos/color/Polygon';

import { QuestionMarkIcon } from './QuestionMark';

// Keep up to date as new chains are added or
// icon will fallback to default (question mark)
const CHAIN_TO_LOGO = {
  [chainMetadata.alfajores.chainId]: { black: CeloBlack, color: CeloColor },
  [chainMetadata.arbitrum.chainId]: { black: ArbitrumBlack, color: ArbitrumColor },
  [chainMetadata.arbitrumgoerli.chainId]: { black: ArbitrumBlack, color: ArbitrumColor },
  [chainMetadata.avalanche.chainId]: { black: AvalancheBlack, color: AvalancheColor },
  [chainMetadata.bsc.chainId]: { black: BscBlack, color: BscColor },
  [chainMetadata.bsctestnet.chainId]: { black: BscBlack, color: BscColor },
  [chainMetadata.celo.chainId]: { black: CeloBlack, color: CeloColor },
  [chainMetadata.ethereum.chainId]: { black: EthereumBlack, color: EthereumColor },
  [chainMetadata.fuji.chainId]: { black: AvalancheBlack, color: AvalancheColor },
  [chainMetadata.gnosis.chainId]: { black: GnosisBlack, color: GnosisColor },
  [chainMetadata.goerli.chainId]: { black: EthereumBlack, color: EthereumColor },
  [chainMetadata.moonbasealpha.chainId]: { black: MoonbeamBlack, color: MoonbeamColor },
  [chainMetadata.moonbeam.chainId]: { black: MoonbeamBlack, color: MoonbeamColor },
  [chainMetadata.mumbai.chainId]: { black: PolygonBlack, color: PolygonColor },
  [chainMetadata.optimism.chainId]: { black: OptimismBlack, color: OptimismColor },
  [chainMetadata.optimismgoerli.chainId]: { black: OptimismBlack, color: OptimismColor },
  [chainMetadata.polygon.chainId]: { black: PolygonBlack, color: PolygonColor },
};

type CustomLogo = (props: { width: number; height: number; title?: string }) => React.ReactElement;

export interface ChainLogoProps {
  chainId?: number;
  size?: number;
  color?: boolean;
  background?: boolean;
  customLogos?: Record<number, { color: CustomLogo; black: CustomLogo }>;
}

function _ChainLogo({
  chainId,
  size = 32,
  color = true,
  background = false,
  customLogos = {},
}: ChainLogoProps) {
  const colorType = color ? 'color' : 'black';
  const ImageSrc = chainId
    ? customLogos[chainId]?.[colorType] || CHAIN_TO_LOGO[chainId]?.[colorType]
    : null;
  const title = getChainDisplayName(chainId);

  if (background || !ImageSrc) {
    const iconSize = Math.floor(size / 1.8);
    return (
      <div
        style={{ width: `${size}px`, height: `${size}px` }}
        className="htw-flex htw-items-center htw-justify-center htw-rounded-full htw-bg-gray-100 htw-transition-all"
        title={title}
      >
        {ImageSrc ? (
          <ImageSrc width={iconSize} height={iconSize} />
        ) : (
          <QuestionMarkIcon width={iconSize} height={iconSize} />
        )}
      </div>
    );
  } else {
    return <ImageSrc width={size} height={size} title={title} />;
  }
}

function getChainDisplayName(chainId?: number, shortName = false) {
  if (!chainId || !chainIdToMetadata[chainId]) return 'Unknown';
  const metadata = chainIdToMetadata[chainId];
  return shortName ? metadata.displayNameShort || metadata.displayName : metadata.displayName;
}

export const ChainLogo = memo(_ChainLogo);
