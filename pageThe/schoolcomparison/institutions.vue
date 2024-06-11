<template>
  <uni-self-header :boxHeight="50" :title="title" :linearColor="linearColor" :hasBack="true" ref="headerSelf">
    <view class="schoolcomparison" :style="{ height: `calc(100vh - ${pageTop + 10}px)`, 'margin-top': '10px' }">
      <view class="tabsnee">
        <view class="xuesese">
          <view v-for="(item, index) in dataList" :key="index">
            <image :src="item.schoolLogo ? COS_CDN_PREFIX_http + item.schoolLogo : defaultImg.schoolImg" />
            <view class="namse">
              {{ item.schoolName || '' }}
            </view>
            <view class="zhuanye">
              {{ item.specialtyName || '--' }}
            </view>
            <view class="qhyx" @click="yxChange(item, index)"
              v-if="(currentIndex === 2 || currentIndex === 3) && item.majorEarlySubjectDtoList.length > 0">切换院系</view>
          </view>
        </view>
        <view class="cxinss" @click="chongxinxze">
          重新选择
        </view>
      </view>

      <view class="atabs">
        <uv-tabs :list="list" @click="tabseclick" lineWidth="30" lineColor="rgba(252, 81, 95, 1)"
          :activeStyle="{ color: 'rgba(252, 81, 95, 1)', fontWeight: '600', fontSize: '32rpx', transform: 'scale(1.03)' }"
          :inactiveStyle="{ color: '#333', transform: 'scale(1)' }"
          itemStyle="padding-left: 46rpx; padding-right: 26rpx; height: 70rpx;"></uv-tabs>
      </view>
      <view class="tab-content">
        <view class="tabsa" v-if="currentIndex == 0">
          <view class="textp" style="border: none;padding-top: 0;">
            <uni-table-s :list="listData1" :headerData="headerData" :headerAttr="headerAttr">
            </uni-table-s>
          </view>
        </view>
        <sCoreline v-if="currentIndex === 1" :dataList="dataList"></sCoreline>
        <!-- <coMpetitiveness v-show="currentIndex === 2" :dataList="dataList"></coMpetitiveness> -->
        <view class="competitiveness" v-if="currentIndex === 2">
          <view class="tabsa" style="border: none;padding-top: 0;">
            <view class="textp">
              <uni-table-s :list="listData2" :headerData="headerData" :headerAttr="headerAttr">
              </uni-table-s>

            </view>
          </view>
        </view>
        <view class="preliminaryinformation" v-if="currentIndex === 3">
          <view class="tabsa" style="border: none;padding-top: 0;">
            <view class="textp">
              <uni-table-s :list="listData" :headerData="headerData" :headerAttr="headerAttr">
              </uni-table-s>

            </view>
          </view>
        </view>
        <!-- <pReliminaryinformation v-show="currentIndex === 3" :dataList="dataList"></pReliminaryinformation> -->
      </view>
      <text class="zhsi">*注：数据信息请以院校公布为准。</text>
      <uv-picker ref="picker" :columns="columns" keyName="collegeName" @confirm="confirm"></uv-picker>
    </view>
  </uni-self-header>
</template>

<script>
import sCoreline from './scoreline.vue';
// import coMpetitiveness from './competitiveness.vue';
// import pReliminaryinformation from './preliminaryinformation.vue';
import uvTabs from '@/pageThe/components/uv-tabs/components/uv-tabs/uv-tabs.vue'
import uniIcons from '@/pageThe/components/uni-icons/components/uni-icons/uni-icons.vue'
import uvPicker from "@/pageThe/components/uv-picker/components/uv-picker/uv-picker.vue"
import uniTableS from '@/pageThe/components/uni-table-s/uni-table-s.vue'
import config from '@/config/index'

