<template>
  <view>
    <view class="tabpage">
      <view class="tabs">
        <view
          :class="item.isCheck ? 'tab tabActive': 'tab'"
          v-for="(item,index) in arrList"
          :key="index"
          @click="tabBtn(item.value)"
        > {{item.label}} </view>
      </view>
    </view>
    <view
      v-if="showSearch"
      class="search"
    >
      <uni-easyinput
        prefixIcon="search"
        :suffixIcon="closeIcon"
        v-model="searchText"
        placeholder="请输入试卷名称"
        :clearable="true"
        @confirm="search"
        @iconClick="clear"
      />
    </view>
  </view>
</template>

<script>
import uniEasyinput from "@/pageFive/components/uni-easyinput/components/uni-easyinput/uni-easyinput.vue"
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    tabList: {
      type: Array,
      default: [
        {
          label: '数学一',
          value: '1',
          isCheck: true
        },
        {
          label: '数学二',
          value: '2',
          isCheck: false
        },
        {
          label: '数学三',
          value: '3',
          isCheck: false
        },
      ]
    },
    showSearch: {
      type: Boolean,
      default: false
    }
  },
  components: {
    uniEasyinput
  },
  data() {
    return {
      arrList: this.tabList,
      searchText: this.value,
      closeIcon: ''
    }
  },
  watch: {
    searchText(n, o) {
      if (!n) {
        this.closeIcon = ''
      } else {
        this.closeIcon = 'close'
      }
    }
  },
  methods: {
    //	tab 切换
    tabBtn(row) {
      this.arrList.forEach(item => {
        item.isCheck = false
        if (+row === +item.value) {
          item.isCheck = true
        }
      })
      this.$emit('getData', row)
    },
    clear(e) {
      console.log('zx', e)
      if (e === 'suffix') {
        this.searchText = ''
        this.search()
      } else {
        this.search()
      }
    },
    search() {
      this.$emit('input', this.searchText)
      this.$emit('change', this.searchText)
    }
  }
}
</script>

<style lang="scss" scoped>
.tabpage {
  margin: 15px;
  // width: calc(100% -50px);
  box-sizing: border-box;
  border-radius: 10px;
}

.tabs {
  width: calc(100% - 120px);
  margin: 0 60px;
  height: 28px;
  display: flex;
  background-color: #fff;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid rgba(252, 81, 95, 1);
  box-sizing: content-box;
  overflow: hidden;

  > .tab {
    flex: 1;
    height: 28px;
    line-height: 28px;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0px;
    text-align: center;
    color: rgba(252, 81, 95, 1);
    text-align: center;
  }

  > .tabActive {
    width: 85px;
    height: 28px;
    line-height: 28px;
    font-size: 14px;
    color: #fff;
    font-weight: 600;
    letter-spacing: 0px;
    text-align: center;
    background: rgba(252, 81, 95, 1);
  }
}

.search {
  margin-top: 32rpx;
}
</style>