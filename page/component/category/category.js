const app = getApp()
Page({
    data: {
        detail:[],
        curIndex: 0,
        isScroll: true,
        toView: 'shucai',
        scrollTop:0,
        winH:''
    },
    onLoad: function(){
        var that = this;
        wx.getSystemInfo({
          success: function (res) {
            that.setData({winH:res.windowHeight})
          }
        })

        wx.request({
            url:'http://qxu1635890195.my3w.com/API/catedetail.txt',
            success(res){
                console.log(res.data),
                that.setData({
                    detail : res.data
                })
            }
        });
        
    },
    scroll: function (e) {
      var i = e.detail.scrollTop / this.data.winH;
      this.setData({
        curIndex: Math.round(i)
      })
    },
    switchTab(e){
        this.setData({
            toView : e.target.dataset.id,
            curIndex : e.target.dataset.index,
            scrollTop: this.data.winH * this.data.curIndex
        })
    },
  go: function (e) {
    var info = JSON.stringify(e.currentTarget.dataset.info);
    wx.navigateTo({
      url: '../details/details?info=' + info,
    })
  }
    
})