export default {
  components: {
    sCoreline,
    // coMpetitiveness,
    // pReliminaryinformation,
    uvTabs,
    uniIcons,
    uvPicker,
    uniTableS
  },
  data() {
    return {
      columns: [],
      dataList: [],
      currentIndex: 0,
      boods: true,
      index: 1,
      title: "院校对比",
      list: [{
        name: '院校实力',
      }, {
        name: '分数线',
      }, {
        name: '竞争力'
      }, {
        name: '初试信息'
      }],
      headerData: ['类目'],
      headerAttr: ['name'],
      listData: [],
      listData1: [],
      indexOne: 0,//初始信息第一个学校选择的院系
      indexTwo: 0,//初始信息第二个学校选择的院系
      indexThree: 0,//初始信息第三个学校选择的院系
      chooseSchool: {}, //当前点击的学校
      chooseSchoolIndex: 0, //当前点击的学校
      listData2: [],
      indexJzlOne: 0,//竞争力第一个学校选择的院系
      indexJzlTwo: 0,//竞争力第二个学校选择的院系
      indexJzlThree: 0,//竞争力第三个学校选择的院系

      COS_CDN_PREFIX_http: config.COS_CDN_PREFIX_http,
      defaultImg: this.$defaultImg,

      isback: true,
      linearColor: 'linear-gradient(to bottom,rgba(255, 232, 227, 1),rgba(255, 255, 255, 1))',
      pageTop: 0,
    }
  },
  computed: {
    windowHeight() {
      return uni.getSystemInfoSync().windowHeight - 50
    }
  },
  onLoad(options) {
    if (options && options.data) {
      let arr = JSON.parse(decodeURIComponent(options.data));
      this.dataList = arr
      if (this.dataList.length === 2) {
        this.headerAttr = ['name', 'schoolA', 'schoolB']
      }
      if (this.dataList.length === 3) {
        this.headerAttr = ['name', 'schoolA', 'schoolB', 'schoolC']
      }
    }
    // this.getUser()
  },
  onShow() {

  },
  mounted() {
    this.pageTop = this.$refs.headerSelf.obj?.pageTop || 0
    this.getHeader()
    this.dataInit()
    this.yxSLDataInit()
    this.getJzlList()
  },
  methods: {
    getHeader() {
      let arr = this.dataList.map(item => {
        return item.schoolName
      })
      this.headerData = this.headerData.concat(arr)

    },
    yxSLDataInit() {
      let arr = [
        {
          name: '所在城市',
          schoolA: '',
          schoolB: '',
          schoolC: ''
        },
        {
          name: '院校层次',
          schoolA: '',
          schoolB: '',
          schoolC: ''
        },
        {
          name: '学院',
          schoolA: '',
          schoolB: '',
          schoolC: ''
        },
        {
          name: '所属分区',
          schoolA: '',
          schoolB: '',
          schoolC: ''
        },
        {
          name: '专业排名',
          schoolA: '',
          schoolB: '',
          schoolC: ''
        },
        {
          name: '博士点',
          schoolA: '',
          schoolB: '',
          schoolC: ''
        }
      ]

      this.dataList.forEach(item => {
        // if (item.majorEarlySubjectDtoList && item.majorEarlySubjectDtoList.length > 0) {
        // researchDirection	 研究方向	  politics 政治	 foreignLanguage 外语	
        // specialtyFirst 专业一	  specialtySecend	 专业二	
        arr.forEach(item2 => {
          if (item2.name === '所在城市') {
            if (this.dataList[0]) {
              item2.schoolA = this.dataList[0].schoolAffiliatingArea_dictText || '--'
            }
            if (this.dataList[1]) {
              item2.schoolB = this.dataList[1].schoolAffiliatingArea_dictText || '--'
            }
            if (this.dataList[2]) {
              item2.schoolC = this.dataList[2].schoolAffiliatingArea_dictText || '--'
            }

          }
          if (item2.name === '院校层次') {
            if (this.dataList[0]) {
              item2.schoolA = this.dataList[0].schoolProperty_dictText || '--'
            }
            if (this.dataList[1]) {
              item2.schoolB = this.dataList[1].schoolProperty_dictText || '--'
            }
            if (this.dataList[2]) {
              item2.schoolC = this.dataList[2].schoolProperty_dictText || '--'
            }
          }
          if (item2.name === '学院') {
            if (this.dataList[0]) {
              item2.schoolA = this.dataList[0].college || '--'
            }
            if (this.dataList[1]) {
              item2.schoolB = this.dataList[1].college || '--'
            }
            if (this.dataList[2]) {
              item2.schoolC = this.dataList[2].college || '--'
            }
          }
          if (item2.name === '所属分区') {
            if (this.dataList[0]) {
              item2.schoolA = this.dataList[0].schoolRegion_dictText || '--'
            }
            if (this.dataList[1]) {
              item2.schoolB = this.dataList[1].schoolRegion_dictText || '--'
            }
            if (this.dataList[2]) {
              item2.schoolC = this.dataList[2].schoolRegion_dictText || '--'
            }
          }
          if (item2.name === '专业排名') {
            if (this.dataList[0]) {
              item2.schoolA = this.dataList[0].ranking || '--'
            }
            if (this.dataList[1]) {
              item2.schoolB = this.dataList[1].ranking || '--'
            }
            if (this.dataList[2]) {
              item2.schoolC = this.dataList[2].ranking || '--'
            }
          }
          if (item2.name === '博士点') {
            if (this.dataList[0]) {
              item2.schoolA = this.dataList[0].doctoralProgram || '--'
            }
            if (this.dataList[1]) {
              item2.schoolB = this.dataList[1].doctoralProgram || '--'
            }
            if (this.dataList[2]) {
              item2.schoolC = this.dataList[2].doctoralProgram || '--'
            }
          }
        })
        // }
      })
      this.listData1 = arr
    },
    dataInit() {
      let arr1 = [
        {
          name: '研究方向',
          schoolA: '',
          schoolB: '',
          schoolC: ''
        },
        {
          name: '政治',
          schoolA: '',
          schoolB: '',
          schoolC: ''
        },
        {
          name: '外语',
          schoolA: '',
          schoolB: '',
          schoolC: ''
        },
        {
          name: '专业课1',
          schoolA: '',
          schoolB: '',
          schoolC: ''
        },
        {
          name: '专业课2',
          schoolA: '',
          schoolB: '',
          schoolC: ''
        }
      ]

      this.dataList.forEach(item => {
        if (item.majorEarlySubjectDtoList && item.majorEarlySubjectDtoList.length > 0) {
          // researchDirection	 研究方向	  politics 政治	 foreignLanguage 外语	
          // specialtyFirst 专业一	  specialtySecend	 专业二	
          arr1.forEach(item2 => {
            if (item2.name === '研究方向') {
              if (this.dataList[0]) {
                item2.schoolA = this.dataList[0].majorEarlySubjectDtoList && this.dataList[0].majorEarlySubjectDtoList.length > 0 ? this.dataList[0].majorEarlySubjectDtoList[this.indexOne].majorEarlySubjectDto[0].researchDirection : '--'
              }
              if (this.dataList[1]) {
                item2.schoolB = this.dataList[1].majorEarlySubjectDtoList && this.dataList[1].majorEarlySubjectDtoList.length > 0 ? this.dataList[1].majorEarlySubjectDtoList[this.indexTwo].majorEarlySubjectDto[0].researchDirection : '--'
              }
              if (this.dataList[2]) {
                item2.schoolC = this.dataList[2].majorEarlySubjectDtoList && this.dataList[2].majorEarlySubjectDtoList.length > 0 ? this.dataList[2].majorEarlySubjectDtoList[this.indexThree].majorEarlySubjectDto[0].researchDirection : '--'
              }

            }
            if (item2.name === '政治') {
              if (this.dataList[0]) {
                item2.schoolA = this.dataList[0].majorEarlySubjectDtoList && this.dataList[0].majorEarlySubjectDtoList.length > 0 ? this.dataList[0].majorEarlySubjectDtoList[this.indexOne].majorEarlySubjectDto[0].politics : '--'
              }
              if (this.dataList[1]) {
                item2.schoolB = this.dataList[1].majorEarlySubjectDtoList && this.dataList[1].majorEarlySubjectDtoList.length > 0 ? this.dataList[1].majorEarlySubjectDtoList[this.indexTwo].majorEarlySubjectDto[0].politics : '--'
              }
              if (this.dataList[2]) {
                item2.schoolC = this.dataList[2].majorEarlySubjectDtoList && this.dataList[2].majorEarlySubjectDtoList.length > 0 ? this.dataList[2].majorEarlySubjectDtoList[this.indexThree].majorEarlySubjectDto[0].politics : '--'
              }
            }
            if (item2.name === '外语') {
              if (this.dataList[0]) {
                item2.schoolA = this.dataList[0].majorEarlySubjectDtoList && this.dataList[0].majorEarlySubjectDtoList.length > 0 ? this.dataList[0].majorEarlySubjectDtoList[this.indexOne].majorEarlySubjectDto[0].foreignLanguage : '--'
              }
              if (this.dataList[1]) {
                item2.schoolB = this.dataList[1].majorEarlySubjectDtoList && this.dataList[1].majorEarlySubjectDtoList.length > 0 ? this.dataList[1].majorEarlySubjectDtoList[this.indexTwo].majorEarlySubjectDto[0].foreignLanguage : '--'
              }
              if (this.dataList[2]) {
                item2.schoolC = this.dataList[2].majorEarlySubjectDtoList && this.dataList[2].majorEarlySubjectDtoList.length > 0 ? this.dataList[2].majorEarlySubjectDtoList[this.indexThree].majorEarlySubjectDto[0].foreignLanguage : '--'
              }
            }
            if (item2.name === '专业课1') {
              if (this.dataList[0]) {
                item2.schoolA = this.dataList[0].majorEarlySubjectDtoList && this.dataList[0].majorEarlySubjectDtoList.length > 0 ? this.dataList[0].majorEarlySubjectDtoList[this.indexOne].majorEarlySubjectDto[0].specialtyFirst : '--'
              }
              if (this.dataList[1]) {
                item2.schoolB = this.dataList[1].majorEarlySubjectDtoList && this.dataList[1].majorEarlySubjectDtoList.length > 0 ? this.dataList[1].majorEarlySubjectDtoList[this.indexTwo].majorEarlySubjectDto[0].specialtyFirst : '--'
              }
              if (this.dataList[2]) {
                item2.schoolC = this.dataList[2].majorEarlySubjectDtoList && this.dataList[2].majorEarlySubjectDtoList.length > 0 ? this.dataList[2].majorEarlySubjectDtoList[this.indexThree].majorEarlySubjectDto[0].specialtyFirst : '--'
              }
            }
            if (item2.name === '专业课2') {
              if (this.dataList[0]) {
                item2.schoolA = this.dataList[0].majorEarlySubjectDtoList && this.dataList[0].majorEarlySubjectDtoList.length > 0 ? this.dataList[0].majorEarlySubjectDtoList[this.indexOne].majorEarlySubjectDto[0].specialtySecend : '--'
              }
              if (this.dataList[1]) {
                item2.schoolB = this.dataList[1].majorEarlySubjectDtoList && this.dataList[1].majorEarlySubjectDtoList.length > 0 ? this.dataList[1].majorEarlySubjectDtoList[this.indexTwo].majorEarlySubjectDto[0].specialtySecend : '--'
              }
              if (this.dataList[2]) {
                item2.schoolC = this.dataList[2].majorEarlySubjectDtoList && this.dataList[2].majorEarlySubjectDtoList.length > 0 ? this.dataList[2].majorEarlySubjectDtoList[this.indexThree].majorEarlySubjectDto[0].specialtySecend : '--'
              }
            }
          })
        }
      })
      this.listData = arr1
    },
    handback() {
      this.$tab.navigateBack(1)
    },
    // 格式化竞争力数据
    getJzlList() {
      let arr = [
        {
          name: '招生人数',
          schoolA: '',
          schoolB: '',
          schoolC: ''
        },
        {
          name: '复试人数',
          schoolA: '',
          schoolB: '',
          schoolC: ''
        },
        {
          name: '录取人数',
          schoolA: '',
          schoolB: '',
          schoolC: ''
        },
        {
          name: '一志愿录取人数',
          schoolA: '',
          schoolB: '',
          schoolC: ''
        },
        {
          name: '调剂录取',
          schoolA: '',
          schoolB: '',
          schoolC: ''
        },
        {
          name: '推免人数',
          schoolA: '',
          schoolB: '',
          schoolC: ''
        },
        {
          name: '是否有调剂',
          schoolA: '',
          schoolB: '',
          schoolC: ''
        }
      ]
      this.dataList.forEach(item => {
        if (item.majorApplyMatriculateConditionDtoList && item.majorApplyMatriculateConditionDtoList.length > 0) {
          // researchDirection	 研究方向	  politics 政治	 foreignLanguage 外语	
          // specialtyFirst 专业一	  specialtySecend	 专业二	
          arr.forEach(item2 => {
            if (item2.name === '招生人数') {
              if (this.dataList[0]) {
                item2.schoolA = this.dataList[0].majorApplyMatriculateConditionDtoList && this.dataList[0].majorApplyMatriculateConditionDtoList.length > 0 ? this.dataList[0].majorApplyMatriculateConditionDtoList[this.indexJzlOne].majorApplyMatriculateConditionDto[0].practicalPlanRecruitNum : '--'
              }
              if (this.dataList[1]) {
                item2.schoolB = this.dataList[1].majorApplyMatriculateConditionDtoList && this.dataList[1].majorApplyMatriculateConditionDtoList.length > 0 ? this.dataList[1].majorApplyMatriculateConditionDtoList[this.indexJzlTwo].majorApplyMatriculateConditionDto[0].practicalPlanRecruitNum : '--'
              }
              if (this.dataList[2]) {
                item2.schoolC = this.dataList[2].majorApplyMatriculateConditionDtoList && this.dataList[2].majorApplyMatriculateConditionDtoList.length > 0 ? this.dataList[2].majorApplyMatriculateConditionDtoList[this.indexJzlThree].majorApplyMatriculateConditionDto[0].practicalPlanRecruitNum : '--'
              }

            }
            if (item2.name === '复试人数') {
              if (this.dataList[0]) {
                item2.schoolA = this.dataList[0].majorApplyMatriculateConditionDtoList && this.dataList[0].majorApplyMatriculateConditionDtoList.length > 0 ? this.dataList[0].majorApplyMatriculateConditionDtoList[this.indexJzlOne].majorApplyMatriculateConditionDto[0].reexamineNum : '--'
              }
              if (this.dataList[1]) {
                item2.schoolB = this.dataList[1].majorApplyMatriculateConditionDtoList && this.dataList[1].majorApplyMatriculateConditionDtoList.length > 0 ? this.dataList[1].majorApplyMatriculateConditionDtoList[this.indexJzlTwo].majorApplyMatriculateConditionDto[0].reexamineNum : '--'
              }
              if (this.dataList[2]) {
                item2.schoolC = this.dataList[2].majorApplyMatriculateConditionDtoList && this.dataList[2].majorApplyMatriculateConditionDtoList.length > 0 ? this.dataList[2].majorApplyMatriculateConditionDtoList[this.indexJzlThree].majorApplyMatriculateConditionDto[0].reexamineNum : '--'
              }
            }
            if (item2.name === '录取人数') {
              if (this.dataList[0]) {
                item2.schoolA = this.dataList[0].majorApplyMatriculateConditionDtoList && this.dataList[0].majorApplyMatriculateConditionDtoList.length > 0 ? this.dataList[0].majorApplyMatriculateConditionDtoList[this.indexJzlOne].majorApplyMatriculateConditionDto[0].matriculateSum : '--'
              }
              if (this.dataList[1]) {
                item2.schoolB = this.dataList[1].majorApplyMatriculateConditionDtoList && this.dataList[1].majorApplyMatriculateConditionDtoList.length > 0 ? this.dataList[1].majorApplyMatriculateConditionDtoList[this.indexJzlTwo].majorApplyMatriculateConditionDto[0].matriculateSum : '--'
              }
              if (this.dataList[2]) {
                item2.schoolC = this.dataList[2].majorApplyMatriculateConditionDtoList && this.dataList[2].majorApplyMatriculateConditionDtoList.length > 0 ? this.dataList[2].majorApplyMatriculateConditionDtoList[this.indexJzlThree].majorApplyMatriculateConditionDto[0].matriculateSum : '--'
              }
            }
            if (item2.name === '一志愿录取人数') {
              if (this.dataList[0]) {
                item2.schoolA = this.dataList[0].majorApplyMatriculateConditionDtoList && this.dataList[0].majorApplyMatriculateConditionDtoList.length > 0 ? this.dataList[0].majorApplyMatriculateConditionDtoList[this.indexJzlOne].majorApplyMatriculateConditionDto[0].firstVolunteerMatriculateNum : '--'
              }
              if (this.dataList[1]) {
                item2.schoolB = this.dataList[1].majorApplyMatriculateConditionDtoList && this.dataList[1].majorApplyMatriculateConditionDtoList.length > 0 ? this.dataList[1].majorApplyMatriculateConditionDtoList[this.indexJzlTwo].majorApplyMatriculateConditionDto[0].firstVolunteerMatriculateNum : '--'
              }
              if (this.dataList[2]) {
                item2.schoolC = this.dataList[2].majorApplyMatriculateConditionDtoList && this.dataList[2].majorApplyMatriculateConditionDtoList.length > 0 ? this.dataList[2].majorApplyMatriculateConditionDtoList[this.indexJzlThree].majorApplyMatriculateConditionDto[0].firstVolunteerMatriculateNum : '--'
              }
            }
            if (item2.name === '调剂录取') {
              if (this.dataList[0]) {
                item2.schoolA = this.dataList[0].majorApplyMatriculateConditionDtoList && this.dataList[0].majorApplyMatriculateConditionDtoList.length > 0 ? this.dataList[0].majorApplyMatriculateConditionDtoList[this.indexJzlOne].majorApplyMatriculateConditionDto[0].adjustMatriculateNum : '--'
              }
              if (this.dataList[1]) {
                item2.schoolB = this.dataList[1].majorApplyMatriculateConditionDtoList && this.dataList[1].majorApplyMatriculateConditionDtoList.length > 0 ? this.dataList[1].majorApplyMatriculateConditionDtoList[this.indexJzlTwo].majorApplyMatriculateConditionDto[0].adjustMatriculateNum : '--'
              }
              if (this.dataList[2]) {
                item2.schoolC = this.dataList[2].majorApplyMatriculateConditionDtoList && this.dataList[2].majorApplyMatriculateConditionDtoList.length > 0 ? this.dataList[2].majorApplyMatriculateConditionDtoList[this.indexJzlThree].majorApplyMatriculateConditionDto[0].adjustMatriculateNum : '--'
              }
            }
            if (item2.name === '推免人数') {
              if (this.dataList[0]) {
                item2.schoolA = this.dataList[0].majorApplyMatriculateConditionDtoList && this.dataList[0].majorApplyMatriculateConditionDtoList.length > 0 ? this.dataList[0].majorApplyMatriculateConditionDtoList[this.indexJzlOne].majorApplyMatriculateConditionDto[0].recommendMatriculateNum : '--'
              }
              if (this.dataList[1]) {
                item2.schoolB = this.dataList[1].majorApplyMatriculateConditionDtoList && this.dataList[1].majorApplyMatriculateConditionDtoList.length > 0 ? this.dataList[1].majorApplyMatriculateConditionDtoList[this.indexJzlTwo].majorApplyMatriculateConditionDto[0].recommendMatriculateNum : '--'
              }
              if (this.dataList[2]) {
                item2.schoolC = this.dataList[2].majorApplyMatriculateConditionDtoList && this.dataList[2].majorApplyMatriculateConditionDtoList.length > 0 ? this.dataList[2].majorApplyMatriculateConditionDtoList[this.indexJzlThree].majorApplyMatriculateConditionDto[0].recommendMatriculateNum : '--'
              }
            }
            if (item2.name === '是否有调剂') {
              if (this.dataList[0]) {
                item2.schoolA = this.dataList[0].majorApplyMatriculateConditionDtoList && this.dataList[0].majorApplyMatriculateConditionDtoList.length > 0 ? this.dataList[0].majorApplyMatriculateConditionDtoList[this.indexJzlOne].majorApplyMatriculateConditionDto[0].practicalPlanRecruitNum : '--'
              }
              if (this.dataList[1]) {
                item2.schoolB = this.dataList[1].majorApplyMatriculateConditionDtoList && this.dataList[1].majorApplyMatriculateConditionDtoList.length > 0 ? this.dataList[1].majorApplyMatriculateConditionDtoList[this.indexJzlTwo].majorApplyMatriculateConditionDto[0].practicalPlanRecruitNum : '--'
              }
              if (this.dataList[2]) {
                item2.schoolC = this.dataList[2].majorApplyMatriculateConditionDtoList && this.dataList[2].majorApplyMatriculateConditionDtoList.length > 0 ? this.dataList[2].majorApplyMatriculateConditionDtoList[this.indexJzlThree].majorApplyMatriculateConditionDto[0].practicalPlanRecruitNum : '--'
              }
            }
          })
        }
      })

      this.listData2 = arr
    },
    tabseclick(item) {
      if (this.currentIndex != item.index) {
        this.currentIndex = item.index
      }

    },
    chongxinxze() {
      this.$tab.navigateBack(1)
    },
    handxuanzes(num) {
      if (num == 1) {
        this.boods = false
        this.title = '选择院校'
      }
      if (num == 2) {
        this.$tab.navigateTo('/pages/schoolcomparison/schoollist')
      }
      if (num == 3) {
        this.title = '选择专业'
      }
    },
    // 院校切换
    yxChange(row, index) {
      this.chooseSchoolIndex = index
      this.chooseSchool = row
      if (this.currentIndex === 2) {
        // 竞争力
        this.columns = [row.majorApplyMatriculateConditionDtoList]
      }
      if (this.currentIndex === 3) {
        // 初始信息
        this.columns = [row.majorEarlySubjectDtoList]
      }

      this.$refs.picker.open();
    },
    confirm(e) {
      if (this.currentIndex === 2) {
        // 竞争力
        if (this.chooseSchoolIndex === 0) {
          this.indexJzlOne = e.indexs[0]
        }
        if (this.chooseSchoolIndex === 1) {
          this.indexJzlTwo = e.indexs[0]
        }
        if (this.chooseSchoolIndex === 2) {
          this.indexJzlThree = e.indexs[0]
        }
        this.getJzlList()
      }
      if (this.currentIndex === 3) {
        // 初始信息
        if (this.chooseSchoolIndex === 0) {
          this.indexOne = e.indexs[0]
          this.indexJzlOne = e.indexs[0]
        }
        if (this.chooseSchoolIndex === 1) {
          this.indexTwo = e.indexs[0]
        }
        if (this.chooseSchoolIndex === 2) {
          this.indexThree = e.indexs[0]
        }
        this.dataInit()
      }


    }
  }
}
</script>

