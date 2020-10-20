import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  data: {
    leftMenuList: [],
    rightContent:[],
    menuIndex:0,
    scrollTopRight:0
  },

  cates:[],

  onLoad: function (options) {
    const cates = wx.getStorageSync('cates');
    if(!cates) {
      this.getCatesList()
    }else if(Date.now() - cates.time > 1000*10){
      this.getCatesList()
    }else {
      this.cates = cates.data
    }
  },

  async getCatesList() {
    // request({
    //   url: '/categories'
    // }).then((res) => {
    //   this.cates = res.data.message
    //   wx.setStorageSync('cates', {time: Date.now(), data: this.cates});
    //   const leftMenuList = this.cates.map(v => v.cat_name)
    //   const rightContent = this.cates[0].children
    //   this.setData({
    //     leftMenuList,
    //     rightContent
    //   })
    // })

    const res = await request({
      url: '/categories'
    })
    this.cates = res
    wx.setStorageSync('cates', {time: Date.now(), data: this.cates});
    const leftMenuList = this.cates.map(v => v.cat_name)
    const rightContent = this.cates[0].children
    this.setData({
      leftMenuList,
      rightContent
    })
  },

  handleItemTap(e){
    const menuIndex = e.currentTarget.dataset.index
    const rightContent = this.cates[menuIndex].children
    this.setData({
      menuIndex,
      rightContent,
      scrollTopRight:0
    })
  }

})