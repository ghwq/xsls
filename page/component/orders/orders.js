Page({
  data:{
    address:{},
    hasAddress: false,
    total:0,
    orders:[
        {id:1,title:'新鲜芹菜 半斤',image:'/image/s5.png',num:4,price:0.01},
        {id:2,title:'素米 500g',image:'/image/s6.png',num:1,price:0.03}
      ]
  },
  onLoad(options){
    var good = JSON.parse(options.good)
    console.log(good)
    this.setData({
      orders:good
    })
  },
  onReady() {
    this.getTotalPrice();
  },
  
  onShow:function(){
    const self = this;
    wx.getStorage({
      key:'address',
      success(res) {
        self.setData({
          address: res.data,
          hasAddress: true
        })
      }
    })
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let orders = this.data.orders;
    let total = 0;
    for(let i = 0; i < orders.length; i++) {
      total += orders[i].num * orders[i].price;
    }
    this.setData({
      total: total
    })
  },

  toPay(e) {
    console.log(e)
    wx.showToast({
      title: '支付成功,共'+e.currentTarget.dataset.pay+'元',
      icon: 'succes',
      duration: 1000,
      mask: true
    })
    wx.setStorage({
      key: 'goods',
      data: []
    })
  }
})
