<template>
  <div class="container">
    <router-link
      class="title-link"
      to="/dronecontrolpanel"
    >
      <h1 class="hidden-xs-only">
        Drone Cloud Platform
      </h1>
    </router-link>
    <el-menu
      :default-active="activeIndex"
      class="el-menu"
      mode="horizontal"
      active-text-color="#409EF0"
      :router="true"
    >
      <el-menu-item
        index="dronecontrolpanel"
      >
        Control Panel
      </el-menu-item>
      <el-menu-item
        index="2"
      >
        Flight Record
      </el-menu-item>
      <el-submenu
        index="3"
      >
        <template #title>
          Settings
        </template>
        <el-menu-item index="2-1">
          Account
        </el-menu-item>
      </el-submenu>
      <el-menu-item
        index="signin"
      >
        SignIn
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  setup () {
    return {
      activeIndex: 'dronecontrolpanel'
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: solid 1px #dcdfe6;
  > .title-link {
    text-decoration: none;
    color: black;
  }
  .el-menu-item,
  .el-submenu {
    font-size: 0.5rem;
    padding: 0 10px;
  }
  @media screen and (min-width:768px) {
    justify-content: space-around;
    >.title-link {
      font-size: 0.6rem;
    }
    .el-menu-item,
    .el-submenu {
      font-size: 1rem;
      padding: 0 20px;
    }
  }
  @media screen and (min-width:992px) {
    >.title-link {
      font-size: 1rem;
    }
  }
}
</style>
