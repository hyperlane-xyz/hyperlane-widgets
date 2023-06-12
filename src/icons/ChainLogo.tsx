import React, { ReactElement, memo } from 'react';

import { chainMetadata } from '@hyperlane-xyz/sdk';

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

import { Circle } from './Circle';
import { QuestionMarkIcon } from './QuestionMark';

type SvgIcon = (props: { width: number; height: number; title?: string }) => ReactElement;

// Keep up to date as new chains are added or
// icon will fallback to default (question mark)
const CHAIN_TO_LOGO: Record<number, { black: SvgIcon; color: SvgIcon }> = {
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
  [chainMetadata.sepolia.chainId]: { black: EthereumBlack, color: EthereumColor },
};

export interface ChainLogoProps {
  chainId?: number;
  chainName?: string;
  size?: number;
  color?: boolean;
  background?: boolean;
  icon?: SvgIcon; // Override the default set used above. Necessary for PI chain logos.
}

function _ChainLogo({
  chainId,
  chainName,
  size = 32,
  color = true,
  background = false,
  icon,
}: ChainLogoProps) {
  const colorType = color ? 'color' : 'black';
  const title = chainName || chainId?.toString() || 'Unknown';
  const iconSize = Math.floor(size / 1.9);
  const ImageNode = icon ?? (chainId ? CHAIN_TO_LOGO[chainId]?.[colorType] : null);

  if (!ImageNode) {
    return (
      <Circle size={size} title={title} bgColorSeed={chainId || 0}>
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
        <ImageNode width={iconSize} height={iconSize} />
      </Circle>
    );
  } else {
    return <ImageNode width={size} height={size} title={title} />;
  }
}

export const ChainLogo = memo(_ChainLogo);
