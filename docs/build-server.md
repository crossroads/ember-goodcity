# Build Server

Our build system uses Visual Studio Team Services (VSTS).<br/>
https://goodcity.visualstudio.com

### Setup Mac to perform builds

* Install XCode
* Install Node https://github.com/creationix/nvm
* `npm i -g npm ember-cli bower cordova cordova-update-config`
* Install VSTS Agent and run as service https://github.com/Microsoft/vso-agent/blob/master/docs/vsts.md
* Add https://github.com/testfairy/command-line-uploader/blob/master/testfairy-upload-ios.sh to /Users/developer/Workspace and set API key in script
