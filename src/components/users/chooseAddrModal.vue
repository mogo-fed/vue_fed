<template>
  <div class="page has-navbar" v-nav="{title: '', showBackButton: true}" >
    <div class="page-content" style="padding-top: 54px;">

      <list v-show="userAddressAllInfo.length==0">
        <item>
          暂无地址~
        </item>
      </list>

      <list v-show="userAddressAllInfo.length!=0" v-for="item in userAddressAllInfo">
        <item @click.native="myChooseAddr" v-bind:data-addr='item.receiverAddressUseradr'
              v-bind:data-name='item.receiverAddressUserName' v-bind:data-tel='item.receiverAddressUsertel'>
          {{item.receiverAddressUseradr}}
        </item>
        <item>
          {{item.receiverAddressUserName}}
          <span class="item-note">
              {{item.receiverAddressUsertel}}
            </span>
        </item>
      </list>

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
    create(){

    },
    methods: {
        getAddressAll(){
            let _this = this;
            $.post('/ssm/address/queryAddressAll',{userid:this.userid}).then( function (data) {
                _this.userAddressAllInfo = data;
                console.log(_this.userAddressAllInfo,'--------queryAddressAll====');
            } );
        },
        myChooseAddr(){
            let _this = this;
            let addr = $(event.currentTarget).data('addr');
            let name = $(event.currentTarget).data('name');
            let tel = $(event.currentTarget).data('tel');
            let info = {
                addr:addr,
                name:name,
                tel:tel
            }
            console.log(JSON.stringify(info));
            //代表选中改地址后关闭模态框，返回到订单页
            _this.$emit('closeAddrModal',info);

        }
    }



  }
</script>
