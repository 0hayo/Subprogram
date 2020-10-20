import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsInfo: []
  },

  queryParams: {
    goods_id: 0
  },

  goodsData: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryParams.goods_id = options.goods_id
    this.getGoodsInfo()
  },

  async getGoodsInfo() {
    const goodsInfo = await request({
      url: "/goods/detail",
      data: this.queryParams
    })
    this.goodsData = goodsInfo
    this.setData({
      goodsInfo: {
        pics: goodsInfo.pics,
        goods_price: goodsInfo.goods_price,
        goods_name: goodsInfo.goods_name,
        goods_introduce: goodsInfo.goods_introduce.replace(/\.webp/g, ".jpg")
      }
    })
  },

  handleImage(e) {
    const urls = this.goodsData.pics.map(v => v.pics_mid_url)
    const index = e.currentTarget.dataset.index
    wx.previewImage({
      current: index,
      urls: urls
    });
  },

  handleAddGoods() {
    let carts = wx.getStorageSync('carts') || [];
    const index = carts.findIndex(v => v.goods_id === this.goodsData.goods_id)
    if(index === -1) {
      this.goodsData.num = 1
      this.goodsData.checked = true
      carts.push(this.goodsData)
    }else {
      carts[index].num ++
    }
    wx.setStorageSync('carts', carts);
    wx.showToast({
      title: '加入成功',
      icon: 'none',
      mask: true
    })
  }

})