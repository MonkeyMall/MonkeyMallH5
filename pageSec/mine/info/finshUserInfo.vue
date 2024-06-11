<template>
  <view class="container">
    <view class="conttse">
      <!-- <uni-list>
        <template v-for="(item, index) in json">
          <view class="inp" v-if="item.type === 'input'" :title="item.label">
            <view>{{ item.label }}</view>
            <input type="text" :placeholder="item.label" v-model="user[item.modal]">
          </view>
          <block class="inp" v-else-if="item.type === 'select'">
            <uni-list-item :title="item.label" :rightText="user[item.modal]" link
              @click="openPicker(item.modal, item.type)"></uni-list-item>
          </block>
          <block class="inp" v-else="item.type === 'date'">
            <uni-list-item :title="item.label" :rightText="user[item.modal]" link
              @click="openPicker(item.modal, item.type)"></uni-list-item>
          </block>
        </template>
</uni-list> -->
      <view v-for="(item, index) in json" :key="index">
        <view class="inp" v-if="item.type == 'input'" :title="item.label">
          <view>{{ item.label }}</view>
          <input type="text" :placeholder="'请输入' + item.label" v-model="user[item.modal]">
        </view>
        <view class="inp" v-else-if="item.type == 'select'" :title="item.label" :rightText="user[item.modal]" link
          @click="openPicker(item.modal, item.type)">
          <view>{{ item.label }}</view>
          <!-- <view class="inp" v-else-if="item.type == 'selectRadio'" :title="item.label" :rightText="user[item.modal]" link
          @click="openPicker(item.modal, item.type)">
          <view>{{ item.label }}</view>
          <view class="inp" v-else-if="item.type == 'selectMulti'" :title="item.label" :rightText="user[item.modal]" link
          @click="openPicker(item.modal, item.type)">
          <view>{{ item.label }}</view> -->
          <input class="input" :placeholder="'请选择' + item.label" :value="user[item.modal]" disabled />
        </view>
        <view class="inp" v-else-if="item.type == 'date'" :title="item.label" :rightText="user[item.modal]" link
          @click="openPicker(item.modal, item.type)">
          <view>{{ item.label }}</view>
          <input class="input" :placeholder="'请选择' + item.label" :value="user[item.modal]" disabled />
        </view>
      </view>
    </view>
    <uv-picker ref="picker" cancelText="取消" confirmText="确认" keyName="label" :columns="columns" @confirm="confirm"
      :closeOnClickOverlay="false">
    </uv-picker>
    <!-- <uv-datetime-picker ref="datetimePicker" v-model="value" mode="datetime" :formatter="formatter" :minDate="time1"
      :maxDate="time2" @confirm="confirm1"></uv-datetime-picker> -->

    <uv-datetime-picker v-if="modalFlag" ref="datetimePicker" v-model="value" mode="date" :minDate="time3"
      :maxDate="time1" @confirm="confirm1"></uv-datetime-picker>

    <uv-datetime-picker v-else ref="datetimePicker" v-model="value" mode="date" :minDate="time1" :maxDate="time2"
      @confirm="confirm1"></uv-datetime-picker>
    <!-- <uni-datetime-picker type="datetimePicker" v-model="value" :start="time1" @change="changeLog" /> -->

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
    <view class="bcbtns" @click="quit">提交</view>

    <!-- <uni-datetime-picker ref="date" :value="dateRange" type="datetimerange" return-type="timestamp"
            this.$refs.datetimePicker.setFormatter(this.formatter)
            @change="datetimechange" @maskClick="timepickerclose"></uni-datetime-picker> -->
  </view>
</template>

