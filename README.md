# Meru UI

## **Project setup**

### **Set correct Node version:**

The required node version is specified in the `.nvmrc` file at the root of the project.

If using `nvm` as a version manager (see [nvm install docs](https://github.com/nvm-sh/nvm#installing-and-updating)) you can install the required version by changing into this directory and running:

```shell
nvm install
```

Once you have the proper version of node installed, configure your shell to use that version by running:

```shell
nvm use
```

### **Install dependencies:**

Make sure that you have [yarn](https://classic.yarnpkg.com/lang/en/docs/install) installed, then install project specific dependencies by changing into this directory and running:

```shell
yarn
```

### **Compile and hot-reload for development:**

To serve a local version of the UI that will automatically re-compile and reload for development, run:

```shell
yarn dev
```

### **Compile and minify for production:**

To create a production build, run:

```shell
yarn build
```

---

## Local configuration

Please look at the `.env*` files in this directory to see variables you can override via a `.env.development.local` file.

A default development environment is configured in `.env.development`. This file should be kept up to date with any new variables added so that all developers can remain aware of the different configuration options, and new developers can get up and running quickly.

See [the Vite docs on env files](https://vitejs.dev/guide/env-and-mode.html#env-files) for more details on how these files operate.

### Local development with a prism mock server
Install [prism](https://docs.stoplight.io/docs/prism/f51bcc80a02db-installation) globally

Update `.env.development.local` with the URL prism will be running on (example: http://localhost:4010)

CD into `meru/docs/api` run `prism mock meru.yaml`

Run `yarn dev` in the `meru/vite` directory.

---

## **Directory Structure and Naming**

When adding to the project, keep the following guidelines in mind:

- Directories should be camelCased
    - Ex: `/components/newFeatureDirectory`
- Within the components directory, any direct children should align with the navigation drawer top level links
    - Sub directories of which should include relevant route items
    - If there are common components that can be shared across sub-directories within the top level directory but not _universally_ shared, they should be included in a `common` directory under the top level link directory
    - Ex:
        - `/components/orders/management`
        - `/components/orders/fulfillment`
        - `/components/orders/common/sweetOrdersBtn`
        - `/components/kioskFleet/locations`
- Naming conventions
    - App components should always be prefixed with App in the name to indicate they only appear once.
        - Ex: `AppDrawer`
    - If a file name can accurately be described with one word, then the feature name should be prepended
        - Ex:
            - Row -> `OrdersRow.vue`
            - Stage (composable) -> `OrderStage`

---

## **Styling the UI**

This application is using Vuetify 3 for the style framework and SASS for custom styles

### Vuetify Components:

`vite-plugin-vuetify` uses automatic treeshaking to only import the Vuetify components and directives that are needed by the application. This keeps application sizes down and expedites development without the need for a manual "a la carte" import of the framework. For more information see the [Vuetify Documentation](https://next.vuetifyjs.com/en/features/treeshaking/#automatic-treeshaking)

### Vueitfy Configuration:

SCSS variables can be customized globally in the file `/src/scss/injectable/settings.scss`, more information on this topic can be found in the [Vuetify documentation](https://next.vuetifyjs.com/en/features/sass-variables/#variable-api)

### Custom Styles:

- **Component Styles:** Styles specfic to a component should be declared within the component file in a scoped scss style tag.

- **Global CSS:** SCSS files which are intended to be compiled into globally available CSS should be added to the `/src/scss/global-styles` folder and registered in the [main.scss](./src/scss/global-styles/main.scss) file. Examples of these styles would include registration of fonts, or global utilitiy classes.

- **Injectable SCSS:** SCSS styles which are intended to be re-usable should be added to files within the `/src/scss/injectable` folder. Any given component can import these SCSS files to consume the global helpers. Example use cases for these styles would include Vuetify settings, SCSS variables, or mixins.

- **Icons:** Font Awesome icons are registered in the [fontawesome.js](./src/plugins/fontawesome.js) plugin, any new icons need to be added to the relevant section by type(solid, light, etc.). Note - to prevent collisions the icon may need to be renamed (faSearch as faSearchSolid), this will not affect how it is accessed. They are **_not_** aliased and can be accessed using the font awesome icon name (`<v-icon icon="fas fa-search">`). Styling for the Duo-Tone icons is located in [icons.scss](./src/scss/global-styles/icons.scss) file.

---

## **Managing Assets**

### Imported assets:

Assets which will be imported via JavaScript or SCSS can be added to the `/src/assets` folder and imported using a path alias e.g. `background-image: url("@/assets/images/my-cool-image.png")`. They will be handled by Vite during the build process and their urls will be replaced with the location of the final build folder.

### Static assets:

Assets which will not be imported via JavaScript or SCSS can be added to the `/public` folder. They should be referenced from the root (`/`) directory (e.g. `<img src="/vite.svg" />`) and will be copied over to the final build folder as-is with no change to their file name.

---
