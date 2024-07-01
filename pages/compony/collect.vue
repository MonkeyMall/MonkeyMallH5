<template>
  <view>
    <view class="header">
      <uni-easyinput 
        prefixIcon="search" 
        v-model="name" 
        placeholder="请输入公司名称" 
        :suffixIcon="closeIcon" 
        @iconClick="clear" 
        @confirm="handxenamse"
      ></uni-easyinput>
    </view>
    <view class="compony-list">
      <view class="compony-list-item" v-for="(item, index) in list" :key="index" @click="goInfo(item)">
        <image
          :src="item.componyId.logo"
          mode="scaleToFill"
        />
        <view class="compony-list-item-right">
          <view class="compony-list-item-right-title">
            <text>{{ item.componyId.name }}</text>
          </view>
          <view class="compony-list-item-right-address">
            <text>{{ item.address }}</text>
          </view>
          <view class="compony-list-item-right-tags">
            <text v-if="item.componyId.createdDate">{{ item.componyId.createdDate }}成立</text>
            <template v-if="item.componyId.overTime && item.componyId.overTime.split(',')">
              <text v-for="(tag, index1) in item.componyId.overTime.split(',')" :key="index1">
                {{ dictHx(tag, 'overTimeOptions')}}
              </text>
            </template>
            <!-- <text>{{ item.componyId.welfare }}</text> -->
          </view>
        </view>
      </view>
      <uni-load-more :status="loadingStatus"></uni-load-more>
    </view>
  </view>
</template>

<script>
import {
  getCompanyCollectList
} from '@/api/guoguo.js'
import {
  dictHx
} from '@/utils/index.js'
export default {
  data() {
    return {
      name: '',
      closeIcon: '',
      pageNum: 1,
      pageSize: 10,
      total: 0,
      //定义加载方式 more---contentdown  loading---contentrefresh nomore---contentnomore
      loadingStatus: 'more',
      list: []
    }
  },
  watch: {
    name(n, o) {
      if (!n) {
        this.closeIcon = ''
      } else {
        this.closeIcon = 'close'
      }
    }
  },
  onReachBottom() {
    //上拉加载请求更多数据
    this.getmoreActives();
  },
  onShow() {
    this.initData()
  },
  onReachBottom() {
    this.getmoreActives();
  },
  methods: {
    dictHx,
    //上拉加载获取更多的限时活动
    async getmoreActives() {
      if (this.loadingStatus === 'nomore') {
        return false;
      }
      this.loadingStatus = 'loading';
      if (this.list.length < this.total) {
        this.pageNum++
        await this.getList()
      } else {
        this.loadingStatus = 'nomore';
      }
    },
    initData() {
      this.list = []
      this.pageNum = 1
      this.loadingStatus = 'more'
      this.getList()
    },
    async getList() {
      const data = await getCompanyCollectList({
        name: this.name || '',
        limte: 10,
        page: this.pageNum
      })
      console.log('datalist', data)
      this.list = this.list.concat(data.data)
      this.total = data.count
      if (this.total <= 10) {
        this.loadingStatus = 'noMore'
      }
    },
    clear(e) {
      console.log('zx', e)
      if (e === 'suffix') {
        this.name = ''
        this.initData()
      } else {
        this.initData()
      }
    },
    // 输入学校名称
    handxenamse() {
      this.initData()
    },
    // 跳转详情
    goInfo(info) {
      uni.navigateTo({
        url: '/pages/compony/info?name=' + info.componyId.name + '&id=' + info.componyId._id
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.uni-easyinput {
  padding: 0 !important;
}
.header {
  padding: 30rpx;
}
.compony-list {
  padding: 0 30rpx 30rpx 30rpx;
  border-radius: 10rpx;
  &-item {
    display: flex;
    align-items: center;
    gap: 30rpx;
    padding: 30rpx;
    background: #fff;
    margin-bottom: 20rpx;
    image {
      width: 100rpx;
      height: 100rpx;
      border-radius: 10rpx;
      overflow: hidden;
    }
    &-right {
      flex: 1;
      &-title {
        font-size: 36rpx;
        font-weight: bold;
        margin-bottom: 10rpx;
      }
      &-address {
        font-size: 28rpx;
        margin-bottom: 10rpx;
        @include overline(2);
      }
      &-tags {
        font-size: 24rpx;
        display: flex;
        gap: 10rpx;
        color: #999;
      }
    }
  }
}
</style>