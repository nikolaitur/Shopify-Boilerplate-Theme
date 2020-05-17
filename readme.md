## Introduction
All theme sources are in `sources` directory and this is our main folder where we do our development.
The files from `sources` compiles to `build` directory by our theme development tool. We use theme development tool and compilation from sources, because our theme source code contains all modern features and best practices which are not supported by Shopify theme editor. Also with theme development tool we can use our favorite code editor to navigate quickly inside theme code. The `build` folder is native Shopify theme. Don't edit any code inside this folder, because it will be overwritten from `sources` directory each time the developer works with theme's source code. There is only 1 case when you should work with `build` folder described below in deployment warning.

## Quick Start
#### To use this starter theme and theme development tool, Node.js and Gulp v4 should be installed in your system.

First 5 steps are one-time installation steps for each project, they takes up to 15 minutes. 6th step is repeatable step during theme development.
1) Clone this starter theme to your pc: `git clone git@gitlab.com:binaery-team/goats-theme.git`
2) Create project repository in Gitlab
3) Change git origin url from this starter theme url to project git url you've just created: `git remote set-url origin <project-repository-url>`
4) You should run `npm i` command to install javascript libraries we're using in theme and another needed packages for our theme development tool.
5) Open config.yml and enter credentials for shopify store's theme you plan to work with. We have 3 environments: development, staging and production, please read more below.
6) Then you should use our main theme development tool command: `gulp watch`. Once this command prompted, it will be running in background mode and showing you log output of your development till you cancel it from your terminal. But the main aim of this command is watch your code changes in `sources` folder, do their compilation to `build` folder and then upload the compiled files into Shopify store's theme. It also watches images and fonts you're adding to `sources/assets` and copies them to `build/assets` folder.

Additional commands:
Run `gulp deploy` to make full theme deployment (the key difference from `gulp watch` is that watch is doing partial deployment and only for files which you're changing while this command is running in your terminal). Once this command runs, it compiles theme from `sources` folder to `build` folder and deploys all theme files from `build` folder to Shopify store theme.
If you just need to compile theme from sources, call `gulp build`. Then you can create zip archive of the theme, for example.

### Environments
`gulp watch` and `gulp deploy` commands can be called with special parameters to use environments from our `config.yml` file:
- development (default, use it for theme development)
- staging (use it to test our theme inside client's site)
- production (use it for theme deployment to client's site live theme, please read warning below before using this environment)

For example: `gulp watch --staging`

**DEPLOYMENT WARNING:** some apps or developers makes their changes in production (aka live) theme on Shopify theme editor level, while we're developing our theme locally on our computers using theme development tool and git. If you run `gulp deploy`, of course such updates will be overwritten. To avoid this situation, each time you want to deploy your changes to store's production theme you should make backup and sync such updates with our theme sources: 
1. Create backup theme in Shopify store themes page and call this backup like "Goats Theme Backup current_date". This needs only for case if something will be wrong, so you can publish last stable version of production theme using this backup.
2. Run this command: `gulp sync --production`. This command will just download all current code from production theme to our `build` folder.  As alternative for this command, you can download zip archive from Shopify, it will be faster, and then you can unpack all code to our `build` folder.
3. Once theme was downloaded from Shopify to `build` folder, you should review changes and copy these changes to project `sources`. Since we're using git, it's easy to compare changes between Shopify production theme and our build theme.
4. Please commit this integration (I prefer this message for such commit: "sync with live theme code")
5. Then you can run `gulp deploy --production`.
This is our current minus of using theme development workflow and @Maksim is working on solution for easier deployment.  If this deployment process is hard for you, please ask @Maksim and he'll do that quickly. Also, you shouldn't do these steps when you're working with development or staging theme, except the cases when you need to sync theme's changes made by apps or by other developers which are not using our workflow.


### Styles
`sources/assets/styles`
Our theme development tool allows us to use all power of scss preprocessor, such as code splitting and sass variables. Also it has autoprefixer, so our code is clean and we don't miss css vendor prefixes. 
TODO: Update our scss to use it with Shopify scss.liquid variables, and we can use all power of Shopify theme settings for theme styles.

### Javascripts
`sources/assets/javascripts`
Our theme development tool allows us to use all modern javascript practices, such as es6 modules for code splitting, arrow functions, array expands etc. At same time, this code will be cross-browser because it's using Babel transpiler.
TODO: Javascript refactoring


### Images
`sources/assets/images`
TODO: add image optimizer package to theme development tool


##### SVG icons
Place any svg files icons you want to use to `sources/assets/images`. Then just include these icons by this code: `<svg src="icon-name.svg"></svg>` inside .liquid files markup. Our theme development tool will replace this shortcode to svg file internal code.
TODO: Add svg css inliner to theme development tool. Some svg files are using css classes and styles in svg files which are using same class names are overlapping between them. SVGO package has such inliner.

### Fonts
Place font files to `sources/assets/fonts` and include them in `sources/assets/styles/base/_fonts.scss`, or use typekit, whatever is better for the project you're working on.