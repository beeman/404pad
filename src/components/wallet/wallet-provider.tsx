import { component$, useContextProvider, useStore, useVisibleTask$ } from '@builder.io/qwik';
import type { Connection } from '@solana/web3.js';
import { WalletContext, type WalletStore } from '~/stores/wallet.store';

export const WalletProvider = component$((props: { children?: any }) => {
  const state = useStore<WalletStore>({
    publicKey: null,
    connected: false,
    connection: null,
  });

  useVisibleTask$(async () => {
    if (typeof window !== 'undefined') {
      const { Connection } = await import('@solana/web3.js');
      state.connection = new Connection('https://api.mainnet-beta.solana.com');
      
      // @ts-ignore
      const provider = window?.phantom?.solana;
      if (provider?.isConnected && !state.connected) {
        state.connected = true;
        state.publicKey = provider.publicKey.toString();
      }
    }
  });

  useContextProvider(WalletContext, state);

  return <>{props.children}</>;
});