<template>
  <div class="page has-navbar has-tabbar"  v-nav="{title: '订单', showBackButton: true,onBackButtonClick}">
    <tabs :tab-items="tabs" :tab-index="tabIndex" :on-tab-click="onTabClick"></tabs>
    <div class="page-content" style="height:100%;">
      <div class="order-status" v-show="tabIndex==0">
        <list>
          <item class="item-title" :class="{active:orderstatus==1}">
            订单已提交

          </item>
          <item thin class="item-note-msg" :class="{active:orderstatus==1}">
            请耐心等待商家确认
          </item>
        </list>

        <list>
          <item class="item-title" :class="{active:orderstatus==2}">
            商家已接单

          </item>
          <item thin class="item-note-msg" :class="{active:orderstatus==2}">
            商品准备中，由商家配送，配送进度请咨询商家
          </item>
        </list>

        <!--地图-->
        <div class="map">

        </div>

        <list>
          <item  class="item-title" :class="{active:orderstatus==2}">
            商家配送中
           <!-- <span class="item-note">
            下单时间
          </span>-->
          </item>
          <item thin class="item-note-msg" :class="{active:orderstatus==2}">
            请等待配送
          </item>
        </list>

        <list>
          <item  class="item-title" :class="{active:orderstatus==3}">
            配送完成
          </item>
        </list>

      </div>

      <div class="cart__content" v-show="tabIndex==1">
        <!-- 订单已完成 -->
        <div class="order__top">
          <img src="src/static/images/success.png" />
          <span v-if="orderstatus==1">等待商家接单</span>
          <span v-if="orderstatus==2">订单配送中</span>
          <span v-if="orderstatus==3">订单已完成</span>
        </div>
        <!--列表-->
        <div class="cart__list">
          <item thin>
            <i class="demo-icon icon-shoping assertive"></i> 菜更香
          </item>
          <ul>
            <li class="cart__item" v-for="item in cartList">
              <div class="cart__item--name">{{item.foodname}}</div>
              <div class="cart__item--price">￥<span>{{item.foodprice}}</span>
              </div>
              <div class="cart__item--number">
                <span class="cart__num">{{item.foodnumber}}</span>
              </div>
            </li>

            <li class="cart__item">
              <div class="cart__item--name">餐盒费</div>
              <div class="cart__item--price">￥2</div>
              <div class="cart__item--number">
                <span class="cart__num">1</span>
              </div>
            </li>
            <li class="cart__item">
              <div class="cart__item--name">配送费</div>
              <div class="cart__item--price">￥2</div>
              <div class="cart__item--number">
                <span class="cart__num">1</span>
              </div>
            </li>
          </ul>
          <div class="cart__total">
            <div class="cart__item--name">总计</div>
            <div class="cart__item--price cart__total--price" style="color:#ea5a49;font-size: 14px;">￥{{$route.query.totalmoney}}
            </div>
            <div class="cart__item--number dark">
              <span class="cart__num">{{$route.query.totalnum}}</span>
            </div>
          </div>
        </div>
        <!-- 订单信息 -->
        <list>
          <item thin>
            配送信息
          </item>
          <item>
            订单号码
            <span class="item-note">
            1234567890
          </span>
          </item>
          <item>
            订单时间
            <span class="item-note">
            2017-04-15 17:16
          </span>
          </item>
          <item>
            支付方式
            <span class="item-note">
            在线支付
          </span>
          </item>
          <item>
            用餐人数
            <span class="item-note">
           {{$route.query.personNumber}}
          </span>
          </item>
        </list>

        <!--底部购物车-->
        <div class="order__again">再来一单</div>
      </div>

    </div>
  </div>
</template>

<script>
    import $ from 'jquery';
    export default {
        data() {
            return {
                tabs: [
                    "订单状态",
                    "订单详情"
                ],
                tabIndex: 0,
                cartList: this.$route.query.cartList,
                isActive:false,
                orderstatus:1
            }
        },
        created() {
//            console.log(this.$route.query.cartList,'cartList============');
            this.orderstatus = this.$route.query.orderstatus;
            console.log(this.orderstatus,'this.orderstatus============');



        },
        methods: {
            //tab切换时 处理输入框显示隐藏
            onTabClick(index) {
                console.log(this.tabIndex);
                if (index == 1){
                    this.tabIndex = 0;
                }else if(index == 0){
                    this.tabIndex = 1;
                }
                this.tabIndex = index;
            },
            onBackButtonClick:function () {
                $router.back('./orders');
            }
        }
    }
</script>

<style scoped lang="sass" type="text/css">
  .map{
    width:100%;
    height:200px;
    margin-bottom: 20px;
  }
  .order-status .list,list{
    border-left: 2px solid orange;
    margin-left: 20px;
  }
  .item-title{
    color: #ddd;
    font-size: 14px !important;
    background-color:#eee;
  }
  .item-title.active{
    color: orange;
    font-size: 14px !important;
    background-color:#fff;
  }
  .item-note-msg{
    color: #ddd;
    background-color:#eee;
  }
  .item-note-msg.active{
    color: #666;
    background-color:#fff;
  }
  .item {
    font-size: 12px;
  }

  .item-note {
    font-size: 12px;
  }

  .order__top{
    background:#fff;
    border-bottom: 1px solid #ddd;
  }
.order__top{
  text-align: center;
  padding:10px 0;
}
.order__top img{
  width:100px;
  display: block;
  margin:0 auto;
}
  .order__top span{
    font-size:16px;
  }

  .cart__content {
    /*height: calc(100% - 52px);*/
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .cart__list {
    margin-top: 10px;
  }

  .cart__list {
    background: #fff;
    margin-bottom: 10px;
  }

  .cart__list ul {
    list-style: none;
    padding: 0 2%;
  }

  .cart__item {
    display: flex;
    border-bottom: 1px solid #ddd;
    justify-content: space-between;
    align-items: center;
    min-height: 50px;
    padding: 10px 0;
    font-size: 12px;
    padding-left: 12px;
  }

  .cart__item--name {
    flex: 3;
  }

  .cart__item--price {
    flex: 1;
    color: #999;
    text-align: left;
    padding: 0 5px;
  }

  .cart__item--number {
    flex-basis: 80px;
    text-align: center;
  }

  .cart__num {
    display: inline-block;
  }

  .cart__total {
    display: flex;
    border-bottom: 1px solid #ddd;
    justify-content: space-between;
    align-items: center;
    min-height: 50px;
    padding: 10px 0;
    font-size: 12px;
    padding-left: 12px;
  }

  .order__again {
    width: 100%;
    background: #64cdb9;
    height: 52px;
    line-height: 52px;
    color:#fff;
    text-align: center;
    font-size:20px;
    font-weight: 400;
  }

</style>
