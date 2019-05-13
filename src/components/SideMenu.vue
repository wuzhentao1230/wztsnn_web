<template>
  <Menu  :active-name="$route.name" :open-names="openNames" :theme="menuTheme" width="auto" z
        @on-select="changeMenu" >
    <template v-for="item in menuList">
      <MenuItem v-if="item.type == 0 && !item.children" :name="item.name" :to="item.path" :key="'menuitem' + item.name">
        <Icon  :type="item.icon"  :key="'mention' + item.name" ></Icon>
        <span v-if="!isHide" class="layout-text" :key="'title' + item.name">{{ itemTitle(item) }}</span>
      </MenuItem>

      <Submenu v-if="item.type == 0 && item.children && item.children.length > 1" :name="item.name" :key="item.name">
        <template slot="title">
          <Icon :type="item.icon"></Icon>
          <span v-if="!isHide" class="layout-text">{{ itemTitle(item) }}</span>
        </template>
        <template v-for="child in item.children">
          <MenuItem :name="child.name" :key="'menuitem' + child.name" :to="child.path">
            <Icon :type="child.icon"  :key="'mention' + child.name"></Icon>
            <span v-if="!isHide" class="layout-text" :key="'title' + child.name">{{ itemTitle(child) }}</span>
          </MenuItem>
        </template>
      </Submenu>
    </template>
  </Menu>
</template>

<script>
export default {
  name: 'sidebarMenu',
  props: {
    menuList: Array,
    iconSize: Number,
    menuTheme: {
      type: String,
      default: 'dark'
    },
    openNames: {
      type: Array
    },
    isHide: {
      type: Boolean
    }
  },
  methods: {
    changeMenu (active) {
      console.log(active)
      // this.$emit('on-change', active)
    },
    itemTitle (item) {
      if (typeof item.name === 'object') {
        return item.path
      } else {
        return item.name
      }
    }
  },
  updated () {
    this.$nextTick(() => {
      if (this.$refs.sideMenu) {
        this.$refs.sideMenu.updateOpened()
      }
    })
  }

}
</script>
