<template>
  <view class="container">
    <view class="conttse">
      <view class="inp list-cell list-cell-arrow">
        <view class="label-name">分类</view>
        <view @click="$refs.picker.open();">
          {{ loginForm.categoryName || '请选择分类'}}
        </view>
      </view>
      <view class="inp">
        <view class="label-name">标题</view>
        <view class="inp-right">
          <uv-input placeholder="请输入标题" border="surround" v-model="loginForm.title" @change="change"></uv-input>
        </view>
      </view>
      <view class="inp" :title="item.label">
        <view class="label-name">内容</view>
        <view class="inp-right textarea">
          <uv-textarea v-model="loginForm.contents" height="100" count placeholder="请输入内容" maxlength="100"></uv-textarea>
        </view>
      </view>
    </view>
    <view class="bcbtns" @click="submitFn">发 布</view>
    <uv-picker 
      ref="picker" 
      :columns="category" 
      keyName="label"
      @confirm="confirm"
      :closeOnClickOverlay="false"
    ></uv-picker>
  </view>
</template>

<script>
import {
  addRidicule
} from '@/api/guoguo.js'
export default {
  data() {
    return {
      loginForm: {
        category: '',
        categoryName: '',
        title: '',
        contents: ''
      },
      category: [[{
        label: '心灵鸡汤',
        value: 1
      }, {
        label: '生活感悟',
        value: 2
      }, {
        label: '工作调侃',
        value: 3
      }]]
    }
  },
  onLoad() {
   
  },
  onShow() {
  },
  onunload() {
  },
  methods: {
    async submitFn() {
      const data = await addRidicule(this.loginForm)
      console.log(data)
      if (data.code === 200) {
        uni.showToast({
          title: '发布成功',
          icon: 'none'
        })
        setTimeout(() => {
          uni.navigateTo({
            url: '/pages/ridicule/index'
          })
        }, 600)
      }
    },
    confirm(e) {
      console.log('confirm', e.value[0].value);
      this.loginForm.category = e.value[0].value
      this.loginForm.categoryName = e.value[0].label
    },
    change(e) {
      console.log('change', e);
      // this.loginForm.title = 
    }
  }
}
</script>

<style lang="scss" scoped>
page {
  background-color: $uni-bg-color-cyan;
}
::v-deep .uv-border {
  border-color: #eee !important;
}
.container {
  padding: 30rpx;
  .conttse {
    padding: 20rpx;
    background: #fff;
    border-radius: 20rpx;
    margin-bottom: 30rpx;
    .inp {
      font-size: 28rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20rpx 0;
      padding: 20rpx 30rpx;
      &:not(:last-child) {
        border-bottom: 1rpx solid #eee;
      }
      .label-name {
        width: 100rpx;
        font-weight: bold;
      }
      .inp-right {
        flex: 1;
        text-align: right;
        &.textarea {
          text-align: left;
        }
      }
    }
  }
}
.bcbtns {
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  border-radius: 80rpx;
  text-align: center;
  background-color: $uni-color-fz;
  font-size: 34rpx;
  color: #fff;
}
</style>