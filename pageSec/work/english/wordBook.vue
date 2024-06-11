<!--
 * @Author: lili.liang oncwnuLfMdJTJ1uB8pjgINGPT0Rs@git.weixin.qq.com
 * @Date: 2023-12-28 20:29:50
 * @LastEditors: lili.liang oncwnuLfMdJTJ1uB8pjgINGPT0Rs@git.weixin.qq.com
 * @LastEditTime: 2024-01-22 13:11:07
 * @FilePath: \RuoYi-App-master\pageSec\work\english\wordBook.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- 单词本 -->
<template>
  <view>
    <view class="topBox">
      <topTab
        :tabList="tabList"
        @getData="getData"
      ></topTab>
    </view>
    <view class="wrap">

      <view class="word-book-list">
        <view
          v-if="dataList.length<1"
          class="word-book-noData"
        >
          <image src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/work/english/english-nodata.png"></image>
          <view class="nodata-tips">{{ tipVal }}</view>
          <view class="nodata-btn">
            <button @click="tuStudy">去学习</button>
          </view>
        </view>
        <view
          v-else
          class="word-book-conent"
        >
          <view
            v-for="(item,index) in dataList"
            :key="index"
          >
            <view
              class="word-book-item"
              @click="toItemDetail(item)"
            >
              <view class="word-book-item-left">
                <view class="word-book-item-title">{{ item.word_name }}</view>
                <!-- <view v-for="(row,i) in item.descList" :key="i"> -->
                <view class="word-book-item-desc"><uv-parse :content="item.word_mean"></uv-parse></view>
                <!-- </view> -->
              </view>
              <view class="word-book-item-right" @click.stop="voicePlay(item,index)">
                <view class="trumpet-div">
                  <view class="box">
                      <view class="trumpet-back"></view>
                      <view class="trumpet-forward"></view>
                      <view class="wifi-symbol">
                          <view :class="item.isShowLabaActive?'line first-active':'line first'"></view>
                          <view :class="item.isShowLabaActive?'line second-active':'line second'"></view>
                          <view :class="item.isShowLabaActive?'line third-active':'line third'" ></view>
                      </view>
                  </view>
              </view>
                <!-- <i class="iconfont blockBox soundBox" >&#xea11;</i> -->
              </view>
            </view>
            <view
              class="word-line"
              v-show="index != dataList.length-1"
            >
              <uv-line></uv-line>
            </view>

          </view>
          <uni-load-more :status="loadingStatus"></uni-load-more>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import topTab from '@/pageSec/components/top-tab/top-tab.vue'

