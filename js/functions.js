const page = location.pathname.replace('/', '');
var eAPI;
window.onload = function(){
  loadEthAPI();
}

function loadEthAPI() {
 var settingsAPI = {
  network: config.network,
  chainID: config.chainID,
  addressMasterChef: config.addressMasterChef,
  addressToken: config.addressToken,
  addressUSDToken: config.addressUSDToken,
  abiMasterChef: config.abiMasterChef,
  abiToken: config.abiToken,
  abiLPToken: config.abiLPToken,
  symbolToken: config.symbolToken,
  decimalsToken: config.decimalsToken,
  imageToken: config.imageToken,
  symbolNative: config.symbolNative,
  symbolNativeName: config.symbolNativeName,
  decimalsNative: config.decimalsNative,
  explorer: config.explorer
 }
 eAPI = new ethAPI(settingsAPI);
}

function roundLoc(number, digits) {
 number = Number(number);
 return number.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: digits });
}

async function getFileContent(file) {
 var response = await fetch(file);
 return response.text();
}

function setNotification(label, text, error) {
  const notification = document.createElement("div");
  notification.className = 'notification alert alert-dismissible fade show alert-' + (error ? 'danger' : 'success');
  notification.setAttribute("role", "alert");
  notification.innerHTML = '<span class="notification-label" class="bold">' + label + '</span><span class="notification-text">' + text + '</span><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'
  document.querySelector('#notifications').prepend(notification);
  const notifications = document.getElementsByClassName("notification");
  if(notifications.length > 3)
    for(var i = 3; i < notifications.length; i++)
      notifications[i].getElementsByClassName("btn-close")[0].click();
}

function connectButtonClick(){
  if(eAPI.addressWallet ){
    const buttonConnect = document.querySelector('#buttonConnect');
    const walletSubmenu = document.getElementById("wallet-submenu");
    if(buttonConnect.classList.contains("show")){
      buttonConnect.classList.remove("show");
      walletSubmenu.classList.remove("show");
    } else {
      buttonConnect.classList.add("show");
      walletSubmenu.classList.add("show");
    }
  } else {
    eAPI.connectWallet();
  }
}

function setConnectButton() {
 var addressWalletLabel = eAPI.addressWallet ? eAPI.addressWallet.substr(0, 7) + '...' + eAPI.addressWallet.substr(-5) : 'Connect';
 const buttonConnect = document.querySelector('#buttonConnect');
 buttonConnect.querySelector('img').setAttribute('alt', addressWalletLabel);
 buttonConnect.querySelector('span').innerText = addressWalletLabel;
 const walletSubmenu = document.getElementById("wallet-submenu");
 if(walletSubmenu) walletSubmenu.remove();
 if(eAPI.addressWallet ){
   const ul = document.createElement("div");
   ul.className = "dropdown-menu";
   ul.setAttribute("id", "wallet-submenu");
   ul.innerHTML = "<a class='dropdown-item' href='javascript:copyAddress(\"" + eAPI.addressWallet + "\")'>COPY ADDRESS</a><a class='dropdown-item' href='https://google.cz' target='_blank'>SHOW ADDRESS IN EXPLORER</a>";
   buttonConnect.parentElement.appendChild(ul);
   buttonConnect.classList.add("dropdown-toggle");
   buttonConnect.parentElement.classList.add("dropdown");
 } else {
   buttonConnect.classList.remove("dropdown-toggle");
   buttonConnect.parentElement.classList.remove("dropdown");
 }
}

function copyAddress(address){
  copyToClipBoard(address);
  document.querySelector('#buttonConnect').classList.remove("show");
  document.getElementById("wallet-submenu").classList.remove("show");
}

function copyToClipBoard(text){
  var copyText = document.createElement("input");
  document.body.appendChild(copyText);
  copyText.setAttribute("type", "text");
  copyText.value = text;
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */
  document.execCommand("copy");
  copyText.remove();
}

async function getPage() {
 var pagefile = '';
 switch (page) {
  case 'pools':
   document.title += ' - Pools';
   pagefile = './html/pools.html';
   break;
  case 'farms':
   document.title += ' - Farms';
   pagefile = './html/farms.html';
   break;
  default:
   pagefile = './html/home.html';
   break;
 }
 var response = await getFileContent(pagefile);
 document.querySelector('#page').innerHTML = preparePage(response, page);
 switch (page) {
  case 'pools':
   getPools(false);
   break;
  case 'farms':
   getPools(true);
   break;
  default:
   await getHome();
   break;
 }
}

function preparePage(html, page)
{
  if(page == "pools")
  {
    const poolsGridClass = localStorage.getItem("pools-grid-class");
    html = html.replace("{pools-grid-class}", poolsGridClass ? poolsGridClass : "grid-view");
    const onlyStacked = localStorage.getItem("pools-only-stacked");
    html = html.replace("{only-stacked-pools-checked}", onlyStacked == "true" ? "checked='checked'" : "");
    html = html.replace("{pools-only-stacked-class}", onlyStacked == "true"  ? "only-stacked" : "");
  }

  return html;
}

async function getModal(title, body) {
 var modalElem = document.querySelector('#modal');
 modalElem.querySelector('#modal-title').innerText = title;
 modalElem.querySelector('#modal-body').innerHTML = body;
 var modal = bootstrap.Modal.getOrCreateInstance(modalElem);
 modal.toggle();
}

function loadScript(url, callback)
{
    var head = document.head;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    if(typeof callback !== "undefined"){
      script.onreadystatechange = callback;
      script.onload = callback;
    }
    head.appendChild(script);
}