<style lang="scss">
.schoolcomparison {
  overflow-x: scroll;
  box-sizing: border-box;

  /deep/ .uv-tabs__wrapper__nav__line {
    width: 24rpx !important;
    height: 8rpx !important;
    border-radius: 150rpx !important;
    left: 26rpx !important;
  }

  .tabsnee {
    padding: 32rpx;
    background-color: $uni-bg-color;

    .xuesese {
      display: flex;
      justify-content: space-around;

      image {
        display: block;
        width: 58rpx;
        height: 58rpx;
        border-radius: 100%;
        margin: 0 auto;
      }

      .namse {
        font-size: 26rpx;
        font-weight: 600;
        letter-spacing: 0px;
        line-height: 33.6rpx;
        color: $uni-text-color;
        text-align: center;
        margin-top: 12rpx;
        margin-bottom: 8rpx;
      }

      .zhuanye {
        font-size: 26rpx;
        font-weight: 400;
        letter-spacing: 0px;
        line-height: 33.6rpx;
        color: $uni-text-color;
        text-align: center;
      }

      .qhyx {
        font-size: 18rpx;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        text-align: center;
      }
    }

    .cxinss {
      width: 220rpx;
      height: 50rpx;
      border-radius: 228rpx;
      border: 2rpx solid $uni-color-primary;
      font-size: 28rpx;
      font-weight: 600;
      color: $uni-color-primary;
      margin: 0 auto;
      margin-top: 37rpx;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .atabs {
    margin-top: 20rpx;
  }

  .tab-content {
    padding: 32rpx 30rpx;
    padding-bottom: 0rpx;
    // height: 56vh;
    overflow: auto;

    .tabsa {
      width: 100%;
      border-radius: 16rpx;
      background: $uni-bg-color;
      padding: 32rpx 0;

      .h1 {
        margin-bottom: 32rpx;
        padding: 0 16rpx;
        display: flex;
        align-items: center;

        .borleds {
          width: 6rpx;
          height: 30rpx;
          opacity: 1;
          border-radius: 16rpx;
          background: $uni-text-color-placeholder;
          margin-right: 16rpx;
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
    }
  }

  .zhsi {
    display: block;
    font-size: 24rpx;
    font-weight: 300;
    letter-spacing: 0px;
    line-height: 30.8rpx;
    color: $uni-text-color;
    padding: 32rpx;
  }

  ._table {
    border: 1rpx solid rgba(153, 153, 153, 0.2);
    border-radius: 16rpx;
    overflow: hidden;
    width: 100%;
    z-index: 2;

    ._tr {
      display: flex;
    }

    ._th {
      text-align: center;
      background-color: $uni-bg-color-tag;
      height: 80rpx;
      line-height: 80rpx;
      color: $uni-text-color-grey;
      border-right: 1rpx solid rgba(153, 153, 153, 0.2);
    }

    ._td {
      border: 1rpx solid rgba(153, 153, 153, 0.2);
      margin-left: -1rpx;
      margin-bottom: -1rpx;
      text-align: center;
      font-size: 26rpx;
      font-weight: 600;
      color: $uni-text-color;
      padding: 14rpx;
    }
  }
}
</style>