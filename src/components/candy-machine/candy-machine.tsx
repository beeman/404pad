import { component$, useContext, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { WalletContext } from '~/stores/wallet.store';
import type { CandyMachineState } from './types';

export const CandyMachine = component$(() => {
  const walletState = useContext(WalletContext);
  const state = useStore<CandyMachineState>({
    itemsAvailable: 0,
    itemsRedeemed: 0,
    price: 1.5,
    isLoading: true,
    candyMachineAddress: 'YOUR_CANDY_MACHINE_ADDRESS'
  });

  useVisibleTask$(async ({ track }) => {
    track(() => walletState.connected);
    
    if (!walletState.connected) {
      state.isLoading = false;
      return;
    }

    try {
      const [{ createUmi }, { mplCandyMachine }] = await Promise.all([
        import('@metaplex-foundation/umi-bundle-defaults'),
        import('@metaplex-foundation/mpl-candy-machine')
      ]);

      const umi = createUmi('https://api.mainnet-beta.solana.com')
        .use(mplCandyMachine());

      // Initialize candy machine state
      state.itemsAvailable = 1000;
      state.itemsRedeemed = 100;
    } catch (error) {
      console.error('Error initializing candy machine:', error);
    } finally {
      state.isLoading = false;
    }
  });

  return (
    <div class="max-w-4xl mx-auto p-6">
      <div class="bg-gray-800 rounded-lg shadow-xl p-8">
        <h2 class="text-3xl font-bold mb-6 text-white">404pad Mint</h2>
        
        {state.isLoading ? (
          <div class="flex justify-center items-center">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        ) : (
          <>
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div class="bg-gray-700 p-4 rounded">
                <p class="text-sm text-gray-300">Price</p>
                <p class="text-xl font-bold text-white">{state.price} SOL</p>
              </div>
              <div class="bg-gray-700 p-4 rounded">
                <p class="text-sm text-gray-300">Items Available</p>
                <p class="text-xl font-bold text-white">
                  {state.itemsAvailable - state.itemsRedeemed} / {state.itemsAvailable}
                </p>
              </div>
            </div>

            <button 
              onClick$={async () => {
                if (!walletState.connected) {
                  alert('Please connect your wallet');
                  return;
                }
                try {
                  const [{ createUmi }, { mplCandyMachine }] = await Promise.all([
                    import('@metaplex-foundation/umi-bundle-defaults'),
                    import('@metaplex-foundation/mpl-candy-machine')
                  ]);
                  console.log('Minting...');
                } catch (error) {
                  console.error('Error minting:', error);
                }
              }}
              disabled={!walletState.connected}
              class="w-full bg-brand text-white py-3 px-6 rounded-lg font-semibold 
                     hover:bg-opacity-90 transition-colors disabled:opacity-50 
                     disabled:cursor-not-allowed"
            >
              {walletState.connected ? 'Mint NFT' : 'Connect Wallet to Mint'}
            </button>
          </>
        )}
      </div>
    </div>
  );
});