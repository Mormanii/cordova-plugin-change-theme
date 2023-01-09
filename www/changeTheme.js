const SERVICE_NAME = "ChangeTheme";

const exec = require("cordova/exec");
const utils = require("cordova/utils");

const ThemeType = {
  DARK: "Dark",
  LIGHT: "Light"
};

function ChangeTheme() {
  // Checking which theme is initial applied on WebView.
  this.currentTheme = "";

  if (matchMedia("(prefers-color-scheme: light)").matches) {
    this.currentTheme = ThemeType.LIGHT;
  } else {
    this.currentTheme = ThemeType.DARK;
  }
}

/** Checks if the `theme` is enabled or disabled.
 *  Possible values for `theme` are defined in `ThemeType`.
 *
 * @param {String} theme Name of theme that will be check.
 * @returns {Boolean} Result of check.
 */
ChangeTheme.prototype.isEnabled = function(theme) {
  return theme === this.currentTheme;
};

/** Activates forced Dark Theme on WebView.
 *
 *  The media query `prefers-color-scheme` on **CSS** will be setted to `dark`.
 *
 * @returns {Promise} Promise resolved when changed theme.
 */
ChangeTheme.prototype.enableDark = function() {
  if (this.isEnabled(ThemeType.DARK)) {
    // If Dark theme is already enabled, return immediately the current theme.
    return new Promise((resolve) => {
      resolve(this.currentTheme);
    });
  }

  return new Promise((resolve, reject) => {
    exec(
      () => {
        this.currentTheme = ThemeType.DARK;
        resolve(this.currentTheme);
      },
      (error) => {
        console.error("Error enabling Dark Theme: ", error);
        reject(error);
      },
      SERVICE_NAME, "setDarkTheme", [true]
    );
  })
};

/** Deactivates forced Dark Theme on WebView.
 *
 *  The media query `prefers-color-scheme` on **CSS** will be setted to `light`.
 *
 * @returns {Promise} Promise resolved when changed theme.
 */
ChangeTheme.prototype.disableDark = function() {
  if (this.isEnabled(ThemeType.LIGHT)) {
    // If Light theme is already enabled, return immediately the current theme.
    return new Promise((resolve) => {
      resolve(this.currentTheme);
    });
  }

  return new Promise((resolve, reject) => {
    exec(
      () => {
        this.currentTheme = ThemeType.LIGHT;
        resolve(this.currentTheme);
      },
      (error) => {
        console.error("Error disabling Dark Theme: ", error);
        reject(error);
      },
      SERVICE_NAME, "setDarkTheme", [false]
    );
  });
};

/** Activates or deactivates forced Dark Theme depending on `enable` value.
 *
 * @param {Boolean} enable The status of Dark Theme.
 * @returns {Promise} Promise resolved when changed theme.
 */
ChangeTheme.prototype.setDark = function(enable) {
  const paramType = utils.typeName(enable);

  if (paramType !== "Boolean") {
    throw new TypeError("Expected Boolean parameter but got " + paramType + " on setDark");
  }

  if (enable) {
    // Returning the Promise created.
    return this.enableDark();
  } else {
    return this.disableDark();
  }
};

module.exports = new ChangeTheme();
