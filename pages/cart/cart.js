import { getSetting, chooseAddress, openSetting } from '../../utils/asyncApi'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cartList: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  },

  onShow() {
    const address = wx.getStorageSync("address");
    const cartList = wx.getStorageSync("carts") || [];
    this.setCart(cartList)
    this.setData({
      address
    })
  },

  setCart(cartList) {
    let totalPrice = 0
    let totalNum = 0
    let allChecked = true
    cartList.length > 0 ? cartList.forEach(v => {
      if(v.checked) {
        totalPrice += v.num * v.goods_price
        totalNum += v.num
      }else {
        allChecked = false
      }
      return v.checked
    }) : allChecked = false
    this.setData({
      cartList,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync("carts", cartList);
  },

  async handleAddAddress() {
    try {
      const res1 = await getSetting()
      const addresScope = res1.authSetting['scope.address']
      if(addresScope === false) await openSetting()
      let res2 = await chooseAddress()
      res2.allAddress = res2.provinceName+res2.cityName+res2.countyName+res2.detailInfo
      wx.setStorageSync("address", res2);
    } catch (error) {
      console.log(error)
    }
  },

  changeChecked(e) {
    const {cartList} = this.data
    const goodsId = e.currentTarget.dataset.id
    const index = cartList.findIndex(v => v.goods_id === goodsId)
    cartList[index].checked = !cartList[index].checked
    this.setCart(cartList)
  },

  changeAllChecked() {
    let {allChecked, cartList} = this.data
    allChecked = !allChecked
    cartList.forEach(v => v.checked = allChecked)
    this.setCart(cartList)
  },

  handleAddCart(e) {
    const id = e.currentTarget.dataset.id
    const i = e.currentTarget.dataset.step
    const {cartList} = this.data
    cartList.forEach(v => v.goods_id === id && v.num + i > 0 && (v.num += i))
    this.setCart(cartList)
  }
  
})