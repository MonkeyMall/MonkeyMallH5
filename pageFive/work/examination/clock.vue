<template>
  <view class="page clock">
    <view class="rclock-title">
      <view class="label">项目标题</view>
      <view class="input-item flex align-center">
        <input
          v-model="formData.name"
          :disabled="!saveFlag || !formData.endFlag"
          class="input inpuses"
          type="text"
          placeholder="请输入标题"
        />
      </view>
      <view class="label">考试时长</view>
      <view class="input-item flex align-center">
        <input
          v-model="formData.time"
          :disabled="!formData.endFlag"
          class="input inpuses"
          type="number"
          @input="input1"
          placeholder="考试时长上限为 999 分钟"
        />
      </view>
      <view class="input-item flex align-center">
        <view class="icon">第一次提醒 剩余：</view>
        <input
          v-model="formData.timea"
          :disabled="!formData.endFlag"
          class="input"
          type="number"
          @input="input2"
          placeholder="请输入剩余分钟数"
        />
      </view>
      <view class="input-item flex align-center">
        <view class="icon">第二次提醒 剩余：</view>
        <input
          v-model="formData.timeb"
          :disabled="!formData.endFlag"
          class="input"
          type="number"
          @input="input3"
          placeholder="请输入剩余分钟数"
        />
      </view>
      <view class="input-item flex align-center">
        <view class="icon">第三次提醒 剩余：</view>
        <input
          v-model="formData.timec"
          :disabled="!formData.endFlag"
          class="input"
          type="number"
          @input="input4"
          placeholder="请输入剩余分钟数"
        />
      </view>
      <view class="label">提醒铃声</view>
      <uni-section>
        <uni-data-select
          v-model="formData.value"
          :disabled="!formData.endFlag"
          :localdata="range"
          @change="change"
          :clear="false"
        ></uni-data-select>
      </uni-section>
    </view>
    <!-- <view class="bcbtns" @click="submit" v-if="!saveFlag || !examinationModeFlag">保存</view> -->

    <view
      class="bcbtns"
      @click="submit"
      v-if="!formData.endFlag || saveFlag"
    >保存</view>

    <view
      class="btns"
      v-else
    >
      <view
        class="deleteBtn1"
        @click="deleteClick"
      > 删除 </view>
      <view
        class="saveBtn1"
        @click="submit"
      > 保存 </view>
    </view>

    <!-- <uni-popup ref="popup" type="bottom">
			<view class="pops">
				<text> 确认删除吗？ </text>
				<view class="pop-btns">
					<view class="pop-btns-btn stop" @click="stopFn">结束</view>
					<view class="pop-btns-btn continue" @click="continueFn">继续计时</view>
				</view>
			</view>
		</uni-popup> -->
  </view>
</template>

<script>
import uniDataSelect from '@/pageFive/components/uni-data-select/components/uni-data-select/uni-data-select.vue'

