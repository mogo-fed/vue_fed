<template>
  <div class="page has-navbar" v-nav="{title: '修改用户名', showBackButton: true}">
    <div>
      <div class="item item-divider">修改用户名:</div>
        <von-input type="text" v-model="username" placeholder="修改用户名" label="用户名"></von-input>
      <div class="padding">
        <button class="button button-positive button-block" @click="saveNameBtn">确认</button>
      </div>

    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  export default{
    data() {
      return {
          username : localStorage.getItem('username')
      }
    }
  }
</script>