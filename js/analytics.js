async function getAnalytics() {
 var analyticsHTML = await getFileContent('./html/analytics.html');
 document.querySelector('#analytics').innerHTML = analyticsHTML;
}
