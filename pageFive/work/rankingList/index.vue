<template>
  <view class="page">
    <view class="tabs">
      <view :class="TabIndex == 0 ? 'tabActive': 'tab'" @click="tabBtn(0)"> <span>坚持天数排行</span> </view>
      <view :class="TabIndex == 1 ? 'tabActive': 'tab'" @click="tabBtn(1)"> <span>正确率排行</span> </view>
    </view>
    <view class="text">
      每天凌晨5点更新数据，只显示排名前100用户
    </view>
    <view class="self">
      <view>
        <span style='margin-right: 12px; color: rgba(51, 51, 51, 1); font-weight:600; '>我</span>
        <image class="imageImg1" :src="myObj.avatar"></image>
        <span style='margin-left: 6px;'>{{myObj.userName}}</span>
      </view>
      <view style="font-size: 16px; font-weight: 600; ">{{TabIndex == 0? myObj.signRank : myObj.rightRateRank}}</view>
      <view style="display: flex; justify-content: space-around;" v-if="TabIndex == 0">
        <image class="imageImg2"
          src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/ranking/block.png"></image>
        <span style='margin-left: 10px;'> 共刷题 </span>
        <span style='margin-left: 8px; color: red;'>{{myObj.day || 0}}天</span>
      </view>
      <view style="display: flex; justify-content: space-around;" v-else>
        <image class="imageImg3" :src="myObj.avatar"></image>
        <span style='margin-left: 10px;'> 正确率 </span>
        <span style='margin-left: 8px; color: red;'> {{ myObj.rate || 0 }} </span>
      </view>
    </view>
    <view class="TopThree">
      <view
        :class="firstObj && firstObj.userid?'img mTop15 '+firstObj.className :'img hiddenBox mTop15 '+firstObj.className">
        <view class="imgName">
          {{ firstObj.username }}
  
        </view>
        <view class="imgImg">
          <image
            :src="firstObj.avatar||'https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/default/default_avatar.png'"
            mode=""></image>
        </view>
        <view class="imgText">
          <view v-if="TabIndex == 0">
            共学习{{firstObj.count}}天
          </view>
          <view v-else>
            正确率{{firstObj.rightrate || 0}}%
          </view>
        </view>
      </view>
      <view :class="secondObj && secondObj.userid?'img ' +secondObj.className:'img hiddenBox '+secondObj.className">
        <view class="imgName">
          {{ secondObj.username }}
        </view>
        <view class="imgImg">
          <image
            :src="secondObj.avatar||'https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/default/default_avatar.png'"
            mode=""></image>
        </view>
        <view class="imgText">
          <view v-if="TabIndex == 0">
            共学习{{secondObj.count}}天
          </view>
          <view v-else>
            正确率{{secondObj.rightrate || 0}}%
          </view>
        </view>
      </view>
      <view
        :class="thirdObj && thirdObj.userid?'img mTop15 '+thirdObj.className :'img hiddenBox mTop15 '+thirdObj.className">
        <view class="imgName">
          {{ thirdObj.username }}
        </view>
        <view class="imgImg">
          <image
            :src="thirdObj.avatar||'https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/default/default_avatar.png'"
            mode=""></image>
        </view>
        <view class="imgText">
          <view v-if="TabIndex == 0">
            共学习{{thirdObj.count}}天
          </view>
          <view v-else>
            正确率{{thirdObj.rightrate ||0 }}%
          </view>
        </view>
      </view>
    </view>
    <view class="list" v-if="dataList && dataList.length > 0">
      <view class="li" v-for="(item, index) in dataList" :key='index'>
        <view class="liLeft">
          <span>{{item.rank}}</span>
          <image class="imageImg1"
            :src="item.avatar||'https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/default/default_avatar.png'">
          </image>
          <span>{{item.username}}</span>
        </view>
        <view class="liRight" v-if="TabIndex == 0">
          <view style="display: flex; justify-content: space-around;">
            <image class="imageImg2"
              src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/ranking/block.png"></image>
            <span style='margin-left: 10px;'> 共刷题 </span>
            <span style='margin-left: 8px; color: red;'>{{item.count || 0}} 天</span>
          </view>
        </view>
  
        <view class="liRight" v-else>
          <view style="display: flex; justify-content: space-around;">
            <image class="imageImg3"
              src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/ranking/correct.png">
            </image>
            <span style='margin-left: 10px;'> 准确率 </span>
            <span style='margin-left: 8px; color: red;'> {{item.rightrate || 0}}%</span>
          </view>
        </view>
      </view>
      <uni-load-more :status="loadingStatus"></uni-load-more>
    </view>
    <view v-else>
      <uni-default-page value="4" tic="暂无数据" btntext="返回上一级"></uni-default-page>
    </view>
  </view>
