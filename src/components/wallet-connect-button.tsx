'use client';

import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { cn } from '@/lib/utils';

export function WalletConnectButton({ className }: { className?: string }) {
  return (
    <WalletMultiButton
      className={cn(
        // Base styles matching ShadCN Button
        '!inline-flex !items-center !justify-center !whitespace-nowrap !rounded-md !text-sm !font-medium !ring-offset-background !transition-colors focus-visible:!outline-none focus-visible:!ring-2 focus-visible:!ring-ring focus-visible:!ring-offset-2 disabled:!pointer-events-none disabled:!opacity-50',
        // Variant: Primary-like
        '!bg-primary !text-primary-foreground hover:!bg-primary/90',
        // Size: Default
        '!h-10 !px-4 !py-2',
        // Custom styles for wallet button specifically
        '[&_svg]:!mr-2', // Ensure icon has margin if present
        className
      )}
       style={{ /* Inline styles might be necessary if classes are overridden */ }}
    />
  );
}
