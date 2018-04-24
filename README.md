# HackBar Quantum 
## ![logo](https://github.com/notdls/hackbar/blob/master/icons/hackbar_16.png?raw=true)This Add-on is available on Mozilla's Add-on site [here](https://addons.mozilla.org/en-US/firefox/addon/hackbar-quantum/)

HackBar Quantum is a sidebar that assists you with web application security testing, it's aim is to help make those tedious tasks a little bit easier. This add-on is a predecessor to the original HackBar that is not compatible with Firefox Quantum.

This is still a new project, so there will more than likely be lots of bugs, and missing features, if you would like to report a bug or have any suggestions, you can reach me on twitter [@totallynotdls](https://twitter.com/totallynotdls)

This is a fork and extension from build 1.0.2 of "New Hackbar" which can be found on the Firefox Add-ons Site [here](https://addons.mozilla.org/en-US/firefox/addon/new-hackbar/) and on github [here](https://github.com/mxcxvn/newhackbar/)
The original add-on for non-Quantum builds is available at https://addons.mozilla.org/firefox/addon/hackbar/.
## Credits
* mcxc - mxcxvn@gmail.com - [fosec.vn](http://fosec.vn) | Created the first [Hackbar](https://addons.mozilla.org/firefox/addon/new-hackbar/) for Firefox Quantum
* Johan Adriaans, Pedro Laguna | Created the original [Hackbar](https://addons.mozilla.org/en-US/firefox/addon/hackbar/)

## Features
* MD5, SHA1, SHA256 Hashing Algorithms
* ROT13 Encoding/Decoding
* Base64 Encoding/Decoding
* URL Encoding/Decoding
* Hex Encoding/Decoding
* Binary Encoding/Decoding
* Load, split and execute HTTP requests, This also includes the ability to manipulate POST data and your Referer
* Extract links from current page
* Strip spaces and slashes from strings as well as reversing them
* XSS assistance (String.fromCharCode generation, HTML Characters and XSS Alert generation)
* Auto-XSS (Scrapes possible parameters and tests them for XSS (either using a Custom payload or a Polygot))
* SQL Injection Assistance

### To-Do
* Cleaner UI, including sub-menu's inside dropdown lists
* Useful Resources/links, this would include things like links to common/popular blog posts that are helpful when pentesting against a target, e.g. WAF Bypass cheatsheets, Recon tips, reverse shell cheatsheets, etc. (unsure atm)
* More payloads for more advanced testing for things such as SSTI, XXE, RCE, etc. (If you have any suggestions please let me know)
* Add Bcrypt & more hashing/crypto algorithms

## Changelog
### 1.0 - First Update since the fork and initial release
* Added Hex and Binary Encoding/Decoding
* Added a button to open the sidebar for easier access
* Added the "Other" section with the accompaning features (Strip Slashes, Strip Spaces, Extract Links, Reverse String)
* Added the "XSS" section with the accompaning features (String.fromCharCode, HTML Characters and XSS Alert)
* Fixed issue with the dropdown menus

### 1.1 - Auto-XSS
* Added Auto-XSS using a [Polygot](https://github.com/danielmiessler/SecLists/blob/master/Fuzzing/Polyglots/XSS_Polyglots.txt) or a Custom payload
* Added the SQL category

### 1.2 - Extract all teh things
* Extract Comments - Currently extracts HTML and JS comments (E.g. ``<!-- comment -->`` and ``/* comment */``)
* Extract RegExp - Allows you to extract custom regex from the page
* Strip Custom - Allows you to strip a custom string from the selected text
* Fixed an issue with dropdowns not hiding when clicking an option
* Fixed some issues with how the POST data worked

### 1.3 - Strings & Payloads
* Fixed display error in the SQL dropdown
* Changed Stripslashes back to it's original functionality
* Added the remaining SQL options (Apologies for the clutteredness of it at the moment, I will be working on making it more user-friendly/less-cluttered in the future)
* Added the strings section with the "Usefull strings" from the original Hackbar alongside some string manipulation (lowercase, UPPERCASE and ranDOmcase)
* Added the Payload section with a few PHP payloads for now

### 1.4 
* Added Node.js reverse shell (Bash) (Credits to [Jobert Amba](https://twitter.com/jobertabma/status/948428058687500289))
* Moved "Auto-Pwn" functions to a separate dropdown for easy access, this includes the Auto-XSS (Custom/Polyglot) and the new Auto-Open-Redirect
* Added Auto-Open-Rediect - This function visits the current page with common Open-Redirect parameters in order to tests if the page is vulnerable
* Re-wrote the creation of event listeners to make it less tedious to add new functions and be a bit more efficient
* Fixed issue where drop-down lists on the right would go outside of the sidebar

### 1.5 - Small fix
* Fixed an issue with the Auto-Pwn category

### 1.6 - Bug fixes and small feature update
* Fixed an issue with trailing/pre-pending newlines and spaces when using the Hashing and Encoding functions
* Added Auto-SQLi, Auto-SSTI (just basic {{7*7}}) and A new XSS Polyglot (Credits to [0xSobky](https://github.com/0xsobky/HackVault/wiki/Unleashing-an-Ultimate-XSS-Polyglot))
* Renamed XSS (Custom) to Payload (Custom) as it can be used for anything not just XSS

## FAQ
### Can you please add move HackBar to the top of the screen?
Unfortunately not, as fair as I'm aware it isn't possible with Firefox's new policies.
