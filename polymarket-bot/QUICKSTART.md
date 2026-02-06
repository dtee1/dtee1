# Quick Start Guide - Polymarket Trading Bot

This guide will help you get started with the Polymarket trading bot in under 5 minutes.

## Prerequisites

- Node.js (v18 or higher)
- A wallet with MATIC (Polygon network) and USDC
- Your wallet's private key

## Installation

1. Navigate to the bot directory:
```bash
cd polymarket-bot
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment:
```bash
cp .env.example .env
```

4. Edit `.env` and add your credentials:
```env
PRIVATE_KEY=your_private_key_here
RPC_URL=https://polygon-rpc.com
POLYMARKET_API_URL=https://clob.polymarket.com
```

## Basic Usage

### Example 1: Simple Buy/Sell

```javascript
import { PolymarketBot } from './src/bot.js';

const bot = new PolymarketBot({
  privateKey: process.env.PRIVATE_KEY,
  rpcUrl: process.env.RPC_URL
});

// Buy 10 shares at $0.65
await bot.buy({
  marketId: 'your-market-id',
  outcome: 'YES',
  amount: 10,
  price: 0.65
});

// Sell 5 shares at $0.70
await bot.sell({
  marketId: 'your-market-id',
  outcome: 'YES',
  amount: 5,
  price: 0.70
});
```

### Example 2: Check Positions

```javascript
// Get all your positions
const positions = await bot.getPositions();
console.log(positions);

// Check your wallet balance
const balance = await bot.getBalance();
console.log(`Balance: ${balance.matic} MATIC`);
```

### Example 3: Market Analysis

```javascript
// Get market information
const market = await bot.getMarket('market-id');
console.log(market);

// Get order book
const orderBook = await bot.getOrderBook('market-id');
console.log(`Best Bid: ${orderBook.bestBid}`);
console.log(`Best Ask: ${orderBook.bestAsk}`);
console.log(`Spread: ${orderBook.spread}`);
```

## Running the Examples

### Basic Trading Example
```bash
npm run example
```

This runs `examples/basic-trading.js` which demonstrates:
- Checking balance
- Fetching market data
- Placing buy/sell orders
- Checking positions

### Market Making Strategy
```bash
node examples/market-making.js
```

This runs an automated market-making strategy that:
- Monitors order books
- Places bid/ask orders with a spread
- Manages position limits
- Runs continuously

## Running Tests

```bash
npm test
```

This runs the test suite to verify:
- Bot initialization
- Order validation
- Buy/sell functionality
- Position tracking
- Balance checking

## Common Operations

### Find Active Markets

```javascript
const markets = await bot.getAllMarkets();
markets.forEach(market => {
  console.log(`${market.question} (ID: ${market.id})`);
});
```

### Monitor a Market

```javascript
setInterval(async () => {
  const orderBook = await bot.getOrderBook('market-id');
  console.log(`${new Date().toISOString()}`);
  console.log(`Bid: ${orderBook.bestBid} | Ask: ${orderBook.bestAsk}`);
}, 10000); // Every 10 seconds
```

### Calculate P&L

```javascript
const positions = await bot.getPositions();
const totalPnL = positions.reduce((sum, pos) => sum + pos.pnl, 0);
console.log(`Total P&L: $${totalPnL.toFixed(2)}`);
```

## Security Best Practices

1. **Never commit your `.env` file**
   - It's in `.gitignore` by default
   - Keep your private key secure

2. **Test with small amounts first**
   - Start with minimum trade sizes
   - Verify everything works before scaling up

3. **Use a dedicated wallet**
   - Don't use your main wallet
   - Keep only necessary funds

4. **Monitor your trades**
   - Check positions regularly
   - Set up alerts for significant changes

## Troubleshooting

### "Private key is required"
- Make sure `.env` file exists and has `PRIVATE_KEY` set

### "Failed to fetch market"
- Verify the market ID is correct
- Check your internet connection
- Ensure the Polymarket API is accessible

### "Insufficient balance"
- Check your MATIC balance for gas fees
- Ensure you have USDC for trading

### Network errors
- Try a different RPC URL
- Common alternatives:
  - `https://rpc-mainnet.maticvigil.com`
  - `https://polygon-mainnet.infura.io/v3/YOUR-KEY`

## Next Steps

1. **Read the full documentation**: See [README.md](./README.md)
2. **Implement your strategy**: Customize the examples
3. **Join the community**: Share your strategies and learnings
4. **Contribute**: Submit PRs with improvements

## Need Help?

- Check the [main README](./README.md) for detailed API docs
- Review the [examples directory](./examples) for more use cases
- Read the [test file](./tests/bot.test.js) for implementation details

Happy trading! 🚀