</template>

<script>
import { selectSignCountRankList, selectRightRateRankList, getSignOrRightRateInfo } from '@/api/work/math'
export default {
  data() {
    return {
      TabIndex: 0,
      obj: {
        pageNum: 1,
        pageSize: 20
      },
      total: 0,
      myObj: {},
      firstObj: {}, //第一
      secondObj: {}, //第二
      thirdObj: {}, //第三
      dataList: [], //剩下的列表
      loadingStatus: 'more',
      courseOutlineType: 2, //学科类型  0 政治 1 外语 2数学
    }
  },
  onLoad(options) {
    console.log('options: ', options);
    if (options.TabIndex) {
      this.TabIndex = options.TabIndex
    }
    this.courseOutlineType = options.courseOutlineType
    this.getList()
  },
  onPullDownRefresh() {
    this.enablePullDownRefreshFn()
    uni.stopPullDownRefresh();//停止刷新
  },
  methods: {
    // 下拉刷新回调
    enablePullDownRefreshFn() {
      console.log('下拉刷新-----')
      this.getList()
    },
    handEmit() {
      this.$tab.navigateBack(1)
    },
    tabBtn(index) {
      if (this.TabIndex == index) return;
      this.obj = {
        pageNum: 1,
        pageSize: 20
      }
      this.TabIndex = index
      this.dataList = []
      this.firstObj = {}
      this.secondObj = {}
      this.thirdObj = {}
      if (index == 0) {
        this.selectSignCountRankListFn()
        this.getSignOrRightRateInfoFn(0)

      } else {
        this.selectRightRateRankListFn()
        this.getSignOrRightRateInfoFn(1)
      }

    },
    getSignOrRightRateInfoFn(type) {
      getSignOrRightRateInfo({
        courseOutlineType: this.courseOutlineType,
        type
      }).then(res => {
        console.log('res: ', res);
        if (res.code === 200) {
          this.myObj = Object.assign({}, res.data)
        }
        // this.TabIndex = index
        // this.getList()
      })
    },
    //上拉加载获取更多的限时活动
    async getmoreActives() {
      console.log('loadingStatus', this.loadingStatus)
      if (this.loadingStatus === 'nomore') {
        return false;
      }
      this.loadingStatus = 'loading';
      if (this.dataList.length < this.total) {
        this.obj.pageNum++
        await this.getList()
      } else {
        this.loadingStatus = 'nomore';
      }
    },
    getList() {
      if (this.TabIndex == 0) {
        this.selectSignCountRankListFn()
        this.getSignOrRightRateInfoFn(0)

      } else {
        this.selectRightRateRankListFn()
        this.getSignOrRightRateInfoFn(1)
      }
    },
    // 获取坚持天数排名
    selectSignCountRankListFn() {
      selectSignCountRankList({
        signtype: this.courseOutlineType,
        ...this.obj
      }).then(res => {
        if (res.code === 200) {
          this.total = res.total
          if (this.total < 20) {
            this.loadingStatus = 'noMore'
          }
          if (res.rows && res.rows.length > 0) {
            if (res.rows[0]) {
              this.secondObj = res.rows[0]
              // this.firstObj = res.rows[0]
              this.secondObj.className = this.secondObj.rank == '1' ? 'one' : this.secondObj.rank == '2' ? 'two' : this.secondObj.rank == '3' ? 'three' : ''
            }
            if (res.rows[1]) {
              // this.secondObj = res.rows[1]
              this.firstObj = res.rows[1]
              this.firstObj.className = this.firstObj.rank == '1' ? 'one' : this.firstObj.rank == '2' ? 'two' : this.firstObj.rank == '3' ? 'three' : ''
            }
            if (res.rows[2]) {
              this.thirdObj = res.rows[2]
              this.thirdObj.className = this.thirdObj.rank == '1' ? 'one' : this.thirdObj.rank == '2' ? 'two' : this.thirdObj.rank == '3' ? 'three' : ''
            }
            if (res.rows && res.rows.length > 3) {
              let arr = res.rows.splice(0, 3)
              this.dataList = res.rows
            }
          } else {
            this.loadingStatus = 'nomore'
          }

        }
      })
    },
    // 获取正确率排名
    selectRightRateRankListFn() {
      selectRightRateRankList({
        questiontype: this.courseOutlineType,
        ...this.obj
      }).then(res => {
        if (res.code === 200) {
          if (res.rows && res.rows.length > 0) {
            res.rows.forEach(item => {
              item.rightrate = (parseFloat(item.rightrate) * 100).toFixed(2)
            })
            this.total = res.total
            if (this.total < 20) {
              this.loadingStatus = 'noMore'
            }
            if (res.rows[0]) {
              this.secondObj = res.rows[0]
              // this.firstObj = res.rows[0]
              this.secondObj.className = this.secondObj.rank == '1' ? 'one' : this.secondObj.rank == '2' ? 'two' : this.secondObj.rank == '3' ? 'three' : ''
            }
            if (res.rows[1]) {
              // this.secondObj = res.rows[1]
              this.firstObj = res.rows[1]
              this.firstObj.className = this.firstObj.rank == '1' ? 'one' : this.firstObj.rank == '2' ? 'two' : this.firstObj.rank == '3' ? 'three' : ''
            }
            if (res.rows[2]) {
              this.thirdObj = res.rows[2]
              this.thirdObj.className = this.thirdObj.rank == '1' ? 'one' : this.thirdObj.rank == '2' ? 'two' : this.thirdObj.rank == '3' ? 'three' : ''
            }
            if (res.rows && res.rows.length > 3) {
              let arr = res.rows.splice(0, 3)
              this.dataList = res.rows
            }
          } else {
            this.loadingStatus = 'nomore'
          }

        }

      })
    }
  }
}
</script>
<style lang="scss" scoped>
.page {
  margin: 10px;
  width: calc(100% -50px);
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 10px;
}

