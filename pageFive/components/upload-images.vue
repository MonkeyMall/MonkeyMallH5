<template>
  <view class="upload-content">
    <block
      v-for="(item, index) in imageList"
      :key="index"
    >
      <view class="upload-item">
        <image
          class="upload-img"
          :src="item"
          mode="aspectFill"
          @click="previewImage(index)"
        ></image>
        <image
          class="upload-del-btn"
          @click="delImage(index)"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAC2UlEQVRYR82YP2gTcRTHvy+54iQ6iEsR7SA4CA6KOFScq72Im6cEIygORYQKukStUhcHF3HoFKXILaKYa1oEF9GhYBbBTfAP0kU7KFmUXu7J7/55udzvfr9LK82NyXvvPr/3/3eEAg9XT+3EmnscpdIxZt4PYA8BW4UJBjoAvhDRB3jea4wYizT//LuuedIRZGtynEHXwDQBgqGjA4YL4iUC3yN74a1KJxeEq+YYXHrAwAmVobz/CWjB4Ms073yWyUlB2DItBs0hdP16QELdDoEvke3YWbYyQbqWebMEmmFAK3S6kASwB54p286dtE7fiwQEgW7rGh9EjsG30jA9ICIcAD3ZaE9knJ4BPpsMUwwiEpNder+BOaFyVocMPhAl8D8Qq7Kw3upQvTnDMy2ym5Pidx8k6BOlN0pDR8YDkWVFWzAMwKoBzafAr5+5ZgneUdFnfBDPMpsAmbkaAmJqOhB5eF8OIyCuXAcdPAxe+QbM1hUw7JRsp0KibfNadyW3Y4YQVC77HNztZsMkIKJDKWEYLo2UR4lPmzUmauh4IwLJhMmA8OU0vELM54nPnGwwc00rP6amkQnTXo7DkbSjA+EnKtEj8qzKOwCHlCBCIBWi2DOfPoL27usxoQsRKrUFyA8AO7RAJDBp3YIQQn2V2Kr8ZmCLNogCZgAI0UP+DAYiEvPG3f5wMAONOeDVUqFz+SCFQyOpjrhcZaWdj7ZaLFllJcosMj9+lbTPyGHa+uWb1ydetoBzF7NLWzUOovLVamg6zUpW2nnjIPRQ0NB0Wnz1AmiidxRlVocMpn4V+CpZV6MWrzX0tm0H6rOg0V3BrMlr2+m55DwD7Mc5qRoOPd+wzhoQwvgWVRM1mtSLLxQQYg9JrAEBjMZiJGDEo9gxfJndY/JwRLkB9C5GPsiwrIqBV4ZgeY6yaSiuE0mYTb9gxTNjGK6cMcwwXMKTHWjTP0v0bV7/8UPNX9P5sIpyimQHAAAAAElFTkSuQmCC"
          mode="scaleToFill"
        >
        </image>
        <!-- <view class="upload-progress" v-if="item.progress < 100">{{item.progress}}%</view> -->
      </view>
    </block>
    <!-- chooseImage -->
    <view
      class="xiangjis"
      v-if="imageList.length < count"
      @click="openchose"
    >
      <image
        src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/myindex/icon-wode-xiangji.svg"
        mode=""
      ></image>
    </view>
    <!-- <view class="upload-add-btn" v-if="imageList.length < count" @click="openchose"></view> -->
    <uni-popup
      ref="chose"
      type="bottom"
    >
      <view class="chose-box">
        <view
          class="view-item camera"
          @click="cameraFn"
        >拍照</view>
        <view
          class="view-item"
          @click="albumFn"
        >从手机相册选择</view>
        <view
          class="view-item cancle"
          @click="cancleFn"
        >取消</view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import uploadFile from './utils/uploadfile'
