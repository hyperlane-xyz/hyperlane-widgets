import { useMessage } from './useMessage';
import { useMessageStage } from './useMessageStage';

interface Params {
  messageId?: string;
  originTxHash?: string;
  explorerApiUrl?: string;
  retryInterval?: number;
}

export function useMessageTimeline(params: Params) {
  const { data: message, error: msgError, isLoading: isMsgLoading } = useMessage(params);
  const {
    stage,
    timings,
    error: stageError,
    isLoading: isStageLoading,
  } = useMessageStage({ message, retryInterval: params.retryInterval });
  return {
    message,
    stage,
    timings,
    error: msgError || stageError,
    isLoading: isMsgLoading || isStageLoading,
  };
}
