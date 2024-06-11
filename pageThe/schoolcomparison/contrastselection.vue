<template>
  <uni-self-header :boxHeight="50" title="院校对比" :linearColor="linearColor" :hasBack="true" ref="headerSelf">
    <view class="schoolcomparison" :style="{ height: `calc(100vh - ${pageTop + 10}px)`, 'margin-top': '10px' }">
      <view class="tabse" style="margin-bottom: 20rpx;">
        <text class="quanbu" style="width: 49%;" :class="popindex == 1 ? 'active' : ''"
          @click="handpopIndex(1)">按学校对比</text>
        <text class="shouhou" style="width: 49%;" :class="popindex == 2 ? 'active' : ''"
          @click="handpopIndex(2)">按专业对比</text>
      </view>
      <view v-if="popindex === 2">
        <view class="addquery" style="margin-top: 50rpx;margin-bottom: 24rpx;" @click="handxuanzes(3)">
          <image
            src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/college/collegeprofile16.svg"
            mode=""></image>
          <view class="xueix">
            目标专业
          </view>
        </view>
        <uni-picker-s :obj="obj" @setObj="setObj" @setZyName="setZyName" @setObjSchool="setObjSchool"></uni-picker-s>
        <view class="zhuangyes" v-if="objSchool && objSchool.specialtyName">
          <text class="zydaimas">
            专业代码
            <text class="masesd">{{ objSchool.specialtyCode }}</text>
          </text>
          <view class="fenxs">{{ objSchool.specialtyName }}</view>
        </view>
      </view>
      <view class="addquery" style="margin-top: 30rpx;margin-bottom: 24rpx;" @click="handxuanzes(2)">
        <image
          src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/college/collegeprofile15.svg"
          mode=""></image>
        <view class="xueix">
          目标院校
        </view>
      </view>
      <view class="inpiseu" @click="handxuanzes(1)">
        <view class="names">请选择就读院校</view>
        <view>
          <uv-icon name="arrow-right" color="rgba(51, 51, 51, 1.00)" size="18"></uv-icon>
        </view>
      </view>
      <view class="xuelist">
        <uv-checkbox-group v-model="checkboxValue" iconPlacement="right" activeColor="rgba(252, 81, 95, 1)">
          <uv-checkbox :customStyle="{ marginBottom: '8px' }" v-for="(item, index) in addersslistL" :key="index"
            :name="item.schoolId">
            <view class="Lis">
              <view class="delBox" @click.prevent="delSchool(index, addersslistL)">
                <image src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/deletePic.png">
                </image>
              </view>
              <!-- <image
              src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/college/collegeprofile1.svg"
              mode=""></image> -->
              <image :src="item.schoolLogo ? COS_CDN_PREFIX_http + item.schoolLogo : defaultImg.schoolImg" />
              <view>
                <view :class="popindex === 1 ? 'xiaox' : 'xiaox special-xiaox'">
                  <text class="overBox">{{ item.schoolName }}</text>
                  <text class="zydaimas" v-if="popindex === 1">
                    专业代码
                    <text class="masesd">{{ item.specialtyCode }}</text>
                  </text>
                </view>
                <view class="fenxs" v-if="popindex === 1">{{ item.specialtyName }}</view>
              </view>
            </view>
          </uv-checkbox>
        </uv-checkbox-group>
      </view>
      <!-- <view
      v-if="addersslistL&&addersslistL.length<3"
      class="addquery"
      style="margin-top: 20rpx;"
      @click="handxuanzes(1)"
    >
      <view class="add">
        <uv-icon
          name="plus"
          color="#fff"
          size="15"
        ></uv-icon>
      </view>
      <view class="xueix">
        新增学校
      </view>
    </view> -->
      <view class="bcbtns" @click="handuidsese">开始对比</view>
    </view>
  </uni-self-header>
</template>

