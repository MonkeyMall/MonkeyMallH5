<template>
  <view class="section-do-list">
    <view :class="[info.questionsType === '0' ? 'danx' : 'duox', 'section-do-list-type']">{{ info.questionsType === '0' ?
      '单选' : '多选' }}</view>
    <view class="question-item">
      <view :class="[info.questionsType === '1' ? 'multiple' : '', 'question-item-cons']">
        <view
          class="question-item-cons-q"
          v-if="info.title"
        >
          <!-- --{{ courseOutlineType }}
          --{{ JSON.stringify(info) }}
          --{{ info.remark }} -->
          <view v-if="courseOutlineType == '2' && info.remark">
            <view
              v-for="(item, index) in info.title"
              :key="index"
              style="display: inline-flex;"
            >
              <text v-if="item.type === 'chinese'">{{ item.nodes }}</text>
              <rich-text
                v-else
                :nodes="item.nodes"
              ></rich-text>
            </view>
          </view>
          <uv-parse
            v-else
            :content="info.title"
          ></uv-parse>
        </view>
        <view
          class="question-item-cons-d"
          v-for="item in info.options"
          :key="item.label"
          @click="selectItem(item)"
        >
          <view :class="[selectval.includes(item.label) ? 'isActive' : '', 'question-item-cons-d-select']">{{ item.label }}
          </view>
          <view class="questionItemDes">
            <!-- {{ item.des }} -->
            <view v-if="courseOutlineType == '2' && info.remark">
              <view
                v-for="(item1, index1) in item.des"
                :key="index1"
                style="display: inline-flex;"
              >
                <text v-if="item1.type === 'chinese'">{{ item1.nodes }}</text>
                <rich-text
                  v-else
                  class="rich-text"
                  :nodes="item1.nodes"
                ></rich-text>
              </view>
            </view>
            <uv-parse
              v-else
              :content="item.des"
            ></uv-parse>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import parse from "@rojer/katex-mini";
