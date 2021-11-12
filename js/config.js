// Don't forget to set OG properties in index.html head too as it cannot be set by JavaScript!

var config = {
 project: 'Rich Pig',
 description: 'The best DeFi app on Binance Smart Chain',
 updateHomeInterval: 30,
 updatePoolsInterval: 30,
 network: 'https://bsc-dataseed2.binance.org/', // Binance Smart Chain
 explorer: 'https://bscscan.com', // Binance Smart Chain
 chainID: '56',
 // network: 'https://rpc-mainnet.matic.quiknode.pro', // Polygon (MATIC)
 // explorer: 'https://explorer-mainnet.maticvigil.com', // Polygon (MATIC)
 // chainID: '137',
 imageToken: 'pig.png',
 symbolToken: 'PIG',
 decimalsToken: 18,
 symbolNative: 'BNB',
 symbolNativeName: 'Binance Coin',
 decimalsNative: 18,
 addressToken: '0xF8C6fADC19De74Aa366602fa854ce043479D4fef',
 addressUSDToken: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
 addressTokenUSDPair: '0x95f33087e9e8a4df0a270ec388c20c8cce0afe11', // STARE Z ALOE, NUTNO PREPSAT !!!!!!!!!!
 addressMasterChef: '0x24037062A8F158D3472369cE4C1978199AdaA437',
 addressDead: '0x000000000000000000000000000000000000dEaD',
 priceLinkToken: 'https://poocoin.app/tokens/0xf8c6fadc19de74aa366602fa854ce043479d4fef',
 abiToken: [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }],
 abiMasterChef: [{ "inputs": [{ "internalType": "contract RichPigToken", "name": "_token", "type": "address" }, { "internalType": "address", "name": "_feeAddress", "type": "address" }, { "internalType": "uint256", "name": "_tokenPerBlock", "type": "uint256" }, { "internalType": "uint256", "name": "_startBlock", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "EmergencyWithdraw", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newAddress", "type": "address" }], "name": "SetFeeAddress", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "goosePerBlock", "type": "uint256" }], "name": "UpdateEmissionRate", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Withdraw", "type": "event" }, { "inputs": [], "name": "BONUS_MULTIPLIER", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAX_TOKEN_PER_BLOCK", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAX_DEPOSIT_FEE_BP", "outputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_allocPoint", "type": "uint256" }, { "internalType": "contract IBEP20", "name": "_lpToken", "type": "address" }, { "internalType": "uint16", "name": "_depositFeeBP", "type": "uint16" }, { "internalType": "bool", "name": "_withUpdate", "type": "bool" }], "name": "add", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "token", "outputs": [{ "internalType": "contract RichPigToken", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "tokenPerBlock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "deposit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "emergencyWithdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "feeAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_from", "type": "uint256" }, { "internalType": "uint256", "name": "_to", "type": "uint256" }], "name": "getMultiplier", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "massUpdatePools", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "address", "name": "_user", "type": "address" }], "name": "pendingToken", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "contract IBEP20", "name": "", "type": "address" }], "name": "poolExistence", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "poolInfo", "outputs": [{ "internalType": "contract IBEP20", "name": "lpToken", "type": "address" }, { "internalType": "uint256", "name": "allocPoint", "type": "uint256" }, { "internalType": "uint256", "name": "lastRewardBlock", "type": "uint256" }, { "internalType": "uint256", "name": "accTokenPerShare", "type": "uint256" }, { "internalType": "uint16", "name": "depositFeeBP", "type": "uint16" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "poolLength", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_allocPoint", "type": "uint256" }, { "internalType": "uint16", "name": "_depositFeeBP", "type": "uint16" }, { "internalType": "bool", "name": "_withUpdate", "type": "bool" }], "name": "set", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_feeAddress", "type": "address" }], "name": "setFeeAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "startBlock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalAllocPoint", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_tokenPerBlock", "type": "uint256" }], "name": "updateEmissionRate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "updatePool", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" }], "name": "userInfo", "outputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "rewardDebt", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }],
 abiLPToken: [{ "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount0", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }], "name": "Burn", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount0", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1", "type": "uint256" }], "name": "Mint", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount0In", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1In", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount0Out", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1Out", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }], "name": "Swap", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint112", "name": "reserve0", "type": "uint112" }, { "indexed": false, "internalType": "uint112", "name": "reserve1", "type": "uint112" }], "name": "Sync", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "constant": true, "inputs": [], "name": "DOMAIN_SEPARATOR", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "MINIMUM_LIQUIDITY", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "PERMIT_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }], "name": "burn", "outputs": [{ "internalType": "uint256", "name": "amount0", "type": "uint256" }, { "internalType": "uint256", "name": "amount1", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "factory", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getReserves", "outputs": [{ "internalType": "uint112", "name": "_reserve0", "type": "uint112" }, { "internalType": "uint112", "name": "_reserve1", "type": "uint112" }, { "internalType": "uint32", "name": "_blockTimestampLast", "type": "uint32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_token0", "type": "address" }, { "internalType": "address", "name": "_token1", "type": "address" }], "name": "initialize", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "kLast", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }], "name": "mint", "outputs": [{ "internalType": "uint256", "name": "liquidity", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "nonces", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "permit", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "price0CumulativeLast", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "price1CumulativeLast", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }], "name": "skim", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "amount0Out", "type": "uint256" }, { "internalType": "uint256", "name": "amount1Out", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "swap", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "sync", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "token0", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "token1", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }]
}

var pools = [
 {
  id: 0,
  name: 'PIG',
  earn: 'PIG',
  icon: 'pig.png',
  compound: true,
  address: '0xF8C6fADC19De74Aa366602fa854ce043479D4fef', // PIG
  pair: '0x95f33087e9e8a4df0a270ec388c20c8cce0afe11' // PIG-BUSD LP
 }, {
  id: 1,
  name: 'WBNB',
  earn: 'PIG',
  icon: 'wbnb.png',
  compound: false,
  address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', // WBNB
  pair: '0x58f876857a02d6762e0101bb5c46a8c1ed44dc16' // WBNB-BUSD LP
 }, {
  id: 2,
  name: 'USDT',
  earn: 'PIG',
  icon: 'usdt.png',
  compound: false,
  address: '0x55d398326f99059fF775485246999027B3197955', // USDT
  pair: '0x7efaef62fddcca950418312c6c91aef321375a00' // USDT-BUSD LP
 }, {
  id: 3,
  name: 'ETH',
  earn: 'PIG',
  icon: 'eth.png',
  compound: false,
  address: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8', // ETH
  pair: '0x7213a321f1855cf1779f42c0cd85d3d95291d34c' // ETH-BUSD LP
 }, {
  id: 4,
  name: 'BUSD',
  earn: 'PIG',
  icon: 'busd.png',
  compound: false,
  address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', // BUSD
  pair: '0x172d2d53974877569eaf18cf9616821798c2db7f' // PIG-BUSD LP (BUSD-BUSD will ignore)
 }, {
  id: 5,
  name: 'DAI',
  earn: 'PIG',
  icon: 'dai.png',
  compound: false,
  address: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3', // DAI
  pair: '0x66fdb2eccfb58cf098eaa419e5efde841368e489' // DAI-BUSD LP
 }, {
  id: 6,
  name: 'USDC',
  earn: 'PIG',
  icon: 'usdc.png',
  compound: false,
  address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', // USDC
  pair: '0x2354ef4df11afacb85a5c7f98b624072eccddbb1' // USDC-BUSD LP
 }, {
  id: 7,
  name: 'CAKE',
  earn: 'PIG',
  icon: 'cake.png',
  compound: false,
  address: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82', // CAKE
  pair: '0x804678fa97d91b974ec2af3c843270886528a9e6' // CAKE-BUSD LP
 }, {
  id: 8,
  name: 'BTCB',
  earn: 'PIG',
  icon: 'btcb.png',
  compound: false,
  address: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c', // BTCB
  pair: '0xf45cd219aef8618a92baa7ad848364a158a24f33' // BTCB-BUSD LP
 }
];

var farms = [
 {
  id: 9,
  name: 'PIG-WBNB LP',
  earn: 'PIG',
  icon: 'pig-wbnb.png',
  compound: false,
  address: '0xd0c629a6ee3ba0b9dcfd4e4f7d8fada8aec6a8d6', // PIG-WBNB LP
  tokenA: '0xF8C6fADC19De74Aa366602fa854ce043479D4fef', // PIG
  tokenB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', // WBNB
  tokenAUSD: '0x95f33087e9e8a4df0a270ec388c20c8cce0afe11', // PIG-BUSD LP
  tokenBUSD: '0x58f876857a02d6762e0101bb5c46a8c1ed44dc16' // WBNB-BUSD LP
 }, {
  id: 10,
  name: 'PIG-BUSD LP',
  earn: 'PIG',
  icon: 'pig-busd.png',
  compound: false,
  address: '0x95f33087e9e8a4df0a270ec388c20c8cce0afe11', // PIG-BUSD LP
  tokenA: '0xF8C6fADC19De74Aa366602fa854ce043479D4fef', // PIG
  tokenB: '0xe9e7cea3dedca5984780bafc599bd69add087d56', // BUSD
  tokenAUSD: '0x95f33087e9e8a4df0a270ec388c20c8cce0afe11', // PIG-BUSD LP
  tokenBUSD: '' // BUSD-BUSD LP will ignore
 }, {
  id: 11,
  name: 'WBNB-BUSD LP',
  earn: 'PIG',
  icon: 'wbnb-busd.png',
  compound: false,
  address: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16', // WBNB-BUSD LP
  tokenA: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c', // WBNB
  tokenB: '0xe9e7cea3dedca5984780bafc599bd69add087d56', // BUSD
  tokenAUSD: '0x58f876857a02d6762e0101bb5c46a8c1ed44dc16', // WBNB-BUSD LP
  tokenBUSD: '' // BUSD-BUSD LP will ignore
 }
];

var menu_left = [
 { id: 'buttonHome', name: 'Home', icon: 'home.svg', link: './', new_window: false },
 {
  name: 'Trade', icon: 'trade.svg', items: [
   { name: 'Exchange', icon: 'exchange.svg', link: 'https://exchange.pancakeswap.finance/#/swap?outputCurrency=' + config.addressToken, new_window: true },
   { name: 'Liquidity', icon: 'liquidity.svg', link: 'https://exchange.pancakeswap.finance/#/add/' + config.addressToken, new_window: true }
  ]
 },
 { id: 'buttonFarms', name: 'Farms', icon: 'farms.svg', link: './farms', new_window: false },
 { id: 'buttonPools', name: 'Pools', icon: 'pools.svg', link: './pools', new_window: false },
 {
  name: 'Community', icon: 'community.svg', items: [
   { name: 'Twitter', icon: 'twitter.svg', link: 'https://twitter.com/RichPig9', new_window: true },
   { name: 'Telegram announcements', icon: 'telegram.svg', link: 'https://t.me/richpig_ann', new_window: true },
   { name: 'Telegram chat group', icon: 'telegram.svg', link: 'https://t.me/richpig_group', new_window: true },
   { name: 'Discord', icon: 'discord.svg', link: 'https://discord.gg/aCNHtZK8wm', new_window: true },
  // { name: 'Bitcoin Talk Forum', icon: 'bitcoin.svg', link: 'https://bitcointalk.org/index.php?topic=5341559', new_window: true },
  // { name: 'Reddit', icon: 'reddit.svg', link: 'https://www.reddit.com/r/RichPig/', new_window: true }
  ]
 },
 {
  name: 'Audits &amp; reviews', icon: 'audits.svg', items: [
   { name: 'Techrate audit (coming soon)', icon: 'audit.svg', link: '', new_window: true },
   { name: 'RugDoc review (coming soon)', icon: 'review.svg', link: '', new_window: true }
  ]
 },
 {
  name: 'More', icon: 'more.svg', items: [
   { name: 'PooCoin chart', icon: 'poocoin.svg', link: 'https://poocoin.app/tokens/' + config.addressToken, new_window: true },
   // { name: 'Live Coin Watch chart', icon: 'chart.svg', link: 'https://www.livecoinwatch.com/price/RichPigToken-PIG', new_window: true },
   // { name: 'DappRadar page', icon: 'list.svg', link: 'https://dappradar.com/binance-smart-chain/defi/richpig', new_window: true },
   { name: 'GitHub sources', icon: 'github.svg', link: 'https://github.com/RichPigToken/', new_window: true },
   { name: 'Documentation', icon: 'docs.svg', link: 'https://richpig.gitbook.io/', new_window: true }
  ]
 }
];

var menu_right = [
 { id: 'buttonAddIcon', name: '+', icon: 'metamask.png', link: 'javascript:eAPI.addIconToWallet();', new_window: false },
 { id: 'buttonConnect', name: 'Connect', icon: 'wallet.svg', link: 'javascript:connectButtonClick();', new_window: false }
];
