<template>
  <div class="page has-navbar" v-nav="{title:'我的店铺'}" v-tabbar="{'menus': menus, menuColor: '#999', activeMenuColor: '#FF4400', onMenuClick: menuClicked}">
      <div class="page-content" style="padding-bottom: 40px;padding-top: 54px;">
        <div class="text-center" v-if="show == 0">
            <div class="addSellerInfoPanl" v-show="addSellerInfoPanl">
                <von-input type="text" v-model="username" placeholder="我的昵称" label="我的昵称" readonly></von-input>
                <von-input type="text" v-model="usersellername" placeholder="我的商铺描述" label="我的商铺描述"></von-input>
                <von-input type="text" v-model="usertel" placeholder="我的电话" label="商家电话"></von-input>
                <von-input type="text" v-model="useradr" placeholder="我的地址" label="商家地址"></von-input>
                <von-input type="text" v-model="usersendpay" placeholder="起送费" label="起送费"></von-input>
                <von-input type="text" v-model="userdistributionpay" placeholder="配送费" label="配送费"></von-input>
                <label class="fileBtn"><span>商家头像</span><input type="file" name="" v-on:change="fileChange"></label>

                <img class="img" :src="useravatar" width="50%">

                <div class="padding saveMyInfoBtn">
                    <button class="button button-positive button-block loginBtn" @click="saveMyInfo">完善我的基本信息</button>
                </div>
            </div>

            <div class="padding addMenuSortPanl" v-show="addMenuSortPanl">
              <div class="item item-divider">
                  <div class="entrance balanced" v-for="item in menuSortData">
                      <i class="icon ion-ios-star"></i><br>
                      <span>{{item.msName}}</span>
                  </div>
              </div>
              <div class="menusortempty item item-divider" v-show="emptyMenuSortPanl">
                  <span>菜单类别空空如也~</span>
              </div>
              <button class="button button-assertive button-block button-outline" @click="addMenuSortBtn()">添加我的菜单类别</button>
              <button class="button button-assertive button-block button-outline" @click="addMenuDetailBtn()">完善我的菜谱</button>
            </div>

        </div>

          <!--历史订单-->
        <div class="text-center" v-if="show == 1">

            <div v-show="orderPerShow3" style="text-align: center; margin-top: 10%;">
                暂无订单~
            </div>

            <!--历史订单-->
            <div class="order-list" v-show="!orderPerShow3">
                <div class="order-list-item" v-for="item in sellerOrderPer3">
                    <div class="item-top">
                        <!--<img src="src/static/images/seller1.jpg" alt="" class="left">-->
                        <div class="left">
                            <span class="seller-title">{{item[0].userName}}</span>
                            <i class="ion-ios-arrow-right"></i>
                        </div>
                        <span class="order-state right">已完成订单</span>
                    </div>

                    <item class="item-center">
                        <ul>
                            <li v-for="it in item" >
                                <span>{{it.mdName}}</span>
                                <span class="right">x {{it.orderSingleNumber}}</span>
                                <span style="margin: 0 20%;">{{it.mdNowprice}}</span>
                            </li>

                            <div style="margin: 10px 0;">
                                    <span class="right" v-for="(count,index) in total">
                                        共<span>{{count.num}}</span>件商品&nbsp;&nbsp;
                                        实付<span class="factpay">￥ <em>{{count.price}}</em></span>
                                    </span>
                            </div>
                        </ul>
                    </item>
                    <div class="item-bottom right">
                        <button class="goassess" @click="accept">查看评价</button>
                    </div>
                </div>
            </div>

        </div>

          <!--待处理订单-->
        <div class="text-center" v-if="show == 2">

                <div v-show="orderPerShow1" style="text-align: center; margin-top: 10%;">
                    暂无待处理订单~
                </div>

                <!--待处理订单列表-->
                <div class="order-list" v-show="!orderPerShow1">
                    <div class="order-list-item" v-for="item in sellerOrderPer1">
                        <div class="item-top">
                            <div class="left">
                                <span class="seller-title">{{item[0].userName}}</span>
                                <i class="ion-ios-arrow-right"></i>
                            </div>
                            <span class="order-state right">待处理订单</span>
                        </div>

                        <item class="item-center">
                            <ul>
                                <li v-for="it in item" >
                                    <span>{{it.mdName}}</span>
                                    <span class="right">x {{it.orderSingleNumber}}</span>
                                    <span style="margin: 0 20%;">{{it.mdNowprice}}</span>
                                </li>

                                <div style="margin: 10px 0;">
                                    <span class="right" v-for="(count,index) in total">
                                        共<span>{{count.num}}</span>件商品&nbsp;&nbsp;
                                        实付<span class="factpay">￥ <em>{{count.price}}</em></span>
                                    </span>
                                </div>
                            </ul>
                        </item>
                        <div class="item-bottom right">
                            <button class="rebuy" @click="accept" :data-ordernumber="item[0].orderNumber">接单</button>
                            <button class="goassess">拒单</button>
                        </div>
                    </div>
                </div>

        </div>
      </div>
  </div>
