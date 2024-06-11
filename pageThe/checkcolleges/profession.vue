<template>
  <view class="profession">
    <view class="tabss">
      <view class="h1">
        <text></text>双一流建设
      </view>
      <view class="test">
        <view class="Lise" v-for="(item, index) in schoolssdata.isDoubleFirstRateList" :key="index">
          <text></text>
          <view>{{ item }}</view>
        </view>
      </view>
    </view>
    <uni-easyinput prefixIcon="search" v-model="queryPamers.specialtyNameCodesubjectName" placeholder="请输入专业名称代码/考试科目"
      @input="getUser"></uni-easyinput>
    <view class="selsesrr">
      <view class="xialsks" @click="handnianens(1)">
        <text style="margin-right:10rpx;">{{ queryPamers.foreignLanguageTypeVal }}</text><uv-icon
          style="margin-left: 100rpx;" name="arrow-down" color="rgba(51, 51, 51, 1);"></uv-icon>
      </view>
      <view class="xialsks" @click="handnianens(2)">
        <text style="margin-right:10rpx;">{{ queryPamers.mathTypeVal }}</text><uv-icon name="arrow-down"
          color="rgba(51, 51, 51, 1);"></uv-icon>
      </view>
    </view>
    <view class="zhanyelist" @click="handtpdisee(item)" v-for="(item, index) in schoolssdata.majorSchoolSpecialtyList"
      :key="index">
      <view class="type">
        <view class="zhaunyes">
          {{ item.specialtyName }}
        </view>
        <view class="zydaimas">
          专业代码
          <text class="masesd">{{ item.specialtyCode }}</text>
        </view>
      </view>
      <view class="typezhuanye">
        专业类别：
        <text>{{ item.specialtyMasterName }}</text>-{{ item.specialtyAffiliatingCategoryName }}<text
          v-if="item.specialtyAffiliatingSubjecttName">-{{ item.specialtyAffiliatingSubjecttName }}</text>
      </view>
    </view>
    <uv-picker ref="picker" cancelText="取消" confirmText="确认" keyName="label" :columns="englishList" @confirm="confirm">
    </uv-picker>
    <uv-picker ref="pickers" cancelText="取消" confirmText="确认" keyName="label" :columns="mathList" @confirm="confirms">
    </uv-picker>
  </view>
</template>

<script>
import {
  schoolssList,
} from "@/api/colleges/index"
import uvIcon from "@/pageThe/components/uv-icon/components/uv-icon/uv-icon.vue"
import uvPicker from "@/pageThe/components/uv-picker/components/uv-picker/uv-picker.vue"
import uniEasyinput from "@/pageThe/components/uni-easyinput/components/uni-easyinput/uni-easyinput.vue"

