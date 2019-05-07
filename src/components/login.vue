<template>
  <div class="main">
    <div class="loginview">
      <h1 style="color: white;margin: 10px;">系统登录</h1>
      <Input size="large" prefix="ios-contact" v-model="userName" placeholder="Enter name" style="width: auto;margin: 10px;"/>
      <Input size="large" prefix="ios-keypad" type="password" v-model="password" placeholder="Enter passwd" style="width: auto;margin: 10px;"/>
      <Button type="success" ghost @click="login" style="width: 90%;margin: 10px 0px;">{{btnText}}</Button>
      <div style="width: 100%;">
        <p style="width: 30%;float: right;font-size: 10px;color: white">注册账号</p>
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
      checked: false,
      userName: '',
      password: '',
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
    login () {
      if (!this.userName) {
        this.$message.error('请输入用户名')
        return
      }
      if (!this.password) {
        this.$message.error('请输入密码')
      }
      this.$post('login', {
        username: this.userName,
        password: this.password
      }).then((r) => {
        let data = r.data.data
        this.saveLoginData(data)
        this.$router.push('/')
      }).catch(function (error) {
        console.log(error.data)
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
