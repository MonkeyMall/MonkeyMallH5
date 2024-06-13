<template>
	<view class="move-path" @touchend="handleOnTouchEnd">
		<view class="move-content">
			<view v-if="vertify" class="success"> </view>
			<view v-else>结束专注</view>
		</view>
		<movable-area :animation="true">
			<div class="div1"
				:style="{'width': widthValue, 'height': '100%','position': 'absolute','top': 0,'left': 0,'z-index': 1,  }">
			</div>
			<movable-view class="move-view" :x="x" direction="horizontal" @change="handleOnMoving" :disabled="vertify"
				:class="{'active':vertify}"></movable-view>
		</movable-area>
	</view>
</template>

<script>
	export default {
		name: 'move-vertify',
		data() {
			return {
				x: 0,
				oldx: 0,
				vertify: false,
				size: {},
				isMove: false
			};
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				this.getSize(".move-path").then((pathway) => {
					this.size.pathway = pathway;
					this.getSize(".move-view").then((track) => {
						this.size.track = track;
					});
				})
			},
			/**
			 * 获取元素宽度
			 */
			getSize(selector) {
				return new Promise((resolve, reject) => {
					const view = uni.createSelectorQuery().in(this).select(selector);
					view.fields({
						size: true,
					}, (res) => {
						resolve(res.width);
					}).exec();
				});
			},
			/**
			 * 滑动过程
			 */
			handleOnMoving(e) {
				this.oldx = e.detail.x;
			},
			/**
			 * 滑动结束
			 */
			handleOnTouchEnd() {
				if (this.vertify || this.oldx < 1) return;
				this.x = this.oldx;
				if ((this.oldx + 2) > (this.size.pathway - this.size.track) /1.5 ) {
					this.vertify = true;
					this.$emit("vertify", this.vertify);
				} else {
					this.$nextTick(() => {
						this.x = 0;
						this.oldx = 0;
					});
				}
			},

			reviseX() {
				console.log('reviseX')
				this.$nextTick(() => {
					this.x = 0;
					this.oldx = 0;
					this.vertify = false;
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.move-path {
		margin: 20rpx auto;
		color: #333;
		height: 124rpx;
		width: 700rpx;
		border-radius: 80rpx;
		background: linear-gradient(to right, #FEEF3C, #F3CD34);
		background: #fff;
		position: relative;
		overflow: hidden;
		box-shadow: 1rpx -1rpx 14rpx 3rpx rgba(153, 153, 153, 0.1);

		.move-content {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			line-height: 124rpx;
			text-align: center;
			color: $uni-text-color-grey;
			font-size: 32rpx;
			z-index: 3;

			.success {
				color: #fff;
			}
		}

		movable-area {
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			background: none;
			z-index: 5;
		}

		movable-view {
			width: 124rpx;
			height: 124rpx;
			box-sizing: border-box;
			border-radius: 80rpx;
			// background-color: #fff;
			// border: #FEEF3C solid 1px;
			background-position: center;
			background-repeat: no-repeat;
			background-size: auto 124rpx;
			background-image: url('./right.png');
			// background-image: url('./arrow.png');
		}

		movable-view.active {
			background-size: 30% 30%;
			background-image: url('./success.png');
			background-size: auto 124rpx;
			background-image: url('./right.png');
		}
	}
</style>