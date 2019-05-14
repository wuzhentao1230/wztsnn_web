<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }
  .layout-nav{
    width: 420px;
    margin-right: 20px;
  }
  .layout-footer-center{
    text-align: center;
  }
</style>
<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">
            <img src="static/logo.jpg" style="width: 100%;height: 100%;position: absolute;top: 0;">
          </div>
          <touxiang v-if="this.$store.state.account.user.name"></touxiang>

        </Menu>
      </Header>
      <Content :style="{padding: '0 50px'}">
        <Card>
          <div style="min-height: 200px;">
            content
          </div>
        </Card>
      </Content>
      <Footer class="layout-footer-center">2019.4-2019.5 &copy; zhentao</Footer>
    </Layout>
  </div>
</template>
<script>
import touxiang from './common/touxiang.vue'
export default {
  name: 'workspace',
  components: {touxiang}
}
</script>
