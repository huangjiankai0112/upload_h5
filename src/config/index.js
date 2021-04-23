/**
 * 配置文件：用于配置相关参数，如网络请求地址、静态资源的访问路径等
 */

'use strict';

const config = {};


/**
 * ACTIVITY_ID 活动ID
 */
config.ACTIVITY_ID = process.env.VUE_APP_ACTIVITY_ID;
/**
 * 网页的API接口请求地址 -- CMS相关
 */
config.API_CMS_BASE_URL = process.env.VUE_APP_API_CMS_BASE_URL;
/**
 * 网页的API接口请求地址
 */
config.API_BASE_URL = process.env.VUE_APP_API_BASE_URL;
/**
 * 网页的请求域名
 */
config.DOMAIN_BASE_URL = process.env.VUE_APP_DOMAIN_BASE_URL;

/**
 * open app shareActivityH5
 */
config.OPEN_ACTIVITY_URL = process.env.VUE_APP_OPEN_ACTIVITY_URL;
/**
 * open app shareActivityH5 encode
 */
config.OPEN_ACTIVITY_URL_BASE64 = process.env.VUE_APP_OPEN_ACTIVITY_URL_BASE64;

/**
 * 静态资源的请求域名
 */
config.DOMAIN_RESOURCE = process.env.VUE_APP_DOMAIN_RESOURCE;

/**
 * API请求类型(api字段不带yun的api 认证type值)
 *
 * @type {string|number}
 */
config.APP_REQ_TYPE = process.env.VUE_APP_APP_REQ_TYPE;


/**
 * ins的图片地址
 * 示例：http://dev.api.com/v1/
 * @type {string}
 */
config.INS_IMG_URL = process.env.VUE_APP_INS_IMG_URL;

/**
 * 大数据那边的日志地址
 * 示例：http://dev.api.com/v1/
 * @type {string}
 */
config.DATA_API = process.env.VUE_APP_DATA_API;


/**
 * API请求的超时时间（普通），单位：毫秒（ms）
 * @type {number}
 */
config.API_NORMAL_TIMEOUT = process.env.VUE_APP_API_NORMAL_TIMEOUT * 1000;

/**
 * API请求的超时时间（上传），单位：秒（s）
 * @type {number}
 */
config.API_UPLOAD_TIMEOUT = process.env.VUE_APP_API_UPLOAD_TIMEOUT;

/**
 * 系统的DEBUG状态：
 * 开启则会出现一些DEBUG的提示信息或工具按钮等，以便于更好的开发调试
 * @type {boolean}
 */
config.DEBUG = process.env.VUE_APP_DEBUG;

/**
 * 用户登录身份id
 * @type {string|number}
 */
config.USER_ID = process.env.VUE_APP_USER_ID;

/**
 * 用户登录身份token
 * @type {string|string}
 */
config.USER_TOKEN = process.env.VUE_APP_USER_TOKEN;



export default config;

