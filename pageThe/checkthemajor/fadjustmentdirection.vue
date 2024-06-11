<template>
  <view class="fadjustmentdirection">
    <view class="tabsa">
      <view class="h1">
        <view class="borleds">
        </view>
        <view class="titless">
          调剂信息
        </view>
      </view>
      <view class="textp">
        <view style="width: 100%;" v-if="admList.length">
          <scroll-view class="scroll" scroll-x='true' scroll-with-animation :scroll-left='scrollLeft'>
            <view v-for="(item, index) in admList" :key="index" @click="getColor(item, index)"
              class="flex-shrink px-2 py-1 scroll-item" :class="act == index ? 'active' : ''">
              <image
                src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/college/collegeprofile14.svg"
                mode=""></image>
              {{ item.collegeName }}
            </view>
          </scroll-view>
        </view>
        <uni-table-s :isSetWidth="true" :isUvParse="true" :list="admList[act].dto.majorAdjustMessageList"
          :headerData="headerData1" :headerAttr="headerAttr1">
        </uni-table-s>
      </view>
      <view class="h1" style="margin-top: 32rpx;">
        <view class="borleds">
        </view>
        <view class="titless">
          调剂人数与调剂分数分布
        </view>
      </view>
      <view class="textp">
        <view class="charts-box">
          <qiun-data-charts type="line" :canvas2d="true" :opts="opts" :chartData="chartData" :reshow="current === 1" />
        </view>
        <view style="margin-top: 30rpx;">
          <uni-table-s :list="admList[act].dto.mAdjustNumScoreSpreadList" :headerData="headerData2"
            :headerAttr="headerAttr2">
          </uni-table-s>
        </view>
      </view>
      <view class="h1" style="margin-top: 32rpx;">
        <view class="borleds">
        </view>
        <view class="titless">
          调剂来源
        </view>
      </view>
      <view class="textp">
        <view style="width: 100%;">
          <scroll-view class="scroll" scroll-x='true' scroll-with-animation :scroll-left='scrollLeft'>
            <view v-for="(item, index) in admList[act].dto.matriculateAdjustFromList" :key="index"
              @click="getColor2(item, index)" class="flex-shrink px-2 py-1 scroll-item"
              :class="act2 == index ? 'active' : ''">
              <image
                src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/college/collegeprofile14.svg"
                mode=""></image>
              {{ item.matriculateYear }}
            </view>
          </scroll-view>
        </view>
        <uni-table-s :list="admList[act].dto.matriculateAdjustFromList[act2].yearDto" :headerData="headerData3"
          :headerAttr="headerAttr3">
        </uni-table-s>
      </view>
      <view class="h1" style="margin-top: 32rpx;">
        <view class="borleds">
        </view>
        <view class="titless">
          调剂去向
        </view>
      </view>
      <view class="textp">
        <view style="width: 100%;">
          <scroll-view class="scroll" scroll-x='true' scroll-with-animation :scroll-left='scrollLeft'>
            <view v-for="(item, index) in admList[act].dto.majorAdjustOutMatriculateToList" :key="index"
              @click="getColor3(item, index)" class="flex-shrink px-2 py-1 scroll-item"
              :class="act3 == index ? 'active' : ''">
              <image
                src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/college/collegeprofile14.svg"
                mode=""></image>
              {{ item.matriculateYear }}
            </view>
          </scroll-view>
        </view>
        <uni-table-s :list="admList[act].dto.majorAdjustOutMatriculateToList[act2].yearDto" :headerData="headerData4"
          :headerAttr="headerAttr4">
        </uni-table-s>
      </view>
    </view>
  </view>
</template>

<script>
import {
  admListFn

} from "@/api/colleges/index"
import uniTableS from '@/pageThe/components/uni-table-s/uni-table-s.vue'
// import qiunDataCharts from '@/pageThe/components/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue'

