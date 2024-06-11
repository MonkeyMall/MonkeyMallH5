<!--
 * @Description: 
 * @Author: ymgu
 * @Date: 2023-11-20 09:33:07
 * @LastEditTime: 2024-01-24 14:42:27
 * @LastEditors: lili.liang oncwnuLfMdJTJ1uB8pjgINGPT0Rs@git.weixin.qq.com
-->
<template>
  <view class="bigBox">
    <view class="wrap">
      <view class="content">
        <view class="user-box">
          <my-tree v-if="tree && tree.length > 0" class="u-p-l-40" ref="mtree" :defaultProps="defaultProps" :data="tree"
            :divider="divider" :edit="edit" :unfold="true" :courseOutlineType="courseOutlineType" @node-click="nodeClick"
            @finger-action="fingerAction"></my-tree>
          <view v-else>
            <uni-default-page value="4" tic="暂无数据" mt="0" btntext="返回上一级"></uni-default-page>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import uniDefaultPage from '@/pageSec/components/uni-default-page/uni-default-page.vue';
import { selectFullList } from '@/api/work/math'
import myTree from '@/pageSec/components/m-tree/components/m-tree/m-tree.vue'
import parse from "@rojer/katex-mini";
export default {
  data() {
    return {
      defaultProps: {
        id: 'id',             // 此项为id项的key
        childList: 'childList', // 此项为修改子集数据的key
        label: 'label' // 此项为修改显示数据的key
      },
      divider: false,
      edit: false,
      del: false,
      tree: [],
      courseOutlineType: 0,
      type: 0 //0收藏 1错题
    }
  },
  components: {
    myTree,
    uniDefaultPage
  },
  mounted() {
    this.selectFullListFn()
  },
  onLoad(options) {
    this.courseOutlineType = options.courseOutlineType
    this.type = options.type
    if (options.type == '1') {
      uni.setNavigationBarTitle({ title: '错题库' })
    }
  },
  onShow() {
    this.selectFullListFn()
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.enablePullDownRefreshFn()
    uni.stopPullDownRefresh();//停止刷新
  },
  methods: {
    // 下拉刷新回调
    enablePullDownRefreshFn() {
      console.log('下拉刷新-----')
      this.selectFullListFn()
    },
    handEmit() {
      this.$tab.navigateBack(1)
    },
    selectFullListFn() {
      selectFullList({
        courseOutlineType: this.courseOutlineType,//0 政治 1 外语 2数学
        type: this.type  //0我的收藏  1我的错题库
      }).then(res => {
        if (res.code === 200) {
          res.data.forEach(item => {
            item.id = item.value
            item.course_level = 0
            item.checked = false
            item.label = item.name
            this.dataInit(item.childList)
          })
          this.tree = res.data
        }

      })
    },
    // 数学公式字符窜转义
    mathFormulaFn(parsedString) {
      let parsedArray = parsedString.split("$")
      parsedArray = parsedArray.filter(item => item != '')
      var reg = /[\u4e00-\u9fa5\uff01-\uffff]/; // 定义中文的Unicode范围
      let arr = []
      if (parsedArray.length > 0) {
        parsedArray.forEach(item => {
          let obj = {}
          if (!reg.test(item)) { // 公式
            obj.type = 'formula'
            obj.nodes = parse(item, {
              throwError: true,
              displayMode: true,
            })
          } else {
            obj.type = 'chinese'
            obj.nodes = item
          }
          arr.push(obj)
        })
      }
      return arr
    },
    // 格式化树数据
    dataInit(data) {
      data.forEach(item => {
        item.checked = false
        item.id = item.course_id || item.id
        item.name = item.course_outline_name || item.name || item.questionBankContent
        item.label = item.course_outline_name || item.name || item.questionBankContent
        item.courseOutlineType = item.courseOutlineType || 0
        if (item.questionList) {
          item.questionList.forEach(i => {
            i.course_level = 3
          })
          item.childList = item.questionList
        } else if (!item.questionList && !item.childList && this.courseOutlineType == 2) {
          // 最内层&&是数学的时候
          item.label = this.mathFormulaFn(item.label)
          // const nodes = parse(item.label.replace(/\\\\/g, "\\").replace(/\$/g, ""), {
          //   throwError: true,
          //   displayMode: true,
          // })
          // item.label = nodes
        }
        if (item.childList) {
          this.dataInit(item.childList)
        }
      })
    },
    //节点点击事件
    nodeClick(e) {
      this.getNewTree(this.tree, e)
      if (!e.childList && !e.questionList) {
        //0收藏 1错题
        if (this.type === '1') {
          this.$tab.navigateTo(`/pageSec/work/exercise/section/doing?isShowDtk=false&isError=true&isCheckResult=true&affiliationModule=${e.affiliationModule}&isReviewTask=1&type=${this.courseOutlineType}&id=${e.courseOutlineId}&courseOutlineType=${this.courseOutlineType}&questionId=${e.id}&pageType=0`)
        } else {
          this.$tab.navigateTo(`/pageSec/work/exercise/section/questionInfo?questionId=${e.id}&courseOutlineType=${this.courseOutlineType}&isScType=${this.type}`)
          // this.$tab.navigateTo(`/pageSec/work/exercise/section/questionBank?questionId=${e.id}`)
        }
      }
    },
    getNewTree(obj, e) {
      obj.forEach(item => {
        if (!e.childList && !e.questionList) {
          item.checked = false
          if (+item.id === +e.id) {
            item.checked = true
          }
        }
        if (item.childList && item.childList.length > 0) {
          this.getNewTree(item.childList, e)
        }
      })
      return obj
    },

    //节点滑动
    fingerAction(e) {
      console.log('节点滑动fingerAction', JSON.stringify(e));
    },
  }
}
</script>
<style scoped lang="scss">
.bigBox {
  padding: 0 0 20rpx 0;

  .wrap {
    margin: 24rpx 30rpx;
    min-height: 100vh;
    background: $uni-bg-color;
    border-radius: 16rpx;

  }
}
</style>