<template>
  <view class="resultActivity">
    <!-- 常规表格 -->
    <uni-table-s
      :list="listData"
      :fixedArr = "fixedArr"
      :headerData="headerData"
      :headerAttr="headerAttr"
    ></uni-table-s>
    <!-- 带定位表格 -->
    <uni-table-s
      :headerData="headerData"
      :headerAttr="headerAttr"
      :list="listData"
      :fixedAttrNum="fixedAttrNum"
    ></uni-table-s>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      headerData: ['排名', '姓名', '性别', '城市', '职业'], // 表头
      headerAttr: ['id', 'name', 'sex', 'city', 'job'], // 对应表头的字段
      fixedArr: ['id'], // 固定列的字段
      listData: [{ // 传参
        id: '网三',
        name: '张三张三张三张三张三张三',
        age: 12,
        sex: '男',
        job: '务农务农务农务农务农务农务农务农务农务农务农务农务农务农务农务农',
        city: '北京'
      },
      {
        id: '网四',
        name: '李四',
        age: 12,
        sex: '男',
        job: '务农',
        city: '北京'
      }],
      fixedAttrNum: 1 // 固定列的个数
    }
  }
}
</script>
