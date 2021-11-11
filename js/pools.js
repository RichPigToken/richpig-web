var arr;
var iDataHTML;
var iDataNoFeesHTML;
var iDataCompoundHTML;
var iDataApproveHTML;
var iDataButtonsHTML;
var modalDepositHTML;
var modalWithdrawHTML;
var blockTime;
var totalAllocPoint;
var tokensPerBlock;
var tokPrice;
var isFarms;
var updatePoolsTimeout;
var calculatorHTML;

async function getPools() {
 isFarms = page == 'farms' ? true : false;
 arr = isFarms ? farms : pools;
 var itemHTML = '';
 var promises = [];
 promises.push(getFileContent('./html/pools-item.html').then(res => itemHTML = res));
 promises.push(getFileContent('./html/pools-item-data.html').then(res => iDataHTML = res));
 promises.push(getFileContent('./html/pools-item-data-nofees.html').then(res => iDataNoFeesHTML = res));
 promises.push(getFileContent('./html/pools-item-data-compound.html').then(res => iDataCompoundHTML = res));
 promises.push(getFileContent('./html/pools-item-data-approve.html').then(res => iDataApproveHTML = res));
 promises.push(getFileContent('./html/pools-item-data-buttons.html').then(res => iDataButtonsHTML = res));
 promises.push(getFileContent('./html/modal-deposit.html').then(res => modalDepositHTML = res));
 promises.push(getFileContent('./html/modal-withdraw.html').then(res => modalWithdrawHTML = res));
 var i;
 for (i = 0; i < promises.length; i++) await promises[i];
 var plist = '';
 for (i = 0; i < arr.length; i++) {
  var html = itemHTML;
  html = html.replaceAll('{id}', arr[i].id);
  plist += html;
 }
 document.querySelector('#pools').innerHTML = plist;
 updatePools();
}

async function updatePools() {
 clearTimeout(updatePoolsTimeout);
 var promises = [];
 promises.push(eAPI.getBlockTime().then(res => blockTime = res));
 promises.push(eAPI.getMCTotalAlocPoint().then(res => totalAllocPoint = res));
 promises.push(eAPI.getMCTokensPerBlock().then(res => tokensPerBlock = res));
 promises.push(eAPI.getTokenPrice(config.addressToken, config.addressTokenUSDPair).then(res => tokPrice = res));
 var i;
 for (i = 0; i < promises.length; i++) await promises[i];
 for (i = 0; i < arr.length; i++) updatePoolData(i);
 updatePoolsTimeout = setTimeout(updatePools, config.updatePoolsInterval * 1000);
}

