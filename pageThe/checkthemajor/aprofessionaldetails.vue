<template>
  <view class="checkthemajor">
    <view class="header">
      <view class="Lis">
        <image :src="schooldata.schoolLogo ? COS_CDN_PREFIX_http + schooldata.schoolLogo : defaultImg.schoolImg" />
        <view>
          <view class="xiaox">
            {{ schooldata.schoolName }}
            <view class="zydaimas">
              专业代码
              <view class="masesd">{{ specialtyIddata.specialtyCode }}</view>
            </view>
          </view>
          <view class="fenxs">
            <!-- <dict-tag
            :options="dict.type.major_school_type"
            :value="schooldata.schoolType"
          /> -->
            全日制
            <text style="margin: 0 5rpx;"> |</text>
            {{ specialtyIddata.specialtyName }}
            <!-- <dict-tag
            v-if="schooldata.schoolRegion == 'major_school_aq'"
            :options="dict.type.major_school_aq"
            :value="schooldata.schoolAffiliatingArea"
          /> -->
            <dict-tag v-if="schooldata.schoolRegion == 'major_school_bq'" :options="dict.type.major_school_bq"
              :value="schooldata.schoolAffiliatingArea" />
          </view>
          <view class="dengjis">
            <dict-tag :options="dict.type.major_school_property" :value="schooldata.schoolProperty" />
          </view>
        </view>
      </view>
      <view class="tab-container">
        <view class="tab-container-center">
          <view v-for="(tab, index) in list" :key="index" class="tab-item" :class="{ active: currentIndex === index }"
            @click="switchTab(index)">
            {{ tab.label }}
            <view v-show="currentIndex === index" class="active-line"></view>
          </view>
        </view>
      </view>
    </view>

    <view class="tab-content">
      <view class="tabsa" v-show="currentIndex === 0">
        <view class="h1">
          <view class="borleds"></view>
          <view class="titless">专业解读 </view>
        </view>
        <view class="textp">
          <uv-parse :content="specialtyIddata.introduction"></uv-parse>
          <!-- {{specialtyIddata.introduction}} -->
        </view>
      </view>
      <text class="zhsi" v-if="currentIndex == 0">*注：不同院校的课程设置可能不同。</text>
      <!-- 0专业简介 1考试科目 2报录情况 3分数线 4专业老师 5调剂方向 6研究方向 7复试方法 8录取名单-->
      <bExaminationsubject v-if="currentIndex === 1" :schoolId='schoolId' :specialtyId='specialtyId'>
      </bExaminationsubject>
      <cReportsituation v-if="currentIndex === 2" :schoolId='schoolId' :specialtyId='specialtyId'>
      </cReportsituation>
      <dGradethreshold v-if="currentIndex === 3" :schoolId='schoolId' :specialtyId='specialtyId'>
      </dGradethreshold>
      <eProfessionalteacher v-if="currentIndex === 4" :schoolId='schoolId' :specialtyId='specialtyId'>
      </eProfessionalteacher>
      <fAdjustmentdirection v-if="currentIndex === 5" :schoolId='schoolId' :specialtyId='specialtyId'>
      </fAdjustmentdirection>
      <gResearchdirection v-if="currentIndex === 6" :schoolId='schoolId' :specialtyId='specialtyId'>
      </gResearchdirection>
      <hRetestmethod v-if="currentIndex === 7" :schoolId='schoolId' :specialtyId='specialtyId'></hRetestmethod>
      <iAdmissionlist v-if="currentIndex === 8" :schoolId='schoolId' :specialtyId='specialtyId'>
      </iAdmissionlist>
      <text class="zhsi" v-if="currentIndex != 0">*注：数据信息请以院校公布为准。</text>
    </view>
  </view>
</template>

<script>
import bExaminationsubject from './bexaminationsubject.vue';
import cReportsituation from './creportsituation.vue';
import dGradethreshold from './dgradethreshold.vue';
import eProfessionalteacher from './eprofessionalteacher.vue';
import fAdjustmentdirection from './fadjustmentdirection.vue';
import gResearchdirection from './gresearchdirection.vue';
import hRetestmethod from './hretestmethod.vue';
import iAdmissionlist from './iadmissionlist.vue';
import {
  schoolMessage,
  schoolSpecialty
} from "@/api/colleges/index"
import config from '@/config/index'
export default {
  components: {
    bExaminationsubject,
    cReportsituation,
    dGradethreshold,
    eProfessionalteacher,
    fAdjustmentdirection,
    gResearchdirection,
    hRetestmethod,
    iAdmissionlist,
  },
  dicts: ['major_school_aq', 'major_school_bq', 'major_school_region', 'major_school_type', 'major_school_property','sys_school_detail_control'],
  data() {
    return {
      COS_CDN_PREFIX_http: config.COS_CDN_PREFIX_http,
      defaultImg: this.$defaultImg,
      schoolId: "30",
      specialtyId: "12",
      schooldata: {},
      specialtyIddata: {},
      currentIndex: 0,
      list: []
    }
  },
  onLoad(data) {
    this.schoolId = data.schoolId
    this.specialtyId = data.specialtyId
    //0-查专业 1-调剂页
    this.list = this.dict.type.sys_school_detail_control
    console.log(this.list,'this.list');
    if (data.isTJ == 0) this.currentIndex = 0
    else this.currentIndex = 5
    this.getUser()
    this.handschoolSpecialty()

  },
  onShow() { },
  methods: {
    getUser() {
      schoolMessage(this.schoolId).then(response => {
        this.schooldata = response.data
        this.schooldata.schoolProperty = this.schooldata.schoolProperty.split(',')
      })
    },
    handschoolSpecialty() {
      schoolSpecialty(this.specialtyId).then(response => {
        this.specialtyIddata = response.data
      })
    },
    switchTab(index) {
      this.currentIndex = index;
    },
  }
}
</script>

