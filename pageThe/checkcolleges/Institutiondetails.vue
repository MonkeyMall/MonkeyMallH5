<template>
  <uni-self-header :boxHeight="150" :title="' '" :linearColor="linearColor" :hasBack="true" ref="headerSelf">
    <view class="containerbjd">
      <view class="header">
        <view class="Lis" @click="handtoinstiu()">
          <image :src="schooldata.schoolLogo ? COS_CDN_PREFIX_http + schooldata.schoolLogo : defaultImg.schoolImg" />
          <view>
            <view class="xiaox">
              {{ schooldata.schoolName }}
              <view class="zydaimas">
                院校代码
                <view class="masesd">{{ schooldata.schoolCode || "-" }}</view>
              </view>
            </view>
            <view class="fenxs"><dict-tag :options="dict.type.major_school_type" :value="schooldata.schoolType" /> <text
                style="margin: 0 5rpx;"> |</text>
              <dict-tag v-if="schooldata.schoolRegion == 'major_school_aq'" :options="dict.type.major_school_aq"
                :value="schooldata.schoolAffiliatingArea" />
              <dict-tag v-if="schooldata.schoolRegion == 'major_school_bq'" :options="dict.type.major_school_bq"
                :value="schooldata.schoolAffiliatingArea" />
            </view>
            <view class="dengjis">
              <dict-tag v-if="schooldata.schoolProperty" :options="dict.type.major_school_property"
                :value="schooldata.schoolProperty.split(',')" />
            </view>
          </view>
        </view>
      </view>
      <view class="atabs">
        <view style="width: 100%;">
          <uv-tabs :list="list" @click="tabseclick" lineColor="#f56c6c" :scrollable="false"
            :activeStyle="{ color: '#f56c6c', fontWeight: '600', fontSize: '34rpx', transform: 'scale(1.03)' }"
            :inactiveStyle="{ color: '#333', transform: 'scale(1.05)' }"
            itemStyle="padding-left: 15rpx; padding-right: 15rpx; height: 70rpx;"></uv-tabs>
        </view>
      </view>
      <view class="contents" :style="{ height: `calc(100vh - ${pageTop + 80 + 66 + 10 + 16}px)` }">
        <!-- 院校简介start -->
        <view v-show="index == 0" class="scrllse">
          <view class="tabsa">
            <view class="h1">
              <text></text> 院校简介
            </view>
            <view class="textp">
              <uv-parse :content="schooldata.schoolIntroduce"></uv-parse>
            </view>
          </view>
          <view class="tabsa">
            <view class="h1">
              <text></text>基本信息
            </view>
            <view class="ULs">
              <view class="Lia">
                <view class="bianksueaa" style="background: rgba(252, 81, 95, 1);"></view>
                <view>
                  <view class="titles">
                    建校时间
                  </view>
                  <view class="timese">
                    <text style="font-size: 40rpx;color: #333;margin-right: 6rpx;">
                      {{ schooldata.schoolBaseMessageList[0].baseMessageValue || '--' }}
                    </text>
                    <text>年</text>
                  </view>
                </view>
                <image
                  src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/college/collegeprofile1.svg"
                  mode=""></image>
              </view>
              <view class="Lia">
                <view class="bianksueaa" style="background: rgba(255, 195, 0, 1);"></view>
                <view>
                  <view class="titles">
                    占地面积
                  </view>
                  <view class="timese">
                    <text style="font-size: 40rpx;color: #333;margin-right: 6rpx;">
                      {{ schooldata.schoolBaseMessageList[1].baseMessageValue || '--' }}
                    </text>
                    <text>亩</text>
                  </view>
                </view>
                <image
                  src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/college/collegeprofile2.svg"
                  mode=""></image>
              </view>
              <view class="Lia">
                <view class="bianksueaa" style="background: rgba(172, 51, 193, 1);"></view>
                <view>
                  <view class="titles">
                    博士点
                  </view>
                  <view class="timese">
                    <text style="font-size: 40rpx;color: #333;margin-right: 6rpx;">
                      {{ schooldata.schoolBaseMessageList[2].baseMessageValue || '--' }}
                    </text>
                    <text>个</text>
                  </view>
                </view>
                <image
                  src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/college/collegeprofile3.svg"
                  mode=""></image>
              </view>
              <view class="Lia">
                <view class="bianksueaa" style="background: rgba(255, 127, 3, 1);"></view>
                <view>
                  <view class="titles">
                    硕士点
                  </view>
                  <view class="timese">
                    <text style="font-size: 40rpx;color: #333;margin-right: 6rpx;">
                      {{ schooldata.schoolBaseMessageList[3].baseMessageValue || '--' }}
                    </text>
                    <text>个</text>
                  </view>
                </view>
                <image
                  src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/college/collegeprofile4.svg"
                  mode=""></image>
              </view>
              <view class="Lia">
                <view class="bianksueaa" style="background: rgba(67, 207, 124, 1);"></view>
                <view>
                  <view class="titles">
                    国家重点学科
                  </view>
                  <view class="timese">
                    <text style="font-size: 40rpx;color: #333;margin-right: 6rpx;">
                      {{ schooldata.schoolBaseMessageList[4].baseMessageValue || '--' }}
                    </text>
                    <text>科</text>
                  </view>
                </view>
                <image
                  src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/college/collegeprofile5.svg"
                  mode=""></image>
              </view>
              <view class="Lia">
                <view class="bianksueaa" style="background: rgba(42, 130, 228, 1);"></view>
                <view>
                  <view class="titles">
                    重点实验室
                  </view>
                  <view class="timese">
                    <text style="font-size: 40rpx;color: #333;margin-right: 6rpx;">
                      {{ schooldata.schoolBaseMessageList[5].baseMessageValue || '--' }}
                    </text>
                    <text>个</text>
                  </view>
                </view>
                <image
                  src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/college/collegeprofile6.svg"
                  mode=""></image>
              </view>
            </view>
          </view>
          <view class="tabsa">
            <view class="h1">
              <text></text>联系电话
            </view>
            <view class="phonsa">
              <image
                src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/college/collegeprofile7.svg"
                mode=""></image>
              <view class="titles">官网</view>
              <view class="quesrs">
                <uv-link :href="schooldata.schoolBaseMessageList[6].baseMessageValue" text="查看" color="#FC515F"
                  fontSize="28rpx">查看</uv-link>
              </view>
            </view>
            <view class="phonsa">
              <image
                src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/college/collegeprofile8.svg"
                mode=""></image>
              <view class="titles">招生办电话</view>
              <view class="quesrs" @click="makeCall(schooldata.schoolBaseMessageList[7].baseMessageValue)">查看</view>
            </view>
          </view>
          <view class="tabsa">
            <view class="h1">
              <text></text>奖学金信息
            </view>
            <view class="jiangxuej">
              <uv-parse :content="schooldata.schoolScholarshipMessage"></uv-parse>
            </view>
          </view>
          <view class="tabsa">
            <view class="h1">
              <text></text>学费学制住宿
            </view>
            <view class="jiangxuej">
              <uv-parse :content="schooldata.schoolTuitionEduStay"></uv-parse>
            </view>
          </view>
        </view>
        <!-- 院校简介end -->
        <view v-show="index == 1" class="scrllse">
          <f-Raction :schoolId="schoolId" :specialtyMasterType="specialtyMasterType"
            :specialtyAffiliatingCategoryId="specialtyAffiliatingCategoryId" :specialtyName="specialtyName"></f-Raction>
        </view>
        <view v-show="index == 2" class="scrllse">
          <p-Rofession :schoolId="schoolId" :specialtyAffiliatingCategoryId="specialtyAffiliatingCategoryId"
            :specialtyName="specialtyName"></p-Rofession>
        </view>
      </view>
    </view>
  </uni-self-header>
