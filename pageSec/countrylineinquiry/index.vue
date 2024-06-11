<template>
  <view>
    <page-meta :page-style="'overflow:hidden'"></page-meta>
    <view class="countrylineinquiry " :style="{ height: `${windowHeight}px` }">
      <view class="header">
        <view class="titlrs">
          <view class="icoblase" @click="handback">
            <i class="iconfont" style="font-size: 52rpx;">&#xe609;</i>
          </view>
          国家线查询
        </view>



      </view>


      <view class="topBg">
        <image
          src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/ranking/countryTopbg.png">
        </image>
        <view class="tabse newTabse">
          <text class="quanbu" :class="index == 1 ? 'active' : ''" @click="handtabIndex(1)">国家线</text>
          <text class="shouhou" style="border-radius: 0;border-right: none;border-left: none;"
            :class="index == 2 ? 'active' : ''" @click="handtabIndex(2)">自划线</text>
          <text class="shouhou" :class="index == 3 ? 'active' : ''" @click="handtabIndex(3)">图表分析</text>
        </view>
      </view>
      <view class="newContent">
        <view class="tabs">
          <view v-if="index != 3" class="lie" @click="handnianens(1)"><text :class="quserparms.year ? 'activeText' : ''"
              style="margin-right:10rpx;">{{
      quserparms.year }}年</text>
            <view style="margin-left: 8rpx;">
              <uni-icons type="bottom" size="20"></uni-icons>
            </view>
          </view>
          <view class="lie" @click="handnianens(2)"><text style="margin-right:10rpx;"
              :class="quserparms.specialtyMasterType ? 'activeText' : ''">{{ quserparms.specialtyMasterType
              }}</text>
            <view style="margin-left: 8rpx;"><uni-icons type="bottom" size="20"></uni-icons>
            </view>
          </view>
          <view v-if="index !== 2" class="lie" @click="handnianens(3)">
            <text :class="quserparms.specialtyAffiliatingCategory ? 'activeText' : ''">
              {{
      quserparms.specialtyAffiliatingSubject ? quserparms.specialtyAffiliatingSubject :
        quserparms.specialtyAffiliatingCategory || '专业类别' }}
            </text>

            <view style="margin-left: 8rpx;"><uni-icons type="bottom" size="20"></uni-icons>
            </view>
          </view>
          <view v-else class="lie" @click="handnianens(4)">
            <text :class="quserparms.schoolName ? 'activeText' : ''"> {{ quserparms.schoolName || '选择学校' }}</text>

            <view style="margin-left: 8rpx;"><uni-icons type="bottom" size="20"></uni-icons>
            </view>
          </view>
        </view>
        <view class="contentss">
          <view v-show="index === 1">
            <view v-if="listData && listData.length > 0" class="new-contentItem" v-for="(item, index) in listData"
              :key="index">
              <view class="new-title">
                <view class="newTitle-text">{{ item.specialtyCode }}</view>
                <view class="newTitle-logo">
                  <image
                    src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/ranking/country-logo.png">
                  </image>
                </view>
              </view>
              <view class="new-content-center">
                <view class="center-item">
                  <view>考试类别</view>
                  <view class="fSize28 lHeight50" v-for="(row, i) in item.examCategories" :key="i">
                    {{ row }}</view>
                  <!-- <view class="fSize28 lHeight50">{{item[1].examCategories}}</view> -->
                </view>
                <view class="center-item">
                  <view> 总分</view>
                  <view class="fSize28 lHeight50" v-for="(row, i) in item.totalScore" :key="i"> {{ row }}</view>
                  <!-- <view class="fSize28 lHeight50">  {{ item[1].totalScore }}</view> -->
                </view>
                <view class="center-item">
                  <view>单科(满分=100)</view>
                  <view class="fSize28 lHeight50" v-for="(row, i) in item.fullScoreEqualHundred" :key="i">{{ row }}
                  </view>
                  <!-- <view class="fSize28 lHeight50">{{ item[1].fullScoreEqualHundred }}</view> -->
                </view>
                <view class="center-item">
                  <view>单科(满分＞100)</view>
                  <view class="fSize28 lHeight50" v-for="(row, i) in item.fullScoreOutweighHundred" :key="i">{{ row }}
                  </view>
                  <!-- <view class="fSize28 lHeight50">{{ item[1].fullScoreOutweighHundred }}</view> -->
                </view>
              </view>
            </view>
            <view style="margin: 15rpx;" v-if="!listData || listData.length == 0">暂无数据</view>
          </view>
          <!-- <uni-table-s v-show="index === 1" :list="listData" :headerData="headerData" :headerAttr="headerAttr">
          </uni-table-s> -->
          <s-Elvage :quserparms="quserparms" v-if="index == 2"></s-Elvage>
          <c-Hartanalysis :quserparms="quserparms" :dataList="dataList" v-if="index == 3"></c-Hartanalysis>
          <text class="zhsi" v-if="listData && listData.length != 0">*注：数据信息请以院校公布为准。</text>
        </view>
      </view>

      <!-- 学校选择 -->
      <uv-picker ref="schoolPicker" :columns="schoolColumns" keyName="schoolName" @confirm="confirmSchool"></uv-picker>
      <uv-picker ref="picker" :columns="columns" keyName="label" @confirm="confirm"></uv-picker>
      <uv-picker ref="datetimePicker" :columns="yearColumns" keyName="label" @confirm="confirmYear"></uv-picker>
      <!-- <uv-datetime-picker
      ref="datetimePicker"
      v-model="value2"
      mode="year"
      @confirm="confirm2"
    >
    </uv-datetime-picker> -->
      <uv-popup ref="popup">
        <view class="contentea">
          <view class="tabse" style="margin-bottom: 20rpx;">
            <text class="quanbu" style="width: 49%;" :class="popindex == 0 ? 'active' : ''"
              @click="handpopIndex(0)">学硕</text>
            <text class="shouhou" style="width: 49%;" :class="popindex == 1 ? 'active' : ''"
              @click="handpopIndex(1)">专硕</text>

          </view>
          <view style="position: relative;">
            <uni-data-picker ref="pickers" v-model="value1" :localdata="items" keyName="label" popup-title="请选择"
              @change="onchange" @nodeclick="onnodeclick"></uni-data-picker>
            <view class="clearBox" v-if="index != 3" @click="clearFn"><i class="iconfont">&#xe633;</i>
            </view>
          </view>
        </view>
      </uv-popup>
      <!-- 关闭提示弹窗 -->
      <uni-popup ref="popup2" type="center" :is-mask-click='false'
        style="position: relative;z-index: 9999999;background: rgba(0,0,0,0.8);">
        <view class="endPopup">
          <view class="endPopupTop">考试类别说明</view>
          <view class="endPopupMiddle">
            <view class="endPopupMiddle-title">A类考生</view>
            <view class="endPopupMiddle-content">
              报考地出一区招生单位的考生一区系北京、天津、河北、山西、辽宁、吉林
              、黑龙江、上海、江苏、浙江、安徽、福建、江西、山东、河南、湖南、湖北
              、广东、重庆、四川、陕西等21省（市）
            </view>
            <view class="endPopupMiddle-title">B类考生</view>
            <view class="endPopupMiddle-content">
              报考地出二区招生单位的考生一区系内蒙古、广西、海南、贵州、云南、西藏
              、甘肃、青海、宁夏、新疆等10省
            </view>
          </view>
          <view class="endPopupBottom" @click="agreeFn">我已了解
          </view>
        </view>
      </uni-popup>
    </view>
  </view>
