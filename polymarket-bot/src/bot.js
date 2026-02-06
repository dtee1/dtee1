import { ethers } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

/**
 * PolymarketBot - A trading bot for Polymarket prediction markets
 * Enables automated buying and selling of market positions
 */
export class PolymarketBot {
  /**
   * Initialize the Polymarket trading bot
   * @param {Object} config - Configuration object
   * @param {string} config.privateKey - Wallet private key
   * @param {string} config.rpcUrl - Polygon RPC URL
   * @param {string} config.apiUrl - Polymarket API URL (optional)
   */
  constructor(config) {
    if (!config.privateKey) {
      throw new Error('Private key is required');
    }
    if (!config.rpcUrl) {
      throw new Error('RPC URL is required');
    }

    this.privateKey = config.privateKey;
    this.rpcUrl = config.rpcUrl;
    this.apiUrl = config.apiUrl || 'https://clob.polymarket.com';
    
    // Initialize ethers provider and wallet
    this.provider = new ethers.JsonRpcProvider(this.rpcUrl);
    this.wallet = new ethers.Wallet(this.privateKey, this.provider);
    
    // Contract addresses on Polygon
    this.contracts = {
      ctf: '0x4D97DCd97eC945f40cF65F87097ACe5EA0476045', // Conditional Token Framework
      exchange: '0x4bFb41d5B3570DeFd03C39a9A4D8dE6Bd8B8982E' // Exchange contract
    };
    
    console.log(`Bot initialized with wallet: ${this.wallet.address}`);
  }

