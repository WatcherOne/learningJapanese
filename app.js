App({
    onLaunch () {
        console.log(333)
        wx.login({
          success: res => {
            const { code } = res
            console.log(1, code)
            const url = `https://api.weixin.qq.com/sns/jscode2session?appid=wx16d26cbba526afec&secret=4492fb9cf413d8d66bd894e0e2cfdac4&js_code=${code}&grant_type=authorization_code`
            wx.request({
              url,
              header: {
                'content-type': 'application/json'
              },
              success: res => {
                const openid = res.data.openid
                console.log(openid)
              }
            })
          }
        })
        wx.authorize({
            scope: 'scope.userInfo',
            success: () => {
                wx.getUserProfile({
                  desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                  success: (res) => {
                      console.log(res.userInfo)
                      this.setData({
                          userInfo: res.userInfo,
                          hasUserInfo: true
                      })
                  }
                })
            }
        })
    },
    globalData: {
        userInfo: null
    }
})
