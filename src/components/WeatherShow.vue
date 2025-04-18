<template >
	<div class="home-index-box" v-loading="loading">
		<div class="graph-doubleLine-warp">
			<el-row :gutter="20">
				<el-col :span="16">
					<div class="selection-box">
						气温趋势图:
					</div>
				</el-col>
				<el-col :span="8">
					<div class="selection-box">
						<el-date-picker @change="getWeather($event)" @calendar-change="calendarChange" v-model="selectGatheringTime" type="datetimerange" range-separator="至"
							start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss">
						</el-date-picker>
					</div>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="24">
					<div id="home_DoubleLine" style="width: 100%;height: 250px;"></div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>
<script>
import ECharts from 'echarts'

const lineDefaultOpt = {
	tooltip: {
		trigger: 'axis'
	},
	legend: {
		bottom: 0,
		left: 'center'
	},
	grid: {
		left: 30,
		bottom: 50,
		containLabel: true
	},
	toolbox: {
		feature: {
			saveAsImage: {}
		}
	},
	xAxis: {
		type: 'category',
		boundaryGap: false,
		axisLine: {
			lineStyle: {
				color: ['#666666'],
				width: 1,
				type: 'solid'
			}
		}
	},
	yAxis: {
		type: 'value',
		boundaryGap: ['0%', '20%'],
		axisLine: {
			lineStyle: {
				color: ['#666666'],
				width: 1,
				type: 'solid'
			}
		},
		splitLine: {
			show: true,
			lineStyle: {
				color: '#C4C4C4',
				width: 1,
				type: 'dashed'
			}
		}
	},
	series: []
}
export default {
	data() {
		return {
		  date: [],
			loading: false,
			doubleLineOption: lineDefaultOpt,
			selectGatheringTime: []
		}
	},
	mounted() {
		this.getDoubleLineData()
	},
	methods: {
	  // 返回最近七天的日期
    getDateBeforeSevenDays() {
      let dateItem = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);	// 使用当天时间戳减去以前的时间毫秒（小时*分*秒*毫秒）
      let y = dateItem.getFullYear();	// 获取年份
      let m = dateItem.getMonth() + 1;	// 获取月份js月份从0开始，需要+1
      let d = dateItem.getDate();	// 获取日期
      m = this.addDate0(m);	// 给为单数的月份补零
      d = this.addDate0(d);	// 给为单数的日期补零
      return y + '-' + m + '-' + d;
    },
    // 获取最近七天的日期
    getDate() {
      let now = new Date();
      let y = now.getFullYear();	// 获取年份
      let m = now.getMonth() + 1;	// 获 取月份js月份从0开始，需要+1
      let d = now.getDate();	// 获取日期
      return y + '-' + m + '-' + d;
    },
    // 给日期加0
    addDate0(time) {
      if (time.toString().length === 1) {
        time = '0' + time.toString();
      }
      return time;
    },
    async getWeather(dates) {
		  this.date = dates
			// const { data: res } = await this.$http.get('weather/' + dates[0] + '/' + dates[1])
			// console.log(res)
      const { data: res } = await this.$http.get('weather/' + dates[0] + '/' + dates[1])
      console.log(res)
      if (res.code !== 0) {
        return this.$message.error('获取折线图数据失败！')
      }
      const arr = res.data.temperatureList
      const arr2 = res.data.dateList
      const list = [{
        name: '温度',
        type: 'line',
        symbol: 'circle',
        symbolSize: [5, 5],
        data: arr
      },
        {
          name: '订单数',
          type: 'line',
          symbol: 'circle',
          symbolSize: [5, 5],
          data: arr2
        }]
      this.doubleLineOption.series = list
      this.doubleLineOption.xAxis.data = arr2
      this.eChartsInit('home_DoubleLine', 'light', this.doubleLineOption)
		},
    calendarChange(dates) {
      // 记录选择的开始日期，方便后面根据开始日期限定结束日期
      let hasSelectDate = dates !== null && dates.length > 0
      this.startDate = hasSelectDate ? dates[0] : null
    },

		eChartsInit(domId, theme, opt) {
			ECharts.init(document.getElementById(domId), theme).setOption(opt)
			window.addEventListener('resize', () => {
				ECharts.init(document.getElementById(domId), theme).resize()
			})
		},

		async getDoubleLineData() {
		  // 获取最近七天的时间
      const { data: res } = await this.$http.get('weather/' + this.getDateBeforeSevenDays() + '/' + this.getDate())
      // const { data: res } = await this.$http.get('weather/2024-03-17 1:00:00/2024-03-17 19:00:00')
			console.log(res)
			if (res.code !== 0) {
				return this.$message.error('获取折线图数据失败！')
			}
			const arr = res.data.temperatureList
			const arr2 = res.data.dateList
			const list = [{
				name: '温度',
				type: 'line',
				symbol: 'circle',
				symbolSize: [5, 5],
				data: arr
			},
			{
				name: '订单数',
				type: 'line',
				symbol: 'circle',
				symbolSize: [5, 5],
				data: arr2
			}]
			this.doubleLineOption.series = list
			this.doubleLineOption.xAxis.data = arr2
			this.eChartsInit('home_DoubleLine', 'light', this.doubleLineOption)
		}
	}
}
</script>

<style lang="sass" scoped>

</style>
