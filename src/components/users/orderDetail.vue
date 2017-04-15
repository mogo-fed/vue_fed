<template>
  <div class="page has-navbar has-tabbar"  v-nav="{title: '订单详情', showBackButton: true}">
    <div class="page-content" style="padding-top: 45px;height:100%;">
      <div class="cart__content">
        <!-- 订单已完成 -->
        <div class="order__top">
            <img src="src/static/images/success.png" />
            <span>订单已完成</span>
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


      </div>

      <!--底部购物车-->
      <div class="order__again">再来一单
      </div>
    </div>
  </div>
</template>

<script>
    import $ from 'jquery';
    export default {
        data() {
            return {
                cartList: this.$route.query.cartList
            }
        },
        created() {
            console.log(this.$route.query.cartList);
        },
        methods: {


        },
        computed:{
        }
    }
</script>

<style scoped lang="sass" type="text/css">
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
    height: calc(100% - 52px);
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