async function updatePoolData(arrID) {
 var poolInfo = await eAPI.getPoolInfo(arr[arrID].id);
 var promises = [];
 var pricePoolToken;
 var priceToken;
 var earned;
 var stakeOwn;
 var stakeTotal;
 if (isFarms) 
    promises.push(eAPI.getLPTokenPrice(poolInfo.lpToken, arr[arrID].tokenA, arr[arrID].tokenB, arr[arrID].tokenAUSD, arr[arrID].tokenBUSD).then(res => pricePoolToken = res));
 else 
    promises.push(eAPI.getTokenPrice(poolInfo.lpToken, arr[arrID].pair).then(res => pricePoolToken = res));
 promises.push(eAPI.getTokenPrice(config.addressToken, config.addressTokenUSDPair).then(res => priceToken = res));
 if (eAPI.addressWallet) {
  promises.push(eAPI.getPendingTokens(arr[arrID].id, eAPI.addressWallet).then(res => earned = res));
  promises.push(eAPI.getUserInfo(arr[arrID].id, eAPI.addressWallet).then(res => stakeOwn = res));
 }
 promises.push(eAPI.getAnyTokenBalance(poolInfo.lpToken, config.addressMasterChef).then(res => stakeTotal = res));
 var i;
 for (i = 0; i < promises.length; i++) await promises[i];
 var earnedUSD;
 if (earned) earnedUSD = (eAPI.toEth(earned) * priceToken).toString();
 if (stakeOwn) stakeOwn = stakeOwn.amount;
 var stakeOwnUSD;
 if (stakeOwn) stakeOwnUSD = (eAPI.toEth(stakeOwn) * pricePoolToken).toString();
 var stakeTotalUSD = eAPI.toEth(stakeTotal) * pricePoolToken;
 var apr = getAPR(totalAllocPoint, blockTime, tokensPerBlock, tokPrice, poolInfo.allocPoint, stakeTotalUSD);
 var apy = getAPD(apr, 365);
 var fee = poolInfo.depositFeeBP / 100;
 var itemData = iDataHTML;
 var share;
 if (stakeOwn) {
  share = stakeTotal == 0 ? share = '0' : eAPI.calcBN(eAPI.calcBN(stakeOwn, 10000, 'mul'), stakeTotal, 'div');
  share = roundLoc(share / 100, 4);
 } 
 var poolButtons  = '';
 var stacked = false;
 if (eAPI.addressWallet){
   const isStackedWallet = await eAPI.poolApproved(poolInfo.lpToken, eAPI.addressWallet, config.addressMasterChef);
   poolButtons =  isStackedWallet ? iDataButtonsHTML : iDataApproveHTML;
   stacked = isStackedWallet;
 }
 var totalStake = eAPI.toEth(stakeTotal);
 var replaceTexts = [
  ['{icon}', arr[arrID].icon],
  ['{name}', arr[arrID].name],
  ['{earn}', arr[arrID].earn],
  ['{buttons}', poolButtons ],
  ['{alloc}', poolInfo.allocPoint / 100 + 'X'],
  ['{nofees}', fee == 0 ? iDataNoFeesHTML : ''],
  ['{explorer}', config.explorer],
  ['{apr}', apr <= 1000000 ? roundLoc(apr, 2) + '%' : '> ' + roundLoc(1000000, 0) + '%'],
  ['{apy}', apy <= 1000000 ? roundLoc(apy, 2) + '%' : '> ' + roundLoc(1000000, 0) + '%'],
  ['{price}', roundLoc(pricePoolToken, 6)],
  ['{total_stake}', roundLoc(totalStake, 4)],
  ['{total_stake}', roundLoc(totalStake, 4)],
  ['{total_stake_usd}', roundLoc(stakeTotalUSD, 2)],
  ['{fee}', fee + '%'],
  ['{address}', poolInfo.lpToken],
  ['{earned}', earned ? roundLoc(eAPI.toEth(earned), 4) + ' ' + arr[arrID].earn : 'Wallet not connected!'],
  ['{earned_usd}', earnedUSD ? '(' + roundLoc(earnedUSD, 2) + ' USD)' : ''],
  ['{staked}', stakeOwn ? roundLoc(eAPI.toEth(stakeOwn), 4) + ' ' + arr[arrID].name : 'Wallet not connected!'],
  ['{staked_usd}', stakeOwnUSD ? '(' + roundLoc(stakeOwnUSD, 2) + ' USD)' : ''],
  ['{share}', share ? share + '%' : 'Wallet not connected!'],
  ['{arr-id}', arrID],
  ['{address-token}', poolInfo.lpToken ],
  ['{compound}', arr[arrID].compound ? iDataCompoundHTML : ''],
  ['{id}', arr[arrID].id]
 ];
 for (i = 0; i < replaceTexts.length; i++) itemData = itemData.replaceAll(replaceTexts[i][0], replaceTexts[i][1]);
 var poolEl = document.querySelector('#item-data-' + arr[arrID].id);
 poolEl.innerHTML = itemData;
 if(stacked)
  poolEl.parentElement.parentElement.classList.add("item-stacked");
 else
  poolEl.parentElement.parentElement.classList.remove("item-stacked");
 if(totalStake <= 0)
  poolEl.parentElement.parentElement.classList.add("item-not-stake");
 else
  poolEl.parentElement.parentElement.classList.remove("item-not-stake");
}

function getAPD(apr, days) {
 return (((1 + apr / 100 / 365) ** days) - 1) * 100;
}

function getAPR(totalAllocPoint, blockTime, tokensPerBlock, tokenPrice, poolAllocPoint, totalValue, days) {
  if(typeof days == "undefined")
    days = 365;
 var poolWeight = poolAllocPoint / totalAllocPoint;
 var blocksPerYear = getBlocksPerDays(days, blockTime);
 var tokenRewardPerBlock = eAPI.toEth(tokensPerBlock) * poolWeight;
 var tokenRewardPerYear = blocksPerYear * tokenRewardPerBlock;
 var apr = (tokenPrice * tokenRewardPerYear / totalValue) * 100;
 return apr;
}