export default {
  components: {
    uvIcon,
    uvPicker,
    uniEasyinput
  },
  props: ['schoolId', 'specialtyAffiliatingCategoryId', 'specialtyName'],
  watch: {
    specialtyAffiliatingCategoryId(newVal) {
      this.queryPamers.specialtyAffiliatingCategoryId = newVal
    },
    specialtyName(newVal) {
      this.queryPamers.specialtyName = newVal
    }
  },
  data() {
    return {
      schoolssdata: {},
      englishList: [
        [{
          label: '全部',
          id: 0,
          value: ''
        }, {
          label: '英语一',
          id: 1,
          value: 'englishOne'
        },
        {
          label: '英语二',
          id: 2,
          value: 'englishTwo'
        },
        {
          label: '其他',
          id: 3,
          value: 'other'
        }
        ]
      ],
      mathList: [
        [{
          label: '全部',
          id: 0,
          value: ''
        }, {
          label: '数学一',
          id: 1,
          value: 'mathOne'
        },
        {
          label: '数学二',
          id: 2,
          value: 'mathTwo'
        },
        {
          label: '数学三',
          id: 3,
          value: 'mathThree'
        },
        {
          label: '不考数学',
          id: 4,
          value: 'other'
        }
        ]
      ],
      queryPamers: {
        schoolId: "", //学校id	
        specialtyNameCodesubjectName: "",
        foreignLanguageType: "", //外语类型	
        mathType: "", //数学类型	
        mathTypeVal: '选择数学类型',
        foreignLanguageTypeVal: '选择外语类型',
      }
    }
  },
  computed: {},
  onLoad() { },
  mounted() {
    this.queryPamers.schoolId = this.schoolId
    this.getUser()
  },
  methods: {
    handtpdisee(item) {
      // isTJ 0-查专业 1-调剂页 
      this.$tab.navigateTo(`/pageThe/checkthemajor/aprofessionaldetails?schoolId=${item.schoolId}&specialtyId=${item.specialtyId}&isTJ=${0}`)
    },
    handnianens(num) {
      this.num = num
      if (num == 1) {
        this.$refs.picker.open();
        this.$refs.pickers.close();
      }
      if (num == 2) {
        this.$refs.pickers.open();
        this.$refs.picker.close();
      }
    },
    confirm(e) {
      console.log('e: ', e);
      this.queryPamers.foreignLanguageType = e.value[0].value
      this.queryPamers.foreignLanguageTypeVal = e.value[0].label
      this.getUser()
    },
    confirms(e) {
      console.log('e: ', e);
      this.queryPamers.mathType = e.value[0].value
      this.queryPamers.mathTypeVal = e.value[0].label
      this.getUser()
    },
    getUser() {
      schoolssList(this.queryPamers).then(response => {
        this.schoolssdata = response.data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.profession {
  .tabss {
    width: 100%;
    border-radius: 16rpx;
    background: $uni-bg-color;
    margin-bottom: 32rpx;

    .h1 {
      height: 90rpx;
      font-size: 32rpx;
      font-weight: 600;
      color: $uni-text-color;
      padding: 0 16rpx;
      display: flex;
      align-items: center;

      text {
        display: block;
        margin-right: 15rpx;
        width: 7rpx;
        height: 30rpx;
        border-radius: 16rpx;
        background: rgba(252, 81, 95, 1);
      }
    }

    .test {
      padding: 32rpx 16rpx;
      border-top: 2rpx solid rgba(246, 248, 253, 1);
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      align-items: center;

      .Lise {
        display: flex;
        align-items: center;
        width: 43%;
        margin: 8rpx 0;

        text {
          display: block;
          width: 8rpx;
          height: 8rpx;
          background: $uni-color-primary;
          border-radius: 100%;
          margin-right: 16rpx;
        }

        view {
          font-size: 28rpx;
          font-weight: 400;
          letter-spacing: 0px;
          line-height: 39.2rpx;
          color: $uni-text-color;
        }
      }
    }
  }

  .selsesrr {
    padding: 0 42rpx;
    padding-top: 32rpx;
    color: $uni-text-color;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20rpx;

    .xialsks {
      display: flex;
      font-size: 28rpx;
      font-weight: 400;
      letter-spacing: 0px;
      line-height: 39.2px;
      color: $uni-text-color;
      text-align: center;
      vertical-align: top;
    }
  }

  .zhanyelist {
    padding: 32rpx 16rpx;
    border-radius: 16rpx;
    background: $uni-bg-color;
    margin-bottom: 16rpx;

    .type {
      display: flex;
      align-items: center;

      .zhaunyes {
        font-size: 32rpx;
        font-weight: 600;
        letter-spacing: 0px;
        line-height: 44.8rpx;
        color: $uni-text-color;
      }

      .zydaimas {
        height: 32rpx;
        padding-left: 10rpx;
        border-radius: 8rpx;
        border: 1px solid rgba(252, 81, 95, 1);
        font-size: 24rpx;
        font-weight: 400;
        color: $uni-text-color-placeholder;
        margin-left: 16rpx;
        position: relative;
        white-space: nowrap;
        display: flex;
        align-items: center;
        white-space: nowrap;
        .masesd {
          margin-left: 10rpx;
          display: inline-block;
          width: 85rpx;
          text-align: center;
          height: 30rpx;
          background: url('https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/college/collegeprofile13.png');
          background-size: 100% 100%;
          color: $uni-text-color-inverse;
          padding: 0 10rpx;
          display: flex;
          align-items: center;
          white-space: nowrap;
        }
      }
    }

    .typezhuanye {
      font-size: 26rpx;
      font-weight: 400;
      letter-spacing: 0px;
      margin-top: 16rpx;
      color: $uni-text-color-grey;
    }
  }
}
</style>