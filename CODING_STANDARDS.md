<!-- Project Logo -->
<br />
<p align="center">
  <a href="https://github.com/hugohabel/amelia-start-page">
    <img src="public/images/logo.png" alt="Logo" width="60">
  </a>

  <h3 align="center">Amelia Start Page</h3>

  <p align="center">
    An awesome start page with several different widgets. Productivity tab for your daily use.
    <br />
  </p>
</p>
<!-- End Project Logo -->

<!-- Table of Contents -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#folder-structure">Folder structure</a>
    </li>
    <li>
      <a href="#getting-started">General coding standards</a>
      <ul>
        <li><a href="#prerequisites">Naming</a></li>
        <li><a href="#installation">Comments & Documentation</a></li>
      </ul>
    </li>
  </ol>
</details>
<!-- End Table of Contents -->

<!-- Folder structure -->
## Folder structure

This app was bootstrapped with the `create-react-app` tool, therefore the basic folder structure follows what this tool creates. 

The code for the app can be found under the `src` folder. All the functionality is inside the two following folders:

* `common` - This folder contains everything that is shared among all the application, i.e.: components, constants, utilities, etc.
* `modules` - This folder contains complete blocks of functionality, that can be just invoked anywhere inside the app and work out-of-the-box, i.e.: Menubar, Sidebar, Countdown, etc.

Folders and files under `common`:

* `components` - This folder contains subfolders, i.e.: `elements`, `icons`, etc., which are shared across the app.
* `contexts` - This folder contains the context providers for the app.
* `state` - This folder contains the initial `AppState.ts` along with all the reducers to update the state.
* `types` - **To be deprecated** This folder contains all the types used in the app. These types will be moved to the `amelia.d.ts` file.
* `utils` - This folder contains the logic to save the app state to the local storage.
* `constants.ts` - Generic constants for error messages, list of existing widgets, list of menu items, etc. Any constant that will be used through out the app should be added here. For constant values specific to a component, add a `constants.ts` file in the corresponding component's folder.

Each of the modules has the following structure:

```
|-moduleName/
| |-components/
| | |-tests/
| | | |-ComponentName.test.tsx
| | |-ComponentName.tsx
| | |-ComponentName.module.css
| |-docs/
| | |-README.md
| |-utils/ (This one is optional)
| | |-utilityName/
| | | |-tests
| | | | |-utilityName.test.ts
| | | |-utilityName.ts
```
<!-- End Folder structure -->

<!-- General coding standards -->
## General coding standards

The following coding standards are for use only on this project, and are completely based on my personal experience, in addition of some inspiration from [medium](https://medium.com/@navitasinghal77/react-coding-standards-and-practices-3b133bcaea8).

### General

* Componentize the code. It's prefered to create multiple files instead of writing a single big file.
* Make sure your code sticks to the existing `eslint` rules in the project.
* Create utility files to remove duplicated code, and avoid having that code in the components.
* Split code into smaller functions. Each with a single responsibility.

### Naming

* Name the components using PascalCase.
* Name all non-component files, as well as folders using camelCase.
* CSS class names should use the camelCase.

### CSS

* Global CSS rules which apply to all components should be placed in `index.css`.
* Avoid having inline CSS rules, create reusable classes for simple functionality like centering things, justifying text, etc.

### Types & Interfaces

* Declare common types inside `amelia.d.ts`.
* When declaring a type use the prefix `T`, for example: `TIconsList`. Do the same for interfaces with the `I` prefix.

### External API calls

* Add all the external API calls in separate files under the `common/utils/services/` folder.

### Comments & Documentation

* Add comments to your code, and make sure everytime you make a change the corresponding documentation gets updated.

### Testing

* Add tests for all the features you add to the project. When it's unnecessary to test some functionality, or if it doesn't add any value, make sure to include `istanbul` comments to ignore those parts and keep the coverage as high as possible.

### Imports/Exports

* Organize `import` statements following this order:
  - External imports
    `// External Dependencies`
  - Internal imports
    `// Internal Dependencies`
  - Styles
    `// Styles`
* Use `index.ts` to export the main functionality/components from each file, in order to avoid repeating names on the imports.
* Always use named exports over default exports.