function getBlocksPerDays(days, blockTime) {
 return (60 * 60 * 24 * days) / blockTime;
}

async function getModalDeposit(id, addressToken) {
 var balance = await eAPI.getAnyTokenBalance(addressToken, eAPI.addressWallet);
 var replaceTexts = [];
 replaceTexts = [
  [ '{token}', arr[id].name ],
  [ '{max-amount}', eAPI.toEth(balance) ],
  [ '{arr-id}', id ],
 ];
 var i;
 for (i = 0; i < replaceTexts.length; i++) modalDepositHTML = modalDepositHTML.replaceAll(replaceTexts[i][0], replaceTexts[i][1]);
 getModal('Deposit ' + arr[id].name, modalDepositHTML);
}

async function getModalCalculator(id){
  var promises = [];
  var poolInfo = await eAPI.getPoolInfo(arr[id].id);

  if (isFarms) 
    promises.push(eAPI.getLPTokenPrice(poolInfo.lpToken, arr[id].tokenA, arr[id].tokenB, arr[id].tokenAUSD, arr[id].tokenBUSD).then(res => pricePoolToken = res));
  else 
    promises.push(eAPI.getTokenPrice(poolInfo.lpToken, arr[id].pair).then(res => pricePoolToken = res));

  if(!calculatorHTML)
     promises.push(getFileContent('./html/modal-calculator.html').then(res => calculatorHTML = res));
  promises.push(eAPI.getBlockTime().then(res => blockTime = res));
  promises.push(eAPI.getMCTotalAlocPoint().then(res => totalAllocPoint = res));
  promises.push(eAPI.getMCTokensPerBlock().then(res => tokensPerBlock = res));
  promises.push(eAPI.getTokenPrice(config.addressToken, config.addressTokenUSDPair).then(res => tokPrice = res));
  promises.push(eAPI.getAnyTokenBalance(poolInfo.lpToken, config.addressMasterChef).then(res => stakeTotal = res));
  for (var i = 0; i < promises.length; i++) await promises[i];

  var stakeTotalUSD = eAPI.toEth(stakeTotal) * pricePoolToken;

  var apr = getAPR(totalAllocPoint, blockTime, tokensPerBlock, tokPrice, poolInfo.allocPoint, stakeTotalUSD, 365);
  var apy = getAPD(apr, 365);

  var html = calculatorHTML;
  var apy = getAPD(apr, 1);
  var aprValue = getAPR(totalAllocPoint, blockTime, tokensPerBlock, tokPrice, poolInfo.allocPoint, stakeTotalUSD, 1);
  html = html.replaceAll('{APR_DAY}', roundLoc(aprValue, 2));
  html = html.replaceAll('{APY_DAY}', (apy <= 1000000 ? roundLoc(apy, 2) : '> ' + roundLoc(1000000, 0)));

  apy = getAPD(apr, 7);
  aprValue = getAPR(totalAllocPoint, blockTime, tokensPerBlock, tokPrice, poolInfo.allocPoint, stakeTotalUSD, 7);
  html = html.replaceAll('{APR_WEEK}', roundLoc(aprValue, 2));
  html = html.replaceAll('{APY_WEEK}', apy <= 1000000 ? roundLoc(apy, 2) : '> ' + roundLoc(1000000, 0));

  apy = getAPD(apr, 30);
  aprValue = getAPR(totalAllocPoint, blockTime, tokensPerBlock, tokPrice, poolInfo.allocPoint, stakeTotalUSD, 30);
  html = html.replaceAll('{APR_MONTH}', roundLoc(aprValue, 2));
  html = html.replaceAll('{APY_MONTH}', apy <= 1000000 ? roundLoc(apy, 2) : '> ' + roundLoc(1000000, 0));

  apy = getAPD(apr, 365);
  aprValue = getAPR(totalAllocPoint, blockTime, tokensPerBlock, tokPrice, poolInfo.allocPoint, stakeTotalUSD, 365);
  html = html.replaceAll('{APR_YEAR}', roundLoc(aprValue, 2));
  html = html.replaceAll('{APY_YEAR}', apy <= 1000000 ? roundLoc(apy, 2) : '> ' + roundLoc(1000000, 0));
  getModal('APR/APY ' + arr[id].name, html);
}

