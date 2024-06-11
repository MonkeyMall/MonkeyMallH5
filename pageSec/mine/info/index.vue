<template>
  <view class="container">
    <view class="conttse">
      <uni-list class="unilist">
        <uni-list-item title="真实姓名" :rightText="user.nickName"></uni-list-item>
        <uni-list-item title="性别" :rightText="user.sex"></uni-list-item>
        <uni-list-item title="手机号码" :rightText="user.phone" />
        <uni-list-item title="角色" :rightText="user.roleName" />
        <uni-list-item title="宿舍" :rightText="user.tenementNo" />
        <uni-list-item title="床位" :rightText="user.bedNo" />
        <uni-list-item title="座位" :rightText="user.seatNo" />
      </uni-list>
      <view class="list">

      </view>
    </view>
    <uni-popup ref="popup" type="center">
      <view class="popquits">
        <view class="titles">
          退出确认
        </view>
        <view class="conse">
          确认退出当前账号
        </view>
        <view class="btns">
          <text @click="quertse">取消</text>
          <text @click="quites" class="quses">确认</text>
        </view>
      </view>
    </uni-popup>

    <!-- 性别选择 -->
    <uv-picker ref="picker" cancelText="取消" confirmText="确认" keyName="label" :columns="columns" @confirm="confirm"
      class="picker">
    </uv-picker>
    <view class="bcbtns" @click="quit">退出账号</view>
  </view>
</template>

<script>
import uniList from "@/pageSec/components/uni-list/uni-list.vue"
import uniListItem from "@/pageSec/components/uni-list-item/uni-list-item.vue"
// import uniPopup from "@/pageSec/components/uni-popup/components/uni-popup/uni-popup.vue"
// import uvPicker from "@/pageSec/components/uv-picker/components/uv-picker/uv-picker.vue"
import { getUserProfile, getUserInfo } from "@/api/system/user"

export default {
  dicts: ['sys_user_sex'],
  components: {
    uniList,
    uniListItem,
    // uniPopup,
    // uvPicker
  },
  data() {
    return {
      user: {
        nickName: "请输入",
        sex: "请选择",
        phone: "18535051000",
        roleName: "学生",
        tenementNo: "登录之后自动匹配",
        bunk: "登录之后自动匹配",
        seatNo: "登录之后自动匹配",
      },
      columns: [],
      name: '',
    }
  },
  onLoad(options) {
    console.log(options.name)
    this.name = options.name ? options.name : ''
    this.getUserInfoFn()
    // this.getUser()
    this.columns.push(this.dict.type.sys_user_sex)
  },
  methods: {
    getUserInfoFn() {
      getUserInfo({
        flag: "1"
      }).then(res => {
        console.log(res)
        res.data.sex = res.data.sex === '0' ? '男' : res.data.sex === '1' ? '女' : '未知'
        this.user = res.data
        console.log(this.name)
        if (this.name === '' || this.name === undefined || this.name === null) {
          console.log('1')
          this.user.nickName = res.data.nickName
        } else {
          console.log('2')
          this.user.nickName = this.name
        }
      })
    },
    openPicker() {
      this.$refs.picker.open();
    },
    confirm(e) {
      console.log('confirm', e);
      this.user.sex = e.value[0].label
    },
    quit() {
      this.$refs.popup.open('center')
    },
    quertse() {
      this.$refs.popup.close()
    },
    quites() {
      this.$refs.popup.close()
      this.$store.dispatch('LogOut').then(() => {
        this.$tab.reLaunch('/pages/index')
      })
      uni.switchTab({
        url: '/pages/mine/index'
      })
    },
    getUser() {
      getUserProfile().then(response => {
        this.user = response.data
        this.roleGroup = response.roleGroup
        this.postGroup = response.postGroup
      })
    }
  }
}
</script>

<style lang="scss" scoped>
page {
  background-color: $uni-bg-color-cyan;
}

.conttse {
  margin: 32rpx 30rpx;
  border-radius: 16rpx;
  overflow: hidden;
}

/deep/ .uni-list--border-top {
  height: 0 !important;
}

/deep/ .uni-list--border-bottom {
  height: 0 !important;
}

/deep/ .uni-list-item {
  height: 100rpx !important;

  .uni-list-item__content-title {
    font-size: 28rpx !important;
    font-weight: 600 !important;
    color: rgba(51, 51, 51, 1) !important;
  }

  .uni-list-item__extra-text {
    font-size: 26rpx !important;
    font-weight: 600 !important;
    color: rgba(51, 51, 51, 1) !important;
  }
}

.unilist {

  .uni-list--border-top,
  .uni-list--border-bottom {
    height: 0 !important;
  }
}

.bcbtns {
  width: 690rpx;
  height: 80rpx;
  opacity: 1;
  border-radius: 16rpx;
  margin: 0 auto;
  background-color: $uni-color-primary;
  color: $uni-text-color-inverse;
  text-align: center;
  line-height: 80rpx;
  font-size: 32rpx;
  font-weight: 600;
  margin-top: 80rpx;
}

.popquits {
  width: 532rpx;
  height: 260rpx;
  border-radius: 16rpx;
  background: rgba(255, 255, 255, 1);
  padding-top: 42rpx;
  overflow: hidden;
  position: relative;

  .titles {
    font-size: 32rpx;
    font-weight: 600;
    line-height: 42rpx;
    color: rgba(51, 51, 51, 1);
    text-align: center;
  }

  .conse {
    font-size: 26rpx;
    font-weight: 600;
    letter-spacing: 0rpx;
    color: rgba(153, 153, 153, 1);
    text-align: center;
    height: 100rpx;
    line-height: 100rpx;
  }

  .btns {
    width: 100%;
    display: flex;
    border-radius: 16rpx;
    position: absolute;
    bottom: 0;
    left: 0;

    >text {
      height: 80rpx;
      line-height: 80rpx;
      width: 50%;
      text-align: center;
      font-size: 28rpx;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
    }

    >text:nth-child(2) {
      background-color: $uni-color-primary;
      border-radius: 16rpx 0rpx 16rpx 0rpx;
      color: $uni-text-color-inverse;
    }
  }
}
</style>