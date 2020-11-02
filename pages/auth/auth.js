import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime';
import { login } from '../../utils/asyncApi';
Page({
  async handleGetuserinfo(e) {
    const {rawData, signature, encryptedData, iv} = e.detail
    const {code} = await login()
    const loginParams = {rawData, signature, encryptedData, iv, code}
    const token = await request({
      url: "/users/wxlogin",
      data: loginParams,
      method: "post"
    })
    wx.setStorageSync("token", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo");
    wx.navigateBack({
      delta: 1
    });
  }
})