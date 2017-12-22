var myWindowId;

/**** Manage data between tabs ****/

var urlfield = document.querySelector(".urlfield");
var postdatafield = document.querySelector(".postdatafield");
var refererfield = document.querySelector(".refererfield");

/* When the user mouses out, save the current contents of the box. */
window.addEventListener("mouseout", () => {
  // urlfield.setAttribute("contenteditable", false);
  // postdatafield.setAttribute("contenteditable", false);
  // refererfield.setAttribute("contenteditable", false);
  browser.tabs.query({windowId: myWindowId, active: true}).then((tabs) => {
    let contentToStore = {};
    let arraycontent = {};
    arraycontent[0] = urlfield.value;
    arraycontent[1] = postdatafield.value;
    arraycontent[2] = refererfield.value;
    contentToStore[tabs[0].url] = arraycontent;
    browser.storage.local.set(contentToStore);
  });
});

/* Update the sidebar's content. */
function updateContent() {
  browser.tabs.query({windowId: myWindowId, active: true})
    .then((tabs) => {
      return browser.storage.local.get(tabs[0].url);
    })
    .then((storedInfo) => {
      if(storedInfo[Object.keys(storedInfo)[0]])
      {
        urlfield.value = storedInfo[Object.keys(storedInfo)[0]][0];
        postdatafield.value = storedInfo[Object.keys(storedInfo)[0]][1];
        refererfield.value = storedInfo[Object.keys(storedInfo)[0]][2];
      }
    });
}

/* Update content when a new tab becomes active. */
browser.tabs.onActivated.addListener(updateContent);

/* Update content when a new page is loaded into a tab. */
browser.tabs.onUpdated.addListener(updateContent);

/* When the sidebar loads, get the ID of its window, and update its content. */
browser.windows.getCurrent({populate: true}).then((windowInfo) => {
  myWindowId = windowInfo.id;
  updateContent();
});

/**** Main Process  ***/

var loadurlBtn = document.querySelector('.loadurl');
var splitBtn = document.querySelector('.split');
var executeBtn = document.querySelector('.execute');

// Menus
var encryptionMenuBtn = document.getElementsByName("encryptionmenu")[0];
var encodingMenuBtn = document.getElementsByName("encodingmenu")[0];
var otherMenuBtn = document.getElementsByName("othermenu")[0];
var xssMenuBtn = document.getElementsByName("xssmenu")[0];

// Encoding
var b64encodeBtn = document.getElementsByName("base64encode")[0];
var b64decodeBtn = document.getElementsByName("base64decode")[0];
var urlencodeBtn = document.getElementsByName("urlencode")[0];
var urldecodeBtn = document.getElementsByName("urldecode")[0];
var hexencodeBtn = document.getElementsByName("hexencode")[0];
var hexdecodeBtn = document.getElementsByName("hexdecode")[0];
var binaryencodeBtn = document.getElementsByName("binaryencode")[0];
var binarydecodeBtn = document.getElementsByName("binarydecode")[0];

// Encryption
var md5hashBtn = document.getElementsByName("md5hash")[0];
var sha1hashBtn = document.getElementsByName("sha1hash")[0];
var sha256hashBtn = document.getElementsByName("sha256hash")[0];
var rot13Btn = document.getElementsByName("rot13")[0];

// Other
var stripspacesBtn = document.getElementsByName("stripspaces")[0];
var stripslashesBtn = document.getElementsByName("stripslashes")[0];
var extractlinksBtn = document.getElementsByName("extractlinks")[0];
var strreverseBtn = document.getElementsByName("strreverse")[0];
var extractcommentsBtn = document.getElementsByName("extractcomments")[0];
var extractregexpBtn = document.getElementsByName("extractregexp")[0];
var stripcustomBtn = document.getElementsByName("stripcustom")[0];

