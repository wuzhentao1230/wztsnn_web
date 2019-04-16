<template>
  <div class="main">
    <div class="loginview">
      <h1 style="color: white;margin: 10px;">登录</h1>
      <Input size="large" prefix="ios-contact" placeholder="Enter name" style="width: auto;margin: 10px;" />
      <Input size="large" prefix="ios-keypad" placeholder="Enter passwd" style="width: auto;margin: 10px;" />
      <Button type="success" ghost style="width: 60%;margin: 10px;">login</Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login'
}
</script>

<style scoped>
  .main {
    width: 100vw;
    height: 100vh;
    background-image: url("../assets/pg_back_login.jpg");
    background-size: 100% 100%;
    position: absolute;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .loginview {
    padding: 10px 50px;
    border-radius: 10px;
    background-color: rgba(255,255,255,0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
</style>
