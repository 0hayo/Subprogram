import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id:0,
      name:"综合",
      isActive: true
    },{
      id:1,
      name:"销量",
      isActive: false
    },{
      id:2,
      name:"价格",
      isActive: false
    }],
    goodsList: [],
    refresherTriggered:false
  },

  queryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },

  totalPages: 0,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryParams.cid = options.cid
    this.getGoodsList()
  },

  // 点击tabs
  handleTab(e) {
    const { index } = e.detail
    let { tabs } = this.data
    tabs.forEach((v,i) => index === i ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })
  },

  // 获取商品数据
  async getGoodsList() {
    const res = await request({
      url: '/goods/search',
      data: this.queryParams
    })
    this.totalPages = Math.ceil(res.total / this.queryParams.pagesize)
    this.setData({
      // goodsList: this.data.goodsList.concat(res.goods)
      goodsList: [...this.data.goodsList, ...res.goods],
      refresherTriggered: false
    })
    // wx.stopPullDownRefresh()
  },

  // 滚动触底触发
  scrolltolower() {
    if(this.queryParams.pagenum < this.totalPages) {
      this.queryParams.pagenum ++
      this.getGoodsList()
    }else{
      wx.showToast({
        icon: 'none',
        title: '没有更多商品啦'
      })
    }
  },

  // 下拉刷新
  refresherrefresh() {
    this.queryParams.pagenum = 1
    this.setData({
      goodsList: []
    })
    this.getGoodsList()
  }

})