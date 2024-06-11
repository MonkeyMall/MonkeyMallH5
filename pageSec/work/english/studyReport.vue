<!--
 * @Description: 
 * @Author: ymgu
 * @Date: 2023-11-20 09:33:07
 * @LastEditTime: 2024-02-18 15:15:07
 * @LastEditors: lili.liang oncwnuLfMdJTJ1uB8pjgINGPT0Rs@git.weixin.qq.com
-->
<template>
  <!-- <page-meta :page-style="`overflow:${isShowDialog?'hidden':'visible'}}`"></page-meta> -->
  <!-- <page-meta :page-style="'overflow:hidden'"></page-meta> -->
  <view :class="isShowDialog ? 'bigbox control-scroll' : 'bigbox'">
    <!-- <uni-popup  ref="popup2"
      type="center"
      :is-mask-click='false'> -->
    <view class="dialogBox" v-if="isShowDialog">
      <view class="dialogBox-cons">
        <i style="color: white;" class="iconfont" @click="closeModal">&#xe634;</i>
        <image src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/report-bg.png"> </image>
        <view class="dialogBox-peo">
          <image :src="cdn + formObj.avatar" />
        </view>
        <view class="dialogBox-name">{{ formObj.userName || '默认用户' }}</view>
        <view class="dialogBox-qr">
          <image :src="cdn + qrUrl"></image>
        </view>
        <view class="dialog-dayBox">
          <view class="dialog-dayBox-first">
            <view class="dialog-day-title">签到天数排名</view>
            <view class="dialog-day-num">{{ formObj.signRank || 0 }}</view>
          </view>

        </view>
        <view :class="twoLine ? 'dialog-tips twoLineBox' : 'dialog-tips'">
          <view class="dialog-tips-center">{{ discourseStr }}</view>
        </view>
        <view class="dialog-bottom">
          <view>
            <view class="bottom-title">本周练习次数</view>
            <view class="bottom-num">{{ formObj.weekStudyNum || 0 }}
              <!-- <text>次</text> -->
            </view>
          </view>
          <view>
            <view class="bottom-title">本周练习时长</view>
            <view class="bottom-num">{{ formObj.weekStudyTime || 0 }}
              <!-- <text>小时</text> -->
            </view>
          </view>
          <view>
            <view class="bottom-title">本周正确率</view>
            <view class="bottom-num">{{ formObj.rightrate || 0 }}</view>
          </view>
        </view>
        <view class="modal-btn">
          <view>
            <!-- <btnPage></btnPage> -->
            <Button class="btnBox w204" open-type="share">分享小程序</Button>
          </view>
          <!-- <Button class="btnBox w260" open-type="share" @click="saveFn">保存图片并分享</Button> -->
          <!-- <view class="btnBox w204"  >
           
          </view> -->

          <view class="btnBox w260" @click="saveFn">保存图片并分享</view>
        </view>
      </view>
    </view>
    <!-- </uni-popup> -->
    <canvas :style="style" canvas-id="shareFrends"></canvas>
    <view class="wrap">
      <view class="flexBox">
        <view class="doIndex-header">

          <image src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/work/english/english-xxbg.png"
            mode="scaleToFill" />
          <view class="doIndex-header-left">
            <view class="days">签到天数排名<text>{{ formObj.signRank || 0 }}</text></view>
            <view class="fSize22">坚持练习，谁都是黑马</view>
          </view>

        </view>

      </view>
      <view class="doIndex-tab flexBox">
        <view class="doIndex-tab-item">
          <view class="doIndex-tab-item-text">本周练习次数</view>
          <view class="doIndex-tab-item-num">{{ formObj.weekStudyNum || 0 }}
            <view class="doIndex-tab-item-dw">次</view>
          </view>
          <image
            src="https://yhpn-project-1320305021.cos.ap-beijing.myqcloud.com/mini/static/work/english/english-lxcs.png"
            mode="scaleToFill" class="imagTag" />
        </view>
        <view class="doIndex-tab-item">
          <view class="doIndex-tab-item-text">本周学习时长</view>
          <view class="doIndex-tab-item-num">{{ formObj.weekStudyTime || 0 }}
            <view class="doIndex-tab-item-dw">{{ isMin }}</view>
          </view>
          <image src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/work/english/english-xxcs.png"
            mode="scaleToFill" class="imagTag" />
        </view>
      </view>
      <view class="doIndex-zql">
        <view class="doIndex-zql">
          <view class="doIndex-zql-text">本周正确率</view>
          <view class="doIndex-zql-num">{{ formObj.rightrate || 0 }}</view>
          <image src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/work/english/english-zqlBg.png"
            class="doIndex-zql-bgPng" />
          <view class="doIndex-zql-imgText">共学习{{ formObj.studydays || 0 }}天</view>
          <image src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/work/english/english-zql.png"
            mode="scaleToFill" class="imagTag" />
        </view>
      </view>
      <view class="doIndex-xxgk" v-if="type === 'english' || type === 'politics'">
        <view class="doIndex-xxgk-text">
          学习概括
        </view>
        <view class="charts-box">
          <qiun-data-charts :canvas2d="true" v-show="isShow" type="ring" :opts="opts" :chartData="chartData"
            reshow="true" />
        </view>

      </view>
      <view class="doIndex-xxTime" v-if="type === 'english' || type === 'math'">
        <view class="doIndex-xxTime-text">
          学习时长(h)
        </view>
        <view class="charts-box h400">
          <qiun-data-charts :canvas2d="true" v-show="isShow" type="line" :opts="opts2" :chartData="chartData2"
            reshow="true" />
        </view>
      </view>
      <view class="doIndex-xxTime" v-if="type === 'math' || type === 'politics'">
        <view class="doIndex-xxTime-text">
          知识点掌握
        </view>
        <view style="position: relative;z-index: 999999999;margin-top: 10rpx;width: 80%;">
          <view v-if="type === 'math'">
            <view>
              <uni-section>
                <uni-data-select v-model="formSelect.math1" :localdata="columns" :clear="false"
                  @change="changeMath1"></uni-data-select>
                <uni-data-select v-model="formSelect.math2" :localdata="columns2" :clear="false"
                  @change="changeMath2"></uni-data-select>
              </uni-section>
            </view>
          </view>
        </view>
        <view class="charts-box h400">
          <qiun-data-charts :canvas2d="true" type="radar" :opts="opts3" :chartData="chartData3" reshow="true" />
        </view>
      </view>
      <view class="nullBox"></view>

    </view>
    <view class="fabBox" @click="showDialog">
      <image class="iconfontFabBox"
        src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/fx.png"></image>
      <!-- <i class="iconfont iconfontFabBox">&#xe63e;</i> -->
    </view>
  </view>
