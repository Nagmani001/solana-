/**
 * Represents a Solana wallet address.
 */
export type WalletAddress = string;

/**
 * Represents a Solana transaction signature.
 */
export type TransactionSignature = string;

/**
 * Represents a Solana token.
 */
export interface SolanaToken {
  /**
   * The token's symbol (e.g., SOL).
   */
  symbol: string;

  /**
   * The token's display name (e.g. "Solana").
   */
  name: string;

  /**
   * The number of decimals for the token.  Used for display purposes.
   */
  decimals: number;

  /**
   * The token's address.
   */
  address: string;
}

/**
 * Represents an NFT (Non-Fungible Token) on the Solana blockchain.
 */
export interface NFT {
  /**
   * The name of the NFT.
   */
  name: string;
  /**
   * A URL pointing to the NFT's image.
   */
  imageUrl: string;
  /**
   * A URL pointing to the NFT's external metadata, if available.
   */
  externalUrl?: string;
  /**
   * The address of the NFT.
   */
  address: string;
}


/**
 * Asynchronously retrieves the balance of a Solana wallet for a given token.
 *
 * @param walletAddress The Solana wallet address.
 * @param token The token to check the balance of.
 * @returns A promise that resolves to the token balance as a number.
 */
export async function getTokenBalance(
  walletAddress: WalletAddress,
  token: SolanaToken
): Promise<number> {
  // TODO: Implement this by calling an API.
  return 42;
}

/**
 * Asynchronously retrieves the NFTs owned by a Solana wallet.
 *
 * @param walletAddress The Solana wallet address.
 * @returns A promise that resolves to an array of NFT objects.
 */
export async function get NFTs(walletAddress: WalletAddress): Promise<NFT[]> {
  // TODO: Implement this by calling an API.
  return [
    {
      name: 'Example NFT',
      imageUrl: 'https://example.com/nft.png',
      address: 'XXX',
    },
  ];
}

/**
 * Asynchronously sends SOL from one wallet to another.
 *
 * @param fromWallet The wallet sending the SOL.
 * @param toWallet The wallet receiving the SOL.
 * @param amount The amount of SOL to send, in SOL.
 * @returns A promise that resolves to a transaction signature string.
 */
export async function sendSol(
  fromWallet: WalletAddress,
  toWallet: WalletAddress,
  amount: number
): Promise<TransactionSignature> {
  // TODO: Implement this by calling an API.
  return '5JLw47Kvf25kfYeYFTbJ1WJ2K4Vf6vnMRiCjWNhoUeA9UH1JHEALWfJALKLB8zAVEyPT6cFtJ99wAgEEdj9pdw7i';
}