var _self
export default {
  data() {
    return {
      uploadFileArray: [], // 需要上传的图片
      imageList: []
    };
  },
  props: {
    url: {
      type: String,
      value: '' //上传接口地址
    },
    count: {
      type: Number,
      value: 4 //单次可选择的图片数量
    },
    length: {
      type: Number,
      value: 50 //可上传总数量
    }
  },
  computed: {
    countNum() {
      return this.count - this.imageList.length;
    }
  },
  created() {
    console.log('子组件', this.count)
    _self = this
  },
  methods: {
    openchose() {
      this.$refs.chose.open()
    },
    cancleFn() {
      this.$refs.chose.close()
    },
    cameraFn() {
      console.log('点击拍照')
      uni.setStorageSync('chooseImg', true)
      this.chooseImage('camera')
      this.$refs.chose.close()
    },
    albumFn() {
      console.log('点击相册选择')
      uni.setStorageSync('chooseImg', true)
      this.chooseImage('album')
      this.$refs.chose.close()
    },
    //选择图片
    chooseImage: function (sourceType) {
      uni.chooseImage({
        count: this.countNum !== 0 ? this.countNum : this.count, //最多可以选择的图片张数
        sizeType: ['original', 'compressed'], //original 原图，compressed 压缩图，默认二者都有
        sourceType: [sourceType], //album 从相册选图，camera 使用相机，默认二者都有
        success: (res) => {
          console.log('resss', res)
          this.uploadFileArray = res.tempFiles
          this.uploadFileFn()
        }
      });
    },
    uploadFileFn() {
      // _self.imageList.length < _self.count && !_self.uploadFileArray.length
      if (_self.imageList.length === _self.count) {
        return
      }
      uploadFile(_self.uploadFileArray[0]).then(function (data) {
        _self.imageList.push('https://' + data.Location)
        _self.$emit('getImageListFn', _self.imageList)
        _self.uploadFileArray = _self.uploadFileArray.splice(1)
        _self.uploadFileFn(_self.uploadFileArray)
      })
    },


    //上传图片
    async uploadFiles(images) {
      this.imageList.push({
        filePath: images[0],
        progress: 0
      });
      uni.showLoading({
        title: '请稍后..',
        mask: true,
      })
      try {
        const uploadUrl = await this.uploadImage(images[0]);
      } catch (err) {
        console.log(err);
        return;
      }

      if (uploadUrl !== false) {
        images.splice(0, 1);
        this.imageList[this.imageList.length - 1].src = uploadUrl;

        //判断是否需要继续上传
        if (images.length > 0 && this.rduLength > 0) {
          this.uploadFiles(images);
        } else {
          uni.hideLoading();
        }
      } else {
        //上传失败处理
        this.imageList.pop();
        uni.hideLoading();
        uni.showToast({
          title: '上传中出现问题，已终止上传',
          icon: 'none',
          mask: true,
          duration: 2000
        });
      }
    },
    uploadImage: function (file) {
      console.log(2)
      uploadFile(file).then(function (data) {
        console.log('123', data)
      })

      // return new Promise((resolve, reject)=> {
      // 	//发送给后端的附加参数
      // 	const formData = {
      // 		thumb_mode: 1,  
      // 	};
      // 	this.uploadTask = uni.uploadFile({
      // 		url: this.url, 
      // 		filePath: file,
      // 		name: 'file',
      // 		formData: formData,
      // 		success(uploadFileResult){
      // 			const uploadFileRes = JSON.parse(uploadFileResult.data) || {};
      // 			if(uploadFileRes.status === 1 && uploadFileRes.data){
      // 				resolve(uploadFileRes.data);
      // 			}else{
      // 				reject('接口返回错误');
      // 			}
      // 		}, 
      // 		fail(){
      // 			reject('网络链接错误');
      // 		}
      // 	});
      // 	//上传进度
      // 	this.uploadTask.onProgressUpdate((progressRes)=> {
      // 		this.imageList[this.imageList.length - 1].progress = progressRes.progress;
      // 	});
      // });
    },
    //删除图片
    delImage: function (index) {
      console.log('子组件', this.count)
      this.imageList.splice(index, 1);
      // uni.showModal({
      // 	content: '确定要放弃这张图片么？',
      // 	success: (confirmRes)=> {
      // 		if (confirmRes.confirm) {
      // 			this.imageList.splice(index, 1);
      // 		} 
      // 	}
      // });
    },
    //预览图片
    previewImage: function (index) {
      const urls = [];
      this.imageList.forEach((item) => {
        urls.push(item.filePath);
      })
      uni.previewImage({
        current: urls[index],
        urls: urls,
        indicator: "number"
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.xiangjis {
  width: 150rpx;
  height: 150rpx;
  border-radius: 8px;
  border: 2px dashed rgba(153, 153, 153, 1);
  display: flex;
  align-items: center;
  justify-content: center;

  image {
    display: block;
    width: 44rpx;
    height: 44rpx;
  }
}

.upload-content {
  // padding: 24rpx 0 0 28rpx;
  background-color: #fff;
  // overflow: hidden;
}

.upload-item {
  position: relative;
  float: left;
  width: 150rpx;
  height: 150rpx;
  margin-right: 30rpx;
  margin-bottom: 30rpx;

  &:nth-child(3n) {
    margin-right: 0;
  }

  .upload-img {
    width: 100%;
    height: 100%;
    border-radius: 8rpx;
  }

  .upload-del-btn {
    position: absolute;
    right: -16rpx;
    top: -14rpx;
    width: 34rpx;
    height: 34rpx;
    border-radius: 100px;
  }

  .upload-progress {
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    color: #fff;
    font-size: 26rpx;
    border-radius: 8rpx;
  }
}

.upload-add-btn {
  position: relative;
  float: left;
  width: 150rpx;
  height: 150rpx;
  z-index: 99;
  border-radius: 8rpx;
  background: #f9f9f9;

  &:before,
  &:after {
    content: ' ';
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 4rpx;
    height: 60rpx;
    background-color: #d6d6d6;
  }

  &:after {
    width: 60rpx;
    height: 4rpx;
  }

  &:active {
    background-color: #f7f7f7;
  }
}

.chose-box {
  width: 750rpx;
  font-size: 36rpx;
  color: #333333;
  background: #f7f7f7;

  .view-item {
    width: 100%;
    line-height: 110rpx;
    text-align: center;
    background: #ffffff;

    &.camera {
      margin-bottom: 1px;
    }

    &.cancle {
      margin-top: 15rpx;
    }
  }
}
</style>
