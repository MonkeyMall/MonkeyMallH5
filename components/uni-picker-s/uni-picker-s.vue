<template>
  <view>
    <view class="picker-view first">
      <uni-data-picker v-model="fenlei" :map=maps class="data-pickers" placeholder="选择目标专业分类" popup-title="请选择目标专业分类"
        :localdata="grouList" @change="onchange">
      </uni-data-picker>
      <view class="icon-my">
        <uv-icon name="arrow-right" color="rgba(51, 51, 51, 1.00)" size="18"></uv-icon>
      </view>
    </view>
    <view class="picker-view" v-if="fenlei">
      <uni-data-picker v-model="zhuanye" :map=maps class="data-pickers" placeholder="选择目标专业" popup-title="请选择目标专业"
        :localdata="grouListZy" @change="onchangeZy">
      </uni-data-picker>
      <view class="icon-my">
        <uv-icon name="arrow-right" color="rgba(51, 51, 51, 1.00)" size="18"></uv-icon>
      </view>
    </view>
  </view>
</template>

<script>
import {
  groupTree,
  AISubjectGroup
} from "@/api/colleges/index"
import uniDataPicker from "../uni-data-picker/components/uni-data-picker/uni-data-picker.vue"
import uvIcon from '../uv-icon/components/uv-icon/uv-icon.vue'

export default {
  name: 'UniPickerS',
  components: { uniDataPicker, uvIcon },
  props: {
    obj: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      maps: {
        text: 'label',
        value: 'id'
      },
      fenlei: '',
      zhuanye: [],
      selectList: [], // 保存已经选择的选项轨迹
      grouList: [], // 目标分类
      grouListZy: [], // 目标专业
    }
  },
  onLoad() {

  },
  onShow() { },
  watch: {

  },
  mounted() {
    this.handgroupTree()
  },
  methods: {
    // 前三级学科
    handgroupTree() {
      groupTree().then(response => {
        this.grouList = response.data
        // this.setChildren(this.grouListBf)
        // console.log('setChildren后的数据', this.grouListBf)
        // this.grouList = JSON.parse(JSON.stringify(this.grouListBf))
      })
    },
    // 循环递归学科数组，添加children
    setChildren(arr) {
      console.log('setChildren')
      for (let i = 0; i < arr.length; i++) {
        if (!arr[i].children) {
          let obj = {
            id: '',
            label: '',
            temporary: true // 临时添加属性标识
          }
          arr[i].children = []
          arr[i].children.push(obj)
        } else {
          this.setChildren(arr[i].children)
        }
      }
    },
    // 点击每一项
    nodeclick(e) {
      console.log('nodeclick', e)
      // if (!e.parent_value) {
      //   // 当前点击的肯定是第一级
      //   this.selectList = []
      //   this.selectList.push({
      //     id: e.id,
      //     parentId: ''
      //   })
      // } else {
      //   // 此时点击的有可能是第二级也有可能是第三级
      //   let index = this.selectList.findIndex(item => item.parentId === e.parent_value)
      //   if (index !== -1) {
      //     this.selectList.splice(index, this.selectList.length - 1)
      //   } else {
      //     this.selectList.push({
      //       id: e.id,
      //       parentId: e.parent_value
      //     })
      //   }
      // }
      // console.log('选中的id集合：', this.selectList)
      // this.isReuqestHttp(e.id, JSON.parse(JSON.stringify(this.grouList)))
    },
    // 获取是否请求最后一级的数据
    isReuqestHttp(id, arr) {
      // let flag = false
      console.log('isReuqestHttp')
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id && arr[i].children && arr[i].children[0].temporary) {
          // 当前点击的id === 当前遍历的id && 
          // 当前遍历项 children[0].temporary 有值
          // 说明此时 应该请求接口了
          // flag = true
          let selectListId = this.selectList.map(item => item.id)
          // 获取最后一集的动态数据
          this.hadnAIssList(...selectListId)
          return
        } else if (arr[i].children && arr[i].children.length && !arr[i].children[0].temporary) {
          this.isReuqestHttp(id, arr[i].children)
          // console.log('智行2')
        }
      }
      // return flag
    },
    // 接口动态获取四级数据
    hadnAIssList(specialtyMasterType, specialtyAffiliatingCategoryId, specialtyAffiliatingSubjecttId) {
      console.log('hadnAIssList')
      let obj = {
        specialtyMasterType,
        specialtyAffiliatingCategoryId,
        specialtyAffiliatingSubjecttId
      }
      let that = this
      AISubjectGroup(obj).then(response => {
        let list = response.data
        if (list.length === 0) return
        for (let i = 0; i < list.length; i++) {
          list[i].label = list[i].specialtyName
          list[i].id = Number(list[i].specialtyCode)
        }
        let selectFinallyId =
          specialtyAffiliatingSubjecttId ?
            specialtyAffiliatingSubjecttId : specialtyAffiliatingCategoryId ?
              specialtyAffiliatingCategoryId :
              specialtyMasterType
        that.getAllArray(that.grouList, selectFinallyId, list)
        // that.grouList = JSON.parse(JSON.stringify(that.grouList))
        console.log('赋值最后一集完成的数据：', that.grouList)
      })
    },
    // 循环递归匹配id相等
    getAllArray(arr, id, moreList) {
      console.log('getAllArray')
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
          arr[i].children = []
          arr[i].children = moreList
        } else if (arr[i].children) {
          this.getAllArray(arr[i].children, id, moreList)
        }
      }
    },

    onchange(e) {
      console.log('目标分类：', e)
      let arr = []
      let zyName
      arr = e.detail.value.map(item => {
        return item.value
      })
      zyName = e.detail.value.map(item => {
        return item.text
      }).join('-')
      this.$emit('setZyName', zyName)
      console.log('目标分类数组：', arr)
      this.getAIssList(...arr)
    },
    // 获取具体的专业
    async getAIssList(specialtyMasterType, specialtyAffiliatingCategoryId, specialtyAffiliatingSubjecttId) {
      let obj = {
        specialtyMasterType,
        specialtyAffiliatingCategoryId,
        specialtyAffiliatingSubjecttId
      }
      this.$emit('setObj', obj)
      const { data } = await AISubjectGroup(obj)
      data.forEach(item => {
        item.id = item.specialtyCode
        item.label = item.specialtyName
      })
      console.log('获取专业：', data)
      this.grouListZy = data
    },
    onchangeZy(e) {
      console.log('目标专业：', e)
      let obj = this.grouListZy.filter(item => {
        return item.id == e.detail.value[0].value
      })[0]
      console.log('目标专业11：', obj)
      this.$emit('setObjSchool', {
        specialtyName: obj.label,
        specialtyCode: obj.id
      })
    }
  }
}
</script>

<style lang="scss">
.picker-view {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16rpx;
  height: 80rpx;
  border-radius: 16px;
  background: #f6f8fd;
  height: 80rpx;
  position: relative;
  border-radius: 16rpx;

  &.first {
    margin-bottom: 36rpx;
  }

  .iconfont {
    font-size: 44rpx;
  }


  .data-pickers {
    width: 100%;
    position: absolute;
  }

  .icon-my {
    position: absolute;
    right: 15rpx;
    z-index: 0;
    pointer-events: none;
  }
}
</style>