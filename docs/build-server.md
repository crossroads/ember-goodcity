# Build Server

Our build system uses Visual Studio Team Services (VSTS).<br/>
https://goodcity.visualstudio.com

### Setup Mac to perform builds

* Install XCode
* Install Brew http://brew.sh/
* brew install node4-lts (have had issues with NVM but use if works)
* Install Ruby https://rvm.io/rvm/install
* `npm i -g npm ember-cli bower cordova cordova-update-config`
* Install VSTS Agent and run as service https://github.com/Microsoft/vsts-agent/blob/master/docs/start/startosx.md (a PAT can be created by following https://github.com/Microsoft/vsts-agent/blob/master/README.md#configure-account)
* under VSTS agent folder run `echo $PATH > .Path` (for rvm path)
* Add https://github.com/testfairy/command-line-uploader/blob/master/testfairy-upload-ios.sh to /Users/developer/Workspace and set API key in script
