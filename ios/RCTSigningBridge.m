//
//  SigningBridge.m
//  Plug
//
//  Created by Gilbert Jolly on 25/02/2022.
//

#import <Foundation/Foundation.h>

#import <React/RCTBridgeModule.h>
#import "RCTSigningBridge.h"
#import <React/RCTLog.h>
#import "libplug_signer.h"


@implementation RCTSigningBridge

RCT_EXPORT_MODULE();

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(signData:(NSString *) data){
  const char *command = [data UTF8String];
  const char *signedData = ios_verify_json(command);

  return [NSString stringWithUTF8String:signedData];
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(interchangeDemo:(NSString *) data){
  const char *command = [data UTF8String];
//  const char *signedData = interchange_demo(command);
  return [NSString string];
}

@end
