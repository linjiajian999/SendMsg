package com.facebook.react.modules.SendMsgTool;
import android.app.Activity;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.widget.Toast;
import android.telephony.SmsManager;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.IllegalViewOperationException;


import com.facebook.react.ReactPackage;
import com.facebook.react.uimanager.ViewManager;

import com.facebook.react.bridge.Promise;

import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.util.Collections;
import java.util.List;

/**
 * Created by linjiajian on 2018/3/24.
 */

public class SendMsgTool extends ReactContextBaseJavaModule {

    public static final String SEND_STATE_SENDING = "SEND_STATE_SENDING";
    public static final String SEND_STATE_FAIL = "SEND_STATE_FAIL";
    public static final String SEND_STATE_ERR = "SEND_STATE_ERR";
    public static final String SEND_STATE_SUCC = "SEND_STATE_SUCC";

    public static final String SENT_SMS_ACTION = "SENT_SMS_ACTION";
    public static final String KEY_PHONENUM = "KEY_PHONENUM";
    public static final String KEY_MSG_ID = "KEY_MSG_ID";

    public static final String ON_MSG_CALLBACK = "ON_MSG_CALLBACK";

//    public static Callback theMsgCallback;
    public static ReactApplicationContext theReactCtx;

    public SendMsgTool(ReactApplicationContext reactContext) {
        super(reactContext);
        theReactCtx = reactContext;
    }

    @Override
    public String getName() {
        return "SendMsgTool";
    }
    @ReactMethod
    public void sendMsg(int msgId, String phone, String msg, Promise promise) {
        if (msg == null || phone == null) {
            promise.reject(SEND_STATE_FAIL, "msg or phone can not be null");
            return;
        }
        try {
            SmsManager sms = SmsManager.getDefault();
            ArrayList<String> msgList = sms.divideMessage(msg);
            // TIPS1: 若文本信息过长，则使用分割后的第一段
            // TIP2: 如果需要发送所有文本，请遍历 msgList
            int i = 0;
            Intent sentIntent = new Intent(SENT_SMS_ACTION);
            sentIntent.putExtra(KEY_PHONENUM, phone);
            sentIntent.putExtra(KEY_MSG_ID, msgId);
            promise.resolve(SEND_STATE_SENDING);
            PendingIntent sentPendingIntent = PendingIntent.getBroadcast(
                    getReactApplicationContext(),
                    i,
                    sentIntent,
                    PendingIntent.FLAG_ONE_SHOT
            );
            sms.sendTextMessage(
                    phone,
                    null,
                    msgList.get(i),
                    sentPendingIntent,
                    null
            );

        } catch (IllegalViewOperationException e) {
            promise.reject(SEND_STATE_FAIL, e.getMessage());
        }
    }

    public static void emitMsgEvent(int msgId, String info, String phone, int statusCode) {
        WritableMap params = Arguments.createMap();
        params.putInt("msgId", msgId);
        params.putString("info", info);
        params.putString("phone", phone);
        params.putInt("statusCode", statusCode);
        theReactCtx
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(ON_MSG_CALLBACK, params);
    }


}

