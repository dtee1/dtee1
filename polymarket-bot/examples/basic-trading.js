import { PolymarketBot } from '../src/bot.js';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Basic trading example demonstrating buy and sell operations
 */
async function basicTradingExample() {
  console.log('=== Polymarket Trading Bot - Basic Example ===\n');

  // Initialize the bot
  const bot = new PolymarketBot({
    privateKey: process.env.PRIVATE_KEY || '0x' + '1'.repeat(64), // Use dummy key for demo
    rpcUrl: process.env.RPC_URL || 'https://polygon-rpc.com'
  });

  try {
    // 1. Check wallet balance
    console.log('\n1. Checking wallet balance...');
    const balance = await bot.getBalance();
    console.log(`   Balance: ${balance.matic} MATIC`);

    // 2. Get market information (example market ID)
    console.log('\n2. Fetching market information...');
    const exampleMarketId = 'example-market-123';
    try {
      const market = await bot.getMarket(exampleMarketId);
      console.log(`   Market: ${market.question || 'Example Market'}`);
    } catch (error) {
      console.log('   Note: Using example market for demo purposes');
    }

    // 3. Get order book
    console.log('\n3. Fetching order book...');
    try {
      const orderBook = await bot.getOrderBook(exampleMarketId);
      console.log(`   Best Bid: $${orderBook.bestBid}`);
      console.log(`   Best Ask: $${orderBook.bestAsk}`);
      console.log(`   Spread: $${orderBook.spread.toFixed(4)}`);
    } catch (error) {
      console.log('   Note: Using simulated order book for demo');
    }

    // 4. Place a buy order
    console.log('\n4. Placing buy order...');
    const buyOrder = await bot.buy({
      marketId: exampleMarketId,
      outcome: 'YES',
      amount: 10, // 10 USDC
      price: 0.65 // $0.65
    });
    console.log(`   Order ID: ${buyOrder.id}`);
    console.log(`   Status: ${buyOrder.status}`);
    console.log(`   Type: ${buyOrder.type}`);

    // 5. Check current positions
    console.log('\n5. Checking positions...');
    const positions = await bot.getPositions();
    console.log(`   Total positions: ${positions.length}`);
    positions.forEach((pos, i) => {
      console.log(`   Position ${i + 1}:`);
      console.log(`     Market: ${pos.marketId}`);
      console.log(`     Outcome: ${pos.outcome}`);
      console.log(`     Shares: ${pos.shares}`);
      console.log(`     Avg Price: $${pos.avgPrice}`);
      console.log(`     Current Price: $${pos.currentPrice}`);
      console.log(`     P&L: $${pos.pnl.toFixed(2)}`);
    });

    // 6. Place a sell order
    console.log('\n6. Placing sell order...');
    const sellOrder = await bot.sell({
      marketId: exampleMarketId,
      outcome: 'YES',
      amount: 5, // Sell 5 shares
      price: 0.70 // $0.70
    });
    console.log(`   Order ID: ${sellOrder.id}`);
    console.log(`   Status: ${sellOrder.status}`);
    console.log(`   Type: ${sellOrder.type}`);

    // 7. Get order history
    console.log('\n7. Fetching order history...');
    const orderHistory = await bot.getOrderHistory();
    console.log(`   Total orders: ${orderHistory.length}`);

    console.log('\n=== Example completed successfully! ===\n');

  } catch (error) {
    console.error('Error in trading example:', error.message);
  }
}

// Run the example
basicTradingExample().catch(console.error);
