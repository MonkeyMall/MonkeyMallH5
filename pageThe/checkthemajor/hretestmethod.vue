<!--
 * @Author: lili.liang oncwnuLfMdJTJ1uB8pjgINGPT0Rs@git.weixin.qq.com
 * @Date: 2023-12-08 09:29:37
 * @LastEditors: lili.liang oncwnuLfMdJTJ1uB8pjgINGPT0Rs@git.weixin.qq.com
 * @LastEditTime: 2024-01-05 16:20:02
 * @FilePath: \RuoYi-App-master\pageThe\checkthemajor\hretestmethod.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<view class="hretestmethod">
		<view class="tabsa">
			<view class="h1" >
				<view class="borleds">
				</view>
				<view class="titless">
					复试方法
				</view>
			</view>
			<view class="textp">
        <uv-parse :content="content"></uv-parse>
			</view>

    </view>
  </view>
</template>

<script>
import {
  findInfo, subjectRcist
} from "@/api/colleges/index"
export default {
  props: ['schoolId', 'specialtyId'],
  data() {
    return {
      content: ''
    }
  },
  onLoad() {
    // this.getUser()
  },
  onShow() {

		},
    mounted() {
      this.getFindInfo()
    },
		methods: {
      getFindInfo(){
        findInfo({
          schoolId:this.schoolId,
          specialtyId:this.specialtyId,
        }).then(res => {
          if(res.code === 200){
            this.content = res.msg
          }
        })
      }
		}
	}
</script>

<style lang="scss">
.hretestmethod {
}
</style>