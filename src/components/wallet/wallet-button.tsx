import { component$, useContext } from '@builder.io/qwik';
import { WalletContext } from '~/stores/wallet.store';

export const WalletButton = component$(() => {
  const state = useContext(WalletContext);

  return (
    <button
      onClick$={async () => {
        if (typeof window === 'undefined') return;
        
        try {
          // @ts-ignore
          const provider = window?.phantom?.solana;
          
          if (provider?.isPhantom) {
            if (!state.connected) {
              const response = await provider.connect();
              state.publicKey = response.publicKey.toString();
              state.connected = true;
            } else {
              await provider.disconnect();
              state.publicKey = null;
              state.connected = false;
            }
          } else {
            window.open('https://phantom.app/', '_blank');
          }
        } catch (error) {
          console.error('Wallet connection error:', error);
        }
      }}
      class="px-6 py-2 bg-brand rounded-lg text-white font-semibold hover:bg-opacity-90 transition-colors"
    >
      {state.connected ? 
        `${state.publicKey?.slice(0, 4)}...${state.publicKey?.slice(-4)}` : 
        'Connect Wallet'}
    </button>
  );
});