export default {
  props: ['schoolId', 'specialtyId'],
  components: { uniTableS },
  data() {
    return {
      isSetWidth: true,
      admList: {},
      headerData1: ['年份', '研究方向', '说明'],
      headerAttr1: ['adjustYear', 'researchDirection', 'illustrate'],
      headerData2: ['年份'],
      headerAttr2: ['matriculateYear', 'minTocenton', 'centonToMax'],
      headerData3: ['序号', '一志愿学校', '备注'],
      headerAttr3: ['indexVal', 'firstVolunteerSchoolName', 'remark'],
      headerData4: ['序号', '学校', '调剂分数'],
      headerAttr4: ['indexVal', 'matriculateSchoolName', 'grossScore'],
      num: '',
      act: 0, //高亮显示
      act2: 0, //调剂来源高亮显示
      act3: 0, //调剂去向高亮显示
      lists: ['年份', '总分', '政治', '外语', '专业', '专业'],
      scrollLeft: 0, //滚动位置
      list: [{
        name: '(001)数学科学院',
      }, {
        name: '(028)光华管理学院',
      }, {
        name: '(047)深圳研究生院'
      }],
      current: 1,
      chartData: {},
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
    this.admListFun()

  },
  methods: {
    admListFun() {
      admListFn({
        schoolId: this.schoolId,
        specialtyId: this.specialtyId
        // specialtyId: '12'
      }).then(res => {
        if (res.code === 200) {
          if (res.data.length) {
            res.data.forEach(item => {
              // if(item.dto && item.dto.length){
              // item.dto.forEach(item1 => {
              if (item.dto.matriculateAdjustMinScoreList && item.dto.matriculateAdjustMinScoreList.length) {
                item.dto.matriculateAdjustMinScoreList.forEach(item2 => {
                  item2.grossScore = item2.grossScore || 0
                })
              }
              if (item.dto.matriculateAdjustFromList && item.dto.matriculateAdjustFromList.length) {
                item.dto.matriculateAdjustFromList.forEach(item3 => {
                  // console.log('item1.matriculateAdjustFromList: ', item1.matriculateAdjustFromList);
                  item3.yearDto.forEach((item4, index4) => {
                    console.log('item4: ', item4);
                    item4.indexVal = index4 + 1
                  })
                })
              }
              if (item.dto.majorAdjustOutMatriculateToList && item.dto.majorAdjustOutMatriculateToList.length) {
                item.dto.majorAdjustOutMatriculateToList.forEach(item3 => {
                  item3.yearDto.forEach((item4, index4) => {
                    console.log('item4: ', item4);
                    item4.indexVal = index4 + 1
                  })
                })
              }

              if (item.dto.majorAdjustMessageList && item.dto.majorAdjustMessageList.length) {
                item.dto.majorAdjustMessageList.forEach(item3 => {
                  item3.researchDirection = item3.yearDto.map((item4, index4) => {
                    return item4.researchDirection
                  })
                  if (item3.yearDto && item3.yearDto.length > 0) {
                    item3.illustrate = `<p>招生状态：${item3.yearDto[0].enrollStatus || '-'}</p> 
                    <p>招生人数：${item3.yearDto[0].enrollNum || '-'}</p>
                    <p>调剂人数：${item3.yearDto[0].adjustNum || '-'}</p>
                    <p>最高分：${item3.yearDto[0].maxGrossScore || '-'}</p>
                    <p>中位数：${item3.yearDto[0].centerNum || '-'}</p>
                    <p>最低分：${item3.yearDto[0].minGrossScore || '-'}</p>
                    <p>联系方式：${item3.yearDto[0].contactInformation || '-'}</p>
                    <p>官方链接：${item3.yearDto[0].officialLink || '-'}</p>
                    <p></p>
                    <p>${item3.yearDto[0].illustrate || '-'}</p>`
                  }

                })
              }
              // })
              // }
            })
            // if (res.data.matriculateAdjustFromMapList && res.data.matriculateAdjustFromMapList.length > 0) {
            //   res.data.matriculateAdjustFromMapList.forEach(item => {
            //     console.log('item: ', item);
            //     if (item.dto && item.dto.length > 0) {
            //       item.dto.forEach(i => {
            //         i.yearDto.forEach((o, index) => {
            //           o.indexVal = index + 1
            //           if (!o.remark) {
            //             o.remark = '--'
            //           }
            //         })
            //       })
            //     }

            //   })
            // }
            // if (res.data.majorAdjustOutMatriculateToMapList && res.data.majorAdjustOutMatriculateToMapList.length > 0) {
            //   res.data.majorAdjustOutMatriculateToMapList.forEach(item => {
            //     console.log('item: ', item);
            //     if (item.dto && item.dto.length > 0) {
            //       item.dto.forEach(i => {
            //         i.yearDto.forEach((o, index) => {
            //           o.indexVal = index + 1
            //           if (!o.remark) {
            //             o.remark = '--'
            //           }
            //         })
            //       })
            //     }

            //   })
            // }


            if (res.data[this.act].dto.mAdjustNumScoreSpreadList && res.data[this.act].dto.mAdjustNumScoreSpreadList.length > 0) {
              // if (res.data.mAdjustNumScoreSpreadMapList[this.act].dto && res.data.mAdjustNumScoreSpreadMapList[this.act].dto.length) {
              this.getTJPeo(res.data[this.act].dto.mAdjustNumScoreSpreadList)
              // }
            }

            // if (res.data.matriculateAdjustMinScoreMapList && res.data.matriculateAdjustMinScoreMapList.length > 0) {
            this.getServerData(res.data[this.act].dto.matriculateAdjustMinScoreList);
            // }
          } else {
            this.getServerData([]);

          }
          this.admList = res.data
        }
      })
    },
    // 获取调剂折线图和表格
    getTJPeo(data) {
      this.headerData2 = ['年份', data[0].minTocentonScore, data[0].centonToMaxScore]
    },
    // 切换当前Tab
    getColor(item, index) {
      this.act = index
      this.getTJPeo(this.admList[this.act].dto.mAdjustNumScoreSpreadList)
      this.getServerData(this.admList[this.act].dto.matriculateAdjustMinScoreList)
      this.moveTo(index) //滚动到中间
    },
    // 切换调剂来源
    getColor2(item, index) {
      this.moveTo(index) //滚动到中间
      this.act2 = index
    },
    // 切换调剂去向
    getColor3(item, index) {
      this.moveTo(index) //滚动到中间
      this.act3 = index
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
      console.log('data: ', data);
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let categoriesArr = data.map(item => {
          return item.matriculateYear
        })
        let dataArr = data.map(item => {
          return item.grossScore || 0
        })
        let res = {
          categories: categoriesArr,
          series: [{
            name: "调剂最低分",
            data: dataArr
          },


          ]
        };
        this.chartData = JSON.parse(JSON.stringify(res));
        console.log('this.chartData: ', this.chartData);
      }, 500);
    },
  }
}
</script>

<style lang="scss">
.fadjustmentdirection {}
</style>