// import COS from 'cos-js-sdk-v5'
var COS = require('./js_sdk/cos/cos-wx-sdk-v5.js')
// import { getCosToken } from '@/api/common'
import config from '@/config/index.js'
const uuidv1 = require('./js_sdk/cos/uuidv1.js')
import {getCosToken} from '@/api/comm.js'
const cos = new COS({
  getAuthorization: function(options, callback) {
    // 异步获取临时密钥
    console.log(options)
    getCosToken().then(({ data }) => {
      console.log(data)
      callback({
        TmpSecretId: data.credentials.tmpSecretId,
        TmpSecretKey: data.credentials.tmpSecretKey,
        XCosSecurityToken: data.credentials.sessionToken,
        ExpiredTime: data.expiredTime
      })
    })
  }
})

// 调用该方法上传文件并获取上传后的结果
export default function(file) {
	console.log('file', file)
  const extArr = file.path.split('.')
  const ext = extArr[extArr.length - 1] || ''
  // const ext = 'jpg'
  return new Promise((resolve, reject) => {
	  cos.postObject({
		  Bucket: config.COS_BUCKET,
		  Region: config.COS_REGION,
		  Key: config.COS_UPLOAD_PATH + uuidv1() + '.' + ext,
		  FilePath: file.path,
		  FileSize: file.size,
	  }, function(err, data) {
      console.log(err || data)
      if (err && err.error) {
        reject(err)
      } else {
        // 如果有CDN地址，那么直接拼上CDN地址做存储
        if (config.COS_CDN_PREFIX) {
          let key=data.Location.split("//")[1]
          data.Location = config.COS_CDN_PREFIX + '/' + key
        }
		    console.log('结果1', data)
        resolve(data)
      }
    });
  })
}
