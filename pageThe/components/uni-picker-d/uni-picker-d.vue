<template>
  <view class="UniPickerD">
    <slot></slot>
    <uni-data-picker v-model="seedValue" :localdata="grouLsita" keyName="label" popup-title="请选择" @change="handChange"
      :clear-icon="true" class="picker" :isReset="true" @nodeReset="nodeReset"></uni-data-picker>
  </view>
</template>
<script>
import uniDataPicker from "@/pageThe/components/uni-data-picker/components/uni-data-picker/uni-data-picker.vue"
export default {
  name: 'UniPickerD',
  options: {
    styleIsolation: 'shared'
  },
  props: {
    value: { type: String },
    grouLsita: {
      type: Array,
      default: []
    }
  },
  components: { uniDataPicker },
  data() {
    return {
      seedValue: this.value
    }
  },
  onLoad() { },
  onShow() { },
  mounted() { },
  methods: {
    handChange(e) {
      this.$emit('onchange', e)
    },
    nodeReset() {
      this.seedValue = '';
      this.$emit('nodeReset')
    }
  }
}
</script>

<style lang="scss" scoped>
.UniPickerD {
  position: relative;

  .picker {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;

    // background-color: red;
    /deep/ .input-value-border {
      border: none !important;

      .placeholder,
      .arrow-area {
        display: none;
      }

      .selected-item {
        display: none;
      }
    }

  }
}
</style>