</template>
<script>
    import $ from 'jquery';
    import addMenuSortModal from './addMenuSortModal.vue'
    import addMenuDetailModel from './addMenuDetailModel.vue'
  export default {
    data() {
      return {
        menus: [
          {
            iconOn: 'ion-ios-home',
            iconOff: 'ion-ios-home',
            text: '我的店铺'
          },
          {
            iconOn: 'ion-ios-pricetags',
            iconOff: 'ion-ios-pricetags',
            text: '历史订单'
          },
          {
            iconOn: 'ion-ios-person',
            iconOff: 'ion-ios-person',
            text: '待处理订单',
            badge: 0
          }
        ],
        show: 0,
        addSellerInfoPanl:true,
        addMenuSortPanl:false,
        username:localStorage.getItem('username'),
        usersellername:'',
        emptyMenuSortPanl:false,
        accordion:false,
        usertel:'',
        useradr:'',
        usersendpay:'',
        useravatar: null,
        userdistributionpay:'',
        modal: undefined,
        menuSortData:[],

          sellerOrderPer1:{},
          sellerOrderPer3:{},
          orderPerShow1:true,
          orderPerShow3:true,
          total:[]
      }
    },
    created(){
        let _this = this;
        //注册商家的socket
        window.sendMsg(localStorage.loginSellerId);
        //消息通知
        window.socketCallback=function (msg) {
            _this.alertInform(msg.returnMsg);
        }
        //对商家基本信息进行显隐判断
        this.selectSellerInfo();
        //获取订单状态为待处理的详情，即order_status=1的
        this.getOrderStatus1();
        //获取订单状态为已完成的详情，即order_status=3的
        this.getOrderStatus3();
    },
    mounted() {
      window.vmm=this;
    },
    methods: {
        /*上传图片*/
      fileChange(){
            let oFReader = new FileReader(),
                rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;

            oFReader.onload=oFREvent=>{
                this.useravatar=oFREvent.target.result;
                //console.log(this.base64Img)
            }

            function loadImageFile() {
                if (event.target.files.length === 0) { return; }
                var oFile = event.target.files[0];
                if (!rFilter.test(oFile.type)) { alert("You must select a valid image file!"); return; }
                oFReader.readAsDataURL(oFile,0.2);//压缩图片质量0～1
                // console.log(base64)
            }
            loadImageFile();
        },
      menuClicked(menuIndex) {
        this.show = menuIndex;
        $app.setTitle(this.menus[this.show].text);
      },
        updateBadge(menuIndex) {
          $tabbar.$emit('updateTabbarBadge', menuIndex, this.menus[menuIndex].badge++);
        },
        /*添加菜单分类方法*/
        addMenuSortBtn() {
            $modal.fromComponent(addMenuSortModal, {
                title: '添加我的菜单分类面板',
                theme: 'default',
                onHide: () => {
                    console.log('modal hide');
                }
            }).then((modal) => {
                this.sortModal = modal;
                var _this = this;
                modal.content.$on('closeMenuSortModal',function () {
                    modal.hide();
                    _this.selectMenuSortAll();
                })
                this.sortModal.show();
            })
        },
        // 保存基本信息
        saveMyInfo(){
          var _this = this;
          let updateInfo = {
              username:this.username,
              usersellername:this.usersellername,
              usertel:this.usertel,
              useradr:this.useradr,
              usertype:localStorage.getItem('usertype'),
              usersendpay:this.usersendpay,
              userdistributionpay:this.userdistributionpay,
              useravatar:this.useravatar
          }
            $.post('/ssm/user/updateUser',updateInfo).then(function (updateUserData) {
                $toast.show('基本信息保存成功,请完善菜单分类');
//                $('.page-content').css('paddingTop','40px');
                _this.selectMenuSortAll();
                //显示补全商家菜单界面
                _this.addSellerInfoPanl = false;
                _this.addMenuSortPanl = true;
            });
        },

        //查询所有菜单种类
        // TODO:某种情况 切换tab之后，在第一个页面中出现两次重复数据，原因：第一次请求数据没有清空，需要知道切换的事件。
        selectMenuSortAll(){
            var _this = this;
            $.post('/ssm/menusort/queryMenuSortAll',{sellerId:localStorage.getItem('loginSellerId')}).then(function (menuSortData) {
               if(menuSortData.length != 0){
                   _this.addMenuSortPanl = true;
               }else {
                   _this.emptyMenuSortPanl = true;
               }
                _this.menuSortData = menuSortData;
            });
        },

        // TODO:根据username查询商家信息，若已经完善过电话、地址等信息，则登录后跳过完善信息页 到添加菜单页
        selectSellerInfo(){
            let _this = this;
            let sellerInfo = {
                username:this.username,
                userpwd:localStorage.getItem('userpwd'),
                usertype:localStorage.getItem('usertype')
            };
            $.post('/ssm/user/queryByName',sellerInfo).then(function (sellerInfo) {
                console.log(sellerInfo,'=======sellerInfo');
                if(sellerInfo.userTel){
                    //完善过信息，直接跳转至添加菜单页
                    _this.selectMenuSortAll();
                    //显示补全商家菜单界面
                    _this.addSellerInfoPanl = false;
                    _this.addMenuSortPanl = true;
                }
            });
        },
        //完善我的菜谱面板
        addMenuDetailBtn(){
            $modal.fromComponent(addMenuDetailModel, {
                title: '完善我的菜谱面板',
                theme: 'default',
                onHide: () => {
                    console.log('modal hide');
                }
            }).then((modal) => {
                this.detailModal = modal;
                var _this = this;
                modal.content.$on('closeMenuDetailModal',function () {
                });
                this.detailModal.show();
            })
        },

/*============================================待处理订单=========================================================================*/
        //消息推送的弹窗
        alertInform(msg) {
            let _this = this;
            let options = {
                effect: 'scale',
                title: '',
                buttons: [
                    {text: '确定'},
                    {text: '取消'},
                ]
            }
            let popup = $popup.fromTemplate('<p style="margin-bottom: 0; text-align: center;">'+ msg + '</p>', options);
            popup.show().then((buttonIndex) => {
                // 去处理
                if(buttonIndex == 0){
                    _this.show = 2;
                    _this.getOrderStatus1();
                }
            })
        },
        //查询待处理订单
        getOrderStatus1(){
            let _this = this;
            $.post('/ssm/orderdetail/queryUserOrderDetail',{sellerid:localStorage.loginSellerId ,order_status:1}).then(function (order) {
                console.log(order,'-------待处理订单-----order1111');
                if(order.length != 0){
                    _this.orderPerShow1 = false;
                }
                let data={};
                order.forEach((v,k)=>{
                    data[v.orderNumber]?data[v.orderNumber].push(v):data[v.orderNumber]=[v];
                });
                _this.sellerOrderPer1 = data;
                console.log(_this.sellerOrderPer1,'------------');
            });
        },
        // 商家点击接单，更改订单状态
        accept(){
            let _this = this;
            let ordernumber = $(event.currentTarget).data('ordernumber');
            console.log(ordernumber,'========ordernumber');
            $.post('/ssm/order/updateOrderStatus',{userid:0 ,sellerid:localStorage.loginSellerId ,order_number:ordernumber,order_status:2}).then(function (order) {
                console.log(order,'------------order222');
                if(order == 2){
                    _this.getOrderStatus1();
                }
            });
        },

/*============================================历史订单=========================================================================*/
        //查询历史订单
        getOrderStatus3(){
            let _this = this;
            $.post('/ssm/orderdetail/queryUserOrderDetail',{sellerid:localStorage.loginSellerId ,order_status:3}).then(function (order) {
                console.log(order,'-------历史订单-----order333');
                if(order.length != 0){
                    _this.orderPerShow3 = false;
                }
                let data={};
                order.forEach((v,k)=>{
                    data[v.orderNumber]?data[v.orderNumber].push(v):data[v.orderNumber]=[v];
                });
                _this.sellerOrderPer3 = data;
                console.log(_this.sellerOrderPer3,'------------');
            });
        }

    },
    beforeDestroy() {
      $tabbar.$emit('hideTabbar');
    },
      destroyed() {
          if (this.sortModal)
              $modal.destroy(this.sortModal);
          window.MultiModal = undefined
      }
  }
