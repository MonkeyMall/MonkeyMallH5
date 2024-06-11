<template>
  <view class="creportsituation">
    <view class="tabsa">
      <view class="h1">
        <view class="borleds">
        </view>
        <view class="titless">
          近年招收人数
        </view>
      </view>
      <view class="textp">
        <uni-table-s
          :list="EiryList"
          :headerData="headerData"
          :headerAttr="headerAttr"
        >
        </uni-table-s>
      </view>
      <view
        class="h1"
        style="margin-top: 32rpx;"
      >
        <view class="borleds">
        </view>
        <view class="titless">
          复录比
        </view>
        <text class="pitcs">复录比能更直接的展示出目标院校复试录取难度</text>
      </view>
      <view class="textp">
        <view style="width: 100%;">
          <scroll-view
            class="scroll"
            scroll-x='true'
            scroll-with-animation
            :scroll-left='scrollLeft'
          >
            <view
              v-for="(item,index) in RepeatList"
              :key="index"
              @click="getColor(item,index)"
              class="flex-shrink px-2 py-1 scroll-item"
              :class="act==index?'active':''"
            >
              <image
                src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/college/collegeprofile14.svg"
                mode=""
              ></image>
              {{item.collegeName}}
            </view>
          </scroll-view>
        </view>
        <uni-table-s
          :list="RepeatList[act].collegeList"
          :headerData="headerData2"
          :headerAttr="headerAttr2"
        >
        </uni-table-s>
      </view>
      <view
        class="h1"
        style="margin-top: 32rpx;"
      >
        <view class="borleds">
        </view>
        <view class="titless">
          报录比
        </view>
        <text class="pitcs">招录比知道学校的考研热度大小</text>
      </view>
      <view class="textp">
        <view style="width: 100%;">
          <scroll-view
            class="scroll"
            scroll-x='true'
            scroll-with-animation
            :scroll-left='scrollLeft'
          >
            <view
              v-for="(item,index) in ApplyList"
              :key="index"
              @click="getColor2(item,index)"
              class="flex-shrink px-2 py-1 scroll-item"
              :class="act2==index?'active':''"
            >
              <image
                src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/college/collegeprofile14.svg"
                mode=""
              ></image>
              {{item.collegeName}}
            </view>
          </scroll-view>
        </view>
        <uni-table-s
          :list="ApplyList[act2].collegeList"
          :headerData="headerData3"
          :headerAttr="headerAttr3"
        >
        </uni-table-s>
      </view>
    </view>
  </view>
</template>

<script>
import uniTableS from '@/pageThe/components/uni-table-s/uni-table-s.vue'
import {
  findEiryList,
  findApplyList,
  findRepeatList,
  findYear
} from "@/api/colleges/index"
export default {
  props: ['schoolId', 'specialtyId'],
  components: { uniTableS },
  data() {
    return {
      headerData: ['名称/年份'],
      headerAttr: ['name'],
      headerData2: ['名称/年份'],
      headerAttr2: ['name'],
      headerData3: ['名称/年份'],
      headerAttr3: ['name'],
      EiryList: {},
      ApplyList: [],
      RepeatList: [],
      act: 0, //复录比高亮显示
      act2: 0, //报录比高亮显示
      lists: ['2023', '2022', '2021', '20230', '2019'],
      scrollLeft: 0, //滚动位置
    }
  },
  onLoad() {
    // this.getUser()
  },
  onShow() {

  },
  mounted() {
    this.handfindEiryList()
    this.handfindApplyList()
    this.handfindRepeatList()
  },
  methods: {
    // 查询近年招生情况
    handfindEiryList() {
      let data = {
        schoolId: this.schoolId,
        specialtyId: this.specialtyId,
      }
      findEiryList(data).then(response => {
        if (response.code === 200) {
          if (response.data) {
            let applyMatriculateYear = response.data.applyMatriculateYear.map(item => {
              return parseInt(item)
            })
            response.data.resultList.sort((a, b) => {
              return a.orderNum - b.orderNum
            })
            this.headerData = this.headerData.concat(applyMatriculateYear)
            this.headerAttr = this.headerAttr.concat(applyMatriculateYear)
            this.EiryList = response.data.resultList
            console.log(this.EiryList, '    console.log(this.EiryList)')
          }

        }


      })
    },
    // 查询 报录比
    handfindApplyList() {
      let data = {
        schoolId: this.schoolId,
        specialtyId: this.specialtyId,
      }
      findApplyList(data).then(response => {
        if (response.code === 200) {
          if (response.data) {
            let applyMatriculateYear = response.data.applyMatriculateYear.map(item => {
              return parseInt(item)
            })
            response.data.resultList.forEach(item => {
              item.collegeList.sort((a, b) => {
                return a.orderNum - b.orderNum
              })
            })
            this.headerData3 = this.headerData3.concat(applyMatriculateYear)
            this.headerAttr3 = this.headerAttr3.concat(applyMatriculateYear)
            this.ApplyList = response.data.resultList
          }
        }
      })
    },
    handfindRepeatList() {
      let data = {
        schoolId: this.schoolId,
        specialtyId: this.specialtyId,
      }
      // 查询复录比
      findRepeatList(data).then(response => {
        if (response.code === 200) {
          if (response.data) {
            let applyMatriculateYear = response.data.applyMatriculateYear.map(item => {
              return parseInt(item)
            })
            response.data.resultList.forEach(item => {
              item.collegeList.sort((a, b) => {
                return a.orderNum - b.orderNum
              })
            })
            this.headerData2 = this.headerData2.concat(applyMatriculateYear)
            this.headerAttr2 = this.headerAttr2.concat(applyMatriculateYear)
            this.RepeatList = response.data.resultList
          }
        }
      })
    },
    // 切换当前Tab
    getColor(item, index) {
      this.act = index
      this.moveTo(index) //滚动到中间
    },
    getColor2(item, index) {
      this.act2 = index
      this.moveTo(index) //滚动到中间
    },
    // 将点击元素移动到中间
    moveTo(index) {
      const query = uni.createSelectorQuery().in(this)
      query
        .selectAll(`.scroll-item`) //拿到每一个tabs标签
        .boundingClientRect(rect => {
          const {
            windowWidth
          } = uni.getSystemInfoSync(); //获取屏幕宽度
          let width = 0
          // 循环获取计算当前点击的标签项距离左侧的距离
          for (let i = 0; i < index; i++) {
            width += rect[i].width
          }
          // 当大于屏幕一半的宽度则滚动，否则就设置位置为0
          if (width > windowWidth / 2) {
            this.scrollLeft = width + rect[index].width / 2 - windowWidth / 2
          } else {
            this.scrollLeft = 0
          }
        }).exec()
    }
  }
}
</script>

<style lang="scss">
.creportsituation {
}
</style>