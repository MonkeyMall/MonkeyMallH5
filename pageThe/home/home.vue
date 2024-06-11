<template>
	<view class="uni-flex uni-column">
		<view class="uni-flex uni-flex-item articles uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(n,key) in news" :key="key" @click="goNew(n)">
				<view class="uni-media-list">
					<image class="uni-media-list-logo" lazy-load  mode="widthFix" :src="n.pic"></image>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top uni-ellipsis">{{n.title}}</view>
						<view class="uni-media-list-text-bottom">
							<text>[{{n.class}}] </text>
							<text>{{n.createDate}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 1 -->
		<load-more :loadingType="loadingType" :contentText="contentText"></load-more> 
	</view>
</template>

<script>
	// 2
	import loadMore from '@/components/uni-load-more.vue';
	// 3
	var index;
	export default {
		data() {
			return {
				// --4
				type: 0,
				news: [],
				loadingType: 0,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				// --4
			};
		},
		onPullDownRefresh() {
			this.getData();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onLoad() {
			// 5
			index = 1;
			this.getData();
		},
		methods: {
			// 6
			getData() {
				if (this.loadingType !== 0) {
					return;
				}
				this.loadingType = 1;
				uni.request({
					url: this.webUrl + 'News',
					method: 'POST',
					data: {
						pageIndex: index,
						type: this.type
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						if (res.data.result.uniArticles.length > 0) {
							this.news = this.news.concat(res.data.result.uniArticles);
						} else {
							this.loadingType = 2;
							return;
						}
						if (index == parseInt(res.data.result.pages)) {
							this.loadingType = 2;
							return;
						} else {
							this.loadingType = 0;
						}
						index++;
					},
					fail: () => {},
					complete: () => {}
				});
			},
		},
		onReachBottom() {
			// 7
			this.getData();
		},
		components: {
			// 8
			loadMore
		}
	}
</script>

<style>
	.home .news-center .contentsItem {
		width: 100%;
		border-top: 1px solid #e2e2e2;
	}

	.home .news-center .item-contents {
		padding: 50upx 45upx;
	}

	.home .news-center .item-contents .item-contents-wrap {
		position: relative;
		margin: 0 auto;
		width: 660upx;
		height: 380upx;
		display: block;
	}

	.home .news-center .item-contents image {
		margin: 0 auto;
		width: 660upx;
		height: 380upx;
		display: block;
	}

	.home .news-center .item-contents .contentsMessage {
		margin: 0 auto;
		width: 660upx;
		box-sizing: border-box;
		padding: 25upx 20upx;
		background: #e9e9e9;
	}

	.home .news-center .contentsMessage .Msgs {
		width: 620upx;
	}

	.home .news-center .contentsMessage .Msgs .lfMsg {
		font-size: 26upx;
		/* #ifdef H5 */
		font-size: 26upx;
		/* #endif */
		color: #505050;
		width: 490upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.home .news-center .contentsMessage  .lfMsgs-wrap{
		margin-top: 10upx;
	}
	.home .news-center .contentsMessage  .lfMsgs {
		font-size: 24upx;
		/* #ifdef H5 */
		font-size: 24upx;
		/* #endif */
		color: #909090;
		text-spacing: 5upx;
	}

	.home .news-center .contentsMessage .Msgs .rtMsg {
		font-size: 26upx;
		/* #ifdef H5 */
		font-size: 26upx;
		/* #endif */
		color: #909090;
		justify-content: flex-end;

	}

	.home .news-center .contentsMessage .Msgs .Msgs-artitle {
		width: 100%;
		margin-top: 10upx;
		margin-bottom: 30upx;
		font-size: 26upx;
		/* #ifdef H5 */
		font-size: 26upx;
		/* #endif */
		color: #909090;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.image {
		position: absolute;
	}
</style>
