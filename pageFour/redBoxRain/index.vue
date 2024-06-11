<template>
	<view class="content">
    <image v-show="!readyStatus" src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/redBoxRain/gameBg.png"></image>
    <image  v-show="readyStatus" src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/redBoxRain/game-bg2.png"></image>
		<view class="start" v-if="gameStatus == 1">
			<view class="btn" @tap="start">
				开始
			</view>
		</view>

		<!-- <view > -->
		<view v-else class="readyPng">
      <view v-if="readyStatus">
        <view v-if="showLaiXiPng">
          <image style="margin: 500rpx auto;margin-left: 30px;" src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/redBoxRain/game-lx.png"></image>
        </view>
        <view v-else class="ready" ref="ready">
          {{ready}}
        </view>

       
      </view>
      <view class="top">
          <view class="left">
            剩余时间：{{downTime}}
          </view>
          <view class="right">
            抢到红包：{{redNumber}}
          </view>
        </view>

			<view class="redBox" v-for="(item,index) in redBox" v-if="gameStatus == 2 && ready==='开始'">
        <view class="nullBox">232{{ item.width }}</view>
        <image class="red" :style="{
					width:item.width,
					left: item.left,
					transform: item.transform,
					animationDuration: item.animationDuration
				}" :data-index="index"  src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/redBoxRain/close.png" mode="widthFix" @touchend="rob" v-if="item.status">
				</image>
			</view>

			<view class="endBox" v-if="gameStatus == 3">
        <image src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/redBoxRain/game-result.png"></image>
        <view class="moneyBox">
          <text class="numBox">{{ obj.amountMoney }}</text>元
        </view>
        <view class="btn-sure" @click="saveFn">
						确定
        </view>
				<view class="buttom-title">
						到微信零钱查看
        </view>
			</view>
		</view>
    <!-- 关闭提示弹窗 -->
    <uni-popup
          ref="popup2"
          type="center"
          :is-mask-click='false'
        >
          <view class="endPopup">
            <view class="endPopupTop">红包雨活动步骤</view>
            <view class="endPopupMiddle"> 
                <view class="endPopupMiddle-content">
                  1、达到既定条件(本学员)即可参与抽奖;
                </view>
                <view class="endPopupMiddle-content">
                  2、参与者扫码进入活动界面，需关注公众号方可参与抽奖；
                </view>
                <view class="endPopupMiddle-content">
                  3、活动页面加载完毕将有3秒倒计时，结束后进行15秒的红包雨活动；
                </view>
                <view class="endPopupMiddle-content">
                  4、参与者在15秒内点击降落的红包，系统将统计点击总数；
                </view>
                <view class="endPopupMiddle-content">
                  5、参与者获得奖励后系统将通过微信平台转账到零钱。
                </view>
            </view>
            <view class="endPopupBottom" @click="agreeFn">
              <view :class="isClick?'endBottom-btn-active':'endBottom-btn'">我已了解</view>
            </view>
          </view>
        </uni-popup>
	</view>
</template>

