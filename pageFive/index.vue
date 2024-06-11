<template>
  <view>
    --{{ nodes }}
    <!-- <rich-text nodes="{{nodes}}"></rich-text> -->
  </view>
</template>
  
<script>
import parse from "@rojer/katex-mini";
console.log('aa', parse)
export default {
  data() {
    return {
      nodes: [],
      latex: "若函数f(x) = 若函数f(x) = \left\{ \begin{array}{l}\frac{{1 - \cos \sqrt x }}{{ax}},x > 0\\b,x \le 0\end{array} \right.在x = 0处连续，则（    ）"
    }
  },
  onShow() {

  },
  onLoad(options) {
    // 参考 katex 的配置
    const katexOption = {
      displayMode: true,
    };
    this.nodes = parse(this.latex, {
      throwError: true, // 为true时，解析失败会抛出错误，否则会直接把错误信息解析为nodes结构展示
      ...katexOption,
    });
    // this.setData({
    //   nodes: parse(this.data.latex, {
    //     throwError: true, // 为true时，解析失败会抛出错误，否则会直接把错误信息解析为nodes结构展示
    //     ...katexOption,
    //   }),
    // });
  },
  methods: {

  }
}
</script>