</template>

<script>
import uvTabs from '@/pageThe/components/uv-tabs/components/uv-tabs/uv-tabs.vue'

import fRaction from './fraction.vue';
import pRofession from './profession.vue';
import uvLink from '@/pageThe/components/uv-link/components/uv-link/uv-link.vue'
import uvParse from '@/pageThe/components/uv-parse/components/uv-parse/uv-parse.vue'
import config from '@/config/index'
import {
  schoolMessage,
} from "@/api/colleges/index"
export default {
  components: {
    uvTabs,
    uvLink,
    uvParse,
    fRaction,
    pRofession
  },
  dicts: ['major_school_aq', 'major_school_bq', 'major_school_type', 'major_school_property'],
  data() {
    return {
      COS_CDN_PREFIX_http: config.COS_CDN_PREFIX_http,
      defaultImg: this.$defaultImg,
      specialtyName: '',
      specialtyMasterType: '',
      specialtyAffiliatingCategoryId: '',
      defaultImg: this.$defaultImg,
      linearColor: 'linear-gradient(to bottom,rgba(255, 232, 227, 1),rgba(255, 255, 255, 1))',
      pageTop: 0,
      schoolId: "",
      schooldata: {},
      list: [{
        name: '院校简介',
      }, {
        name: '院校分数',
      }, {
        name: '院系专业'
      }],
      index: 0,
      itemList: [],
    }
  },
  computed: {},
  mounted() {
    this.pageTop = this.$refs.headerSelf.obj?.pageTop || 0
  },
  onLoad(data) {
    this.schoolId = data.id
    this.specialtyAffiliatingCategoryId = data.specialtyAffiliatingCategoryId
    this.specialtyName = data.specialtyName
    this.specialtyMasterType = data.specialtyMasterType
    this.getUser()
  },
  methods: {
    getUser() {
      schoolMessage(this.schoolId).then(response => {
        this.schooldata = response.data
      })
    },
    makeCall(phone) {
      if (!phone) return uni.showToast({ title: "暂无电话" });
      this.itemList = []
      this.itemList.push(phone)
      uni.showActionSheet({
        itemList: this.itemList, //itemList字段不变
        success: function (res) {
          if (!res.cancel && res.tapIndex !== undefined) {
            uni.makePhoneCall({
              phoneNumber: this.itemList[res.tapIndex],
              success: function () {
                console.log('拨打电话成功');
              },
              fail: function () {
                console.log('拨打电话失败');
              }
            });
          }
        }.bind(this) // 绑定this作用域
      });
    },
    handback() {
      this.$tab.navigateBack(1)
    },
    tabseclick(item) {
      if (this.index != item.index) {
        this.index = item.index
      }
    },

  }
}
</script>

