<template>
  <view class="container">
    <view class="xialsesd">
      <view class="titles">
        <i class="iconfont">&#xe643;</i>
        错误类型
      </view>
      <view class="wrong-boxs">
        <view
          class="uv-page__tag-item"
          v-for="(item, index) in checkboxs"
          :key="index"
        >
          <view
            :class="item.checked ?'hasCheckBox':'noCheckBox'"
            @click="checkboxClick(index)"
          >{{ item.label }}</view>
        </view>
      </view>
    </view>
    <view class="xialsesd remarkBox">
      <view class="titles">
        <i class="iconfont">&#xe643;</i>
        本题错误详情或建议
      </view>
    </view>
    <uv-textarea
     
      v-model="form.remark"
      height="255rpx"
      border="none"
      placeholder="请输入您的反馈意见，我们将不断改进~"
      count
      maxlength="500"
    ></uv-textarea>

    <view class="iptBox">
      <uni-easyinput
      type="number"
        v-model="form.phone"
        placeholder="手机号码（选填）"
      ></uni-easyinput>
    </view>
    <view
      class="bcbtns"
      @click="quit"
    >提交反馈</view>
  </view>
</template>
  
  <script>
import uniEasyinput from "@/pageSec/components/uni-easyinput/components/uni-easyinput/uni-easyinput.vue"

import uvTextarea from "@/pageSec/components/uv-textarea/components/uv-textarea/uv-textarea.vue"
import { ideaFn } from '@/api/work/english'
export default {
  dicts: ['business_wrong_type'],
  components: {
    uniEasyinput,
    uvTextarea
  },
  data() {
    return {
      questionid: '',
      checkboxs: [],
      // show: false,
      count: 3, // 单次可选择的图片数量
      value: "",
      index: 2,
      changindex: 0,
      columns: [
        ['页面BUG', '产品体验', '产品功能', '其他问题']
      ],
      form: {
        remark: '',
        phone: ''
      }
    }
  },
  mounted() {
    this.getData()
  },
  onLoad(options) {
    this.questionid = options.questionid

  },
  methods: {
    getData() {
      this.checkboxs = this.dict.type.business_wrong_type
      setTimeout(() => {

        this.checkboxs.forEach(item => {
          this.$set(item, 'checked', false)
          item.checked = false

        })
      }, 100)

    },
    // 错误类型选择
    checkboxClick(item) {
      console.log(item)
      console.log(this.dict.type.business_wrong_type, this.dict.type.business_wrong_type[item])
      this.dict.type.business_wrong_type[item].checked = !this.dict.type.business_wrong_type[item].checked
    },
    quit() {
      console.log(this.form)
      let errortype = []
      this.checkboxs.forEach(item => {
        if (item.checked) {
          errortype.push(item.value)
        }
      })
      if (!this.form.remark) {
        uni.showToast({
          title: "请填写反馈内容",
          icon: 'none',
        })
        return
      }
      if (errortype.length === 0) {
        uni.showToast({
          title: "请选择错误类型",
          icon: 'none',
        })
        return
      }
      ideaFn({
        questionid: this.questionid,
        errortype: errortype.join(','),
        advise: this.form.remark,
        phone: this.form.phone
      }).then(res => {
        if (res.code === 200) {
          uni.showToast({
            title: "纠错成功",
            icon: 'none',
          })
          setTimeout(() => {
            this.$tab.navigateBack(1)
          },1000)
          
        }
      })
    },
  }
}
  </script>
  
  <style lang="scss" scoped>
.container {
  padding: 30rpx;
  background-color: $uni-bg-color-cyan;
  .xialsesd {
    background-color: white;
    width: 100%;
    height: 280rpx;
    background: rgba(255, 255, 255, 1);
    line-height: 80rpx;
    padding: 0 12rpx;
    margin-bottom: 32rpx;
    border-radius: 16rpx;
    .titles {
      width: 100%;
      height: 108rpx;
      line-height: 108rpx;
      display: flex;
      font-size: 28rpx;
      font-weight: 600;
      letter-spacing: 0px;
      color: rgba(51, 51, 51, 1);
    }

    .xunzes {
      display: block;
      font-size: 26rpx;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      padding-bottom: 10rpx;
    }
    .iconfont {
      font-size: 70rpx;
      font-weight: 400;
      margin-right: -12rpx;
      color: $uni-text-color-placeholder;
    }
    //    .uv-page__tag-item{
    //     width: 160rpx;
    //     height: 56rpx;
    //     border-radius: 224rpx;
    //     // background: $uni-text-color-placeholder;
    //    }
    .wrong-boxs {
      display: flex;
      margin: 0 16rpx;
      flex-wrap: wrap;
      .hasCheckBox {
        width: 160rpx;
        height: 56rpx;
        line-height: 56rpx;
        text-align: center;
        font-size: 26rpx;
        font-weight: 400;
        color: $uni-text-color-inverse;
        border-radius: 224rpx;
        margin-right: 32rpx;
        margin-bottom: 28rpx;
        background: $uni-color-primary;
      }
      .noCheckBox {
        width: 160rpx;
        height: 56rpx;
        line-height: 56rpx;
        text-align: center;
        font-size: 26rpx;
        font-weight: 400;
        color: $uni-text-color-placeholder;
        border-radius: 224rpx;
        margin-right: 32rpx;
        margin-bottom: 28rpx;
        background: $uni-color-english-pickerColor;
      }
    }
  }
  .remarkBox {
    height: 108rpx;
    border-top-left-radius: 16rpx;
    border-top-right-radius: 16rpx;
    margin-bottom: 0;
  }
  .iptBox {
    margin-top: 32rpx;
    width: 100%;
    // width: 690rpx;
    // height: 80rpx;
    // opacity: 1;
    // border-radius: 16rpx;
    // box-shadow: 1rpx -1rpx 14rpx 3rpx $uni-text-color-grey;
    // background: $uni-text-color-inverse;
  }
}

/deep/ .uv-textarea {
  padding: 32rpx 16rpx !important;
  border: none !important;
  border-bottom-right-radius: 16rpx !important;
  border-bottom-left-radius: 16rpx !important;
}

/deep/ .uv-textarea__field {
  height: 205rpx !important;
  font-size: 26rpx;
  font-weight: 600 !important;
  color: rgba(51, 51, 51, 1) !important;
}

/deep/ .textarea-placeholder {
  font-size: 26rpx;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
/deep/ .uv-textarea.data-v-5850f8d2 {
  border-bottom-left-radius: 16rpx;
  border-bottom-right-radius: 16rpx;
}
/deep/.uv-textarea__count {
  font-size: 26rpx !important;
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
.uplode {
  background-color: white;
  width: 100%;
  height: 275rpx;
  border-radius: 16px;
  margin: 32rpx 0;
  padding: 32rpx 16rpx;

  .ockskes {
    font-size: 26rpx;
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
/deep/ .uni-easyinput {
  padding: 0 !important;
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