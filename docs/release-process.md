# How to package up a GoodCity Release

It is important to follow the procedure below so that we maintain consistent release tagging. This will help with troubleshooting future bugs based on platform and app versions.

## Building and releasing steps

Perform the following commands on each repository: shared.goodcity, app.goodcity, admin.goodcity, api.goodcity, socket.goodcity, stockit.goodcity

Notes
* ensure you have a clean git folder before beginning. If not, stash the changes using `git stash save`
* begin with shared.goodcity first as these need to be committed and pushed before app.goodcity and admin.goodcity builds begin.

For app.goodcity and admin.goodcity you must also bump the version number, you do this by updating the APP_VERSION and VERSION environment variable to something like 0.7 at:
- https://circleci.com/gh/crossroads/admin.goodcity/edit#env-vars
- https://circleci.com/gh/crossroads/admin.goodcity/edit#env-vars
- https://goodcity.visualstudio.com/DefaultCollection/app.goodcity/_build?definitionId=1&_a=variables
- https://goodcity.visualstudio.com/DefaultCollection/admin.goodcity/_build?definitionId=2&_a=variables

Merge the code to the live branch.

    git checkout master
    git pull --rebase origin master
    git push origin master
    git checkout live
    git pull --rebase origin live
    git merge master
    git push origin live

CircleCI will now begin the test and deploy process. Watch the builds to ensure that the code is deployed.

## Tagging the release

It is important to tag all of the code repositories at this point so that it is easy to recreate the exact environment when debugging user issues. You must tag repositories even if the code has not changed since last tagged. When a user says they are using app version 0.5.1, we need to be able to bring up an 0.5.1 environment.

    git checkout live
    git pull --rebase origin live
    git tag 0.7.1
    git push origin 0.7.1
    git checkout master
    git cherry-pick <commit sha from CircleCI version bump>
    git push origin master

## Building and distributing the mobile apps

Once CircleCI completes its builds, it will upload the admin.goodcity and app.goodcity Android apps to the TestFairy service. Download and test the builds.

If you are satisfied the apps are working correctly, upload them to the Google Play store and submit for distribution.

Build the iOS apps from the `live` branch and test them. Upload to iOS for submission when complete.
