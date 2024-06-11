<template>
  <view class="chartanalysis">
    <view class="whiteBox">
      <view class="h1">
        <view class="borleds">
        </view>
        <view class="titless">
          {{ quserparms.specialtyAffiliatingSubject || quserparms.specialtyAffiliatingCategory }}单科总分国家线趋势图
        </view>
      </view>
      <view class="textp">
        <view class="charts-box">
          <qiun-data-charts type="line" :opts="opts" :canvas2d="true" :chartData="chartData" :reshow="current === 1" />
        </view>
      </view>
    </view>
    <view class="whiteBox">
      <view class="h1">
        <view class="borleds">
        </view>
        <view class="titless">
          {{ quserparms.specialtyAffiliatingSubject || quserparms.specialtyAffiliatingCategory }}单科分数
        </view>
      </view>
      <view class="textp">
        <uni-table-s className="header-fixed-1" :list="listData" :headerData="headerData" :headerAttr="headerAttr">
        </uni-table-s>
      </view>
    </view>


  </view>
</template>

<script>
import { findMajorCountryLineChart, findMajorCountryLine, findMajorCountryLineTrend } from '@/api/colleges/index'
import uniTableS from '@/pageSec/components/uni-table-s/uni-table-s.vue'
// import qiunDataCharts from '@/pageSec/components/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue'
export default {
  props: ['quserparms'],
  data() {
    return {
      dataList: [],
      listData: [],
      current: 1,
      num: '',
      columns: [
        ['2023', '2022', '2021', '2020']
      ],
      chartData: {},
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
      headerData: [
        {
          name: '年份'
        },
        {
          name: 'A类',
          childrens: [
            { name: '单科(满分=100)' },
            { name: '单科(满分>100)' }
          ]
        },
        {
          name: 'B类',
          childrens: [
            { name: '单科(满分=100)' },
            { name: '单科(满分>100)' }
          ]
        }
      ],
      headerAttr: ['year', 'afullScoreEqualHundred', 'afullScoreOutweighHundred', 'bfullScoreEqualHundred', 'bfullScoreOutweighHundred'],
    }
  },
  components: {
    uniTableS
  },
  onLoad() {
    // this.getUser()
  },
  mounted() {
    console.log(this.quserparms)
    this.getFindMajorCountryLineChart(this.quserparms)
    this.getFindMajorCountryLine(this.quserparms)
  },
  watch: {
    quserparms(newVal, oldVal) {
      console.log('newVal: ', newVal);
      this.getFindMajorCountryLine(newVal)
      this.getFindMajorCountryLineChart(newVal)
    }
  },
  onShow() {

  },
  methods: {
    getFindMajorCountryLineChart(quserparms) {
      findMajorCountryLineChart({
        specialtyMasterType: quserparms.specialtyMasterType,
        specialtyAffiliatingCategory: quserparms.specialtyAffiliatingCategory,
        specialtyAffiliatingSubject: quserparms.specialtyAffiliatingSubject,
      }).then(res => {
        if (res.code == 200) {
          res.data.sort((a, b) => {
            return b.year - a.year
          })
          this.listData = res.data
        }
      })
    },
    // 获取趋势
    getFindMajorCountryLine(quserparms) {
      findMajorCountryLineTrend({
        specialtyMasterType: quserparms.specialtyMasterType,
        specialtyAffiliatingCategory: quserparms.specialtyAffiliatingCategory,
        specialtyAffiliatingSubject: quserparms.specialtyAffiliatingSubject,
      }).then(res => {
        if (res.code == 200) {
          this.dataList = res.data
          this.getServerData(this.dataList);
        }
      })
    },
    getServerData(data) {
      // if (this.quserparms.specialtyAffiliatingSubject) {
      // data.forEach(item => {
      //   item.majorCountryLineDto.forEach(i => {
      //     i.hasAdd = false
      //     if(categories && categories.length > 0){
      //         categories.forEach(o => {
      //           // 如已存在就不添加
      //           if(o === i.year){
      //             i.hasAdd = true
      //           }else{
      //             i.hasAdd = false
      //           }
      //       })
      //     }else{
      //       i.hasAdd = false
      //     }
      //    if(!i.hasAdd){
      //     categories.push(i.year)
      //    }
      //   })
      // })
      let aData = []
      let bData = []
      data.forEach(item => {
        item.majorCountryLineDto.sort((a, b) => {
          return a.year - b.year
        })
      })
      console.log(data, '排序后的data')
      let categories = data[0].majorCountryLineDto.map(item => {
        return item.year
      })
      data.forEach(item => {
        if (item.examCategories === 'A类') {
          aData = item.majorCountryLineDto.map(item => {
            return item.totalScore
          })
        }
        if (item.examCategories === 'B类') {
          bData = item.majorCountryLineDto.map(item => {
            return item.totalScore
          })
        }
      })
      let res = {
        categories: categories,
        series: [{
          name: "A类",
          data: aData
        },
        {
          name: "B类",
          data: bData
        }
        ]
      };
      this.chartData = JSON.parse(JSON.stringify(res));
      console.log('this.chartData: ', this.chartData);
      // }
    },
  }
}
</script>

<style lang="scss">
.chartanalysis {
  ._td {
    line-height: 60rpx;
  }

  .h1 {
    margin-bottom: 32rpx;
    padding: 0 16rpx;
    display: flex;
    align-items: center;

    .borleds {
      width: 7rpx;
      height: 30rpx;
      opacity: 1;
      border-radius: 16rpx;
      background: $uni-text-color-placeholder;
      margin-right: 16rpx;
      margin-top: 2rpx;
    }

    .titless {
      font-size: 32rpx;
      font-weight: 600;
      color: $uni-text-color;
      line-height: 45rpx;
    }

    .pitcs {
      display: block;
      font-size: 26rpx;
      font-weight: 300;
      letter-spacing: 0px;
      color: $uni-text-color-placeholder;
      text-align: right;
      flex: 1;
    }
  }

  .textp {
    padding: 0 16rpx;
    padding-top: 32rpx;
    font-size: 28rpx;
    font-weight: 400;
    line-height: 50rpx;
    color: $uni-text-color;
    text-align: justify;
    vertical-align: top;
    border-top: 2rpx solid rgba(246, 248, 253, 1);
  }

  .charts-box {
    width: 100%;
    height: 400rpx;
  }

  .tubiao {
    height: 200rpx;
  }
}

.whiteBox {
  background: #FAFAFA;
  border-radius: 8rpx;
  padding: 30rpx 5rpx;
  margin-bottom: 31rpx;
}
</style>