<template>
  <view class="eprofessionalteacher">
    <view class="tabsa">
      <view class="h1">
        <view class="borleds">
        </view>
        <view class="titless">
          专业老师
        </view>
      </view>
      <view class="textp">
        <uni-table-s
          :list="teaList"
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
  teacherList,
} from "@/api/colleges/index"
import uniTableS from '@/pageThe/components/uni-table-s/uni-table-s.vue'

export default {
  props: ['schoolId', 'specialtyId'],
  data() {
    return {
      headerData: ['姓名', '研究方向', '邮箱', '电话'],
      headerAttr: ['teacherName', 'researchDirection', 'teacherEmail', 'teacherPhone',],
      num: '',
      scrollLeft: 0, //滚动位置
      teaList: []
    }
  },
  components: { uniTableS },
  onLoad() {
    // this.getUser()
  },
  onShow() {

  },
  mounted() {
    this.teacherListFn()
  },
  methods: {
    teacherListFn() {
      teacherList({
        schoolId: this.schoolId,
        specialtyId: this.specialtyId
      }).then(res => {
        this.teaList = res.data
      })
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
.eprofessionalteacher {
}
</style>