<template>
    <!--<Submenu  v-if="menuItem.type == 0" :title="menuItem.name" >-->
      <!--<Menu1 v-for="item in menuItem.children" :menuItem="item" :key="item.name"></Menu1>-->
    <!--</Submenu >-->
    <!--<MenuItem v-else-if="menuItem.type == 1" :title="menuItem.name"  :to="menuItem.path"></MenuItem>-->
    <MenuItem  :name="menuItem.name"  >{{menuItem.name}}</MenuItem>
    <p>{{menuItem.name}}</p>
</template>

<script>
export default {
  name: 'Menu1',
  props: ['menuItem', 'showTitle']
}
</script>

<style scoped>

</style>
