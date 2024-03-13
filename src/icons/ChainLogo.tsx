import React, { ReactElement, memo } from 'react';

import { Chains, chainMetadata } from '@hyperlane-xyz/sdk';
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
import PlumeBlack from '../logos/black/Plume';
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
import PlumeColor from '../logos/color/Plume';
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
  [chainMetadata[Chains.alfajores].chainId]: { black: CeloBlack, color: CeloColor },
  [chainMetadata[Chains.arbitrum].chainId]: { black: ArbitrumBlack, color: ArbitrumColor },
  [chainMetadata[Chains.avalanche].chainId]: { black: AvalancheBlack, color: AvalancheColor },
  [chainMetadata[Chains.base].chainId]: { black: BaseBlack, color: BaseColor },
  [chainMetadata[Chains.bsc].chainId]: { black: BscBlack, color: BscColor },
  [chainMetadata[Chains.bsctestnet].chainId]: { black: BscBlack, color: BscColor },
  [chainMetadata[Chains.celo].chainId]: { black: CeloBlack, color: CeloColor },
  [chainMetadata[Chains.chiado].chainId]: { black: GnosisBlack, color: GnosisColor },
  [chainMetadata[Chains.ethereum].chainId]: { black: EthereumBlack, color: EthereumColor },
  [chainMetadata[Chains.fuji].chainId]: { black: AvalancheBlack, color: AvalancheColor },
  [chainMetadata[Chains.gnosis].chainId]: { black: GnosisBlack, color: GnosisColor },
  [chainMetadata[Chains.inevm].chainId]: { black: InevmBlack, color: InevmColor },
  [chainMetadata[Chains.injective].chainId]: { black: InjectiveBlack, color: InjectiveColor },
  [chainMetadata[Chains.mantapacific].chainId]: { black: MantaBlack, color: MantaColor },
  [chainMetadata[Chains.moonbeam].chainId]: { black: MoonbeamBlack, color: MoonbeamColor },
  [chainMetadata[Chains.mumbai].chainId]: { black: PolygonBlack, color: PolygonColor },
  [chainMetadata[Chains.nautilus].chainId]: { black: NautilusBlack, color: NautilusColor },
  [chainMetadata[Chains.neutron].chainId]: { black: NeutronBlack, color: NeutronColor },
  [chainMetadata[Chains.optimism].chainId]: { black: OptimismBlack, color: OptimismColor },
  [chainMetadata[Chains.plumetestnet].chainId]: { black: PlumeBlack, color: PlumeColor },
  [chainMetadata[Chains.polygon].chainId]: { black: PolygonBlack, color: PolygonColor },
  [chainMetadata[Chains.polygonzkevm].chainId]: {
    black: PolygonzkevmBlack,
    color: PolygonzkevmColor,
  },
  [chainMetadata[Chains.scroll].chainId]: { black: ScrollBlack, color: ScrollColor },
  [chainMetadata[Chains.scrollsepolia].chainId]: { black: ScrollBlack, color: ScrollColor },
  [chainMetadata[Chains.sepolia].chainId]: { black: EthereumBlack, color: EthereumColor },
  [chainMetadata[Chains.solana].chainId]: { black: SolanaBlack, color: SolanaColor },
  [chainMetadata[Chains.solanadevnet].chainId]: { black: SolanaBlack, color: SolanaColor },
  [chainMetadata[Chains.viction].chainId]: { black: VictionBlack, color: VictionColor },
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
