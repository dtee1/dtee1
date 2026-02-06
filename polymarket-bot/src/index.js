/**
 * Main entry point for the Polymarket trading bot
 */
export { PolymarketBot } from './bot.js';

/**
 * Usage example:
 * 
 * import { PolymarketBot } from 'polymarket-trading-bot';
 * 
 * const bot = new PolymarketBot({
 *   privateKey: process.env.PRIVATE_KEY,
 *   rpcUrl: process.env.RPC_URL
 * });
 * 
 * await bot.buy({
 *   marketId: 'market-id',
 *   outcome: 'YES',
 *   amount: 10,
 *   price: 0.65
 * });
 */
