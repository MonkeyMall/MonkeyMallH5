<template>
  <uni-self-header :boxHeight="50" title="院校对比" :linearColor="linearColor" :isback="isback" :hasBack="true"
    ref="headerSelf">
    <view class="schoolcomparison" :style="{ height: `calc(100vh - ${pageTop + 10}px)`, 'margin-top': '10px' }">
      <view class="addquery">
        <view class="addquery">
          <image
            src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/college/collegeprofile15.svg"
            mode=""></image>
          <view class="xueix">
            目标院校
          </view>
        </view>
      </view>
      <view class="inpiseu" @click="handxuanzes(2)">
        <view class="names">{{ schoolItem.schoolName }}</view>
        <view><uv-icon name="arrow-right" color="rgba(51, 51, 51, 1.00)" size="18"></uv-icon></view>
      </view>
      <view class="addquery" style="margin-top: 30rpx;">
        <view class="addquery">
          <image
            src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/college/collegeprofile16.svg"
            mode=""></image>
          <view class="xueix">
            目标专业
          </view>
        </view>
      </view>
      <view class="inpiseu" @click="handxuanzes(3)">
        <view class="names"> {{ schoolItem.specialtyName }}</view>
        <view><uv-icon name="arrow-right" color="rgba(51, 51, 51, 1.00)" size="18"></uv-icon></view>
      </view>
      <uv-picker ref="picker" :columns="dataList" keyName="specialtyName" @confirm="confirm"></uv-picker>
      <view class="'bcbtns'" @click="addScholl">确定</view>
      <!-- <dEfaultpage
      v-show="boods"
      value="6"
      tic="你还没有添加心仪的院校哦"
      btntext="去添加"
    ></dEfaultpage> -->
      <!-- <view class="bcbtns" @click="handduis">开始对比</view> -->
    </view>
  </uni-self-header>
</template>

<script>
import { findSpecialtyListBySchoolId } from '@/api/colleges/index'

// import uvIcon from '@/pageSec/components/uv-icon/components/uv-icon/uv-icon.vue'
// import uvPicker from '@/pageSec/components/uv-picker/components/uv-picker/uv-picker.vue'
import uniIcons from '@/pageSec/components/uni-icons/components/uni-icons/uni-icons.vue'

