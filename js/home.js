var valuePage;
var tokenNamePage;
var poolsValueTotal;
var farmsValueTotal;
var updateHomeTimeout;

async function getHome() {
 loadScript("https://platform.twitter.com/widgets.js");
 document.querySelector('#home-title').innerText = config.project;
 document.querySelector('#home-description').innerText = config.description;
 var promises = [];
 promises.push(getFileContent('./html/home-data-value.html').then(res => valuePage = res));
 promises.push(getFileContent('./html/home-token-name.html').then(res => tokenNamePage = res));
 for (var i = 0; i < promises.length; i++) await promises[i];
    updateHome();
}

async function updateHome() {
 clearTimeout(updateHomeTimeout);
 getOverview();
 var promises = [];
 var earned = 0;
 var earnedUSD = 0;
 var priceToken = 0;
 promises.push(getPoolValues(pools, false));
 promises.push(getPoolValues(farms, true));
 if (eAPI.addressWallet) {
    promises.push(eAPI.getTokenPrice(config.addressToken, config.addressTokenUSDPair).then(res => priceToken = res));
    farms.forEach(pool => {
        promises.push(eAPI.getPendingTokens(pool.id, eAPI.addressWallet).then(res => earned += eAPI.toEth(res)));
    });
    pools.forEach(pool => {
        promises.push(eAPI.getPendingTokens(pool.id, eAPI.addressWallet).then(res => earned += eAPI.toEth(res)));
    })
 }
 var i;
 for (i = 0; i < promises.length; i++) await promises[i];

 if (earned) earnedUSD = (earned * priceToken).toString();
 const earnedHtml = earned ? roundLoc(earned, 4) + ' ' + config.symbolToken : 'Wallet not connected!';
 const earnedUSDHtml = earnedUSD ? '(' + roundLoc(earnedUSD, 2) + ' USD)' : '';
 document.querySelector('#home-value-all').innerText = roundLoc(poolsValueTotal + farmsValueTotal, 2) + ' USD';
 document.querySelector("#total-to-harvest").innerHTML = earnedHtml;
 document.querySelector("#total-to-harvest-usd").innerHTML = earnedUSDHtml;
 if(earned){
     document.querySelector("#total-harvest-button").innerHTML = '<a href="javascript:harvestAll()"><div class="button button-half button-green">Harvest ALL</div></a>';
 }
 updateHomeTimeout = setTimeout(updateHome, config.updateHomeInterval * 1000);
}
async function harvestAll(){
    if (eAPI.addressWallet) {
        arr = pools;
        for(var i = 0; i < pools.length; i++){
            const poolInfo = await eAPI.getPoolInfo(arr[i].id);
            const isStackedWallet = await eAPI.poolApproved(poolInfo.lpToken, eAPI.addressWallet, config.addressMasterChef);
            if(isStackedWallet)
                await setHarvest(i);
        }
        arr = farms;
        for(var i = 0; i < farms.length; i++){
            const poolInfo = await eAPI.getPoolInfo(arr[i].id);
            const isStackedWallet = await eAPI.poolApproved(poolInfo.lpToken, eAPI.addressWallet, config.addressMasterChef);
            if(isStackedWallet)
                await setHarvest(i);
        }
     }
}