<script>
// import uniPopup from "@/pageSec/components/uni-popup/components/uni-popup/uni-popup.vue"
// import uvPicker from "@/pageSec/components/uv-picker/components/uv-picker/uv-picker.vue"
// import uvDatetimePicker from "@/pageSec/components/uv-datetime-picker/components/uv-datetime-picker/uv-datetime-picker.vue"
import { getUserProfile, getChannel, submitForm } from "@/api/system/user"
import { getNowDate } from '@/utils/common'
import { getUserId, getTenantId } from '@/utils/auth'
export default {
  components: {
    // uvPicker,
    // uvDatetimePicker,
    // uniPopup
  },
  data() {
    return {
      nowData: '',
      columns: [],
      time1: new Date().getTime(),
      time2: new Date('2100').getTime(),
      time3: new Date('1980').getTime(),
      dateRange: [],
      user: {},
      json: [],
      timer: null,
      modalFlag: false,
      value: 1009843200000,
    }
  },
  dicts: ['sys_dormitory_type', 'sys_user_sex'],
  onLoad() {
    // this.getUser()
    this.getChannelList()
  },
  onShow() {
    this.nowData = getNowDate()
  },
  onunload() {
    clearTimeout(this.timer)
  },
  methods: {
    timepickerclose(e) {
      this.closePopup()
    },
    async getChannelList() {
      await getChannel({ tenantId: getTenantId(), userId: getUserId() }).then(res => {
        this.json = res.data
        this.json.forEach(item => {
          this.$set(this.user, item.modal, item.value)
          // this.user[item.modal] = item.value
        })
      })
    },

    formatDateTime(time) {
      var date = new Date(time);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? ('0' + minute) : minute;
      second = second < 10 ? ('0' + second) : second;

      // return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
      return y + '-' + m + '-' + d
    },

    quit() {
      console.log(this.json);

      this.json.forEach(item => {
        console.log(this.user.name);
        // debugger
        if (item.modal === 'name' && (this.user.name === null || this.user.name === undefined || this.name === '')) {
          uni.showToast({
            title: '请输入姓名',
            icon: 'none',
          });
          throw Error()
          // return false
        } else if (item.modal === 'sex' && (this.user.sex === null || this.user.sex === undefined || this.user.sex === '')) {
          uni.showToast({
            title: '请选择性别',
            icon: 'none',
          });
          throw Error()
          // return false
        } else if (item.modal === 'roomType' && (this.user.roomType === null || this.user.roomType === undefined || this.user.roomType === '')) {
          uni.showToast({
            title: '请输入宿舍类型',
            icon: 'none',
          });
          throw Error()
          // return false
        } else if (item.modal === 'majorType' && (this.user.majorType === null || this.user.majorType === undefined || this.user.majorType === '')) {
          uni.showToast({
            title: '请输入报考专业',
            icon: 'none',
          });
          throw Error()
          // return false
        } else if (item.modal === 'school' && (this.user.school === null || this.user.school === undefined || this.user.school === '')) {
          uni.showToast({
            title: '请输入毕业院校',
            icon: 'none',
          });
          throw Error()
          // return false
        } else if (item.modal === 'birthday' && (this.user.birthday === null || this.user.birthday === undefined || this.user.birthday === '')) {
          uni.showToast({
            title: '请选择生日日期',
            icon: 'none',
          });
          throw Error()
          // return false
        } else if (item.modal === "entryTime" || item.modal === "departureTime") {
          if (this.user.entryTime && this.user.entryTime.length > 0) {
            if (this.user.departureTime && this.user.departureTime.length > 0) {
              let a1 = new Date(this.user.entryTime).getTime()
              let a2 = new Date(this.user.departureTime).getTime()
              console.log(a1);
              console.log(a2);
              console.log(a1 >= a2);
              if (a1 >= a2) {
                uni.showToast({
                  title: '入营时间必须提前于离营时间',
                  icon: 'none',
                });
                throw Error()
                // return false
              }
            } else {
              uni.showToast({
                title: '请选择离营时间',
                icon: 'none',
              });
              throw Error()
              // return false
            }
          } else {
            uni.showToast({
              title: '请选择入营时间',
              icon: 'none',
            });
            throw Error()
            // return
          }
        }
      })

      this.user.userId = getUserId()
      submitForm(this.user).then(res => {
        console.log(res);
        uni.showToast({
          title: '提交成功',
          icon: 'none',
        })
        this.timer = setTimeout(() => {
          // uni.navigateBack(1)
          this.$tab.redirectTo('/pageSec/mine/orderlist/index')
        }, 1000)
      })
    },


    openPicker(modal, type) {
      this.modal = modal;
      if (type === 'select') {
        console.log(modal, type);
        this.columns = []
        if (modal === 'roomType') {
          this.columns.push(this.dict.type.sys_dormitory_type)
          console.log(this.columns);
        } else if (modal === 'sex') {
          this.columns.push(this.dict.type.sys_user_sex)
          console.log(this.columns);
        }
        this.$refs.picker.open();
      } else if (type === 'date') {
        if (modal === 'birthday') {
          this.modalFlag = true
        } else {
          this.modalFlag = false
        }
        this.$nextTick(() => {
          this.$refs.datetimePicker.open();
        })
      }
    },
    confirm(e) {
      console.log('confirm', this.user, this.modal, e.value[0]);
      // this.user[this.modal] = e.value[0];
      this.$set(this.user, this.modal, e.value[0].label)
    },
    confirm1(e) {
      console.log(e);
      this.$set(this.user, this.modal, this.formatDateTime(e.value))
      console.log(this.user);
    },
    quertse() {
      this.$refs.popup.close()
    },
    quites() {
      this.$refs.popup.close()
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

.inp {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100rpx;
  padding: 24rpx 0 24rpx 28rpx;
  font-weight: 600;
  font-size: 28rpx !important;
  font-weight: 600 !important;
  color: #333333 !important;
  border-bottom: 1rpx solid rgba(242, 242, 242, 0.7);
  border-top: 1rpx solid rgba(242, 242, 242, 0.7);

  >view {
    width: 45%;
    text-align: start;
  }

  >input {
    margin-right: 36rpx;
    font-size: 26rpx !important;
    text-align: right;
  }

  .input {
    text-align: right;
    margin-right: 36rpx;
    font-size: 26rpx !important;
  }
}

.conttse {
  margin: 32rpx 30rpx;
  border-radius: 30rpx;
  overflow: hidden;
  background-color: #fff;
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
  height: 257rpx;
  border-radius: 16rpx;
  background: rgba(255, 255, 255, 1);
  padding-top: 40rpx;

  .titles {
    font-size: 32rpx;
    font-weight: 600;
    line-height: 44.8rpx;
    color: rgba(51, 51, 51, 1);
    text-align: center;
  }

  .conse {
    font-size: 26rpx;
    font-weight: 600;
    letter-spacing: 0rpx;
    line-height: 33.6rpx;
    color: rgba(153, 153, 153, 1);
    text-align: center;
    margin-top: 24rpx;
    margin-bottom: 40rpx;
  }

  .btns {
    width: 100%;
    display: flex;
    border-radius: 16rpx;

    text {
      display: block;
      height: 80rpx;
      line-height: 80rpx;
      width: 50%;
      text-align: center;
      font-size: 28rpx;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      border-radius: 16rpx;
    }

    .quses {
      background-color: $uni-color-primary;
      border-radius: 16rpx 0rpx 16rpx 0rpx;
      color: $uni-text-color-inverse;
    }
  }
}

/deep/ .uni-list-item {
  position: static !important;
  border-bottom: 1rpx solid rgba(242, 242, 242, 0.7);
}

/deep/ .uni-list {
  position: static !important;
}
</style>