<template>
    <MenuGroup title="aaaa">
      <Menu1 v-for="item in menuList" :menuItem="item" :key="item.name"></Menu1>
    </MenuGroup>
</template>

<script>
import Menu1 from './MenuItem'
export default {
  name: 'Menu',
  components: {Menu1},
  data: function () {
    return {
      menuList: []
    }
  },
  created: function () {
    let userRouter = get('USER_ROUTER')
    let userName = this.$store.state.account.user.username
    if (!userRouter) {
      this.get(`menu/` + userName).then((res) => {
        userRouter = res.data
      })
    }
    this.menuList = userRouter
  }
}
function get (name) {
  return JSON.parse(localStorage.getItem(name))
}
</script>

<style scoped>

</style>
