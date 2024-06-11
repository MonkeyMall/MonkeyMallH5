<template>
  <view class="containers">
    <view class="header">
      <uni-easyinput @focus="is_Speech = true" prefixIcon="search" v-model="schoolName" placeholder="请输入学校名称"
        :suffixIcon="closeIcon" @iconClick="clear" @confirm="handxenamse"></uni-easyinput>
      <view class="tabs">
        <view class="lie" @click="handaddress()">所在地区<view style="margin-left: 8rpx;"><uni-icons type="bottom"
              size="20"></uni-icons>
          </view>
        </view>
        <view class="lie" @click="handfenls()">所属门类<view style="margin-left: 8rpx;"><uni-icons type="bottom"
              size="20"></uni-icons>
          </view>
        </view>
        <view class="lie" @click="handyuanxs()">院校特色<view style="margin-left: 8rpx;"><uni-icons type="bottom"
              size="20"></uni-icons>
          </view>
        </view>
      </view>
    </view>
    <view class="Uls" v-if="xuexList.length != 0">
      <view class="Lis" @click="handtoinstiu(item)" v-for="(item, index) in xuexList" :key="index">
        <image :src="item.schoolLogo ? COS_CDN_PREFIX_http + item.schoolLogo : defaultImg.schoolImg" />
        <view style="width: 78%;">
          <view class="xiaox">
            <text class="xiaoxs">{{ item.sn || item.schoolName }}</text>
            <view class="dizhi"> <uni-icons style="margin-right: 10rpx;" type="location" size="12"
                color="rgba(153, 153, 153, 1);"></uni-icons>
              <dict-tag v-if="item.schoolRegion == 'major_school_aq'" :options="dict.type.major_school_aq"
                :value="item.schoolAffiliatingArea" />
              <dict-tag v-if="item.schoolRegion == 'major_school_bq'" :options="dict.type.major_school_bq"
                :value="item.schoolAffiliatingArea" />
            </view>
          </view>
          <!-- 高等院校 <text style="margin: 0 6rpx;"> | </text> -->
          <view class="fenxs"><dict-tag :options="dict.type.major_school_type" :value="item.schoolType" />
          </view>
          <view class="dengjis">
            <dict-tag v-if="item.schoolProperty" :options="dict.type.major_school_property"
              :value="item.schoolProperty.split(',')" />
          </view>
        </view>

      </view>
      <uni-load-more :status="loadingStatus"></uni-load-more>
    </view>
    <uv-popup ref="popup">
      <view class="content">
        <uv-vtabs :chain="chain" :list="dict.type.major_school_region" keyName="label"
          :barItemBadgeStyle="{ right: '20px', top: '12px' }" height="800rpx" @change="change()">
          <uv-vtabs-item>
            <view>
              <uv-checkbox-group v-model="checkboxValue" iconPlacement="right" activeColor="rgba(252, 81, 95, 1)">
                <uv-checkbox v-if="ABindex == 0" :customStyle="{ marginBottom: '8px' }"
                  v-for="dict in dict.type.major_school_aq" :key="dict.value" :label="dict.label"
                  :name="dict.value"></uv-checkbox>

                <uv-checkbox v-if="ABindex == 1" :customStyle="{ marginBottom: '8px' }"
                  v-for="dict in dict.type.major_school_bq" :key="dict.value" :label="dict.label"
                  :name="dict.value"></uv-checkbox>
                <uv-checkbox v-if="ABindex == 2" :customStyle="{ marginBottom: '8px' }"
                  v-for="dict in dict.type.major_school_qt" :key="dict.value" :label="dict.label"
                  :name="dict.value"></uv-checkbox>
              </uv-checkbox-group>
            </view>
          </uv-vtabs-item>
        </uv-vtabs>
        <view class="quxqrs">
          <view class="quss" @click="handopess">
            取消
          </view>
          <view class="" @click="diquconfirm">
            确认
          </view>
        </view>
      </view>
    </uv-popup>
    <uv-popup ref="popups">
      <view class="content">
        <view style="height:800rpx;overflow: auto;">
          <uv-checkbox-group v-model="schooltypeValue" iconPlacement="right" activeColor="rgba(252, 81, 95, 1)">
            <uv-checkbox :customStyle="{ marginBottom: '8px' }" v-for="dict in dict.type.major_school_type"
              :key="dict.value" :label="dict.label" :name="dict.value"></uv-checkbox>
          </uv-checkbox-group>
        </view>
        <view class="quxqrs">
          <view class="quss" @click="handopesss">
            取消
          </view>
          <view class="" @click="confirms">
            确认
          </view>
        </view>
      </view>
    </uv-popup>
    <uv-popup ref="popupss">
      <view class="content">
        <view style="height:600rpx;overflow: auto;">
          <uv-checkbox-group v-model="schoolpropertyValue" iconPlacement="right" activeColor="rgba(252, 81, 95, 1)">
            <uv-checkbox :customStyle="{ marginBottom: '8px' }" v-for="dict in dict.type.major_school_property"
              :key="dict.value" :label="dict.label" :name="dict.value"></uv-checkbox>
          </uv-checkbox-group>
        </view>
        <view class="quxqrs">
          <view class="quss" @click="handopessss">
            取消
          </view>
          <view class="" @click="confirmss">
            确认
          </view>
        </view>
      </view>
    </uv-popup>
    <dEfaultpage v-if="xuexList.length == 0" value="" tic="暂无数据" mt="0"></dEfaultpage>
    <uni-xunfei :is_Speech="is_Speech" initFn="handxenamse" keyWordName="checkcolleges"
      @searchKey="(val) => schoolName = val"></uni-xunfei>
  </view>
