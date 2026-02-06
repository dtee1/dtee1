import { PolymarketBot } from '../src/bot.js';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Advanced trading strategy example
 * Demonstrates a simple market-making strategy
 */
class MarketMakingStrategy {
  constructor(bot, config = {}) {
    this.bot = bot;
    this.config = {
      spread: config.spread || 0.02, // 2% spread
      orderSize: config.orderSize || 10, // $10 per order
      maxPositionSize: config.maxPositionSize || 100, // Max $100 position
      refreshInterval: config.refreshInterval || 30000, // 30 seconds
      ...config
    };
    this.isRunning = false;
  }

  /**
   * Start the market making strategy
   */
  async start(marketId) {
    console.log('=== Starting Market Making Strategy ===');
    console.log(`Market ID: ${marketId}`);
    console.log(`Spread: ${this.config.spread * 100}%`);
    console.log(`Order Size: $${this.config.orderSize}`);
    console.log(`Max Position: $${this.config.maxPositionSize}\n`);

    this.isRunning = true;
    this.marketId = marketId;

    // Run the strategy loop
    while (this.isRunning) {
      try {
        await this.executeCycle();
        await this.sleep(this.config.refreshInterval);
      } catch (error) {
        console.error('Error in strategy cycle:', error.message);
        await this.sleep(5000); // Wait 5 seconds on error
      }
    }
  }

  /**
   * Execute one cycle of the strategy
   */
  async executeCycle() {
    console.log(`\n--- Cycle at ${new Date().toISOString()} ---`);

    // 1. Get current order book
    let orderBook;
    try {
      orderBook = await this.bot.getOrderBook(this.marketId);
      console.log(`Best Bid: $${orderBook.bestBid.toFixed(4)}`);
      console.log(`Best Ask: $${orderBook.bestAsk.toFixed(4)}`);
      console.log(`Current Spread: ${(orderBook.spread * 100).toFixed(2)}%`);
    } catch (error) {
      console.log('Using simulated order book for demo');
      orderBook = {
        bestBid: 0.48,
        bestAsk: 0.52,
        spread: 0.04
      };
    }

    // 2. Check current positions
    const positions = await this.bot.getPositions();
    const currentPosition = positions.find(p => p.marketId === this.marketId) || { shares: 0 };
    console.log(`Current position: ${currentPosition.shares} shares`);

    // 3. Calculate fair price (midpoint)
    const fairPrice = (orderBook.bestBid + orderBook.bestAsk) / 2;
    console.log(`Fair price: $${fairPrice.toFixed(4)}`);

    // 4. Calculate our bid/ask prices with spread
    const ourBidPrice = fairPrice - (this.config.spread / 2);
    const ourAskPrice = fairPrice + (this.config.spread / 2);

    console.log(`Our Bid: $${ourBidPrice.toFixed(4)}`);
    console.log(`Our Ask: $${ourAskPrice.toFixed(4)}`);

    // 5. Check if we should place orders based on position limits
    const canBuy = Math.abs(currentPosition.shares * currentPosition.avgPrice || 0) < this.config.maxPositionSize;
    const canSell = currentPosition.shares > 0;

    // 6. Place orders
    if (canBuy && ourBidPrice > 0 && ourBidPrice < 1) {
      try {
        const buyOrder = await this.bot.buy({
          marketId: this.marketId,
          outcome: 'YES',
          amount: this.config.orderSize,
          price: ourBidPrice
        });
        console.log(`✓ Placed buy order: ${buyOrder.id}`);
      } catch (error) {
        console.log(`✗ Buy order failed: ${error.message}`);
      }
    }

    if (canSell && ourAskPrice > 0 && ourAskPrice < 1) {
      try {
        const sellOrder = await this.bot.sell({
          marketId: this.marketId,
          outcome: 'YES',
          amount: this.config.orderSize / ourAskPrice, // Calculate shares
          price: ourAskPrice
        });
        console.log(`✓ Placed sell order: ${sellOrder.id}`);
      } catch (error) {
        console.log(`✗ Sell order failed: ${error.message}`);
      }
    }

    // 7. Calculate and display metrics
    if (currentPosition.shares > 0) {
      const unrealizedPnL = currentPosition.shares * (fairPrice - currentPosition.avgPrice);
      console.log(`Unrealized P&L: $${unrealizedPnL.toFixed(2)}`);
    }
  }

  /**
   * Stop the strategy
   */
  stop() {
    console.log('\n=== Stopping Market Making Strategy ===');
    this.isRunning = false;
  }

  /**
   * Helper function to sleep
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * Run the market making strategy
 */
async function runMarketMakingStrategy() {
  // Initialize the bot
  const bot = new PolymarketBot({
    privateKey: process.env.PRIVATE_KEY || '0x' + '1'.repeat(64),
    rpcUrl: process.env.RPC_URL || 'https://polygon-rpc.com'
  });

  // Create strategy
  const strategy = new MarketMakingStrategy(bot, {
    spread: 0.02, // 2% spread
    orderSize: 10, // $10 per order
    maxPositionSize: 100, // Max $100 position
    refreshInterval: 30000 // 30 seconds
  });

  // Run for 3 cycles (demo mode)
  const marketId = 'example-market-123';
  
  // Run 3 cycles then stop
  setTimeout(() => {
    strategy.stop();
  }, 95000); // Stop after ~3 cycles

  await strategy.start(marketId);
}

// Run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  runMarketMakingStrategy().catch(console.error);
}

export { MarketMakingStrategy };
