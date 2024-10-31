import { createContextId } from '@builder.io/qwik';
import type { Connection } from '@solana/web3.js';

export interface WalletState {
  publicKey: string | null;
  connected: boolean;
  connection: Connection | null;
}

export const WalletContext = createContextId<WalletState>('wallet-context');