# cordova-plugin-change-theme

Simple plugin to change WebView theme between Dark and Light Mode.

Android supports Dark Mode [since API Level 29 (Android 10)](https://developer.android.com/develop/ui/views/theming/darktheme#:~:text=Dark%20theme%20is%20available%20in%20Android%C2%A010%20(API%20level%2029)%20and%20higher.) and in some devices these modes does not work properly, it's possible to WebView force to Dark Mode even if you are using Light Mode on smartphone.

This plugin changes the Cordova WebView theme making media queries `(prefers-color-scheme: light)` or `(prefers-color-scheme: dark)` to work properly.

Under the hood `WebSettings.setForceDark()` is used to change themes, in API Level 33 or higher would be correct to use `WebSettings.setAlgorithmicDarkeningAllowed()` but since Cordova Android platform [does not support these levels](https://cordova.apache.org/docs/en/11.x/guide/platforms/android/index.html#android-api-level-support) yet, this method is not used.

Read more about it here: [https://developer.android.com/develop/ui/views/layout/webapps/dark-theme]()

## Supported Platforms
  - **Android**

## Installation
```bash
$ cordova plugin add https://github.com/Mormanii/cordova-plugin-change-theme
```

## Usage
Plugin creates an object on `cordova.plugins.changeTheme` and is accessible after the `"deviceready"` event has been fired.
```js
let changeTheme = null;

document.addEventListener("deviceready", function() {
  changeTheme = cordova.plugins.changeTheme;  // Plugin is ready to be used.
}, false);
```

### Current Theme
When initializing, the plugin sees which theme is being used based on `prefers-color-scheme` media.

After that the value is saved on the following property and possible values are `"Dark"` or `"Light"`.
```js
changeTheme.currentTheme;
```

### Check if the theme is enabled
Once the plugin has been initialized, you can check which theme is being used with the following method:
```js
changeTheme.isEnabled("Dark");  // => boolean
// OR
changeTheme.isEnabled("Light");
```

### Control Dark Theme
It is possible to change theme with the following methods and a `Promise` will be returned.

To enable Dark Theme:
```js
changeTheme.enableDark()
  .then(newTheme => {
    console.log(`${newTheme} Theme is now enabled`);  // "Dark Theme is now enabled"
  })
  .catch(error => {
    console.log(error);
  });
// OR
changeTheme.setDark(true)
  .then(newTheme => {})
  .catch(error => {});
```

To disable Dark Theme:
```js
changeTheme.disableDark()
  .then(newTheme => {
    console.log(`${newTheme} Theme is now enabled`);  // "Light Theme is now enabled"
  })
  .catch(error => {
    console.log(error);
  });
// OR
changeTheme.setDark(false)
  .then(newTheme => {})
  .catch(error => {});
```
