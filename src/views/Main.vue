<template>
    <el-container style="height: 500px; border: 1px solid #eee">
    <el-aside width="200px">
      <el-menu :default-openeds="['1', '2']" :router="true">
        <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>首页模板管理</template>
        <el-menu-item-group>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-message"></i>首页内容设置</template>
        <el-menu-item-group>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      </el-menu>
    </el-aside>
    
    <el-main>
      <el-header>header</el-header>
     <router-view/>
    </el-main>
  </el-container>
</template>
<style>
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: left;
    line-height: 0
  }
</style>

