import React, { PropsWithChildren, ReactElement, memo } from 'react';

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
  [chainMetadata.sepolia.chainId]: { black: EthereumBlack, color: EthereumColor },
};

type CustomLogo = (props: { width: number; height: number; title?: string }) => React.ReactElement;

export interface ChainLogoProps {
  chainId?: number;
  chainName?: string;
  size?: number;
  color?: boolean;
  background?: boolean;
  customLogos?: Record<number, { color: CustomLogo; black: CustomLogo }>;
}

function _ChainLogo({
  chainId,
  chainName,
  size = 32,
  color = true,
  background = false,
  customLogos = {},
}: ChainLogoProps) {
  const colorType = color ? 'color' : 'black';
  const title = chainName || chainId?.toString() || 'Unknown';
  const iconSize = Math.floor(size / 1.9);
  const ImageSrc = chainId
    ? customLogos[chainId]?.[colorType] || CHAIN_TO_LOGO[chainId]?.[colorType]
    : null;

  if (!ImageSrc) {
    let icon: ReactElement;
    if (chainName) {
      icon = <div style={{ fontSize: iconSize }}>{chainName[0].toUpperCase()}</div>;
    } else {
      icon = <QuestionMarkIcon width={iconSize} height={iconSize} />;
    }
    return (
      <Circle size={size} title={title} classes={getBackgroundColor(chainId)}>
        {icon}
      </Circle>
    );
  }

  if (background) {
    return (
      <Circle size={size} title={title} classes="htw-bg-gray-100">
        <ImageSrc width={iconSize} height={iconSize} />
      </Circle>
    );
  } else {
    return <ImageSrc width={size} height={size} title={title} />;
  }
}

function Circle({
  size,
  title,
  classes,
  children,
}: PropsWithChildren<{ size: string | number; title: string; classes: string }>) {
  return (
    <div
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`htw-flex htw-items-center htw-justify-center htw-rounded-full htw-transition-all ${classes}`}
      title={title}
    >
      {children}
    </div>
  );
}

function getBackgroundColor(chainId?: number) {
  if (!chainId) return 'htw-bg-gray-100';
  const mod = chainId % 5;
  switch (mod) {
    case 0:
      return 'htw-bg-blue-100';
    case 1:
      return 'htw-bg-pink-200';
    case 2:
      return 'htw-bg-green-100';
    case 3:
      return 'htw-bg-orange-200';
    case 4:
      return 'htw-bg-violet-200';
    default:
      return 'htw-bg-gray-100';
  }
}

export const ChainLogo = memo(_ChainLogo);
