<template>
  <div class="page has-navbar" v-nav="{title: '我的收货地址', showBackButton: true}">
    <div class="page-content" style="padding: 60px 0;">
      <list v-show="userAddressAllInfo.length==0">
        <item>
          暂无地址~
        </item>
      </list>

      <list v-show="userAddressAllInfo.length!=0" v-for="item in userAddressAllInfo">
        <item @click.native="editMyAddr" v-bind:data-addrid='item.receiverAddressId'>
          <item>
            {{item.receiverAddressUseradr}}
          </item>
          <item>
            {{item.receiverAddressUserName}}
            <span class="item-note">
              {{item.receiverAddressUsertel}}
            </span>
          </item>
        </item>
      </list>

    <item class="bottomBtn" @click.native="$router.forward('/edit/AddNewAddress')">
        <button class="button button-light button-full" style="margin-bottom: 0px;margin-top:0px;">新增收获地址</button>
    </item>

    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  export default{
    data() {

      return {
        userAddressAllInfo:[],
        userid : localStorage.getItem('userid')
      }
    },
      created(){
          this.getUserAddressAll();
      },
      methods:{
          getUserAddressAll(){
              let _this = this;
              $.get('//ssm/address/queryAddressAll',{userid:this.userid}).then( function (data) {
                  _this.userAddressAllInfo = data;
                  console.log(_this.userAddressAllInfo,'queryAddressAll');
              } );
          },
          editMyAddr(){
              let addrid = $(event.currentTarget).data('addrid');
              console.log(addrid,'addrid');
              console.log(this,'0000');
              $router.push({path:'/edit/EditMyAddress',query:{addrid:addrid}});
          }
      }
  }
</script>

<style scoped>
  .bottomBtn{
    padding: 0px;
    width: 100%;
    position: fixed;
    bottom: 0px;
    left: 0px;
  }
</style>


