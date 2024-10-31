import { component$, Slot } from '@builder.io/qwik';
import { WalletProvider } from '~/components/wallet/wallet-provider';
import { WalletButton } from '~/components/wallet/wallet-button';

export default component$(() => {
  return (
    <WalletProvider>
      <main class="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
        <div class="container mx-auto px-4 py-12">
          <header class="flex justify-between items-center mb-12">
            <h1 class="text-5xl font-bold">404pad</h1>
            <WalletButton />
          </header>
          <Slot />
        </div>
      </main>
    </WalletProvider>
  );
});