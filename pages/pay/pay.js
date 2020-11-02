import { getSetting, chooseAddress, openSetting, showModal, showToast } from '../../utils/asyncApi'
import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from "../../request/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cartList: [],
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
    let cartList = wx.getStorageSync("carts") || [];
    cartList = cartList.filter(v => v.checked)
    let totalPrice = 0
    let totalNum = 0
    cartList.forEach(v => {
      totalPrice += v.num * v.goods_price
      totalNum += v.num
    })
    this.setData({
      cartList,
      totalPrice,
      totalNum,
      address
    })
  },

  async handleOrderPay() {
    const token = wx.getStorageSync("token");
    if(!token) {
      wx.navigateTo({
        url: '/pages/auth/auth',
        success: (result)=>{
          
        }
      });
    }else {
      const header = {Auhorization: token}
      const order_price = this.data.totalPrice
      const consignee_addr = this.data.address.allAddress
      let goods = []
      this.data.cartList.forEach((v) => {
        goods.push({
          goods_id: v.goods_id,
          goods_number: v.num,
          goods_price: v.goods_price
        })
      })
      const orderParams = {
        order_price,
        consignee_addr,
        goods
      }
      const res = await request({url: "/my/orders/creat",method: "post",data: orderParams,header})
      console.log(res)
    }
  }
  
})