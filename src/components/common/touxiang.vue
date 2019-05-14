<template>
  <div class="touxiang">
    <Dropdown @on-click="changeMenu">
      <a href="javascript:void(0)">
        <img class="avatar" :src="this.$store.state.account.user.avatar?avatar:'static/avatar/default2.jpg'">
      </a>
      <DropdownMenu slot="list">
        <DropdownItem disabled>{{this.$store.state.account.user.username}}</DropdownItem>
        <DropdownItem divided style="color: orange" name="logout">注销</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
export default {
  name: 'touxiang',
  data: function () {
    return {
      avatar: ''
    }
  },
  created () {
    this.avatar = this.$store.state.avatarPartUrl + this.$store.state.account.user.avatar
  },
  methods: {
    changeMenu (name) {
      if (name === 'logout') {
        this.logout()
      }
    },
    logout () {
      console.log('开始清除本地存储')
      this.$db.clear()
      this.$router.options.routes = []
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
  .touxiang{
    float: right;
    width: 80px;
    height: 100%;
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .avatar{
    width: 50px;
    height: 50px;
    margin-top: 20px;
    border-radius: 50%;
  }
</style>