<script>
import {addActiveData,participateActivities} from '@/api/comm'
	export default {
		data() {
			return {
				// 红包生产速度
				rate: 280,
				// 红包雨集合
				redBox: [],
				// ready状态
				readyStatus: false,
				ready: '3',
				// 游戏时长
				downTime: 15,
				// 游戏结束定时器
				endTimer: null,
				// 获得红包个数
				redNumber: 0,
				// 游戏状态
				gameStatus: 1,
        showLaiXiPng:true,
        money:0,
        obj:{
          eventManage:'', //活动id
          amountMoney:'', //所领金额
        },
        isClick:false
			}
		},
		onLoad() {

		},
    onShow(){
      this.getParticipateActivities()
    },
    mounted() {
      this.isClick = false
      this.$refs.popup2.open('center')
    },
		methods: {
      agreeFn(){
        this.isClick = true
        this.$refs.popup2.close()
      },
      getParticipateActivities(){
        participateActivities().then(res=>{
          if(res.code == 200){
            this.obj = Object.assign({},res.data)
          }
        })
      },
      saveFn(){
        addActiveData({
          eventManage:this.obj.eventManage,
          envelopeAmount:this.obj.amountMoney,
          clickCount:this.redNumber
        }).then(res => {
          if(res.code == 200){
            console.log(res)
            setTimeout(() => {
              uni.navigateBack({
                delta: 1
              });
            }, 1000)
          }
        })
      },
			start() {

        this.showLaiXiPng = true
				let that = this;
				that.gameStatus = 2;
				that.readyStatus = true;
        
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				innerAudioContext.src = 'https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/redBoxRain/music.mp3';
				innerAudioContext.onPlay(() => {
					console.log('开始播放');
				});
				innerAudioContext.onError((res) => {
					console.log(res.errMsg);
					console.log(res.errCode);
				});
        let num = 3
      
        setTimeout(() => {
          console.log(  this.showLaiXiPng,'22')
          this.showLaiXiPng = false
          console.log('this.showLaiXiPng: ', this.showLaiXiPng);
          
        },1000)
        let timer11 = setInterval(function() {
          if(num >0){
            that.ready = num
            num --
            console.log('num: ', num);
           
          }else{
            that.ready = '开始';
            clearInterval(timer11);
          }
				}, 1000)
        console.log(that.ready)
				let timer = setTimeout(function() {
					that.rain();
					that.down();
					let timer1 = setTimeout(function() {
						that.readyStatus = false
						clearInterval(timer1);
					}, 500)
					clearInterval(timer);
				}, 3000)
			},
			down() {
				let that = this;
				let downTimer = setInterval(function() {
					if (that.downTime == 0) {
						that.gameStatus = 3;
						clearInterval(downTimer);
					} else {
						that.downTime--;
					}
				}, 1000)
			},
			rain() {
				let that = this;
				let win = 0;
				uni.getSystemInfo({
					success: function(res) {
						win = res.windowWidth
					}
				});
				//随机红包旋转角度
				let rotate = (parseInt(Math.random() * 90 - 45)) + "deg";
				//随机红包宽度
				let width = (parseInt(Math.random() * 50)) + 120;
				//动画时间
				let durTime = parseInt(Math.random() * 1.5) + 2 + 's';
				//随机红包偏移位置
				let left = parseInt(Math.random() * win);
				if (left < 100) {
					left = parseInt(Math.random() * 100) + 100
				} else if (left > (win - width)) {
					left = (win + 70)
				}

				that.redBox.push({
					status: true,
					width: width + 'rpx',
					left: left + 'rpx',
					transform: 'rotate(' + rotate + ')',
					animationDuration: durTime
				})

				// 多少时间游戏结束
				setTimeout(() => {
					clearTimeout(that.endTimer)
					return false
				}, that.downTime * 1000)

				// 红包密度
				that.endTimer = setTimeout(() => {

					that.rain();
				}, this.rate)
			},

			rob(event) {
				let index = event.currentTarget.dataset.index;
				
				if(this.redBox[index].status){
					this.redBox[index].status = false;
					this.redNumber++
				}
				
				event.preventDefault();
			},
			align(){
				location.href = '';
			}
		}
	}
</script>

