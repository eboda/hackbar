# HackBar

HackBar is a sidebar that assists you with web application security testing, it's aim is to help make those tedious tasks a little bit easier. This add-on is a predecessor to the original HackBar that is not compatible with Firefox Quantum.

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

## Changelog
### 1.0.5 - First Update since the fork
* Added Hex and Binary Encoding/Decoding
* Added a button to open the sidebar for easier access
* Added the "Other" section with the accompaning features (Strip Slashes, Strip Spaces, Extract Links, Reverse String)
* Added the "XSS" section with the accompaning features (String.fromCharCode, HTML Characters and XSS Alert)
* Fixed issue with the dropdown menus

## FAQ
### Can you please add move HackBar to the top of the screen?
Unfortunately not, as fair as I'm aware it isn't possible with Firefox's new policies.
