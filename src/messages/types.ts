// TODO DE-DUPE WITH EXPLORER
// Copied from explorer src/types.ts
export enum MessageStatus {
  Pending = 'pending',
  Delivered = 'delivered',
  Failing = 'failing',
}

export interface PartialTransactionReceipt {
  from: Address;
  transactionHash: string;
  blockNumber: number;
  gasUsed: number;
  timestamp: number;
}

export interface Message {
  id: string; // Database id
  msgId: string; // Message hash
  status: MessageStatus;
  sender: Address;
  recipient: Address;
  originDomainId: number;
  destinationDomainId: number;
  originChainId: number;
  destinationChainId: number;
  originTimestamp: number; // Note, equivalent to timestamp in originTransaction
  destinationTimestamp?: number; // Note, equivalent to timestamp in destinationTransaction
  nonce: number; // formerly leafIndex
  body: string;
  decodedBody?: string;
  originTransaction: PartialTransactionReceipt;
  destinationTransaction?: PartialTransactionReceipt;
}

export type ApiMessage = Omit<
  Message,
  | 'msgId' // use id field for msgId
  | 'originChainId'
  | 'destinationChainId'
  | 'originTimestamp'
  | 'destinationTimestamp'
  | 'decodedBody'
>;

export interface PartialMessage {
  status: MessageStatus;
  nonce: number;
  originDomainId: number;
  destinationDomainId: number;
  originTransaction: { blockNumber: number; timestamp: number };
  destinationTransaction?: { blockNumber: number; timestamp: number };
}

export enum MessageStage {
  Preparing = 0,
  Sent = 1,
  Finalized = 2,
  Validated = 3,
  Relayed = 4,
}

export type StageTimings = {
  [MessageStage.Finalized]: number;
  [MessageStage.Validated]: number;
  [MessageStage.Relayed]: number;
};