</template>

<script>
import dEfaultpage from '@/pageSec/components/uni-default-page/uni-default-page.vue';
import {
  findAllSchoolPage,
} from "@/api/colleges/index"
// import uvPopup from '@/pageSec/components/uv-popup/components/uv-popup/uv-popup.vue'
import uvVtabs from '@/pageSec/components/uv-vtabs/components/uv-vtabs/uv-vtabs.vue'
import uvVtabsItem from '@/pageSec/components/uv-vtabs/components/uv-vtabs-item/uv-vtabs-item.vue'
import uvCheckbox from '@/pageSec/components/uv-checkbox/components/uv-checkbox/uv-checkbox.vue'
// import uvCheckboxGroup from '@/pageSec/components/uv-checkbox/components/uv-checkbox-group/uv-checkbox-group.vue'
import uniIcons from '@/pageSec/components/uni-icons/components/uni-icons/uni-icons.vue'
import uniEasyinput from "@/pageSec/components/uni-easyinput/components/uni-easyinput/uni-easyinput.vue"
import config from '@/config/index'
export default {
  components: {
    uniEasyinput,
    dEfaultpage,
    // uvPopup,
    uvVtabs,
    uvCheckbox,
    // uvCheckboxGroup,
    uniIcons,
    uvVtabsItem
  },
  dicts: ['major_school_aq', 'major_school_bq', 'major_school_region', 'major_school_type', 'major_school_property'],
  data() {
    return {
      COS_CDN_PREFIX_http: config.COS_CDN_PREFIX_http,
      defaultImg: this.$defaultImg,
      chain: false,
      ABindex: 0,
      majorschool: "", //地区区域
      checkboxValue: [], //选择的地区
      schooltypeValue: [], //类型
      schoolpropertyValue: [], //属性
      xuexList: [],
      schoolName: '',
      pageNum: 1,
      pageSize: 10,
      total: 0,
      //定义加载方式 more---contentdown  loading---contentrefresh nomore---contentnomore
      loadingStatus: 'more',
      closeIcon: '',

      is_Speech: false
    }
  },
  watch: {
    schoolName(n, o) {
      if (!n) {
        this.closeIcon = ''
      } else {
        this.closeIcon = 'close'
      }
    }
  },
  computed: {},
  onLoad() {
    uni.showLoading({
      title: '加载中'
    });
  },
  onShow() {
    this.initData()

  },
  onReachBottom() {
    console.log('触发2')
    //上拉加载请求更多数据
    this.getmoreActives();
  },

  onShareAppMessage(options) {
    // 返回分享的内容
    return {
      title: '查院校',
      path: '/pageSec/checkcolleges/index',
    };
  },
  methods: {
    getList(schoolName) {
      let data = {
        schoolName: schoolName || this.schoolName, //学校名称
        schoolRegion: this.majorschool, //学校区域
        schoolAffiliatingArea: this.checkboxValue.toString(), //学校地区
        schoolType: this.schooltypeValue.toString(), //学校类型
        schoolProperty: this.schoolpropertyValue.toString(), //学校属性
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      findAllSchoolPage(data).then(response => {
        if (response.code === 200) {
          uni.hideLoading();
          this.xuexList = this.xuexList.concat(response.rows)
          this.total = response.total
          if (this.total <= 10) {
            this.loadingStatus = 'nomore'
          }
          console.log(this.xuexList)
        }

      })
    },
    initData(schoolName) {
      this.pageNum = 1
      this.xuexList = []
      this.loadingStatus = 'more'
      this.getList(schoolName)
    },
    // 输入学校名称
    handxenamse(schoolName) {
      this.initData(schoolName)
      // this.getList(schoolName)
    },
    clear(e) {

      console.log('zx', e)
      if (e === 'suffix') {
        this.schoolName = ''
        this.initData()
      } else {
        this.initData()
      }
    },
    // 选择地区
    change(index) {
      console.log('index: ', index);
      this.initData()
      this.checkboxValue = []
      this.ABindex = index
      this.majorschool = this.dict.type.major_school_region[index].value
    },
    // 所在地区
    handaddress() {
      // this.initData()
      this.$refs.popup.open('top');
    },
    diquconfirm() {
      // this.getList()
      this.initData()
      this.$refs.popup.close()
    },
    handopess() {
      this.$refs.popup.close()
    },
    // 所属门类
    handfenls() {
      // this.initData()
      this.$refs.popups.open('top');
    },
    confirms() {
      // this.getList()
      this.initData()
      // console.log(this.schooltypeValue)
      this.$refs.popups.close()
    },
    handopesss() {
      this.$refs.popups.close()
    },
    // 院校属性
    handyuanxs() {
      this.pageNum = 1
      // this.xuexList = []
      this.$refs.popupss.open('top');
    },
    handopessss() {
      this.$refs.popupss.close()
    },
    confirmss() {
      // this.getList()
      this.initData()
      this.$refs.popupss.close()
    },
    handEmit() {
      this.$tab.navigateBack(1)
    },
    handtoinstiu(item) {
      this.$tab.navigateTo('/pageThe/checkcolleges/Institutiondetails?id=' + (item.sId || item.schoolId))
    },
    //上拉加载获取更多的限时活动
    async getmoreActives() {
      console.log('loadingStatus', this.loadingStatus)
      if (this.loadingStatus === 'nomore') {
        return false;
      }
      this.loadingStatus = 'loading';
      console.log(this.xuexList.length, 'this.xuexList.length')
      if (this.xuexList.length < this.total) {
        this.pageNum++
        await this.getList()
      } else {
        this.loadingStatus = 'nomore';
      }
    }
  }
}
</script>

<style lang="scss">
.containers {
  min-height: 100vh;
  background-color: $uni-bg-color-cyan;
  padding: 32rpx 30rpx;

  .header {
    padding: 0 30rpx;
    padding-top: 32rpx;
    position: fixed;
    top: 0rpx;
    left: 0;
    width: 100%;
    background-color: $uni-bg-color-cyan;
    z-index: 999;
  }

  /deep/ .uni-easyinput {
    padding: 0 14rpx !important;
  }

  /deep/ .uni-easyinput__content {
    border: none !important;
    border-radius: 32rpx !important;
  }

  /deep/ .content-clear-icon {
    padding: 0 23rpx !important;
  }

  /deep/ .uniui-search {
    font-size: 34rpx !important;
  }

  /deep/ .uniui-clear {
    display: none !important;
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
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 28rpx;
    font-weight: 400;
    line-height: 39.2rpx;
    color: $uni-text-color;
    align-items: center;
    padding: 34rpx 14rpx;

    .lie {
      display: flex;
    }
  }

  .Uls {
    padding-top: 175rpx;
    z-index: 1;

    .Lis {
      padding: 24rpx 0;
      width: 100%;
      border-radius: 16rpx;
      background: $uni-bg-color;
      display: flex;
      margin-top: 16rpx;
      align-items: center;

      image {
        display: block;
        width: 92rpx;
        height: 92rpx;
        margin-left: 22rpx;
        margin-right: 22rpx;
        border-radius: 100%;
      }

      .xiaox {
        display: flex;

        .xiaoxs {
          display: block;
          font-size: 28rpx;
          font-weight: 600;
          line-height: 39.2rpx;
          color: $uni-text-color;
        }

        .dizhi {
          display: flex;
          margin-left: auto;
          font-size: 24rpx;
          font-weight: 400;
          line-height: 30.8rpx;
          color: $uni-text-color-grey;
          margin-right: 16rpx;
        }
      }

      .fenxs {
        font-size: 26rpx;
        margin-top: 8rpx;
        font-weight: 400;
        line-height: 33.6rpx;
        color: $uni-text-color-grey;
        display: flex;

        ._span {
          margin-right: 8rpx;
        }
      }

      .dengjis {
        ._div {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
        }

        ._span {
          display: block;
          padding: 5rpx 16rpx;
          border-radius: 8rpx;
          font-size: 22rpx;
          font-weight: 600;
          letter-spacing: 0px;
          margin-right: 8rpx;
          margin-top: 8rpx;
        }

        dict-tag ._div ._span:nth-child(1) {
          background-color: rgba(255, 141, 26, 0.12);
          color: rgba(255, 141, 26, 1);
        }

        dict-tag ._div ._span:nth-child(2) {
          background-color: #e6ecfd;
          color: rgba(53, 104, 245, 1);
        }

        dict-tag ._div ._span:nth-child(3) {
          background-color: rgba(0, 186, 173, 0.12);
          color: rgba(0, 186, 173, 1);
        }

        dict-tag ._div ._span:nth-child(4) {
          background-color: #fde2e2;
          color: #f56c6c;
        }

        dict-tag ._div ._span:nth-child(5) {
          background-color: #e1f3d8;
          color: #67c23a;
        }
      }
    }
  }

  .content {
    .quxqrs {
      // height: 142rpx;
      display: flex;
      width: 100%;
      justify-content: space-between;
      // position: fixed;
      // bottom: 0rpx;
      // left: 0;
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

  /deep/ .uv-safe-bottom {
    padding-bottom: 0 !important;
  }

  /deep/ .vue-ref {
    border-radius: 0 0 16rpx 16rpx !important;
    overflow: hidden !important;
  }

  /deep/ .uv-overlay {
    border-radius: 0 !important;
  }

  /deep/ .uv-checkbox-group {
    display: block !important;
    padding-bottom: 50rpx !important;
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
}
</style>