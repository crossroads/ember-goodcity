### Steps to create definition for iOS build in VSTS(Visual Studio Team Services):

1. In VSTS, go to project builds page
   Example: "https://goodcity.visualstudio.com/DefaultCollection/#{app_name}/_build"

2. In the left pane, under "Definitions", click on green plus sign. That will open a popup window having title as "Create new build definition"

3. From the given list of templates on a dialog box, select "Empty" template.

    Empty
    Start with a definition that has no steps.

  Click 'Next'

4. On 'Create new build definition':
  - For 'Repository Source', select 'Remote Git Repository'
  - For 'Default agent queue', select 'Default'

  Click 'Create'

5. It will create an empty definition. Now we need to add the steps and other settings as follows:

6. In 'Build' tab, click on "+ Add build step", it will display a dialog box with title 'Add tasks'.
Select 'Command Line' and click on 'Add' button. And then close the dialog box.

7. In right pane, it will show form. Add following values.
  - "Tool" -> "rake"
  - "Arguments" -> "{name-of-rake-task-used-to-prepare-cordova-build}" (ex: 'ios staging app:release')
  - click on 'Save'

8. (only for LIVE build)
  In 'Build' tab, click on "+ Add build step", it will display a dialog box with title 'Add tasks'.
  Select 'Copy and Publish Build Artifacts' and click on 'Add' button. And then close the dialog box.

  In right pane, it will show form. Add following values.
    - "Path to Publish" -> "$(Build.StagingDirectory)"
    - "Artifact Name" -> "{name-of-app} iOS" (ex: 'Stock App iOS')
    - "Artifact Type" -> "Server"
    - click on 'Save'

9. In 'Repository' tab,
  - Repository type: 'Github'
  - Connection: 'github' (in case if you are using it for first time, click on manage to link Github account, in order to get the list of repositoris. and then click on refresh icon)
  - repostory: '{select-repo-name-from-list}'
  - default branch: '{branch-name-which-will-trigger-builds-when-commits-are-added}'
  - click on 'Save'

10. In 'Variables' tab:
  - 'system.debug' -> false
  - version -> '0.0.0'
  - CI -> true
  - TESTFAIRY_API_KEY -> '{testfairy_key}' (only for staging build, not for live)
  - click on 'Save'