<style lang="scss">
.checkthemajor {
  padding: 0 30rpx;
  padding-bottom: 60rpx;
  background-color: $uni-bg-color-cyan;

  .header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;

    .Lis {
      width: 100%;
      display: flex;
      align-items: center;
      padding-bottom: 35rpx;
      background-color: $uni-bg-color;
      padding-left: 52rpx;

      image {
        display: block;
        width: 92rpx;
        height: 92rpx;
        margin-right: 22rpx;
        border-radius: 100%;
      }

      .xiaox {
        color: $uni-text-color;
        font-size: 32rpx;
        font-weight: 600;
        display: flex;
        align-items: center;

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

      .fenxs {
        display: flex;
        font-size: 26rpx;
        margin-top: 8rpx;
        font-weight: 400;
        line-height: 33.6rpx;
        color: $uni-text-color-grey;
        margin-bottom: 8rpx;

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

    .tab-container {
      background-color: $uni-bg-color-cyan;
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
      padding: 0 30rpx;
    }

    .tab-container-center {
      margin-top: 40rpx;
    }

    .tab-item {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      position: relative;
      font-size: 28rpx;
      font-weight: 600;
      letter-spacing: 0px;
      line-height: 39.2rpx;
      color: $uni-text-color;
      padding: 0 15rpx;
      margin-bottom: 40rpx;
    }

    .tab-item.active {
      color: $uni-text-color-placeholder;
    }

    .active-line {
      position: absolute;
      bottom: -8rpx;
      left: 50%;
      transform: translateX(-50%);
      width: 24rpx;
      height: 8rpx;
      border-radius: 150rpx;
      background: $uni-text-color-placeholder;
    }

  }

  .tab-content {
    padding-top: 370rpx;

    .tabsa {
      width: 100%;
      border-radius: 16rpx;
      background: $uni-bg-color;
      margin-bottom: 32rpx;

      .h1 {
        height: 90rpx;
        font-size: 32rpx;
        font-weight: 600;
        color: $uni-text-color;
        padding: 0 16rpx;
        display: flex;
        align-items: center;

        .borleds {
          margin-right: 15rpx;
          width: 7rpx;
          height: 30rpx;
          border-radius: 16rpx;
          background: rgba(252, 81, 95, 1);
        }

        .titless {
          font-size: 32rpx;
          font-weight: 600;
          color: $uni-text-color;
        }

        .pitcs {
          display: block;
          font-size: 26rpx;
          font-weight: 300;
          letter-spacing: 0px;
          color: $uni-text-color-placeholder;
          text-align: right;
          flex: 1;
        }
      }

      .textp {
        padding: 32rpx 16rpx;
        font-size: 28rpx;
        font-weight: 400;
        line-height: 50rpx;
        color: $uni-text-color;
        text-align: justify;
        vertical-align: top;
        border-top: 2rpx solid rgba(246, 248, 253, 1);
      }
    }

    .zhsi {
      font-size: 24rpx;
      font-weight: 300;
      letter-spacing: 0px;
      color: $uni-text-color;
    }
  }

  .scroll {
    width: 100%;
    white-space: nowrap; //标签不换行
    height: 100rpx;

    view {
      display: inline-block;
      font-size: 26rpx;
      font-weight: 600;
      letter-spacing: 0px;
      line-height: 33.6rpx;
      color: $uni-text-color;
      padding: 13rpx 30rpx;
      border-radius: 8rpx;
      background: rgba(246, 248, 253, 1);
      margin-right: 18rpx;
    }

    .active {
      position: relative;
      color: $uni-text-color-placeholder;
    }

    image {
      position: absolute;
      left: 49%;
      bottom: -5rpx;
      display: block;
      width: 40rpx;
      height: 8rpx;
      z-index: 9;
    }
  }

  .t-table t-tr:nth-child(2n) {
    background: #ffffff !important;
  }
}
</style>