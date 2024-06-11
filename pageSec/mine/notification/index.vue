<template>
  <view class="container">
    <view class="input">
      <uni-easyinput
        prefixIcon="search"
        v-model="notifyParams.noticeTitle"
        placeholder="请输入名称"
        @change="changeFn"
      ></uni-easyinput>
    </view>

    <view class="Uls">
      <view
        class="li"
        v-for="item in NotifyList"
        :key='item.createTime'
      >
        <view class="times"> {{ item.createTime || '' }}</view>
        <view
          class="Lis"
          v-for="(item1, index) in item.list"
          :key="item1.createTime"
          @click="handdeilts(item1)"
        >
          <view class="hede">
            <view class="titles"> <text></text>{{ item1.noticeTitle || '' }} </view>
            <view class="time"> {{ item1.hhMm || '' }} </view>
          </view>
          <view class="contens">
            <uv-parse
              class="uv-parse"
              :content="item1.noticeContent"
            ></uv-parse>

          </view>
          <view class="botto">
            <view class="deilts"> 查看详情 </view>
            <uni-icons
              type="forward"
              size="15"
              color="#999999"
            ></uni-icons>
          </view>
        </view>
      </view>
    </view>
    <uni-load-more :status="loadingStatus"></uni-load-more>
  </view>
</template>

<script>
import {
  getUserProfile,
  getNotify
} from "@/api/system/user"
import uniEasyinput from "@/pageSec/components/uni-easyinput/components/uni-easyinput/uni-easyinput.vue"

// import uvParse from "@/pageSec/components/uv-parse/components/uv-parse/uv-parse.vue";
import uniIcons from '@/pageSec/components/uni-icons/components/uni-icons/uni-icons.vue'
import { splitImgMixins } from '@/mixins/index.js'

export default {
  mixins: [splitImgMixins],
  components: {
    uniEasyinput,
    // uvParse,
    uniIcons
  },
  data() {
    return {
      value: "",
      notifyParams: {
        noticeObject: 2,
        sendPlatform: 0,
        pageNum: 1,
        pageSize: 10,
        noticeTitle: ''
      },
      NotifyList: [],
      //定义加载方式 more---contentdown  loading---contentrefresh nomore---contentnomore
      loadingStatus: 'more',
      total: 0,
      number: 0
    }
  },
  onLoad(option) {
    // this.getUser()
    this.getNotifyList()
  },
  onReachBottom() {
    console.log('触发2')
    //上拉加载请求更多数据
    this.getmoreActives();
  },
  methods: {
    changeFn() {
      this.notifyParams.pageNum = 1
      getNotify(this.notifyParams).then(res => {
        if (res.code === 200) {
          this.NotifyList = res.rows
          this.total = res.total;
          this.number = 0
          if (this.total <= 10) {
            this.loadingStatus = 'nomore'
          }
        }
      })
    },
    getNotifyList() {
      console.log(this.notifyParams);
      getNotify(this.notifyParams).then(res => {
        this.NotifyList = this.NotifyList.concat(res.rows)
        this.total = res.total;
        this.number = 0
        if (this.total <= 10) {
          this.loadingStatus = 'nomore'
        }
      })
    },
    //上拉加载获取更多的限时活动
    async getmoreActives() {
      console.log('loadingStatus', this.loadingStatus)
      if (this.loadingStatus === 'nomore') {
        return false;
      }
      this.loadingStatus = 'loading';

      this.NotifyList.forEach(item => {
        item.list.forEach(val => {
          this.number++
        })
      })
      console.log(this.number);
      console.log(this.total);
      if (this.number < this.total) {
        this.notifyParams.pageNum++
        await this.getNotifyList()
      } else {
        this.loadingStatus = 'nomore';
      }
    },
    handdeilts(obj) {
      if (obj.avatar === null || obj.avatar === undefined || obj.avatar === '') {
        console.log('1111')
      } else {
        obj.avatar = this.COS_CDN_PREFIX + obj.avatar
      }
      let newObj = encodeURIComponent(JSON.stringify(obj))
      this.$tab.navigateTo('/pageSec/mine/notification/details?obj=' + newObj)
    },
    getUser() {
      getUserProfile().then(response => {
        console.log('用户信息', response.data)
        this.user = response.data
        this.roleGroup = response.roleGroup
        this.postGroup = response.postGroup
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: $uni-bg-color-cyan;
  padding: 32rpx 30rpx;
}

.input {
  width: 100%;
  // height: 140rpx;
  padding-top: 32rpx;
  position: fixed;
  top: 0;
  left: 0;
  background: #f7f8fc;
  z-index: 2;
}

.Uls {
  width: 100%;
  margin-top: 70rpx;
  // height: 86vh;
  overflow: hidden;
  overflow-y: scroll;

  .times {
    text-align: center;
    font-size: 26rpx;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 33.6rpx;
    color: $uni-text-color-grey;
    margin-top: 32rpx;
  }

  .Lis {
    padding: 32rpx 16rpx 24rpx 17rpx;
    border-radius: 16rpx;
    margin-top: 32rpx;
    background: rgba(255, 255, 255, 1);

    .hede {
      display: flex;
      justify-content: space-between;

      .titles {
        width: 500rpx;
        overflow-x: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        text {
          display: inline-block;
          width: 6rpx;
          height: 30rpx;
          border-radius: 26rpx;
          background: $uni-text-color-placeholder;
          margin-right: 16rpx;
          vertical-align: centet;
          position: relative;
          top: 5rpx;
        }

        font-size: 32rpx;
        font-weight: 600;
        color: $uni-text-color;
      }

      .time {
        font-size: 26rpx;
        font-weight: 400;
        color: $uni-text-color-grey;
        padding-top: 8rpx;
      }
    }

    .contens {
      font-size: 28rpx;
      font-weight: 400;
      line-height: 39.2rpx;
      color: $uni-text-color;
      height: 84rpx;
      margin: 32rpx 0;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .botto {
      padding-top: 24rpx;
      display: flex;
      justify-content: space-between;
      border-top: 1px solid rgba(246, 248, 253, 1);

      .deilts {
        font-size: 26rpx;
        font-weight: 400;
        color: $uni-text-color;
      }
    }
  }
}
</style>

<style lang="scss">
.parse {
  text {
    width: 640rpx !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    -webkit-line-clamp: 2 !important;
    -webkit-box-orient: vertical !important;
    display: -webkit-box;
    word-break: break-all;
  }
}
</style>