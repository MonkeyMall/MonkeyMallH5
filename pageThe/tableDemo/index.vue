<template>
  <view class="table">
    <view class="tableM">
      <uni-table-s
        :list="listData"
        :headerData="headerData"
        :headerAttr="headerAttr"
      >
      </uni-table-s>
    </view>
    <view class="tableM">
      <uni-table-s
        :list="listData1"
        :headerData="headerData"
        :headerAttr="headerAttr"
      >
      </uni-table-s>
    </view>
    <view class="tableM">
      <uni-table-s
        className="header-fixed-1"
        :list="listData2"
        :headerData="headerData1"
        :headerAttr="headerAttr1"
      >
      </uni-table-s>
    </view>
    <view class="tableM">
      <uni-table-s
        :headerData="headerData2"
        :headerAttr="headerAttr2"
        :list="listData2"
        :fixedAttrNum="fixedAttrNum"
      ></uni-table-s>
    </view>
  </view>
</template>

<script>
import uniTableS from '@/pageThe/components/uni-table-s/uni-table-s.vue'
export default {
  data() {
    return {
      headerData: ['研究方向', '初试科目', '备注'],
      headerAttr: ['name', 'list', 'remark'],
      headerData1: [
        {
          name: '年份'
        },
        {
          name: 'A类',
          childrens: [
            { name: '单科(满分=100)' },
            { name: '单科(满分>100)' }
          ]
        },
        {
          name: 'B类',
          childrens: [
            { name: '单科(满分=100)' },
            { name: '单科(满分>100)' }
          ]
        }
      ],
      headerAttr1: ['name', 'list', 'age', 'sex', 'remark'],
      listData: [{
        name: '张三封',
        list: ['计算机网络', '计算机组成原理', '操作系统'],
        remark: '备注1'
      },
      {
        name: '李四',
        list: ['计算机网络', '计算机组成原理', '操作系统'],
        remark: '备注2'
      }
      ],
      listData2: [{
        name: '张三封',
        list: 'bb',
        age: '2000000000000000000000',
        sex: '男',
        remark: '备注1'
      },
      {
        name: '李四',
        list: 'cc',
        age: '20',
        sex: '男',
        remark: '备注2'
      }
      ], listData1: [{
        name: '张三封',
        list: 'bb',
        age: '20',
        sex: '男',
        remark: '备注1'
      },
      {
        name: '李四',
        list: 'cc',
        age: '20',
        sex: '男',
        remark: '备注2'
      }
      ],
      fixedAttrNum: 1, // 固定列的个数
      headerData2: ['排名', '姓名', '性别', '城市', '职业'], // 表头
      headerAttr2: ['id', 'name', 'sex', 'city', 'job'], // 对应表头的字段
      fixedArr2: ['id'], // 固定列的字段
      listData2: [{ // 传参
        id: '网三',
        name: '张三张三张三张三张三张三',
        age: 12,
        sex: '男',
        job: '务农务农务农务农务农务农务农务农务农务农务农务农务农务农务农务农',
        city: '北京'
      },
      {
        id: '网四',
        name: '00000000000000000000',
        age: 12,
        sex: '男',
        job: '务农',
        city: '北京'
      }],
    }
  },
  components: { uniTableS },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.table {
  padding: 30rpx;
}
.tableM {
  margin-bottom: 20rpx;
}
</style>
