<template>
  <view class="container">
    <view class="xialsesd" @click="openPicker">
      <view class="titles"> 反馈类型 </view>
      <view style="display: flex; color:rgba(153, 153, 153, 1);">
        <text class="xunzes" style="margin-right: 5px;">{{ typesof }} </text>
        <!-- <i class="iconfont" style="margin-left: 10rpx;">&#xe840;</i> -->
        <uv-icon name="arrow-right" color="rgba(51, 51, 51, 1.00)" size="14"></uv-icon>
      </view>
    </view>
    <view class="textareaBox">
      <uv-textarea v-model="feedbackDescribed" placeholder="请输入您的反馈意见，我们将不断改进~" count maxlength="400"></uv-textarea>
    </view>

    <view class="uplode" :class="pic && pic.length > 3 ? 'uplode1' : ''">
      <view class="ockskes">
        上传图片或录屏，可以帮助我们尽快定位问题并解决哦~
      </view>
      <UploadImages :count='count' v-on:getImageListFn="getImageList" ref="uploadSon">
      </UploadImages>
      <!-- <view class="xiangjis" @click="openSelectImage()">
        <image src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/myindex/icon-wode-xiangji.svg" mode=""></image>
      </view> -->
    </view>
    <view class="inputPhone">
      <uni-easyinput v-model="phone" type="number" placeholder="手机号(选填)"></uni-easyinput>
    </view>
    <view class="bcbtns" @click="quit">提交反馈</view>
    <uv-picker ref="picker" cancelText="取消" confirmText="确认" :columns="columns" keyName="label" @confirm="confirm"
      :closeOnClickOverlay="false">
    </uv-picker>
  </view>
</template>

<script>
import UploadImages from '@/pageFive/components/upload-images.vue'
import { splitImgMixins } from '@/mixins/index.js'
import { getUserProfile, addFeedback } from "@/api/system/user"
import uniEasyinput from "@/pageFive/components/uni-easyinput/components/uni-easyinput/uni-easyinput.vue"
import uvTextarea from "@/pageFive/components/uv-textarea/components/uv-textarea/uv-textarea.vue"
// import uvPicker from "@/pageSec/components/uv-picker/components/uv-picker/uv-picker.vue"


export default {
  components: {
    UploadImages,
    uniEasyinput,
    uvTextarea,
    // uvPicker
  },
  mixins: [splitImgMixins],
  dicts: ['feedback_question_type'],
  data() {
    return {
      typesof: '请选择反馈类型',
      // show: false,
      count: 5, // 单次可选择的图片数量
      value: "",
      feedbackDescribed: '',
      index: 0,
      changindex: 0,
      columns: [],
      pic: '',
      phone: '',
      feedbackType: ''
    }
  },
  onLoad() {
    // this.getUser()
    this.columns.push(this.dict.type.feedback_question_type)
    console.log('this.dict.type.feedback_question_type: ', this.dict.type.feedback_question_type);
  },
  onShow() {
    this.$refs.picker.setIndexs([this.index], true)
  },
  methods: {
    quit() {
      if (this.typesof == '请选择反馈类型') {
        uni.showToast({
          title: '请选择反馈类型',
          icon: 'none'
        })
        return false
      } else if (this.feedbackDescribed.length < 1) {
        console.log('123');
        uni.showToast({
          title: '请输入反馈信息',
          icon: 'none'
        })
        return false
      } else if (this.pic === '') {
        uni.showToast({
          title: '请上传图片',
          icon: 'none'
        })
        return false
      }
      const reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (this.phone.length > 0 && !reg_tel.test(this.phone)) {
        uni.showToast({
          title: '请输入正确的手机号',
          icon: 'none'
        })
        return false
      }
      // this.pic ? this.resetPic(this.pic) : undefined;
      this.pic = this.resetPic(this.pic)
      // for (let i = 0; i < this.pic.length; i++) {
      //   console.log('前', this.pic);
      //   this.resetPic(this.pic[i])
      //   console.log('后', this.pic);
      // }
      this.pic = this.pic.join(',')
      let params = {
        feedbackType: this.feedbackType,
        feedbackDescribed: this.feedbackDescribed,
        pic: this.pic,
        phone: this.phone,
        userId: 1
      }
      console.log(params);
      addFeedback(params).then(res => {
        console.log(res);
        uni.showToast({
          title: "提交成功",
          icon: 'none',
        })
        setTimeout(() => {
          uni.switchTab({ url: '/pages/mine/index' })
        }, 800)
      })

    },
    getUser() {
      getUserProfile().then(response => {
        this.user = response.data
        this.roleGroup = response.roleGroup
        this.postGroup = response.postGroup
      })
    },
    openPicker() {
      this.$refs.picker.open();
    },

    confirm(e) {
      console.log(e)
      this.$refs.picker.close();
      this.show = false
      this.typesof = e.value[0].label
      this.feedbackType = e.value[0].value
      if (this.index != this.changindex) {
        this.index = this.changindex
      }
    },
    openSelectImage() {
      let tempList = []
      uni.chooseImage({
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          console.log(res)
        },
        fail: (err) => {
          console.log("err: ------", err);
        }
      })
    },
    handechanshe(e) {
      this.changindex = e.index
    },
    // 接受图片
    getImageList(data) {
      console.log('接受图片', data)
      this.pic = data
    },
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 30rpx;
  background-color: $uni-bg-color-cyan; // $uni-bg-color-cyan
}

