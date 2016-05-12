# How to package up a GoodCity Release

It is important to follow the procedure below so that we maintain consistent release tagging. This will help with troubleshooting future bugs based on platform and app versions.

## Building and releasing steps

Perform the following commands on each repository: shared.goodcity, app.goodcity, admin.goodcity, api.goodcity, socket.goodcity, stockit.goodcity

Notes
* ensure you have a clean git folder before beginning. If not, stash the changes using `git stash save`
* begin with shared.goodcity first as these need to be committed and pushed before app.goodcity and admin.goodcity builds begin.

### 1. Create pull requests (PR)

Create PR to merge master into live (this allows us an easier way to check changes between releases), and check PR for API to ensure there are no breaking changes for older apps and review permissions to ensure we're not leaking sensitive data. If the PR can't merge then locally merge live into master and push.

- https://github.com/crossroads/api.goodcity/compare/live...master?expand=1
- https://github.com/crossroads/shared.goodcity/compare/live...master?expand=1
- https://github.com/crossroads/app.goodcity/compare/live...master?expand=1
- https://github.com/crossroads/admin.goodcity/compare/live...master?expand=1

Merge live into master branch.

    git checkout live
    git pull --rebase origin live
    git push origin live
    git checkout master
    git pull --rebase origin master
    git merge live
    git push origin master

### 2. Update version

For app.goodcity and admin.goodcity you must also bump the version number, you do this by updating the APP_VERSION and VERSION environment variable to something like 0.7.0 at:
- https://circleci.com/gh/crossroads/app.goodcity/edit#env-vars
- https://circleci.com/gh/crossroads/admin.goodcity/edit#env-vars
- https://goodcity.visualstudio.com/DefaultCollection/app.goodcity/_build?definitionId=6&_a=variables
- https://goodcity.visualstudio.com/DefaultCollection/app.goodcity/_build?definitionId=8&_a=variables
- https://goodcity.visualstudio.com/DefaultCollection/admin.goodcity/_build?definitionId=7&_a=variables
- https://goodcity.visualstudio.com/DefaultCollection/admin.goodcity/_build?definitionId=9&_a=variables

### 3. Merge PR

### 4. Update API server

Update any environment variables needed, and run any rake tasks to upgrade db on server (check changelog.md or changes in PR for tasks to run). Note if you have terminal open in current folder on API server during live deployment you need to exit and re-enter folder for the change to the current folder symlink to take effect.

`RAILS_ENV=production bundle exec rake goodcity:upgrade_task`

## Tagging the release

It is important to tag all of the code repositories at this point so that it is easy to recreate the exact environment when debugging user issues. You must tag repositories even if the code has not changed since last tagged. When a user says they are using app version 0.5.0, we need to be able to bring up an 0.5.0 environment.

    git checkout live
    git pull --rebase origin live
    git tag 0.5.0
    git push origin 0.5.0

## Building and distributing the mobile apps

ANDROID
Download the live build from CircleCI artifacts, and then upload to Google Play beta testing:
https://circleci.com/gh/crossroads/admin.goodcity/tree/live
https://circleci.com/gh/crossroads/app.goodcity/tree/live
https://play.google.com/apps/publish/

If happy with build, click `Promote to Prod`

iOS
Go to Release tab in Visual Studio Team Services (VSTS) and then create a new release once the build on the live branch has completed in VSTS. This should automatically upload the build to Testflight. Once happy with build then create a new release in https://developer.apple.com and select the TestFlight build.