// XSS
var strcharcodeBtn = document.getElementsByName("strcharcode")[0];
var htmlcharsBtn = document.getElementsByName("htmlchars")[0];
var xssalertBtn = document.getElementsByName("xssalert")[0];
var autoxsspolyBtn = document.getElementsByName("autoxsspoly")[0];
var autoxsscustomBtn = document.getElementsByName("autoxsscustom")[0];

// SQL
var mysqlcharBtn = document.getElementsByName("mysqlchar")[0];
var mssqlcharBtn = document.getElementsByName("mssqlchar")[0];
var oraclecharBtn = document.getElementsByName("oraclechar")[0];
var unionselectstmntBtn = document.getElementsByName("unionselectstmnt")[0];
var spaces2commentsBtn = document.getElementsByName("spaces2comments")[0];

var postdataCbx = document.getElementsByName("enablepostdata")[0];
var refererCbx = document.getElementsByName("enablereferer")[0];
var currentFocusField = null;

/*  add event listeners to buttons */
loadurlBtn.addEventListener('click', loadURL);
executeBtn.addEventListener('click', execute);
splitBtn.addEventListener('click', splitUrl);

urlfield.focus();
currentFocusField = urlfield;
anonClickMenuFunct = function ( event ) { onClickMenu( event ); }
encryptionMenuBtn.addEventListener('mouseover', onMouseOverMenu, false);
encodingMenuBtn.addEventListener('mouseover', onMouseOverMenu, false);
otherMenuBtn.addEventListener('mouseover', onMouseOverMenu, false);
xssMenuBtn.addEventListener('mouseover', onMouseOverMenu, false);
b64encodeBtn.addEventListener('click', anonClickMenuFunct, false);
b64decodeBtn.addEventListener('click', anonClickMenuFunct, false);
urlencodeBtn.addEventListener('click', anonClickMenuFunct, false);
urldecodeBtn.addEventListener('click', anonClickMenuFunct, false);
md5hashBtn.addEventListener('click', anonClickMenuFunct, false);
sha1hashBtn.addEventListener('click', anonClickMenuFunct, false);
sha256hashBtn.addEventListener('click', anonClickMenuFunct, false);
rot13Btn.addEventListener('click', anonClickMenuFunct, false);
hexencodeBtn.addEventListener('click', anonClickMenuFunct, false);
hexdecodeBtn.addEventListener('click', anonClickMenuFunct, false);
binaryencodeBtn.addEventListener('click', anonClickMenuFunct, false);
binarydecodeBtn.addEventListener('click', anonClickMenuFunct, false);
stripslashesBtn.addEventListener('click', anonClickMenuFunct, false);
stripspacesBtn.addEventListener('click', anonClickMenuFunct, false);
extractlinksBtn.addEventListener('click', anonClickMenuFunct, false);
strreverseBtn.addEventListener('click', anonClickMenuFunct, false);
strcharcodeBtn.addEventListener('click', anonClickMenuFunct, false);
htmlcharsBtn.addEventListener('click', anonClickMenuFunct, false);
xssalertBtn.addEventListener('click', anonClickMenuFunct, false);
autoxsspolyBtn.addEventListener('click', anonClickMenuFunct, false);
autoxsscustomBtn.addEventListener('click', anonClickMenuFunct, false);
mysqlcharBtn.addEventListener('click', anonClickMenuFunct, false);
mssqlcharBtn.addEventListener('click', anonClickMenuFunct, false);
oraclecharBtn.addEventListener('click', anonClickMenuFunct, false);
unionselectstmntBtn.addEventListener('click', anonClickMenuFunct, false);
spaces2commentsBtn.addEventListener('click', anonClickMenuFunct, false);
extractcommentsBtn.addEventListener('click', anonClickMenuFunct, false);
extractregexpBtn.addEventListener('click', anonClickMenuFunct, false);
stripcustomBtn.addEventListener('click', anonClickMenuFunct, false);