export default {
  components: {
    // uvIcon,
    // uvPicker,
    uniIcons
  },
  data() {
    return {
      boods: true,
      title: "院校对比",
      schoolItem: {
        schoolName: '请选择就读院校',
        schoolId: '',
        specialtyName: '请选择专业',
        schoolLogo: ''
      },
      dataList: [],
      schoolId: '',
      popindex: 0,

      isback: true,
      linearColor: 'linear-gradient(to bottom,rgba(255, 232, 227, 1),rgba(255, 255, 255, 1))',
      pageTop: 0,
    }
  },
  watch: {
    schoolItem(newVal) {
      console.log('newVal: ', newVal);

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
    uni.$off('clickSchool')
    uni.$on('clickSchool', data => {
      this.schoolItem.schoolName = data.schoolName
      this.schoolItem.schoolId = data.schoolId
      this.schoolItem.specialtyName = '请选择专业'
      this.schoolItem.schoolLogo = data.schoolLogo
      this.$set(this.schoolItem, 'schoolName', data.schoolName)
    })
    // this.getUser()
  },
  onShow() {
  },
  methods: {
    handpopIndex(value) {
      this.popindex = value
    },
    handback() {
      this.$tab.navigateBack(1)
    },
    handduis() {
      this.$tab.navigateTo('/pageThe/schoolcomparison/contrastselection')
    },
    handEmit(e) {
      this.boods = false
      this.title = '选择院校'
    },
    handxuanzes(num) {
      if (num == 2) {
        this.$tab.navigateTo('/pageThe/schoolcomparison/schoollist?type=school')
      }
      if (num == 3) {
        console.log(this.schoolItem.schoolId)
        if (this.schoolItem && this.schoolItem.schoolId) {
          this.getFindSpecialtyListBySchoolId(this.schoolItem.schoolId)
        } else {
          uni.showToast({
            title: "请选择学校",
            icon: 'none',
          })
          return
        }
        // this.title = '选择专业'
        // this.$tab.navigateTo('/pageThe/schoolcomparison/schoollist?type=school')
      }
    },
    // 获取学校下的专业
    getFindSpecialtyListBySchoolId(schoolId) {
      findSpecialtyListBySchoolId({ schoolId }).then(res => {
        if (res.code === 200) {
          if (res.data && res.data.length > 0) {
            this.dataList = [res.data]
            console.log('this.dataList: ', this.dataList);
            this.$refs.picker.open();
          } else {
            this.dataList = []
            uni.showToast({
              title: "该学校下暂无专业",
              icon: 'none',
            })
            return
          }

        }
      })
    },
    confirm(e) {
      console.log('e: ', e);
      this.schoolItem.specialtyName = e.value[0].specialtyName
      this.schoolItem.specialtyCode = e.value[0].specialtyCode
      this.schoolItem.specialtyId = e.value[0].specialtyId
    },
    addScholl() {
      console.log(this.schoolItem)
      if ((!this.schoolItem.schoolName || this.schoolItem.schoolName == '请选择就读院校') || (!this.schoolItem.specialtyName || this.schoolItem.specialtyName == '请选择专业')) {
        uni.showToast({
          title: "请选择学校和专业",
          icon: 'none',
        })
        return
      } else {
        uni.$emit('chooseSchool', {
          schoolName: this.schoolItem.schoolName,
          schoolId: this.schoolItem.schoolId,
          schoolLogo: this.schoolItem.schoolLogo,
          specialtyName: this.schoolItem.specialtyName,
          specialtyCode: this.schoolItem.specialtyCode,
          specialtyId: this.schoolItem.specialtyId
        })
        setTimeout(function () {
          uni.navigateBack(1)
        }, 100)
        // this.$tab.navigateTo('/pageThe/schoolcomparison/contrastselection?schoolItem='+JSON.stringify(this.schoolItem))
      }
    }
  }
}
</script>

<style lang="scss">
.schoolcomparison {
  padding: 30rpx;
  background-color: $uni-bg-color;
  overflow-x: scroll;

  .addquery {
    display: flex;
    padding-left: 25rpx;
    align-items: center;
    justify-content: space-between;

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

  .imgae {
    width: 100%;
    margin-top: 120rpx;

    image {
      display: block;
      width: 500px;
      height: 400rpx;
      margin: 0 auto;
    }

    .bossea {
      font-size: 32rpx;
      font-weight: 400;
      letter-spacing: 0px;
      line-height: 44.8rpx;
      color: $uni-text-color-grey;
      text-align: center;
      margin-top: 62rpx;
    }
  }

  .bcbtns {
    position: fixed;
    bottom: 300rpx;
    left: 31rpx;
    width: 690rpx;
    height: 80rpx;
    opacity: 1;
    border-radius: 16rpx;
    margin: 0 auto;
    // background-color: $uni-color-primary;
    // color: $uni-text-color-inverse;
    background-color: #efefef;
    color: $uni-text-color-grey;
    text-align: center;
    line-height: 80rpx;
    font-size: 32rpx;
    font-weight: 600;
    // margin-top: 40rpx;
    margin-top: 320rpx;
  }

  .contentea {
    padding: 0 40rpx;
    height: 900rpx;
  }

  .tabse {
    display: flex;
    width: 100%;
    padding-top: 45rpx;
    justify-content: center;
    z-index: 999;

    text {
      display: block;
      width: 200rpx;
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

  .bcbtns {
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

  .inpiseu {
    display: flex;
    justify-content: space-between;
    padding: 20rpx 16rpx;
    height: 80rpx;
    border-radius: 16rpx;
    background: rgba(246, 248, 253, 1);
    height: 80rpx;
    align-items: center;
    margin-top: 24rpx;

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