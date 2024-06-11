<template>
  <view class="fraction">
    <view class="tabs">
      <view class="h1">
        注：红色分数为院线复试线与国家线的差值
        <uv-icon name="info-circle" color="rgba(252, 81, 95, 1);"></uv-icon>
      </view>
      <view class="text">
        <view class="xialsks" @click="handnianens(1)">
          <text style="margin-right:10rpx;">{{ quserparms.yearTime }}</text><uv-icon style="margin-left: 100rpx;"
            name="arrow-down" color="rgba(51, 51, 51, 1);"></uv-icon>
        </view>
        <view class="xialsks" @click="handnianens(2)">
          <text style="margin-right:10rpx;">{{ bdata }}</text><uv-icon name="arrow-down"
            color="rgba(51, 51, 51, 1);"></uv-icon>
        </view>
        <uni-data-d :grouLsita="grouLsita" :value="cdata" @onchange="onchange" @nodeReset="clearFn">
          <view class="xialsks" @click="handnianens(3)">
            <text style="margin-right:10rpx;">{{ cdata }}</text><uv-icon name="arrow-down"
              color="rgba(51, 51, 51, 1);"></uv-icon>
          </view>
        </uni-data-d>
        <!-- <view class="xialsks" @click="handnianens(3)">
          <text style="margin-right:10rpx;">{{ cdata }}</text><uv-icon name="arrow-down"
            color="rgba(51, 51, 51, 1);"></uv-icon>
        </view> -->
      </view>
    </view>
    <template v-if="FindScorelist.length">
      <view class="tabs" v-for="(item, index) in FindScorelist" :key="index">
        <view class="h3">
          <view class="title">
            <view class="left">{{ item.specialtyName }}</view>
            <view class="right">
              <view class="fus">复试平均分</view>
              <view class="paiming">{{ item.mrasTotalScore }}</view>
              <view class="shengjs" style="margin-right: 5rpx;">{{ item.ctotalScore }}</view>
              <image v-if="item.ctotalScore > 0"
                src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/college/collegeprofile12.png"
                mode=""></image>
              <image v-if="item.ctotalScore < 0"
                src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/xueyaun1.png" mode="">
              </image>
            </view>
          </view>
          <view class="type">
            <view class="zhaunyes">
              {{ item.specialtyMasterName }}
            </view>
            <view class="zydaimas">
              专业代码
              <text class="masesd">{{ item.specialtyCode }}</text>
            </view>
          </view>
        </view>
        <view class="textxinxi">
          <view class="kemupaise">
            <view class="rights">
              <view class="fus">政治：{{ item.politics }}</view>
              <image v-if="item.cpolitics > 0"
                src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/college/collegeprofile12.png"
                mode=""></image>
              <image v-if="item.cpolitics < 0"
                src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/xueyaun1.png" mode="">
              </image>
              <view class="shengjs">{{ item.cpolitics }}</view>
            </view>
            <view class="rights">
              <view class="fus">专业一：{{ item.specialtyFirst }}</view>
              <image v-if="item.cspecialtyFirst > 0"
                src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/college/collegeprofile12.png"
                mode=""></image>
              <image v-if="item.cspecialtyFirst < 0"
                src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/xueyaun1.png" mode="">
              </image>
              <view class="shengjs">{{ item.cspecialtyFirst }}</view>
            </view>
          </view>
          <view class="kemupaise">
            <view class="rights">
              <view class="fus">外语：{{ item.english }}</view>
              <image v-if="item.cenglish > 0"
                src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/college/collegeprofile12.png"
                mode=""></image>
              <image v-if="item.cenglish < 0"
                src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/xueyaun1.png" mode="">
              </image>
              <view class="shengjs">{{ item.cenglish }}</view>
            </view>
            <view class="rights">
              <view class="fus">专业二：{{ item.specialtySecend }}</view>
              <image v-if="item.cspecialtySecend > 0"
                src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/college/collegeprofile12.png"
                mode=""></image>
              <image v-if="item.cspecialtySecend < 0"
                src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/xueyaun1.png" mode="">
              </image>
              <view class="shengjs">{{ item.cspecialtySecend }}</view>
            </view>
          </view>
          <!-- <view class="smakes">
					备注：--
				</view> -->
        </view>
      </view>
    </template>

    <!-- <view v-if="FindScorelist.length == 0"> 
      <uni-default-page
        value="4"
        tic="暂无数据"
        btntext="返回上一级"
      ></uni-default-page>
    </view> -->
    <uv-picker ref="datetimePicker" v-model="value" :columns="yearColumn" @confirm="confirm">
    </uv-picker>
    <uv-picker v-show="showe" ref="pickers" cancelText="取消" keyName="label" confirmText="确认" :columns="grouLsit"
      @confirm="confirms">
    </uv-picker>
    <!-- <uv-popup ref="popup">
      <view class="contentea">
        <view style="position: relative;">
          <uni-data-picker ref="pickerss" v-model="cdata" :localdata="grouLsita" keyName="label" popup-title="请选择"
            @change="onchange" :clear-icon="true" @nodeclick="onnodeclick"></uni-data-picker>
          <view class="clearBox" @click="clearFn">
            <i class="iconfont">&#xe633;</i>
          </view>
        </view>
      </view>
    </uv-popup> -->
  </view>
