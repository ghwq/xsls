Page({
  data:{
    goods:'',
    num: 1,
    totalNum: 0,
    hasCarts: false,
    curIndex: 0,
    show: false,
    scaleCart: false,
    cart: []
  },
  onLoad: function (options) {
    var info = JSON.parse(options.info)
    console.log(info)
    this.setData({
      goods: info
    })
  },
  onShow(){
    var that = this;
    wx.getStorage({
      key: 'goods',
      success: function (res) {
        console.log(res.data)
        that.setData({
          cart: res.data
        })
      }
    })
    console.log(this.data.cart)
  },
  addCount() {
    let num = this.data.num;
    num++;
    this.setData({
      num : num
    })
  },

  addToCart() {
    const that = this;
    const num = this.data.num;
    let total = this.data.totalNum;
    let good = {
      name: this.data.goods.name, image: this.data.goods.thumb, num: num, price: this.data.goods.price, selected: true
    }
    
    this.data.cart.push(good)

    that.setData({
      show: true
    })
    setTimeout( function() {
      that.setData({
        show: false,
        scaleCart : true
      })
      setTimeout( function() {
        that.setData({
          scaleCart: false,
          hasCarts : true,
          totalNum: num + total
        })
      }, 200)
    }, 300)

    wx.setStorage({
      key: 'goods',
      data: that.data.cart
    })

  },

  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
    })
  }
 
})
