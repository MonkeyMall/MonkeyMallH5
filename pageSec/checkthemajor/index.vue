<template>
  <view class="checkthemajor">
    <view class="header">
      <uni-easyinput prefixIcon="search" v-model="queryPamers.specialtyNameCode" :suffixIcon="closeIcon"
        @iconClick="clear" placeholder="请输入专业名称/代码" @confirm="searchFn"></uni-easyinput>
      <view class="tabs">
        <view class="lie" @click="handnianens(1)">{{ queryPamers.foreignLanguageTypeVal }}<view
            style="margin-left: 8rpx;">
            <uni-icons type="bottom" size="20"></uni-icons>
          </view>
        </view>
        <view class="lie" @click="handnianens(2)">{{ queryPamers.mathTypeVal }}<view style="margin-left: 8rpx;">
            <uni-icons type="bottom" size="20"></uni-icons>
          </view>
        </view>
        <view class="lie" @click="handnianens(3)">{{ queryPamers.flTypeVal }}<view style="margin-left: 8rpx;">
            <uni-icons type="bottom" size="20"></uni-icons>
          </view>
        </view>
      </view>
      <view class="shuliang">
        共<text>{{ total }}个</text>专业
      </view>
    </view>
    <view class="conentss" v-if="xuexList.length != 0">
      <view class="zhanyelist" @click="handzydilse(item)" v-for="(item, index) in xuexList" :key="index">
        <view class="type">
          <view class="zhaunyes">
            {{ item.specialtyName }}
          </view>
          <view class="zydaimas">
            专业代码
            <view class="masesd">{{ item.specialtyCode }}</view>
          </view>
        </view>
        <view class="typezhuanye">
          <view class="lefts">
            专业类别：<text v-if="item.specialtyMasterName == '专业型硕士'">专硕</text>
            <text v-if="item.specialtyMasterName == '学术型硕士'">学硕</text>-{{ item.specialtyAffiliatingCategoryName }}<text
              v-if="item.specialtyAffiliatingSubjecttName">-{{ item.specialtyAffiliatingSubjecttName }}</text>
          </view>
          <view class="rights">
            <text>{{ item.schoolNum }}</text>所院校
          </view>
        </view>
      </view>
      <uni-load-more :status="loadingStatus"></uni-load-more>
    </view>
    <dEfaultpage v-else value="" tic="暂无数据" mt="0"></dEfaultpage>
    <uv-picker ref="picker" cancelText="取消" confirmText="确认" keyName="label" :columns="englishList" @confirm="confirm">
    </uv-picker>
    <uv-picker ref="pickers" cancelText="取消" confirmText="确认" keyName="label" :columns="mathList" @confirm="confirms">
    </uv-picker>
    <uv-picker ref="picker3" cancelText="取消" confirmText="确认" keyName="label" :columns="selectArr" @change="changeFlFn" @confirm="confirmFn">
    </uv-picker>

  </view>
</template>

<script>
import dEfaultpage from '../components/uni-default-page/uni-default-page.vue';
import {
  groupTree,
  schoolssList,
  findSpecialtyList
} from "@/api/colleges/index"

// import uniEasyinput from "@/pageSec/components/uni-easyinput/components/uni-easyinput/uni-easyinput.vue"
// import uvPicker from "@/pageSec/components/uv-picker/components/uv-picker/uv-picker.vue"
import uniIcons from '@/pageSec/components/uni-icons/components/uni-icons/uni-icons.vue'
import uniEasyinput from "@/pageSec/components/uni-easyinput/components/uni-easyinput/uni-easyinput.vue"

