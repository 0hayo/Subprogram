export const getSetting = () => {
  return new Promise((resolve, reject) =>{
    wx.getSetting({
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}

export const chooseAddress = () => {
  return new Promise((resolve, reject) =>{
    wx.chooseAddress({
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}

export const openSetting = () => {
  return new Promise((resolve, reject) =>{
    wx.openSetting({
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}

export const showModal = ({content}) => {
  return new Promise((resovle, reject) => {
    wx.showModal({
      content: content,
      showCancel: true,
      title: '提示',
      success: (result) => {
        resovle(result)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

export const showToast = ({title}) => {
  return new Promise((resovle, reject) => {
    wx.showToast({
      title: title,
      icon: 'none',
      duration: 1500,
      mask: false,
      success: (result)=>{
        resovle(result)
      }
    });
  })
}

export const login = () => {
  return new Promise((resovle, reject) => {
    wx.login({
      timeout:10000,
      success: (result)=>{
        resovle(result)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}