async function getOverview() {
 var symbol;
 var totalSupply;
 var balanceDead;
 var tokenPrice;
 var addressTokenLink = document.querySelector('#address-token-link');
 addressTokenLink.setAttribute('href', config.explorer + '/address/' + config.addressToken);
 addressTokenLink.innerText = config.addressToken;
 var addressMCLink = document.querySelector('#address-masterchef-link');
 addressMCLink.setAttribute('href', config.explorer + '/address/' + config.addressMasterChef);
 addressMCLink.innerText = config.addressMasterChef;
 symbol = await eAPI.getTokenSymbol();
 eAPI.getTokenName().then(res => {
  var replaceText = [
   ['{name}', res ],
   ['{symbol}', symbol ],
   ['{icon}', config.imageToken ],
  ];
  var i;
  for (i = 0; i < replaceText.length; i++) tokenNamePage = tokenNamePage.replaceAll(replaceText[i][0], replaceText[i][1]);
  document.querySelector('#token-name').innerHTML = tokenNamePage;
 });
 eAPI.getMCTokensPerBlock().then(res => {
  document.querySelector('#tokens-per-block').innerText = roundLoc(eAPI.toEth(res), 4) + ' ' + symbol;
 });
 if (eAPI.addressWallet) {
  eAPI.getTokenBalance(eAPI.addressWallet).then(res => {
   document.querySelector('#balance').innerText = roundLoc(eAPI.toEth(res), 4) + ' ' + symbol;
  });
 } else document.querySelector('#balance').innerText = 'Wallet not connected!';
 var promises = [];
 promises.push(eAPI.getTokenTotalSupply().then(res => totalSupply = res));
 promises.push(eAPI.getTokenBalance(config.addressDead).then(res => balanceDead = res));
 promises.push(eAPI.getTokenPrice(config.addressToken, config.addressTokenUSDPair).then(res => tokenPrice = res));
 var i;
 for (i = 0; i < promises.length; i++) await promises[i];
 document.querySelector('#total-supply').innerText = roundLoc(eAPI.toEth(totalSupply), 0) + ' ' + symbol;
 document.querySelector('#burned').innerText = roundLoc(eAPI.toEth(balanceDead), 0) + ' ' + symbol;
 var circulating = eAPI.toEth(eAPI.calcBN(totalSupply, balanceDead, 'sub'));
 document.querySelector('#circulating').innerText = roundLoc(circulating, 0) + ' ' + symbol;
 document.querySelector('#token-price').innerText = roundLoc(tokenPrice, 6) + ' USD / ' + symbol;
 document.querySelector('#market-cap').innerText = roundLoc(tokenPrice * circulating, 0) + ' USD';
}

async function getPoolValues(arr, isFarms) {
 var tokenPool_promises = [];
 var i;
 for (i = 0; i < arr.length; i++) {
  const pool = arr[i];
  if (isFarms) tokenPool_promises.push(eAPI.getLPTokenPrice(arr[i].address, arr[i].tokenA, arr[i].tokenB, arr[i].tokenAUSD, arr[i].tokenBUSD).then(res => pool.price = res));
  else tokenPool_promises.push(eAPI.getTokenPrice(arr[i].address, arr[i].pair).then(res => pool.price = res));
  tokenPool_promises.push(eAPI.getAnyTokenBalance(arr[i].address, config.addressMasterChef).then(res => pool.value = eAPI.toEth(res)));
 }
 for (i = 0; i < tokenPool_promises.length; i++) await tokenPool_promises[i];
 var pools_rows = '';
 var totalValueUSD = 0;
 for (i = 0; i < arr.length; i++) {
  arr[i].value_usd = arr[i].value * arr[i].price;
  totalValueUSD += arr[i].value_usd;
  var replaceText = [
   ['{name}', arr[i].name ],
   ['{icon}', arr[i].icon ],
   ['{price}', roundLoc(arr[i].price, 4) ],
   ['{value}',  roundLoc(arr[i].value, 6) + ' ' + arr[i].name ],
   ['{value_usd}', roundLoc(arr[i].value_usd, 2) + ' USD' ]
  ];
  var row = valuePage;
  var j;
  for (j = 0; j < replaceText.length; j++) row = row.replaceAll(replaceText[j][0], replaceText[j][1]);
  pools_rows += row;
 }
 document.querySelector('#' + (isFarms ? 'farms' : 'pools') + '-value').innerHTML = pools_rows;
 var loadingElem = (isFarms ? 'farms' : 'pools') + '-loading';
 if (document.getElementById(loadingElem)) document.querySelector('#' + loadingElem).remove();
 document.querySelector('#' + (isFarms ? 'farms' : 'pools') + '-total-value').innerText = roundLoc(totalValueUSD, 2) + ' USD';
 if (isFarms) farmsValueTotal = totalValueUSD;
 else poolsValueTotal = totalValueUSD;
}