export default {
  data() {
    return {
      formData: {
        name: '',
        time: '120',
        timea: '115',
        timeb: '90',
        timec: '11',
        SYTime: 0,
        value: 0,
        TodayNumber: 0, //	今日完成次数
        endFlag: true, //	是否完成
        endNumber: 0, //	总计完成考试次数
        endTime: 0, //	总计考试时长
        date: new Date().getDate(), // 日期
      },
      xiugaiFlag: null,
      range: [{
        value: 0,
        text: "震动"
      },
      {
        value: 1,
        text: "铃声"
      },
      {
        value: 2,
        text: "震动 + 铃声"
      }
      ],
      saveFlag: true, //	新增
      id: null, // 当前数据的唯一标识
      arr: [], //	本地存储中的数据
      examinationModeFlag: null,  //  考试是否结束标识
    };
  },
  components: { uniDataSelect },
  onLoad(options) {
    console.log(options)
    this.arr = uni.getStorageSync("examinationMode") ? JSON.parse(uni.getStorageSync("examinationMode")) : [];
    this.saveFlag = options.saveFlag == 1 ? true : false;
    this.id = options.id ? options.id : null;
    if (options.id) {
      // let arr = JSON.parse(uni.getStorageSync("examinationMode"))
      this.arr.forEach(item => {
        if (item.id == options.id)
          this.formData = item
      })
    }
    //  通过id标识 判断当前开始是否结束    和  this.list.endFlag 一样 但是更准确
    this.examinationModeFlag = uni.getStorageSync(`${this.formData.id}examinationModeFlag`) === true ? true : false;
  },

  methods: {
    //	正则校验
    input1(e) {
      this.$nextTick(() => {
        this.formData.time = e.target.value.replace(/^(0+)|[^\d]+/g, '')
        if (this.formData.time > 999) {
          uni.showToast({ 'title': "考试时长上限为 999 分钟,请重新输入", 'icon': 'none' })
          this.formData.time = 999
        }
      })
    },
    input2(e) {
      this.$nextTick(() => {
        this.formData.timea = e.target.value.replace(/^(0+)|[^\d]+/g, '')
        if (this.formData.timea * 1 > this.formData.time * 1) {
          uni.showToast({ 'title': "第一次提醒时间不能大于考试时长,请重新输入", 'icon': 'none' })
          this.formData.timea = ''
        }
      })
    },
    input3(e) {
      this.$nextTick(() => {
        this.formData.timeb = e.target.value.replace(/^(0+)|[^\d]+/g, '')
        if (this.formData.timeb * 1 > this.formData.timea * 1) {
          uni.showToast({ 'title': "第二次提醒时间不能大于第一次提醒时间,请重新输入", 'icon': 'none' })
          this.formDatb.timea = ''
        }
      })
    },
    input4(e) {
      this.$nextTick(() => {
        this.formData.timec = e.target.value.replace(/^(0+)|[^\d]+/g, '')
        if (this.formData.timec * 1 > this.formData.timeb * 1) {
          uni.showToast({ 'title': "第三次提醒时间不能大于第二次提醒时间,请重新输入", 'icon': 'none' })
          this.formDatc.timea = ''
        }
      })
    },
    //提交
    submit() {
      if (this.formData.name === "") {
        uni.showToast({ 'title': "请输入标标题", 'icon': 'none' })
      } else if (this.formData.time === "") {
        uni.showToast({ 'title': "请输入时间", 'icon': 'none' })
      } else if (this.formData.timea === "" || this.formData.timea * 1 >= this.formData.time * 1) {
        uni.showToast({ "title": "第一次提醒时间必须小于考试总时长", 'icon': 'none' })
        return;
      } else if (this.formData.timeb === "" || this.formData.timeb * 1 >= this.formData.timea * 1) {
        uni.showToast({ "title": "第二次提醒时间必须小于第一次", 'icon': 'none' })
        return;
      } else if (this.formData.timec === "" || this.formData.timec * 1 >= this.formData.timeb * 1) {
        uni.showToast({ "title": "第三次提醒时间必须小于第二次", 'icon': 'none' })
        return;
      } else {
        if (this.formData.SYTime) {
          console.log('还有剩余时间')
        } else {
          this.formData.SYTime = this.formData.time;
          this.formData.id = new Date().getTime();
          this.formData.shengyuValue = this.formData.time * 60
          this.formData.totalQuestion = 0;
          console.log("剩余时间为：", this.formData.SYTime)
        }
        this.$modal.loading("保存中，请耐心等待...")
        this.pwdLogin()
      }

    },
    //	删除
    async deleteClick() {
      var index = this.arr.findIndex(item => item.id == this.id)
      this.arr.splice(index, 1,)
      uni.setStorageSync("examinationMode", JSON.stringify(this.arr))
      uni.showToast({
        title: "删除成功"
      })
      setTimeout(() => {
        // this.$tab.redirectTo('/pageFive/work/examination/index')
        uni.navigateBack({
          delta: 1
        });
      }, 500)
      // this.$refs.popup.open()
    },
    // 保存
    async pwdLogin() {
      // let arr = uni.getStorageSync("examinationMode") ? JSON.parse(uni.getStorageSync("examinationMode")) : [];
      if (this.saveFlag && !this.id) { //	新增
        this.arr.push(this.formData)
        console.log('新增后的数据', this.arr)
      } else {
        let index = this.arr.findIndex(item => item.id == this.id)
        this.arr.splice(index, 1, this.formData)
      }
      uni.setStorageSync("examinationMode", JSON.stringify(this.arr))
      this.$modal.closeLoading()
      // this.$tab.redirectTo('/pageFive/work/examination/index')
      uni.navigateBack({
        delta: 1
      });

      // this.$store.dispatch('Login', this.loginForm).then(() => {
      // 	this.$modal.closeLoading()
      // 	this.loginSuccess()
      // }).catch(() => {
      // 	if (this.captchaEnabled) {
      // 		this.getCode()
      // 	}
      // })
    },
    change(e) {
      console.log("e:", e);
    },
  }
}
</script>
<style lang="scss" scoped>
.page {
  height: 100%;
  padding: 32rpx 30rpx;
  color: $uni-color-primary;
  background: $uni-text-color-inverse;
  min-height: 100vh;
}

