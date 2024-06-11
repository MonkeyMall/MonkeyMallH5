<template>
  <view class="scoreline">
    <view class="tabsa">
      <view class="h1">
        <view class="borleds">
        </view>
        <view class="titless">
          录取最低分
        </view>
      </view>
      <view class="textp">
        <uni-table-s :list="minList" :headerData="headerData" :headerAttr="headerAttr">
        </uni-table-s>
        <view class="charts-box">
          <qiun-data-charts :canvas2d="true" type="line" :opts="opts" :chartData="chartData1" :reshow="current === 1" />
        </view>
      </view>

      <view class="h1">
        <view class="borleds">
        </view>
        <view class="titless">
          录取最高分
        </view>
      </view>
      <view class="textp">
        <uni-table-s :list="maxList" :headerData="headerData" :headerAttr="headerAttr">
        </uni-table-s>
        <view class="charts-box">
          <qiun-data-charts :canvas2d="true" type="line" :opts="opts2" :chartData="chartData2"
            :reshow="current === 1" />
        </view>
      </view>

    </view>
  </view>

</template>

<script>
import uniTableS from '@/pageThe/components/uni-table-s/uni-table-s.vue'
// import qiunDataCharts from '@/pageThe/components/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue'

export default {
  props: ['dataList'],
  components: { uniTableS },
  data() {
    return {
      minList: [],
      maxList: [],
      headerData: ['年份'],
      headerAttr: ['yearTime'],
      current: 1,
      chartData1: {},
      chartData2: {},
      opts: {
        color: ["rgba(252, 81, 95, 1)", "rgba(53, 104, 245, 1)", "rgba(43, 199, 160, 1)"],
        padding: [15, 10, 0, 15],
        enableScroll: false,
        legend: {},
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
      opts2: {
        color: ["rgba(252, 81, 95, 1)", "rgba(53, 104, 245, 1)", "rgba(43, 199, 160, 1)"],
        padding: [15, 10, 0, 15],
        enableScroll: false,
        legend: {},
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
  onLoad() { },
  onShow() {

  },
  mounted() {
    if (this.dataList.length === 2) {
      this.headerAttr = ['yearTime', 'schoolA', 'schoolB']
    }
    if (this.dataList.length === 3) {
      this.headerAttr = ['yearTime', 'schoolA', 'schoolB', 'schoolC']
    }
    this.getHeader()
    this.dataInit() //获取表格
  },
  methods: {
    getHeader() {
      console.log(this.dataList, '333')
      let arr = this.dataList.map(item => {
        return item.schoolName
      })
      this.headerData = this.headerData.concat(arr)
    },
    getData(val) {
      let arr = []
      this.dataList.forEach(item => {
        if (item.majorMatriculateMaxminScoreDtoList && item.majorMatriculateMaxminScoreDtoList.length) {
          item.majorMatriculateMaxminScoreDtoList.sort((a, b) => {
            return a.yearTime - b.yearTime
          })
          item.majorMatriculateMaxminScoreDtoList.forEach(i => {
            let obj = {
              yearTime: i.yearTime
            }
            arr.push(obj)
          })
        }

      })
      for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[i].yearTime === arr[j].yearTime) {
            arr.splice(j, 1)
            j--
          }
        }
      }

      this.chartData1 = this.getChart(arr, 'minScore') //获取折线图
      console.log('this.chartData1: ', this.chartData1);
      this.chartData2 = this.getChart(arr, 'maxScore') //获取折线图

      console.log('this.chartData2: ', this.chartData2);
      console.log(arr, '22222这是去重后的属猪')
      if (this.dataList[0]) {
        // 第一个学校的数据配置
        this.dataList[0].majorMatriculateMaxminScoreDtoList.forEach(item => {
          arr.forEach(i => {
            if (item.yearTime == i.yearTime) {
              i.schoolA = item[val]
            }
          })
        })
      }
      if (this.dataList[1]) {
        // 第一个学校的数据配置
        this.dataList[1].majorMatriculateMaxminScoreDtoList.forEach(item => {
          arr.forEach(i => {
            console.log(item.yearTime == i.yearTime, item.yearTime, i.yearTime)
            if (item.yearTime == i.yearTime) {
              i.schoolB = item[val]
            }
          })
        })
      }
      if (this.dataList[2]) {
        // 第一个学校的数据配置
        this.dataList[2].majorMatriculateMaxminScoreDtoList.forEach(item => {
          arr.forEach(i => {
            if (item.yearTime == i.yearTime) {
              i.schoolC = item[val]
            }
          })
        })
      }
      console.log(arr, '这是最终数据')
      return arr
      // this.minList = arr
    },
    dataInit() {
      // 获取最低分数组
      this.minList = this.getData('minScore')
      this.maxList = this.getData('maxScore')
      return
    },
    getChart(arr, val) {
      console.log('arr: ', arr);
      let categories = arr.map(item => {
        return item.yearTime
      })
      let schoolAData = []
      let schoolBData = []
      let schoolCData = []
      if (this.dataList[0]) {
        schoolAData = this.dataList[0].majorMatriculateMaxminScoreDtoList.map(item => {
          return item[val]
        })
      }
      if (this.dataList[1]) {
        schoolBData = this.dataList[1].majorMatriculateMaxminScoreDtoList.map(item => {
          return item[val]
        })
      }
      if (this.dataList[2]) {
        schoolCData = this.dataList[2].majorMatriculateMaxminScoreDtoList.map(item => {
          return item[val]
        })
      }
      console.log(this.dataList)
      let res = {
        categories: categories,
        series: [{
          name: this.dataList[0].schoolName,
          data: schoolAData
        },
        {
          name: this.dataList[1].schoolName,
          data: schoolBData
        }
        ]
      };
      if (this.dataList.length === 3) {
        res.series.push({
          name: this.dataList[2].schoolName,
          data: schoolCData
        })
      }
      return JSON.parse(JSON.stringify(res));
    },
    getServerData() {
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
          categories: ["2018", "2019", "2020", "2021", "2022", "2023"],
          series: [{
            name: "成交量A",
            data: [35, 40, 25, 37, 4, 20]
          },
          {
            name: "成交量B",
            data: [70, 40, 65, 100, 44, 68]
          },
          {
            name: "成交量C",
            data: [100, 80, 95, 150, 112, 132]
          }
          ]
        };
        this.chartData = JSON.parse(JSON.stringify(res));
      }, 500);
    },
  }
}
</script>

<style lang="scss">
.scoreline {
  .charts-box {
    margin: 32rpx 0;
    width: 100%;
    height: 400rpx;
  }
}
</style>