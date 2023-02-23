import { useCallback, useState } from 'react';

import { chainIdToMetadata } from '@hyperlane-xyz/sdk';

import { queryExplorerForBlock } from '../utils/explorers';
import { fetchWithTimeout } from '../utils/timeout';
import { useInterval } from '../utils/useInterval';

import { MessageStatus, PartialMessage, MessageStage as Stage, StageTimings } from './types';

const VALIDATION_TIME_EST = 5;

interface Params {
  message: PartialMessage | null | undefined;
  retryInterval?: number;
}

const defaultTiming: StageTimings = {
  [Stage.Finalized]: null,
  [Stage.Validated]: null,
  [Stage.Relayed]: null,
};

export function useMessageStage({ message, retryInterval = 2000 }: Params) {
  // Tempting to use react-query here as we did in Explorer but
  // avoiding for now to keep dependencies for this lib minimal

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{ stage: Stage; timings: StageTimings } | null>(null);

  const fetcher = useCallback(() => {
    if (!message) return;
    setIsLoading(true);
    fetchMessageState(message)
      .then((result) => {
        setData(result);
        setError(null);
      })
      .catch((e) => setError(e.toString()))
      .finally(() => setIsLoading(false));
  }, [message]);

  useInterval(fetcher, retryInterval);

  return {
    stage: data?.stage || message ? Stage.Sent : Stage.Preparing,
    timings: data?.timings || defaultTiming,
    isLoading,
    error,
  };
}

async function fetchMessageState(message: PartialMessage) {
  const {
    status,
    nonce,
    originDomainId: originChainId, // TODO avoid assuming domain === chain
    destinationDomainId: destChainId,
    originTransaction,
    destinationTransaction,
  } = message;
  const { blockNumber: originBlockNumber, timestamp: originTimestamp } = originTransaction;
  const destTimestamp = destinationTransaction?.timestamp;

  const relayEstimate = Math.floor(getBlockTimeEst(destChainId) * 1.5);
  const finalityBlocks = getFinalityBlocks(originChainId);
  const finalityEstimate = finalityBlocks * getBlockTimeEst(originChainId);

  if (status === MessageStatus.Delivered && destTimestamp) {
    // For delivered messages, just to rough estimates for stages
    // This saves us from making extra explorer calls. May want to revisit in future
    const totalDuration = Math.round((destTimestamp - originTimestamp) / 1000);
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
        [Stage.Finalized]: finalityDuration,
        [Stage.Validated]: validateDuration,
        [Stage.Relayed]: relayDuration,
      },
    };
  }

  const latestNonce = await tryFetchLatestNonce(originChainId);
  if (latestNonce && latestNonce >= nonce) {
    return {
      stage: Stage.Validated,
      timings: {
        [Stage.Finalized]: finalityEstimate,
        [Stage.Validated]: VALIDATION_TIME_EST,
        [Stage.Relayed]: relayEstimate,
      },
    };
  }

  const latestBlock = await tryFetchChainLatestBlock(originChainId);
  const finalizedBlock = originBlockNumber + finalityBlocks;
  if (latestBlock && parseInt(latestBlock.number.toString()) > finalizedBlock) {
    return {
      stage: Stage.Finalized,
      timings: {
        [Stage.Finalized]: finalityEstimate,
        [Stage.Validated]: VALIDATION_TIME_EST,
        [Stage.Relayed]: relayEstimate,
      },
    };
  }

  return {
    stage: Stage.Sent,
    timings: {
      [Stage.Finalized]: finalityEstimate,
      [Stage.Validated]: VALIDATION_TIME_EST,
      [Stage.Relayed]: relayEstimate,
    },
  };
}

function getFinalityBlocks(chainId: number) {
  const finalityBlocks = chainIdToMetadata[chainId]?.blocks?.confirmations || 0;
  return Math.max(finalityBlocks, 1);
}

function getBlockTimeEst(chainId: number) {
  return chainIdToMetadata[chainId]?.blocks?.estimateBlockTime || 3;
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
