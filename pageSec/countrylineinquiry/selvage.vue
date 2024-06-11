<template>
  <view class="selvage">
    <view v-if="listData && listData.length > 0" class="new-contentItem" v-for="(item, index) in listData" :key="index">
      <view class="new-title">
        <view class="newTitle-text">{{ item.specialtyAffiliatingCategory }}</view>
        <view class="newTitle-logo">
          <image
            src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/ranking/country-logo.png">
          </image>
        </view>
      </view>
      <view class="new-content-center">
        <view class="center-item">
          <view> 总分</view>
          <view class="fSize28 lHeight50">{{ item.totalScore }}</view>
        </view>
        <view class="center-item">
          <view>单科(满分=100)</view>
          <view class="fSize28 lHeight50">{{ item.fullScoreEqualHundred }}
          </view>
        </view>
        <view class="center-item">
          <view>单科(满分＞100)</view>
          <view class="fSize28 lHeight50">{{ item.fullScoreOutweighHundred }}
          </view>
        </view>
      </view>
    </view>
    <view style="margin: 15rpx;" v-if="!listData || listData.length == 0">
      暂无数据
    </view>
    <!-- <uni-table-s
      :list="listData"
      :headerData="headerData"
      :headerAttr="headerAttr"
    >
    </uni-table-s> -->
  </view>
</template>

<script>
import { findMajorSelfDelimitationLine } from '@/api/colleges/index'
import uniTableS from '@/pageSec/components/uni-table-s/uni-table-s.vue'
export default {
  props: ['quserparms'],
  data() {
    return {
      listData: [],
      headerData: ['学科门类', '总分', '单科(满分=100)', '单科(满分＞100)'],
      headerAttr: ['specialtyAffiliatingCategory', 'totalScore', 'fullScoreEqualHundred', 'fullScoreOutweighHundred'],
    }
  },
  components: { uniTableS },
  onLoad() {
    // this.getUser()
  },
  onShow() {

  },
  watch: {
    quserparms(newVal, oldVal) {
      this.getFindMajorSelfDelimitationLine(newVal)
    }
  },
  mounted() {
    console.log(this.quserparms, 'this.quserparms----')
    // this.getFindMajorSelfDelimitationLine(this.quserparms)
  },
  methods: {
    getFindMajorSelfDelimitationLine(newVal) {
      console.log('newVal: ', newVal);
      findMajorSelfDelimitationLine({
        year: newVal.year,
        specialtyMasterType: newVal.specialtyMasterType,
        schoolName: newVal.schoolName,
      }).then(res => {
        if (res.code == 200) {
          this.listData = res.data
        }
      })
    },
  }
}
</script>

<style lang="scss">
.selvage {
  tr td:nth-child(3) {
    line-height: 60rpx;
  }

  .new-contentItem {
    width: 100%;
    margin-bottom: 30rpx;
    background: rgba(250, 250, 250, 1);
    height: 289rpx;
    border-radius: 8rpx;
  }

  .new-title {
    width: 100%;
    // text-indent: 32rpx;
    height: 88rpx;
    font-size: 32rpx;
    line-height: 88rpx;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: auto;
  }

  .new-content-center {
    margin: 0 24rpx;
    border-radius: 8rpx;
    background: rgba(247, 247, 247, 1);
    height: 170rpx;
    display: flex;
    justify-content: space-between;
    padding: 24rpx 16rpx;
  }

  .center-item {
    // display: inline-block;
    text-align: center;
    font-size: 24rpx;
    color: rgba(153, 153, 153, 1);
    // margin-right: 40rpx;
  }

  .fSize28 {
    font-size: 28rpx;
    color: #000000;
    font-weight: 600;
  }

  .lHeight50 {
    line-height: 50rpx;
    margin-top: 35rpx;
  }

  .newTitle-text {
    // margin-left: 32rpx;
  }

  .newTitle-logo {
    width: 60rpx;
    height: 60rpx;
    // margin-right: 16rpx;

    image {
      width: 60rpx;
      height: 60rpx;
    }
  }
}
</style>