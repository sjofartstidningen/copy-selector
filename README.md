# copy-selector

> Chrome extension that copies a selctor

## The problem

At Sjöfartstidningen we recently lost control over the automatic creation of our newletter. The Mailchimp api version we were using got deprecated. And we don't have the time and money right now to fix it. Instead we have come up with a solution where Wordpress generates the content (this still works from the old implementation). And then we have to copy the dynamically generated html from the preview and clip it into a Mailchimp template.

It works, but it's a bit tedious to always `Go to Chrome DevTool > Elements > Open an infinite amount of tables, tds and trs > Right-click > Copy > Copy outerHTML`.

## The solution

`copy-selector` is a pretty simple Chrome extension that runs once we hit one of our newsletter previews. A button then appears and once it's clicked the outerHTML of the selector we need is copied to the clipboard. Done!

## Usage

If you have the same issue just clone this repo and update it with your preferences.

### Necessary steps

1. Inside `manifest.json`, change the url under `"permissions"` and `"content_scripts.matches"` to the url you wish the script to activate on.
2. Update the destination to copy the script to (maybe your companys local servers) in `scripts/build.sh`
3. Run `$ yarn && yarn run build`.
4. Open Chrome and go to `Window > Extensions` (or the url `chrome://extensions`) and make sure `Developer mode` is checked up in the right corner.
5. Click `Load unpacked extension...` and navigate to the folder you copied the files to. And there you have it.

## License

MIT © [Sjöfartstidningen](http://www.sjofartrstidningen.se)
