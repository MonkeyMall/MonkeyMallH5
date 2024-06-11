<template>
  <view class="AIchooseschool">
    <view class="titleimg">
    </view>
    <view class="lise">
      <view class="tops">
        <view class="namese">您的目标专业是？</view>
        <view class="shuls">
          <text style="font-size: 40rpx;color: rgba(252, 81, 95, 1);">1</text>/3
        </view>
      </view>
      <view>
        <uni-picker-s :obj="obj" @setObj="setObj" @setZyName="setZyName" @setObjSchool="setObjSchool"></uni-picker-s>
      </view>
    </view>
    <view class="lise">
      <view class="tops">
        <view class="namese">您的分数？</view>
        <view class="shuls">
          <text style="font-size: 40rpx;color: rgba(252, 81, 95, 1);">2</text>/3
        </view>
      </view>
      <view class="scoreBox">
        <uv-input placeholder="请输入最低分数" type="number" v-model="startScore">
          <template v-slot:suffix>
            <text>分</text>
          </template>
        </uv-input>
        <text>-</text>
        <uv-input placeholder="请输入最高分数" type="number" v-model="endScore">
          <template v-slot:suffix>
            <text>分</text>
          </template>
        </uv-input>
      </view>
    </view>
    <view class="lise">
      <view class="tops">
        <view class="namese">地区 </view>
        <view class="shuls">
          <text style="font-size: 40rpx;color: rgba(252, 81, 95, 1);">3</text>/3
        </view>
      </view>
      <view class="inpiseu" @click="handpopase()">
        <view class="names" v-if="schoolAffiliatingArea">
          <dict-tag v-if="schoolRegion == 'major_school_aq'" :options="dict.type.major_school_aq"
            :value="schoolAffiliatingArea" />
          <dict-tag v-if="schoolRegion == 'major_school_bq'" :options="dict.type.major_school_bq"
            :value="schoolAffiliatingArea" />
        </view>
        <view class="names" v-if="!schoolAffiliatingArea">请选择地区</view>
        <view>
          <!-- <i class="iconfont" style="margin-left: 10rpx;">&#xe840;</i> -->
          <uv-icon name="arrow-right" color="rgba(51, 51, 51, 1.00)" size="18"></uv-icon>
        </view>
      </view>
    </view>
    <view class="bcbtns" @click="Getresults">获取结果</view>

    <uv-popup ref="popup">
      <view class="content">
        <uv-vtabs :chain="chain" :list="dict.type.major_school_region" keyName="label"
          :barItemBadgeStyle="{ right: '20px', top: '12px' }" height="800rpx" @change="change()">
          <uv-vtabs-item>
            <view>
              <!-- <uv-checkbox-group v-model="checkboxValue" iconPlacement="right"
								activeColor="rgba(252, 81, 95, 1)" @change="handchenck">
								<uv-checkbox v-if="ABindex ==0" :customStyle="{marginBottom: '8px'}"
									v-for="dict in dict.type.major_school_aq" :key="dict.value" :label="dict.label"
									:name="dict.value"></uv-checkbox>

								<uv-checkbox v-if="ABindex ==1" :customStyle="{marginBottom: '8px'}"
									v-for="dict in dict.type.major_school_bq" :key="dict.value" :label="dict.label"
									:name="dict.value"></uv-checkbox>
								<uv-checkbox v-if="ABindex ==2" :customStyle="{marginBottom: '8px'}"
									v-for="dict in dict.type.major_school_qt" :key="dict.value" :label="dict.label"
									:name="dict.value"></uv-checkbox>
							</uv-checkbox-group> -->

              <uv-radio-group v-model="schoolAffiliatingArea" placement="column" iconPlacement="right"
                @change="handchenck">
                <uv-radio v-if="ABindex == 0" activeColor="#FC515F" :customStyle="{ marginBottom: '8px' }"
                  v-for="dict in dict.type.major_school_aq" :key="dict.value" :label="dict.label"
                  :name="dict.value"></uv-radio>

                <uv-radio v-if="ABindex == 1" activeColor="#FC515F" :customStyle="{ marginBottom: '8px' }"
                  v-for="dict in dict.type.major_school_bq" :key="dict.value" :label="dict.label"
                  :name="dict.value"></uv-radio>
                <uv-radio v-if="ABindex == 2" activeColor="#FC515F" :customStyle="{ marginBottom: '8px' }"
                  v-for="dict in dict.type.major_school_qt" :key="dict.value" :label="dict.label"
                  :name="dict.value"></uv-radio>
              </uv-radio-group>
            </view>
          </uv-vtabs-item>
        </uv-vtabs>
        <view class="quxqrs">
          <view class="quss" @click="handopess">
            取消
          </view>
          <view class="" @click="diquconfirm">
            确认
          </view>
        </view>
      </view>
    </uv-popup>
  </view>
</template>

<script>
import {
  groupTree,
  AISubjectGroup
} from "@/api/colleges/index"