</template>

<script>
import {
  groupTree,
  schoolFindScore,
  findYearBySchoolId,
  countryScoreTree
} from "@/api/colleges/index"
import uvIcon from "@/pageThe/components/uv-icon/components/uv-icon/uv-icon.vue"
import uvPicker from "@/pageThe/components/uv-picker/components/uv-picker/uv-picker.vue"
// import uniDefaultPage from '@/pageThe/components/uni-default-page/uni-default-page.vue';
import uvPopup from '@/pageThe/components/uv-popup/components/uv-popup/uv-popup.vue'
// import uniDataPicker from '@/pageThe/components/uni-data-picker/components/uni-data-picker/uni-data-picker.vue'
import uniDataD from '@/pageThe/components/uni-picker-d/uni-picker-d.vue'
export default {
  props: ['schoolId', 'specialtyAffiliatingCategoryId', 'specialtyMasterType', 'specialtyName'],
  components: {
    uvIcon,
    uvPicker,
    uvPopup,
    uniDataD
    // uniDataPicker
    // uniDefaultPage
  },
  watch: {
    specialtyAffiliatingCategoryId(newVal, oldVal) {
      console.log('newVal: ', newVal);
      this.quserparms.specialtyAffiliatingCategoryId = newVal
      this.getList()
    },
    specialtyName(newVal, oldVal) {
      console.log('newVal: ', newVal);
      this.cdata = newVal
    }
  },
  data() {
    return {
      value1: '',
      yearColumn: [],
      showe: false,
      value: Number(new Date()),
      bdata: '',
      grouLsit: [],
      grouLsita: [],
      cdata: '请选择专业',
      num: '',
      FindScorelist: [],
      quserparms: {
        schoolId: "", //学校id
        yearTime: "", //年份	
        specialtyMasterType: "", //硕士类型	
        specialtyAffiliatingCategoryId: "", //所属门类	
      },
      popindex: 1,

    }
  },
  computed: {},
  onLoad() { },
  mounted() {
    this.quserparms.schoolId = this.schoolId
    this.handgroupTree()
    this.getFindYearBySchoolId()
    this.getCountryScoreTree()

  },
  methods: {
    handEmit() {
      this.$tab.navigateBack(1)
    },
    // handpopIndex(value) {
    //   console.log('value: ', value);
    //   this.popindex = value
    //   console.log(this.columns)
    //   if (value == 0) {
    //     // 0学硕 1专硕
    //     this.columns[0].forEach(item => {
    //       if (item.label === '学术型硕士') {
    //         this.bdata = '学术型硕士'
    //         this.grouLsit[0].forEach(i => {
    //           if (i.label === '学术型硕士') {
    //             this.quserparms.specialtyMasterType = i.id
    //           }
    //         })
    //         console.log('item: ', item);
    //         this.grouLsita = item.children
    //       }
    //     })
    //   }
    //   if (value == 1) {
    //     // 0学硕 1专硕
    //     this.columns[0].forEach(item => {
    //       if (item.label === '专业型硕士') {
    //         this.bdata = '专业型硕士'
    //         this.grouLsit[0].forEach(i => {
    //           if (i.label === '专业型硕士') {
    //             this.quserparms.specialtyMasterType = i.id
    //           }
    //         })

    //         console.log('item: ', item);
    //         this.grouLsita = item.children
    //       }
    //     })
    //   }

    // },
    onchange(e) {
      this.quserparms.specialtyAffiliatingCategoryId = e.detail.value[0].value
      this.quserparms.specialtyAffiliatingSubjecttId = e.detail.value[1].value
      this.cdata = e.detail.value[1].text
      this.getList()
    },
    onnodeclick(node) {
      console.log(2)
      console.log(node)
    },
    clearFn() {
      this.cdata = '请选择专业'
      this.quserparms.specialtyAffiliatingCategoryId = ''
      this.quserparms.specialtyAffiliatingSubjecttId = ''
      this.getList()
    },
    // 获取年份
    getFindYearBySchoolId() {
      findYearBySchoolId({
        schoolId: this.schoolId
      }).then(res => {
        if (res.code === 200) {
          this.quserparms.yearTime = res.data[0] || new Date(new Date()).getFullYear()
          if (res.data && res.data.length > 0) {
            this.yearColumn = [res.data]
          } else {
            let year = (new Date(new Date()).getFullYear()) + ''
            this.yearColumn = [[year]]
            console.log(' this.yearColumn: ', this.yearColumn);
          }

        }
      })
    },
    // 获取专业
    getCountryScoreTree() {
      groupTree().then(res => {
        console.log('res: ', res);
        this.quserparms.specialtyMasterType = res.data[0].id
        this.bdata = res.data[0].label
        if (res.code === 200) {
          // if (res.data[0].label != '学术型硕士') {
          //   var temp = res.data[0];
          //   res.data[0] = res.data[1];
          //   res.data[1] = temp;
          // }
          console.log(res.data, 'res.data')
          this.grouLsit.push(res.data)
          this.columns = [res.data]
          this.initData(res.data)
          res.data.forEach(item => {
            if (item.id === this.quserparms.specialtyMasterType) {
              this.grouLsita = item.children

            }
          })
          console.log(this.grouLsita)
          // if (!this.cdata) {
          //   this.cdata = this.grouLsita[0].children[0].label
          //   this.quserparms.specialtyAffiliatingCategoryId = this.grouLsita[0].id
          //   this.quserparms.specialtyAffiliatingSubjecttId = this.grouLsita[0].children[0].id
          // }
          this.getList()
        }
      })
    },
    initData(data) {
      data.forEach(item => {
        item.text = item.label
        item.value = item.id
        if (item.children && item.children.length > 0) {
          this.initData(item.children)
        }
      })
    },
    // 学科
    handgroupTree() {
      // groupTree().then(response => {
      //   if(response.code === 200){
      //     this.grouLsit.push(response.data)
      //     console.log('response.data: ', response.data);
      //     this.bdata = this.grouLsit[0][0].label
      //     this.quserparms.specialtyMasterType = this.grouLsit[0][0].id
      //     // this.grouLsita.push(this.grouLsit[0][0].children)

      //     // this.quserparms.specialtyAffiliatingCategoryId = this.grouLsita[0][0].id
      //     // if(!this.cdata){
      //     //   this.cdata = this.grouLsita[0][0].label
      //     // }

      //     this.showe = true
      //     this.getList()
      //   }

      // })
    },
    handtoinstiu() {
      this.$tab.navigateTo('/pages/checkcolleges/Institutiondetails')
    },
    handnianens(num) {
      this.num = num
      if (num == 1) {
        if (this.yearColumn && this.yearColumn.length > 0) {
          this.$refs.datetimePicker.open();
          this.$refs.pickers.close();
          // this.$refs.pickerss.close();
          // this.$refs.popup.close();
        } else {
          uni.showToast({
            title: "暂无数据",
            icon: 'none',
          })
          return
        }

      }
      if (num == 2) {
        if (this.grouLsit && this.grouLsit.length > 0) {
          this.$refs.pickers.open();
          this.$refs.datetimePicker.close();
          // this.$refs.popup.close();
          // this.$refs.pickerss.close();
        } else {
          uni.showToast({
            title: "暂无数据",
            icon: 'none',
          })
          return
        }


      }
      if (num == 3) {
        if (this.grouLsita && this.grouLsita.length > 0) {
          // this.$refs.popup.open('bottom');
          // this.$refs.pickerss.open();
          this.$refs.datetimePicker.close();
          this.$refs.pickers.close();
          this.grouLsit[0].forEach((item, index) => {
            if (item.id === this.quserparms.specialtyMasterType) {
              this.popindex = index
            }
          })
        } else {
          uni.showToast({
            title: "暂无数据",
            icon: 'none',
          })
          return
        }


      }
    },
    confirm(e) {
      console.log('e: ', e);
      this.quserparms.yearTime = e.value[0]
      this.getList()
    },
    confirms(e) {
      console.log(e)
      this.quserparms.specialtyMasterType = e.value[0].id
      this.bdata = e.value[0].label
      this.grouLsita = []
      // this.grouLsita.push(e.value[0].children)
      this.grouLsita = e.value[0].children
      console.log('this.grouLsita: ', this.grouLsita);
      this.cdata = '请选择专业'
      // this.cdata = this.grouLsita[0][0].label
      this.quserparms.specialtyAffiliatingCategoryId = ''
      this.getList()
    },
    confirmss(e) {
      console.log('e: ', e);
      this.quserparms.specialtyAffiliatingCategoryId = e.value[0].id
      this.cdata = e.value[0].label
      this.getList()
    },
    handback() {
      this.$tab.navigateBack(1)
    },
    getList() {
      console.log('this.quserparms', this.quserparms)
      console.log(this.quserparms.specialtyAffiliatingCategoryId, 'this.quserparms.specialtyAffiliatingCategoryId====')
      schoolFindScore({
        ...this.quserparms
      }).then(response => {
        this.FindScorelist = response.data
        console.log(this.FindScorelist)
      })
    }
  }
}
</script>
<style lang="scss">
.fraction {
  .tabs {
    width: 100%;
    border-radius: 16rpx;
    background: $uni-bg-color;
    padding: 32rpx 0;
    margin-bottom: 32rpx;

    .h1 {
      margin-bottom: 32rpx;
      padding: 0 16rpx;
      font-size: 26rpx;
      font-weight: 300;
      color: $uni-text-color-placeholder;
      vertical-align: top;
      display: flex;
      justify-content: space-between;
    }

    .text {
      padding: 0 16rpx;
      padding-top: 32rpx;
      color: $uni-text-color;
      border-top: 2rpx solid rgba(246, 248, 253, 1);
      display: flex;
      justify-content: space-between;

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

    .h3 {
      margin-bottom: 32rpx;
      padding: 0 16rpx;

      .title {
        display: flex;
        justify-content: space-between;
        align-items: baseline;

        .left {
          font-size: 32rpx;
          font-weight: 600;
          letter-spacing: 0px;
          line-height: 60rpx;
          color: $uni-text-color;
        }

        .right {
          display: flex;
          align-items: center;
          white-space: nowrap;
          margin-left: 20rpx;

          .fus {
            font-size: 26rpx;
            font-weight: 400;
            letter-spacing: 0px;
            line-height: 33.6px;
            color: $uni-text-color;
          }

          .paiming {
            font-size: 28rpx;
            font-weight: 600;
            line-height: 39.2rpx;
            color: $uni-text-color;
            margin-left: 8rpx;
            margin-right: 24rpx;
          }

          .shengjs {
            font-size: 28rpx;
            font-weight: 400;
            line-height: 39.2rpx;
            color: $uni-text-color-placeholder;
          }

          image {
            display: block;
            width: 18rpx;
            height: 18rpx;
          }
        }
      }

      .type {
        display: flex;
        align-items: center;

        .zhaunyes {
          font-size: 26rpx;
          letter-spacing: 0px;
          color: $uni-text-color-grey;
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
          display: flex;
          align-items: center;
          white-space: nowrap;

          .masesd {
            margin-left: 10rpx;
            display: inline-block;
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
    }

    .textxinxi {
      padding: 0 16rpx;
      padding-top: 32rpx;
      // color: $uni-text-color;
      border-top: 2rpx solid rgba(246, 248, 253, 1);

      .kemupaise {
        display: flex;

        .rights {
          display: flex;
          align-items: center;
          width: 50%;

          .fus {
            font-size: 28rpx;
            font-weight: 400;
            letter-spacing: 0px;
            line-height: 39.2px;
            color: $uni-text-color;
            margin-right: 16rpx;
          }

          image {
            display: block;
            width: 18rpx;
            height: 18rpx;
          }

          .shengjs {
            font-size: 28rpx;
            font-weight: 400;
            line-height: 39.2rpx;
            color: $uni-text-color-placeholder;
          }
        }
      }

      .smakes {
        /** 文本1 */
        font-size: 28rpx;
        font-weight: 400;
        line-height: 39.2rpx;
        color: $uni-text-color-grey;
        text-align: left;
        vertical-align: top;
      }
    }
  }

  .zanwuse {
    display: block;
    text-align: center;
    color: #999;
  }

  .contentea {
    padding: 40rpx;
    height: 900rpx;
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
    top: 15rpx;
    color: #808080b0;
  }

  .iconfont {
    font-size: 37rpx;
  }

  .active {
    background-color: $uni-text-color-placeholder;
    color: $uni-text-color-inverse !important;
    font-weight: 600 !important;
  }
}
</style>