postdataCbx.addEventListener('change', togglepostdata);
refererCbx.addEventListener('change', togglereferer);

anonFocusFunct = function (event) { onFieldFocus( event );}
urlfield.addEventListener('focus', anonFocusFunct, false );
postdatafield.addEventListener('focus', anonFocusFunct, false );
refererfield.addEventListener('focus', anonFocusFunct, false );
urlfield.addEventListener('click', onFieldClick, false );
postdatafield.addEventListener('click', onFieldClick, false );
refererfield.addEventListener('click', onFieldClick, false );

function onFieldFocus ( event ){
  currentFocusField = event.currentTarget;
}

function onFieldClick ( event ){
  event.currentTarget.focus();
}

function onMouseOverMenu(event) {
  var dropdowns = document.getElementsByClassName("dropdown-content");
  var i;
  for (i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    openDropdown.style.visibility = "visible";
  }
}

function onClickMenu(event) {
  switch(event.currentTarget.name){
    case 'base64encode':
      var txt = this.getSelectedText();
      var newString = Encrypt.base64Encode(txt);
      this.setSelectedText( newString );
      break;
    case 'base64decode':
      var txt = this.getSelectedText();
      var newString = Encrypt.base64Decode(txt);
      this.setSelectedText( newString );
      break;
    case 'urlencode':
      var txt = this.getSelectedText();
      var newString = urlencode(txt);
      this.setSelectedText( newString );
      break;
    case 'urldecode':
      var txt = this.getSelectedText();
      var newString = unescape(txt);
      this.setSelectedText( newString );
      break;
    case 'md5hash':
      var txt = this.getSelectedText();
      var newString = Encrypt.md5(txt);
      this.setSelectedText( newString );
      break;
    case 'sha1hash':
      var txt = this.getSelectedText();
      var newString = Encrypt.sha1(txt);
      this.setSelectedText( newString );
      break;
    case 'sha256hash':
      var txt = this.getSelectedText();
      var newString = Encrypt.sha2(txt);
      this.setSelectedText( newString );
      break;
    case 'rot13':
      var txt = this.getSelectedText();
      var newString = Encrypt.rot13(txt);
      this.setSelectedText( newString );
      break;
    case 'hexencode':
      var txt = this.getSelectedText();
      var newString = Encrypt.strToHex(txt);
      this.setSelectedText( newString );
      break;
    case 'hexdecode':
      var txt = this.getSelectedText();
      var newString = Encrypt.hexToStr(txt);
      this.setSelectedText( newString );
      break;
    case 'binaryencode':
      var txt = this.getSelectedText();
      var newString = Encrypt.toBinary(txt);
      this.setSelectedText( newString );
      break;
    case 'binarydecode':
      var txt = this.getSelectedText();
      var newString = Encrypt.fromBinary(txt);
      this.setSelectedText( newString );
      break;
    case 'stripslashes':
      var txt = this.getSelectedText();
      var re = new RegExp("/", 'g');
      var newString = txt.replace(re, '');
      this.setSelectedText( newString );      
      break;
    case 'stripspaces':
      var txt = this.getSelectedText();
      var re = new RegExp(" ", 'g');
      var newString = txt.replace(re, '');
      this.setSelectedText( newString ); 
      break;
    case 'extractlinks':
      browser.tabs.query({active:true,currentWindow:true}).then(function(tabs){
        var currentTabUrl = tabs[0].url;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          // Action to be performed when the document is read;
          var rawHTML = xhttp.responseText;
          var re = new RegExp("[https]+\:\/\/[a-zA-Z0-9\-\.\_]+\/[a-zA-Z0-9\-\.\_/]+", 'g');
          var result;
          while (result = re.exec(rawHTML)){
            urlfield.value += result + "\n";
          }
        }
        };
        xhttp.open("GET", currentTabUrl, true);
        xhttp.send(); 
      });
      break;
    case 'strreverse':
      var txt = this.getSelectedText();
      var newString = txt.split("").reverse().join("");
      this.setSelectedText( newString ); 
      break;
    case 'strcharcode':
      var txt = this.getSelectedText();
      var chars = txt.split("");
      output = "";
      for(i=0;i<chars.length;i++){
        var code = String.charCodeAt(chars[i]);
        output += code+",";
      }
      var newString = "String.fromCharCode("+output+")";
      newString = newString.replace(",)",")");
      this.setSelectedText( newString );
      break;
    case 'htmlchars':
      var txt = this.getSelectedText();
      var chars = txt.split("");
      var output = "";
      for(i=0;i<chars.length;i++){
        var code = String.charCodeAt(chars[i]);
        output += "&#"+code+";";
      }
      this.setSelectedText( output );
      break;
    case 'xssalert':
      var txt = this.getSelectedText();
      var newString = "<script>alert('"+txt+"')</script>";
      this.setSelectedText( newString );
      break;
    case 'autoxsspoly':
    var auto = browser.tabs.executeScript({
      file: 'polyglot.js'
    });
      break;
    case 'autoxsscustom':
      var auto = browser.tabs.executeScript({
        file: 'custom.js'
      });
      break;
    case 'mysqlchar':
      var txt = this.getSelectedText();
      this.setSelectedText(SQL.selectionToSQLChar("mysql", txt));
      break;
    case 'mssqlchar':
      var txt = this.getSelectedText();
      var newString = "";
      this.setSelectedText(SQL.selectionToSQLChar("mssql", txt)); 
      break;
    case 'oraclechar':
      var txt = this.getSelectedText();
      var newString = "";
      this.setSelectedText(SQL.selectionToSQLChar("oracle", txt));
      break;
    case 'unionselectstmnt':
      this.setSelectedText(SQL.selectionToUnionSelect()); 
      break;
    case 'spaces2comments':
      var txt = this.getSelectedText();
      this.setSelectedText(SQL.selectionToInlineComments(txt)); 
      break;
    case 'extractcomments':
      browser.tabs.query({active:true,currentWindow:true}).then(function(tabs){
        var currentTabUrl = tabs[0].url;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          // Action to be performed when the document is read;
          var rawHTML = xhttp.responseText;
          var re =  new RegExp("<!--[^<]+-->", 'g');
          var re2 = new RegExp("\/\*.+\*\/", 'g');
          var result;
          while (result = re.exec(rawHTML)){
            urlfield.value += result + "\n";
          }
          while (result = re2.exec(rawHTML)){
            urlfield.value += result + "\n";
          }
        }
        };
        xhttp.open("GET", currentTabUrl, true);
        xhttp.send(); 
      });
      break;
    case "extractregexp":
    browser.tabs.query({active:true,currentWindow:true}).then(function(tabs){
      var term = prompt("Regex:");
      var currentTabUrl = tabs[0].url;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        // Action to be performed when the document is read;
        var rawHTML = xhttp.responseText;
        var re =  new RegExp(term, 'g');
        var result;
        while (result = re.exec(rawHTML)){
          urlfield.value += result + "\n";
        }
      }
      };
      xhttp.open("GET", currentTabUrl, true);
      xhttp.send(); 
    });
    break;
  case "stripcustom":
    var str = prompt("String you would like to remove:")
    var txt = this.getSelectedText();
    var re = new RegExp(str, 'g');
    var newString = txt.replace(re, '');
    this.setSelectedText( newString ); 
    break;
  }

  var dropdowns = document.getElementsByClassName("dropdown-content");
  var i;
  for (i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    openDropdown.style.visibility = "hidden";
  }
  currentFocusField.focus();
}

