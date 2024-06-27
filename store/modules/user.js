import config from '@/config'
import configIndex from '@/config/index'
import storage from '@/utils/storage'
import constant from '@/utils/constant'
import { getToken, setToken, removeToken, setWetchatName, setAppInfo } from '@/utils/auth'
import { login, logout, getInfo } from '@/api/login'
import {
  getByAppIdInformation
} from '@/api/comm'

const baseUrl = config.baseUrl

const user = {
  state: {
    token: getToken(),
    name: storage.get(constant.name),
    avatar: storage.get(constant.avatar),
    roles: storage.get(constant.roles),
    permissions: storage.get(constant.permissions),
    appInfo: uni.getStorageSync('appInfo'),
    wetchatName: uni.getStorageSync('wetchatName')
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
      storage.set(constant.name, name)
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
      storage.set(constant.avatar, avatar)
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
      storage.set(constant.roles, roles)
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
      storage.set(constant.permissions, permissions)
    },
    SET_APP_INFO: (state, appInfo) => {
      console.log('alala', appInfo)
      state.appInfo = appInfo
      state.wetchatName = appInfo.miniProgramName
      uni.setStorageSync('wetchatName', appInfo.miniProgramName)
      uni.setStorageSync('appInfo', JSON.stringify(appInfo))
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password
      const openid = userInfo.openid
      const header = userInfo.header
      return new Promise((resolve, reject) => {
        login({
          username,
          password,
          openid,
          header
        }).then(res => {
          uni.setStorageSync('userInfoJson', JSON.stringify(res.data))
          uni.setStorageSync('token', res.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          const user = res.user
          const avatar = (user == null || user.avatar == "" || user.avatar == null) ? configIndex.COS_CDN_PREFIX_http + "/mini/static/images/default/user.png" : baseUrl + user.avatar
          const username = (user == null || user.userName == "" || user.userName == null) ? "" : user.userName
          if (res.roles && res.roles.length > 0) {
            commit('SET_ROLES', res.roles)
            commit('SET_PERMISSIONS', res.permissions)
          } else {
            commit('SET_ROLES', ['ROLE_DEFAULT'])
          }
          commit('SET_NAME', username)
          commit('SET_AVATAR', avatar)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          // commit('SET_TOKEN', '')
          // commit('SET_ROLES', [])
          // commit('SET_PERMISSIONS', [])
          removeToken()
          uni.removeStorageSync('userId')
          uni.removeStorageSync('phone')
          uni.removeStorageSync('avatar')
          uni.removeStorageSync('templateNum')
          uni.removeStorageSync('wetchatName')
          storage.clean()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 设置app的信息
    SetAppInfo({ commit }, appInfo) {
      return new Promise((resolve, reject) => {
        const accountInfo = uni.getAccountInfoSync()
        const appId = accountInfo.miniProgram.appId
        getByAppIdInformation({appId}).then((res) => {
          console.log('ffff', res)
          commit('SET_APP_INFO', res.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
