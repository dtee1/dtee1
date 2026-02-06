# Polymarket Trading Bot

A powerful trading bot for Polymarket that enables automated buying and selling of prediction market positions.

## Features

- 🤖 **Automated Trading**: Execute buy and sell orders programmatically
- 📊 **Market Analysis**: Fetch and analyze market data
- 💼 **Position Management**: Track your positions and balances
- ⚙️ **Customizable Strategies**: Implement your own trading strategies
- 🔐 **Secure**: Wallet integration with private key management
- 📈 **Order Book**: Access real-time order book data

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file in the root directory:

```env
PRIVATE_KEY=your_wallet_private_key
RPC_URL=https://polygon-rpc.com
POLYMARKET_API_URL=https://clob.polymarket.com
```

## Usage

### Basic Example

```javascript
import { PolymarketBot } from './src/bot.js';

// Initialize the bot
const bot = new PolymarketBot({
  privateKey: process.env.PRIVATE_KEY,
  rpcUrl: process.env.RPC_URL
});

// Get market information
const market = await bot.getMarket('marketId');

// Place a buy order
const buyOrder = await bot.buy({
  marketId: 'marketId',
  outcome: 'YES',
  amount: 10, // in USDC
  price: 0.65 // 65 cents
});

// Place a sell order
const sellOrder = await bot.sell({
  marketId: 'marketId',
  outcome: 'YES',
  amount: 5,
  price: 0.70
});

// Check positions
const positions = await bot.getPositions();
console.log('Current positions:', positions);
```

### Advanced Trading Strategy

```javascript
// Implement a simple arbitrage strategy
async function arbitrageStrategy(bot) {
  const markets = await bot.getAllMarkets();
  
  for (const market of markets) {
    const orderBook = await bot.getOrderBook(market.id);
    
    // Check for arbitrage opportunities
    if (orderBook.bestBid > orderBook.bestAsk) {
      await bot.buy({
        marketId: market.id,
        outcome: 'YES',
        amount: 10,
        price: orderBook.bestAsk
      });
      
      await bot.sell({
        marketId: market.id,
        outcome: 'YES',
        amount: 10,
        price: orderBook.bestBid
      });
    }
  }
}
```

## API Reference

### Constructor

```javascript
new PolymarketBot(config)
```

**Parameters:**
- `config.privateKey` (string): Your wallet private key
- `config.rpcUrl` (string): Polygon RPC endpoint
- `config.apiUrl` (string, optional): Polymarket API URL

### Methods

#### `buy(params)`

Place a buy order.

**Parameters:**
- `params.marketId` (string): Market identifier
- `params.outcome` (string): 'YES' or 'NO'
- `params.amount` (number): Amount in USDC
- `params.price` (number): Price between 0 and 1

**Returns:** Order object with transaction details

#### `sell(params)`

Place a sell order.

**Parameters:**
- `params.marketId` (string): Market identifier
- `params.outcome` (string): 'YES' or 'NO'
- `params.amount` (number): Amount to sell
- `params.price` (number): Price between 0 and 1

**Returns:** Order object with transaction details

#### `getMarket(marketId)`

Fetch market information.

**Returns:** Market object with details

#### `getOrderBook(marketId)`

Get order book for a market.

**Returns:** Order book with bids and asks

#### `getPositions()`

Get current positions.

**Returns:** Array of position objects

#### `getBalance()`

Get wallet balance.

**Returns:** Balance object

## Security

⚠️ **Important Security Notes:**

1. Never commit your `.env` file or private keys to version control
2. Use environment variables for sensitive data
3. Test with small amounts first
4. Keep your private key secure
5. Consider using a hardware wallet for production

## Disclaimer

This bot is for educational purposes. Trading on prediction markets involves risk. Use at your own risk and never trade with more than you can afford to lose.

## License

MIT