/****** Load settings *****/

browser.tabs.query({windowId: myWindowId, active: true})
  .then((tabs) => {
    return browser.storage.local.get("hackbarsettings");
  })
  .then((storedInfo) => {
    if(storedInfo[Object.keys(storedInfo)[0]])
    {
      if(storedInfo[Object.keys(storedInfo)[0]][0]==true) // enable post data
      {
        postdataCbx.checked = true;
        togglepostdata();
      }
      if(storedInfo[Object.keys(storedInfo)[0]][1]==true) // enable referer 
      {
        refererCbx.checked = true;
        togglereferer();
      }
    }
  });

/***** Actions ************************/

function getSelectedText ()
{
  var selectionStart = this.currentFocusField.selectionStart;
  var selectionEnd = this.currentFocusField.selectionEnd;
  if ( selectionEnd - selectionStart < 1 ) {
    return prompt( "No text was selected for the requested action", "String to use" );
  } else {
    return this.currentFocusField.value.substr( selectionStart, selectionEnd - selectionStart );
  }
}

function setSelectedText ( str )
{
  var selectionStart = this.currentFocusField.selectionStart;
  var selectionEnd = this.currentFocusField.selectionEnd;
  var pre = this.currentFocusField.value.substr( 0, selectionStart );
  var post = this.currentFocusField.value.substr( selectionEnd, this.currentFocusField.value.length );
  this.currentFocusField.value = pre + str + post;
  this.currentFocusField.selectionStart = selectionStart;
  this.currentFocusField.selectionEnd = selectionStart + str.length;
}