</template>

<script>
import sElvage from './selvage.vue';
import cHartanalysis from './chartanalysis.vue';
// import uvDatetimePicker from '@/pageSec/components/uv-datetime-picker/components/uv-datetime-picker/uv-datetime-picker.vue'
// import uvPicker from '@/pageSec/components/uv-picker/components/uv-picker/uv-picker.vue'
// import uvPopup from '@/pageSec/components/uv-popup/components/uv-popup/uv-popup.vue'
import uniIcons from '@/pageSec/components/uni-icons/components/uni-icons/uni-icons.vue'
import uniTableS from '@/pageSec/components/uni-table-s/uni-table-s.vue'
import uniDataPicker from '@/pageSec/components/uni-data-picker/components/uni-data-picker/uni-data-picker.vue'

import {
  getUserProfile,
} from "@/api/system/user"
import {
  findMajorCountryLine, countryScoreTree, findMajorSelfDelimitationLineSchool, findMajorSelfDelimitationLineYear, findYear
} from '@/api/colleges/index'
export default {
  components: {
    sElvage,
    cHartanalysis,
    uniDataPicker,
    // uvDatetimePicker,
    // uvPicker,
    // uvPopup,
    uniIcons,
    uniTableS
  },
  data() {
    return {
      yearColumns: [],
      schoolColumns: [],
      value1: '',
      dataList: [],
      quserparms: {
        year: '',
        specialtyMasterType: '专业型硕士',
        specialtyAffiliatingCategory: '',
        specialtyAffiliatingSubject: '',
        schoolName: '',//学校
        // specialtyMasterType: '',
        // specialtyAffiliatingCategoryId: '',
        // specialtyAffiliatingSubjecttId: ''
      },
      value2: Number(new Date()),
      listData: [],
      headerData: ['专业代码专业名称', '考试类别', '总分', '单科(满分=100)', '单科(满分＞100)'],
      headerAttr: ['specialtyCode', 'examCategories', 'totalScore', 'fullScoreEqualHundred', 'fullScoreOutweighHundred'],
      visible: true,
      index: 1,
      popindex: 1,
      checkboxValue: [],
      value: 0,
      chain: false,
      columns: [],
      items: [],
    }
  },
  computed: {
    windowHeight() {
      return uni.getSystemInfoSync().windowHeight - 50
    }
  },
  onLoad() {
    // this.getUser()
  },
  mounted() {

    this.getCountryScoreTree()
    this.getSchoolList()
    this.getfindYear()
    this.$refs.popup2.open('center')
    // this.items = this.columns[this.popindex]

  },

  onShareAppMessage(options) {
    // 返回分享的内容
    return {
      title: '国家线查询',
      path: '/pageSec/countrylineinquiry/index',
    };
  },
  methods: {
    agreeFn() {
      this.$refs.popup2.close()
    },
    // 自划线展示选学校
    getSchoolList() {
      findMajorSelfDelimitationLineSchool({
        schoolName: ''
      }).then(res => {
        if (res.code === 200) {
          if (res.data && res.data.length) {
            this.schoolColumns = [res.data]
            console.log('this.schoolColumns: ', this.schoolColumns);
          }

        }
      })
    },
    // 获取年份(自划线-)
    getfindMajorSelfDelimitationLineYear() {
      findMajorSelfDelimitationLineYear().then(res => {
        if (res.code === 200) {
          this.yearColumns = [res.data]
          this.quserparms.year = res.data[0]
        }
      })
    },
    // 获取年份(国家线)
    getfindYear() {
      findYear().then(res => {
        if (res.code === 200) {
          this.yearColumns = [res.data]
          this.quserparms.year = res.data[0]
          this.getFindMajorCountryLine()
        }
      })
    },
    confirmSchool(e) {
      console.log('e: ', e);
      this.quserparms.schoolName = e.value[0]
    },
    confirmYear(e) {
      console.log('e: ', e);
      this.quserparms.year = e.value[0]
      this.getFindMajorCountryLine()
    },
    getFindMajorCountryLine() {
      findMajorCountryLine({
        ...this.quserparms
      }).then(res => {
        if (res.code === 200) {
          this.dataList = res.data
          console.log('res: ', res)
          let arr = []
          res.data.forEach(item => {
            if (item.majorCountryLineDto && item.majorCountryLineDto.length > 0) {
              let examCategories = item.majorCountryLineDto.map(o => {
                return o.examCategories
              })
              let totalScore = item.majorCountryLineDto.map(o => {
                return o.totalScore
              })
              let fullScoreEqualHundred = item.majorCountryLineDto.map(o => {
                return o.fullScoreEqualHundred
              })
              let fullScoreOutweighHundred = item.majorCountryLineDto.map(o => {
                return o.fullScoreOutweighHundred
              })
              let obj = {
                specialtyCode: item.specialtyName,
                examCategories: examCategories,
                totalScore: totalScore,
                fullScoreEqualHundred: fullScoreEqualHundred,
                fullScoreEqualHundred: fullScoreEqualHundred,
                fullScoreOutweighHundred: fullScoreOutweighHundred,
              }
              arr.push(obj)
            }
          })
          this.listData = arr
          console.log(' this.listData: ', this.listData);
        }
      })
    },
    // 获取专业
    getCountryScoreTree() {
      countryScoreTree().then(res => {
        if (res.code === 200) {
          this.columns = [res.data]
          this.initData(res.data)
          res.data.forEach(item => {
            if (item.label === this.quserparms.specialtyMasterType) {
              this.items = item.children

            }
          })
          console.log(this.items)
        }
      })
    },
    initData(data) {
      data.forEach(item => {
        item.text = item.label
        item.value = item.label
        if (item.children && item.children.length > 0) {
          this.initData(item.children)
        }
      })
    },
    confirm(e) {
      console.log('e: ', e);
      this.quserparms.specialtyMasterType = e.value[0].label
      if (e.value[0].label === '专业型硕士') {
        this.popindex = 1
      } else {
        this.popindex = 0
      }
      this.items = e.value[0].children
      this.quserparms.specialtyAffiliatingCategory = ''
      this.quserparms.specialtyAffiliatingSubject = ''
      this.getFindMajorCountryLine()
    },

    handtabIndex(value) {
      this.closePicker()
      this.index = value
      if (value === 1) {
        this.quserparms.specialtyAffiliatingCategory = ''
        this.quserparms.specialtyAffiliatingSubject = ''
        // this.getFindMajorCountryLine()
        this.getfindYear() //获取年份(国家线)
      }
      if (value === 2) {
        this.getfindMajorSelfDelimitationLineYear() //获取年份(自划线-)
      }
      if (value === 3) {
        console.log(this.items, 'this.items=-===')
        // 如果是3的话，是图表分析(给专业类别加默认值)
        this.quserparms.specialtyAffiliatingCategory = this.quserparms.specialtyAffiliatingCategory || this.items[0].label //"02经济学"
        this.quserparms.specialtyAffiliatingSubject = this.quserparms.specialtyAffiliatingSubject || this.items[0].children[0].label //"0251金融"
        this.value1 = this.quserparms.specialtyAffiliatingSubject || this.items[0].children[0].label //"0251金融"

      }
    },
    handtoinstiu() {
      this.$tab.navigateTo('/pageThe/checkthemajor/aprofessionaldetails')
    },
    closePicker() {
      this.$refs.datetimePicker.close();
      this.$refs.picker.close();
      this.$refs.popup.close();
      this.$refs.schoolPicker.close();
    },
    handnianens(num) {
      this.num = num
      if (num == 1) {
        this.$refs.datetimePicker.open();
        this.$refs.picker.close();
        this.$refs.popup.close();
        this.$refs.schoolPicker.close();
      }
      if (num == 2) {

        this.$refs.datetimePicker.close();
        this.$refs.picker.open();
        this.$refs.popup.close();
        this.$refs.schoolPicker.close();
      }
      if (num == 3) {
        // this.$refs.pickers.show() // `picker` 为组件的 ref 名称
        this.$refs.datetimePicker.close();
        this.$refs.picker.close();
        this.$refs.popup.open('bottom');
        this.$refs.schoolPicker.close();
        // 学硕0  专硕1
        if (this.popindex === 0) {
          this.columns.forEach(item => {
            if (item.label === '学术型硕士') {
              this.items = item.children
            }
          })
        } else {
          this.columns.forEach(item => {
            if (item.label === '专业型硕士') {
              this.items = item.children
            }
          })
        }

      }
      if (num === 4) {
        this.$refs.datetimePicker.close();
        this.$refs.picker.close();
        this.$refs.popup.close();
        this.$refs.schoolPicker.open();
      }
      else {
        // this.$refs.popup.open('top');
      }
    },
    handpopIndex(value) {
      console.log('value: ', value);
      this.popindex = value
      console.log(this.columns)
      if (value == 0) {
        // 0学硕 1专硕
        this.columns[0].forEach(item => {
          if (item.label === '学术型硕士') {
            this.quserparms.specialtyMasterType = '学术型硕士'
            console.log('item: ', item);
            this.items = item.children
          }
        })
      }
      if (value == 1) {
        // 0学硕 1专硕
        this.columns[0].forEach(item => {
          if (item.label === '专业型硕士') {
            this.quserparms.specialtyMasterType = '专业型硕士'
            console.log('item: ', item);
            this.items = item.children
          }
        })
      }
      this.quserparms.specialtyAffiliatingSubject = ''
      this.quserparms.specialtyAffiliatingCategory = ''
      this.value1 = ""
    },
    onchange(e) {
      console.log(1)
      console.log(e)
      this.quserparms.specialtyAffiliatingCategory = e.detail.value[0].value
      this.quserparms.specialtyAffiliatingSubject = e.detail.value[1] ? e.detail.value[1].value : ''
      this.$refs.popup.close()
      console.log(this.value1, '2value1-----')
      this.getFindMajorCountryLine()
    },
    onnodeclick(node) {
      console.log(2)
      console.log(node)
    },
    clearFn() {
      this.value1 = ''
      this.quserparms.specialtyAffiliatingSubject = ''
      this.quserparms.specialtyAffiliatingCategory = ''
      this.getFindMajorCountryLine()
    },
    quit() {
      uni.showToast({
        title: "提交成功",
        icon: 'none',
      })
    },

    handback() {
      this.$tab.navigateBack(1)
    },
    getUser() {
      getUserProfile().then(response => {
        this.user = response.data
        this.roleGroup = response.roleGroup
        this.postGroup = response.postGroup
      })
    }
  }
}
</script>

