<template>
  <div class="page has-navbar has-tabbar" v-tabbar-menu-index="1">
    <von-header theme="light">
      <span slot="title">全部订单</span>
    </von-header>
    <div class="page-content" style="padding-top: 45px;">
      <div style="height:10px;width:100%;"></div>

      <div v-show="orderPerShow" style="text-align: center; margin-top: 10%;">
        暂无订单~
      </div>

      <!--全部订单列表-->
      <div class="order-list" v-show="orderPer.length != 0">
        <div class="order-list-item" v-for="item in orderPer">
          <div class="item-top">
            <img v-show="item[0].userAvatar" :src="item[0].userAvatar" alt="" class="left">
            <img v-show="!item[0].userAvatar" src="../../static/images/restaurant.jpg" alt="" class="left">
            <div class="left">
              <span class="seller-title">{{item[0].userSellername}}</span>
              <i class="ion-ios-arrow-right"></i>
            </div>

            <span class="order-state right" v-show="item[0].orderStatus==1">等待商家接单</span>
            <span class="order-state right" v-show="item[0].orderStatus==2">订单配送中</span>
            <span class="order-state right" v-show="item[0].orderStatus==3">订单完成</span>

          </div>

          <item class="item-center">
            <ul @click="checkOrderInfo" :data-orderstatus="item[0].orderStatus">
              <li v-for="it in item" >
                <span>{{it.mdName}}</span>
                <span class="right">x {{it.orderSingleNumber}}</span>
                <span style="margin: 0 20%;">{{it.mdNowprice}}</span>
              </li>

              <div style="margin: 10px 0;">
                <span class="right" v-for="(count,index) in total">
                    共
                  <span>
                    {{count.num}}
                  </span>
                  件商品&nbsp;&nbsp;
                    实付
                  <span class="factpay">￥
                    <em>
                      {{count.price}}
                    </em>
                  </span>
                </span>
              </div>
            </ul>
          </item>
          <div class="item-bottom right">

            <span v-if="item[0].orderStatus==1"></span>
            <button class="rebuy" v-if="item[0].orderStatus==2" @click="receipt" :data-ordernumber="item[0].orderNumber">确认收货</button>
            <button class="rebuy" v-if="item[0].orderStatus==3">再来一单</button>

            <button class="goassess">去评价</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import $ from 'jquery';
    export default {
        data() {
            return {
                orderPer:{},
                orderPerShow:true,
                total:[]
            }
        },
        created() {
            //查询所有订单
            this.getOrderStatus3();
        },
        methods:{
            getOrderStatus3(){
                let _this = this;
                $.post('/ssm/orderdetail/queryOrderDetailAll',{userid:localStorage.userid}).then(function (order) {
                    console.log(order,'============orders');
                    if(order.length != 0){
                        _this.orderPerShow = false;
                    }
                    let data={};
                    order.forEach((v,k)=>{
                        data[v.orderNumber] ? data[v.orderNumber].push(v) : data[v.orderNumber]=[v];
                    });
                    _this.orderPer = data;
                    console.log(_this.orderPer,'------------');
                    _this.totalCal();
                });
            },
            totalCal(){
                let _this = this;
                for(let key in this.orderPer){
                    let obj = this.orderPer[key];
                    let a=[],b=[];
                    let num = 0,price = 0;
                    obj.forEach((v,k)=>{
                        num += Number(v.orderSingleNumber);
                        price += Number(v.mdNowprice)*Number(v.orderSingleNumber);
                    })
                    _this.total.push({
                        num:num,
                        price:price
                    });
                }
                console.log(_this.total,'totalNum---------');
            },
            // 用户点击确认收货，更改订单状态
            receipt(){
                let _this = this;
                let ordernumber = $(event.currentTarget).data('ordernumber');
                console.log(ordernumber,'========ordernumber');
                $.post('/ssm/order/updateOrderStatus',{userid:localStorage.userid ,sellerid:0 ,order_number:ordernumber,order_status:3}).then(function (order) {
                    console.log(order,'------------order222');
                    if(order == 2){
                        _this.getOrderStatus3();
                    }
                });
            },
            // 查看订单详情页
            checkOrderInfo(){
                let _this = this;
                $router.push({
                    path:'orderInfo',
                    query:{
                        orderstatus:$(event.currentTarget).data('orderstatus'),
                        cartList:localStorage.cartList
                    }
                });
            }
        }
    }
</script>

<style scoped lang="sass" type="text/css">
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
