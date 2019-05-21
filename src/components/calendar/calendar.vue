<template>
  <div>
    <div class="calendar-timer">
        <div class="calendar">
            <div class="calendar-nav">
                <div class="prev font24" @click="monthChange(0)">
                  <!-- <i class="iconfont iconicon1" /> -->
                  &lt;
                </div>
                <div class="title">{{calendarNavTitle}}</div>
                <div class="next font24" @click="monthChange(1)">
                  <!-- <i class="iconfont iconicon1" /> -->
                  &gt;
                </div>
            </div>
            <div class="calendar-day-title">
              <div v-for="(item, index) in arrTitleDay" :key="index">{{item}}</div>
            </div>
            <div class="calendar-day-wrapper">
              <div class="day-item-wrapper" v-for="(item, index) in list" :key="index">
                <div class="day-item" v-for="(itemColumn, itemIndex) in item" :key="itemIndex" @click="dayClick(itemColumn)"
                 :class="{
                   'cur': itemColumn.isToday, 
                   'other-month': !itemColumn.currentMonth, 
                   'day-earlier': itemColumn.isEarlierThanToday,
                   'active': itemColumn.active
                 }">{{itemColumn.day}}</div>
              </div>
            </div>
        </div>
        <div class="time-wrapper">
            <div class="time-title">选择时间</div>
            <div class="time-list-wrapper">
                <div class="time-item">
                    <div class="time-item-icon" @click="timeArrowScroll(0)">
                        <!-- <i class="iconfont iconicon1" /> -->
                        <span>&lt;</span>
                    </div>
                    <div class="inner-wrapper" ref="hourEl">
                        <div class="frage" v-for="(item, index) in hours" @click="hourClick(index)" :class="{'active': item.value === selectTimeDate.hour}" :key="index">{{item.value}}</div>
                    </div>
                    <div class="time-item-icon" @click="timeArrowScroll(1)">
                        <!-- <i class="iconfont iconicon1" /> -->
                        <span>&lt;</span>
                    </div>
                </div>
                <div class="time-item">
                    <div class="time-item-icon" domtype="minute1" @click="timeArrowScroll(2)">
                        <!-- <i class="iconfont iconicon1" /> -->
                        <span>&lt;</span>
                    </div>
                    <div class="inner-wrapper" ref="minuteEl">
                      <div class="frage" v-for="(item, index) in minutes" @click="minuteClick(index)" :class="{'active': item.value === selectTimeDate.minute}"  :key="index">{{item.value}}</div>
                    </div>
                    <div class="time-item-icon" @click="timeArrowScroll(3)">
                        <!-- <i class="iconfont iconicon1" /> -->
                        <span>&lt;</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
  import Calendar from './calendar/calendar.js'

  export default {
    name: 'calendar',
    props: {
      initOption: Object
    },
    data() {
      return {
        // 日历需要配置的必要参数
        option: {
          lang: "en",    // 默认为 "zh_cn"   当前语言  
          showTime: true,   // 默认为 true      是否展示时间选择 
          accurate: 5,      // 默认每5分钟一档   档可以选 5、10、20、30 ；其他档不管用；当前参数选择，必须在 showTime 为true 的前提下
          showBefore: false // 默认为false      是否允许可以获取之前的时间
        },
        calendar: null, // 实例化日历类
        calendarNavTitle: "", // 顶部标题时间
        arrTitleDay: [], // 顶部周列表
        list: [], // 日历日列表主体部分
        hours: [],
        minutes: [],
        selectTimeDate: {}, // 选中的小时、分钟
      }
    },
    mounted() {
      this.option = Object.assign(this.option, this.initOption)
      this.calendar = new Calendar(this.option)
      this.calendarInit()
      this.$nextTick(() => {
        this.hours.map((e, i) => {
          this.calendar.hour === e.value && this.hourClick(i)
        })
        this.minutes.map((e, i) => {
          this.calendar.minute === e.value && this.minuteClick(i)
        })
      })
    },
    methods: {
      calendarInit() {
        // 顶部标题
        this.calendarNavTitle = this.calendar.getCurrentShowYearMonth()

        // 顶部 周列表
        this.arrTitleDay = this.calendar.getDay()

        // 获取完整日历相关数据
        let calendarData = this.calendar.getCalendarData()
 
        // 获取当前日历列表 并添加 active 属性
        this.list = calendarData.calendar7List
        // 时间列表
        // todo: 时间点击事件
        this.hours = this.calendar.getHours()
        this.minutes = this.calendar.getMinutes()
        this.selectActive()
        this.getDateTimeResult()
      },
      // 点击某一天
      dayClick(item) {
        let day = item.day
        let month = item.month
        let year = item.year
        // 首先判断是否允许选择早于今天的日期
        if (!this.option.showBefore && item.isEarlierThanToday) {
          alert("这个日期早于当前日期")
          return
        }
        // 用status 判断是不是当月，不是的话前后切换日历
        let status = item.status
        if (status !== 1) {
          let type = status ? 1 : 0
          this.monthChange(type, day)
        } else {
          // 当月的直接赋值
          this.calendar = Object.assign(this.calendar, {
            day: day,
            year: year,
            month: month
          })
        }
        this.selectActive()
        this.getDateTimeResult()
      },
      // 点击左右切换月份
      monthChange(type, day) {
        // 处理 跳转到早于当前月，且这个月不能被选的时候不准跳转
        if (!this.option.showBefore && this.calendar.thisMonth && !type) {
          return
        }
        this.calendar.getPrevNextMonth(type)
         // 获取完整日历相关数据
        let calendarData = this.calendar.getCalendarData() 
        // 获取当前日历列表
        this.list = calendarData.calendar7List
        // 切换月份 day 重置为 1 防止出现类似 选中day 为31 但是切换目的月为30 之类的情况
        let changeMonthDay = day || 1
        if (this.calendar.thisMonth) {
          changeMonthDay = new Date().getDate()
        }
        this.calendar.day = changeMonthDay
        this.selectActive()
        // 顶部标题
        this.calendarNavTitle = this.calendar.getCurrentShowYearMonth()
      },
      // 选中的日期加active 
      selectActive() {
        let calendar = this.calendar
        let year = calendar.year
        let month = calendar.month
        let day = calendar.day
        if (year && month && day) {
          this.list.map(l => {
            l.map(e => {
              if( e.day === day && e.month === month && e.year === year ) {
                e.active = true
              } else {
                e.active = false
              }
            })
          })
        }
      },
      // 点击上下箭头切换 小时或分钟
      timeArrowScroll(type) {
        let ref = this.$refs
        let hour = ref.hourEl
        let minute = ref.minuteEl
        switch(type) {
          case 0: 
            hour.scrollTop += 170
            break;
          case 1: 
            hour.scrollTop -= 170
            break;
          case 2: 
            minute.scrollTop += 170
            break;
          case 3: 
            minute.scrollTop -= 170
            break;
        }
      },
      // 点击小时置顶
      hourClick(index) {
        let ref = this.$refs
        let hour = ref.hourEl
        let item = hour.childNodes[index]
        if (item) {
          hour.scrollTop = item.offsetTop
          this.calendar.hour = this.hours[index].value
          this.getDateTimeResult()
        }
      },
      // 点击分钟置顶
      minuteClick(index) {
        let ref = this.$refs
        let minute = ref.minuteEl
        let item = minute.childNodes[index]
        if (item) {
          minute.scrollTop = item.offsetTop
          this.calendar.minute = this.minutes[index].value
          this.getDateTimeResult()
        }
      },
      // 选中的时间 天 和 时分 分开选的
      getDateTimeResult() {
        let calendar = this.calendar
        let year = calendar.year
        let month = calendar.month
        let day = calendar.day
        let hour = calendar.hour
        let minute = calendar.minute
        minute = (minute - minute%5 ) + Math.round(minute%5 / 5) * 5
        calendar.minute = minute
        let dateTimeStr = year + "年" + this.zeroPadding(month) + "月" + this.zeroPadding(day) + "日 " + this.zeroPadding(hour) + ":" + this.zeroPadding(minute)
        if (this.option.lang !== "zh_cn") {
          let yearMonth = calendar.getCurrentShowYearMonth()
          dateTimeStr = yearMonth + " "+ day + " " + this.zeroPadding(hour) + ":" + this.zeroPadding(minute)
        }
        this.selectTimeDate = {year, month, day, hour, minute, dateTimeStr}
        this.$emit('change', this.selectTimeDate)
      },
      // 数字单个的个位数，补0 例如 '1' => '01'
      zeroPadding(num) {
        return /^\d{1}$/.test('' + num) ? ('0' + num) : ('' + num)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url(./calendar/base.css);
</style>
