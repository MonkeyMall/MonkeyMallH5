/*
 * @Description: 
 * @Author: ymgu
 * @Date: 2023-12-01 10:26:35
 * @LastEditTime: 2023-12-29 13:20:46
 * @LastEditors: lili.liang oncwnuLfMdJTJ1uB8pjgINGPT0Rs@git.weixin.qq.com
 */
import {request} from 'utils/request'

// 计划信息查询
export function getSelectPlanInfo() {
    return request({
      'url': '/business/studentEnglishManage/selectPlanInfo',
      'method': 'get'
    })
}
// 单词测试页面信息查询
export function selectWordTestInfo() {
    return request({
      'url': '/business/studentEnglishManage/selectWordTestInfo',
      'method': 'get'
    })
}
//下一个单词查询
export function getNextWord(data) {
    return request({
      'url': '/business/studentEnglishManage/getNextWord',
      'method': 'get',
      params:data
    })
}
//加到复习本
export function addTask(data) {
	return request({
		url: '/business/task',
		method: 'post',
		data: data
	})
}
// 修改学习时长
export function updateDuration(data) {
    return request({
        'url': '/business/studentEnglishManage/updateDuration',
        'method': 'put',
        params:data
    })
}
//单词本列表信息查询
export function selectWordListInfo(data) {
    return request({
      'url': '/business/studentEnglishManage/selectWordListInfo',
      'method': 'get',
      params:data
    })
}
// 大纲列表查询
export function selectLevelOneList(data) {
  return request({
    'url': '/business/politics/selectLevelOneAndTwoList',
    'method': 'get',
    params: data
  })
}
// 章节目录信息查询
export function selectChapterInfo(data) {
  return request({
    'url': '/business/politics/selectChapterInfo',
    'method': 'get',
    params: data
  })
}
// 子级大纲列表查询
export function selectLevelMoreList(data) {
  return request({
    'url': '/business/politics/selectLevelMoreList',
    'method': 'get',
    params: data
  })
}
// 查询下一题 名试题库
export function politicsselectNextWord(data) {
  return request({
    'url': '/business/politics/selectNextWord',
    'method': 'get',
    params: data
  })
}
// 学习报告信息查询
export function selectReportInfo() {
  return request({
      'url': '/business/studentEnglishManage/selectReportInfo',
      'method': 'get',
  })
}
// 计划详情查询
export function selectPlanByUserId() {
  return request({
      'url': '/business/planset/selectPlanByUserId',
      'method': 'get',
  })
}
// 新增计划
export function planset(data) {
	return request({
		url: '/business/planset',
		method: 'post',
		data: data
	})
}
// 修改计划
export function planEdit(data) {
  return request({
      'url': '/business/planset',
      'method': 'put',
      data:data
  })
}
// 新增回答详情(英语)
export function englishdetail(data) {
  return request({
      'url': '/business/englishdetail',
      'method': 'post',
      data
  })
}

// 新增回答详情(点对答案-政治)
export function politicsdetail(data) {
  return request({
      'url': '/business/politicsdetail',
      'method': 'post',
      data
  })
}

// 查询章节目录页题数和序号信息
export function selectOrderAndCountInfo(params) {
  return request({
      'url': '/business/politics/selectOrderAndCountInfo',
      'method': 'get',
      params
  })
}

// 新增笔记
export function addNotes(data) {
  return request({
      'url': '/business/notes',
      'method': 'post',
      data
  })
}

// 删除笔记
export function deleteNotes(id) {
  return request({
      'url': '/business/notes/' + id,
      'method': 'DELETE',
  })
}

// 我的笔记列表
export function selectMyNotesList(id) {
  return request({
      'url': '/business/notes/selectMyNotesList/' + id,
      'method': 'get'
  })
}

// 点击收藏
export function collect(data) {
  return request({
      'url': '/business/collect',
      'method': 'post',
      data
  })
}

// 全部评论
export function selectNotesListByOrder(params) {
  return request({
      'url': '/business/notes/selectNotesListByOrder',
      'method': 'get',
      params
  })
}

// 笔记点赞 Id=1&likesnum=-1笔记点赞与取消点赞 1点赞  -1取消
export function updateLikesNum(params) {
  return request({
      'url': '/business/notes/updateLikesNum',
      'method': 'get',
      params
  })
}
// 题目纠错新增
export function ideaFn(data) {
  return request({
      'url': '/business/idea',
      'method': 'post',
       data:data
  })
}

// 刷题正确率查询（政治）
export function selectRankInfoPolitics() {
  return request({
      'url': '/business/politics/selectRankInfo',
      'method': 'get'
  })
}
// 查询答题卡详情列表查询
export function selectAnswerDetailList(data) {
  return request({
      'url': '/business/politicsdetail/selectAnswerDetailList',
      'method': 'get',
      data
  })
}

// 查询真题考点科目内容
export function selectSubjectMath(id) {
  return request({
      'url': '/business/maths/selectSubjectMap/' + id,
      'method': 'get'
  })
}


// 新增回答详情（点对答案-数学）
export function mathsdetail(data) {
  return request({
      'url': '/business/mathsdetail',
      'method': 'post',
      data
  })
}
// 获取激励话语接口
export function randomAcquisition() {
  return request({
      'url': '/system/motivationalDiscourse/randomAcquisition',
      'method': 'get'
  })
}
// 获取小程序二维码
export function qRCodeForLearningReport() {
  return request({
      'url': '/system/appletA/qRCodeForLearningReport',
      'method': 'get'
  })
}

// 收藏试题详情查询
export function getQuestionDetailId(questionId) {
  return request({
      'url': `/business/collect/getQuestionDetail/${questionId}`,
      'method': 'get'
  })
}
// 单词总数查询
export function selectAllWordCount() {
  return request({
      'url': `/business/studentEnglishManage/selectAllWordCount`,
      'method': 'get'
  })
}
// 获取单词进度
export function selectOverWordCount() {
  return request({
      'url': `/business/studentEnglishManage/selectOverWordCount`,
      'method': 'get'
  })
}
// 已学习 和 高频词 的下一题查询
export function getNextWordForNote(params) {
  return request({
      'url': `/business/studentEnglishManage/getNextWordForNote`,
      'method': 'get',
      params
  })
}