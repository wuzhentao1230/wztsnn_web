<template>
  <div class="main">
    <div class="loginview">
      <h1  style="color: white;margin: 10px;">{{status === 'login'?'系统登录':'注册账号'}}</h1>
      <Input size="large" prefix="ios-contact" v-model="userName" placeholder="Enter name" style="width: auto;margin: 10px;"/>
      <Input size="large" prefix="ios-keypad" type="password" v-model="password" placeholder="Enter passwd" style="width: auto;margin: 10px;"/>
      <Input v-if="status === 'register'" size="large" prefix="ios-paper-plane-outline" type="email" v-model="email" placeholder="Enter Email" style="width: auto;margin: 10px;"/>
      <Input v-if="status === 'register'" size="large" prefix="ios-call-outline" type="tel" v-model="mobile" placeholder="Enter phone number" style="width: auto;margin: 10px;"/>
      <Button v-if="status === 'login'" type="success" ghost @click="login" style="width: 90%;margin: 10px 0px;">{{btnText}}</Button>
      <Button v-if="status === 'register'" type="success" ghost @click="register" style="width: 90%;margin: 10px 0px;">注册账号</Button>
      <div style="width: 100%;">
        <p style="width: 30%;float: right;font-size: 10px;color: white" @click="change">注册账号</p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {

  name: 'login',
  data () {
    return {
      status: 'login',
      checked: false,
      userName: '',
      password: '',
      email: '',
      mobile: '',
      isBtnLoading: false
    }
  },
  created () {
    if (JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).userName) {
      this.userName = JSON.parse(localStorage.getItem('user')).userName
      this.password = JSON.parse(localStorage.getItem('user')).password
    }
  },
  computed: {
    btnText () {
      if (this.isBtnLoading) return '登录中...'
      return '登录'
    }
  },
  methods: {
    change () {
      console.log(this.status)
      if (this.status === 'login') {
        this.status = 'register'
        return
      }
      if (this.status === 'register') {
        this.status = 'login'
      }
    },
    login () {
      if (!this.userName) {
        this.$Notice.warning({
          title: '输入用户名'
        })
        return
      }
      if (!this.password) {
        this.$Notice.warning({
          title: '请输入密码'
        })
      }
      this.$post('login', {
        username: this.userName,
        password: this.password
      }).then((r) => {
        console.log(r.data)
        if (r.data.status === 200) {
          let data = r.data.data
          this.saveLoginData(data)
          this.$router.push('/')
        } else if (r.data.status === 400) {
          this.$Notice.error({
            title: '登录失败',
            desc: r.data.message
          })
        }
      }).catch(function (error) {
        console.log(error.data)
      })
    },
    register () {
      if (!this.userName) {
        this.$Notice.warning({
          title: '输入用户名'
        })
        return
      }
      if (!this.password) {
        this.$Notice.warning({
          title: '请输入密码'
        })
      }
      this.$post('register', {
        username: this.userName,
        password: this.password,
        email: this.email,
        mobile: this.mobile
      }).then((r) => {
        if (r.data.status === 200) {
          this.$Notice.warning({
            title: '注册成功'
          })
          this.status = 'login'
        } else if (r.data.status === 400) {
          this.$Notice.error({
            title: '注册失败',
            desc: r.data.message
          })
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    ...mapMutations({
      setToken: 'account/setToken',
      setExpireTime: 'account/setExpireTime',
      setPermissions: 'account/setPermissions',
      setRoles: 'account/setRoles',
      setUser: 'account/setUser'
      // setTheme: 'setting/setTheme',
      // setLayout: 'setting/setLayout',
      // setMultipage: 'setting/setMultipage',
      // fixSiderbar: 'setting/fixSiderbar',
      // fixHeader: 'setting/fixHeader',
      // setColor: 'setting/setColor'
    }),
    saveLoginData (data) {
      this.setToken(data.token)
      this.setExpireTime(data.exipreTime)
      this.setUser(data.user)
      this.setPermissions(data.permissions)
      this.setRoles(data.roles)
      // this.setTheme(data.config.theme)
      // this.setLayout(data.config.layout)
      // this.setMultipage(data.config.multiPage === '1')
      // this.fixSiderbar(data.config.fixSiderbar === '1')
      // this.fixHeader(data.config.fixHeader === '1')
      // this.setColor(data.config.color)
    }
  }
}
</script>

<style scoped>
  .main {
    width: 100vw;
    height: 100vh;
    background-image: url("../assets/pg_back_login.jpg");
    background-size: 100% 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loginview {
    padding: 10px 50px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .buttons{
    width: 100%;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
</style>
