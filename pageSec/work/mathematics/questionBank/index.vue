<template>
  <view class="page">
    <view class="list">
      <view
        class="li newUIBox"
        v-for="(item, index) in list"
        :key='index'
        :style="{ background:colors[index % 4] }"
      >
        <view class="liTop"> 
          <i :style="{ background:borderColors[index % 4] }"></i>
          {{ item.course_outline_name }} </view>
        <view class="BtnList">
          <view
            class="BtnLi"
            v-for="(item1,ind) in item.childList"
            :key="ind"
            @click="goSection(item1)"
          >
          <i class="iconfont">&#xe641;</i> 
          {{ item1.course_outline_name }} </view>
        </view>
        <view class="newUI-pic">
          <image v-if="index % 4 == 0" class="image1" src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/ms-01.png"></image>
          <image v-if="index % 4 == 1" class="image2" src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/ms-02.png"></image>
          <image v-if="index % 4 == 2" class="image3" src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/ms-03.png"></image>
          <image v-if="index % 4 == 3" class="image4" src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/ms-04.png"></image>
        </view>
      </view>
    </view>
    <view class="nullBox"></view>
  </view>
</template>

<script>
import { selectLevelOneList } from '@/api/work/english.js'
export default {
  data() {
    return {
      obj: {
        courseOutlineType: 0, // 0 政治 1 外语 2数学
        affiliationmodule: 0, //  0名师题库   1精选题库  2真题题库 3每日题库 4历年真题 5真题考点
      },
      list: [],
      level: '',
      colors:["url('https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/ms-01-bg.png')",'#FDF2F1','#E9F9F1','#EBF6FA'],
      borderColors:['#FFEB3B','#FF66A6','#60E0A0','#59BDF0',],
    }
  },
  onLoad(options) {
    console.log('options: ', options);
    this.obj.courseOutlineType = options.courseOutlineType
    this.obj.affiliationmodule = options.affiliationmodule
    this.level = options.level
    this.getList()
  },
  created() {

  },
  computed: {
    setStyle(val){
      console.log('val: ', val);

    }
  },
  methods: {
    goSection(item) {
      this.$tab.navigateTo('/pageSec/work/exercise/section/index?affiliationmodule=0&courseid=' + item.course_id + '&level=' + this.level)
    },
    // 获取列表数据
    async getList() {
      const { rows } = await selectLevelOneList(this.obj)
      console.log('接口数据', rows)
      this.list = rows
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  padding: 32rpx 30rpx 0 30rpx;
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  border-radius: 20rpx;
  background: #fff;
  // background: url('../../../../static/images/ms-01-bg.png');
}
.newUIBox{
  position: relative;
  padding: 32rpx 30rpx;
  // background-size: cover !important;
  border-radius: 16rpx;
  background-repeat: no-repeat !important;
  background-position: center !important;
}
.li {
  width: 100%;
  margin-bottom: 20rpx;
  overflow: hidden;
  .liTop {
    position: relative;
    z-index: 999999;
    font-size: 32rpx;
    height: 50rpx;
    line-height: 60rpx;
    font-weight: 600;
    display: flex;
    align-items: center;
    margin-left: -27rpx;
    image{
      width: 100%;
      background-size: cover;
    }
    i{
      width: 9rpx;
      height: 42rpx;
      opacity: 1;
      margin-right: 16rpx;
      border-radius: 32rpx;
    }
  }

  .BtnList {
    position: relative;
    z-index: 999999;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .BtnLi {
      width: 306rpx;
      height: 80rpx;
      opacity: 1;
      font-size: 28rpx;
      border-radius: 16rpx;
      background: #FFFFFF;
      text-align: center;
      font-weight: 400;
      line-height: 80rpx;
      margin-top: 32rpx;
      @include overline(1);
      &:active {
        color: $uni-color-primary;
        border: 1rpx solid $uni-color-primary;
      }
      // width: 45%;
      // height: 64rpx;
      // line-height: 64rpx;
      // font-size: 28rpx;
      // font-weight: 400;
      // border: 2rpx solid rgba(214, 214, 214, 0.4);
      // border-radius: 32rpx;
      // text-align: center;
      // margin-top: 32rpx;
      // &:active {
      //   color: $uni-color-primary;
      // }
    }
  }
}
.nullBox{
  width: 100%;
  height: 20rpx;
}
.image1{
  position: absolute;
  top: -80rpx;
  right: -40rpx;
  width: 218rpx;
  height: 218rpx;
  opacity: 0.9;
}
.image2{
  width: 283rpx;
  height: 283rpx;
  position: absolute;
  bottom: -123rpx;
  right: -60rpx;
  // opacity: 0.4;
}

.image3{
  width: 215rpx;
  height: 196rpx;
  position: absolute;
  bottom: -70rpx;
  right: -40rpx;
  // opacity: 0.5;
}
.image4{
  transform: scale(1.3);
  position: absolute;
  top: -58rpx;
  right: -91rpx;
  width: 268rpx;
  height: 232rpx;
}
.iconfont{
  margin-right: 10rpx;
}
</style>