<script>
import uniIcons from '@/pageThe/components/uni-icons/components/uni-icons/uni-icons.vue'
import uvCheckboxGroup from '@/pageThe/components/uv-checkbox/components/uv-checkbox-group/uv-checkbox-group.vue'
import uvIcon from '@/pageThe/components/uv-icon/components/uv-icon/uv-icon.vue'
import uvCheckbox from '@/pageThe/components/uv-checkbox/components/uv-checkbox/uv-checkbox.vue'
import uniPickerS from '@/pageThe/components/uni-picker-s/uni-picker-s.vue'
import { collegesUniversitiesContrast } from '@/api/colleges/index'
import config from '@/config/index'
export default {
  components: {
    uvCheckboxGroup,
    uvIcon,
    uvCheckbox,
    uniIcons,
    uniPickerS
  },
  data() {
    return {
      specialtyObj: {
        specialtyCode: '',
        specialtyName: ''
      },
      checkboxValue: [],
      popindex: 1,
      addersslistL: [],
      schoolItem: {
        schoolName: '',
        schoolId: '',
        specialtyName: '',
        specialtyCode: ''
      },
      obj: {
        specialtyMasterType: '',
        specialtyAffiliatingCategoryId: '',
        specialtyAffiliatingSubjecttId: ''
      },
      zyname: "",
      objSchool: {
        specialtyName: '',
        specialtyCode: ''
      },
      COS_CDN_PREFIX_http: config.COS_CDN_PREFIX_http,
      defaultImg: this.$defaultImg,

      linearColor: 'linear-gradient(to bottom,rgba(255, 232, 227, 1),rgba(255, 255, 255, 1))',
      pageTop: 0,
    }
  },
  computed: {
    windowHeight() {
      return uni.getSystemInfoSync().windowHeight - 50
    }
  },
  mounted() {
    this.pageTop = this.$refs.headerSelf.obj?.pageTop || 0
  },
  onLoad() {
    uni.$off('chooseSchool')
    uni.$on('chooseSchool', data => {
      let isFlag = true
      let indexVal = 0
      if (this.addersslistL.length >= 3) {
        setTimeout(() => {
          uni.showToast({
            title: '最多选择3个学校',
            icon: 'none'
          })
        }, 500);
        return
      }
      this.addersslistL.forEach((item, index) => {
        if (item.schoolId === data.schoolId) {
          isFlag = false
          indexVal = index
          return
        }
      })
      if (!isFlag) {
        // !isFlag说明已存在相同的学校，此时替换数据
        this.addersslistL[indexVal].schoolName = data.schoolName
        this.addersslistL[indexVal].schoolId = data.schoolId
        this.addersslistL[indexVal].specialtyName = data.specialtyName
        this.addersslistL[indexVal].specialtyCode = data.specialtyCode
        this.addersslistL[indexVal].specialtyId = data.specialtyId
        this.addersslistL[indexVal].schoolLogo = data.schoolLogo

      } else {
        let obj = {
          schoolName: data.schoolName,
          schoolId: data.schoolId,
          specialtyName: data.specialtyName,
          specialtyCode: data.specialtyCode,
          specialtyId: data.specialtyId,
          schoolLogo: data.schoolLogo
        }
        this.addersslistL.push(obj)
      }

    })
  },
  onShow() {

  },
  
  onShareAppMessage(options) {
    // 返回分享的内容
    return {
      title: '院校对比',
      path: '/pageThe/schoolcomparison/contrastselection',
    };
  },
  methods: {
    setObj(obj) {
      this.obj = obj
      if (this.popindex === 2) {
        this.addersslistL = []
      }
    },
    setZyName(zyname) {
      this.zyname = zyname
      this.setObjSchool({}) //清空专业数据
    },
    setObjSchool(obj) {
      this.checkboxValue = []
      this.objSchool = obj
      if (this.popindex === 2) {
        this.addersslistL = []
      }
    },
    tochooseSpecial() {
      this.$tab.navigateTo('/pageThe/schoolcomparison/chooseSpecial')
    },
    handuidsese() {
      if (this.addersslistL && this.addersslistL.length > 0) {
        console.log(this.checkboxValue)
        if (this.checkboxValue.length > 3) {
          uni.showToast({
            title: '最多选择3个学校',
            icon: 'none'
          })
          return
        }
        let arr = [] //按学校对比的传参
        // let arr2 = [] //按专业对比的传参
        if (this.checkboxValue && this.checkboxValue.length > 1) {
          this.checkboxValue.forEach(item => {
            this.addersslistL.forEach(i => {
              console.log('i: ', i);
              if (item == i.schoolId) {
                let obj = {
                  schoolId: i.schoolId,
                  specialtyId: i.specialtyId,
                }
                arr.push(obj)
                // let obj2 = {
                //   schoolId:i.schoolId ,
                //   specialtyMasterType:this.obj.specialtyMasterType,
                //   specialtyAffiliatingCategoryId:this.obj.specialtyAffiliatingCategoryId ,
                //   specialtyAffiliatingSubjecttId:this.obj.specialtyAffiliatingSubjecttId ,
                //   specialtyCode:this.objSchool.specialtyCode,
                //   specialtyName:this.objSchool.specialtyName,
                // }
                // arr2.push(obj2)
              }
            })

          })
          // 1按学校 2按专业
          // let obj = this.popindex === 1?arr:arr2
          collegesUniversitiesContrast(JSON.stringify(arr)).then(res => {
            if (res.code === 200) {
              console.log(res)
              let data = encodeURIComponent(JSON.stringify(res.data))
              this.$tab.navigateTo('/pageThe/schoolcomparison/institutions?data=' + data)
            }
          })

        } else {
          uni.showToast({
            title: '请勾选两个及以上学校',
            icon: 'none'
          })
        }
        // this.$tab.nav.checkboxValue = this.checkboxValue
        // this.$tab.navigateTo('/pageThe/schoolcomparison/institutions')
      } else {
        uni.showToast({
          title: '请选择学校',
          icon: 'none'
        })
      }

    },
    handback() {
      this.$tab.navigateBack(1)
    },
    handpopIndex(num) {
      this.addersslistL = []
      this.popindex = num
    },
    handxuanzes(num) {
      console.log('num: ', num);
      if (num == 1) {
        // 按学校
        if (this.popindex === 1) {
          // 按学校对比
          this.$tab.navigateTo('/pageSec/schoolcomparison/index')
        } else {
          // 按专业
          if (!this.objSchool.specialtyCode) {
            uni.showToast({
              title: '请选择专业',
              icon: 'none'
            })
            return
          } else {
            this.$tab.navigateTo('/pageThe/schoolcomparison/schoollist?objSchool=' + JSON.stringify(this.objSchool) + '&type=special' + '&obj=' + JSON.stringify(this.obj))
          }
        }
      }
    },
    // 删除学校
    delSchool(index, data) {
      console.log('index,data: ', index, data);
      data.splice(index, 1)
      uni.showToast({
        title: '删除成功',
        icon: 'none'
      })
    }
  }
}
</script>