import { selectWordListInfo } from '@/api/work/english'
export default {
  components: { topTab },
  data() {
    return {
      total: 0,
      obj: {
        pageNum: 1,
        pageSize: 10,
      },
      tipVal: '您还没有学习过单词，快去学习吧～',
      activeItem: 1,
      tabList: [
        {
          label: '已学习',
          value: '1',
          isCheck: true
        },
        {
          label: '高频词',
          value: '2',
          isCheck: false
        },
        {
          label: '错词本',
          value: '3',
          isCheck: false
        },
      ],
      dataList: [],
      loadingStatus: 'more',
    }
  },
  onShow() {
    this.initData()
    this.getList()
  },
  onReachBottom() {
    console.log('触发2')
    //上拉加载请求更多数据
    this.getmoreActives();
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.enablePullDownRefreshFn()
    uni.stopPullDownRefresh();//停止刷新
  },
  methods: {
    initData(){
      this.loadingStatus = 'more'
      this.obj.pageNum = 1
      this.dataList = []
    },
     // 下拉刷新回调
     enablePullDownRefreshFn() {
      console.log('下拉刷新-----')
      this.getList()
    },
    voicePlay(item,index) {
      console.log('item,index: ', item,index);
      this.$set(this.dataList[index], 'isShowLabaActive', true)
      this.dataList[index].isShowLabaActive = true
      console.log('this.dataList[index].: ', this.dataList[index]);
      const innerAudioContext = uni.createInnerAudioContext();
      innerAudioContext.autoplay = true;
      let str = 'http://dict.youdao.com/dictvoice?type=0&audio=' + item.word_name
      console.log('str: ', str);
      innerAudioContext.src = str
      innerAudioContext.onPlay(() => {
        console.log('开始播放');
      });
      console.log(this.dataList)
      setTimeout(() => {
        this.$set(this.dataList[index], 'isShowLabaActive', false)
        this.dataList[index].isShowLabaActive = false
      },2000)
      
      innerAudioContext.onError((res) => {
        console.log(res.errMsg);
        console.log(res.errCode);
      });
    },
    getList() {
      selectWordListInfo({
        type: this.activeItem,
        ...this.obj
      }).then(res => {
        if (res.code === 200) {
          console.log(res)
          res.rows.forEach(item => {
            item.isShowLabaActive = false
          })
          this.dataList = this.dataList.concat(res.rows)
          this.total = res.total
          if(this.total <= 10){
            this.loadingStatus = 'noMore'
          }
         
          console.log('  this.dataList: ', this.dataList, this.dataList.length);
        }else{
          this.dataList = []
        }
      })
    },
    tuStudy() {
      this.$tab.reLaunch('/pageFive/work/english/index')
    },
    getData(data) {
      this.activeItem = data
      this.initData()
      this.getList()
    },
    toItemDetail(row) {
      console.log('row: ', row);
      if (+this.activeItem === 3) {
        // 3错词本
        this.$tab.navigateTo(`/pageSec/work/english/wordTest?wrongType=1&pageName=wrongWord&total=${this.total}&questionId=${row.id}&pageType=0`)
      } else {
        this.$tab.navigateTo(`/pageSec/work/english/wordDetail?questionId=${row.id}&type=${this.activeItem}`)
      }

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
    }
  },
}
</script>
<style scoped lang="scss">
.topBox {
  width: 100%;
  background: $uni-color-bg;
}
.wrap {
  padding: 0 46rpx;
  overflow: hidden;
  min-height: 100vh;
  background: $uni-bg-color;

  .word-book-list {
    margin-top: 32rpx;
    .word-book-noData {
      text-align: center;
      image {
        width: 444rpx;
        height: 338rpx;
        margin-top: 128rpx;
        margin: auto;
      }
      .nodata-tips {
        font-size: 32rpx;
        color: $uni-text-color-grey;
        text-align: center;
        margin-top: 20rpx;
      }
      .nodata-btn {
        button {
          width: 200rpx;
          height: 80rpx;
          border: 2rpx solid $uni-text-color-placeholder;
          margin: 32rpx auto;
          border-radius: 50rpx;
          background: $uni-bg-color;
          color: $uni-text-color-placeholder;
          font-size: 28rpx;
          font-weight: 600;
          line-height: 80rpx;
        }
      }
    }
    .word-book-conent {
      .word-book-item {
        padding: 0rpx 0 10rpx;
        display: flex;
        justify-content: space-between;
        // border-bottom: 2rpx solid #f6f8fd;
        .word-book-item-left {
          .word-book-item-title {
            font-size: 40rpx;
            font-weight: 600;
            color: $uni-text-color;
            margin-bottom: 8rpx;
          }
          .word-book-item-desc {
            font-size: 26rpx;
            color: $uni-text-color;
            margin-top: 16rpx;
          }
        }
        .soundBox {
          color: $uni-text-color-placeholder;
        }
      }
      .word-line {
        margin: 20rpx 0;
      }
    }
  }
  .trumpet-div {
      height: 100%;
      display: inline-block;
    transform: scale(0.55);
    .box {
        height: 100%;
        display: flex;
        align-items: center;

        .trumpet-back {
            height: 12px;
            width: 8px;
            background-color: $uni-color-primary;
            z-index: 1;
        }

        .trumpet-forward {
            width: 0; /*设置宽高为0，所以div的内容为空，从才能形成三角形尖角*/
            height: 0;
            border-bottom: 15px solid $uni-color-primary;
            border-left: 15px solid transparent; /*transparent 表示透明*/
            border-right: 15px solid transparent;
            transform: rotateZ(-90deg);
            margin-left: -16px;

        }

        .wifi-symbol {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            height: 26px;
            margin-left: -4px;

            .line {
                width: 10px;
                height: 2px;
                background-color: $uni-color-primary;
                border-radius: 1px;
            }

            .first {
                transform: rotateZ(-30deg);
                // animation: fadeInOut 1s infinite 0.2s;
            }
            .first-active {
                transform: rotateZ(-30deg);
                animation: fadeInOut 0.8s infinite 0.2s;
            }
            .second {
                // animation: fadeInOut 1s infinite 0.4s;
            }
            .second-active {
                animation: fadeInOut 0.8s infinite 0.3s;
            }
            .third {
                transform: rotateZ(30deg);
                // animation: fadeInOut 1s infinite 0.4s;
            }
            .third-active {
                transform: rotateZ(30deg);
                animation: fadeInOut 0.8s infinite 0.4s;
            }

        }

    }
}

/*动画*/
@keyframes fadeInOut {
    0% {
        opacity: 0; /*初始状态 透明度为0*/
    }
    50% {
        opacity: 0.5; /*初始状态 透明度为0*/
    }
    100% {
        opacity: 1; /*结尾状态 透明度为1*/
    }
}
}
</style>