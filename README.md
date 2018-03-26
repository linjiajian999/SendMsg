# SendMsg
> 在安卓设备上，可以调用发短信接口，实现在后台自动发送短信功能
> an android app that can send sms on background
- 使用typescript
- react-native with typescript
# usage
- 实现安卓原生模块 SendMsgTool
```typescript
import {
  NativeModules,
  DeviceEventEmitter
} from 'react-native'

const ON_MSG_CALLBACK = 'ON_MSG_CALLBACK'
const NativeSendMsgTool = NativeModules.SendMsgTool

interface MsgCallbackParams {
  info: string
  phone: string
  statusCode: number
  msgId: number
}

let id = 0
let phone = '10086'
let msg = 'hello'
// 发送短信
NativeSendMsgTool.sendMsg(id, phone, msg)
// 可监听短信发送回调
DeviceEventEmitter.addListener(
  ON_MSG_CALLBACK,
  (params: MsgCallbackParams) => {
     console.log(params)
  }
)
```
详情可参考 [send-msg-tool.ts](https://github.com/linjiajian999/SendMsg/blob/master/src/send-msg-tool/index.ts)