<style lang="scss">
.schoolcomparison {
  padding: 30rpx;
  background-color: $uni-bg-color;
  overflow-x: scroll;
  box-sizing: border-box;
  // /deep/ .uv-checkbox{
  // 	width: 100% !important;
  // 	flex:1 !important;
  // }

  .zhanyelist {
    width: 100%;
    padding: 0 32rpx;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  /deep/ .check {
    border-color: #fc515f !important;
  }

  /deep/ .selected-item-active {
    border-color: #fc515f;
  }

  /deep/ .uv-checkbox-group {
    display: block !important;
    margin-top: 24rpx;
  }

  /deep/ .uv-checkbox {
    font-size: 28rpx !important;
    font-weight: 400 !important;
    line-height: 39.2rpx !important;
    color: $uni-text-color !important;
    padding-right: 10rpx !important;
  }

  /deep/ .uv-checkbox__icon-wrap {
    border-radius: 100% !important;
    width: 44rpx !important;
    height: 44rpx !important;
  }

  /deep/ .input-value-border {
    border: none;
  }

  /deep/ .selected-area {
    font-size: 28rpx !important;
    font-weight: 600 !important;
    line-height: 40rpx !important;
    color: rgba(51, 51, 51, 1) !important;
  }

  /deep/ .placeholder {
    font-size: 28rpx !important;
    font-weight: 400 !important;
    color: $uni-text-color-grey !important;
  }

  /deep/ .arrow-area {
    display: none !important;
  }

  .addquery {
    display: flex;
    padding-left: 25rpx;
    align-items: center;
    border-bottom: 2rpx solid rgba(246, 248, 253, 1);
    padding-bottom: 10rpx;

    .add {
      width: 72rpx;
      height: 72rpx;
      opacity: 1;
      border-radius: 100%;
      background: $uni-color-primary;
      line-height: 72rpx;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-right: 25rpx;
      margin-left: 26rpx;
    }

    image {
      display: block;
      width: 30rpx;
      height: 30rpx;
      margin-right: 25rpx;
    }

    .xueix {
      font-size: 32rpx;
      font-weight: 600;
      line-height: 44.8rpx;
      color: $uni-text-color;
      line-height: 72rpx;
    }

    .uvicon-plus {
      font-weight: 600 !important;
    }
  }

  .zhuangyes {
    margin-left: 20rpx;
    border-top: 2rpx solid #f6f8fd;
    padding: 32rpx 0;
    margin-top: 26rpx;

    .zydaimas {
      height: 36rpx;
      padding-left: 10rpx;
      border-radius: 8rpx;
      border: 1px solid rgba(252, 81, 95, 1);
      font-size: 24rpx;
      font-weight: 400;
      line-height: 36rpx;
      color: $uni-text-color-placeholder;

      .masesd {
        margin-left: 10rpx;
        padding-left: 10rpx;
        display: inline-block;
        width: 85rpx;
        text-align: center;
        height: 36rpx;
        line-height: 36rpx;
        background: url('https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/college/collegeprofile13.png');
        background-size: 100% 100%;
        color: $uni-text-color-inverse;
        padding-right: 10rpx;
      }
    }

    .fenxs {
      font-size: 26rpx;
      margin-top: 15rpx;
      font-weight: 600;
      line-height: 33.6rpx;
      color: $uni-text-color;
    }
  }

  .tabse {
    display: flex;
    width: 100%;
    justify-content: center;
    z-index: 999;
    padding: 0 100rpx;

    text {
      display: block;
      height: 56rpx;
      text-align: center;
      line-height: 56rpx;
      font-size: 28rpx;
      font-weight: 400;
      color: $uni-text-color-placeholder;
      border: 1px solid rgba(252, 81, 95, 1);
    }

    .quanbu {
      border-radius: 8rpx 0 0 8rpx;
      border-right: none;
    }

    .shouhou {
      border-radius: 0px 8rpx 8rpx 0rpx;
    }
  }

  .active {
    background-color: $uni-text-color-placeholder;
    color: $uni-text-color-inverse !important;
    font-weight: 600 !important;
  }

  .Lis {
    width: 100%;
    display: flex;
    position: relative;

    padding: 32rpx 20rpx;

    .delBox {
      position: absolute;
      z-index: 99;
      left: 0;
      top: 0;

      image {
        width: 54rpx;
        height: 45rpx;
      }
    }

    image {
      display: block;
      width: 80rpx;
      height: 80rpx;
      margin-right: 22rpx;
      margin-top: 10rpx;
    }

    .xiaox {
      color: $uni-text-color;
      font-size: 32rpx;
      font-weight: 600;
      display: flex;

      .overBox {
        display: inline-block;
        width: 220rpx;
        @include overline(1);
      }

      .zydaimas {
        height: 36rpx;
        padding-left: 10rpx;
        border-radius: 8rpx;
        border: 1px solid rgba(252, 81, 95, 1);
        font-size: 24rpx;
        font-weight: 400;
        line-height: 36rpx;
        color: $uni-text-color-placeholder;
        margin-left: 28rpx;

        .masesd {
          padding-left: 10rpx;
          margin-left: 10rpx;
          display: inline-block;
          width: 85rpx;
          text-align: center;
          height: 36rpx;
          line-height: 36rpx;
          background: url('https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/college/collegeprofile13.png');
          background-size: 100% 100%;
          color: $uni-text-color-inverse;
          padding-right: 10rpx;
        }
      }
    }

    .special-xiaox {
      line-height: 100rpx;
    }

    .fenxs {
      font-size: 26rpx;
      margin-top: 15rpx;
      font-weight: 400;
      line-height: 33.6rpx;
      color: $uni-text-color;
    }
  }

  .bcbtns {
    width: 100%;
    height: 80rpx;
    opacity: 1;
    border-radius: 16rpx;
    margin: 0 auto;
    background-color: $uni-color-primary;
    color: $uni-text-color-inverse;
    text-align: center;
    line-height: 80rpx;
    font-size: 32rpx;
    font-weight: 600;
    margin-top: 40rpx;
  }

  .disable {
    width: 100%;
    height: 80rpx;
    opacity: 1;
    border-radius: 16rpx;
    margin: 0 auto;
    color: $uni-text-color-inverse;
    text-align: center;
    line-height: 80rpx;
    font-size: 32rpx;
    font-weight: 600;
    margin-top: 40rpx;
    background: #d6d6d6;
  }

  .inpiseu {
    display: flex;
    justify-content: space-between;
    padding: 20rpx 16rpx;
    height: 80rpx;
    border-radius: 16rpx;
    background: rgba(246, 248, 253, 1);
    height: 80rpx;
    align-items: center;

    .names {
      font-size: 28rpx;
      font-weight: 400;
      letter-spacing: 0px;
      color: $uni-text-color-grey;
    }

    .namea {
      font-size: 28rpx;
      font-weight: 600;
      letter-spacing: 0px;
      line-height: 40rpx;
      color: rgba(51, 51, 51, 1);
    }
  }
}
</style>