.textareaBox,
.inputPhone {
  border-radius: 16rpx;
  overflow: hidden;
}

.xialsesd {
  background-color: white;
  width: 100%;
  height: 80rpx;
  border-radius: 16rpx;
  background: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: space-between;
  line-height: 80rpx;
  padding: 0 12rpx;
  margin-bottom: 32rpx;

  .titles {
    font-size: 28rpx;
    font-weight: 600;
    letter-spacing: 0px;
    color: rgba(51, 51, 51, 1);
  }

  .xunzes {
    display: block;
    font-size: 24rpx;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    padding-bottom: 10rpx;
  }
}

/deep/ .uni-easyinput {
  padding: 0rpx !important;
}

/deep/ .uv-textarea {
  padding: 32rpx 16rpx !important;
  border: none !important;
}

/deep/ .uv-textarea__field {
  height: 370rpx !important;
  // font-size: 24rpx;
  font-weight: 600 !important;
  color: rgba(51, 51, 51, 1) !important;
}

/deep/ .textarea-placeholder {
  // font-size: 24rpx;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}

/deep/.uv-textarea__count {
  font-size: 24rpx !important;
  font-weight: 600 !important;
  line-height: 33.6px !important;
  color: rgba(51, 51, 51, 1) !important;
}

/deep/ .uv-toolbar__wrapper__cancel {
  color: $uni-color-primary !important;
}

/deep/ .uv-toolbar__wrapper__confirm {
  color: $uni-color-primary !important;
}

/deep/ .uv-picker__view__column__item {
  color: $uni-color-primary !important;
  font-size: 32rpx !important;
}

/deep/ .uv-picker__view__column__item {
  color: $uni-color-primary !important;
  font-size: 32rpx !important;
}

.uplode1 {
  height: 460rpx !important;
}

.uplode {
  background-color: white;
  width: 100%;
  height: 275rpx;
  border-radius: 16rpx;
  margin: 32rpx 0;
  padding: 32rpx 16rpx;

  .ockskes {
    font-size: 24rpx;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    margin-bottom: 32rpx;
  }

  .xiangjis {
    width: 150rpx;
    height: 150rpx;
    border-radius: 8px;
    border: 2px dashed rgba(153, 153, 153, 1);
    display: flex;
    align-items: center;
    justify-content: center;

    image {
      display: block;
      width: 44rpx;
      height: 44rpx;
    }
  }
}

/deep/.uni-easyinput__content {
  height: 80rpx !important;
  border-radius: 16rpx !important;
  background: rgba(255, 255, 255, 1) !important;
  border: none !important;
}

/deep/ .uni-easyinput__content-input {
  font-size: 28rpx !important;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
}

/deep/ .uni-easyinput__placeholder-class {
  font-size: 28rpx !important;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
}

/deep/ .content-clear-icon {
  display: none !important;
}

.bcbtns {
  width: 100%;
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

.quxqrs {
  height: 80rpx;
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0 30rpx;
  position: fixed;
  bottom: 70rpx;
  left: 0;
  z-index: 999999;
  margin: 0 auto;

  view {
    text-align: center;
    line-height: 80rpx;
    width: 330rpx;
    border-radius: 8rpx;
    background-color: $uni-color-primary;
    font-size: 32rpx;
    font-weight: 600;
    letter-spacing: 0px;
    color: white;
  }

  .quss {
    background-color: white;
    border: 1px solid $uni-color-primary;
    color: rgba(252, 81, 95, 1);
  }
}
</style>