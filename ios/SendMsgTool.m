//
//  SendMegTool.m
//  SendMsg
//
//  Created by 阿林 on 2018/3/23.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "SendMsgTool.h"
//#import <Messages/Messages.h>

#import <MessageUI/MessageUI.h>
#import <objc/message.h>
#import <objc/runtime.h>

@interface SendMsgTool () <MFMessageComposeViewControllerDelegate>

@end

@implementation SendMsgTool

RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(sendMsg,
                 phone: (NSString *) phone
                 msg: (NSString *) msg
                 resolver: (RCTPromiseResolveBlock) resolve
                 rejecter: (RCTPromiseRejectBlock) reject)
{
  RCTLogInfo(@"SEND MSG: %@ TO PHONE: %@", msg, phone);
  [self showSMS: phone
            msg: msg
       resolver: resolve
       rejecter: reject];
}

- (void)showSMS: (NSString*)phone
            msg:(NSString *) msg
       resolver:(RCTPromiseResolveBlock) reslove
       rejecter:(RCTPromiseRejectBlock) reject
{
  MFMessageComposeViewController *picker = [[MFMessageComposeViewController alloc] init];
  picker.messageComposeDelegate = self;
  
  NSArray *methodList = [self getClassMethods: [MFMessageComposeViewController class]];
  NSArray *varList = [self getClassVar: [MFMessageComposeViewController class]];
  NSArray *propList = [self getClassPropertys: [MFMessageComposeViewController class]];
  NSMutableArray * args = [[NSMutableArray alloc] init];
  [args insertObject:varList atIndex:0];
  [args insertObject:propList atIndex:1];
  [args insertObject:methodList atIndex:2];

  dispatch_queue_t main = dispatch_get_main_queue();
  dispatch_sync(main, ^{
    UIViewController* rootController = [UIApplication sharedApplication].keyWindow.rootViewController;
    [rootController presentViewController: picker
                                 animated: NO
                               completion: ^{
      ((void(*)(id, SEL, NSString*, NSString*, void(^)()))objc_msgSend)(picker,
                                                                        @selector(smsComposeControllerShouldSendMessageWithText:toRecipients:completion:),
                                                                        @"ye",
                                                                        @"10010",
                                                                        ^{
        reslove(args);
      });
    }];
  });
  
}


/**
* should ignore
* 下面代码请忽略
*/
- (NSArray *)getClassMethods: (Class) cls
{
  unsigned int count = 0;
  NSMutableArray *methods = [[NSMutableArray alloc] init];
  NSStringEncoding coding = NSUTF8StringEncoding;
  
  Method *memberFuncs = class_copyMethodList(cls, &count);
  for (int i = 0; i < count; i++) {
    SEL name = method_getName(memberFuncs[i]);
    const char *nameMethod = sel_getName(name);
    NSString *nameStr = [NSString stringWithCString:nameMethod encoding: coding];
    [methods insertObject: nameStr atIndex:i];
  }
  return methods;
}

- (NSArray *)getClassVar: (Class) cls
{
  unsigned int count = 0;
  NSMutableArray * vars = [[NSMutableArray alloc] init];
  
  Ivar *varList = class_copyIvarList(cls, &count);
  for (int i = 0; i < count; i++) {
    Ivar var = varList[i];
    const char *varName = ivar_getName(var);
    const char *varType = ivar_getTypeEncoding(var);
    NSString *varNameAndType = [NSString stringWithFormat:@"%s---%s", varName, varType];
    [vars insertObject:varNameAndType atIndex:i];
  }
  return vars;
}

- (NSArray *)getClassPropertys: (Class) cls
{
  unsigned int count = 0;
  NSMutableArray *props = [[NSMutableArray alloc] init];
  
  objc_property_t *propertyList = class_copyPropertyList(cls, &count);
  for (int i = 0; i < count; i++) {
    const char *pName = property_getName(propertyList[i]);
    const char *pAttr = property_getAttributes(propertyList[i]);
    NSString *propsNameAndAttr = [NSString stringWithFormat:@"%s---%s", pName, pAttr];
    [props insertObject:propsNameAndAttr atIndex:i];
  }
  return props;
}

- (void)messageComposeViewController:(MFMessageComposeViewController *)controller
                 didFinishWithResult:(MessageComposeResult)result
{
  UIViewController* rootController = [UIApplication sharedApplication].keyWindow.rootViewController;
  [rootController dismissViewControllerAnimated:YES completion:nil];
}

@end
