<!--
 * @Description: 
 * @Author: ymgu
 * @Date: 2023-11-20 09:33:07
 * @LastEditTime: 2023-12-13 20:00:42
 * @LastEditors: lili.liang oncwnuLfMdJTJ1uB8pjgINGPT0Rs@git.weixin.qq.com
-->
<template>
  <view class="wrap">
    <view class="content">
      <view class="user-box">
        <my-tree
          v-if="tree && tree.length > 0"
          class="u-p-l-40"
          ref="mtree"
          :defaultProps="defaultProps"
          :data="tree"
          :divider="divider"
          :edit="edit"
          :unfold="true"
          @node-click="nodeClick"
          @finger-action="fingerAction"
        ></my-tree>
        <view v-else>
          <uni-default-page
            value="4"
            tic="暂无数据"
            btntext="返回上一级"
          ></uni-default-page>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import {
  selectFullList,
  selectListByCourseId
} from '@/api/work/math'
import uniDefaultPage from '@/pageSec/components/uni-default-page/uni-default-page.vue';
import myTree from '@/pageSec/components/m-tree/components/m-tree/m-tree.vue'
export default {
  data() {
    return {
      defaultProps: {
        id: 'id',             // 此项为id项的key
        childList: 'childList', // 此项为修改子集数据的key
        label: 'label' // 此项为修改显示数据的key
      },
      isReviewTask: 0,
      courseId: '',
      divider: false,
      edit: false,
      del: false,
      tree: [],
      courseOutlineType: 2,
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
    this.courseId = options.courseId
    this.isReviewTask = options.isReviewTask
  },
  methods: {
    handEmit() {
      this.$tab.navigateBack(1)
    },
    selectFullListFn() {
      selectListByCourseId({
        courseId: this.courseId
      }).then(res => {
        if (res.code === 200) {
          res.rows.forEach(item => {
            item.id = item.course_id
            item.course_level = 0
            item.checked = false
            item.label = item.course_outline_name
            this.dataInit(item.childList)
          })
          this.tree = res.rows
        }

      })
    },
    // 格式化树数据
    dataInit(data) {
      data.forEach(item => {
        item.checked = false
        item.id = item.course_id
        item.name = item.course_outline_name
        item.label = item.course_outline_name
        if (!item.childList) {
          // item.childList.forEach(i => {
          item.course_level = 3
          // })
          // item.childList = item.questionList
        }
        if (item.childList) {
          this.dataInit(item.childList)
        }
      })
    },
    //节点点击事件
    nodeClick(e) {
      this.getNewTree(this.tree, e)
      if (e.course_level === 3) {
        // if()
        this.$tab.navigateTo(`/pageSec/work/exercise/section/doing?isShowDtk=false&affiliationModule=5&isReviewTask=${this.isReviewTask}&type=2&courseOutlineType=${this.courseOutlineType}&id=${e.id}`)
      }
    },
    getNewTree(obj, e) {
      obj.forEach(item => {
        if (+item.course_level === 3) {
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
.wrap {
  padding: 24rpx 30rpx;
  min-height: 100vh;
  background: $uni-bg-color;
  border-radius: 16rpx;
}
</style>