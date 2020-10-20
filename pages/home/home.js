import { request } from "../../request/index"
Page({

  data: {
    // 轮播数据
    swiperList:[],
    // 导航数据
    catesList:[],
    // 楼层数据
    floorList:[]
  },

  onLoad: function (options) {
    this.getSwiperList()
    this.getcatesList()
    this.getfloorList()
  },

  async getSwiperList() {
    // request({
    //   url: '/home/swiperdata'
    // }).then((result) =>{
    //   this.setData({
    //     swiperList: result
    //   })
    // })
    const result = await request({
      url: '/home/swiperdata'
    })
    this.setData({
      swiperList: result
    })
  },

  async getcatesList() {
    // request({
    //   url: '/home/catitems'
    // }).then((result) =>{
    //   this.setData({
    //     catesList: result
    //   })
    // })

    const result = await request({
      url: '/home/catitems'
    })
    this.setData({
      catesList: result
    })
  },

  async getfloorList() {
    // request({
    //   url: '/home/floordata'
    // }).then((result) =>{
    //   this.setData({
    //     floorList: result
    //   })
    // })

    const result = await request({
      url: '/home/floordata'
    })
    this.setData({
      floorList: result
    })
  }

})