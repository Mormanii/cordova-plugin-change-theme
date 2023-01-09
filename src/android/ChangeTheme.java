package br.com.mormani.cordova;

import androidx.appcompat.app.AppCompatDelegate;
import android.webkit.WebView;
import android.webkit.WebSettings;

import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class ChangeTheme extends CordovaPlugin {
    private static final String SET_DARK_THEME = "setDarkTheme";

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callback) throws JSONException {
        if (action.equals(SET_DARK_THEME)) {
            setDarkTheme(args.getBoolean(0), callback);
        } else {
            return false;  // Returning false results in a "MethodNotFound" error.
        }

        return true;
    }

    private void setDarkTheme(boolean enable, CallbackContext callback) throws JSONException {
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
