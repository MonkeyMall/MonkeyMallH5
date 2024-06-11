<template>
  <view class="preliminaryinformation">
    <view
      class="tabsa"
      style="border: none;padding-top: 0;"
    >
      <view class="textp">
        <uni-table-s
          :list="list"
          :headerData="headerData"
          :headerAttr="headerAttr"
        >
        </uni-table-s>

      </view>
    </view>
  </view>

</template>

<script>
import uniTableS from '@/pageThe/components/uni-table-s/uni-table-s.vue'
export default {
  props: ['dataList'],
  components: { uniTableS },
  data() {
    return {
      headerData: ['类目'],
      headerAttr: ['name',],
      list: [],
      index: 0
    }
  },
  onLoad() {
    // this.getUser()
  },
  onShow() {


  },
  mounted() {
    console.log(this.dataList, '3333333333333')
    if (this.dataList.length === 2) {
      this.headerAttr = ['name', 'schoolA', 'schoolB']
    }
    if (this.dataList.length === 3) {
      this.headerAttr = ['name', 'schoolA', 'schoolB', 'schoolC']
    }
    this.getHeader()
    this.dataInit()
  },
  methods: {
    getHeader() {
      let arr = this.dataList.map(item => {
        return item.schoolName
      })
      this.headerData = this.headerData.concat(arr)
    },
    dataInit() {
      let arr = [
        {
          name: '研究方向',
          schoolA: '',
          schoolB: '',
          schoolC: ''
        },
        {
          name: '政治',
          schoolA: '',
          schoolB: '',
          schoolC: ''
        },
        {
          name: '外语',
          schoolA: '',
          schoolB: '',
          schoolC: ''
        },
        {
          name: '专业课1',
          schoolA: '',
          schoolB: '',
          schoolC: ''
        },
        {
          name: '专业课2',
          schoolA: '',
          schoolB: '',
          schoolC: ''
        }
      ]

      this.dataList.forEach(item => {
        if (item.majorEarlySubjectDtoList && item.majorEarlySubjectDtoList.length > 0) {
          // researchDirection	 研究方向	  politics 政治	 foreignLanguage 外语	
          // specialtyFirst 专业一	  specialtySecend	 专业二	
          arr.forEach(item2 => {
            if (item2.name === '研究方向') {
              if (this.dataList[0]) {
                item2.schoolA = this.dataList[0].majorEarlySubjectDtoList && this.dataList[0].majorEarlySubjectDtoList.length > 0 ? this.dataList[0].majorEarlySubjectDtoList[this.index].researchDirection : '--'
              }
              if (this.dataList[1]) {
                item2.schoolB = this.dataList[1].majorEarlySubjectDtoList && this.dataList[1].majorEarlySubjectDtoList.length > 0 ? this.dataList[1].majorEarlySubjectDtoList[this.index].researchDirection : '--'
              }
              if (this.dataList[2]) {
                item2.schoolC = this.dataList[2].majorEarlySubjectDtoList && this.dataList[2].majorEarlySubjectDtoList.length > 0 ? this.dataList[2].majorEarlySubjectDtoList[this.index].researchDirection : '--'
              }

            }
            if (item2.name === '政治') {
              if (this.dataList[0]) {
                item2.schoolA = this.dataList[0].majorEarlySubjectDtoList && this.dataList[0].majorEarlySubjectDtoList.length > 0 ? this.dataList[0].majorEarlySubjectDtoList[this.index].politics : '--'
              }
              if (this.dataList[1]) {
                item2.schoolB = this.dataList[1].majorEarlySubjectDtoList && this.dataList[1].majorEarlySubjectDtoList.length > 0 ? this.dataList[1].majorEarlySubjectDtoList[this.index].politics : '--'
              }
              if (this.dataList[2]) {
                item2.schoolC = this.dataList[2].majorEarlySubjectDtoList && this.dataList[2].majorEarlySubjectDtoList.length > 0 ? this.dataList[2].majorEarlySubjectDtoList[this.index].politics : '--'
              }
            }
            if (item2.name === '外语') {
              if (this.dataList[0]) {
                item2.schoolA = this.dataList[0].majorEarlySubjectDtoList && this.dataList[0].majorEarlySubjectDtoList.length > 0 ? this.dataList[0].majorEarlySubjectDtoList[this.index].foreignLanguage : '--'
              }
              if (this.dataList[1]) {
                item2.schoolB = this.dataList[1].majorEarlySubjectDtoList && this.dataList[1].majorEarlySubjectDtoList.length > 0 ? this.dataList[1].majorEarlySubjectDtoList[this.index].foreignLanguage : '--'
              }
              if (this.dataList[2]) {
                item2.schoolC = this.dataList[2].majorEarlySubjectDtoList && this.dataList[2].majorEarlySubjectDtoList.length > 0 ? this.dataList[2].majorEarlySubjectDtoList[this.index].foreignLanguage : '--'
              }
            }
            if (item2.name === '专业课1') {
              if (this.dataList[0]) {
                item2.schoolA = this.dataList[0].majorEarlySubjectDtoList && this.dataList[0].majorEarlySubjectDtoList.length > 0 ? this.dataList[0].majorEarlySubjectDtoList[this.index].specialtyFirst : '--'
              }
              if (this.dataList[1]) {
                item2.schoolB = this.dataList[1].majorEarlySubjectDtoList && this.dataList[1].majorEarlySubjectDtoList.length > 0 ? this.dataList[1].majorEarlySubjectDtoList[this.index].specialtyFirst : '--'
              }
              if (this.dataList[2]) {
                item2.schoolC = this.dataList[2].majorEarlySubjectDtoList && this.dataList[2].majorEarlySubjectDtoList.length > 0 ? this.dataList[2].majorEarlySubjectDtoList[this.index].specialtyFirst : '--'
              }
            }
            if (item2.name === '专业课2') {
              if (this.dataList[0]) {
                item2.schoolA = this.dataList[0].majorEarlySubjectDtoList && this.dataList[0].majorEarlySubjectDtoList.length > 0 ? this.dataList[0].majorEarlySubjectDtoList[this.index].specialtySecend : '--'
              }
              if (this.dataList[1]) {
                item2.schoolB = this.dataList[1].majorEarlySubjectDtoList && this.dataList[1].majorEarlySubjectDtoList.length > 0 ? this.dataList[1].majorEarlySubjectDtoList[this.index].specialtySecend : '--'
              }
              if (this.dataList[2]) {
                item2.schoolC = this.dataList[2].majorEarlySubjectDtoList && this.dataList[2].majorEarlySubjectDtoList.length > 0 ? this.dataList[2].majorEarlySubjectDtoList[this.index].specialtySecend : '--'
              }
            }
          })
        }
      })
      this.list = arr
    }
  }
}
</script>

<style lang="scss">
.preliminaryinformation {
  .zhextus {
    margin: 32rpx 0;
  }
}
</style>