</template>
<script>
let that = this
// import qiunDataCharts from '@/pageSec/components/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue'
import uniDataSelect from '@/pageSec/components/uni-data-select/components/uni-data-select/uni-data-select.vue'
import { selectReportInfo, selectLevelOneList, randomAcquisition, qRCodeForLearningReport } from '@/api/work/english'
import { selectKnowledge, selectReportInfoMath, selectLineChartList, selectMaxKnowledge, selectReportInfoPolitics } from '@/api/work/math'
// import btnPage from 'pageSec/work/english/btnPage'
import config from '@/config/index.js'
export default {
  components: { uniDataSelect },
  data() {
    return {
      isMin: '分钟', //本周学习时长单位
      discourseStr: '', //激励语
      twoLine: false,//激励语是否显示两行
      oneText: '', //第一行数据
      twoText: '', //第一行数据
      src: 'https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/report-bg.png', //背景图
      peoSrc: 'https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/common/common-peoole.png', //头像
      qrUrl: '', //小程序二维码
      cdn: config.COS_CDN_PREFIX_http,
      formSelect: {
        math1: 0
      },
      isShowDialog: false,
      style: '',
      windowWidth: '',
      windowHeight: '',
      name: '张三丰',
      shareImg: '',
      formObj: {},
      isShow: false,
      chooseVal: '高数',
      columns: [], //大纲
      columns2: [], //科目
      politicsColums: [
        ['高政', '线性代政']
      ],
      type: 'english',
      opts: {
        rotate: false,
        rotateLock: false,
        color: ["#2D99FF", "#FF8D1A", "#FFE700", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
        padding: [5, 5, 5, 5],
        dataLabel: false,
        enableScroll: false,
        legend: {
          show: true,
          position: "right",
          lineHeight: 25,
          fontSize: 12,
        },
        title: {
          name: "1500",
          fontSize: 16,
          color: "#333333",
        },
        subtitle: {
          name: "总词汇",
          fontSize: 12,
          color: "#333333"
        },
        extra: {
          ring: {
            ringWidth: 16,
            activeOpacity: 0.5,
            activeRadius: 10,
            offsetAngle: 0,
            labelWidth: 12,
            borderWidth: 3,
            borderColor: '#fff'
          }
        }
      },
      chartData: {
        categories: [],
        series: [{
          data: []
        }],
      },
      opts2: {
        color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
        padding: [15, 10, 0, 15],
        enableScroll: false,
        legend: {
          show: false,
        },
        xAxis: {
          disableGrid: true
        },
        yAxis: {
          gridType: "dash",
          dashLength: 2
        },
        extra: {
          line: {
            type: "straight",
            activeType: "hollow"
          }
        }
      },
      chartData2: {},
      opts3: {
        color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
        padding: [5, 5, 5, 5],
        dataLabel: false,
        enableScroll: true,
        enableScrollBounce: true,
        legend: {
          show: false,
        },
        extra: {
          radar: {
            gridType: "circle",
            gridColor: "#CCCCCC",
            gridCount: 3,
            opacity: 0.2,
            max: 200,
            labelShow: true,
            border: true
          }
        }
      },
      chartData3: {

      }
    }
  },
  mounted() {
    this.getRandomAcquisition()
    this.getqRCodeForLearningReport()
  },
  onReady() {
    console.log(this.type, 'this.type--------')
    if (this.type === 'english') {
      this.selectReportInfoFn();
    } else if (this.type === 'math') {
      this.getMathData()

    } else if (this.type === 'politics') {
      this.getPoliticsData()
    }

  },
  onShow() {
    // this.$refs.popup2.open('center')
  },
  onLoad(options) {
    if (options) {
      this.type = options.typeVal
    }

    that = this
    uni.getSystemInfo({
      success(res) {
        console.log('res: ', res);
        that.windowWidth = res.windowWidth
        that.windowHeight = Math.floor(299 * 943 / 598)
        that.style = `width:299px;height: ${that.windowHeight}px;position: fixed;top:1999px;left:0;background:#EFEFEF;`
      }
    })
  },
  //发送给微信好友
  onShareAppMessage(res) {
    console.log('res: ', res);
    if (res.from === 'button') {// 来自页面内分享按钮
      this.isShowDialog = false
      // console.log(res.target, 'res.dataset.eventOpts[1][0] ',)
      // console.log(res.target.dataset.eventOpts[1], '000')
      // if(res.target.dataset.eventOpts[1] === 'toShare'){
      //   return {
      //       title: '考研一起卷', //分享的名称
      //       path: '/pages/index',   //页面的路径
      //     }
      // }else{
      //   this.saveFn()
      // }
      return {
        title: this.discourseStr, //分享的名称
        path: '/pages/index',   //页面的路径
      }
    }

  },
  //分享到朋友圈
  onShareTimeline(res) {
    console.log('res: ', res);
    return {
      title: this.discourseStr,
      type: 0,
      path: '/pages/index',
    }
  },
  methods: {
    // 获取激励语
    getRandomAcquisition() {
      randomAcquisition().then(res => {
        if (res.code === 200) {
          let discourseStrSplit = res.data.discourseStr.split('')
          console.log('discourseStrSplit: ', discourseStrSplit, discourseStrSplit.length);
          if (discourseStrSplit.length > 20) {
            this.twoLine = true
            this.oneText = discourseStrSplit.slice(0, 21).join('')
            console.log('this.oneText: ', this.oneText);
            this.twoText = discourseStrSplit.slice(21, discourseStrSplit.length).join('')
          }

          this.discourseStr = res.data.discourseStr
        }
      })
    },
    // 获取二维码
    getqRCodeForLearningReport() {
      qRCodeForLearningReport().then(res => {
        if (res.code === 200) {
          this.qrUrl = res.msg
          console.log(res, '3333332----33')
        }
      })
    },
    // 线上图片转化为本地路径
    toPath(avatar) {
      return new Promise(function (resolve, reject) {
        uni.getImageInfo({
          src: avatar,
          success: res => {
            console.log('图片信息', res)
            let obj = {
              width: res.width,
              height: res.height,
              path: res.path
            }
            resolve(obj)

          }
        })
      }).then(function (res) {
        return res
      })
    },
    //打开设置授权
    e() {
      uni.openSetting({
        success(res) {
          console.log(res.authSetting)
          if (res.authSetting['scope.writePhotosAlbum']) {
            uni.showToast({
              icon: 'success',
              title: '授权成功'
            })
          } else {
            uni.showToast({
              icon: 'none',
              title: '授权失败'
            })
          }

        }
      });
    },
    // 保存长图
    saveFn() {
      console.log('保存长图走了吗')
      const _this = this
      uni.getSetting({
        success(res) {
          console.log(res.authSetting['scope.writePhotosAlbum'], '222')

          if (!res.authSetting['scope.writePhotosAlbum']) {
            uni.authorize({
              scope: 'scope.writePhotosAlbum',
              success(res) {
                console.log(res, '同意授权');
                _this.creatCode()
              },
              fail(err) {
                console.log(err, '拒绝授权');
                uni.showModal({
                  title: '提示',
                  content: '检测到您没有授权保存图片到相册，为了更好的体验，请前往设置授权',
                  success: function (res) {
                    if (res.confirm) {
                      _this.e()
                    } else if (res.cancel) {
                      console.log('用户点击取消');

                    }
                  }
                });
              }
            })
          } else {
            console.log('已经授权');
            _this.creatCode()
          }
        }
      });
      // this.creatCode()
    },
    // 分享小程序
    // toShare(){
    //   console.log('333')
    //   uni.share({
    //       provider: 'weixin',
    //       scene: "WXSceneSession",
    //       type: 5,
    //       imageUrl: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/share-logo@3.png',
    //       title: '欢迎体验uniapp',
    //       miniProgram: {
    //           id: 'gh_abcdefg',
    //           path: 'pages/index/index',
    //           type: 0,
    //           webUrl: 'http://uniapp.dcloud.io'
    //       },
    //       success: ret => {
    //           console.log(JSON.stringify(ret));
    //       }
    //   });
    //   // wx.showShareMenu({
    //   //   withShareTicket: true,
    //   //   menus: ['shareAppMessage', 'shareTimeline']
    //   // });

    // },
    // canvas绘制过程
    async creatCode() {
      uni.showToast({
        title: '请稍后',
        icon: 'none'
      })
      console.log('这里走了吗', this.formObj)

      // 屏幕宽度
      const ctx = wx.createCanvasContext('shareFrends', this)
      ctx.save()
      var status = 0
      // // 绘制背景图
      var gzImgPath = await that.toPath(that.src)
      ctx.drawImage(gzImgPath.path, 0, 0, 299, this.windowHeight)
      // ctx.drawImage('https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/index2/report-bg.png', 0, 0, 299, this.windowHeight)
      // ctx.drawImage('https://yhpn-project-1320305021.cos.ap-beijing.myqcloud.com/mini/static/common/common-peoole.png', 16 ,  16,40,40)
      // 绘制头像
      var gzImgPath = await that.toPath(that.cdn + that.formObj.avatar)
      let peoUrl = gzImgPath.path || ''
      console.log('peoUrl: ', peoUrl);
      ctx.drawImage(peoUrl, 16, 16, 40, 40)
      console.log('这里走吗-----')
      // 绘制标题
      ctx.font = "600 14px Arial"
      ctx.fillStyle = "#FFFFFF"
      let userName = that.formObj.userName || '默认用户'
      ctx.fillText(userName, 70, 40)
      // 绘制二维码
      if (that.qrUrl) {
        var gzImgPath = await that.toPath(that.cdn + that.qrUrl)
        let qrUrl = gzImgPath.path || ''
        // var gzImgPath = await that.toPath(that.cdn + that.formObj.avatar)
        // let qrUrl = gzImgPath.path || ''
        console.log('qrImgPath: ', qrUrl);
        ctx.drawImage(qrUrl, 230, 10, 60, 60)
      }

      // 绘制签到天数排名
      ctx.fillStyle = '#000000'
      ctx.font = "600 14px Arial"
      ctx.setTextAlign('center')
      ctx.fillText('签到天数排名', (299 / 2) - 15, 337)
      ctx.fillStyle = '#FF7F03'
      ctx.font = "700 40px D-Din"
      ctx.fillText(this.formObj.signRank, (299 / 2) + 50, 347)
      // 绘制激励语句
      ctx.font = "400 12px Arial"
      ctx.fillStyle = '#AB6A15'
      ctx.setTextAlign('center')
      if (that.twoLine) {
        ctx.fillText(that.oneText, 299 / 2, 370)
        ctx.fillText(that.twoText, 299 / 2, 390)
      } else {
        ctx.fillText(that.discourseStr, 299 / 2, 385)
      }


      // 绘制底部
      ctx.fillStyle = '#333333'
      ctx.setFontSize(12)
      ctx.fillText('本周练习次数', (299 / 3) - 50, 420)
      ctx.fillText('本周练习时长', ((299 / 3) * 2) - 50, 420)
      ctx.fillText('本周正确率', 299 - 50, 420)
      ctx.font = "bold 20px Arial"
      ctx.fillText(this.formObj.weekStudyNum, (299 / 3) - 50, 450)
      ctx.fillText(this.formObj.weekStudyTime, ((299 / 3) * 2) - 50, 450)
      ctx.fillText(this.formObj.rightrate, 299 - 50, 450)

      ctx.setFontSize(11)
      // ctx.fillText('次', (299 / 3) - 20, 450)
      // ctx.fillText('小时', ((299 / 3) * 2) - 20, 450)

      ctx.draw()
      console.log('走这里了吗')
      setTimeout(() => {
        this.downImage()
      }, 100)
    },
    // 下载图片
    downImage() {
      console.log('下载图片走了吗')
      var that = this
      console.log(wx.canvasToTempFilePath)
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        canvasId: 'shareFrends',
        fileType: 'jpg',
        success: function (res) {
          console.log('下载结果', res)
          that.shareImg = res.tempFilePath
          that.sharePic(res.tempFilePath)
          // that.saveImg(res.tempFilePath)
        },
        fail: function (err) {
          console.log(err, '报啥错---');
        }

      }, that)
    },
    // 分享
    sharePic(path) {
      wx.showShareImageMenu({
        path,
      })

    },
    // 保存本地
    saveImg(shareImg) {
      // 获取用户是否开启用户授权相册
      wx.getSetting({
        success(res) {
          console.log('res: ', res);
          // 如果没有则获取授权
          if (!res.authSetting['scope.writePhotosAlbum']) {
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success() {
                wx.saveImageToPhotosAlbum({
                  filePath: shareImg,
                  success() {
                    uni.hideLoading()
                    uni.showToast({
                      title: '保存成功'
                    })
                  },
                  fail() {
                    uni.showToast({
                      title: '保存失败',
                      icon: 'none'
                    })
                  }
                })
              },
              fail() {
                // 如果用户拒绝过或没有授权，则再次打开授权窗口
                //（ps：微信api又改了现在只能通过button才能打开授权设置，以前通过openSet就可打开，下面有打开授权的button弹窗代码）
              }
            })
          } else {
            // 有则直接保存
            wx.saveImageToPhotosAlbum({
              filePath: shareImg,
              success() {
                wx.showToast({
                  title: '保存成功'
                })
              },
              fail() {
                wx.showToast({
                  title: '保存失败',
                  icon: 'none'
                })
              }
            })
          }
        }
      })
    },
    // 获取英语学习报告
    selectReportInfoFn() {
      selectReportInfo().then(res => {
        if (res.code === 200) {
          console.log(res)
          this.formObj = res.data
          let result = this.formObj.weekStudyTime / 60
          console.log('result: ', result);
          if (result > 60) {
            this.isMin = '小时'
            this.formObj.weekStudyTime = (this.formObj.weekStudyTime / 3600).toFixed(2)
          } else {
            this.isMin = '分钟'
            this.formObj.weekStudyTime = result.toFixed(2)
          }
          console.log(this.formObj.weekStudyTime, ' this.formObj.weekStudyTime ')
          let arr = [
            {
              name: "高频词",
              value: res.data.hCount
            },
            {
              name: "中频词",
              value: res.data.mCount
            },
            {
              name: "低频词",
              value: res.data.lCount
            }
          ]
          this.opts.subtitle.name = '总词汇'
          this.opts.title.name = (parseInt(res.data.lCount) + parseInt(res.data.hCount) + parseInt(res.data.mCount)) + ''
          this.isShow = true
          this.chartData.series[0].data = arr
          this.chartInit(this.formObj.lineChartMap)
        }


      })
    },
    // 获取数学学习报告
    getMathData() {
      this.selectLevelOneListFn() //获取数学选择框数据
      this.selectReportInfoMathFn() //顶部信息数据
      this.selectLineChartListFn() //折线图
    },
    // 获取政治学习报告
    getPoliticsData() {
      this.selectMaxKnowledgeFn()//雷达图
      this.selectReportInfoPoliticsFn() //顶部信息数据 & 环形图
    },
    // 获取政治顶部信息&政治环形图
    selectReportInfoPoliticsFn() {
      selectReportInfoPolitics().then(res => {
        if (res.code === 200) {
          this.formObj = res.data
          let result = this.formObj.weekStudyTime / 60
          if (result > 60) {
            this.isMin = '小时'
            this.formObj.weekStudyTime = (this.formObj.weekStudyTime / 3600).toFixed(2)
          } else {
            this.isMin = '分钟'
            this.formObj.weekStudyTime = result.toFixed(2)
          }
          // this.formObj.weekStudyTime = (this.formObj.weekStudyTime / 3600).toFixed(2)
          let arr = [
            {
              name: "名师题库",
              value: res.data.count1
            },
            {
              name: "精选题库",
              value: res.data.count2
            },
            {
              name: "真题题库",
              value: res.data.count3
            },
            {
              name: "每日题库",
              value: res.data.count4
            }
          ]
          this.opts.subtitle.name = '刷题总数'
          this.opts.title.name = res.data.totalCount + ''
          this.isShow = true
          this.chartData.series[0].data = arr
        }
      })
    },
    // 查询学习报告页面信息(数学)
    selectReportInfoMathFn() {
      console.log('2222')
      selectReportInfoMath().then(res => {
        if (res.code === 200) {
          this.formObj = res.data
          let result = this.formObj.weekStudyTime / 60
          if (result > 60) {
            this.isMin = '小时'
            this.formObj.weekStudyTime = (this.formObj.weekStudyTime / 3600).toFixed(2)
          } else {
            this.isMin = '分钟'
            this.formObj.weekStudyTime = result.toFixed(2)
          }
          // this.formObj.weekStudyTime = (this.formObj.weekStudyTime / 3600).toFixed(2)
        }
      })
    },
    // 查询数学折线图
    selectLineChartListFn() {
      selectLineChartList().then(res => {
        // 折线图格式化
        this.chartInit(res.data)
      })
    },
    // 格式化折线图
    chartInit(data) {
      console.log('data: ', data);
      let arr = Object.keys(data).map((key => {
        return data[key] || 0

      }))
      let resArr = {
        categories: Object.keys(data),
        series: [
          {
            name: "",
            data: arr
          },
        ]
      };
      this.isShow = true
      this.chartData2 = JSON.parse(JSON.stringify(resArr));
    },
    // 知识点雷达图信息查询(数学)
    selectLevelOneListFn() {
      selectLevelOneList({
        courseOutlineType: 2, //0 政治 1 外语 2数学
        affiliationmodule: 5 //所属模块   0名师题库   1精选题库  2真题题库 3每日题库 4历年真题 5真题考点

      }).then(res => {
        console.log(res)
        if (res.code === 200 && res.rows && res.rows.length) {
          res.rows.forEach(item => {
            let obj = {
              value: item.course_id,
              text: item.course_outline_name,
              course_id: item.course_id,
              childList: item.childList
            }

            this.columns.push(obj)
          })
          this.formSelect.math1 = res.rows[0].course_id
          this.changeMath1(res.rows[0].course_id)
          this.formSelect.math2 = res.rows[0].childList[0].course_id
          this.changeMath2(this.formSelect.math2)
        }

      })
    },
    changeMath1(e) {
      this.formSelect.math2 = null
      this.columns2 = []
      console.log('e: ', e);
      let arr = []
      this.columns.forEach(item => {
        if (item.course_id === e) {
          console.log(item.childList)
          arr = item.childList
        }
      })
      if (arr && arr.length > 0) {
        arr.forEach(item => {
          let obj = {
            value: item.course_id,
            text: item.course_outline_name
          }
          this.columns2.push(obj)
        })
      } else {
        this.columns2 = []
      }

    },
    changeMath2(e) {
      console.log(e)
      this.selectKnowledgeFn(e)
    },
    // 数学雷达图
    selectKnowledgeFn(id) {
      selectKnowledge({
        courseid: id
      }).then(res => {
        if (res.code === 200) {
          if (res.data && res.data.length > 0) {
            this.leiDaInit(res.data)
          } else {
            this.chartData3 = []
          }

        }
      })
    },
    leiDaInit(data) {
      console.log('data: ', data);
      let categoriesArr = data.map((item => {
        if (item.name && item.name.length > 7) {
          item.name = item.name.substring(0, 7) + '...'
        }
        return item.name
      }))
      let arr1 = data.map((item => {
        return item.value1
      }))
      let arr2 = data.map((item => {
        return item.value2
      }))
      let resArr = {
        categories: categoriesArr,
        series: [
          {
            name: "1",
            data: arr1
          },
          {
            name: "2",
            data: arr2
          },
        ]
      };
      this.chartData3 = JSON.parse(JSON.stringify(resArr));
    },
    sanshi() {
      let str = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFJHIJKLMNOPQRSTUVWXYZ';
      this.num = '';
      for (let i = 0; i < 32; i++) {
        this.num += str.charAt(Math.floor(Math.random() * str.length));
      };
    },

    // 学习报告雷达图集合(政治)
    selectMaxKnowledgeFn() {
      selectMaxKnowledge().then(res => {
        if (res.code === 200) {
          if (res.data && res.data.length > 0) {
            this.leiDaInit(res.data)
          } else {
            this.chartData3 = []
          }
        }
      })
    },
    chooseType() {
      this.$refs.picker.open();
    },
    confirm(e) {
      console.log('confirm', e);
      this.chooseVal = e.value[0]
      this.getMathData()
    },
    closeModal() {
      // this.$refs.popup2.close()
      this.isShowDialog = false
    },
    showDialog() {
      console.log('333')
      this.isShowDialog = true
      // this.$refs.popup2.open('center')
    },

  },
}
</script>
<style lang="scss" scoped>
.dialogBox {
  width: 100%;
  height: 100vh;
  position: fixed;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999999999999;
  top: 0;

  .iconfont {
    position: absolute;
    top: -50rpx;
    right: -28rpx;
    font-size: 36rpx;
  }

  image {
    height: 100%;
  }

  .bg {
    width: 100%;
    height: 100vh;
  }

  &-cons {
    width: 560rpx;
    height: 909rpx;
    text-align: center;
    position: relative;
    margin: 20% auto;

    image {
      width: 100%;
    }

    // left: 50%;
    // margin-left: -270rpx;
    &-tit {
      width: 100%;
      position: absolute;
      top: 75rpx;
      font-size: 40rpx;
      font-weight: 500;
      color: #333333;
      z-index: 3;
      text-align: center;
    }

    .dialogBox-cons-img {
      width: 100%;
      height: 909rpx;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }

    .dialogBox-peo {
      width: 80rpx;
      height: 80rpx;
      position: absolute;
      top: 32rpx;
      left: 32rpx;

      image {
        width: 80rpx;
        height: 80rpx;
      }
    }

    .dialogBox-name {
      position: absolute;
      top: 52rpx;
      left: 120rpx;
      color: white;
      font-size: 28rpx;
      font-weight: 600;
    }

    .dialogBox-qr {
      width: 101rpx;
      height: 101rpx;
      position: absolute;
      top: 24rpx;
      right: 24rpx;

      image {
        width: 101rpx;
        height: 101rpx;
      }

      // background: black;
    }

    .dialog-dayBox {
      position: absolute;
      top: 600rpx;
      left: 176rpx;

      .dialog-dayBox-first {
        display: flex;
        align-items: center;
        // position: absolute;
      }

      .dialog-day-title {
        font-size: 28rpx;
        font-weight: 600;
        width: 168rpx;
      }

      .dialog-day-num {
        margin-left: 16rpx;
        font-size: 80rpx;
        font-weight: 700;
        color: rgba(255, 127, 3, 1);
      }
    }

    .twoLineBox {
      top: 705rpx !important;
    }

    .dialog-tips {
      position: absolute;
      top: 720rpx;
      width: 100%;

      .dialog-tips-center {
        width: 95%;
        margin: auto;
        text-align: center;
        font-size: 24rpx;
        font-weight: 400;
        color: #ab6a15;
      }
    }

    .dialog-bottom {
      width: 100%;
      display: flex;
      justify-content: space-between;
      position: absolute;
      bottom: 22rpx;
      padding: 0 32rpx;

      .bottom-title {
        font-size: 24rpx;
        font-weight: 400;
      }

      .bottom-num {
        font-size: 40rpx;
        font-weight: 700;
        margin-top: 5rpx;
        font-weight: 600;
      }
    }
  }

  .btn {
    width: 236rpx;
    line-height: 80rpx;
    background: #366ff5;
    border-radius: 50rpx 50rpx 50rpx 50rpx;
    font-size: 32rpx;
    font-weight: 500;
    color: #ffffff;
    text-align: center;
    position: fixed;
    bottom: 112rpx;
    left: 50%;
    margin-left: -118rpx;
    z-index: 3;
  }

  .modal-btn {
    display: flex;
    justify-content: space-around;
    margin-top: 53rpx;

    .btnBox {
      height: 72rpx;
      border-radius: 662rpx;
      color: $uni-text-color-inverse;
      font-size: 28rpx;
      font-weight: 400;
      line-height: 72rpx;
      text-align: center;
    }

    .w260 {
      width: 260rpx;
      background: $uni-color-primary;
      // margin-left: 30rpx;
      // margin-right: 50rpx;
    }

    .w204 {
      background: $uni-color-primary;
      width: 204rpx;
    }
  }
}

