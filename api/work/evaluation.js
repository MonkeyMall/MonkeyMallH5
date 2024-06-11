import {request} from 'utils/request'

// 查询测评管理列表
export function selectExamPaperManageListForApp(params) {
    return request({
      'url': '/business/evaluation/selectExamPaperManageListForAppl',
      'method': 'get',
      params
    })
}
// 查询试卷详情页题数和序号信息
export function selectOrderAndCountInfo(params) {
  return request({
    'url': '/business/evaluation/selectOrderAndCountInfo',
    'method': 'get',
    params
  })
}
// 试卷下一题查询
export function selectNextQuestion(params) {
  return request({
    'url': '/business/evaluation/selectNextQuestion',
    'method': 'get',
    params
  })
}

// 查询答题卡列表
export function selectAnwserCardList(id) {
  return request({
    'url': '/business/evaluation/selectAnwserCardList/' + id,
    'method': 'get'
  })
}

// 修改用户回答的提交状态(提交答题卡)
export function updateType(params) {
  return request({
    'url': '/business/evaluation/updateType',
    'method': 'put',
    params
  })
}

// 查询答题结果信息
export function selectAnswerInfoUpdateType(id) {
  return request({
    'url': '/business/evaluation/selectAnswerInfo/' + id,
    'method': 'get'
  })
}

// 查询全部解析列表
export function selectAllAnalysisList(id) {
  return request({
    'url': '/business/evaluation/selectAllAnalysisList/' + id,
    'method': 'get'
  })
}

// 查询错题解析列表
export function selectWrongAnalysisList(id) {
  return request({
    'url': '/business/evaluation/selectWrongAnalysisList/' + id,
    'method': 'get'
  })
}