// import uvInput from "@/pageSec/components/uv-input/components/uv-input/uv-input.vue"
// import uvIcon from "@/pageSec/components/uv-icon/components/uv-icon/uv-icon.vue"
// import uvPopup from "@/pageSec/components/uv-popup/components/uv-popup/uv-popup.vue"
// import uvTabsItem from "@/pageSec/components/uv-tabbar/components/uv-tabbar-item/uv-tabbar-item.vue"
// import uvTabs from "@/pageSec/components/uv-vtabs/components/uv-vtabs/uv-vtabs.vue"
// import uvRadio from "@/pageSec/components/uv-radio/components/uv-radio/uv-radio.vue"
// import uvRadioGroup from "@/pageSec/components/uv-radio/components/uv-radio-group/uv-radio-group.vue"
import uvVtabs from '@/pageSec/components/uv-vtabs/components/uv-vtabs/uv-vtabs.vue'
import uvVtabsItem from '@/pageSec/components/uv-vtabs/components/uv-vtabs-item/uv-vtabs-item.vue'
import uniPickerS from '@/pageSec/components/uni-picker-s/uni-picker-s.vue'

export default {
  dicts: ['major_school_aq', 'major_school_bq', 'major_school_region', 'major_school_type', 'major_school_property'],
  components: {
    // uvInput,
    // uvIcon,
    // uvPopup,
    // uvTabs,
    // uvTabsItem,
    // uvRadio,
    // uvRadioGroup,
    uniPickerS,
    uvVtabs,
    uvVtabsItem
  },
  data() {
    return {
      checkboxValue: [], //选择的地区
      ABindex: 0,
      popindex: 1,
      schoolRegion: "major_school_aq", //地区区域
      schoolAffiliatingArea: "",
      startScore: '',
      endScore: '',
      specialtyMasterType: "",
      specialtyAffiliatingCategoryId: "",
      specialtyAffiliatingSubjecttId: '',
      zyname: "",
      obj: {
        specialtyMasterType: '',
        specialtyAffiliatingCategoryId: '',
        specialtyAffiliatingSubjecttId: ''
      },
      objSchool: {
        specialtyName: '',
        specialtyCode: ''
      }
    }
  },
  onLoad() {
  },
  onShow() { },
  mounted() { },
  computed: {
    addressList() {
      return [this.a, this.b, this.c, this.d];
    }
  },
  
  onShareAppMessage(options) {
    // 返回分享的内容
    return {
      title: 'AI择校',
      path: '/pageSec/AIchooseschool/index',
    };
  },
  methods: {
    // 选择专业
    handpopIndex(value) {
      this.popindex = value
    },
    // 选择地区
    handpopase() {
      this.$refs.popup.open('top');
    },
    change(index) {
      this.ABindex = index
      this.schoolRegion = this.dict.type.major_school_region[index].value
      this.schoolAffiliatingArea=""
    },
    handchenck(e) {
      console.log('数据', e)
      this.schoolAffiliatingArea = e
    },
    diquconfirm() {
      this.$refs.popup.close()
    },
    handopess() {
      this.$refs.popup.close()
    },
    setObj(obj) {
      this.obj = obj
    },
    setZyName(zyname) {
      this.zyname = zyname
      this.setObjSchool({}) //清空专业数据
    },
    setObjSchool(obj) {
      this.objSchool = obj
    },
    Getresults() {
      if (this.objSchool.specialtyCode) {
        if (this.startScore && this.endScore && this.startScore < this.endScore) {
          if (this.schoolAffiliatingArea) {
            this.$tab.navigateTo('/pageThe/checkthemajor/professional?AI=1&schoolRegion=' + this
              .schoolRegion + '&schoolAffiliatingArea=' + this.schoolAffiliatingArea +
              "&startScore=" + this.startScore + "&endScore=" + this.endScore + "&specialtyMasterType=" + this
                .obj.specialtyMasterType + "&specialtyAffiliatingCategoryId=" + this
                  .obj.specialtyAffiliatingCategoryId + "&specialtyAffiliatingSubjecttId=" + this
                    .obj.specialtyAffiliatingSubjecttId + "&specialtyName=" + this
                      .objSchool.specialtyName + '&specialtyCode=' + this.objSchool.specialtyCode + '&zyname=' + this.zyname + '&title=获取结果&isTJ=2')
          } else {
            uni.showToast({
              title: '请选择地区',
              icon: 'none',
              duration: 1000
            });
          }
        } else {
          if (!this.startScore || !this.endScore) {
            uni.showToast({
              title: '请选择您的分数区间',
              icon: 'none',
              duration: 1000
            });
          } else {
            uni.showToast({
              title: '最低分不能高于最高分！',
              icon: 'none',
              duration: 1000
            });
          }
        }
      } else {
        uni.showToast({
          title: '请选择目标专业',
          icon: 'none',
          duration: 1000
        });
      }
    }
  }
}
</script>