console.log('parse', parse)
export default {
  props: {
    // 0 单选 1多选 
    // type: {
    //   type: Number,
    //   default: 0
    // },
    onlyRead: {
      type: Boolean,
      default: false
    },
    rightType: {
      type: String,
      default: 'iconfont'
    },
    infoData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    //0 政治  2数学
    courseOutlineType: {
      type: Number,
      default: 0
    }
  },
  components: {
  },
  created() {
  },
  watch: {
    infoData(n) {
      console.log('执行watch')
      if (!n) return
      let info = JSON.parse(JSON.stringify(n))
      this.info = {
        title: info.questionBankContent ? info.questionBankContent : info.wordName ? info.wordName : '',// info.questionBankContent ? info.questionBankContent : info.wordName ? info.wordName : '',
        questionsType: info.questionsType, // 0 单选 1 多选
        options: [],
        remark: info.remark ? info.remark : ''
      }
      if (this.courseOutlineType == '2') {
        // 数学
        // this.info.title = this.getNodeData('info', 'title')
        this.info.title = this.mathFormulaFn(JSON.parse(JSON.stringify(this.info.title)))
      }

      this.info.options = []
      let options = ['A', 'B', 'C', 'D']

      for (let i = 0; i < options.length; i++) {
        // console.log(22, info['questionsOption' + options[i]])
        let nodes
        if (this.courseOutlineType == '2') {
          // 数学
          info['questionsOption' + options[i]] = this.mathFormulaFn(JSON.parse(JSON.stringify(info['questionsOption' + options[i]])))
          // nodes = parse(this.RegExpFn(info['questionsOption' + options[i]]), {
          //   throwError: true,
          //   displayMode: true,
          // })
          // info['questionsOption' + options[i]] = nodes
        }
        this.info.options.push({
          label: options[i],
          des: info['questionsOption' + options[i]]// info['questionsOption' + options[i]]
        })
      }
      if (info.userAnswer) {
        this.selectval = n.userAnswer ? n.userAnswer.split(',') : []
      } else {
        this.selectval = n.answer ? n.answer.split(',') : []
      }
      // this.selectval = n.userAnswer ? n.userAnswer.split(',') : []
      console.log('info', this.info, this.selectval)
    }
  },
  data() {
    return {
      // type: 1, // 1 单选 2 多选
      info: {
        title: '',
        questionsType: '0', // 0 单选 1 多选
        options: []
      },
      selectval: [],
    }
  },
  mounted() {
    console.log("0-0", this.infoData)
    this.setInfoData(this.infoData)
  },
  methods: {
    // 数学公式字符窜转义
    mathFormulaFn(parsedString) {
      if (!parsedString) return
      let parsedArray = []
      if (parsedString.indexOf('<p>') == -1) {
        console.log('爬的数据')
        parsedArray = parsedString.split("$")
      } else {
        // parsedString = parsedString.replace(/<p>/g, '').replace(/<\/p>/g, '')
        console.log('富文本数据', parsedString)
        return parsedString
      }
      parsedArray = parsedArray.filter(item => item != '')
      var reg = /[\u4e00-\u9fa5\uff01-\uffff]/; // 定义中文的Unicode范围
      let arr = []
      if (parsedArray.length > 0) {
        parsedArray.forEach(item => {
          let obj = {}
          if (!reg.test(item)) { // 公式
            obj.type = 'formula'
            obj.nodes = parse(item, {
              throwError: true,
              displayMode: true,
            })
          } else {
            obj.type = 'chinese'
            obj.nodes = item
          }
          arr.push(obj)
        })
      }
      return arr
    },
    RegExpFn(text) {
      console.log(11, text)
      return text.replace(/\\\\/g, "\\").replace(/\$/g, "")
    },
    // 获取reich node 数据
    getNodeData(obj, attr) {
      const nodes = parse(this.RegExpFn(this[obj][attr]), {
        throwError: true,
        displayMode: true,
      })
      console.log('nodes', nodes, this[obj][attr])
      return nodes
    },
    // 造数据
    setInfoData(n) {
      let info = JSON.parse(JSON.stringify(n))
      console.log('zxzxzx', info)
      if (!info) return
      this.info = {
        title: info.questionBankContent ? info.questionBankContent : '',
        questionsType: info.questionsType, // 0 单选 1 多选
        options: [],
        remark: info.remark ? info.remark : '',
      }
      if (this.courseOutlineType == '2') {
        this.info.title = this.mathFormulaFn(this.info.title)
      }
      this.info.options = []
      let options = ['A', 'B', 'C', 'D']
      for (let i = 0; i < options.length; i++) {
        this.info.options.push({
          label: options[i],
          des: this.courseOutlineType == '2' ? this.mathFormulaFn(info['questionsOption' + options[i]]) : info['questionsOption' + options[i]]
        })
      }
      if (info.userAnswer) {
        this.selectval = n.userAnswer ? n.userAnswer.split(',') : []
      } else {
        this.selectval = n.answer ? n.answer.split(',') : []
      }
      console.log('info', this.info)
    },
    selectItem(item) {
      if (this.onlyRead) return
      if (this.info.questionsType === '0') {
        this.selectval = [item.label]
      } else {
        if (this.selectval.includes(item.label)) {
          this.selectval = this.selectval.filter(val => val !== item.label)
        } else {
          this.selectval.push(item.label)
        }
      }
      this.selectval = this.selectval.sort((a, b) => {
        return a.localeCompare(b)
      })
      console.log('selectval:', this.selectval)
      this.$emit('setResult', this.selectval.join(','))
    },
    initSelect() {
      this.selectval = []
    }
  }
}
</script>

<style lang="scss" scoped>
.question-item-cons-q {
  overflow-x: scroll;
}

.section-do-list {
  padding: 30rpx;
  background: $uni-text-color-inverse;

  &-type {
    width: 104rpx;
    line-height: 40rpx;
    border-radius: 8rpx;
    font-size: 26rpx;
    font-weight: 400;
    text-align: center;
    margin-bottom: 32rpx;
    color: $uni-color-primary;
    background: rgba(255, 247, 248, 1);

    &.duox {
      color: rgba(43, 199, 160, 1);
      background: rgba(224, 246, 245, 1);
    }
  }

  .question-item {
    font-size: 32rpx;
    font-weight: 400;
    color: $uni-text-color;

    &-cons.multiple {
      .question-item-cons-d {
        display: flex;

        .question-item-cons-d-select {
          border-radius: 8rpx;
        }
      }
    }

    &-cons {
      &-d {
        @include alignCenter;
        margin-top: 32rpx;

        &-select {
          width: 44rpx;
          height: 44rpx;
          line-height: 42rpx;
          text-align: center;
          border-radius: 50%;
          font-size: 28rpx;
          font-weight: 400;
          margin-right: 24rpx;
          color: $uni-text-color-grey;
          border: 2rpx solid $uni-gray-color-border;

          &.isActive {
            color: $uni-text-color-inverse;
            background: $uni-bg-color-select;
            border: 2rpx solid $uni-bg-color-select;
            box-shadow: 0px 2rpx 6rpx $uni-bg-color-select-shaw;
          }

          &.error {
            color: $uni-text-color-inverse;
            background: $uni-color-primary;
          }
        }

        .questionItemDes {
          flex: 1;
          width: 300rpx;
        }
      }
    }
  }
}
</style>
