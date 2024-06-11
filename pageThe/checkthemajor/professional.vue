<template>
  <uni-self-header :boxHeight="80" :title="title" :linearColor="linearColor" :hasBack="true" ref="headerSelf">
    <view class="containerss">
      <view class="zhanyelist">
        <view class="type">
          <view class="zhaunyes">
            {{ quertParems.specialtyName }}
          </view>
          <view class="zydaimas">
            专业代码
            <text class="masesd">{{ quertParems.specialtyCode }}</text>
          </view>
        </view>
        <view class="typezhuanyes">
          <view class="typezhuanye">
            {{ zyname }}
          </view>
          <view class="right" v-if="AI == 1" @click="editPurpose">
            <text style="margin-right: 10rpx;">修改意向</text>
            <i class="iconfont">&#xe614;</i>
          </view>
        </view>
      </view>
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
      <view class="Uls">
        <template v-if="addersslistL.length">
          <view class="Lis" @click="handtoinstiu(item)" v-for="(item, index) in addersslistL" :key="index">
            <view class="topse">
              <image :src="item.schoolLogo ? COS_CDN_PREFIX_http + item.schoolLogo : defaultImg.schoolImg" />
              <!-- <image
                  :src=item.schoolLogo
                  mode=""
                ></image> -->
              <view style="width: 78%;">
                <view class="xiaox">
                  <text class="xiaoxs">{{ item.schoolName }}</text>
                  <view class="dizhi" v-if="isTJ == 0 || isTJ == 2">
                    <uni-icons style="margin-right: 10rpx;" type="location" size="12"
                      color="rgba(153, 153, 153, 1);"></uni-icons>
                    <dict-tag v-if="item.schoolRegion == 'major_school_aq'" :options="dict.type.major_school_aq"
                      :value="item.schoolAffiliatingArea" />
                    <dict-tag v-if="item.schoolRegion == 'major_school_bq'" :options="dict.type.major_school_bq"
                      :value="item.schoolAffiliatingArea" />
                  </view>
                  <view class="dizhi" v-if="isTJ == 1">
                    <text class="dizhi_left">调剂人数</text>
                    <text class="dizhi_number">{{ item.adjustNum || 0 }}</text>
                  </view>
                </view>
                <!-- 高等院校 <text style="margin: 0 6rpx;"> | </text> -->
                <view class="fenxs"><dict-tag :options="dict.type.major_school_type" :value="item.schoolType" />
                </view>
                <view class="dengjis">
                  <dict-tag :options="dict.type.major_school_property" :value="item.schoolProperty.split(',')" />
                </view>
              </view>
            </view>
            <view class="AIsdas" v-if="AI == 1">
              <view class="AIsuosd">
                <text>{{ item.collegeName || "-" }}</text>
                <text style="margin-top: 8rpx;color:rgba(153, 153, 153, 1);font-weight: 400;">所属院系</text>
              </view>
              <view class="AIsuosd">
                <text>{{ item.totalScore || "-" }}</text>
                <text style="margin-top: 8rpx;color:rgba(153, 153, 153, 1);font-weight: 400;">2023年复试分数线</text>
              </view>
              <view class="AIsuosd">
                <text>{{ item.minScore == 0 ? '0' : (item.minScore || "-") }}</text>
                <text style="margin-top: 8rpx;color:rgba(153, 153, 153, 1);font-weight: 400;">2023年录取最低分</text>
              </view>
            </view>
          </view>
        </template>
        <uni-default-page v-if="addersslistL.length == 0 && isShowdEfaultpage" value="4" tic="暂无数据"></uni-default-page>
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
          <view style="height:800rpx;overflow: auto;">
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
    </view>
  </uni-self-header>
</template>

