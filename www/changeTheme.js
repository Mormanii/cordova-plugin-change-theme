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
 *  The media query `prefers-color-scheme` on
 *  **CSS** will be setted to `dark`.
 *
 * @returns {Void}
 */
ChangeTheme.prototype.enableDark = function() {
  if (this.isEnabled(ThemeType.DARK)) {
    return;
  }

  const success = () => {
    this.currentTheme = ThemeType.DARK;
  };

  const error = (error) => {
    console.error("Error enabling Dark Theme: ", error);
  };

  exec(success, error, SERVICE_NAME, "setDarkTheme", [true]);
};

/** Deactivates forced Dark Theme on WebView.
 *
 *  The media query `prefers-color-scheme` on
 *  **CSS** will be setted to `light`.
 *
 * @returns {Void}
 */
ChangeTheme.prototype.disableDark = function() {
  if (this.isEnabled(ThemeType.LIGHT)) {
    return;
  }

  const success = () => {
    this.currentTheme = ThemeType.LIGHT;
  };

  const error = (error) => {
    console.error("Error disabling Dark Theme: ", error);
  };

  exec(success, error, SERVICE_NAME, "setDarkTheme", [false]);
};

/** Activates or deactivates forced Dark Theme depending on `enable` value.
 *
 * @param {Boolean} enable The status of Dark Theme.
 * @returns {Void}
 */
ChangeTheme.prototype.setDark = function(enable) {
  const paramType = utils.typeName(enable);

  if (paramType !== "Boolean") {
    throw new TypeError("Expected Boolean parameter but got " + paramType + " on setDark");
  }

  if (enable) {
    this.enableDark();
  } else {
    this.disableDark();
  }
};

module.exports = new ChangeTheme();
