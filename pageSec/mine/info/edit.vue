<template>
  <view class="container">
    <view class="input-item flex align-center">
      <input
        v-model="user.nickName"
        class="input inpuses"
        type="text"
        placeholder="真实姓名"
      />
    </view>
    <view
      class="bcbtns"
      @click="submits"
    >保存</view>
  </view>
</template>

<script>
import {
  getUserProfile
} from "@/api/system/user"
import {
  updateUserProfile
} from "@/api/system/user"

export default {
  data() {
    return {
      name: '',
      user: {
        nickName: "",
        phonenumber: "",
        email: "",
        sex: ""
      },
      sexs: [{
        text: '男',
        value: "0"
      }, {
        text: '女',
        value: "1"
      }],
      rules: {
        nickName: {
          rules: [{
            required: true,
            errorMessage: '用户昵称不能为空'
          }]
        },
        phonenumber: {
          rules: [{
            required: true,
            errorMessage: '手机号码不能为空'
          }, {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            errorMessage: '请输入正确的手机号码'
          }]
        },
        email: {
          rules: [{
            required: true,
            errorMessage: '邮箱地址不能为空'
          }, {
            format: 'email',
            errorMessage: '请输入正确的邮箱地址'
          }]
        }
      }
    }
  },
  onLoad() {
    this.getUser()
  },
  onReady() {
    // this.$refs.form.setRules(this.rules)
  },
  methods: {
    getUser() {
      getUserProfile().then(response => {
        this.user = response.data
      })
    },
    submit(ref) {
      this.$refs.form.validate().then(res => {
        updateUserProfile(this.user).then(response => {
          this.$modal.msgSuccess("修改成功")
        })
      })
    },
    submits() {
      console.log(this.user.nickName)
      uni.redirectTo({ url: '/pageSec/mine/info/index?name=' + this.user.nickName })
    },
  }
}
</script>

<style lang="scss">
.container {
  background-color: $uni-bg-color-cyan;
  padding: 32rpx 30rpx;
}

.input-item {
  background-color: #fff;
  height: 80rpx;
  border-radius: 20rpx;

  .inpuses {
    padding-left: 26rpx;
  }

  .input {
    font-size: 28rpx;
    line-height: 80rpx;
    text-align: left;
    color: $uni-text-color;
    font-weight: 400;
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
  margin-top: 484rpx;
}

.example {
  padding: 15px;
  background-color: #fff;
}

.segmented-control {
  margin-bottom: 15px;
}

.button-group {
  margin-top: 15px;
  display: flex;
  justify-content: space-around;
}

.form-item {
  display: flex;
  align-items: center;
  flex: 1;
}

.button {
  display: flex;
  align-items: center;
  height: 35px;
  line-height: 35px;
  margin-left: 10px;
}
</style>