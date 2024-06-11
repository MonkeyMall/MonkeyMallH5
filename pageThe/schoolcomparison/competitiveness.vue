<template>
  <view class="competitiveness">
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
  data() {
    return {
      headerData: ['类目'],
      headerAttr: ['name', 'schoolA', 'schoolB'],
      list: [],
    }
  },
  components: { uniTableS },
  onLoad() {
    // this.getUser()
  },
  onShow() {

  },
  mounted() {
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
          name: '招生人数',
          schoolA: '',
          schoolB: '',
          schoolC: ''
        },
        {
          name: '复试人数',
          schoolA: '',
          schoolB: '',
          schoolC: ''
        },
        {
          name: '录取人数',
          schoolA: '',
          schoolB: '',
          schoolC: ''
        },
        {
          name: '一志愿录取人数',
          schoolA: '',
          schoolB: '',
          schoolC: ''
        },
        {
          name: '调剂录取',
          schoolA: '',
          schoolB: '',
          schoolC: ''
        },
        {
          name: '推免人数',
          schoolA: '',
          schoolB: '',
          schoolC: ''
        },
        {
          name: '是否有调剂',
          schoolA: '',
          schoolB: '',
          schoolC: ''
        }
      ]
      this.dataList.forEach(item => {
        majorApplyMatriculateConditionDtoList
        if (item.majorApplyMatriculateConditionDtoList && item.majorApplyMatriculateConditionDtoList.length > 0) {
          // researchDirection	 研究方向	  politics 政治	 foreignLanguage 外语	
          // specialtyFirst 专业一	  specialtySecend	 专业二	
          arr.forEach(item2 => {
            if (item2.name === '招生人数') {
              if (this.dataList[0]) {
                item2.schoolA = this.dataList[0].practicalPlanRecruitNum || '--'
              }
              if (this.dataList[1]) {
                item2.schoolB = this.dataList[1].practicalPlanRecruitNum || '--'
              }
              if (this.dataList[2]) {
                item2.schoolC = this.dataList[2].practicalPlanRecruitNum || '--'
              }

            }
            if (item2.name === '复试人数') {
              if (this.dataList[0]) {
                item2.schoolA = this.dataList[0].schoolProperty || '--'
              }
              if (this.dataList[1]) {
                item2.schoolB = this.dataList[1].schoolProperty || '--'
              }
              if (this.dataList[2]) {
                item2.schoolC = this.dataList[2].schoolProperty || '--'
              }
            }
            if (item2.name === '录取人数') {
              if (this.dataList[0]) {
                item2.schoolA = this.dataList[0].reexamineNum || '--'
              }
              if (this.dataList[1]) {
                item2.schoolB = this.dataList[1].reexamineNum || '--'
              }
              if (this.dataList[2]) {
                item2.schoolC = this.dataList[2].reexamineNum || '--'
              }
            }
            if (item2.name === '一志愿录取人数') {
              if (this.dataList[0]) {
                item2.schoolA = this.dataList[0].firstVolunteerMatriculateNum || '--'
              }
              if (this.dataList[1]) {
                item2.schoolB = this.dataList[1].firstVolunteerMatriculateNum || '--'
              }
              if (this.dataList[2]) {
                item2.schoolC = this.dataList[2].firstVolunteerMatriculateNum || '--'
              }
            }
            if (item2.name === '调剂录取') {
              if (this.dataList[0]) {
                item2.schoolA = this.dataList[0].adjustMatriculateNum || '--'
              }
              if (this.dataList[1]) {
                item2.schoolB = this.dataList[1].adjustMatriculateNum || '--'
              }
              if (this.dataList[2]) {
                item2.schoolC = this.dataList[2].adjustMatriculateNum || '--'
              }
            }
            if (item2.name === '推免人数') {
              if (this.dataList[0]) {
                item2.schoolA = this.dataList[0].recommendMatriculateNum || '--'
              }
              if (this.dataList[1]) {
                item2.schoolB = this.dataList[1].recommendMatriculateNum || '--'
              }
              if (this.dataList[2]) {
                item2.schoolC = this.dataList[2].recommendMatriculateNum || '--'
              }
            }
            if (item2.name === '是否有调剂') {
              if (this.dataList[0]) {
                item2.schoolA = this.dataList[0].doctoralProgram || '--'
              }
              if (this.dataList[1]) {
                item2.schoolB = this.dataList[1].doctoralProgram || '--'
              }
              if (this.dataList[2]) {
                item2.schoolC = this.dataList[2].doctoralProgram || '--'
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
.competitiveness {
  .zhextus {
    margin: 32rpx 0;
  }
}
</style>