function urlencode ( inputstr )
{
  var newString = escape(inputstr);
  newString = newString.replace(/\*/g,'%2a');
  newString = newString.replace(/\//g,'%2f');
  newString = newString.replace(/\+/g,'%2b');
  return newString;
}

function loadURL ()
{
  // urlfield.value = browser.tabs.getCurrent().url;
  browser.tabs.query({active:true,currentWindow:true}).then(function(tabs){
      //'tabs' will be an array with only one element: an Object describing the active tab
      //  in the current window.
      var currentTabUrl = tabs[0].url;
      urlfield.value = currentTabUrl;
      storedInfo = browser.storage.local.get(currentTabUrl);
      if(storedInfo) 
        postdatafield.value = storedInfo[Object.keys(storedInfo)[0]][1];
      else
        postdatafield.value = "";
  });
}

var typePostdata = "";
function getPostdata()
{
  if ((postdatafield.value || '').indexOf("Content-Disposition: form-data; name=") > -1) {
    typePostdata = "multipart";
    return postdatafield.value;
  }
  else if ((postdatafield.value || '').indexOf("&") > -1) {
    typePostdata = "formdata";
    var dataString = postdatafield.value;
    dataString = dataString.replace( new RegExp(/\n|\r/g), '' );
    dataString = dataString.replace( new RegExp(/\+/g), "%2B" );
    dataString = dataString.replace(new RegExp(/\=\=/g),"%3d%3d"); // for bas64 cases
    dataString = dataString.replace(new RegExp(/\=\&/g),"%3d&");   // for bas64 cases
    var fields = dataString.split('&');
    return fields;
  }
  else
  {
    typePostdata = "raw";
    return postdatafield.value;
  }
}

function rewriteReferer(e) {
  if (e.url != urlfield.value) return {};
  e.requestHeaders.push({
    name:   "Referer",
    value: refererfield.value
  });
  browser.webRequest.onBeforeSendHeaders.removeListener(rewriteReferer);
  return {requestHeaders: e.requestHeaders};
}

function execute ()
{
  let contentToStore = {};
  let arraycontent = {};
  arraycontent[0] = urlfield.value;
  arraycontent[1] = postdatafield.value;
  arraycontent[2] = refererfield.value;
  contentToStore[urlfield.value] = arraycontent;
  browser.storage.local.set(contentToStore);
  if (refererCbx.checked) {
    browser.webRequest.onBeforeSendHeaders.addListener(
      rewriteReferer,
      {urls: ["<all_urls>"], types: ["main_frame"]},
      ["blocking", "requestHeaders"]
    );
  }
  if (!postdataCbx.checked) { // just get method
    var updating = browser.tabs.update({url: urlfield.value});
    updating.then(null, null);
    return;
  }
  var postData = getPostdata();
  if (typePostdata == "formdata") 
  {
    var responsePost = "";
    var defVarCode = "var paramString='"+postdatafield.value+"'; var path='"+urlfield.value+"';";
    browser.tabs.executeScript({
        code: defVarCode
    }, function() {
        browser.tabs.executeScript({file: 'post.js'});
    });
  }
  else // for raw data and mutilpart formdata
  {
    var responsePost = "";
    var defVarCode = "var paramString = '"+postdatafield.value+"';"
    browser.tabs.executeScript({
        code: defVarCode
    }, function() {
        browser.tabs.executeScript({file: 'post.js'});
    });
  }
}

function splitUrl ()
{
  var uri = currentFocusField.value;
  uri = uri.replace(new RegExp(/&/g), "\n&");
  uri = uri.replace(new RegExp(/\?/g), "\n?");
  currentFocusField.value = uri;
  return true;
}

function savePostdata(requestDetails) {
  var datapost = "";
  if(requestDetails.method == "POST") {
    let formData = requestDetails.requestBody.formData;
    if(formData) {
      Object.keys(formData).forEach(key => {
        formData[key].forEach(value => {
          if(datapost!="") datapost = datapost + "&";
          datapost = datapost + key + "=" + value;
        });
      });
    }
  }
  let contentToStore = {};
  let arraycontent = {};
  arraycontent[0] = requestDetails.url;
  arraycontent[1] = datapost;
  if (requestDetails.originUrl) {
    arraycontent[2] = requestDetails.originUrl;
  }
  else {
    arraycontent[2] = "";
  }
  contentToStore[requestDetails.url] = arraycontent;
  browser.storage.local.set(contentToStore);

  return {};
}

function togglepostdata(){
  if(postdataCbx.checked){
    postdatafield.style.visibility = "visible";
    postdatafield.style.position = "relative";
    if(!browser.webRequest.onBeforeRequest.hasListener(savePostdata))
    {
      browser.webRequest.onBeforeRequest.addListener(
        savePostdata,
        {urls: ["<all_urls>"], types: ["main_frame"]},
        ["requestBody"]
      );
    }
  } else {
    postdatafield.style.visibility = "hidden";
    postdatafield.style.position = "absolute";
    if(browser.webRequest.onBeforeRequest.hasListener(savePostdata))
    {
      browser.webRequest.onBeforeRequest.removeListener(savePostdata);
    }
  }
  let contentToStore = {};
  let arraycontent = {};
  arraycontent[0] = postdataCbx.checked;
  arraycontent[1] = refererCbx.checked;
  contentToStore["hackbarsettings"] = arraycontent;
  browser.storage.local.set(contentToStore);
}

function togglereferer(){
  if(refererCbx.checked){
    refererfield.style.visibility = "visible";
    refererfield.style.position = "relative";
    if(!browser.webRequest.onBeforeRequest.hasListener(savePostdata))
    {
      browser.webRequest.onBeforeRequest.addListener(
        savePostdata,
        {urls: ["<all_urls>"], types: ["main_frame"]},
        ["requestBody"]
      );
    }
  } else {
    refererfield.style.visibility = "hidden";
    refererfield.style.position = "absolute";
    if(browser.webRequest.onBeforeRequest.hasListener(savePostdata))
    {
      browser.webRequest.onBeforeRequest.removeListener(savePostdata);
    }
  }
  let contentToStore = {};
  let arraycontent = {};
  arraycontent[0] = postdataCbx.checked;
  arraycontent[1] = refererCbx.checked;
  contentToStore["hackbarsettings"] = arraycontent;
  browser.storage.local.set(contentToStore);
}
