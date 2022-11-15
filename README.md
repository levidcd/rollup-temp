# 埋点依赖demo

## 安装依赖

```bash
npm install bm-sentry -S
```

## 初始化方法

**示例：**
```jsx
import { bmSentryInit } from 'bm-sentry'

//初始化方法
bmSentryInit({
  from_appid: '',
  appid: '',
  uid: '',
  session_id: '',
  'X-Bm-Access-Token': '',
  bmSentryService: '',
},{});

or

bmSentryInit({
  from_appid: '',
  appid: '',
  uid: '',
  session_id: '',
  'X-Bm-Access-Token': '',
  bmSentryService: {
    FUNCTION_MODULE: '功能事件上报接口地址',
    CHAT_LOG_AI_REP: '用户输入上报接口地址'
  },
},{});
```

**bmSentryInit参数说明：**

|参数|类型|是否必填|描述|规则说明|                  
|---|---|---|---|---|
|**{}**|object|是|业务数据||
|from_appid|string|是|产品appid||
|appid|string|是|产品appid||
|uid|string|是|用户uid||
|session_id|string |是|会话id，用聊天登录接口返回，取sessionCode值||
|X-Bm-Access-Token|string |是|accessToken应用身份凭证，用于接口中接入应用身份校验||
|bmSentryService|string or object |否|上报接口具体地址，不传或传空值或null或undefined或空对象或对象类型匹配不到值 接口以默认值|统一上报接口地址使用string类型。若是指定事件类型的上报接口地址则使用object，例如：功能事件上报 bmSentryService={FUNCTION_MODULE:'接口地址'}|
|||||
|**{}**|object |是|插件配置数据，包含两个参数，**可传空对象**|
|isTaro|boolean|是|上报页面停留时长路径|
|engine|any|是|如果是taro, 需要透传Taro实例|



###  更新插件配置

**示例：**
```jsx
import { updateParams } from 'bm-sentry'

updateParams({
  uid: 'xxxxxxx'
})
```

**updateParams参数说明：**

|参数|类型|是否必填|描述|                  
|---|---|---|---|
|**{}**|object|是|同bmSentryInit的业务数据参数|



### 获取设备信息

**示例：**
```jsx
import { getSystemData } from 'bm-sentry'

getSystemData()
```

**getSystemData参数说明：无**

**getSystemData返回结果说明：**

|参数|类型|描述|                  
|---|---|---|
|**{}**|object|获取设备信息结果返回数据|
|device_os|string|终端操作系统|
|device_model|string|终端机型|
|client_ip|string|客户端ip|




### 上报

- **聊天上报示例：**

```jsx
import { reportTrackDataByKey, TRACK_DATA_ENUM } from 'bm-sentry'

//用户输入上报示例
let param = {
  'user_request': 'msg',
  'event_time': '123456789',
  'input_type': '用户输入类型'
}

let key = TRACK_DATA_ENUM['CHAT_LOG_AI_REP']

reportTrackDataByKey(key,param)


//AI回复 上报
let param = {
  'response': 'msg',
  'event_time': '123456789',
  'output_type': '回复类型',
  'response_origin': '回复来源'
}

let key = TRACK_DATA_ENUM['CHAT_LOG_AI_RESP']

reportTrackDataByKey(key,param)
```

- **功能事件上报示例：（例如：快捷回复点击、猜你想问点击、模糊匹配点击、选项列表点击等）**

```jsx
import { reportTrackDataByKey, TRACK_DATA_ENUM, FUNCTION_MODULE_ENUM } from 'bm-sentry'

let key = TRACK_DATA_ENUM['FUNCTION_MODULE']

let param = {
  event_time: '123456789',
}

let funckey = FUNCTION_MODULE_ENUM['AI_REPLY_OPTION_CLICK']

reportTrackDataByKey(key, param, funckey, headerParam)

```

**reportTrackDataByKey参数说明：**

|参数|类型|是否必填|描述|规则说明|                
|---|---|---|---|---|
|**key**|string|是|上报的事件类型|详见 [`TRACK_DATA_ENUM`](#TRACK_DATA_ENUM)|
|**param**|object|是|想要上报的数据|上报参数由数仓管理平台配置，包括参数类型、参数是否必传等|
|**funckey**|string|-|上报的功能事件类型|若key值为功能函数事件'FUNCTION_MODULE',则必传。详见[`FUNCTION_MODULE_ENUM`](#FUNCTION_MODULE_ENUM)|
|**headerParam**|object|否|上报接口请求header头信息|-|


### TRACK_DATA_ENUM
_上报事件枚举_

|type|描述|                  
|---|---|
|APPLICATION_OPEN|应用打开|
|PAGE_INTO|页面进入|
|PAGE_STAY|页面停留|
|FUNCTION_MODULE|功能事件|
|SYSTEM|系统信息|
|ADDRESS|地理信息|
|CHAT_LOG_AI_REP|聊天日志_用户输入|
|CHAT_LOG_AI_RESP|聊天日志_AI回复|
|AI_FEEDBACK_LIKE|用户反馈_用户点赞|
|AI_FEEDBACK_DISLIKE|用户反馈_用户点踩|

### FUNCTION_MODULE_ENUM
_功能函数枚举_

|type|描述|                  
|---|---|
|CUSTOM_CLICK|自定义点击|
|TOP_QUESTIONS_CLICK|热门问题点击|
|TOP_QUESTIONS_REFRESH|热门问题换一批|
|NAVIGATOR_NAV_CLICK|服务导航点击|
|NAVIGATOR_QUESTION_CLICK|服务导航_具体问题点击|
|SUPPOSE_ASSOCIATE_CLICK|猜你想问点击|
|SUPPOSE_FUZZY_MATCH_CLICK|模糊匹配点击|
|AI_REPLY_OPTION_CLICK|快捷回复选项点击|
|AI_REPLY_OPTION_LIST_CLICK|选项列表点击|




### 自定义上报

**示例：**

```jsx
import { reportTrackData } from 'bm-sentry'

//以猜你想问-点击上报 为例
let param = {
  from_appid: 'x.xxxxx',
  appid: 'x.xxxxx',
  topic: 'prod_func',
  subtopic: 'function',
  uid: '123456',
  event_code: 'prod_func_click006',
  event_time: '1234567890',
  session_id: 'xxxxxxxxxxxxxxxx',
  event_count:1,
  event_value:''
}

reportTrackData(param,headerParam,url)
```



**reportTrackData参数说明：**

|参数|类型|是否必填|描述|               
|---|---|---|---|
|**param**|object or array|是|想要上报的数据|
|**headerParam**|object|否|上报接口请求header头信息|
|**url**|string|否|**自定义上报接口的具体地址。**例如：https://upgrade.nekoplan.com/gateway/dataService/v1/dataDetail/report/prod_func。 |



## 开发调试说明
见 [开发须知](./docs/DevelopmentNotes.md)
