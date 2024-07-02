const overTimeOptions = [
  {
    label: '暂无',
    value: '0'
  },
  {
    label: '双休',
    value: '1'
  },
  {
    label: '弹性工作',
    value: '2'
  },
  {
    label: '偶尔加班',
    value: '3'
  },
  {
    label: '不加班',
    value: '4'
  }
]
const scaleList = [{
  label: '0-20人',
  value: '0-20人'
}, {
  label: '20-99人',
  value: '20-99人'
}, {
  label: '100-499人',
  value: '100-499人'
}]
const isOrYes = [{
  label: '是',
  value: '1'
}, {
  label: '否',
  value: '0'
}]
const financingOptions = [{
  label: '未融资',
  value: '1'
}, {
  label: '不需要融资',
  value: '8'
},
{
  label: '天使轮',
  value: '1'
}, {
  label: 'A轮',
  value: '2'
}, {
  label: 'B轮',
  value: '3'
}, {
  label: 'C轮',
  value: '4'
}, {
  label: 'D轮',
  value: '5'
}, {
  label: 'E轮',
  value: '6'
}, {
  label: 'IPO',
  value: '7'
}]
// 
const welfareOptions = [{
  label: '交通补助',
  value: '1'
}, {
  label: '生日福利',
  value: '2'
}, {
  label: '节日福利',
  value: '3'
}, {
  label: '生日福利',
  value: '4'
}, {
  label: '团建聚餐',
  value: '5'
}, {
  label: '零食下午茶',
  value: '6'
}, {
  label: '餐补',
  value: '7'
}, {
  label: '员工旅游',
  value: '8'
}, {
  label: '带薪年假',
  value: '9'
}, {
  label: '加班补助',
  value: '10'
}, {
  label: '企业年金',
  value: '11'
}, {
  label: '年终奖',
  value: '12'
}, {
  label: '定期体检',
  value: '13'
}, {
  label: '全勤奖',
  value: '14'
},{
  label: '学历津贴',
  value: '15'
}]
const industryOptions = [{
  label: '暂无',
  value: '0'
}, {
  label: '互联网',
  value: '1'
}, {
  label: '企业服务',
  value: '2'
}, {
  label: '通信/网络设备',
  value: '3'
}, {
  label: '计算机软件',
  value: '4'
}, {
  label: '电子商务',
  value: '5'
}, {
  label: '环保',
  value: '6'
}]
export default {
  overTimeOptions,
  scaleList,
  financingOptions,
  welfareOptions,
  industryOptions,
  isOrYes
}