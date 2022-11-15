import './utils/lodash-polyfill'
import { createProxy, updateProxy, PluginConfig } from './hub'
import { IMainConfig, ISettingConfig } from './interface'

import { checkAccessToken, accessTokenErrorMsg } from './utils'

import { initTracker } from './core'

// 单例插件配置，用来存全局变量
const pluginConfig = new PluginConfig()

// 初始化配置
var bmConfig = {}
const configProxy = createProxy(bmConfig)

/**
 * 初始化函数
 * @param {from_appid,appid,X-Request-Id,X-Bm-Access-Token} data
 * from_appid：调用方：web/app/h5/微信小程序/微信公众号/电话机器人/硬件机器人
 * appid：当前使用的是产品id【必传】
 * session_id：会话id
 * uid：当前行为用户
 * X-Request-Id：网关接口所需要的请求跟踪编号，通常为uuid
 * X-Bm-Access-Token：网关接口所需要的accessToken应用身份凭证，用于接入身份校验。【必传】
 * technicalOrigin：技术源：taro/uniapp/react/vue/浙里办 等。浙里办中接口调用，语音等需使用浙里办提供的api。
 * unReportPagePath：取消页面上报的页面路径
 *
 * 第一个对象接受业务相关配置
 * 第二个对象接受插件相关配置
 
 */
export function bmSentryInit(param: IMainConfig, config: ISettingConfig) {
  console.log('param埋点插件初始化方法参数：',param)
  console.log('config埋点插件初始化方法参数：',config)
  // 插件配置放进单例中保存
  pluginConfig.config.isTaro = config.isTaro
  pluginConfig.config.engine = config.engine

  setTimeout(() => {
    if (param && Object.prototype.toString.call(param) === '[object Object]') {
      console.log(param,'param1 ----- 初始化')
      updateProxy(param, configProxy)

      //校验必传字段X-Bm-Access-Token
      if(checkAccessToken(param)){
        initTracker()
      }
    }else{
      console.log(param,'param1 ----- 字段X-Bm-Access-Token和appid必传提示')
      //字段X-Bm-Access-Token和appid必传提示
      accessTokenErrorMsg()
    }
  })
}

/** 更新插件业务数据配置 */
export function updateParams(param: IMainConfig) {
  if (param && Object.prototype.toString.call(param) === '[object Object]') {
    updateProxy(param, configProxy)
  }
}

export { reportTrackData, reportTrackDataByKey } from './report'
export { getSystemData} from './core'
export { TRACK_DATA_ENUM, FUNCTION_MODULE_ENUM } from './utils'