.clock {
  position: relative;

  .label {
    font-size: 32rpx;
    color: $uni-text-color;
    font-weight: 600;
    padding-top: 32rpx;
    margin-bottom: 8rpx;
  }
}

.input-item {
  margin: 16rpx auto;
  background-color: $uni-bg-color-inpt;
  height: 80rpx;
  border-radius: 20rpx;

  .icon {
    width: 45%;
    padding-left: 26rpx;
    color: $uni-text-color-grey;
  }

  .inpuses {
    padding-left: 26rpx;
  }

  .input {
    width: 64%;
    font-size: 28rpx;
    line-height: 80rpx;
    text-align: left;
    color: $uni-text-color-grey;
    font-weight: 400;
    color: #333;
  }
}

/deep/ .uni-select {
  background-color: $uni-bg-color-inpt !important;
  border: none !important;
  height: 80rpx !important;
  border-radius: 16rpx !important;

  .uni-select__input-box {
    height: 80rpx !important;
    border-radius: 20rpx !important;
  }

  .uni-select__input-text {
    color: $uni-text-color-grey !important;
  }

  .uniui-bottom {
    color: $uni-text-color-blank !important;
  }

  .uniui-top {
    color: $uni-text-color-blank !important;
  }

  .uni-select__selector-item {
    color: $uni-text-color-blank !important;
  }
}

/deep/ .uni-section-header {
  padding: 7rpx !important;
}

.bcbtns {
  width: 690rpx;
  height: 80rpx;
  opacity: 1;
  border-radius: 16rpx;
  margin: auto 0;
  background-color: $uni-color-primary;
  color: $uni-text-color-inverse;
  text-align: center;
  line-height: 80rpx;
  font-size: 32rpx;
  font-weight: 600;
  margin-top: 80rpx;
}

.btns {
  width: 100%;
  height: 80rpx;
  display: flex;
  justify-content: space-between;

  > view {
    width: 330rpx;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    font-size: 32rpx;
    font-weight: 600;
    margin: 100rpx auto;
    border-radius: 16rpx;
  }

  .saveBtn1 {
    background: $uni-color-primary;
    color: #fff;
  }

  .deleteBtn1 {
    border: 1rpx solid $uni-color-primary;
    color: $uni-color-primary;
  }
}

.pops {
  height: 355rpx;
  color: $uni-color-primary;
  letter-spacing: 0;
  text-align: left;
  vertical-align: top;
  font-size: 28rpx;
  border-radius: 16rpx 16rpx 0px 0px;
  background: $uni-text-color-inverse;
  overflow: hidden;
  padding: 50rpx 30rpx 30rpx 30rpx;
  @include columnAlignCenter;

  text {
    margin-top: 24rpx;
    margin-bottom: 85rpx;
  }

  .pop-btns {
    width: 690rpx;
    @include flexBetween;

    .pop-btns-btn {
      width: 330rpx;
      line-height: 80rpx;
      text-align: center;
      border-radius: 8rpx;
      font-size: 32rpx;
      letter-spacing: 0;
      border: 2px solid $uni-color-primary;
    }

    .stop {
      background: $uni-text-color-inverse;
      color: $uni-color-primary;
    }

    .continue {
      color: $uni-text-color-inverse;
      background: $uni-color-primary;
    }
  }
}

/deep/ .uni-icons {
  margin-right: 16rpx;
}
</style>