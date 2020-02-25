<template>
  <el-container class="home-container">
    <!-- 头部区 -->
    <el-header>
      <div @click="goHome">
        <img src="../assets/heima.png" />
        <span>后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-menu background-color="#545c64" text-color="#fff" active-text-color="#409bff" unique-opened router :default-active="activePath">  
          <!-- 一级菜单 -->
          <el-submenu :index="item.id+''" v-for='item in menulist' :key='item.id'>
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key='subItem.id' @click="saveNavState('/' + subItem.path)">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体区  -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menulist: [],  // 左侧菜单数据
      iconsObj: {    // 左侧菜单图标
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      activePath: ''
    }
  },
  created() {
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem('activePath');
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    async getMenuList() {
      const {data: res} = await this.$http.get('menus');
      if(res.meta.status != 200) 
        return this.$message.error(res.meta.msg);
      this.menulist = res.data;
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath); //保存到session
      this.activePath = activePath;
    },
    goHome() {
      this.$router.push("/welcome");
    }
  }
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
  width: 100%;
}
.el-header {
  background-color: #373d41; //#31859C
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  div {
    display: flex;
    align-items: center;
    cursor: pointer;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;  // 边框对齐 
  }
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 10px;
}
</style>