<template>
  <view class="schoollist">
    <uni-easyinput style="padding: 0 !important;" prefixIcon="search" v-model="schoolName" @confirm="searchFn"
      placeholder="请输入学校名称">
    </uni-easyinput>
    <view v-if="is_loading" style="margin-top: 100rpx;">
      <view style="margin-top: 50rpx;" v-for="i in 10" :key="i">
        <uv-skeleton :loading="is_loading" rows="1" :animate="true"></uv-skeleton>
      </view>
    </view>
    <uni-indexed-list v-if="list.length" :options="list" :show-select="true" @click="handClick" />
    <view v-else class="noData">暂无数据</view>
  </view>
</template>

<script>
// import { json} from '../../utils'
// import { initial } from '@/utils/chineseConversion.js'
// import uniIcons from '@/pageThe/components/uni-icons/components/uni-icons/uni-icons.vue'
// import uvCheckbox from '@/pageThe/components/uv-checkbox/components/uv-checkbox/uv-checkbox.vue'

import uniIndexedList from '@/pageThe/components/uni-indexed-list/components/uni-indexed-list/uni-indexed-list.vue'
import uniEasyinput from "@/pageThe/components/uni-easyinput/components/uni-easyinput/uni-easyinput.vue"
import uvSkeleton from '@/pageThe/components/uv-subsection/components/uv-subsection/uv-subsection.vue'
import { findAllSchool, findSchoolBySubjectGroup } from "@/api/colleges/index"
export default {
  components: {
    uniIndexedList,
    uniEasyinput,
    uvSkeleton,
    // uniIcons,
    // uvCheckbox
  },
  data() {
    return {
      schoolName: '',
      list: [],
      options: { type: "" }, //type-school选择学校   type-special专业对比
      is_loading: true,
    }
  },
  created() {
    // console.log('执行 created')
    // this.getInitData()
  },
  onLoad(options) {
    if (options) this.options = options
    // console.log('执行 onLoad')
    this.getInitData()
  },
  methods: {
    getDataSpecial(specialtyCode, obj, objSchool) {
      this.is_loading = true
      findSchoolBySubjectGroup({
        schoolName: this.schoolName,
        specialtyCode,
        ...obj,
        ...objSchool
      }).then(res => {
        if (res.code === 200) {
          if (res.data && res.data.length) {
            this.list = res.data
          }
        }
      }).finally(() => {
        setTimeout(() => {
          this.is_loading = false
        }, 1000);
      })
    },
    getData() {
      this.is_loading = true
      findAllSchool({
        schoolName: this.schoolName,
      }).then(res => {
        if (res.code === 200) {
          if (res.data && res.data.length) {
            this.list = res.data
          }
        }
      }).finally(() => {
        setTimeout(() => {
          this.is_loading = false
        }, 1000);
      })
    },
    getInitData() {
      if (this.options.type === 'special') {
        let obj = JSON.parse(this.options.obj)
        let objSchool = JSON.parse(this.options.objSchool)
        this.getDataSpecial(this.options.specialtyCode, obj, objSchool)
      } else {
        this.getData()
      }
    },
    searchFn() {
      this.getInitData()
    },
    handClick(e) {
      const itemObj = e.item;
      if (this.options.type === 'school') {
        uni.$emit('clickSchool', {
          schoolName: itemObj.schoolName,
          schoolId: itemObj.schoolId,
          schoolLogo: itemObj.schoolLogo,
          specialtyId: itemObj.specialtyId
        })
        setTimeout(function () {
          uni.navigateBack(1)
        }, 100)
      } else {
        uni.$emit('chooseSchool', {
          schoolName: itemObj.schoolName,
          schoolId: itemObj.schoolId,
          schoolLogo: itemObj.schoolLogo,
          specialtyId: itemObj.specialtyId
        })
        setTimeout(function () {
          uni.navigateBack(1)
        }, 100)
      }
    }
  }
}
</script>

<style lang="scss">
.schoollist {
  padding: 0 30rpx;
  padding-top: 32rpx;

  .uni-indexed-list {
    padding: 0 30rpx;
    padding-bottom: 50rpx;
    background-color: $uni-bg-color-select-shaw;
    top: 120rpx !important;

    .uni-indexed-list__list {
      background-color: $uni-bg-color;
      border-radius: 16rpx;
      border: none;
    }

    .uni-indexed-list__title-wrapper {
      background-color: $uni-bg-color-select-shaw;
    }

    .uni-indexed-list__item-border.data-v-f3e68ed2 {
      border-color: rgba(246, 248, 253, 1);
    }
  }

  .uni-indexed-list__title {
    font-size: 28rpx !important;
    font-weight: 600 !important;
    color: $uni-text-color !important;
  }

  .uni-indexed-list__menu {
    margin-left: -50rpx;
    z-index: 999;
  }

  .uni-indexed-list__menu-text {
    color: $uni-text-color !important;
    font-weight: 700 !important;
    font-size: 24rpx !important;
  }

  .uni-indexed-list__menu-text--active {
    width: 32rpx !important;
    height: 32rpx !important;
    background: rgba(252, 81, 95, 1) !important;
    color: white !important;
  }

  .noData {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 500rpx;
    font-size: 32rpx;
    font-weight: 400;
    letter-spacing: 0px;
    color: $uni-text-color-grey;
  }
}
</style>