<style lang="scss" scoped>
.containerbjd {
  /deep/ .check {
    border-color: #fc515f !important;
  }

  /deep/ .selected-item-active {
    border-color: #fc515f;
  }

  background-color: transparent;
  box-sizing: border-box;

  .header {
    height: 80px;
    padding-top: 10px;
    margin-bottom: 16px;

    .Lis {
      border-radius: 16rpx;
      width: 100%;
      display: flex;
      align-items: center;
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
        justify-content: space-between;
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


  /deep/ .uv-tabs__wrapper__nav {
    justify-content: space-between !important;
  }

  /deep/ .uv-tabs__wrapper__nav__line {
    width: 24rpx !important;
    height: 8rpx !important;
    border-radius: 150rpx !important;
    left: 12rpx !important;
  }

  .atabs {
    background-color: $uni-color-bg;
    border-radius: 56rpx 56rpx 0 0;
    height: 66px;
    line-height: 66px;
    padding: 0 45rpx;
    display: flex;
    align-items: center;
  }

  .contents {
    background-color: $uni-color-bg;
    box-sizing: border-box;
    position: relative;
    overflow-x: scroll;
    padding: 32rpx;
    padding-top: 0;

    .scrllse {}

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

        text {
          display: block;
          margin-right: 15rpx;
          width: 7rpx;
          height: 30rpx;
          border-radius: 16rpx;
          background: rgba(252, 81, 95, 1);
          margin-top: 2rpx;
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

      .ULs {
        display: flex;
        flex-wrap: wrap;
        padding: 0 16rpx;
        padding-top: 32rpx;
        border-top: 2rpx solid rgba(246, 248, 253, 1);
        justify-content: space-between;

        .Lia {
          width: 47%;
          border-radius: 8px;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 4px 9px 4px rgba(246, 248, 253, 1);
          padding: 6rpx 22rpx 6rpx 45rpx;
          display: flex;
          margin-bottom: 24rpx;
          justify-content: space-between;
          position: relative;

          .bianksueaa {
            position: absolute;
            top: 16rpx;
            left: 18rpx;
            width: 10rpx;
            height: 30rpx;
            border-radius: 8rpx;
          }

          .titles {
            font-size: 28rpx;
            font-weight: 400;
            line-height: 50rpx;
            color: $uni-text-color-grey;
            text-align: left;
            vertical-align: top;
            margin-bottom: 8rpx;
          }

          .timese {
            font-size: 28rpx;
            font-weight: 600;
            letter-spacing: 0px;
            color: rgba(102, 102, 102, 1);
            text-align: left;
            vertical-align: top;
            display: flex;
            align-items: center;
            white-space: nowrap;

            text {
              display: block;
            }
          }

          image {
            display: block;
            width: 72rpx;
            height: 72rpx;
            margin-top: 24rpx;
          }
        }
      }

      .phonsa {
        padding: 41rpx 16rpx;
        font-size: 28rpx;
        font-weight: 400;
        border-top: 2rpx solid rgba(246, 248, 253, 1);
        display: flex;
        align-items: center;

        image {
          display: block;
          width: 36rpx;
          height: 36rpx;
          margin-right: 18rpx;
        }

        .titles {
          font-size: 28rpx;
          font-weight: 400;
          line-height: 50rpx;
          color: $uni-text-color;
        }

        .quesrs {
          font-size: 28rpx;
          font-weight: 400;
          color: $uni-text-color-placeholder;
          margin-left: auto;

          text {
            font-size: 28rpx;
          }
        }
      }

      .jiangxuej {
        padding: 32rpx 16rpx;
        font-size: 28rpx;
        font-weight: 400;
        line-height: 50rpx;
        color: $uni-text-color;
        text-align: justify;
        vertical-align: top;
        border-top: 2rpx solid rgba(246, 248, 253, 1);

        .texta {
          font-size: 28rpx;
          font-weight: 400;
          line-height: 50rpx;
          color: $uni-text-color;
        }
      }
    }
  }
}</style>