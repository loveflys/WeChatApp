//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '陈安一大帅逼！！',
    data: {},
    showModal: false,
    shop: null,
    pro: null,
    sendTime: null,
    percent: null,
    bus: null,
    daybus: null,
    circle: null,
    date: null,
    firstAmount: '',
    allAmount: '',
  },
  bindShopInput: function(e) {
    this.setData({
      shop: e.detail.value
    })
  },
  bindProInput: function(e) {
    this.setData({
      pro: e.detail.value
    })
  },
  bindPercentInput: function(e) {
    this.setData({
      percent: e.detail.value
    })
  },
  bindBusInput: function(e) {
    this.setData({
      bus: e.detail.value
    })
  },
  bindDayBusInput: function(e) {
    this.setData({
      daybus: e.detail.value
    })
  },
  bindCircleInput: function(e) {
    this.setData({
      circle: e.detail.value
    })
  },
  bindDateInput: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  //事件处理函数
  formSubmit: function(event) {
    let price = Number(this.data.shop) + Number(this.data.pro);
    let firstAmount = price * this.data.bus;
    //每批零食市值
    let proPrice = Number(this.data.pro)/(1-(Number(this.data.percent)/100));
    //每批利润
    let earn = proPrice * (Number(this.data.percent)*0.01);
    let sendTime = parseInt(Number(this.data.date)/Number(this.data.circle));     
    let Amount = 0;
    let data = [];
    let shopNum = Number(this.data.daybus);
    let manageAmount = 0; //总营业额
    let managePrice = 0; //总成本
    let manageEarn = 0; //总利润
    for(let i = 1; i <= this.data.date; i++) {
      //每日总营业额/家
      let dayAmount = proPrice/Number(this.data.circle);
      //每日零食成本/家
      let dayPrice = Number(this.data.pro)/Number(this.data.circle);
      //每日利润/家
      let dayEarn = earn/Number(this.data.circle);
      //货架价格
      let startAmount = Number(this.data.shop);
      managePrice += (startAmount+Number(this.data.pro))*Number(this.data.daybus);
      if (shopNum > 0) {     
        manageAmount += dayAmount*shopNum;
        for(let t = 0; t < data.length; t++) {
          if ((i-data[t].firstTime)%Number(this.data.circle)==0) {
            managePrice += Number(this.data.pro);
          }
        }
        manageEarn += dayEarn*shopNum;
      }
      data.push({
        firstTime: i,
        dayAmount: (dayAmount*shopNum).toFixed(2),
        dayPrice: (dayPrice*shopNum).toFixed(2),
        dayEarn: (dayEarn*shopNum).toFixed(2),
        manageAmount: manageAmount.toFixed(2),
        managePrice: managePrice.toFixed(2),
        manageEarn: manageEarn.toFixed(2)
      })
      shopNum += Number(this.data.daybus);
      if (i == this.data.date) {
        console.log("开户费用==>>"+ firstAmount.toFixed(2));
        console.log("配送次数==>>"+sendTime);
        console.log("营业额==>>"+manageAmount);
        console.log("总利润==>>"+manageEarn);
        console.log("总费用===>>>"+ managePrice.toFixed(2));
        this.setData({
          data: {
            list: data,
            firstAmount: firstAmount.toFixed(2),
            sendTime: sendTime,
            manageAmount: manageAmount.toFixed(2),
            manageEarn: manageEarn.toFixed(2),
            managePrice: managePrice.toFixed(2)
          },
          showModal: true,
        });
      }
    }
  },
  closeModal: function () {
    this.setData({
      showModal: false,
    });
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          width: res.windowWidth,
          height: res.windowHeight
        })
      }
    })
  }
})
