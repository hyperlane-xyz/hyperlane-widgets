import React from 'react';

import { Color } from '../color';
import { AirplaneIcon } from '../icons/Airplane';
import { EnvelopeIcon } from '../icons/Envelope';
import { LockIcon } from '../icons/Lock';
import { ShieldIcon } from '../icons/Shield';
import { WideChevron } from '../icons/WideChevron';

import { MessageStatus, MessageStage as Stage, StageTimings } from './types';

interface Props {
  status: MessageStatus;
  stage: Stage;
  timings: StageTimings;
  timestampSent?: number;
  hideDescriptions?: boolean;
}

export function MessageTimeline({
  status,
  stage: _stage,
  timings,
  timestampSent,
  hideDescriptions,
}: Props) {
  // Ignore stage value if status shows as delivered
  const stage = status === MessageStatus.Delivered ? Stage.Relayed : _stage;

  const timeSent = timestampSent ? new Date(timestampSent) : null;
  const timeSentStr = timeSent
    ? `${timeSent.toLocaleDateString()} ${timeSent.toLocaleTimeString()}`
    : null;

  return (
    <div className="pt-14 pb-1 flex">
      <div className={styles.stageContainer}>
        <div
          className={`${styles.stageBar} rounded-l ${getStageOpacityClass(
            Stage.Sent,
            stage,
            status,
          )}`}
        >
          <div className={styles.stageHole}></div>
          <div className={styles.stageIconContainer}>
            <StageIcon Icon={AirplaneIcon} />
            <div className={styles.stageIconCircle}></div>
          </div>
          <ChevronBlue />
        </div>
        <h4 className={styles.stageHeader}>{getStageHeader(Stage.Sent, stage, timings, status)}</h4>
        {!hideDescriptions && (
          <p className={styles.stageDesc}>
            {timeSentStr
              ? `Origin transaction sent at ${timeSentStr}`
              : 'Waiting for origin transaction'}
          </p>
        )}
      </div>
      <div className={styles.stageSpacer}></div>
      <div className={styles.stageContainer}>
        <div
          className={`${styles.stageBar} ${getStageOpacityClass(Stage.Finalized, stage, status)}`}
        >
          <div className={styles.stageHole}></div>
          <div className={styles.stageIconContainer}>
            <StageIcon Icon={LockIcon} size={14} />
            <div className={styles.stageIconCircle}></div>
          </div>
          <ChevronWhite />
          <ChevronBlue />
        </div>
        <h4 className={styles.stageHeader}>
          {getStageHeader(Stage.Finalized, stage, timings, status)}
        </h4>
        {!hideDescriptions && (
          <p className={styles.stageDesc}>Origin transaction has sufficient confirmations</p>
        )}
      </div>
      <div className={styles.stageSpacer}></div>
      <div className={styles.stageContainer}>
        <div
          className={`${styles.stageBar} ${getStageOpacityClass(Stage.Validated, stage, status)}`}
        >
          <div className={styles.stageHole}></div>
          <div className={styles.stageIconContainer}>
            <StageIcon Icon={ShieldIcon} />
            <div className={styles.stageIconCircle}></div>
          </div>
          <ChevronWhite />
          <ChevronBlue />
        </div>
        <h4 className={styles.stageHeader}>
          {getStageHeader(Stage.Validated, stage, timings, status)}
        </h4>
        {!hideDescriptions && (
          <p className={styles.stageDesc}>Validators have signed the message bundle</p>
        )}
      </div>
      <div className={styles.stageSpacer}></div>
      <div className={styles.stageContainer}>
        <div
          className={`${styles.stageBar} rounded-r ${getStageOpacityClass(
            Stage.Relayed,
            stage,
            status,
          )}`}
        >
          <div className={styles.stageHole}></div>
          <div className={styles.stageIconContainer}>
            <StageIcon Icon={EnvelopeIcon} />
            <div className={styles.stageIconCircle}></div>
          </div>
          <ChevronWhite />
        </div>
        <h4 className={styles.stageHeader}>
          {getStageHeader(Stage.Relayed, stage, timings, status)}
        </h4>
        {!hideDescriptions && (
          <p className={styles.stageDesc}>Destination transaction has been confirmed</p>
        )}
      </div>
    </div>
  );
}

function StageIcon({ Icon, size }: { Icon: any; size?: number }) {
  return (
    <div className="h-9 w-9 flex items-center justify-center rounded-full bg-blue-500">
      <Icon width={size ?? 14} height={size ?? 14} alt="" color={Color.White} />
    </div>
  );
}

function ChevronWhite() {
  return (
    <div className="absolute -left-3 top-0 h-6">
      <WideChevron direction="e" height="100%" width="auto" color="#ffffff" />
    </div>
  );
}

function ChevronBlue() {
  return (
    <div className="absolute -right-3 top-0 h-6">
      <WideChevron direction="e" height="100%" width="auto" />
    </div>
  );
}

function getStageHeader(
  targetStage: Stage,
  currentStage: Stage,
  timings: StageTimings,
  status: MessageStatus,
) {
  let label = '';
  if (targetStage === Stage.Finalized) {
    label = currentStage >= targetStage ? 'Finalized' : 'Finalizing';
  } else if (targetStage === Stage.Validated) {
    label = currentStage >= targetStage ? 'Validated' : 'Validating';
  } else if (targetStage === Stage.Relayed) {
    label = currentStage >= targetStage ? 'Relayed' : 'Relaying';
  } else if (targetStage === Stage.Sent) {
    label = currentStage >= targetStage ? 'Sent' : 'Sending';
  }
  const timing = timings[targetStage];
  if (status === MessageStatus.Failing) {
    if (targetStage === currentStage + 1) return `${label}: failed`;
    if (targetStage > currentStage + 1) return label;
  }
  if (timing) return `${label}: ${timing} sec`;
  else return label;
}

function getStageOpacityClass(
  targetStage: Stage,
  currentStage: Stage,
  messageStatus: MessageStatus,
) {
  if (currentStage >= targetStage) return '';
  if (currentStage === targetStage - 1 && messageStatus !== MessageStatus.Failing)
    return 'animate-pulse-slow';
  return 'opacity-50';
}

const styles = {
  stageContainer: 'flex-1 flex flex-col items-center',
  stageSpacer: 'flex-0 w-1 xs:w-2 sm:w-3',
  stageBar: 'w-full h-6 flex items-center justify-center bg-blue-500 relative',
  stageHole: 'w-3 h-3 rounded-full bg-white',
  stageIconContainer: 'absolute -top-12 flex flex-col items-center',
  stageIconCircle: 'w-0.5 h-4 bg-blue-500',
  stageHeader: 'mt-2.5 text-gray-700 text-xs xs:text-sm sm:text-base',
  stageDesc: 'mt-1 sm:px-4 text-xs text-gray-500 text-center',
};
