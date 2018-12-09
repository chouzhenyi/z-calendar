<template>
  <div>
    <calendar :init-option="calendarOption"></calendar>
  </div>
</template>

<script>

import calendar from './calendar/calendar.vue'
export default {
  name: 'home',
  props: {
  },
  components: {
    calendar
  },
  computed: {
    calendarOption() {
      return {
        lang: "zh_cn",    // 默认为 "zh_cn"   当前语言  
        showTime: true,   // 默认为 true      是否展示时间选择 
        accurate: 5,      // 默认每5分钟一档   档可以选 5、10、20、30 ；其他档不管用；当前参数选择，必须在 showTime 为true 的前提下
        showBefore: true, // 默认为false      是否允许可以获取之前的时间
        initTime: new Date(2017,9, 1, 8,8,8)
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
