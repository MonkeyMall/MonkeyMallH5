<template>
  <view class="gresearchdirection">
    <view class="tabsa">
      <view class="h1">
        <view class="borleds">
        </view>
        <view class="titless">
          {{ year }}年拟录取名单(不含专项)
        </view>
      </view>
      <view class="textp">
        <uni-table-s v-if="matriculateList.length" :fixedAttrNum="1" :list="matriculateList" :headerData="headerData"
          :headerAttr="headerAttr">
        </uni-table-s>
      </view>
      <view class="h1" style="margin-top: 32rpx;">
        <view class="borleds">
        </view>
        <view class="titless" style="font-size: 31rpx;">
          {{ year }}年一志愿与校内调剂复试名单(不含专项)
        </view>
      </view>
      <view class="textp">
        <scroll-view class="scrolls" scroll-x='true' scroll-with-animation :scroll-left='scrollLeft'>
          <uni-table-s v-if="farList.length" :fixedAttrNum="1" :list="farList" :headerData="headerData2"
            :headerAttr="headerAttr2">
          </uni-table-s>
        </scroll-view>
      </view>
      <view class="h1" style="margin-top: 32rpx;">
        <view class="borleds">
        </view>
        <view class="titless">
          {{ year }}年调剂出去复试名单
        </view>
      </view>
      <view class="textp">
        <scroll-view class="scrolls" scroll-x='true' scroll-with-animation :scroll-left='scrollLeft'>
          <uni-table-s v-if="aorList.length" :fixedAttrNum="1" :list="aorList" :headerData="headerData3"
            :headerAttr="headerAttr3">
          </uni-table-s>
        </scroll-view>
      </view>
      <view class="h1" style="margin-top: 32rpx;">
        <view class="borleds">
        </view>
        <view class="titless">
          {{ year }}年调剂出去拟录取名单
        </view>
      </view>
      <view class="textp">
        <scroll-view class="scrolls" scroll-x='true' scroll-with-animation :scroll-left='scrollLeft'>
          <uni-table-s v-if="aomList.length" :fixedAttrNum="1" :list="aomList" :headerData="headerData4"
            :headerAttr="headerAttr4">
          </uni-table-s>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script>
import {
  matriculateListFn,
  farListFn,
  aorListFn,
  aomListFn
} from "@/api/colleges/index"
import uniTableS from '@/pageThe/components/uni-table-s/uni-table-s.vue'

export default {
  dicts: ['major_volunteer_type'],
  props: ['schoolId', 'specialtyId'],
  components: { uniTableS },
  data() {
    return {
      year: 0,
      matriculateList: [],
      farList: [],
      aorList: [],
      aomList: [],
      act: 0, //高亮显示
      scrollLeft: 0, //滚动位置
      headerData: ['编号', '姓名', '学院', '专业代码', '专业名称', '初试成绩', '复试成绩', '录取总成绩', '一志愿学校'],
      headerAttr: ['studentCode', 'studentName', 'collegeName', 'specialtyCode', 'specialtyName', 'earlyScore', 'reexamineScore', 'grossScore', 'firstVolunteerSchoolName'],
      headerData2: ['编号', '姓名', '学院', '专业代码', '专业名称', '政治', '英语', '专业一', '专业二', '初试成绩', '志愿类型'],
      headerAttr2: ['studentCode', 'studentName', 'collegeName', 'specialtyCode', 'specialtyName', 'politics', 'english', 'specialtyFirst', 'specialtySecend', 'earlyScore', 'volunteerTypeName'],
      headerData3: ['编号', '姓名', '学院', '专业代码', '专业名称', '政治', '英语', '专业一', '专业二', '初试成绩', '调剂复试学校'],
      headerAttr3: ['studentCode', 'studentName', 'collegeName', 'specialtyCode', 'specialtyName', 'politics', 'english', 'specialtyFirst', 'specialtySecend', 'earlyScore', 'adjsutReexamineSchoolName'],
      headerData4: ['编号', '姓名', '录取学校', '学院', '专业代码', '专业名称', '初试成绩'],
      headerAttr4: ['studentCode', 'studentName', 'matriculateSchoolName', 'collegeName', 'specialtyCode', 'specialtyName', 'earlyScore'],
    }
  },
  onLoad() {
    // this.getUser()
  },
  onShow() {

  },
  mounted() {
    this.getMatriculateList()
    this.getFarList()
    this.getAorList()
    this.getAomList()
    this.getYear()

  },
  methods: {
    // 	2023年拟录取名单(不含专项)
    getMatriculateList() {
      matriculateListFn({
        schoolId: this.schoolId,
        specialtyId: this.specialtyId
      }).then(res => {
        if (res.code === 200 && res.data && res.data.length > 0) {
          this.matriculateList = res.data
          this.year = res.data[0].matriculateYear
        }
      })
    },
    //  录取名单-xxx一志愿与校内调剂复试名单(不含专项)
    getFarList() {
      farListFn({
        schoolId: this.schoolId,
        specialtyId: this.specialtyId
      }).then(res => {
        if (res.code === 200 && res.data && res.data.length > 0) {
          setTimeout(() => {
            this.dict.type.major_volunteer_type.forEach(item => {
              res.data.forEach(i => {
                if (+i.volunteerType === +item.value) {
                  this.$set(i, 'volunteerTypeName', item.label)
                }
              })
            })
            this.farList = res.data
          }, 500)
          this.year = res.data[0].matriculateYear
        }
      })
    },
    // 录取名单-xxx年调剂出去复试名单
    getAorList() {
      aorListFn({
        schoolId: this.schoolId,
        specialtyId: this.specialtyId
      }).then(res => {
        if (res.code === 200 && res.data && res.data.length > 0) {
          this.aorList = res.data
          this.year = res.data[0].matriculateYear
        }
      })
    },
    // 录取名单-xxx年调剂出去拟录取名单
    getAomList() {
      aomListFn({
        schoolId: this.schoolId,
        specialtyId: this.specialtyId
      }).then(res => {
        if (res.code === 200 && res.data && res.data.length > 0) {
          this.aomList = res.data
          this.year = res.data[0].matriculateYear
        }
      })
    },
    // 获取当前年份
    getYear() {
      // const date = new Date()
      // const year = date.getFullYear()
      const currentDate = new Date();
      const previousYear = currentDate.getFullYear() - 1;
      console.log('previousYear: ', previousYear);
      this.year = previousYear // 假设当前年份为2023年，则上一年的年份为2022年。你可以根据需要修改这个值。
    },
  }
}
</script>

<style lang="scss">
.gresearchdirection {
  .scrolls {
    height: auto !important;
  }

  ._tr {
    flex-direction: row !important;
  }

  ._th {
    padding: 0 14rpx;
    font-size: 24rpx !important;
  }

  ._td {
    line-height: 30rpx !important;
  }
}
</style>