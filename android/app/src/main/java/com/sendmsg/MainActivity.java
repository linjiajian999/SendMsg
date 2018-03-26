package com.sendmsg;

import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.telephony.SmsManager;

import com.facebook.react.ReactActivity;

import com.facebook.react.modules.SendMsgTool.SendMsgTool;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "SendMsg";
    }

    protected SMSSendResultReceiver mSMSReceiver = new SMSSendResultReceiver();
    protected IntentFilter mSMSResultFilter = new IntentFilter();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mSMSResultFilter.addAction(SendMsgTool.SENT_SMS_ACTION);
        registerReceiver(mSMSReceiver, mSMSResultFilter);
    }

    // 声明一个广播
    class SMSSendResultReceiver extends BroadcastReceiver {
        @Override
        public void onReceive(Context ctx, Intent intent) {
            String phone = intent.getStringExtra(SendMsgTool.KEY_PHONENUM);
            int msgId = intent.getIntExtra(SendMsgTool.KEY_MSG_ID, -1);
            switch (getResultCode()) {
                case SmsManager.RESULT_ERROR_GENERIC_FAILURE:
                case SmsManager.RESULT_ERROR_NO_SERVICE:
                case SmsManager.RESULT_ERROR_RADIO_OFF:
                case SmsManager.RESULT_ERROR_NULL_PDU:
                    System.err.println("Send Message to " + phone + " fail!");
                    SendMsgTool.emitMsgEvent(
                            msgId,
                            SendMsgTool.SEND_STATE_FAIL,
                            phone,
                            getResultCode()
                    );
                    break;
                case Activity.RESULT_OK:
                    System.err.println("Execute action that Send Message to " + phone + " success!");
                    SendMsgTool.emitMsgEvent(
                            msgId,
                            SendMsgTool.SEND_STATE_SUCC,
                            phone,
                            getResultCode()
                    );
                    break;
                default:
                    System.err.println("Send Message to " + phone + " default error!");
                    SendMsgTool.emitMsgEvent(
                            msgId,
                            SendMsgTool.SEND_STATE_ERR,
                            phone,
                            getResultCode()
                    );
                    break;
            }

        }
    }
}