.tabs {
  width: 100%;
  height: 40px;
  display: flex;

  >.tab {
    width: 360rpx;
    height: 40px;
    margin: 0 auto;
    line-height: 40px;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0px;
    color: rgba(51, 51, 51, 1);
    text-align: center;
  }

  >.tabActive {
    width: 294rpx;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    font-weight: 600;
    letter-spacing: 0px;
    color: rgba(252, 81, 95, 1);
    text-align: center;
    border-top: 40px solid rgba(255, 247, 248, 1);
    border-bottom: 00px solid transparent;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    position: relative;
    margin: 0 36rpx;
    border-bottom-left-radius: 44rpx;
    border-bottom-right-radius: 44rpx;

    >span {
      width: 100%;
      position: absolute;
      display: inline-block;
      top: -40px;
      left: 0px;
    }
  }
}

.text {
  width: 100%;
  text-align: center;
  color: rgba(153, 153, 153, 1);
  font-size: 11px;
  line-height: 32px;
  margin-top: 8px;
  margin-bottom: 32rpx;
}

.self {
  margin-top: 16px;
  margin: 0 7px;
  height: 41px;
  width: calc(100% - 14px);
  padding: 0 7px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 36px;
  font-size: 12px;
  box-shadow: 1px -1px 14px 3px rgba(153, 153, 153, 0.1);
  border-radius: 8px;

  .imageImg1 {
    width: 24px;
    height: 24px;
    position: relative;
    top: 7px;
  }

  .imageImg2 {
    width: 15px;
    height: 15px;
    margin-top: 12px;
  }

  .imageImg3 {
    width: 14px;
    height: 15px;
    margin-top: 12px;
  }
}

.TopThree {
  margin-top: 16px;
  display: flex;
  justify-content: space-around;

  >.img {
    width: 110px;
    height: 140px;
    background-size: cover;
    background-repeat: no-repeat;
    // margin-bottom: 20px;
    text-align: center;
    padding-top: 30px;

    .imgName {
      font-size: 12px;
    }

    .imgImg {
      width: 40px;
      height: 40px;
      margin: 9px auto;

      >image {
        width: 100%;
        height: 100%;
      }
    }

    .imgText {
      font-size: 11px;
    }
  }

  .one {
    background-image: url(https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/ranking/one.png);
    // background-image: url(https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/ranking/two.png);
  }

  .two {
    background-image: url(https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/ranking/two.png);
    // background-image: url(https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/ranking/one.png);
  }

  .three {
    background-image: url(https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/ranking/three.png);
    // margin-top: 15px;
  }

  .mTop15 {
    margin-top: 30rpx;
  }

  .hiddenBox {
    visibility: hidden;
  }
}

.li {
  width: 100%;
  padding: 0 14px;
  height: 57px;
  display: flex;
  justify-content: space-between;
  line-height: 57px;
  border-bottom: 1px solid rgba(246, 248, 253, 1);

  .liLeft {
    >.imageImg1 {
      width: 24px;
      height: 24px;
      position: relative;
      top: 7px;
      margin: 0 16rpx 0 40rpx;
    }
  }

  >.liRight {
    display: flex;

    .imageImg2 {
      width: 15px;
      height: 15px;
      margin: auto 0;
    }

    .imageImg3 {
      width: 14px;
      height: 15px;
      margin: auto 0;
    }
  }
}
</style>
