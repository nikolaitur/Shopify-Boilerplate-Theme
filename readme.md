## Quick Start
1) Clone this starter theme to your pc: `git clone git@gitlab.com:binaery-team/goats-theme.git`
2) Create project repository in Gitlab
3) Change git origin url from this starter theme url to project git url you've just created: `git remote set-url origin <project-repository-url>`

All theme sources are in `sources` directory and this is our main folder where we do our development.
The files from `sources` builds to `build` directory by our theme development tool. The `build` folder is native Shopify theme. Don't edit any code inside this folder, because it will be overwritten from `sources` directory each time developer works with theme's source code. 


#### To use our theme development tool, Node.js and Gulp v4 should be installed in your system.

### Main commands for theme development:
1) You should run `npm i` command to install javascript libraries we're using in theme and another needed packages for our theme development tool. This needs to be runned only 1 time for each new project before you start development.
2) Then you should run `gulp watch` command each time for theme development. Once this command called, it will be running in background mode and shows you log output of your development till you press `command+c` in your keyboard or till you kill terminal window. While this command runs, it only watches your code changes in `sources` folder, compiles such files to `build` folder and auto-upload the files to Shopify store. It also watches images and fonts you're adding to `sources/assets` and it compiles them too.

Additional commands:
`gulp deploy` use it for deployment. Once this command runs, it builds theme from `sources` folder to `build` folder and deploys all theme files from `build` folder to Shopify store theme.
`gulp build` use it to just compile theme from `sources` folder to `build` folder. Then you can create zip archive of the theme, for example.


### Environments
`gulp watch` and `gulp deploy` commands can be called with special parameters to use environments from our `config.yml` file:
-- development (default)
-- staging
-- production
For example: `gulp watch --staging`


### Images
`sources/assets/images`

##### SVG icons
Place any svg files icons you want to use to `sources/assets/images`. Then just include these icons by this code: `<svg src="icon-name.svg"></svg>` inside .liquid files markup. Our theme development tool will replace this shortcode to svg file internal code.


### Fonts
Place font files to `sources/assets/fonts` and include them to `sources/assets/styles/base/_fonts.scss`, or use typekit, whatever is better for the project you're working on