package br.com.mormani.cordova;

import android.os.Build.VERSION;
import android.os.Build.VERSION_CODES;
import android.webkit.WebView;
import android.webkit.WebSettings;

import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;

public class ChangeTheme extends CordovaPlugin {
    private static final String SET_DARK_THEME = "setDarkTheme";

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callback) throws JSONException {
        if (action.equals(SET_DARK_THEME)) {
            int sdkVersion = android.os.Build.VERSION.SDK_INT;

            if (sdkVersion >= android.os.Build.VERSION_CODES.Q) {
                setDarkTheme(args.getBoolean(0), callback);
            } else {
                callback.error("Android SDK must be greater than or equal to 29, but is " + sdkVersion + ".");
            }
        } else {
            return false;  // Returning false results in a "MethodNotFound" error.
        }

        return true;
    }

    private void setDarkTheme(boolean enable, CallbackContext callback) {
        ChangeTheme plugin = this;

        cordova.getActivity().runOnUiThread(new Runnable() {
            public void run() {
                WebView view = (WebView) plugin.webView.getEngine().getView();
                WebSettings webSettings = view.getSettings();

                int action = enable ? WebSettings.FORCE_DARK_ON : WebSettings.FORCE_DARK_OFF;
                webSettings.setForceDark(action);

                callback.success();
            }
        });
    }
}
