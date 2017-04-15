<template>
  <div class="page has-navbar" v-nav="{title: '修改我的收货地址', showBackButton: true}">
   <div class="page-content" style="padding-top:44px;">
      <div class="item item-divider">联系人</div>
      <von-input type="text" v-model="receiver_address_username" placeholder="请填写收货人的姓名" label="姓名" floating-label="true"></von-input>
      <von-input type="tel" v-model="receiver_address_usertel" placeholder="请填写收货手机号码" label="联系方式" floating-label="true"></von-input>
      <div class="item item-divider">收获地址</div>
      <von-input type="text" v-model="receiver_address_useradr" placeholder="请填写收货地址" label="收货地址" floating-label="true"></von-input>
      <div class="padding">
        <button class="button button-positive button-block" @click="saveMyAdr">确认修改</button>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  export default{
    data() {
      return {
          receiver_address_id:this.$route.query.addrid,
          receiver_address_username: '',
          receiver_address_usertel: '',
          receiver_address_useradr:''
      }
    },
      created(){

      },
      methods:{
          saveMyAdr(){
              let info={
                  userid:localStorage.getItem('userid'),
                  receiver_address_id:this.receiver_address_id,
                  receiver_address_username:this.receiver_address_username,
                  receiver_address_useradr:this.receiver_address_useradr,
                  receiver_address_usertel:this.receiver_address_usertel
              }
              $.get('/ssm/address/updateAddress',info).then(function (data) {
                  console.log(data,'saveadr--success');
                  if(data == 1){
                      $toast.show('修改地址成功！');
                      $router.back('/edit/EditAddress');
                  }else {
                      $toast.show('修改地址失败！')
                  }
              });
          }
      }
  }
</script>