<style lang="scss">
	.content {
		margin: 0;
		padding: 0;
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden !important;
		background-size: 100% 100%;
		background-repeat: no-repeat;
    image{
      width: 100%;
		  height: 100%;
    }
		.top {
			width: 100%;
			height: 100rpx;
			line-height: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;
      position: absolute;
      top: 150rpx;
			.left,
			.right {
				width: 50%;
				color: yellow;
				text-align: center;
			}
		}

		.start {
			width: 100%;
			height: 100vh;
			background-size: 100% 100%;
			background-repeat: no-repeat;

			.btn {
				position: absolute;
				bottom: 20%;
				left: 50%;
        margin-left: -130rpx;
				width: 260rpx;
        height: 80rpx;
				color: white;
				text-align: center;
				line-height: 80rpx;
				background: linear-gradient(180deg, #FF8D1A 0%, #FFEB3B 100%);
        box-shadow: 0px 2rpx 16rpx 6rpx #FFD000;
				border-radius: 50rpx;
        font-size: 42rpx;
        font-weight: 600;
			}
		}

		.ready {
			position: fixed;
			top: 45%;
			color: white;
			font-size: 200rpx;
			font-weight: 700;
			width: 100%;
			text-align: center;
      
		}
    .readyPng{
      width: 100%;
      height: 100vh;
      background: rgba(0,0,0,0.8);
      position: fixed;
      top: 0;
      line-height: 100%;
      image{
        width: 625rpx;
        position: relative;
        z-index: 9999999;
        left: 0;
        top: 0;
        height: 562rpx;
        // margin: 500rpx auto;
        margin-left: 30px;
      }
    }
		.redBox {
			position: absolute;
			top: 0rpx;
			.red {
				position: absolute;
				animation: rain 5s linear 1 forwards;
			}
      image{
        height: auto;
      }

		}

		.endBox {
			position: relative;
			top: 30%;
			left: 13%;
			width: 550rpx;
			height: 650rpx;
			z-index: 99;
			text-align: center;
      image{
        margin: auto;
        width: 550rpx;
        height: 650rpx;
        left: -7rpx;
      }
			.head {
				width: 100%;
				height: 10vh;
				line-height: 10vh;
				font-size: 35rpx;
				font-weight: bold;
				color: red;
			}

			.info {
				.star {
					.star-item {
						width: 10%;
						display: inline-block;
					}
				}
				
				.tips{
					margin: 5vh auto;
				}
				
				.btn{
					width: 80%;
					margin: 1vh auto;
					height: 6vh;
					line-height: 6vh;
					background-color: yellow;
					border-radius: 40rpx;
					font-weight: bold;
					color: #646464;
				}
			}
      .btn-sure{
        width: 340rpx;
        height: 90rpx;
        border-radius: 97rpx;
        background: linear-gradient(180deg, #FFF1D6 0%, #FCE2A7 100%);
        font-size: 36rpx;
        font-weight: 600;
        color: rgba(130, 59, 15, 1);
        text-align: center;
        line-height: 90rpx;
        // position: absolute;
        // bottom: 0;
        // z-index: 9999999;
        bottom: 190rpx;
        // left: 50%;
        z-index: 9999999;
        position: relative;
        margin: auto;
        // margin-left: 10rpx;
        // margin-left: -162rpx;
      }
      .buttom-title{
        font-size: 28rpx;
        font-weight: 400;
        color: white;
        text-align: center;
        position: relative;
        bottom: 150rpx;
        z-index: 999999999999;
      }
      .moneyBox{
        position: absolute;
        top: 270rpx;
        text-align: center;
        font-size: 48rpx;
        left: 50%;
        z-index: 999999999;
        color: rgb(132,69,23);
        margin-left: -150rpx;
        width: 300rpx;
        .numBox{
          font-weight: 600;
          font-size: 55rpx;
          color: #F63D42;
        }
      }
		}

		@keyframes rain {
			0% {
				transform: translateY(0);
			}

			100% {
				transform: translateY(120vh);
			}
		}
.nullBox{
  color: transparent;
}
.endPopup {
  width: 590rpx;
  height: 650rpx;
  border-radius: 32rpx;
  background: rgba(255, 255, 255, 1);
  text-align: center;
  overflow: hidden;
  position: relative;
  .endPopupTop {
    width: 100%;
    height: 109rpx;
    font-size: 32rpx;
    font-weight: 600;
    // background: $uni-color-primary;
    line-height: 109rpx;
    text-align: center;
    font-size: 32rpx;
    font-weight: 600;
    color: #333333;
    // padding-top: 40rpx;
  }
  .endPopupMiddle {
    padding: 0 32rpx 49rpx 30rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    text-align: left;
    text {
      color: $uni-color-primary;
    }
    .endPopupMiddle-title{
      color: $uni-text-color-placeholder;
      font-size: 25rpx;
      font-weight: 400;
      margin-top: 32rpx;
    }
    .endPopupMiddle-content{
      letter-spacing: 0px;
      line-height: 22px;
      color: rgba(51, 51, 51, 1);
      text-align: justify;
      vertical-align: top;
    }
  }
  .endPopupBottom {
    width: 100%;
    position: absolute;
    bottom: 0;
    height: 120rpx;
    line-height: 120rpx;
    text-align: center;
    font-size: 28rpx;
    font-weight: 600;
    color: $uni-text-color-placeholder;
    .endBottom-btn{
      width: 260rpx;
      height: 80rpx;
      border-radius: 16rpx;
      margin: auto;
      border: 2rpx solid #FC515F;
      line-height: 80rpx;
    }
    .endBottom-btn-active{
      width: 260rpx;
      height: 80rpx;
      border-radius: 16rpx;
      margin: auto;
      background: #FC515F;
      border: 2rpx solid #FC515F;
      line-height: 80rpx;
      color: white;
    }
  }
}
	}
</style>