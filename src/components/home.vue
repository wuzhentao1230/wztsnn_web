<style scoped>
  .layout{
    /*border: 1px solid #d7dde4;*/
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-header-bar{
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .layout-logo-left{
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }
  .menu-icon{
    transition: all .3s;
  }
  .rotate-icon{
    transform: rotate(-90deg);
  }
  .menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }
  .menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
  .collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
  }
  .collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }

</style>
<template>
  <div class="layout">
    <Layout>
      <Sider ref="side1" hide-trigger breakpoint="md" collapsible :collapsed-width="100" v-model="isCollapsed">
        <!--<h1 style="color: white;margin: 20px 0px;font-weight: bolder" align="center">阿涛</h1>-->
        <img src="static/logo.jpg" style="width: 100%;opacity: 0.1;margin: 20px 0px;" >
        <sidebarMenu  theme="dark" width="auto" :menuList="menuList" :isHide="isCollapsed" :class="menuitemClasses">
        </sidebarMenu>
      </Sider>
      <Layout>
        <Header :style="{padding: 0}" class="layout-header-bar">
          <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
          <touxiang></touxiang>
        </Header>
        <Content :style="{margin: '20px', background: '#fff', minHeight: '90vh'}">
          <router-view></router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import sidebarMenu from './SideMenu.vue'
import touxiang from './common/touxiang.vue'
export default {
  name: 'home',
  components: {sidebarMenu, touxiang},
  created: function () {
    let userRouter = get('USER_ROUTER')
    let userName = this.$store.state.account.user.username
    if (!userRouter) {
      this.$get(`menu/` + userName).then((res) => {
        userRouter = res.data
        this.menuList = userRouter
      })
    } else {
      this.menuList = userRouter
    }
  },
  data () {
    return {
      isCollapsed: false,
      avatar: '',
      menuList: []
    }
  },
  computed: {
    rotateIcon () {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ]
    },
    menuitemClasses () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  },
  methods: {
    collapsedSider () {
      this.$refs.side1.toggleCollapse()
    }
  }
}
function get (name) {
  return JSON.parse(localStorage.getItem(name))
}
</script>