export default {
  components: {
    dEfaultpage,
    uniEasyinput,
    uniIcons,
    // uvPicker
  },
  data() {
    return {
      englishList: [
        [{
          label: '全部',
          id: 0,
          value: ''
        }, {
          label: '英语一',
          id: 1,
          value: 'englishOne'
        },
        {
          label: '英语二',
          id: 2,
          value: 'englishTwo'
        },
        {
          label: '其他',
          id: 3,
          value: 'other'
        }
        ]
      ],
      mathList: [
        [{
          label: '全部',
          id: 0,
          value: ''
        }, {
          label: '数学一',
          id: 1,
          value: 'mathOne'
        },
        {
          label: '数学二',
          id: 2,
          value: 'mathTwo'
        },
        {
          label: '数学三',
          id: 3,
          value: 'mathThree'
        },
        {
          label: '不考数学',
          id: 4,
          value: 'other'
        }
        ]
      ],
      title: '',
      queryPamers: {
        specialtyNameCode: "",
        foreignLanguageType: "", //外语类型	
        specialtyMasterType: "",
        specialtyAffiliatingCategoryId: "",
        mathType: "", //数学类型	
        mathTypeVal: '选择数学类型',
        flTypeVal: '选择分类',
        foreignLanguageTypeVal: '选择外语类型',
        pageNum: 1,
        pageSize: 10,
      },
      num: "",
      xuexList: [],
      isTJ: 0,//是否是从调剂页面跳过来
      total: 0,
      loadingStatus: 'more',
      closeIcon: '',
      grouList: [],
      selectArr: [[], []]
    }
  },
  onLoad(options) {
    this.getList()
    this.isTJ = options.isTJ
    this.title = options.title
    uni.setNavigationBarTitle({
      title: options.title
    })
    this.handgroupTree()

  },
  onShow() {

  },
  onReachBottom() {
    console.log('触发2')
    //上拉加载请求更多数据
    this.getmoreActives();
  },
  watch: {
    'queryPamers.specialtyNameCode'(n, o) {
      if (!n) {
        this.closeIcon = ''
      } else {
        this.closeIcon = 'close'
      }
    }
  },

  onShareAppMessage(options) {
    // 返回分享的内容
    return {
      title: this.title,
      path: `/pageSec/checkthemajor/index?title=${this.title}&isTJ=${this.isTJ}`,
    };
  },
  methods: {
    changeFlFn(e) {
      const {index} = e
      console.log('index', index)
      this.$set(this.selectArr, 1, this.getTwoList(index))
    },
    confirmFn(e) {
      console.log(e.value)
      this.queryPamers.specialtyMasterType = e.value[0].id
      this.queryPamers.specialtyAffiliatingCategoryId = e.value[1].id
      this.queryPamers.flTypeVal = e.value[1].label
      this.initData()
    },
    // 前三级学科
    handgroupTree() {
      groupTree().then(response => {
        this.grouList = response.data
        this.selectArr[0] = this.grouList
        this.selectArr[1] = this.getTwoList(0)
      })
    },
    getTwoList(index) {
      console.log('传参', index)
      return this.grouList[index].children
    },
    clear(e) {

      console.log('zx', e)
      if (e === 'suffix') {
        this.queryPamers.specialtyNameCode = ''
        this.initData()
      } else {
        this.initData()
      }
    },
    initData() {
      this.xuexList = []
      this.queryPamers.pageNum = 1
      this.loadingStatus = 'more'
      this.getList()
    },
    handnianens(num) {
      this.num = num
      // this.initData()
      if (num == 1) {
        this.$refs.picker.open();
        this.$refs.pickers.close();
        this.$refs.picker3.close();
      }
      if (num == 2) {
        this.$refs.pickers.open();
        this.$refs.picker.close();
        this.$refs.picker3.close();
      }
      if (num == 3) {
        this.$refs.picker3.open();
        this.$refs.pickers.close();
        this.$refs.picker.close();
      }
    },
    searchFn() {
      this.initData()
      // this.getList()
    },
    confirm(e) {
      this.queryPamers.foreignLanguageType = e.value[0].value
      this.queryPamers.foreignLanguageTypeVal = e.value[0].label
      this.initData()
    },
    confirms(e) {
      this.queryPamers.mathType = e.value[0].value
      this.queryPamers.mathTypeVal = e.value[0].label
      this.initData()
    },
    getList() {
      uni.showLoading({
        title: '加载中'
      });
      findSpecialtyList(this.queryPamers).then(response => {
        if (response.code === 200) {
          // setTimeout(() => {
          this.xuexList = this.xuexList.concat(response.rows)
          this.total = response.total
          if (this.total <= 10) {
            this.loadingStatus = 'noMore'
          }
          // }, 2000)


        }

      }).catch().finally(() => uni.hideLoading())
    },
    handzydilse(item) {
      let a = item.specialtyMasterName == '专业硕士' ? '专硕' : '学硕'
      let b = item.specialtyAffiliatingSubjecttName == item.specialtyAffiliatingSubjecttName ? '-' : ''
      let zyname
      if (item.specialtyAffiliatingSubjecttName) {
        zyname = a + '-' + item.specialtyAffiliatingCategoryName + '-' + item.specialtyAffiliatingSubjecttName
      } else {
        zyname = a + '-' + item.specialtyAffiliatingCategoryName
      }

      this.$tab.navigateTo('/pageThe/checkthemajor/professional?specialtyName=' + item.specialtyName +
        '&specialtyCode=' + item.specialtyCode + '&specialtyMasterType=' + item.specialtyMasterType +
        '&specialtyAffiliatingCategoryId=' + item.specialtyAffiliatingCategoryId +
        '&specialtyAffiliatingSubjecttId=' + item.specialtyAffiliatingSubjecttId +
        '&zyname=' + zyname + '&isTJ=' + this.isTJ)
    },
    handEmit() {
      this.$tab.navigateBack(1)
    },
    //上拉加载获取更多的限时活动
    async getmoreActives() {
      console.log('loadingStatus', this.loadingStatus)
      if (this.loadingStatus === 'nomore') {
        return false;
      }
      this.loadingStatus = 'loading';
      if (this.xuexList.length < this.total) {
        this.queryPamers.pageNum++
        await this.getList()
      } else {
        this.loadingStatus = 'nomore';
      }
    }
  }
}
</script>

