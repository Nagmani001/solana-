'use client';

import type { ReactNode } from 'react';
import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider as SolanaWalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Import wallet adapter UI styles
import '@solana/wallet-adapter-react-ui/styles.css';

type Props = {
  children: ReactNode;
};

export function WalletContextProvider({ children }: Props) {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // Keep the wallets array empty for now. Specific wallet adapters (like Phantom, Solflare)
    // can be installed individually and added here if needed, avoiding adapters
    // that require native dependencies (like Ledger).
    const wallets = useMemo(
        () => [
            // Example: If you install @solana/wallet-adapter-phantom, add:
            // new PhantomWalletAdapter(),
        ],
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <SolanaWalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </SolanaWalletProvider>
        </ConnectionProvider>
    );
}
