import { useEffect, useState } from 'react';

import { chainIdToMetadata } from '@hyperlane-xyz/sdk';

import { queryExplorerForBlock } from '../utils/explorers';
import { fetchWithTimeout } from '../utils/timeout';

import { MessageStatus } from './types';

const VALIDATION_TIME_EST = 5;

export enum Stage {
  Sent = 0,
  Finalized = 1,
  Validated = 2,
  Relayed = 3,
}

export function useMessageStage(
  status: MessageStatus,
  nonce: number,
  originChainId: number,
  destChainId: number,
  originBlockNumber: number,
  originTimestamp: number,
  destinationTimestamp?: number,
) {
  // Tempting to use react-query here as we did in Explorer but
  // avoiding for now to keep dependencies for this lib minimal

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null); //TODO

  useEffect(() => {
    setIsLoading(true);
    fetchMessageState(
      status,
      nonce,
      originChainId,
      destChainId,
      originBlockNumber,
      originTimestamp,
      destinationTimestamp,
    )
      .then((result) => {
        setData(result);
        setError(null);
      })
      .catch((e) => setError(e.toString()))
      .finally(() => setIsLoading(false));
  }, [
    status,
    nonce,
    originChainId,
    destChainId,
    originTimestamp,
    destinationTimestamp,
    originBlockNumber,
  ]);

  return {
    stage: data?.stage || Stage.Sent,
    timings: data?.timings || {},
    isLoading,
    error,
  };
}

async function fetchMessageState(
  status: MessageStatus,
  nonce: number,
  originChainId: number,
  destChainId: number,
  originBlockNumber: number,
  originTimestamp: number,
  destinationTimestamp?: number,
) {
  if (!originChainId || !destChainId || !nonce || !originTimestamp || !originBlockNumber) {
    return null;
  }

  const relayEstimate = Math.floor(chainIdToMetadata[destChainId].blocks.estimateBlockTime * 1.5);
  const finalityBlocks = getFinalityBlocks(originChainId);
  const finalityEstimate =
    finalityBlocks * (chainIdToMetadata[originChainId].blocks.estimateBlockTime || 3);

  if (status === MessageStatus.Delivered && destinationTimestamp) {
    // For delivered messages, just to rough estimates for stages
    // This saves us from making extra explorer calls. May want to revisit in future
    const totalDuration = Math.round((destinationTimestamp - originTimestamp) / 1000);
    const finalityDuration = Math.max(
      Math.min(finalityEstimate, totalDuration - VALIDATION_TIME_EST),
      1,
    );
    const remaining = totalDuration - finalityDuration;
    const validateDuration = Math.max(
      Math.min(Math.round(remaining * 0.25), VALIDATION_TIME_EST),
      1,
    );
    const relayDuration = Math.max(remaining - validateDuration, 1);
    return {
      stage: Stage.Relayed,
      timings: {
        [Stage.Finalized]: `${finalityDuration} sec`,
        [Stage.Validated]: `${validateDuration} sec`,
        [Stage.Relayed]: `${relayDuration} sec`,
      },
    };
  }

  const latestNonce = await tryFetchLatestNonce(originChainId);
  if (latestNonce && latestNonce >= nonce) {
    return {
      stage: Stage.Validated,
      timings: {
        [Stage.Finalized]: `${finalityEstimate} sec`,
        [Stage.Validated]: `${VALIDATION_TIME_EST} sec`,
        [Stage.Relayed]: `~${relayEstimate} sec`,
      },
    };
  }

  const latestBlock = await tryFetchChainLatestBlock(originChainId);
  const finalizedBlock = originBlockNumber + finalityBlocks;
  if (latestBlock && parseInt(latestBlock.number.toString()) > finalizedBlock) {
    return {
      stage: Stage.Finalized,
      timings: {
        [Stage.Finalized]: `${finalityEstimate} sec`,
        [Stage.Validated]: `~${VALIDATION_TIME_EST} sec`,
        [Stage.Relayed]: `~${relayEstimate} sec`,
      },
    };
  }

  return {
    stage: Stage.Sent,
    timings: {
      [Stage.Finalized]: `~${finalityEstimate} sec`,
      [Stage.Validated]: `~${VALIDATION_TIME_EST} sec`,
      [Stage.Relayed]: `~${relayEstimate} sec`,
    },
  };
}

function getFinalityBlocks(chainId: number) {
  const finalityBlocks = chainIdToMetadata[chainId]?.blocks.confirmations || 0;
  return Math.max(finalityBlocks, 1);
}

async function tryFetchChainLatestBlock(chainId: number) {
  console.debug(`Attempting to fetch latest block for:`, chainId);
  try {
    const block = await queryExplorerForBlock(chainId, 'latest');
    return block;
  } catch (error) {
    console.error('Error fetching latest block', error);
    return null;
  }
}

async function tryFetchLatestNonce(chainId: number) {
  console.debug(`Attempting to fetch nonce for:`, chainId);
  try {
    const response = await fetchWithTimeout(
      '/api/latest-nonce',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chainId }),
      },
      3000,
    );
    const result = await response.json();
    console.debug(`Found nonce:`, result.nonce);
    return result.nonce;
  } catch (error) {
    console.error('Error fetching nonce', error);
    return null;
  }
}