<style lang="scss">
.scoreBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text{
    margin: 0 10rpx;
  }
}
.AIchooseschool {
  padding: 30rpx;
  background-color: $uni-bg-color;
  min-height: 100vh;

  .titleimg {
    width: 100%;
    height: 230rpx;
    border-radius: 16rpx;
    background: url(https://img.js.design/assets/img/6539d2e852003be94a91ff04.jpg#3efc419bf7e0a4b1ca49885efa82f62d) no-repeat;
    background-size: 100% 100%;
    margin-bottom: 36rpx;
  }
  
  /deep/ .selected-item-active {
    border-color: #fc515f;
  }

  /deep/ .arrow-area {
    display: none !important;
  }

  /deep/ .input-value-border {
    border: none !important;
  }

  /deep/ .selected-area {
    font-size: 28rpx !important;
    font-weight: 600 !important;
    line-height: 40rpx !important;
    color: rgba(51, 51, 51, 1) !important;
  }

  /deep/ .placeholder {
    font-size: 28rpx !important;
    font-weight: 400 !important;
    color: $uni-text-color-grey !important;
  }

  /deep/ .uv-input__content__field-wrapper__field {
    font-size: 28rpx !important;
    font-weight: 600 !important;
    line-height: 40rpx !important;
    color: rgba(51, 51, 51, 1) !important;
  }

  /deep/ .input-placeholder {
    font-size: 28rpx !important;
    font-weight: 400 !important;
    color: $uni-text-color-grey !important;
  }

  /deep/ ._span {
    font-size: 28rpx !important;
    font-weight: 600 !important;
    line-height: 40rpx !important;
    color: rgba(51, 51, 51, 1) !important;
    padding-left: 16rpx;
  }

  .lise {
    margin-bottom: 40rpx;

    .tops {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 8rpx;

      .namese {
        font-size: 32rpx;
        font-weight: 600;
        line-height: 44.8px;
        color: $uni-text-color;
      }

      .shuls {
        font-size: 28rpx;
        font-weight: 600;
        line-height: 39.2rpx;
        color: $uni-text-color-grey;
      }
    }

    .inpiseu {
      display: flex;
      justify-content: space-between;
      padding: 20rpx 16rpx;
      height: 80rpx;
      border-radius: 16px;
      background: rgba(246, 248, 253, 1);
      height: 80rpx;
      align-items: center;

      .names {
        font-size: 28rpx;
        font-weight: 400;
        letter-spacing: 0px;
        color: $uni-text-color-grey;
      }

      .iconfont {
        font-size: 44rpx;
      }

      .namea {
        font-size: 28rpx;
        font-weight: 600;
        letter-spacing: 0px;
        line-height: 40rpx;
        color: rgba(51, 51, 51, 1);
      }
    }

    /deep/ .uv-input {
      border: none !important;
      padding: 20rpx 16rpx;
      height: 80rpx;
      border-radius: 16px;
      background: rgba(246, 248, 253, 1);
    }

    /deep/ .input-placeholder {
      color: $uni-text-color-grey !important;
      font-size: 28rpx !important;
    }
  }

  .contentea {
    padding: 0 40rpx;
    height: 900rpx;

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

    .active {
      background-color: $uni-text-color-placeholder;
      color: $uni-text-color-inverse !important;
      font-weight: 600 !important;
    }
  }

  .content {
    .quxqrs {
      // height: 142rpx;
      display: flex;
      width: 100%;
      justify-content: space-between;
      // position: fixed;
      // bottom: 0rpx;
      // left: 0;
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
  
  /deep/ .uv-safe-bottom{
    padding-bottom: 0 !important;
  }

  /deep/ .uv-radio-group {
    display: block !important;
    padding-bottom: 150rpx;
  }

  /deep/ .uv-radio {
    padding: 25rpx 0 !important;
    margin-left: 81rpx !important;
    font-size: 28rpx !important;
    font-weight: 400 !important;
    line-height: 39.2rpx !important;
    color: $uni-text-color !important;
    padding-right: 46rpx !important;
  }

  /deep/ .uv-radio__icon-wrap {
    border-radius: 100% !important;
    width: 42rpx !important;
    height: 42rpx !important;
    color: #fc515f !important;
  }

  /deep/ .check {
    border-color: #fc515f !important;
  }

  /deep/ .vue-ref {
    border-radius: 0 0 16rpx 16rpx !important;
    overflow: hidden !important;
  }

  /deep/ .uv-overlay {
    border-radius: 0 !important;
  }

  /deep/ .uv-checkbox-group {
    display: block !important;
    padding-bottom: 50rpx;
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
    width: 42rpx !important;
    height: 42rpx !important;
  }

  /deep/ .uv-vtabs__bar-item-active--value {
    color: $uni-color-primary !important;
    font-size: 36rpx !important;
    font-weight: 600 !important;
  }

  /deep/ .uv-vtabs__bar-item--line {
    background-color: $uni-color-primary !important;
  }

  /deep/ .vue-ref {
    border-radius: 16rpx !important;
  }

  .bcbtns {
    width: 100%;
    height: 80rpx;
    opacity: 1;
    border-radius: 16rpx;
    margin: 0 auto;
    background-color: $uni-color-primary;
    color: $uni-text-color-inverse;
    text-align: center;
    line-height: 80rpx;
    font-size: 32rpx;
    font-weight: 600;
    margin-top: 40rpx;
  }
}
</style>