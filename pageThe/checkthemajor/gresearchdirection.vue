<template>
  <view class="gresearchdirection">
    <view class="tabsa">
      <view
        class="h1"
      >
        <view class="borleds">
        </view>
        <view class="titless">
          研究方向
        </view>
      </view>
      <view class="textp">
        <view style="width: 100%;" v-if="ardList.length">
          <scroll-view
            class="scroll"
            scroll-x='true'
            scroll-with-animation
            :scroll-left='scrollLeft'
          >
            <view
              v-for="(item,index) in ardList"
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
          :list="ardList[act].majorResearchDirectionDto"
          :headerData="headerData"
          :headerAttr="headerAttr"
        >
        </uni-table-s>
      </view>

    </view>
  </view>
</template>

<script>
import {
  ardListFn
} from "@/api/colleges/index"
import uniTableS from '@/pageThe/components/uni-table-s/uni-table-s.vue'
export default {
  props: ['schoolId', 'specialtyId'],
  components: { uniTableS },
  data() {
    return {
      ardList: [],
      num: '',
      act: 0, //高亮显示
      scrollLeft: 0, //滚动位置
      headerData: ['年份', '研究方向'],
      headerAttr: ['researchDirectionYear', 'list'],
    }
  },
  onLoad() {
    // this.getUser()
  },
  onShow() {

  },
  mounted() {
    this.getArdList()
  },
  methods: {
    getArdList() {
      ardListFn({
        schoolId: this.schoolId,
        specialtyId: this.specialtyId
      }).then(res => {
        console.log(res, '33333333333333333')
        if (res.code === 200) {
          res.data.forEach(item => {
            item.majorResearchDirectionDto.forEach(i => {
              i['list'] = i.majorResearchDirectionDto.map(o => {
                return o.researchDirection
              })
            })
          })
          this.ardList = res.data
          console.log('this.ardList: ', this.ardList);
        }

      })
    },
    // 切换当前Tab
    getColor(item, index) {
      this.act = index
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
.gresearchdirection {
}
</style>