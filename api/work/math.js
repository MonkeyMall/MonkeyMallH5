import {request} from 'utils/request'

// 排名信息查询（数学）
export function selectRankInfo() {
  return request({
    'url': '/business/maths/selectRankInfo',
    'method': 'get'
  })
}
// 查询真题考点科目内容
export function selectSubjectMap(data) {
  return request({
    'url': '/business/maths/selectSubjectMap/'+data.courseId,
    'method': 'get'
  })
}
// 坚持天数排行列表查询
export function selectSignCountRankList(data) {
  return request({
    'url': '/business/politics/selectSignCountRankList',
    'method': 'get',
    data
  })
}
// 正确率排行列表查询
export function selectRightRateRankList(data) {
  return request({
    'url': '/business/politics/selectRightRateRankList',
    'method': 'get',
    data
  })
}
// 我的签到或正确率信息查询
export function getSignOrRightRateInfo(data) {
  return request({
    'url': '/business/maths/getSignOrRightRateInfo',
    'method': 'get',
    data
  })
}
// 知识点雷达图信息查询(数学)
export function selectKnowledge(data) {
  return request({
    'url': '/business/maths/selectKnowledge/'+data.courseid,
    'method': 'get',
  })
}
// 查询学习报告页面信息(数学)
export function selectReportInfoMath() {
  return request({
    'url': '/business/maths/selectReportInfo',
    'method': 'get',
  })
}
// 折线图信息查询
export function selectLineChartList() {
  return request({
    'url': '/business/maths/selectLineChartList',
    'method': 'get',
  })
}
// 学习报告雷达图集合(政治)
export function selectMaxKnowledge() {
  return request({
    'url': '/business/politics/selectMaxKnowledge',
    'method': 'get',
  })
}
// 查询学习报告页面信息(政治)
export function selectReportInfoPolitics() {
  return request({
    'url': '/business/politics/selectReportInfo',
    'method': 'get',
  })
}
// 查询我的收藏和错题库
export function selectFullList(data) {
  return request({
    'url': '/business/collect/selectFullList',
    'method': 'get',
    data
  })
}
// 真题考点章节目录下4级5级大纲列表查询
export function selectListByCourseId(data) {
  return request({
    'url': '/business/maths/selectListByCourseId',
    'method': 'get',
    data
  })
}
