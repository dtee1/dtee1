import { PolymarketBot } from '../src/bot.js';

/**
 * Simple test suite for the Polymarket trading bot
 */
async function runTests() {
  console.log('=== Running Polymarket Bot Tests ===\n');
  
  let passedTests = 0;
  let totalTests = 0;

  // Test 1: Bot initialization
  totalTests++;
  try {
    console.log('Test 1: Bot initialization');
    const bot = new PolymarketBot({
      privateKey: '0x' + '1'.repeat(64),
      rpcUrl: 'https://polygon-rpc.com'
    });
    console.log('✓ Bot initialized successfully');
    console.log(`  Wallet address: ${bot.wallet.address}\n`);
    passedTests++;
  } catch (error) {
    console.log('✗ Bot initialization failed:', error.message, '\n');
  }

  // Test 2: Invalid initialization (missing private key)
  totalTests++;
  try {
    console.log('Test 2: Invalid initialization (missing private key)');
    const bot = new PolymarketBot({
      rpcUrl: 'https://polygon-rpc.com'
    });
    console.log('✗ Should have thrown an error\n');
  } catch (error) {
    console.log('✓ Correctly threw error:', error.message, '\n');
    passedTests++;
  }

  // Test 3: Invalid initialization (missing RPC URL)
  totalTests++;
  try {
    console.log('Test 3: Invalid initialization (missing RPC URL)');
    const bot = new PolymarketBot({
      privateKey: '0x' + '1'.repeat(64)
    });
    console.log('✗ Should have thrown an error\n');
  } catch (error) {
    console.log('✓ Correctly threw error:', error.message, '\n');
    passedTests++;
  }

  // Initialize bot for remaining tests
  const bot = new PolymarketBot({
    privateKey: '0x' + '1'.repeat(64),
    rpcUrl: 'https://polygon-rpc.com'
  });

  // Test 4: Buy order with valid parameters
  totalTests++;
  try {
    console.log('Test 4: Buy order with valid parameters');
    const order = await bot.buy({
      marketId: 'test-market',
      outcome: 'YES',
      amount: 10,
      price: 0.65
    });
    console.log('✓ Buy order placed successfully');
    console.log(`  Order ID: ${order.id}`);
    console.log(`  Status: ${order.status}\n`);
    passedTests++;
  } catch (error) {
    console.log('✗ Buy order failed:', error.message, '\n');
  }

  // Test 5: Sell order with valid parameters
  totalTests++;
  try {
    console.log('Test 5: Sell order with valid parameters');
    const order = await bot.sell({
      marketId: 'test-market',
      outcome: 'NO',
      amount: 5,
      price: 0.70
    });
    console.log('✓ Sell order placed successfully');
    console.log(`  Order ID: ${order.id}`);
    console.log(`  Status: ${order.status}\n`);
    passedTests++;
  } catch (error) {
    console.log('✗ Sell order failed:', error.message, '\n');
  }

  // Test 6: Invalid order (invalid outcome)
  totalTests++;
  try {
    console.log('Test 6: Invalid order (invalid outcome)');
    await bot.buy({
      marketId: 'test-market',
      outcome: 'MAYBE',
      amount: 10,
      price: 0.65
    });
    console.log('✗ Should have thrown an error\n');
  } catch (error) {
    console.log('✓ Correctly rejected invalid outcome:', error.message, '\n');
    passedTests++;
  }

  // Test 7: Invalid order (price out of range)
  totalTests++;
  try {
    console.log('Test 7: Invalid order (price out of range)');
    await bot.buy({
      marketId: 'test-market',
      outcome: 'YES',
      amount: 10,
      price: 1.5
    });
    console.log('✗ Should have thrown an error\n');
  } catch (error) {
    console.log('✓ Correctly rejected invalid price:', error.message, '\n');
    passedTests++;
  }

  // Test 8: Invalid order (negative amount)
  totalTests++;
  try {
    console.log('Test 8: Invalid order (negative amount)');
    await bot.buy({
      marketId: 'test-market',
      outcome: 'YES',
      amount: -10,
      price: 0.65
    });
    console.log('✗ Should have thrown an error\n');
  } catch (error) {
    console.log('✓ Correctly rejected negative amount:', error.message, '\n');
    passedTests++;
  }

  // Test 9: Get positions
  totalTests++;
  try {
    console.log('Test 9: Get positions');
    const positions = await bot.getPositions();
    console.log('✓ Positions retrieved successfully');
    console.log(`  Number of positions: ${positions.length}\n`);
    passedTests++;
  } catch (error) {
    console.log('✗ Get positions failed:', error.message, '\n');
  }

  // Test 10: Get balance
  totalTests++;
  try {
    console.log('Test 10: Get balance');
    const balance = await bot.getBalance();
    console.log('✓ Balance retrieved successfully');
    console.log(`  Address: ${balance.address}`);
    console.log(`  MATIC: ${balance.matic}\n`);
    passedTests++;
  } catch (error) {
    console.log('✗ Get balance failed:', error.message, '\n');
  }

  // Test 11: Cancel order
  totalTests++;
  try {
    console.log('Test 11: Cancel order');
    const result = await bot.cancelOrder('test-order-123');
    console.log('✓ Order cancelled successfully');
    console.log(`  Order ID: ${result.orderId}`);
    console.log(`  Status: ${result.status}\n`);
    passedTests++;
  } catch (error) {
    console.log('✗ Cancel order failed:', error.message, '\n');
  }

  // Test 12: Get order history
  totalTests++;
  try {
    console.log('Test 12: Get order history');
    const history = await bot.getOrderHistory();
    console.log('✓ Order history retrieved successfully');
    console.log(`  Number of orders: ${history.length}\n`);
    passedTests++;
  } catch (error) {
    console.log('✗ Get order history failed:', error.message, '\n');
  }

  // Print results
  console.log('=== Test Results ===');
  console.log(`Passed: ${passedTests}/${totalTests}`);
  console.log(`Failed: ${totalTests - passedTests}/${totalTests}`);
  
  if (passedTests === totalTests) {
    console.log('\n✓ All tests passed!');
  } else {
    console.log(`\n✗ ${totalTests - passedTests} test(s) failed`);
  }
}

// Run tests
runTests().catch(console.error);