async function getModalWithdraw(id, addressToken) {
  var balance = 0;
  var promises = [];
  promises.push(eAPI.getUserInfo(arr[id].id, eAPI.addressWallet).then(res => balance = res.amount));
  var i;
  for (i = 0; i < promises.length; i++) await promises[i];
  var replaceTexts = [];
  replaceTexts = [
   [ '{token}', arr[id].name ],
   [ '{max-amount}', eAPI.toEth(balance) ],
   [ '{arr-id}', id ],
  ];
  var i, html = modalWithdrawHTML;
  for (i = 0; i < replaceTexts.length; i++) html = html.replaceAll(replaceTexts[i][0], replaceTexts[i][1]);
  getModal('Withdraw ' + arr[id].name, html);
}

async function setApprove(addressToken) {
 eAPI.setApproveToken(addressToken).send({ from: addressWallet })
 .on('transactionHash', (tx) => {
  setNotification('Approve transaction: ', '<a class="bold" href="' + config.explorer + '/tx/' + tx + '" target="_blank">' + tx + '</a>');
 })
 .on('confirmation', function(confirmationNumber, receipt) {
  if (confirmationNumber == 0) updatePools();
 });
}

async function setDeposit(arrID, amount) {
 eAPI.setDeposit(arr[arrID].id, eAPI.web3.utils.toWei(amount, 'ether')).send({ from: eAPI.addressWallet })
 .on('transactionHash', (tx) => {
  return tx.transactionHash;
 });
}

async function setWithdraw(arrID, amount) {
 eAPI.setWithdraw(arr[arrID].id, eAPI.web3.utils.toWei(amount, 'ether')).send({ from: eAPI.addressWallet })
 .on('transactionHash', (tx) => {
  return tx.transactionHash;
 });
}

async function setHarvest(arrID) {
 eAPI.setDeposit(arr[arrID].id, '0')
  .send({ from: eAPI.addressWallet })
  .on('transactionHash', (tx) => {
   setNotification('Harvest transaction: ', '<a class="bold" href="' + config.explorer + '/tx/' + tx + '" target="_blank">' + tx + '</a>');
  })
  .on('confirmation', function(confirmationNumber, receipt) {
   if (confirmationNumber == 0) updatePools();
  });
}

async function setApprove(addressToken) {
  const ap = eAPI.setApproveToken(addressToken);
   ap.send({ from: eAPI.addressWallet })
   .on('transactionHash', (tx) => {
    setNotification('Approve transaction: ', '<a class="bold" href="' + config.explorer + '/tx/' + tx + '" target="_blank">' + tx + '</a>');
   })
   .on('confirmation', function(confirmationNumber, receipt) {
    if (confirmationNumber == 0) updatePools();
   });
 }



async function setCompound(id) {
  var balance = 0;
  var promises = [];
  promises.push(eAPI.getUserInfo(arr[id].id, eAPI.addressWallet).then(res => balance = res.amount));
  var i;
  for (i = 0; i < promises.length; i++) await promises[i];
  console.log(balance);
  setDeposit(id, balance);
}

function getDepositAmount() {
  var ret = document.querySelector('#deposit-amount').value;
  return ret == "" ? "0" : ret;
}

function getWithdrawAmount() {
  var ret = document.querySelector('#withdraw-amount').value;
  return ret == "" ? "0" : ret;
}

function setDepositMaxAmount(amount) {
 document.querySelector('#deposit-amount').setAttribute('value', amount);
}

function setWithdrawMaxAmount(amount) {
  document.querySelector('#withdraw-amount').setAttribute('value', amount);
 }

function setGridView(){
  const grid = document.getElementById("grid-list-view");
  grid.classList.add("grid-view");
  grid.classList.remove("list-view");
  localStorage.setItem("pools-grid-class", "grid-view");
}

function setListView(){
  const grid = document.getElementById("grid-list-view");
  grid.classList.add("list-view");
  grid.classList.remove("grid-view");
  localStorage.setItem("pools-grid-class", "list-view");
}

function setGridStack(val)
{
  const grid = document.getElementById("grid-list-view");
  if(val){
    localStorage.setItem("pools-only-stacked", "true");
    grid.classList.add("only-stacked");
  } else {
    localStorage.setItem("pools-only-stacked", "false");
    grid.classList.remove("only-stacked");
  }
}