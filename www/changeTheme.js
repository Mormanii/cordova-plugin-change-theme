const SERVICE_NAME = "ChangeTheme";

const exec = require("cordova/exec");
const utils = require("cordova/utils");
const channel = require("cordova/channel");


function ChangeTheme() {
  this.currentTheme = {
    name: undefined,
    code: undefined
  };

  channel.onCordovaInfoReady.subscribe(() => {
    const success = (theme) => {
      this.currentTheme = theme;
      channel.onCordovaInfoReady.fire();
    };

    const error = (error) => {
      console.error("Error initializing cordova-plugin-change-theme: ", error);
    };

    exec(success, error, SERVICE_NAME, "initialTheme", []);
  });
}

ChangeTheme.prototype.isEnabled = function(theme) {
  return theme === this.currentTheme.name;
};

utils.defineGetterSetter(ChangeTheme, "currentTheme",
  function() {
    return this.currentTheme;
  },
  function(newValue) {
    this.currentTheme.name = newValue.name;
    this.currentTheme.code = newValue.code;
  }
);

// Dark Theme Controllers.
ChangeTheme.prototype.enableDark = function() {
  if (this.isEnabled("Dark")) {
    return;
  }

  const success = (theme) => {
    this.currentTheme = theme;
  };

  const error = (error) => {
    console.error("Error enabling Dark Theme: ", error);
  };

  exec(success, error, SERVICE_NAME, "setDarkTheme", [true]);
};

ChangeTheme.prototype.disableDark = function() {
  if (!this.isEnabled("Dark")) {
    return;
  }

  const success = (theme) => {
    this.currentTheme = theme;
  };

  const error = (error) => {
    console.error("Error disabling Dark Theme: ", error);
  };

  exec(success, error, SERVICE_NAME, "setDarkTheme", [false]);
};

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

// Light Theme Controllers.
ChangeTheme.prototype.enableLight = function() {
  if (this.isEnabled("Light")) {
    return;
  }

  const success = (theme) => {
    this.currentTheme = theme;
  };

  const error = (error) => {
    console.error("Error enabling Light Theme: ", error);
  };

  exec(success, error, SERVICE_NAME, "setLightTheme", [true]);
};

ChangeTheme.prototype.disableLight = function() {
  if (!this.isEnabled("Light")) {
    return;
  }

  const success = (theme) => {
    this.currentTheme = theme;
  };

  const error = (error) => {
    console.error("Error disabling Light Theme: ", error);
  };

  exec(success, error, SERVICE_NAME, "setLightTheme", [false]);
};

ChangeTheme.prototype.setLight = function(enable) {
  const paramType = utils.typeName(enable);

  if (paramType !== "Boolean") {
    throw new TypeError("Expected Boolean parameter but got " + paramType + " on setLight");
  }

  if (enable) {
    this.enableLight();
  } else {
    this.disableLight();
  }
};

module.exports = new ChangeTheme();