<style lang="scss">
.countrylineinquiry {
  min-height: 100vh;
  background-color: $uni-bg-color;
  // padding: 32rpx 30rpx;

  .header {
    // position: fixed;
    top: 0rpx;
    left: 0;
    width: 100%;
    padding-top: 110rpx;
    // background-color: $uni-bg-color;
    // background: linear-gradient(190.72deg,
    //     rgba(255, 232, 227, 1) 0%,
    //     rgba(246, 248, 253, 0) 80%);
    // height: 360rpx;
    z-index: 999;

    .titlrs {
      height: 60rpx;
      font-size: 32rpx;
      font-weight: 600;
      letter-spacing: 0px;
      line-height: 44.8rpx;
      color: $uni-text-color;
      text-align: center;
      position: relative;
      z-index: 999;

      .icoblase {
        position: absolute;
        top: 0rpx;
        left: -26rpx;
        font-size: 28rpx;
        font-weight: 500;
        line-height: 44.8rpx;
        color: $uni-text-color;
      }
    }
  }

  .tabse {
    display: flex;
    width: 100%;
    padding-top: 45rpx;
    justify-content: center;
    z-index: 999;

    text {
      display: block;
      width: 200rpx;
      height: 56rpx;
      text-align: center;
      line-height: 56rpx;
      font-size: 28rpx;
      font-weight: 400;
      color: $uni-text-color-placeholder;
      border: 1px solid rgba(252, 81, 95, 1);
    }

    .quanbu {
      border-radius: 8rpx 0 0 8rpx;
    }

    .shouhou {
      border-radius: 0px 8rpx 8rpx 0rpx;
    }
  }

  .clearBox {
    position: absolute;
    width: 36rpx;
    height: 36rpx;
    background: white;
    // color: white;
    border-radius: 500rpx;
    text-align: center;
    line-height: 36rpx;
    font-size: 22rpx;
    right: 14rpx;
    top: 17rpx;
  }

  .iconfont {
    font-size: 37rpx;
  }

  .active {
    background-color: $uni-text-color-placeholder;
    color: $uni-text-color-inverse !important;
    font-weight: 600 !important;
  }

  .zhanyelist {
    margin-top: 53rpx;
    padding: 0 46rpx;
  }

  .tabs {
    padding: 34rpx 46rpx;
    width: 100%;
    display: flex;
    justify-content: space-around;
    font-size: 28rpx;
    font-weight: 400;
    line-height: 39.2rpx;
    color: $uni-text-color;
    align-items: center;
    z-index: 999;

    .lie {
      display: flex;
    }
  }

  .content {
    padding-top: 160rpx !important;

    .quxqrs {
      height: 142rpx;
      display: flex;
      width: 100%;
      justify-content: space-between;
      position: fixed;
      bottom: 70rpx;
      left: 0;
      z-index: 999999;
      margin: 0 auto;
      padding: 32rpx 30rpx;
      background-color: white;

      view {
        text-align: center;
        line-height: 80rpx;
        width: 330rpx;
        border-radius: 8rpx;
        background-color: $uni-color-primary;
        font-size: 32rpx;
        font-weight: 600;
        letter-spacing: 0px;
        color: white;
      }

      .quss {
        background-color: white;
        border: 1px solid $uni-color-primary;
        color: $uni-color-primary;
      }
    }
  }

  .contentss {
    z-index: 1;
    // margin-top: 330rpx;
    height: 74vh;
    overflow: auto;
    padding: 0 30rpx;
  }

  .zhsi {
    display: flex;
    font-size: 24rpx;
    font-weight: 300;
    letter-spacing: 0px;
    line-height: 30.8rpx;
    color: $uni-text-color;
    padding: 32rpx 0;
  }

  .contentea {
    padding: 0 40rpx;
    height: 900rpx;
  }

  //表格参数
  ._table {
    border: 1rpx solid rgba(153, 153, 153, 0.2);
    border-radius: 16rpx;
    overflow: hidden;
    width: 100%;
    z-index: 2;
    margin-bottom: 40rpx;

    ._tr {
      display: flex;
    }

    ._th {
      text-align: center;
      background-color: $uni-bg-color-tag;
      height: 66rpx;
      line-height: 30rpx;
      color: $uni-text-color-grey;
      font-size: 24rpx;
      font-weight: 600;
      border-right: 1rpx solid rgba(153, 153, 153, 0.2);
      padding-top: 5rpx;
      flex: 1;
    }

    ._td {
      border: 1rpx solid rgba(153, 153, 153, 0.2);
      margin-left: -1rpx;
      margin-bottom: -1rpx;
      text-align: center;
      font-size: 24rpx;
      font-weight: 600;
      color: $uni-text-color;
      padding: 4rpx;
      flex: 1;
    }

    tr td:nth-child(3) {
      line-height: 60rpx;
    }

    tr td:nth-child(4) {
      line-height: 60rpx;
    }

    tr td:nth-child(5) {
      line-height: 60rpx;
    }
  }

  .endPopup {
    width: 532rpx;
    height: 720rpx;
    border-radius: 16rpx;
    background: rgba(255, 255, 255, 1);
    text-align: center;
    overflow: hidden;
    position: relative;

    .endPopupTop {
      width: 100%;
      height: 109rpx;
      font-size: 32rpx;
      font-weight: 600;
      background: $uni-color-primary;
      line-height: 109rpx;
      text-align: center;
      font-size: 32rpx;
      font-weight: 600;
      color: $uni-text-color-inverse;
      // padding-top: 40rpx;
    }

    .endPopupMiddle {
      padding: 0 32rpx 32rpx 32rpx;
      font-size: 24rpx;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      text-align: left;

      text {
        color: $uni-color-primary;
      }

      .endPopupMiddle-title {
        color: $uni-text-color-placeholder;
        font-size: 28rpx;
        font-weight: 600;
        margin-top: 32rpx;
      }

      .endPopupMiddle-content {
        letter-spacing: 0px;
        line-height: 39rpx;
        color: rgba(51, 51, 51, 1);
        text-align: justify;
        vertical-align: top;
        margin-top: 16rpx;
      }
    }

    .endPopupBottom {
      width: 100%;
      position: absolute;
      bottom: 0;
      height: 109rpx;
      line-height: 109rpx;
      border-top: 2rpx solid #f7f8fc;
      text-align: center;
      font-size: 28rpx;
      font-weight: 600;
      color: $uni-text-color-placeholder;
    }
  }
}

