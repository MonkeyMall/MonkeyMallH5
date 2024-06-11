<template>
  <view class="bexaminationsubject">
    <view class="tabsa">
      <view class="h1">
        <view class="borleds">
        </view>
        <view class="titless">
          考试科目
        </view>
      </view>
      <view class="textp">
        <view style="width: 100%;margin-bottom: 35rpx;" v-if="EsList.length">
          <scroll-view
            class="scroll"
            scroll-x='true'
            scroll-with-animation
            :scroll-left='scrollLeft'
          >
            <view
              v-for="(item,index) in EsList"
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
        <view class="">
          <uni-table-s
              :list="EsList[act].majorEarlySubjectDto"
              :headerData="headerData"
              :headerAttr="headerAttr"
            >
            </uni-table-s>
          
          <view style="margin-top: 40rpx;"> </view>
          <uni-table-s
              :list="EbList"
              :headerData="headerData2"
              :headerAttr="headerAttr2"
            >
            </uni-table-s>
          <view style="margin-top: 40rpx;">
          </view>
          <uni-table-s
              :list="Rcist"
              :headerData="headerData3"
              :headerAttr="headerAttr3"
            >
            </uni-table-s>

        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {
  subjectEsList,
  subjectEbList,
  subjectRcist
} from "@/api/colleges/index"
import uniTableS from '@/pageThe/components/uni-table-s/uni-table-s.vue'
export default {
  components:{uniTableS},
  props: ['schoolId', 'specialtyId'],
  data() {
    return {
      headerData: ['研究方向', '初试科目', '备注'],
      headerAttr: ['researchDirection', 'list', 'remark'],
      headerData2: ['科目', '初试参考书'],
      headerAttr2: ['subjectName', 'book'],
      headerData3: ['序号', '复试内容'],
      headerAttr3: ['index', 'reexamineContent'],
      listData:[],
      lineBg: "https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/college/collegeprofile14.svg",
      num: '',
      act: 0, //高亮显示
      scrollLeft: 0, //滚动位置
      EsList: [],
      EbList: [],
      Rcist: [],
    }
  },
  onLoad() {
    // this.getUser()

  },
  onShow() {

  },
  mounted() {
    this.handsubjectEsList()
    this.handsubjectEbList()
    this.handsubjectRcist()
  },
  methods: {
    // 获取考试科目
    handsubjectEsList() {
      let data = {
        schoolId: this.schoolId,
        specialtyId: this.specialtyId,
      }
      subjectEsList(data).then(response => {
        if (response.code == 200) {
          if(response.data.length > 0){
            console.log('response.data: ', response.data);
            response.data.forEach(i => {
              i.majorEarlySubjectDto.forEach(item => {
                item.list = [item.politics,item.foreignLanguage,item.specialtyFirst,item.specialtySecend]
              })
            })
            
          }
          this.EsList = response.data
          console.log('this.EsList: ', this.EsList);
        }
        
      })
    },
    // 查询初试参考书列表
    handsubjectEbList() {
      let data = {
        schoolId: this.schoolId,
        specialtyId: this.specialtyId,
      }
      subjectEbList(data).then(response => {
        if(response.code === 200){
          if(response.data.length > 0){
            response.data.forEach((item,i) => {
              item.index = i+1
            })
            this.EbList = response.data
          }
        }
        
      })
    },
    // 查询复试内容列表
    handsubjectRcist() {
      let data = {
        schoolId: this.schoolId,
        specialtyId: this.specialtyId,
      }
      subjectRcist(data).then(response => {
        if(response.code === 200){
          if(response.data.length > 0){
            response.data.forEach((item,i) => {
              item.index = i+1
            })
            this.Rcist = response.data
          }
        }
      })
    },
    click() {

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
</style>