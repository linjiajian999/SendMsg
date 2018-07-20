# SendMsg
> 在安卓设备上，可以调用发短信接口，实现在后台自动发送短信功能

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
[安卓主要代码实现](https://github.com/linjiajian999/SendMsg/blob/master/android/app/src/main/java/com/facebook/react/modules/SendMsgTool/SendMsgTool.java)
- iOS由于api限制，不能自动发送短信，只实现了APP内调起发送短信界面，需要手动发送
- 主要功能已实现
