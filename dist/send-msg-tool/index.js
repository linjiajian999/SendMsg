var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { NativeModules, DeviceEventEmitter } from 'react-native';
const NativeSendMsgTool = NativeModules.SendMsgTool;
export const ON_MSG_CALLBACK = 'ON_MSG_CALLBACK';
export var SEND_STATE;
(function (SEND_STATE) {
    SEND_STATE["SEND_STATE_SENDING"] = "SEND_STATE_SENDING";
    SEND_STATE["SEND_STATE_FAIL"] = "SEND_STATE_FAIL";
    SEND_STATE["SEND_STATE_ERR"] = "SEND_STATE_ERR";
    SEND_STATE["SEND_STATE_SUCC"] = "SEND_STATE_SUCC";
})(SEND_STATE || (SEND_STATE = {}));
export var MSG_RESULT;
(function (MSG_RESULT) {
    /** succcess */
    MSG_RESULT[MSG_RESULT["RESULT_SUCC"] = -1] = "RESULT_SUCC";
    /** Generic failure cause */
    MSG_RESULT[MSG_RESULT["RESULT_ERROR_GENERIC_FAILURE"] = 1] = "RESULT_ERROR_GENERIC_FAILURE";
    /** Failed because radio was explicitly turned off */
    MSG_RESULT[MSG_RESULT["RESULT_ERROR_RADIO_OFF"] = 2] = "RESULT_ERROR_RADIO_OFF";
    /** Failed because no pdu provided */
    MSG_RESULT[MSG_RESULT["RESULT_ERROR_NULL_PDU"] = 3] = "RESULT_ERROR_NULL_PDU";
    /** Failed because service is currently unavailable */
    MSG_RESULT[MSG_RESULT["RESULT_ERROR_NO_SERVICE"] = 4] = "RESULT_ERROR_NO_SERVICE";
    /** Failed because we reached the sending queue limit.  {@hide} */
    MSG_RESULT[MSG_RESULT["RESULT_ERROR_LIMIT_EXCEEDED"] = 5] = "RESULT_ERROR_LIMIT_EXCEEDED";
    /** Failed because FDN is enabled. {@hide} */
    MSG_RESULT[MSG_RESULT["RESULT_ERROR_FDN_CHECK_FAILURE"] = 6] = "RESULT_ERROR_FDN_CHECK_FAILURE";
})(MSG_RESULT || (MSG_RESULT = {}));
export const sendMsgTool = {
    linstenerMap: (new Map()),
    sendMsg(id, phone, msg) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`sending message to phone:${phone}`);
            return yield NativeSendMsgTool.sendMsg(id, phone, msg);
        });
    },
    addListener(key, listener) {
        this.linstenerMap.set(key, listener);
    },
    removeListener(key) {
        if (this.linstenerMap.has(key)) {
            this.linstenerMap.delete(key);
        }
    }
};
export default sendMsgTool;
DeviceEventEmitter.addListener(ON_MSG_CALLBACK, (params) => {
    console.log(params);
    for (let keyAndValue of sendMsgTool.linstenerMap) {
        keyAndValue[1](params);
    }
});
