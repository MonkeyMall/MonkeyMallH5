<template>
  <view class="contentea">
    <view
      class="tabse"
      style="margin-bottom: 20rpx;"
    >
      <text
        class="quanbu"
        style="width: 49%;"
        :class="popindex== 0 ? 'active': ''"
        @click="handpopIndex(0)"
      >学硕</text>
      <text
        class="shouhou"
        style="width: 49%;"
        :class="popindex== 1 ? 'active': ''"
        @click="handpopIndex(1)"
      >专硕</text>

    </view>

    <uni-data-picker
      ref="pickers"
      v-model="specialtyAffiliatingSubject"
      :localdata="items"
      keyName="label"
      popup-title="请选择"
      @change="onchange"
      @nodeclick="onnodeclick"
    ></uni-data-picker>
  </view>
</template>
<script>
import { AISubjectGroup } from '@/api/colleges/index'
import uniDataPicker from '@/pageThe/components/uni-data-picker/components/uni-data-picker/uni-data-picker.vue'

export default {
  data() {
    return {
      popindex: 0,
      quserparms: {},
      items: [],
      specialtyMasterType: '学术型硕士',
      specialtyAffiliatingSubject: '',
      beforeData: [],
      chooseObj: {}
    }
  },

  components: { uniDataPicker },
  mounted() {
    this.getCountryScoreTree()
  },
  methods: {
    handpopIndex(value) {
      this.popindex = value
      if (value == 0) {
        this.specialtyMasterType = '学术型硕士'
      } else {
        this.specialtyMasterType = '专业型硕士'
      }
      this.specialtyAffiliatingSubject = ''
      this.beforeData.forEach(item => {
        if (item.label === this.specialtyMasterType) {
          this.items = item.children
        }
      })
    },
    onchange(e) {
      uni.$emit('chooseObj', {
        specialtyName: this.chooseObj.text, //专业名称	
        specialtyCode: this.schoolItem.schoolId, //专业代码	
        specialtyAffiliatingSubjecttId: this.schoolItem.specialtyName, //所属一级学科
        specialtyAffiliatingCategoryId: this.schoolItem.specialtyCode, //所属门类
        specialtyMasterType: this.schoolItem.specialtyId //硕士类型
      })
      setTimeout(function () {
        uni.navigateBack(1)
      }, 100)
    },
    onnodeclick(node) {
      console.log(2)
      console.log(node)
      this.chooseObj = node
    },
    // 获取专业
    getCountryScoreTree() {
      AISubjectGroup().then(res => {
        if (res.code === 200) {
          console.log('res: ', res);
          // this.initData(res.data)
          // this.beforeData = JSON.parse(JSON.stringify(res.data))
          this.columns = [res.data]
          res.data.forEach(item => {
            if (item.label === this.specialtyMasterType) {
              this.items = item.children
            }
          })
          console.log(this.items)
        }
      })
    },
    initData(data) {
      data.forEach(item => {
        item.text = item.label
        item.value = item.label
        if (item.children && item.children.length > 0) {
          this.initData(item.children)
        }
      })
    },
  },
}
</script>
<style lang="scss">
.contentea {
  padding: 140rpx 40rpx;
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
</style>