.control-scroll {
  height: 100vh;
  overflow-y: hidden;
}

.bigbox {
  .wrap {
    margin: 24rpx 30rpx;
    min-height: 100vh;
    background: $uni-bg-color;
    border-radius: 16rpx;

    /deep/ .uv-popup__content {
      width: 80%;
      height: 380rpx;
    }

    /deep/ .uni-select {
      margin: 25rpx 40rpx;
      width: 168rpx;
      background-color: white !important;
      border: none !important;
      height: 80rpx !important;
      border-radius: 20rpx !important;

      .uni-select__input-box {
        height: 80rpx !important;
        border-radius: 20rpx !important;
      }

      .uni-select__input-text {
        color: $uni-text-color-grey !important;
      }

      .uniui-bottom {
        color: $uni-text-color-blank !important;
      }

      .uniui-top {
        color: $uni-text-color-blank !important;
      }

      .uni-select__selector-item {
        color: $uni-text-color-blank !important;
      }
    }

    /deep/ .uv-popup .uv-popup__content.data-v-4cc3c370 {
      overflow: inherit;
    }

    /deep/ .uni-section {
      background-color: transparent;
    }

    /deep/ .uni-section-header {
      display: none !important;
    }

    /deep/ .uni-section-content {
      display: flex;
    }

    .popupBox {
      width: 100%;
      height: 100%;
      background: #fff;
      border-radius: 16rpx;
      padding: 0 24rpx;
    }

    .modalContent {
      width: 100%;
      padding: 0;
      position: relative;

      image {
        position: absolute;
        width: 239rpx;
        height: 239rpx;
        top: -185rpx;
        left: -46rpx;
      }

      .iconfont {
        position: absolute;
        top: -70px;
        right: 0;
        color: #fff;
        font-weight: 400;
        font-size: 31rpx;
      }

      .modal-title {
        width: 100%;
        font-size: 40rpx;
        font-weight: 600;
        color: $uni-text-color;
        text-align: center;
        margin-top: 64rpx;
      }

      .modal-num {
        font-size: 100rpx;
        font-weight: 700;
        color: $uni-color-primary;
        margin-top: 32rpx;
        text-align: center;
      }

      .modal-remark {
        font-size: 28rpx;
        font-weight: 600;
        color: $uni-text-color;
        margin-top: 32rpx;
        text-align: center;
      }
    }

    .flexBox {
      display: flex;
      justify-content: space-between;
      padding: 38rpx 0 0 0;
    }

    .doIndex-header {
      // width: 425rpx;
      height: 86rpx;
      padding: 26rpx 16rpx;
      @include flexBetween;

      &-left {
        height: 100%;
        font-size: 24rpx;
        color: $uni-text-color-blank;
        @include columnAlignStart;
        justify-content: center;

        .days {
          font-size: 26rpx;
          color: $uni-text-color-grey;
          display: flex;
          align-items: center;

          // margin-bottom: 20rpx;
          text {
            font-size: 32rpx;
            font-weight: 600;
            color: $uni-text-color;
            margin: 0 16rpx;
          }
        }
      }

      image {
        width: 86rpx;
        height: 86rpx;
        margin-right: 20rpx;
      }

      .fSize22 {
        font-size: 24rpx;
        color: $uni-text-color;
        margin-top: 20rpx;
        font-weight: 600;
      }
    }

    .doIndex-tab {
      @include flexBetween;
      margin: 36rpx 24rpx 0;
      padding: 0;

      // width: calc(100% - 60rpx);
      &-item {
        width: 306rpx;
        height: 144rpx;
        border-radius: 16rpx;
        background: $uni-color-bg;
        //   background: $uni-text-color-inverse;
        //   box-shadow: 1px -1px 14px 3px rgba(153, 153, 153, 0.1);
        font-size: 24rpx;
        position: relative;
        //   margin: 36rpx 0 0 32rpx;

        &-text {
          font-weight: 600;
          font-size: 26rpx;
          margin: 24rpx 0 0 16rpx;
          color: $uni-text-color-grey;
        }

        &-num {
          font-size: 40rpx;
          font-weight: 600;
          margin: 16rpx 8rpx 24rpx 16rpx;
          align-items: center;
          display: flex;
        }

        &-dw {
          font-size: 24rpx;
          display: inline-block;
          color: $uni-text-color-grey;
          font-weight: 400;
          margin-left: 8rpx;
        }

        &-pm {
          @include alignCenter;
          margin-left: 18rpx;

          image {
            width: 34rpx;
            height: 34rpx;
            margin-right: 16rpx;
          }

          text {
            margin-right: 8rpx;
            font-weight: 400;

            &.nums {
              margin-right: 12rpx;
              font-weight: 600;
            }
          }
        }

        .imagTag {
          width: 80rpx;
          height: 80rpx;
          position: absolute;
          top: 27rpx;
          right: 24rpx;
        }
      }
    }

    .doIndex-zql {
      position: relative;
      height: 144rpx;
      margin: 32rpx 24rpx 0;
      background: $uni-color-bg;
      border-radius: 16rpx;

      .doIndex-zql-text {
        font-size: 26rpx;
        font-weight: 600;
        color: $uni-text-color-grey;
        padding: 24rpx 0 0 0;
      }

      .doIndex-zql-num {
        font-size: 40rpx;
        font-weight: 600;
        color: $uni-text-color;
        margin: 16rpx 0;
      }

      .imagTag {
        width: 80rpx;
        height: 80rpx;
        position: absolute;
        top: 27rpx;
        right: 24rpx;
      }

      .doIndex-zql-bgPng {
        width: 189rpx;
        height: 41rpx;
        position: absolute;
        top: 44rpx;
        left: 176rpx;
      }

      .doIndex-zql-imgText {
        // width: 109rpx;
        height: 40rpx;
        font-size: 24rpx;
        font-weight: 400;
        color: $uni-text-color-inverse;
        position: absolute;
        left: 222rpx;
        top: 48rpx;
      }
    }

    .doIndex-xxgk {
      // height: 683rpx;
      height: 383rpx;
      border-radius: 16px;
      background: $uni-color-bg;
      margin: 30rpx 24rpx;

      .doIndex-xxgk-text {
        padding: 32rpx 16rpx;
        height: 45rpx;
        font-size: 32rpx;
        font-weight: 600;
        letter-spacing: 0rpx;
        line-height: 44.8rpx;
        color: $uni-text-color;
      }
    }

    .doIndex-xxTime {
      position: relative;
      margin-top: 30rpx;

      .doIndex-xxTime-text {
        padding: 36rpx 40rpx;
        height: 45rpx;
        font-size: 32rpx;
        font-weight: 600;
        letter-spacing: 0rpx;
        line-height: 44.8rpx;
        color: $uni-text-color;
      }

      .iconfont {
        font-size: 40rpx;
        font-weight: bold;
        transform: rotate(180deg);
      }

      .choose-btn {
        position: absolute;
        right: 0;
        top: 30rpx;
        display: flex;
      }
    }

    .charts-box {
      width: 100%;
      height: 257rpx;
      z-index: 999;
      position: relative;
    }

    .h400 {
      // height: 870rpx;
      height: 470rpx;
    }

    .nullBox {
      width: 100%;
      height: 100rpx;
    }
  }

  .fabBox {
    // width: 80rpx;
    // height: 80rpx;
    position: fixed;
    bottom: 248rpx;
    border-radius: 500rpx;
    right: 54rpx;
    z-index: 999999999;

    // box-shadow: 0px 2rpx 20rpx 4rpx rgba(252, 81, 95, 0.4);
    .iconfontFabBox {
      // font-size: 90rpx;
      width: 80rpx;
      height: 80rpx;
      border-radius: 100rpx;
      color: #fc515f;

      // box-shadow: 0px 2rpx 20rpx 4rpx rgba(252, 81, 95, 0.4);
      // font-size: ;
    }
  }
}
</style>