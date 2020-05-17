# Shopify Binaery Theme

## Folders structure
- **frontend** (theme frontend here)
	- **fonts** (all project fonts)
	- **images** (all images using in sass styles)
	- **js** (javascript sources)
	- **styles** (sass sources)
- **recharge** (theme for Recharge Account pages, this theme code is using only in Recharge App theme editor)
- **shopify** (shopify theme folder)

**Important note**: all shopify assets images which you're including in liquid files should be placed to `shopify/assets`. Css background images should be placed to `frontend/images` folder (except css background images which are coming from Shopify side and which are connecting directly in liquid using `style` attribute). 

## How to use this theme
1) All liquid files are in **shopify** folder, so you're coding shopify markup and logic as usual. 
- From this year I've started using new Shopify `render` [tag](https://shopify.dev/changelog/deprecating-the-include-liquid-tag-and-introducing-the-render-tag) in some peaces, please read more about this tag.  
- Feel free to remove unneded liquid files and add your own. 
- One recommendation: please `render` (or `include`) snippets in sections for sections content and use your sections files only for `schema` (check how I did this in `ea-hero.liquid` section), because it's very useful when you use same markup for duplicated sections and it makes our code much cleaner. 
- Also, you shouldn't edit `theme.css` and `theme.js` from `shopify/assets` folder because they are compiled from our `frontend` folder sources.
- Please use [Shopify Theme Kit](https://shopify.github.io/themekit/) for theme development. To use it, you need:
	- shopify `themekit` installed in your system (please use the guide from link above)
	- create `config.yml` in **shopify** folder
	- once config created, you should run these commands from theme root: `cd shopify` and then `theme watch`

2) All sass styles, javascripts, fonts, and background css images which we're using in our styles are placed in **frontend** folder. 
- To automatically watch and build all assets from `frontend` folder to `shopify/assets` we're using [parcel](https://parceljs.org/). 
- Please install nodejs and install `parcel` plugin globally in your system. 
- After that all that you need to watch or build our assets is this command (executed from theme root): 
`npm run watch`
This command will be running in your terminal window in background and it will compile all js and sass files and places them to `shopify/assets` folder on first run and then after each file changing in frontend folder while this command is running. Keep in mind, all sass files will be compiled to single `shopify/assets/theme.css` file, all js fill be compiled to single `shopify/assets/theme.js` file. All images and fonts also being watched by parcel and placed to `shopify/assets` when they're changed. To cancel this command press `ctrl+c` or close terminal.
3) (optional). All icons are [icomoon](https://icomoon.io/app/#/select) fonts which generated from their app. This is very useful tool and it generates fonts like font-awesome, but since we're using own icons in each theme, I used this app to generate own icon-pack and font for it. The sources of icons are in `frontend/styles/vendor/icomoon`. Icomoon allows to upload own svg icon files or pick icons from their existing icons library. If this hard for you, you can skip using icomoon and use regular svg icons you used before. I'm using icomoon font icons because it allows me to have more control for sizing and coloring for icons and also Google Speed Insights says that such icons works faster than svgs  placed to markup and it gives more points for sites which are using font icons.

I'm using `theme watch` and `npm run watch`  commands simultaniosly in two terminal windows, so please do the same for now. I'm using vscode termianal, it allows to do this, if you're not vscode user, please use any terminal which supports tabs, regular MS Windows cmd.exe also works but it requires 2 separate windows for our approach. I'm seeking the best way how to combine `themekit` and `parcel` to one command so we can use them in one terminal. Once I'll find this solution I'll let you know. 