</script>

<style scoped lang="sass" type="text/css">
    .button.button-assertive:hover{
        background: #ea5a49;
        color: #fff;
    }
    .menusortempty{
        margin:0 30px;
    }
    .entrance {
        height: 90px;
        width: 90px;
        padding: 20px 0 35px 0;
        border: 1px solid #ddd;
        float: left;
    }
    .entrance span {
        font-size: 14px;
        line-height: 14px;
        color: #000;
    }
    .icon {
        font-size: 30px;
        line-height: 30px;
        width: 30px;
        height: 30px;
        margin-bottom: 6px;
    }
    .fileBtn{background: #fff;height: 50px;border: none;width: 100%;display: block;position: relative;}
    .fileBtn input{visibility: hidden;width: 100%;display: block;height: 50px;}
    .fileBtn span{position: absolute;left: 12px;bottom: 12px;padding-left: 35px;}
    .img{display: block;margin: 10px auto;}

    .left{
        float: left;
    }
    .right{
        float: right;
    }
    button{
        border:none;
    }
    .order-list{
    .order-list-item{
        background:#fff;
        margin-bottom: 10px;
        padding:10px;
        overflow: hidden;
    .item-top{
        overflow: hidden;
        padding-bottom:10px;
        border-bottom:1px solid #eee;
    img{
        display: inline-block;
        margin-right: 10px;
        width: 50px;
        height:50px;
        -webkit-border-radius:100%;
        -moz-border-radius:100%;
        border-radius:100%;
    }
    .seller-title,i{
        font-size: 20px;
        font-weight:bold;
        line-height: 50px;
    }
    .order-state{
        margin-top: 15px;
    }
    }
    .item-center{
        border-bottom:1px solid #eee;
        padding: 10px 20px 10px 60px;
    li{
        line-height:26px;
        font-size:14px;
        color: #666;
    }
    .factpay{
        font-weight:bold;
    }
    }
    .item-bottom{
        padding-top: 10px;
        font-size:16px;
    .rebuy{
        background: #fff;
        border:1px solid #ccc;
        width:100px;
        line-height:30px;
        -webkit-border-radius:4px;
        -moz-border-radius:4px;
        border-radius:4px;
    }
    .goassess{
        background: #ea5a49;
        border:1px solid #ccc;
        width:100px;
        line-height:30px;
        color: #fff;
        -webkit-border-radius:4px;
        -moz-border-radius:4px;
        border-radius:4px;
    }
    }
    }
    }

</style>


