<!-- 单词详情 -->
<template>
  <view class="wrap">
    <view>
      {{ wordObj.wordName }}
    </view>
    <view>
      {{ wordObj.wordSoundMark }}
    </view>
    <uv-parse :content="content"></uv-parse>
    <!-- 上一题/下一题按钮 -->
    <view class="question-btns">
      <view
        class="question-btn-item next"
        @click="clickBtnFn('next')"
      >下一个</view>
    </view>
  </view>
</template>
<script>
import {getNextWordForNote} from '@/api/work/english'
export default {
  data() {
    return {
      content: '',
      type:'', // 1已学习  2高频词
      questionId:'',
      wordName:'',
      wordObj:{}
    }
  },
  onLoad(options){
    console.log('options: ', options);
    this.type = options.type
    this.questionId = options.questionId
    this.clickBtnFn()
  },
  methods: {
    clickBtnFn(type) {
      console.log('走这里了吗')
      let obj = {
        type:this.type,
        questionId:this.questionId,
        
      }
      if(type === 'next'){
        obj.pageType = 1
      }
      console.log(obj)
      getNextWordForNote({
        ...obj
      }).then(res => {
        if(res.code === 200){
          if(res.data){
            this.wordObj = res.data
            this.content = res.data.wordMean
            this.questionId = res.data.id
          }else{
            uni.showToast({
              title: "没有题了",
              icon: 'none',
            })
            setTimeout(() => {
              uni.navigateBack(1)
            },500)
          }
          console.log('res: ', res);
          
        }
      })
    }
  },
}
</script>
<style scoped lang="scss">
.wrap {
  padding: 32rpx 46rpx;
  min-height: 100vh;
  background: $uni-bg-color;
  .question-btns {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 32rpx;
    font-weight: 600;
    position: fixed;
    bottom: 30px;
    left: 0;
    padding: 0 32rpx;
    .question-btn-item {
      width: 330rpx;
      line-height: 80rpx;
      border-radius: 8rpx;
      text-align: center;
    }
    .next {
      color: $uni-color-primary-fz;
      background: $uni-color-primary;
      border: 2px solid $uni-color-primary;
      margin: auto;
    }
  }
}
</style>