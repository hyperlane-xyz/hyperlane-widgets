import React, { ReactElement, memo } from 'react';

import { chainMetadata } from '@hyperlane-xyz/sdk';
import { isNumeric } from '@hyperlane-xyz/utils';

import ArbitrumBlack from '../logos/black/Arbitrum';
import AvalancheBlack from '../logos/black/Avalanche';
import BaseBlack from '../logos/black/Base';
import BscBlack from '../logos/black/Bsc';
import CeloBlack from '../logos/black/Celo';
import EthereumBlack from '../logos/black/Ethereum';
import GnosisBlack from '../logos/black/Gnosis';
import InevmBlack from '../logos/black/Inevm';
import InjectiveBlack from '../logos/black/Injective';
import MantaBlack from '../logos/black/Manta';
import MoonbeamBlack from '../logos/black/Moonbeam';
import NautilusBlack from '../logos/black/Nautilus';
import NeutronBlack from '../logos/black/Neutron';
import OptimismBlack from '../logos/black/Optimism';
import PolygonBlack from '../logos/black/Polygon';
import PolygonzkevmBlack from '../logos/black/Polygonzkevm';
import ScrollBlack from '../logos/black/Scroll';
import SolanaBlack from '../logos/black/Solana';
import VictionBlack from '../logos/black/Viction';
import ArbitrumColor from '../logos/color/Arbitrum';
import AvalancheColor from '../logos/color/Avalanche';
import BaseColor from '../logos/color/Base';
import BscColor from '../logos/color/Bsc';
import CeloColor from '../logos/color/Celo';
import EthereumColor from '../logos/color/Ethereum';
import GnosisColor from '../logos/color/Gnosis';
import InevmColor from '../logos/color/Inevm';
import InjectiveColor from '../logos/color/Injective';
import MantaColor from '../logos/color/Manta';
import MoonbeamColor from '../logos/color/Moonbeam';
import NautilusColor from '../logos/color/Nautilus';
import NeutronColor from '../logos/color/Neutron';
import OptimismColor from '../logos/color/Optimism';
import PolygonColor from '../logos/color/Polygon';
import PolygonzkevmColor from '../logos/color/Polygonzkevm';
import ScrollColor from '../logos/color/Scroll';
import SolanaColor from '../logos/color/Solana';
import VictionColor from '../logos/color/Viction';

import { Circle } from './Circle';
import { QuestionMarkIcon } from './QuestionMark';

type SvgIcon = (props: { width: number; height: number; title?: string }) => ReactElement;

// Keep up to date as new chains are added or
// icon will fallback to default (question mark)
const CHAIN_TO_LOGO: Record<string | number, { black: SvgIcon; color: SvgIcon }> = {
  [chainMetadata.alfajores.chainId]: { black: CeloBlack, color: CeloColor },
  [chainMetadata.arbitrum.chainId]: { black: ArbitrumBlack, color: ArbitrumColor },
  [chainMetadata.arbitrumgoerli.chainId]: { black: ArbitrumBlack, color: ArbitrumColor },
  [chainMetadata.avalanche.chainId]: { black: AvalancheBlack, color: AvalancheColor },
  [chainMetadata.base.chainId]: { black: BaseBlack, color: BaseColor },
  [chainMetadata.basegoerli.chainId]: { black: BaseBlack, color: BaseColor },
  [chainMetadata.bsc.chainId]: { black: BscBlack, color: BscColor },
  [chainMetadata.bsctestnet.chainId]: { black: BscBlack, color: BscColor },
  [chainMetadata.celo.chainId]: { black: CeloBlack, color: CeloColor },
  [chainMetadata.chiado.chainId]: { black: GnosisBlack, color: GnosisColor },
  [chainMetadata.ethereum.chainId]: { black: EthereumBlack, color: EthereumColor },
  [chainMetadata.fuji.chainId]: { black: AvalancheBlack, color: AvalancheColor },
  [chainMetadata.gnosis.chainId]: { black: GnosisBlack, color: GnosisColor },
  [chainMetadata.goerli.chainId]: { black: EthereumBlack, color: EthereumColor },
  [chainMetadata.inevm.chainId]: { black: InevmBlack, color: InevmColor },
  [chainMetadata.injective.chainId]: { black: InjectiveBlack, color: InjectiveColor },
  [chainMetadata.mantapacific.chainId]: { black: MantaBlack, color: MantaColor },
  [chainMetadata.moonbasealpha.chainId]: { black: MoonbeamBlack, color: MoonbeamColor },
  [chainMetadata.moonbeam.chainId]: { black: MoonbeamBlack, color: MoonbeamColor },
  [chainMetadata.mumbai.chainId]: { black: PolygonBlack, color: PolygonColor },
  [chainMetadata.nautilus.chainId]: { black: NautilusBlack, color: NautilusColor },
  [chainMetadata.neutron.chainId]: { black: NeutronBlack, color: NeutronColor },
  [chainMetadata.optimism.chainId]: { black: OptimismBlack, color: OptimismColor },
  [chainMetadata.optimismgoerli.chainId]: { black: OptimismBlack, color: OptimismColor },
  [chainMetadata.polygon.chainId]: { black: PolygonBlack, color: PolygonColor },
  [chainMetadata.polygonzkevm.chainId]: { black: PolygonzkevmBlack, color: PolygonzkevmColor },
  [chainMetadata.polygonzkevmtestnet.chainId]: {
    black: PolygonzkevmBlack,
    color: PolygonzkevmColor,
  },
  [chainMetadata.scroll.chainId]: { black: ScrollBlack, color: ScrollColor },
  [chainMetadata.scrollsepolia.chainId]: { black: ScrollBlack, color: ScrollColor },
  [chainMetadata.sepolia.chainId]: { black: EthereumBlack, color: EthereumColor },
  [chainMetadata.solana.chainId]: { black: SolanaBlack, color: SolanaColor },
  [chainMetadata.solanadevnet.chainId]: { black: SolanaBlack, color: SolanaColor },
  [chainMetadata.viction.chainId]: { black: VictionBlack, color: VictionColor },
};

export interface ChainLogoProps {
  chainId?: number | string;
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
  const bgColorSeed = chainId && isNumeric(chainId) ? parseInt(chainId.toString(), 10) : 0;

  if (!ImageNode) {
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
        <ImageNode width={iconSize} height={iconSize} />
      </Circle>
    );
  } else {
    return <ImageNode width={size} height={size} title={title} />;
  }
}

export const ChainLogo = memo(_ChainLogo);
