package co.psychedelic.plug;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

public class BLSModule extends ReactContextBaseJavaModule {
    static {
        System.loadLibrary("mobile_app");
    }

    @Override
    public String getName() {
        return "BLSModule";
    }

    public BLSModule(ReactApplicationContext context) {
        super(context);
    }

//    Direct method
//    @ReactMethod
//    public String androidVerifyJson(String name) {
//        return "Matute123";
//    }

//    Callback method
//    @ReactMethod
//    public void androidVerifyJson(String s, Callback callback) {
//        callback.invoke(verifyJson(s));
//    }

//    Promise method
    @ReactMethod
    public void androidVerifyJson(String s, Promise promise) {
        try {
            promise.resolve(verifyJson(s));
        } catch(Exception e) {
            promise.reject("Error at BLSModule:androidVerifyJson", e);
        }
    }

    private static native String verifyJson(String name);
}