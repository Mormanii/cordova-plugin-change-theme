package br.com.mormani.cordova;

import androidx.appcompat.app.AppCompatDelegate;

import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class ChangeTheme extends CordovaPlugin {
    private static final String SET_DARK_THEME = "setDarkTheme";
    private static final String SET_LIGHT_THEME = "setLightTheme";
    private static final String INITIAL_THEME = "initialTheme";

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        // your init code here
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callback) throws JSONException {
        if (action.equals(SET_DARK_THEME)) {
            setDarkTheme(args.getBoolean(0), callback);
        } else if (action.equals(SET_LIGHT_THEME)) {
            setLightTheme(args.getBoolean(0), callback);
        } else if (action.equals(INITIAL_THEME)) {
            getInitialTheme(callback);
        } else {
            return false;  // Returning false results in a "MethodNotFound" error.
        }

        return true;
    }

    private void setDarkTheme(boolean enable, CallbackContext callback) throws JSONException {
        JSONObject response = new JSONObject();
        int themeCode = AppCompatDelegate.MODE_NIGHT_UNSPECIFIED;

        if (enable) {
            themeCode = AppCompatDelegate.MODE_NIGHT_YES;
            response.put("name", "Dark");
        } else {
            themeCode = AppCompatDelegate.MODE_NIGHT_NO;
            response.put("name", "Light");
        }

        AppCompatDelegate.setDefaultNightMode(themeCode);

        response.put("code", themeCode);
        callback.success(response);
    }

    private void setLightTheme(boolean enable, CallbackContext callback) {

    }

    private void getInitialTheme(CallbackContext callback) throws JSONException {
        int themeCode = AppCompatDelegate.getDefaultNightMode();

        JSONObject response = new JSONObject();
        response.put("code", themeCode);

        if (themeCode == AppCompatDelegate.MODE_NIGHT_YES) {
            response.put("name", "Dark");
        } else if (themeCode == AppCompatDelegate.MODE_NIGHT_NO) {
            response.put("name", "Light");
        } else {
            // For other theme codes see: https://developer.android.com/reference/androidx/appcompat/app/AppCompatDelegate#MODE_NIGHT_AUTO()
            response.put("name", "Unknow Theme");
        }

        callback.success(response);
    }
}
