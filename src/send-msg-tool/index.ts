import {
  NativeModules,
  DeviceEventEmitter
} from 'react-native'

const NativeSendMsgTool = NativeModules.SendMsgTool

export const ON_MSG_CALLBACK = 'ON_MSG_CALLBACK'

export enum SEND_STATE {
  SEND_STATE_SENDING = 'SEND_STATE_SENDING',
  SEND_STATE_FAIL = 'SEND_STATE_FAIL',
  SEND_STATE_ERR = 'SEND_STATE_ERR',
  SEND_STATE_SUCC = 'SEND_STATE_SUCC'
}
export enum MSG_RESULT {
  /** succcess */
  RESULT_SUCC = -1,
  /** Generic failure cause */
  RESULT_ERROR_GENERIC_FAILURE = 1,
  /** Failed because radio was explicitly turned off */
  RESULT_ERROR_RADIO_OFF = 2,
  /** Failed because no pdu provided */
  RESULT_ERROR_NULL_PDU = 3,
  /** Failed because service is currently unavailable */
  RESULT_ERROR_NO_SERVICE = 4,
  /** Failed because we reached the sending queue limit.  {@hide} */
  RESULT_ERROR_LIMIT_EXCEEDED = 5,
  /** Failed because FDN is enabled. {@hide} */
  RESULT_ERROR_FDN_CHECK_FAILURE = 6
}

export interface MsgCallbackParams {
  info: string
  phone: string
  statusCode: number
  msgId: number
}

export interface SendMsgToolListener {
  (info: MsgCallbackParams): void
}
export interface SendMsgTool {
  linstenerMap: Map<string, SendMsgToolListener>
  sendMsg(id:number, phone: string, msg: string): Promise<string>
  addListener(listener: SendMsgToolListener): void
}
export const sendMsgTool = {
  linstenerMap: <Map<string, SendMsgToolListener>>(new Map()),
  async sendMsg(
    id:number,
    phone: string,
    msg: string
  ): Promise<string> {
    console.log(`sending message to phone:${phone}`)
    return await NativeSendMsgTool.sendMsg(
      id,
      phone,
      msg
    )
  },
  addListener(key: string, listener: SendMsgToolListener) {
    this.linstenerMap.set(key, listener)
  },
  removeListener(key: string) {
    if (this.linstenerMap.has(key)) {
      this.linstenerMap.delete(key)
    }
  }
}
export default sendMsgTool

DeviceEventEmitter.addListener(
  ON_MSG_CALLBACK,
  (params: MsgCallbackParams) => {
    console.log(params)
    for (let keyAndValue of sendMsgTool.linstenerMap) {
      keyAndValue[1](params)
    }
  }
)
