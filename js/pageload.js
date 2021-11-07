window.addEventListener('load', loadPage);

async function loadPage() {
 var promises = [];
 promises.push(getMenu());
 promises.push(getFooter());
 promises.push(getPage());
 promises.push(getAnalytics());
 var i;
 for (i = 0; i < promises.length; i++) await promises[i];
 eAPI.connectWallet();
 if (window.ethereum) {
  window.ethereum.on('connect', (chainId) => { eAPI.connectWallet(); });
  window.ethereum.on('disconnect', (error) => { eAPI.connectWallet(); });
  window.ethereum.on('accountsChanged', (accounts) => { eAPI.connectWallet(); });
  window.ethereum.on('chainChanged', (chainId) => { window.location.reload(); });
 }
}
