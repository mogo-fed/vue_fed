<template>
  <div class="page has-navbar" v-nav="{title: '修改手机号', showBackButton: true}">
    <div>
      <div class="item item-divider">修改手机号:</div>
        <von-input type="text" v-model="phone" placeholder="暂无手机号" label="原手机号"></von-input>
        <von-input type="text" v-model="newphone" placeholder="手机号" label="新手机号"></von-input>

      <div class="padding">
        <button class="button button-positive button-block" @click="saveTelBtn">确认</button>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  export default{
    data() {
      return {
        phone: localStorage.getItem('usertel'),
        newphone:'',
        userinfo:'',
        username : localStorage.getItem('username')
      }
    },
      created(){
          if(this.phone == 'undefined'){
              this.phone = '';
          }
      },
      methods:{
          saveTelBtn(){
              console.log(this.userinfo,'tel');
              let info={
                  username:this.username,
                  usertel:this.newphone
              }
              $.get('/ssm/user/updateUserTel',info).then(function (data) {
                  console.log(data,'savetel');
                  if(data == 1){
                      $toast.show('修改手机号成功！');
                      localStorage.setItem('usertel',info.usertel);
                      $router.back('/users/user');
                  }else {
                      $toast.show('修改手机号失败！')
                  }
              });
          }
      }
  }
</script>