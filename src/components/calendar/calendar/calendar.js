class Calendar {
    constructor(option) {
        let date = new Date()
        let dateObj = option.initTime
        if (dateObj instanceof Date) {
            date = dateObj;
        }
        this.year = date.getFullYear()
        this.month = date.getMonth() + 1
        this.day = date.getDate()
        this.hour = date.getHours()
        this.minute = date.getMinutes()
        this.thisMonth = false
        this.Option = Object.assign(
            {
                lang: 'zh_cn',    // 默认为 'zh_cn'   当前语言  
                showTime: true,   // 默认为 true      是否展示时间选择 
                accurate: 5,      // 默认每5分钟一档   档可以选 5、10、20、30 ；其他档不管用；当前参数选择，必须在 showTime 为true 的前提下
                showBefore: false // 默认为false      是否允许可以获取之前的时间
            },
            option || {}
        )
        this.lang = this.Option.lang || 'zh_cn'
        this.MonthList = [
            {
                'zh_cn': '一月',
                'enFull': 'January',
                'enshort': 'Jan.'
            },
            {
                'zh_cn': '二月',
                'enFull': 'February',
                'enshort': 'Feb.'
            },
            {
                'zh_cn': '三月',
                'enFull': 'March',
                'enshort': 'Mar.'
            },
            {
                'zh_cn': '四月',
                'enFull': 'April',
                'enshort': 'Apr.'
            },
            {
                'zh_cn': '五月',
                'enFull': 'May',
                'enshort': 'May'
            },
            {
                'zh_cn': '六月',
                'enFull': 'June',
                'enshort': 'Jun.'
            },
            {
                'zh_cn': '七月',
                'enFull': 'July',
                'enshort': 'Jul.'
            },
            {
                'zh_cn': '八月',
                'enFull': 'August',
                'enshort': 'Aug.'
            },
            {
                'zh_cn': '九月',
                'enFull': 'September',
                'enshort': 'Sept.'
            },
            {
                'zh_cn': '十月',
                'enFull': 'October',
                'enshort': 'Oct'
            },
            {
                'zh_cn': '十一月',
                'enFull': 'November',
                'enshort': 'Nov.'
            },
            {
                'zh_cn': '十二月',
                'enFull': 'December',
                'enshort': 'Dec.'
            }
        ]
    }
    // 判断闰年
    runNian(_year) {
        if (_year % 400 === 0 || (_year % 4 === 0 && _year % 100 !== 0)) {
            return true
        }
        return false
    }
    // 本月第一天是周几
    getFirstDay(_year, _month) {
        return new Date(_year, _month - 1, 1).getDay()
    }
    // 获取月份天数
    getMonthDay(_month, _year) {
        let monthDay = 30
        switch (_month) {
            case 1: monthDay = 31; break;
            case 2:
                if (this.runNian(_year)) { monthDay = 29; }
                else { monthDay = 28; }
                break;
            case 3: monthDay = 31; break;
            case 4: monthDay = 30; break;
            case 5: monthDay = 31; break;
            case 6: monthDay = 30; break;
            case 7: monthDay = 31; break;
            case 8: monthDay = 31; break;
            case 9: monthDay = 30; break;
            case 10: monthDay = 31; break;
            case 11: monthDay = 30; break;
            case 12: monthDay = 31; break;
        }
        return monthDay
    }
    // 获取周日 —— 周一 时间
    getDay() {
        let arr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
        if (this.lang === 'en') {
            arr = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thur.', 'Fri.', 'Sat.']
        }
        return arr
    }
    // 当月日历列表
    getCalendarList(_year, _month) {
        var monthDay = this.getMonthDay(_month, _year)
        let i = 0
        let todayObj = new Date();
        let todayTime = new Date(todayObj.getFullYear(), todayObj.getMonth(), todayObj.getDate()).getTime()
        let currentTime = 0
        let calendarArr = [] // 当前月及前后月衔接的数据列表
        let currentMonth = false // 是不是当前日历主要展示的月
        let isToday = false // 是不是当天
        // 当月第一天前的空格
        let prevMonth = (_month - 1) < 1 ? 12 : (_month - 1)
        let prevYear = (_month - 1) < 1 ? (_year - 1) : _year
        // 前月的天数
        let prevMonthDayCount = this.getMonthDay(prevMonth, _year)
        let firstDay = this.getFirstDay(_year, _month)
        // 是否早于今天
        let isEarlierThanToday = false
        let day = 0
        for (i = 1; i <= firstDay; i++) {
            currentMonth = false // 今月
            isToday = false // 今天
            day = prevMonthDayCount - (firstDay - i)
            currentTime = new Date(prevYear, prevMonth - 1, day).getTime()
            isEarlierThanToday = currentTime < todayTime
            calendarArr.push({
                year: prevYear,
                month: prevMonth,
                day,
                isEarlierThanToday,
                isToday,
                currentMonth,
                status: 0
            })
        }
        // 当月遍历加入数组
        for (i = 1; i <= monthDay; i++) {
            //当日的日期
            if (_year === todayObj.getFullYear() && _month === todayObj.getMonth() + 1 && i === todayObj.getDate()) {
                isToday = true
            }
            //其他普通的日期
            else {
                isToday = false
            }
            // 当月
            currentMonth = true
            day = i
            currentTime = new Date(_year, _month - 1, day).getTime()
            isEarlierThanToday = currentTime < todayTime

            // 日期进入 calendar
            calendarArr.push({
                year: _year,
                month: _month,
                day: i,
                isEarlierThanToday,
                isToday,
                currentMonth,
                active: isToday,
                status: 1
            })
        }
        // 下个月应有的天数
        let arrLen = calendarArr.length
        let nextMonthDay = 7 - arrLen % 7
        let nextMonth = (_month + 1) > 12 ? 1 : (_month + 1)
        let nextYear = (_month + 1) > 12 ? (_year + 1) : _year

        for (i = 1; i <= nextMonthDay; i++) {
            currentMonth = false
            isToday = false
            day = i
            currentTime = new Date(nextYear, nextMonth - 1, day).getTime()
            isEarlierThanToday = currentTime < todayTime

            calendarArr.push({
                year: nextYear,
                month: nextMonth,
                day: i,
                isEarlierThanToday,
                isToday,
                currentMonth,
                status: 2
            })
        }
        return calendarArr
    }
    // 每7个为一组分割当月日期列表的数据
    getCalendar7List(_year, _month) {
        let list = this.getCalendarList(_year, _month)
        let temp = []
        let arrLen = list.length
        // 用list 里是否有今天来判断 当前列表是不是本月
        this.thisMonth = !!list.filter(e => {
            return e.isToday
        }).length
        // 遍历本页日期列表；每组7个的而为数组数组
        for (var i = 0; i < arrLen; i++) {
            let len = temp.length
            if (!(i % 7)) {
                temp[len] = [list[i]]
            } else {
                if (temp[len - 1] instanceof Array) {
                    temp[len - 1].push(list[i])
                }
            }
        }
        return temp
    }
    // 获取当前展示的年月
    getCurrentShowYearMonth() {
        let str = ''
        if (this.lang === 'en') {
            str = this.MonthList[this.month - 1]['enFull'] + ' ' + this.year
        }
        str = this.MonthList[this.month - 1]['zh_cn'] + ' ' + this.year
        console.log(str)
        return str
    }
    // 数字单个的个位数，补0 例如 '1' => '01'
    zeroPadding(num) {
        return /^\d{1}$/.test('' + num) ? ('0' + num) : ('' + num)
    }
    // 返回固定格式的时间
    getSerializedTime(year, month, day, hour, minute) {
        let timeStr = ''
        if (this.lang === 'en') {
            timeStr = this.MonthList[month - 1]['enFull'] + ' ' + this.zeroPadding(year) + this.zeroPadding(day)
        } else {
            timeStr = year + '年' + this.zeroPadding(month) + '月' + this.zeroPadding(day) + '日'
        }
        return timeStr += this.zeroPadding(hour) + ':' + this.zeroPadding(minute)
    }
    // 获取完整日历相关数据
    getCalendarData() {
        return {
            list: this.getCalendarList(this.year, this.month),
            calendar7List: this.getCalendar7List(this.year, this.month),
        }
    }
    // 前/后一个月的日历
    getPrevNextMonth(type) {
        if (type === 0) {
            // 前一个月
            let tempMonth = this.month - 1
            if (tempMonth < 1) {
                this.year -= 1
                this.month = 12
            } else {
                this.month = tempMonth
            }
        } else {
            // 后一个月
            let tempMonth = this.month + 1
            if (tempMonth > 12) {
                this.year += 1
                this.month = 1
            } else {
                this.month = tempMonth
            }
        }
    }
    // 获取 0 - 23 时
    getHours() {
        let list = []
        let i = 0
        while (i < 24) {
            list.push({
                value: i,
                type: 'hour'
            })
            i++
        }
        return list
    }
    getMinutes() {
        let step = this.Option.accurate
        let list = []
        let i = 0
        while (i < 60) {
            list.push({
                value: i,
                type: 'minute'
            })
            i += step
        }
        return list
    }
}
export default Calendar
