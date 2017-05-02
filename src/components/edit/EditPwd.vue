<template>
  <div class="page has-navbar" v-nav="{title: '修改密码', showBackButton: true}">
    <div>
      <div class="item item-divider">修改密码:</div>
        <von-input type="text" v-model="oldpwd" placeholder="原密码" label="原密码"></von-input>
        <von-input type="text" v-model="newpwd" placeholder="新密码" label="新密码"></von-input>
        <von-input type="text" v-model="repeatpwd" placeholder="重复密码" label="重复密码"></von-input>
      <div class="padding">
        <button class="button button-positive button-block" @click="updatePwdFn">确认</button>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  export default{
    data() {
      return {
        oldpwd:localStorage.getItem('userpwd'),
        newpwd:'',
        repeatpwd:'',
        username : localStorage.getItem('username'),
        userpwd : localStorage.getItem('userpwd')
      }
    },
      created(){
      },
      methods:{
          updatePwdFn(){
              if (this.newpwd != this.repeatpwd){
                  $toast.show('密码不一致！');
                  return;
              }
//              console.log(this.userinfo,'userinfo');
              let info={
                  username:this.username,
                  userpwd:this.newpwd
              }
              $.get('/ssm/user/updateUserPwd',info).then(function (data) {
                  console.log(data,'savepwd');
                  if(data == 1){
                      $toast.show('修改密码成功！');
                      console.log(info.usertel,'tel222222');
                      localStorage.setItem('userpwd',info.userpwd);
                      $router.back('/users/user');
                  }else {
                      $toast.show('修改密码失败！')
                  }
              });

          }
      }
  }
</script>