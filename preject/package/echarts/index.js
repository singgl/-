import * as echarts from '../ec-canvas/echarts';

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: '#2c343c',
    title: {
      text: 'Customized Pie',
      left: 'center',
      top: 20,
      textStyle: {
        color: '#ccc'
      }
    },

    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },

    visualMap: {
      show: false,
      min: 80,
      max: 600,
      inRange: {
        colorLightness: [0, 1]
      }
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['50%', '50%'],
        data: [
          { value: 335, name: '直接访问' },
          { value: 310, name: '邮件营销' },
          { value: 274, name: '联盟广告' },
          { value: 235, name: '视频广告' },
          { value: 400, name: '搜索引擎' }
        ].sort(function (a, b) { return a.value - b.value; }),
        roseType: 'radius',
        label: {
          normal: {
            textStyle: {
              color: 'rgba(255, 255, 255, 0.3)'
            }
          }
        },
        labelLine: {
          normal: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.3)'
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          }
        },
        itemStyle: {
          normal: {
            color: '#c23531',
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },

        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return Math.random() * 200;
        }
      }
    ]
  };

  chart.setOption(option);
  return chart;
}

function initCharts(canvas, width, height, value) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: '#8e8e8e',
    series: [
      {
        name: '',
        type: 'gauge',
        radius: '80%',
        animationDuration: 5000,
        animationThreshold: 8000,
        animationDelay: 10,
        startAngle: 245,
        endAngle: -65,
        min: 0,
        max: 500,
        splitNumber: 1,
        axisLine: {
          show: true,
          lineStyle: {
            color: [[0, '#eee'], [1, '#eee']],
            width: 8
          }
        },
        axisTick: {            // 坐标轴小标记
          length: 1,           // 属性length控制线长
          lineStyle: {         // 属性lineStyle控制线条样式
            color: 'auto'
          }
        },
        splitLine: {           // 分隔线
          length: 12,          // 属性length控制线长
          lineStyle: {         // 属性lineStyle（详见lineStyle）控制线条样式
            color: 'auto'
          }
        },
        axisLabel: { show: false },
        splitLabel: { show: false },
        pointer: { show: false },
        itemStyle: {
          borderWidth: 8,
          color: '#333',
        },
        title: {
          offsetCenter: [0, '30%'],
          color: '#FFFFFF',
          fontSize: 25,
          fontWeight: 700
        },
        detail: {
          formatter: function (e) {
            var { color, level } = detectionData(e);
            console.log(color)
            console.log(level)
            return level;
          },
          color: '#fff',
          fontSize: 18,
          offsetCenter: [0, '20%'],
          lineHeight: 30
        },
        data: [{ value: '0', name: '' }]
      }
    ],
  };

  update(value,option)

  chart.setOption(option, true);

  console.log(chart,"------------")

  return chart;
}
function detectionData(air) {
  var color = new echarts.graphic.LinearGradient(0, 0, 1, 1,
    [{
      offset: 0,
      color: '#79E73C'
    }, {
      offset: 1,
      color: '#79E73C'
    }]);
  var level = '优'
  if (air > 100 && air <= 200) {
    color = new echarts.graphic.LinearGradient(0, 0, 1, 1,
      [{
        offset: 0,
        color: '#FFD800'
      }, {
        offset: 1,
        color: '#FFD800'
      }]);
  var level = '良'
  } else if (air > 200 && air <= 300) {
    color = new echarts.graphic.LinearGradient(0, 0, 1, 1,
      [{
        offset: 0,
        color: '#FF9000'
      }, {
        offset: 1,
        color: '#FF9000'
      }]);
  var level = '轻度污染'
  } else if (air > 300 && air <= 350) {
    color = new echarts.graphic.LinearGradient(0, 0, 1, 1,
      [{
        offset: 0,
        color: '#FF2A00'
      }, {
        offset: 1,
        color: '#FF2A00'
      }]);
  var level = '中度污染'
  } else if (air > 350 && air <= 400) {
    color = new echarts.graphic.LinearGradient(0, 0, 1, 1,
      [{
        offset: 0,
        color: '#EB007F'
      }, {
        offset: 1,
        color: '#EB007F'
      }]);
  var level = '重度污染'
  } else if (air > 400) {
    color = new echarts.graphic.LinearGradient(0, 0, 1, 1,
      [{
        offset: 0,
        color: '#C7021D'
      }, {
        offset: 1,
        color: '#C7021D'
      }]);
  var level = '严重污染'
  }
  console.log(color, level)
  return {
    color: color,
    level: level
  };
}

function update(value, option) {
  var { color, level } = detectionData(value);
  option.series[0].data[0].value = value;
  option.series[0].data[0].name = `\n\n${value}`;
  //这里颜色跟着改变
  option.series[0].axisLine.lineStyle.color[0][0] = value / 500;
  option.series[0].axisLine.lineStyle.color[0][1] = color;
}

// 分包只能引用自身文件

Page({
  data: {
    ec: {}
  },
  onLoad: function() {
    

    wx.showLoading({
      title: "加载中...",
      mask: true
    })
  },
  onReady: function () {

  },
  onShow: function () {
    wx.hideLoading()
  },


  echartInit(e) {
    initChart(e.detail.canvas, e.detail.width, e.detail.height);
  },

  echartInits(e) {
    console.log(e,"-------------")
    initCharts(e.detail.canvas, e.detail.width, e.detail.height,120);
  }
});
