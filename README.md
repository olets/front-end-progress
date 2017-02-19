1. [Install](#install)
1. [Set up](#setup)
1. [Run](#run)
1. [Understand the output](#understanding-the-output)

This checklist should make it easy for devs to record and track their progress and, just as importantly, for others to follow along as the site is built out.

The tracker is easy to set up: just list the templates and the components in the source JSON file. And it's easy to update: just change status values from "not_started" to "started" to "finished" as you go - color coding and organization will be taken care of automatically. The compiled file is automatically updated in the browser, at `localhost:3000` ([customizable](https://www.browsersync.io/docs/gulp) by tweaking the `browserSync.init` in `gulpfile.js`)

The output is demo'd in [dist/front-end-progress.html](https://github.com/olets/front-end-progress/dist/front-end-progress.html) - it looks something like

<kbd><img src="http://i.imgur.com/UDnuhBr.png" width="400px"/></kbd>

where clicking on a template takes you to that page. Templates are grouped and color-coded by how far along their development is.

## Install

**front-end-progress** uses gulp. Assuming you're set up with node (`node -v` to check; if you don't have node, or even if you do, I recommned [installing it with `nvm`](https://github.com/creationix/nvm#install-script), install `front-end-progress` once with

```bash
$ (sudo) npm i
````

## Setup

In `front_end_progress.json`:

1. Set the `siteName`

1. To provide a link to additional notes, set the `notes.url`. To customize the link text, set the `notes.title` (if no `notes.title` is provided, the link text will default to "Notes").

1. List each **template** in `front_end_progress.json`'s `templates`. Give each a `title`, a `desktop` status, and a `mobile` status, and list any template-specific and shared components the template uses. `templates` will look something like

    ```json
    "templates": [
        {
          "title": "[required: title]",
          "desktop": "[required: status]",
          "mobile": "[required: status]",
          "specific": [
            {
              "title": "[required specific component's title]",
              "desktop": "[required: status]",
              "mobile": "[required: status]"
            }
          ],
          "shared": [
            "[optional:",
            "list shared",
            "components' names]"
          ],
          "notes": "[optional: any notes]"
        }
    ]
    ```
    
 Every **global** and **shared** component is listed in `global` and `shared`, respectively:
 
  ```json
  "global": [
      {
          "title": "[required: name of the global component",
          "desktop": "[required: status]",
          "mobile": "[required: status]",
      }
  ]
  ```
  
  ```json
  "shared": [
      {
          "title": "[required: name of the shared component",
          "desktop": "[required: status]",
          "mobile": "[required: status]",
      }
  ]
  ```

 Possible statuses for desktop and mobile are `not_started`, `started`, and `finished`.
 
 Note that a component does not *have* to be listed under any templates.


## Run

Compile with

```bash
$ gulp front-end-progress
```

or the shortcut

```bash
$ gulp progres
```

**front-end-progress** will continue watching for changes to the progress tracker and, if relevant, the notes file.

## Understanding the output

The template's status will be automatically determined from the desktop and mobile statuses of each template and component:

- "Not Started" is templates where neither the mobile nor the desktop have been started
- "Started" is templates where neither the mobile nor the desktop are finished
- "Finished" is templates where both the mobile and the desktop are finished
- and "Getting There" is templates where either mobile or desktop but not both are finished.

All unfinished templates will be followed by their components, labelled with the component's desktop and mobile statuses.