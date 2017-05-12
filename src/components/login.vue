<template>
  <div class="page has-navbar" v-nav="{title: '', showBackButton: true}">
    <tabs :tab-items="tabs" :tab-index="tabIndex" :on-tab-click="onTabClick"></tabs>
    <div class="page-content">
      <div class="page-content" style="padding-top: 100px;">
        <von-radio :options="genderOptions" v-model="usertype"></von-radio>
        <von-input type="text" v-model="username" placeholder="用户名/手机/邮箱" label="用户名"></von-input>
        <von-input type="password" v-model="userpwd" placeholder="密码" label="密码"></von-input>
        <von-input type="password" v-model="userpwd2" placeholder="再次输入密码" label="重复密码" style="margin-bottom: 5px;" class="pwd2 hide"></von-input>
        <div class="padding">
          <button class="button button-positive button-block loginBtn" @click="login">登录</button>
        </div>
        <div class="padding">
          <button class="button button-positive button-block hide registerBtn" @click="register">注册</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  export default{
    data(){
      return {
          username: '',
          userpwd: '',
          userpwd2: '',
          tabs: [
            "登录",
            "注册"
          ],
          tabIndex: 0,
          usertype: 0,
          genderOptions: ["我是用户", "我是商家"]
      }
    },
    methods: {
        register(){
            var _this = this;
            if (this.userpwd != this.userpwd2){
                $toast.show('密码不一致！');
                return;
            }
            $.post('/ssm/user/addUser',{username:this.username,userpwd:this.userpwd,usertype:this.usertype}).then(data=>$toast.show('注册成功，请登录'));
        },
        login(){
            var _this = this;
            $.post('/ssm/user/queryByName',{username:this.username,userpwd:this.userpwd,usertype:this.usertype}).then( function (data) {
                console.log(data,'=======queryByName============');
                if (data){  //查询成功
                    localStorage.setItem('username',data.userName);
                    localStorage.setItem('userpwd',data.userPwd);
                    localStorage.setItem('usertype',data.userType);
                    localStorage.setItem('usertel',data.userTel);

                    if(_this.usertype == 0){
                        localStorage.setItem('userid',data.userId);
                    }else {
                        localStorage.setItem('loginSellerId',data.userId);
                    }

                    if(_this.usertype == 0){  //普通用户，跳转至商家列表 home
                        $router.replace('/users/home');
                    }else { //商家，跳转至BS sellerInfo
                        $router.replace('/sellerInfo');
                    }
                    $toast.show('登录成功');
                }else if(!data){
                    $toast.show('登录失败');
                }
            } );
        },
        //tab切换时 处理输入框显示隐藏
        onTabClick(index) {
          console.log(index);
          if (index == 1){
              $('.pwd2').show();
              $('.loginBtn').hide();
              $('.registerBtn').show();
          }else if(index == 0){
              $('.pwd2').hide();
              $('.loginBtn').show();
              $('.registerBtn').hide();
          }
          this.tabIndex = index;
        }
    }
  }
</script>