<script>
import {
  findSchoolBySpecialty, AifindAIChooseSchool
} from "@/api/colleges/index"
import uniIcons from '@/pageThe/components/uni-icons/components/uni-icons/uni-icons.vue'
import uvPopup from '@/pageThe/components/uv-popup/components/uv-popup/uv-popup.vue'
import uvVtabs from '@/pageThe/components/uv-vtabs/components/uv-vtabs/uv-vtabs.vue'
import uvVtabsItem from '@/pageThe/components/uv-vtabs/components/uv-vtabs-item/uv-vtabs-item.vue'
import uvCheckbox from '@/pageThe/components/uv-checkbox/components/uv-checkbox/uv-checkbox.vue'
import uvCheckboxGroup from '@/pageThe/components/uv-checkbox/components/uv-checkbox-group/uv-checkbox-group.vue'
import uniDefaultPage from '@/pageThe/components/uni-default-page/uni-default-page.vue';
import config from '@/config/index'
export default {
  components: {
    uniIcons,
    uvPopup,
    uvVtabs,
    uvVtabsItem,
    uvCheckbox,
    uvCheckboxGroup,
    uniDefaultPage
  },
  dicts: ['major_school_aq', 'major_school_bq', 'major_school_region', 'major_school_type', 'major_school_property'],
  data() {
    return {
      isShowdEfaultpage: false,
      COS_CDN_PREFIX_http: config.COS_CDN_PREFIX_http,
      defaultImg: this.$defaultImg,
      title: "查专业",
      linearColor: 'linear-gradient(to bottom,rgba(255, 232, 227, 1),rgba(255, 255, 255, 1))',
      pageTop: 0,
      AI: "",
      zyname: "",
      quertParems: {
        specialtyCode: "", //代码
        specialtyName: "", //名称
        specialtyAffiliatingSubjecttId: "", //所属一级学科	
        specialtyMasterType: "", //硕士类型	
        specialtyAffiliatingCategoryId: "", //所属门类	
        schoolRegion: "", //所在区域	
        schoolAffiliatingArea: "", //所在地区	
        schoolType: "", //学校类型
        schoolProperty: "", //学校属性
        startScore: "",
        endScore: "",
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      chain: false,
      ABindex: 0,
      majorschool: "", //地区区域
      checkboxValue: [], //选择的地区
      schooltypeValue: [], //类型
      schoolpropertyValue: [], //属性
      addersslistL: [],
      isTJ: 0, //是否是从调剂页面跳过来
      loadingStatus: 'more',
    }
  },
  onShow() {
  },
  onLoad(data) {

    console.log('传递的参数', data)
    this.isTJ = data.isTJ
    if (data.AI) {
      this.title = '获取结果'
      this.AI = data.AI
      this.quertParems.specialtyCode = data.specialtyCode
      this.quertParems.specialtyName = data.specialtyName
      this.quertParems.specialtyMasterType = data.specialtyMasterType
      this.quertParems.specialtyAffiliatingCategoryId = data.specialtyAffiliatingCategoryId
      this.quertParems.specialtyAffiliatingSubjecttId = data.specialtyAffiliatingSubjecttId
      this.quertParems.startScore = data.startScore
      this.quertParems.endScore = data.endScore
      this.quertParems.schoolAffiliatingArea = data.schoolAffiliatingArea
      this.quertParems.schoolRegion = data.schoolRegion
      this.majorschool = data.schoolRegion
      this.schoolAffiliatingArea = data.schoolAffiliatingArea
      this.zyname = data.zyname
      console.log('请求参数', this.quertParems)
    } else if (data.specialtyCode) {
      this.title = '查专业'
      this.quertParems.specialtyCode = data.specialtyCode
      this.quertParems.specialtyName = data.specialtyName
      this.quertParems.specialtyMasterType = data.specialtyMasterType
      this.quertParems.specialtyAffiliatingCategoryId = data.specialtyAffiliatingCategoryId
      this.quertParems.specialtyAffiliatingSubjecttId = data.specialtyAffiliatingSubjecttId
      this.zyname = data.zyname
    }
    if (data.title) {
      uni.setNavigationBarTitle({
        title: data.title
      })
    }
    this.getUser()
  },
  mounted() {
    this.pageTop = this.$refs.headerSelf.obj?.pageTop || 0
  },
  onReachBottom() {
    console.log('触发2')
    //上拉加载请求更多数据
    this.getmoreActives();
  },
  methods: {
    handtoinstiu(item) {
      // if (this.isTJ == 1) {
      //   // 如果是从调剂页面跳过来，直接去学校详情页
      //   this.$tab.navigateTo('/pageThe/checkthemajor/aprofessionaldetails?schoolId=' +
      //     item.schoolId + '&specialtyId=' + item.specialtyId)
      // } else {
      //   // 否则
      //   this.$tab.navigateTo('/pageThe/checkcolleges/Institutiondetails?id=' + item.schoolId + '&specialtyAffiliatingCategoryId=' + this.quertParems.specialtyAffiliatingCategoryId + '&specialtyName=' + this.quertParems.specialtyName + '&specialtyMasterType=' + this.zyname.specialtyMasterType)
      // }

      // isTJ 0-查专业 1-调剂页 2-AI择校
      if (this.isTJ == 2) {
        this.$tab.navigateTo('/pageThe/checkcolleges/Institutiondetails?id=' + item.schoolId + '&specialtyAffiliatingCategoryId=' + this.quertParems.specialtyAffiliatingCategoryId + '&specialtyName=' + this.quertParems.specialtyName + '&specialtyMasterType=' + this.zyname.specialtyMasterType)
      } else {
        this.$tab.navigateTo(`/pageThe/checkthemajor/aprofessionaldetails?schoolId=${item.schoolId}&specialtyId=${item.specialtyId}&isTJ=${this.isTJ}`)
      }
    },
    // 选择地区
    change(index) {
      this.ABindex = index
      this.majorschool = this.dict.type.major_school_region[index].value
    },
    handaddress() {
      this.$refs.popup.open('top');
    },
    diquconfirm() {
      if (this.quertParems.schoolAffiliatingArea) {
        this.majorschool = this.dict.type.major_school_region[this.ABindex].value
      } else {
        this.majorschool = ''
      }
      this.initData()
      this.$refs.popup.close()
    },
    handopess() {
      this.$refs.popup.close()
    },
    // 所属门类
    handfenls() {
      this.$refs.popups.open('top');
    },
    confirms() {
      this.initData()
      this.$refs.popups.close()
    },
    handopesss() {
      this.$refs.popups.close()
    },
    // 院校属性
    handyuanxs() {
      this.$refs.popupss.open('top');
    },
    handopessss() {
      this.$refs.popupss.close()
    },
    confirmss() {
      this.initData()
      this.$refs.popupss.close()
    },

    handback() {
      this.$tab.navigateBack(1)
    },
    getUser() {
      uni.showLoading({
        title: '加载中'
      });
      if (this.AI) {
        this.quertParems.schoolRegion = this.majorschool
        this.quertParems.schoolAffiliatingArea = this.checkboxValue.toString() || this.schoolAffiliatingArea//学校地区
      } else {
        this.quertParems.schoolRegion = this.majorschool
        this.quertParems.schoolAffiliatingArea = this.checkboxValue.toString()//学校地区
      }

      this.quertParems.schoolType = this.schooltypeValue.toString() //学校类型
      this.quertParems.schoolProperty = this.schoolpropertyValue.toString() //学校属性	
      if (!this.AI) {
        findSchoolBySpecialty(this.quertParems).then(response => {
          if (response.code === 200) {
            if (response.rows && response.rows.length > 0) {
              this.isShowdEfaultpage = false
              this.addersslistL = this.addersslistL.concat(response.rows)
              this.total = response.total
              if (this.total <= 10) {
                this.loadingStatus = 'noMore'
              }
            } else {
              this.isShowdEfaultpage = true
            }
          }
        }).catch().finally(() => uni.hideLoading())
      } else {
        AifindAIChooseSchool(this.quertParems).then(response => {
          if (response.rows && response.rows.length > 0) {
            this.isShowdEfaultpage = false
            this.addersslistL = response.rows
          } else {
            this.isShowdEfaultpage = true
          }
        }).catch().finally(() => uni.hideLoading())
      }
    },
    // 修改意向
    editPurpose() {
      this.$tab.navigateBack()
    },
    //上拉加载获取更多的限时活动
    async getmoreActives() {
      console.log('loadingStatus', this.loadingStatus)
      if (this.loadingStatus === 'nomore') {
        return false;
      }
      this.loadingStatus = 'loading';
      if (this.addersslistL.length < this.total) {
        this.quertParems.pageNum++
        await this.getUser()
      } else {
        this.loadingStatus = 'nomore';
      }
    },
    initData() {
      this.addersslistL = []
      this.quertParems.pageNum = 1
      this.loadingStatus = 'more'
      this.getUser()
    }
  }
}
</script>

<style lang="scss" scoped>
.containerss {
  padding: 0 30rpx;
  box-sizing: border-box;
}

.zhanyelist {
  width: 100%;
  padding: 0 32rpx;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .type {
    display: flex;
    align-items: center;

    .zhaunyes {
      font-size: 32rpx;
      font-weight: 600;
      letter-spacing: 0px;
      line-height: 44.8rpx;
      color: $uni-text-color;
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap; // 默认不换行
    }

    .zydaimas {
      height: 32rpx;
      padding-left: 10rpx;
      border-radius: 8rpx;
      border: 1px solid rgba(252, 81, 95, 1);
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

  .typezhuanyes {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20rpx;

    .typezhuanye {
      font-size: 26rpx;
      font-weight: 400;
      letter-spacing: 0px;
      color: $uni-text-color;
    }

    .right {
      font-size: 28rpx;
      color: rgba(0, 0, 0, 1);
      display: flex;
      align-items: center;
    }

    .iconfont {
      font-size: 35rpx;
      color: $uni-text-color-placeholder;
    }
  }
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
  height: 44px;
  line-height: 44px;
  padding: 0 32rpx;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 28rpx;
  font-weight: 400;
  color: $uni-text-color;
  align-items: center;

  .lie {
    display: flex;
  }
}

.Uls {
  overflow-x: scroll;
  padding-bottom: 32rpx;

  .Lis {
    border-radius: 16rpx;
    width: 100%;
    background: $uni-bg-color;
    margin-bottom: 32rpx;
    padding: 24rpx 6rpx;

    .topse {
      display: flex;
    }

    image {
      display: block;
      width: 92rpx;
      height: 92rpx;
      margin-left: 22rpx;
      margin-right: 22rpx;
      margin-top: 20rpx;
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

        .dizhi_number {
          margin-left: 10rpx;
          color: rgba(51, 51, 51, 1);
        }
      }
    }

    .fenxs {
      font-size: 26rpx;
      margin-top: 8rpx;
      font-weight: 400;
      line-height: 33.6rpx;
      color: $uni-text-color-grey;
      display: flex;

      /deep/._span {
        margin-right: 8rpx;
      }
    }

    .dengjis {
      /deep/._div {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
      }

      /deep/._span {
        display: block;
        padding: 5rpx 16rpx;
        border-radius: 8rpx;
        font-size: 22rpx;
        font-weight: 600;
        letter-spacing: 0px;
        margin-right: 8rpx;
        margin-top: 8rpx;
      }

      /deep/ dict-tag ._div ._span:nth-child(1) {
        background-color: rgba(255, 141, 26, 0.12);
        color: rgba(255, 141, 26, 1);
      }

      /deep/ dict-tag ._div ._span:nth-child(2) {
        background-color: #e6ecfd;
        color: rgba(53, 104, 245, 1);
      }

      /deep/ dict-tag ._div ._span:nth-child(3) {
        background-color: rgba(0, 186, 173, 0.12);
        color: rgba(0, 186, 173, 1);
      }

      /deep/ dict-tag ._div ._span:nth-child(4) {
        background-color: #fde2e2;
        color: #f56c6c;
      }

      /deep/ dict-tag ._div ._span:nth-child(5) {
        background-color: #e1f3d8;
        color: #67c23a;
      }
    }

    .AIsdas {
      width: 100%;
      border-top: 2rpx solid rgba(246, 248, 253, 1);
      margin-top: 32rpx;
      padding-top: 24rpx;
      display: flex;
      justify-content: space-between;

      .AIsuosd {
        width: 33.3%;

        text {
          display: block;
          width: 100%;
          text-align: center;
          font-size: 26rpx;
          font-weight: 600;
          line-height: 33.6rpx;
          color: $uni-text-color;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
}

.content {
  .quxqrs {
    height: 142rpx;
    display: flex;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    bottom: 0rpx;
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

/deep/ .uv-checkbox-group {
  display: block !important;
  padding-bottom: 150rpx !important;
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
  width: 44rpx !important;
  height: 44rpx !important;
}

/deep/ .uv-vtabs__content {
  height: 650rpx !important;
}

/deep/ .uv-popup__content {
  padding-top: 150rpx !important;
}
</style>