/deep/ .uv-vtabs__bar-item-active--value {
  color: $uni-color-primary !important;
  font-size: 36rpx !important;
  font-weight: 600 !important;
}

/deep/ .uv-vtabs__bar-item--line {
  background-color: $uni-color-primary !important;
}

/deep/ .uv-checkbox-group {
  display: block !important;
}

/deep/ .uv-checkbox {
  padding: 25rpx 0 !important;
  margin-left: 81rpx !important;
  font-size: 28rpx !important;
  font-weight: 400 !important;
  line-height: 39.2rpx !important;
  color: $uni-text-color !important;
  padding-right: 46rpx !important;
}

/deep/ .uv-checkbox__icon-wrap {
  border-radius: 100% !important;
  width: 44rpx !important;
  height: 44rpx !important;
}

/deep/ .uv-vtabs__content {
  height: 650rpx !important;
}

.topBg {
  position: relative;
  height: 366rpx;
}

.newTabse {
  position: absolute;
  bottom: 30rpx;
}

.topBg image {
  width: 100%;
  height: 366rpx;
}

.newContent {
  background: linear-gradient(180deg, rgba(253, 240, 238, 1) 0%, rgba(245, 245, 245, 1) 40%);
}

.new-contentItem {
  width: 100%;
  margin-bottom: 30rpx;
  background: rgba(250, 250, 250, 1);
  height: 322rpx;
  border-radius: 8rpx;
}

.new-title {
  width: 100%;
  height: 88rpx;
  font-size: 32rpx;
  line-height: 88rpx;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto;
}

.new-content-center {
  margin: 0 24rpx;
  border-radius: 8rpx;
  background: rgba(247, 247, 247, 1);
  height: 202rpx;
  display: flex;
  justify-content: space-between;
  padding: 24rpx 16rpx;
}

.center-item {
  // display: inline-block;
  text-align: center;
  font-size: 24rpx;
  color: rgba(153, 153, 153, 1);
  // margin-right: 40rpx;
}

.fSize28 {
  font-size: 28rpx;
  color: #000000;
  font-weight: 600;
}

.lHeight50 {
  line-height: 50rpx;
  margin-top: 13rpx;
}

.newTitle-text {
  margin-left: 32rpx;
}

.newTitle-logo {
  width: 60rpx;
  height: 60rpx;
  margin-right: 16rpx;

  image {
    width: 60rpx;
    height: 60rpx;
  }
}

.activeText {
  color: rgba(252, 81, 95, 1);
}
</style>