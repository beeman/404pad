import { createContextId } from '@builder.io/qwik';
import type { Connection } from '@solana/web3.js';

export interface WalletStore {
  publicKey: string | null;
  connected: boolean;
  connection: Connection | null;
}

export const WalletContext = createContextId<WalletStore>('wallet-context');