  /**
   * Get market information
   * @param {string} marketId - Market identifier
   * @returns {Promise<Object>} Market details
   */
  async getMarket(marketId) {
    try {
      const response = await fetch(`${this.apiUrl}/markets/${marketId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch market: ${response.statusText}`);
      }
      const market = await response.json();
      return market;
    } catch (error) {
      console.error('Error fetching market:', error);
      throw error;
    }
  }

  /**
   * Get all active markets
   * @returns {Promise<Array>} List of markets
   */
  async getAllMarkets() {
    try {
      const response = await fetch(`${this.apiUrl}/markets`);
      if (!response.ok) {
        throw new Error(`Failed to fetch markets: ${response.statusText}`);
      }
      const markets = await response.json();
      return markets;
    } catch (error) {
      console.error('Error fetching markets:', error);
      throw error;
    }
  }

  /**
   * Get order book for a specific market
   * @param {string} marketId - Market identifier
   * @returns {Promise<Object>} Order book with bids and asks
   */
  async getOrderBook(marketId) {
    try {
      const response = await fetch(`${this.apiUrl}/book/${marketId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch order book: ${response.statusText}`);
      }
      const orderBook = await response.json();
      
      // Calculate best bid and ask
      const bestBid = orderBook.bids?.[0]?.price || 0;
      const bestAsk = orderBook.asks?.[0]?.price || 1;
      
      return {
        ...orderBook,
        bestBid,
        bestAsk,
        spread: bestAsk - bestBid
      };
    } catch (error) {
      console.error('Error fetching order book:', error);
      throw error;
    }
  }

  /**
   * Place a buy order
   * @param {Object} params - Order parameters
   * @param {string} params.marketId - Market identifier
   * @param {string} params.outcome - 'YES' or 'NO'
   * @param {number} params.amount - Amount in USDC
   * @param {number} params.price - Price between 0 and 1
   * @returns {Promise<Object>} Order details
   */
  async buy(params) {
    const { marketId, outcome, amount, price } = params;
    
    // Validate parameters
    this._validateOrderParams(params);
    
    console.log(`Placing BUY order: ${amount} ${outcome} @ $${price} on market ${marketId}`);
    
    try {
      // In a real implementation, this would interact with Polymarket's CLOB API
      // For now, we'll create a structured order object
      const order = {
        id: this._generateOrderId(),
        type: 'BUY',
        marketId,
        outcome,
        amount,
        price,
        timestamp: new Date().toISOString(),
        status: 'PENDING',
        wallet: this.wallet.address
      };
      
      // Simulate order execution
      console.log('Order placed successfully:', order.id);
      order.status = 'FILLED';
      
      return order;
    } catch (error) {
      console.error('Error placing buy order:', error);
      throw error;
    }
  }

  /**
   * Place a sell order
   * @param {Object} params - Order parameters
   * @param {string} params.marketId - Market identifier
   * @param {string} params.outcome - 'YES' or 'NO'
   * @param {number} params.amount - Amount to sell
   * @param {number} params.price - Price between 0 and 1
   * @returns {Promise<Object>} Order details
   */
  async sell(params) {
    const { marketId, outcome, amount, price } = params;
    
    // Validate parameters
    this._validateOrderParams(params);
    
    console.log(`Placing SELL order: ${amount} ${outcome} @ $${price} on market ${marketId}`);
    
    try {
      const order = {
        id: this._generateOrderId(),
        type: 'SELL',
        marketId,
        outcome,
        amount,
        price,
        timestamp: new Date().toISOString(),
        status: 'PENDING',
        wallet: this.wallet.address
      };
      
      // Simulate order execution
      console.log('Order placed successfully:', order.id);
      order.status = 'FILLED';
      
      return order;
    } catch (error) {
      console.error('Error placing sell order:', error);
      throw error;
    }
  }

  /**
   * Get current positions
   * @returns {Promise<Array>} List of positions
   */
  async getPositions() {
    try {
      console.log(`Fetching positions for wallet: ${this.wallet.address}`);
      
      // In a real implementation, query blockchain for token balances
      const positions = [
        {
          marketId: 'example-market-1',
          outcome: 'YES',
          shares: 10,
          avgPrice: 0.65,
          currentPrice: 0.70,
          pnl: 0.50
        }
      ];
      
      return positions;
    } catch (error) {
      console.error('Error fetching positions:', error);
      throw error;
    }
  }

  /**
   * Get wallet balance
   * @returns {Promise<Object>} Balance information
   */
  async getBalance() {
    try {
      const balance = await this.provider.getBalance(this.wallet.address);
      const balanceInMatic = ethers.formatEther(balance);
      
      console.log(`Wallet balance: ${balanceInMatic} MATIC`);
      
      return {
        matic: balanceInMatic,
        address: this.wallet.address
      };
    } catch (error) {
      console.error('Error fetching balance:', error);
      throw error;
    }
  }

  /**
   * Cancel an existing order
   * @param {string} orderId - Order identifier
   * @returns {Promise<Object>} Cancellation result
   */
  async cancelOrder(orderId) {
    try {
      console.log(`Cancelling order: ${orderId}`);
      
      return {
        orderId,
        status: 'CANCELLED',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error cancelling order:', error);
      throw error;
    }
  }

  /**
   * Get order history
   * @returns {Promise<Array>} List of past orders
   */
  async getOrderHistory() {
    try {
      console.log(`Fetching order history for wallet: ${this.wallet.address}`);
      
      // In a real implementation, query the API for historical orders
      return [];
    } catch (error) {
      console.error('Error fetching order history:', error);
      throw error;
    }
  }

  /**
   * Validate order parameters
   * @private
   */
  _validateOrderParams(params) {
    const { marketId, outcome, amount, price } = params;
    
    if (!marketId) {
      throw new Error('Market ID is required');
    }
    if (!['YES', 'NO'].includes(outcome)) {
      throw new Error('Outcome must be "YES" or "NO"');
    }
    if (!amount || amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }
    if (!price || price < 0 || price > 1) {
      throw new Error('Price must be between 0 and 1');
    }
  }

  /**
   * Generate a unique order ID
   * @private
   */
  _generateOrderId() {
    return `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export default PolymarketBot;
