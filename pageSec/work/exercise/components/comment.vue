<template>
  <view>
    <template v-if="list.length">
      <view
        class="comment"
        v-for="(item, index) in list"
        :key="index"
      >
        <view class="comment-header">
          <view class="user-img">
            <image
              :src="item.avatar || defaultImg.userImg"
              mode="scaleToFill"
            />
          </view>
          <view class="comment-header-info">
            <view class="comment-header-info-name">{{ item.username }}</view>
            <view class="comment-header-info-cons">
              <text>{{ item.createtime }}</text>
              <view class="comment-header-info-cons-cz">
                <view
                  :class="[item.self_status === 1 ? 'zan iconitem' : 'iconitem']"
                  @click="zanFn(item)"
                >
                  <view class="icons">
                    <i
                      class="iconfont"
                      v-show="item.self_status === 1"
                    >&#xe640;</i>
                    <i
                      class="iconfont"
                      v-show="item.self_status === 0"
                    >&#xe640;</i>
                  </view>
                  {{ item.likesnum }}
                </view>
                <view
                  v-if="!all && !disabled"
                  class="iconitem del"
                  @click="delFn(item)"
                >
                  <i class="iconfont">&#xe617;</i>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view
          class="comment-cons"
          v-html="item.note"
        >
        </view>
      </view>
    </template>
  </view>
</template>

<script>
import {
  deleteNotes,
  updateLikesNum
} from '@/api/work/english.js'
export default {
  props: {
    all: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => []
    },
    zxOrRm: {
      type: String,
      default: 'zx'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      defaultImg: this.$defaultImg
    }
  },
  methods: {
    async zanFn(item) {
      // Id=1&likesnum=-1笔记点赞与取消点赞 1点赞  -1取消
      if (this.disabled) { return }
      let obj = {
        Id: item.id,
        likesnum: item.self_status === 0 ? 1 : -1
      }
      await updateLikesNum(obj)
      if (this.all) {
        // 全部评论
        this.$parent.getAllComment(this.zxOrRm === 'zx' ? 0 : 1)
      } else {
        // 我的笔记
        this.$parent.getMyNotes()
      }
    },
    async delFn(item) {
      if (this.disabled) { return }
      const modal = await this.$api.modal('删除后不可恢复哦~', '确定删除笔记内容吗？', ['取消', '确定'])
      if (modal) {
        await deleteNotes(item.id)
        this.$modal.showToast('删除笔记成功！')
        this.$parent.getMyNotes()
        this.$parent.getAllComment()
        // 确定删除的操作
      } else {
        // 取消的操作
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.comment {
  margin-bottom: 32rpx;
  &-header {
    @include alignCenter;
    .user-img {
      width: 56rpx;
      height: 56rpx;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 16rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .comment-header-info {
      flex: 1;
      &-name {
        font-size: 28rpx;
        font-weight: 600;
        letter-spacing: 0px;
        color: $uni-text-color;
        margin-bottom: 8rpx;
      }
      &-cons {
        color: $uni-text-color-grey;
        font-size: 26rpx;
        @include flexBetween;
        &-cz {
          @include flexBetween;
          .iconitem {
            margin-right: 10rpx;
            @include flexBetween;
          }
          .iconfont {
            font-size: 50rpx;
          }
          .zan {
            .iconfont {
              color: $uni-color-primary;
            }
            .icons {
              display: flex;
              align-items: center;
            }
          }
          .del {
            margin-left: 32rpx;
            margin-right: 0;
            &:active {
              color: $uni-color-primary;
            }
          }
        }
      }
    }
  }
  &-cons {
    font-size: 28rpx;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 50rpx;
    color: $uni-text-color;
    margin-top: 24rpx;
  }
}
</style>
