<template>
  <view class="creportsituation">
    <view class="tabsa">
      <view class="h1">
        <view class="borleds">
        </view>
        <view class="titless">
          国家分数线
        </view>
      </view>
      <view class="textp">
        <uni-table-s
          :list="clList"
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
          复试平均分
        </view>
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
              v-for="(item,index) in gList"
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
          :list="gList[act].majorRetestAvgScoreDto"
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
          录取最低分
        </view>
      </view>
      <view class="textp">
        <uni-table-s
          :list="scoreList"
          :headerData="headerData2"
          :headerAttr="headerAttr2"
        >
        </uni-table-s>
        <view class="charts-box">
          <qiun-data-charts
            type="line"
            :canvas2d="true"
            :opts="opts"
            :chartData="chartData"
            :reshow="current === 1"
          />
        </view>
      </view>
      <view
        class="h1"
        style="margin-top: 32rpx;"
      >
        <view class="borleds">
        </view>
        <view class="titless">
          录取最高分
        </view>
      </view>
      <view class="textp">
        <uni-table-s
          :list="scoreList"
          :headerData="headerData3"
          :headerAttr="headerAttr3"
        >
        </uni-table-s>
        <view class="charts-box">
          <qiun-data-charts
            type="line"
            :opts="opts"
            :canvas2d="true"
            :chartData="chartData2"
            :reshow="current === 1"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {
  sclList,
  rgList,
  mmmsList
} from "@/api/colleges/index"
import uniTableS from '@/pageThe/components/uni-table-s/uni-table-s.vue'
// import qiunDataCharts from '@/pageThe/components/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue'

export default {
  props: ['schoolId', 'specialtyId'],
  components: { uniTableS },
  data() {
    return {
      headerData: ['年份', '总分', '政治', '外语', '专业一', '专业二'],
      headerAttr: ['yearTime', 'totalScore', 'politics', 'english', 'specialtyFirst', 'specialtySecend'],
      headerData2: ['年份', '录取最低分', '是否接受调剂'],
      headerAttr2: ['yearTime', 'minScore', 'isAdjust'],
      headerData3: ['年份', '录取最高分', '是否接受调剂'],
      headerAttr3: ['yearTime', 'maxScore', 'isAdjust'],
      clList: [],
      gList: [],
      act: 0, //高亮显示
      scrollLeft: 0, //滚动位置
      scoreList: [],
      current: 1,
      chartData: {}, //最低分折线图数据
      chartData2: {}, //最高分折线图数据
      opts: {
        color: ["rgba(252, 81, 95, 1)", "rgba(53, 104, 245, 1)", "rgba(43, 199, 160, 1)"],
        padding: [15, 10, 0, 0],
        enableScroll: false,
        legend: {
          "show": false,
        },
        xAxis: {
          disableGrid: true
        },
        yAxis: {
          gridType: "dash",
          dashLength: 2
        },
        extra: {
          line: {
            type: "straight",
            width: 2,
            activeType: "hollow"
          }
        }
      },
    }
  },
  onLoad() {
    // this.getUser()
  },
  onShow() {

  },
  mounted() {
    this.handsclList()
    this.handrgList()
    this.handmmmsList()
  },
  methods: {
    // 获取国家分数线
    handsclList() {
      let data = {
        schoolId: this.schoolId,
        specialtyId: this.specialtyId,
      }
      sclList(data).then(response => {
        if (response.code === 200) {
          this.clList = response.data
        }

        console.log(this.clList)
      })
    },
    // 获取复试平均分列表
    handrgList() {
      let data = {
        schoolId: this.schoolId,
        specialtyId: this.specialtyId,
      }
      rgList(data).then(response => {
        if (response.code === 200) {
          this.gList = response.data
        }

        // console.log(this.gList)
      })
    },
    // 获取最高分、最低分
    handmmmsList() {
      let data = {
        schoolId: this.schoolId,
        specialtyId: this.specialtyId,
      }
      mmmsList(data).then(response => {
        if (response.code === 200) {
          response.data.forEach(item => {
            if (item.isAdjust === 0) {
              item.isAdjust = '是'
            } else {
              item.isAdjust = '否'
            }
          })
          this.scoreList = response.data
          this.getServerData(response.data)
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
    },
    getServerData(data) {
      setTimeout(() => {
        let dataArr = data.map(item => {
          return item.yearTime
        })
        dataArr.sort((a, b) => {
          return a - b
        })
        let minData = data.map(item => {
          return item.minScore
        })
        let maxData = data.map(item => {
          return item.maxScore
        })
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
          categories: dataArr,
          series: [{
            name: "录取最低分",
            data: minData
          },
          ]
        };
        this.chartData = JSON.parse(JSON.stringify(res));
        let res2 = {
          categories: dataArr,
          series: [{
            name: "录取最高分",
            data: maxData
          },
          ]
        };
        this.chartData2 = JSON.parse(JSON.stringify(res2));
      }, 1600);
    },
  }
}
</script>

<style lang="scss">
.creportsituation {
}
</style>