<style lang="scss">
.checkthemajor {
  padding: 30rpx;
  min-height: 100vh;

  .header {
    padding: 0 30rpx 20rpx;
    padding-top: 32rpx;
    position: fixed;
    top: 0rpx;
    left: 0;
    width: 100%;
    background-color: $uni-bg-color-cyan;
    z-index: 999;
  }

  /deep/ .uv-checkbox-group {
    display: block !important;
  }

  /deep/ .uv-checkbox {
    padding: 25rpx 0 !important;
    margin-left: 81rpx !important;
    font-size: 28rpx !important;
    font-weight: 400 !important;
    line-height: 39.2rpx !important;
    color: $uni-text-color !important;
    padding-right: 46rpx !important;
  }

  /deep/ .uv-checkbox__icon-wrap {
    border-radius: 100% !important;
    width: 42rpx !important;
    height: 42rpx !important;
  }

  /deep/ .uv-vtabs__content {
    height: 650rpx !important;
  }

  /deep/ .uv-vtabs__bar-item-active--value {
    color: $uni-color-primary !important;
    font-size: 36rpx !important;
    font-weight: 600 !important;
  }

  /deep/ .uv-vtabs__bar-item--line {
    background-color: $uni-color-primary !important;
  }

  .tabs {
    padding: 34rpx 46rpx;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 28rpx;
    font-weight: 400;
    line-height: 39.2rpx;
    color: $uni-text-color;
    align-items: center;

    .lie {
      display: flex;
    }
  }

  .content {
    .quxqrs {
      height: 142rpx;
      display: flex;
      width: 100%;
      justify-content: space-between;
      position: fixed;
      bottom: 70rpx;
      left: 0;
      z-index: 999999;
      margin: 0 auto;
      padding: 32rpx 30rpx;
      background-color: white;

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
        color: $uni-color-primary;
      }
    }
  }

  .shuliang {
    font-size: 24rpx;
    font-weight: 400;
    color: $uni-text-color;
    padding: 8rpx 15rpx;

    text {
      font-size: 24rpx;
      font-weight: 600;
      color: $uni-text-color-placeholder;
      text-align: left;
      padding: 0 6rpx;
    }
  }

  .conentss {
    padding-top: 252rpx;
    z-index: 1;
    // height: 75vh;
    overflow: auto;

    .zhanyelist {
      padding: 32rpx 16rpx;
      border-radius: 16rpx;
      background: $uni-bg-color;
      margin-bottom: 16rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .type {
        display: flex;
        justify-content: space-between;
        align-items: baseline;

        .zhaunyes {
          font-size: 32rpx;
          font-weight: 600;
          letter-spacing: 0px;
          // line-height: 44.8rpx;
          color: $uni-text-color;
        }

        .zydaimas {
          height: 32rpx;
          padding-left: 10rpx;
          border-radius: 8rpx;
          border: 2rpx solid rgba(252, 81, 95, 1);
          font-size: 24rpx;
          font-weight: 400;
          color: $uni-text-color-placeholder;
          margin-left: 16rpx;
          position: relative;
          display: flex;
          align-items: center;
          white-space: nowrap;

          .masesd {
            margin-left: 10rpx;
            display: inline-block;
            text-align: center;
            height: 30rpx;
            background: url('https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/college/collegeprofile13.png');
            background-size: 100% 100%;
            color: $uni-text-color-inverse;
            padding: 0 10rpx;
            display: flex;
            align-items: center;
            white-space: nowrap;
          }
        }
      }

      // .type {
      //   display: flex;
      //   justify-content: space-between;
      //   flex: 1;
      //   .zhaunyes {
      //     font-size: 32rpx;
      //     font-weight: 600;
      //     letter-spacing: 0px;
      //     line-height: 44.8rpx;
      //     color: $uni-text-color;
      //   }

      //   .zydaimas {
      //     height: 32rpx;
      //     padding-left: 10rpx;
      //     border-radius: 8rpx;
      //     border: 1px solid rgba(252, 81, 95, 1);
      //     font-size: 24rpx;
      //     font-weight: 400;
      //     line-height: 27rpx;
      //     color: $uni-text-color-placeholder;
      //     margin-left: 16rpx;
      //     margin-top: 6rpx;
      //     position: relative;

      //     .masesd {
      //       margin-left: 10rpx;
      //       display: inline-block;
      //       text-align: center;
      //       height: 28rpx;
      //       color: $uni-text-color-inverse;
      //       padding: 0 10rpx;
      //       background: url('https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/college/collegeprofile13.png');
      //       background-size: 100% 100%;
      //     }
      //   }
      // }

      .typezhuanye {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 16rpx;

        .lefts {
          width: 80%;
          font-size: 26rpx;
          font-weight: 400;
          letter-spacing: 0px;
          color: $uni-text-color-grey;
          @include overline(1);
        }

        .rights {
          text {
            color: $uni-text-color-placeholder;
            font-size: 26rpx;
            margin-right: 8rpx;
          }

          font-size: 24rpx;
          font-weight: 400;
          color: $uni-text-color;
          text-align: center;
          vertical-align: top;
        }
      }
    }
  }
}
</style>