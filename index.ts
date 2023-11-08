import {jsCallNativeAccount,jsCallNativeStatics,registerHandler,setDarkModeParamType,loginParamsType,userInfoType, sendEventType} from './lib/jsBridge'

//登录  reqId 识别登录来源
export const goToLogin = (reqId?:string) => {
   return  jsCallNativeAccount<undefined,loginParamsType>('goToLogin',{
      reqId,
    })
  };

  //获取用户信息 
  export const getUserInfo= ():Promise<userInfoType | null> => {
    return new Promise((resolve,reject)=>{
      jsCallNativeAccount<userInfoType,undefined>('getUserInfo').then(res => {
      resolve(res)
    }).catch(err=>{
      reject(err)
    })
    })   
  };

  

  //统计事件
  export const sendEvent = ({
	 actionId,
      type,
      pageName, 
	  extra
}:sendEventType)=>{
    return jsCallNativeStatics('sendEvent',{
      actionId,
      type,
      pageName, 
      ...extra
    })
  }

  //获取头部信息
  export const getHeaderInfo = ()=>{
     return jsCallNativeStatics('getHeaderInfo')
  }


  //退出登录
  export const logout = () => {
    return jsCallNativeAccount('logout')
  };

  //注销账户
  export const cancelAccount = () => {
    return jsCallNativeAccount('cancelAccount')
  };

  //绑定手机号码
  export const bindPhone = () => {
   return  jsCallNativeAccount('bindPhone')
  };

  //绑定邮箱
  export const bindEmail = () => {
   return  jsCallNativeAccount('bindEmail')
  };

  //修改密码
  export const changePassword = () => {
   return  jsCallNativeAccount('changePassword')
  };

  //修改头像
  export const changeAvatar = () => {
    return jsCallNativeAccount('changeAvatar')
  };

  //修改昵称
  export const changeNickName = () => {
    return jsCallNativeAccount('changeNickName')
  };

  //设置模式
 export const setDarkMode = (darkMode:boolean) => {
   return  jsCallNativeAccount<undefined,setDarkModeParamType>('setDarkMode', {
      darkMode
    })
  };

  //设置页
  export const goAdminPage = () => {
    return jsCallNativeAccount('goAdminPage')
  };

  //监听登录状态
  export const onLoginChanged = (callback:(data:userInfoType)=>any) => {
     registerHandler('onLoginChanged', (res:string) => {
      callback(JSON.parse(res))
    });   
  };

  //监听账户注销
  export const onAccountCancel = (callback:(data:userInfoType)=>any) => {
     registerHandler('onAccountCancel', (res:string) => {
      callback(JSON.parse(res))
    }); 
  };

  
  