async function getFooter() {
 document.querySelector('#footer-year').innerText = new Date().getFullYear();
 document.querySelector('#footer-project').innerText = config.project;
 var footerPriceHTML;
 var price;
 var promises = [];
 promises.push(getFileContent('./html/footer-price.html').then(res => footerPriceHTML = res));
 promises.push(eAPI.getTokenPrice(config.addressToken, config.addressTokenUSDPair).then(res => price = res));
 var i;
 for (i = 0; i < promises.length; i++) await promises[i];
 var replaceTexts = [
  [ '{link}', config.priceLinkToken ],
  [ '{price}', roundLoc(price, 6) + ' USD / ' + config.symbolToken ]
 ];
 for (i = 0; i < replaceTexts.length; i++) footerPriceHTML = footerPriceHTML.replaceAll(replaceTexts[i][0], replaceTexts[i][1]);
 document.querySelector('#footer-price').innerHTML = footerPriceHTML;
}
