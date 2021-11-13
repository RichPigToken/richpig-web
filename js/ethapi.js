class ethAPI {
 constructor(_settings) {
  this.tokenPrices = [];
  this.maxUint256 = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
  this.settings = _settings;
  this.web3 = new Web3(window.ethereum && window.ethereum.networkVersion == this.settings.chainID ? window.ethereum : this.settings.network);
  this.contractToken = new this.web3.eth.Contract(this.settings.abiToken, this.settings.addressToken);
  this.contractMC = new this.web3.eth.Contract(this.settings.abiMasterChef, this.settings.addressMasterChef);
 }
 
 getTokenName() {
  return this.contractToken.methods.name().call();
 }

 getTokenSymbol() {
  return this.contractToken.methods.symbol().call();
 }

 getCurrentBlock() {
  return this.web3.eth.getBlockNumber();
 }

 getBlock(number) {
  return this.web3.eth.getBlock(number);
 }

 getMCTotalAlocPoint() {
  return this.contractMC.methods.totalAllocPoint().call();
 }

 getMCTokensPerBlock() {
  return this.contractMC.methods.tokenPerBlock().call();
 }

 getPendingTokens(poolID, walletAddress) {
  return this.contractMC.methods.pendingToken(poolID, walletAddress).call();
 }

 getUserInfo(poolID, walletAddress) {
  return this.contractMC.methods.userInfo(poolID, walletAddress).call();
 }

 getPoolInfo(poolID) {
  return this.contractMC.methods.poolInfo(poolID).call();
 }

 getTokenBalance(walletAddress) {
  return this.contractToken.methods.balanceOf(walletAddress).call();
 }

 getTokenTotalSupply() {
  return this.contractToken.methods.totalSupply().call();
 }

 getAnyTokenBalance(addressToken, walletAddress) {
  var contractAnyToken = new this.web3.eth.Contract(this.settings.abiToken, addressToken);
  return contractAnyToken.methods.balanceOf(walletAddress).call();
 }

 async getBlockTime() {
  var blockNum = 100;
  var blockCurrent;
  var blockOld;
  var blockNumberCurrent = await eAPI.getCurrentBlock();
  var promises = [];
  promises.push(this.getBlock(blockNumberCurrent).then(res => blockCurrent = res));
  promises.push(this.getBlock(blockNumberCurrent - blockNum).then(res => blockOld = res));
  var i;
  for (i = 0; i < promises.length; i++) await promises[i];
  var timeDiff = blockCurrent.timestamp - blockOld.timestamp;
  return timeDiff / blockNum;
 }

 async getTokenPrice(tokenAddress, USDPairAddress) {
  var i;
  for (i = 0; i < this.tokenPrices.length; i++) if (this.tokenPrices[i].address == tokenAddress) return this.tokenPrices[i].price;
  var contractToken = new this.web3.eth.Contract(this.settings.abiToken, tokenAddress);
  var contractUSDToken = new this.web3.eth.Contract(this.settings.abiToken, this.settings.addressUSDToken);
  var balToken;
  var balUSD;
  var promises = [];
  promises.push(contractToken.methods.balanceOf(USDPairAddress).call().then(res => balToken = res));
  promises.push(contractUSDToken.methods.balanceOf(USDPairAddress).call().then(res => balUSD = res));
  for (i = 0; i < promises.length; i++) await promises[i];
  var decimalDiv = '1000000000000000000';
  var balUSDdec = this.calcBN(balUSD, decimalDiv, 'mul');
  var tokenPrice = this.calcBN(balUSDdec, balToken, 'div');
  tokenPrice /= decimalDiv;
  this.tokenPrices.push({ address: tokenAddress, price: tokenPrice });
  return tokenPrice;
 }
 
 async getLPTokenPrice(addressLP, addressTokenA, addressTokenB, addressTokenAUSD, addressTokenBUSD) {
  var contractLP = new this.web3.eth.Contract(this.settings.abiLPToken, addressLP);
  var contractTOK1 = new this.web3.eth.Contract(this.settings.abiToken, addressTokenA);
  var contractTOK2 = new this.web3.eth.Contract(this.settings.abiToken, addressTokenB);
  var balTOK1;
  var balTOK2;
  var totalSupplyLP;
  var priceTOK1;
  var priceTOK2;
  if (addressTokenA == this.settings.addressUSDToken) priceTOK1 = 1;
  if (addressTokenB == this.settings.addressUSDToken) priceTOK2 = 1;
  var promises = [];
  promises.push(contractTOK1.methods.balanceOf(addressLP).call().then(res => balTOK1 = res));
  promises.push(contractTOK2.methods.balanceOf(addressLP).call().then(res => balTOK2 = res));
  promises.push(contractLP.methods.totalSupply().call().then(res => totalSupplyLP = res));
  if (!priceTOK1) promises.push(this.getTokenPrice(addressTokenA, addressTokenAUSD).then(res => priceTOK1 = res));
  if (!priceTOK2) promises.push(this.getTokenPrice(addressTokenB, addressTokenBUSD).then(res => priceTOK2 = res));
  var i;
  for (i = 0; i < promises.length; i++) await promises[i];
  var decimalDiv = '1000000000000000000';
  var balTOK1mul = this.calcBN(balTOK1, decimalDiv, 'mul');
  var balTOK2mul = this.calcBN(balTOK2, decimalDiv, 'mul');
  var lpTOK1 = this.calcBN(balTOK1mul, totalSupplyLP, 'div');
  var lpTOK2 = this.calcBN(balTOK2mul, totalSupplyLP, 'div');
  var lpTOK1USD = this.toEth(lpTOK1) * priceTOK1;
  var lpTOK2USD = this.toEth(lpTOK2) * priceTOK2;
  return lpTOK1USD + lpTOK2USD;
 }

 async poolApproved(tokenAddress, addressWallet, addressMasterChef) {
  var tokenContract = new this.web3.eth.Contract(this.settings.abiToken, tokenAddress);
  var allowance = await tokenContract.methods.allowance(addressWallet, addressMasterChef).call();
  return allowance == '0' ? false : true;
 }

 setApproveToken(addressToken) {
  var tokenContract = new this.web3.eth.Contract(this.settings.abiToken, addressToken);
  return tokenContract.methods.approve(this.settings.addressMasterChef, this.maxUint256);
 }

 setDeposit(poolID, amount) {
  return this.contractMC.methods.deposit(poolID, amount);
 }

 setWithdraw(poolID, amount) {
  return this.contractMC.methods.withdraw(poolID, amount);
 }

 async connectWallet() {
  try {
   if (window.ethereum) {
    await window.ethereum.request({method: 'eth_requestAccounts'});
  this.web3 = new Web3(window.ethereum && window.ethereum.networkVersion == this.settings.chainID ? window.ethereum : this.settings.network);
 //if (window.ethereum.selectedAddress) {   
    if (window.ethereum.networkVersion == this.settings.chainID) {
     var addr = await this.web3.eth.getAccounts();
      if (addr[0] && window.ethereum.selectedAddress) {
       this.addressWallet = window.ethereum.selectedAddress;
       setConnectButton();
       if (page == 'pools' || page == 'farms') updatePools();
       if (page == '') updateHome();
      } else {
       this.addressWallet = null;
       setConnectButton();
       setNotification('ERROR: ', 'Cannot find any wallet account', true);
      }
     } else {
      this.addressWallet = null;
      setConnectButton();
      //setNotification('ERROR: ', 'Wrong wallet network!', true);
      const chId = '0x' + parseInt(this.settings.chainID).toString(16);
      try {
        await ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: chId }] });
      } catch (error) {
          if (error.code === 4902) {
              await ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{ 
                  chainId: chId, 
                  rpcUrls: [this.settings.network], 
                  chainName: "Binance Smart Chain",
                  "nativeCurrency": {
                    "name": this.settings.symbolNativeName,
                    "symbol": this.settings.symbolNative,
                    "decimals": this.settings.decimalsNative
                  },
                  "blockExplorerUrls": [this.settings.explorer]
                }],
              });
              connectWallet();
              return;
          } else if(error.code == -32002) {
            this.addressWallet = null;
            setConnectButton();
            setNotification('ERROR: ', 'Please choose chain in your wallet - <strong>Binance Smart Chain</strong>', true);
          } else {
            throw(error);
          }
        }
     }
   } else {
    this.addressWallet = null;
    setConnectButton();
    setNotification('ERROR: ', 'Cannot find any wallet!', true);
   }
  } catch (error) {
   this.addressWallet = null;
   setConnectButton();
   setNotification('ERROR: ', error.message + "(CODE: " + error.code + ")", true);
  }
 }

 addIconToWallet() {
  if(!window.ethereum)
    return;
  window.ethereum.sendAsync({
   method: 'wallet_watchAsset',
   params: {
    type: 'ERC20',
    options: {
     address: this.settings.addressToken,
     symbol: this.settings.symbolToken,
     decimals: this.settings.decimalsToken,
     image: window.location.protocol + '//' + window.location.host + '/img/coins/' + this.settings.imageToken,
    },
   },
  });
 }

 toEth(amount) { // TODO: check number of decimals for each token first
  return this.web3.utils.fromWei(amount, 'ether');
 }

 calcBN(numberA, numberB, operator) {
  var nA = new this.web3.utils.BN(numberA);
  var nB = new this.web3.utils.BN(numberB);
  if (operator == 'add') return nA.add(nB);
  else if (operator == 'sub') return nA.sub(nB);
  else if (operator == 'mul') return nA.mul(nB);
  else if (operator == 'div') return nA.div(nB);
  else return false;
 }
}
