import {NativeModules, DeviceEventEmitter} from 'react-native';
 
type jsCallNativeMethod='getUserInfo'|'goToLogin'|'logout'|'cancelAccount' | 'bindEmail'|'bindPhone'|'changePassword'|'changeAvatar'|'changeNickName' | 'setDarkMode' | 'goAdminPage'  ; 
type NativeCallJsMethod= 'onLoginChanged' | 'onAccountCancel'

type jsCallNativeStaticsMethods = 'sendEvent' | 'getHeaderInfo'


export const jsCallNativeAccount = <T, U>(
	methods: jsCallNativeMethod,
	params?: U,
): Promise<T> => {
	return new Promise((resolve, reject) => {
		let paramsStr = '';
		if (typeof params !== 'string') {
			paramsStr = JSON.stringify(params);
		} else {
			paramsStr = params;
		}
		NativeModules.AccountModule[methods](paramsStr)
			.then(({code, data}: {code: number; data: any}) => {
				if (code === 200) {
					resolve(data);
				} else {
					reject(data);
				}
			})
			.catch((e: any) => {
				reject(e);
			});
	});
};

export const jsCallNativeStatics = <T, U>(
	methods: jsCallNativeStaticsMethods,
	params?: U,
): Promise<T> => {
	return new Promise((resolve, reject) => {
		let paramsStr = '';
		if (typeof params !== 'string') {
			paramsStr = JSON.stringify(params);
		} else {
			paramsStr = params;
		}
		NativeModules.StatisticsModule[methods](paramsStr)
			.then(({code, data}: {code: number; data: any}) => {
				if (code === 200) {
					resolve(data);
				} else {
					reject(data);
				}
			})
			.catch((e: any) => {
				reject(e);
			});
	});
};


export const jsCallNative = <T, U extends object>(
	methods: string,
	params?: U,
): Promise<T> => {
	return new Promise((resolve, reject) => {
		let paramsStr = '';
		if (typeof params !== 'string') {
			paramsStr = JSON.stringify(params);
		} else {
			paramsStr = params;
		}
		NativeModules.NativeModule[methods](paramsStr)
			.then(({code, data}: {code: number; data: any}) => {
				if (code === 200) {
					resolve(data);
				} else {
					reject(data);
				}
			})
			.catch((e: any) => {
				reject(e);
			});
	});
};

export const registerHandler = <U>(
	method: NativeCallJsMethod,
	callback: (res: U) => void,
) => DeviceEventEmitter.addListener(method, callback);

export interface userInfoType {
	avatar: string; //头像
	isVip: number; //vip状态
	nickname: string; // 昵称
	passid: number; // passid
	phone: string; //手机号
	ticket: string; //ticket
	userNo: string; //用户编号
	vipEndDate: number; //VIP到期时间 如果为空 说明是终身vip
	vipStartDate: number; // VIP开始时间
}

export interface loginParamsType {
	reqId?:string // 给登录创建的id 辨别是哪个登录行为
}

export interface setDarkModeParamType {
	darkMode:boolean //黑暗模式是否开启
}


export interface encryptStringReq {
	plainText: string;
}

export interface encryptStringRes {
	encryptText: string;
}


export interface sendEventType{
actionId:string,
type:string,
pageName:string,
extra:any
}