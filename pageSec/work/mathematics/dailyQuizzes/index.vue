<template>
  <view class="page">
    <view
      class="li"
      v-for="(item, index) in list"
      :key="index"
      @click="liBtn(item)"
    >
      <view class="img1">
        <image :src="item.course_pic || defaultImg.courseImg" />
      </view>
      <view class="liRight">
        <view class="liTop"> {{ item.course_outline_name }} </view>
        <view class="liBottom">
          <view class="imgs">
            <image src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/Brushquestions/imgs1/img1.png" />
            <image src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/Brushquestions/imgs1/img2.png" />
            <image src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/Brushquestions/imgs1/img3.png" />
            <image src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/Brushquestions/imgs1/img4.png" />
            <image src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/Brushquestions/imgs1/img5.png" />
          </view>
          <view class="text"> {{item.userCount}}&nbsp;&nbsp;&nbsp;人已刷题 </view>
        </view>
      </view>
    </view>

    <view class="recommendation">
      <view class="top"> 每日刷题建议 </view>
      <view class="bottom"> 每日可刷15~30道题，消化吸收后巩固。题量不宜求多，速度不易过快，看清题干认真思考后作答哦~ </view>
    </view>
  </view>
</template>

<script>
import { selectLevelOneList } from '@/api/work/english.js'
export default {
  data() {
    return {
      defaultImg: this.$defaultImg,
      obj: {
        courseOutlineType: '', // 0 政治 1 外语 2数学
        affiliationmodule: '', //  0名师题库   1精选题库  2真题题库 3每日题库 4历年真题 5真题考点
      },
      list: [],
      level: ''
    }
  },
  onLoad(options) {
    console.log('options', options)
    this.obj.courseOutlineType = options.courseOutlineType
    this.obj.affiliationmodule = options.affiliationmodule
    this.level = options.level
    this.getList()
  },
  methods: {
    // 获取列表数据
    async getList() {
      console.log('obj', this.obj)
      const { rows } = await selectLevelOneList(this.obj)
      console.log('接口数据', rows)
      this.list = rows
    },
    liBtn(item) {
      this.$tab.navigateTo('/pageSec/work/exercise/section/index?affiliationmodule=' + this.obj.affiliationmodule + '&courseid=' + item.course_id + '&level=' + this.level)

    }

  }
}
</script>

<style lang="scss" scoped>
.page {
  // margin: 24rpx 30rpx;
  width: 100%;
}

.li {
  margin: 24rpx 30rpx;
  width: calc(100% - 60rpx);
  background: #fff;
  display: flex;
  padding: 32rpx 16rpx;
  box-sizing: border-box;
  border-radius: 16rpx;
  margin-bottom: 24rpx;

  > .img1 {
    width: 94rpx;
    height: 110rpx;
    margin-right: 16rpx;

    > image {
      width: 100%;
      height: 100%;
    }
  }

  > .liRight {
    flex: 1;
  }

  .liTop {
    // width: 432rpx;
    height: 34rpx;
    font-size: 26rpx;
    font-weight: 600;
    line-height: 33.6rpx;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 24rpx;
    @include overline(1);
  }

  .liBottom {
    display: flex;
    justify-content: space-between;

    > .imgs {
      > image {
        width: 40rpx;
        height: 40rpx;
        margin-right: 16rpx;
      }
    }

    > .text {
      font-size: 21rpx;
      font-weight: 400;
      letter-spacing: 0rpx;
      line-height: 40rpx;
      color: rgba(153, 153, 153, 1);
    }
  }
}

.recommendation {
  height: 168rpx;
  position: fixed;
  bottom: 0rpx;
  background: #fff;
  border-radius: 16rpx;
  padding: 16rpx 46rpx;

  > .top {
    height: 40rpx;
    line-height: 40rpx;
    line-height: 40rpx;
    color: rgba(252, 81, 95, 1);
    font-size: 28rpx;
  }

  > .bottom {
    margin-top: 16rpx;
    font-size: 23rpx;
    color: rgba(51, 51, 51, 1);
    font-weight: 400;
  }
}
</style>