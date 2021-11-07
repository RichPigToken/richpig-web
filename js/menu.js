async function getMenu() {
 var menuItem;
 var menuDrop;
 var menuDropItem;
 var promises = [];
 promises.push(getFileContent('./html/menu-item.html').then(res => menuItem = res));
 promises.push(getFileContent('./html/menu-drop.html').then(res => menuDrop = res));
 promises.push(getFileContent('./html/menu-drop-item.html').then(res => menuDropItem = res));
 var i;
 for (i = 0; i < promises.length; i++) await promises[i];
 var menuitems = '';
 for (i = 0; i < menu_left.length; i++) {
  var item = '';
  if ('link' in menu_left[i]) {
   var item = menuItem;
   var replaceTexts = [
    [ '{id}', menu_left[i].id ],
    [ '{link}', ' href="' + menu_left[i].link + '"' ],
    [ '{new-window}', menu_left[i].new_window ? ' target="_blank"' : '' ]
   ];
   var j;
   for (j = 0; j < replaceTexts.length; j++) item = item.replaceAll(replaceTexts[j][0], replaceTexts[j][1]);
   var pagelink = menu_left[i].link;
   pagelink = pagelink.replaceAll('./', '');
   item = item.replace('{active}', pagelink == page ? ' active' : '');
  } else {
   item = menuDrop;
   var subitems = '';
   var j;
   for (j = 0; j < menu_left[i].items.length; j++) {
    var subitem = menuDropItem;
    var replaceTexts = [
     [ '{name}', menu_left[i].items[j].name ],
     [ '{image}', menu_left[i].items[j].icon ],
     [ '{link}', menu_left[i].items[j].link ],
     [ '{new-window}', menu_left[i].items[j].new_window ? ' target="_blank"' : '' ]
    ];
    var k;
    for (k = 0; k < replaceTexts.length; k++) subitem = subitem.replaceAll(replaceTexts[k][0], replaceTexts[k][1]);
    subitems += subitem + "\r\n";
   }
   item = item.replaceAll('{drop-items}', subitems);
  }
  var replaceTexts = [
   [ '{name}', menu_left[i].name ],
   [ '{image}', menu_left[i].icon ],
  ];
  var j;
  for (j = 0; j < replaceTexts.length; j++) item = item.replaceAll(replaceTexts[j][0], replaceTexts[j][1]);
  menuitems += item + "\r\n";
 }
 document.querySelector('#menu-left').innerHTML = menuitems;
 menuitems = '';
 for (i = 0; i < menu_right.length; i++) {
  var item = '';
  item = menuItem;
  var replaceTexts = [
   [ '{id}', menu_right[i].id ],
   [ '{name}', menu_right[i].name ],
   [ '{image}', menu_right[i].icon ],
   [ '{link}', ' href="' + menu_right[i].link + '"' ],
   [ '{new-window}', menu_right[i].new_window ? ' target="_blank"' : '' ],
   [ '{active}', '' ],
  ];
  var j;
  for (j = 0; j < replaceTexts.length; j++) item = item.replaceAll(replaceTexts[j][0], replaceTexts[j][1]);
  menuitems += item + "\r\n";
 }
 document.querySelector('#menu-right').innerHTML = menuitems;
}
