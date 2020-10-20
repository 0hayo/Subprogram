let ajaxTime = 0
export const request = (params) => {
  ajaxTime ++
  wx.showLoading({
    title: "加载中",
    mask: true
  })
  return new Promise((resolve, reject) =>{
    const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success: (result)=>{
        resolve(result.data.message)
      },
      fail: (err)=>{
        reject(err)
      },
      complete: () => {
        ajaxTime --
        ajaxTime === 0 && wx.hideLoading()
      }
    });
  })
}