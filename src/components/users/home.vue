<template>
    <div class="page has-tabbar" v-tabbar-menu-index="0" style="overflow-y:scroll;">
        <div>
            <!--轮播图-->
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide slide-banner">
                        <img class="imgload" src="src/static/images/banner1.jpg" alt="首页banner图片01">
                    </div>
                    <div class="swiper-slide">
                        <img class="imgload" src="src/static/images/banner2.jpg" alt="首页banner图片02">
                    </div>
                </div>
                <div class="swiper-slide">
                    <img class="imgload" src="src/static/images/banner3.jpg" alt="首页banner图片03">
                </div>
                <!-- 如果需要分页器 -->
                <div class="swiper-pagination"></div>
            </div>

            <div class="index__menu">
                <div class="index__location"><span><i class="demo-icon icon-location index__location--icon"></i></span><a class="index__location--name">江宁路凯迪克大厦</a></div>

                <ul class="index__menu--ul">
                    <li>
                        <a class="index__menu--a" href="javascript:;">
                            <span class="index__menu--food"><i class="demo-icon icon-food"></i></span>
                            <p>特色美食</p>
                        </a>
                    </li>
                    <li>
                        <a class="index__menu--a" href="javascript:;">
                            <span class="index__menu--drink"><i class="demo-icon icon-drink"></i></span>
                            <p>清凉饮品</p>
                        </a>
                    </li>
                    <li>
                        <a class="index__menu--a" href="javascript:;">
                            <span class="index__menu--fruit"><i class="demo-icon icon-fruit"></i></span>
                            <p>新鲜水果</p>
                        </a>
                    </li>
                    <li>
                        <a class="index__menu--a" href="javascript:;">
                            <span class="index__menu--chaoshi"><i class="demo-icon icon-chaoshi"></i></span>
                            <p>便利超市</p>
                        </a>
                    </li>
                    <li>
                        <a class="index__menu--a" href="javascript:;">
                            <span class="index__menu--flower"><i class="demo-icon icon-flower"></i></span>
                            <p>鲜花蛋糕</p>
                        </a>
                    </li>
                    <li>
                        <a class="index__menu--a" href="javascript:;">
                            <span class="index__menu--pinpai"><i class="demo-icon icon-pinpai"></i></span>
                            <p>品牌馆</p>
                        </a>
                    </li>
                    <li>
                        <a class="index__menu--a" href="javascript:;">
                            <span class="index__menu--chicken"><i class="demo-icon icon-chicken"></i></span>
                            <p>小吃夜宵</p>
                        </a>
                    </li>
                    <li>
                        <a class="index__menu--a" href="javascript:;">
                            <span class="index__menu--tianpin"><i class="demo-icon icon-tianpin"></i></span>
                            <p>美味甜品</p>
                        </a>
                    </li>
                </ul>
                
            </div>
            <!-- 活动页 -->
            <a class="index__active" href="javascript:;"><img src="src/static/images/active1.jpg" /></a>
            <div class="index__active2">
                <a href="javascript:;" style="border-right:1px solid #ddd;"><img src="src/static/images/active2.jpg" /></a>
                <a href="javascript:;"><img src="src/static/images/active3.jpg" /></a>
            </div>

            <!-- 商家列表 -->

            <div class="seller_list">
                <item @click.native="toFoodDetail" v-for="item in sellerAllInfo" :data-sellerId="item.userId">
                    <div class="left seller_list_divimg">
                        <img :src='item.userAvatar' alt="商家图片">
                    </div>
                    <div class="seller_list_info">
                        <p class="seller-title">{{item.userSellerName}}<span class="right">88km</span></p>
                        <div class="month-sell">
                            月售
                            <span class="">{{item.userMonthSale}}</span>
                        </div>
                        <div class="sell-price">
                            起送 <span>￥{{item.userSendPay}}</span>
                            &nbsp;&nbsp;  | &nbsp;&nbsp;配送 <span>￥{{item.userDistributionPay}}</span>
                        </div>
                    </div>
                </item>
            </div>
            <div style="height:60px;width:100%;"></div>
        </div>
    </div>
    </div>
</template>
<script>
import $ from 'jquery';
import Swiper from 'swiper'
export default {
        data() {
            return {
                sellerAllInfo:[]
            }
        },
        created() {
            this.getUserAll();
        },
        methods: {
            back() {
                $router.back({
                    path: '/home'
                });
            },
            getUserAll() {
                let _this = this;
                $.post('/ssm/user/queryUserAll').then(function(sellerAllInfo) {
                    _this.sellerAllInfo = sellerAllInfo;
                    console.log(sellerAllInfo,'=======sellerAllInfo=======');
                });
            },
            toFoodDetail(){
                //得到当前选中的商家id
                let sellerId = $(event.currentTarget).data('sellerid');
                console.log(sellerId,'--------------sellerid-------');
                $router.push({path:'foodDetail',query:{sellerId:sellerId}});
            }
        },
        components: {},
        mounted() {
            let mySwiper1 = new Swiper('.swiper-container', {
                direction: 'horizontal',
                loop: true,
                autoplay: 2000, //可选选项，自动滑动
                pagination: '.swiper-pagination'
            });

        }

}
</script>
<style scoped="" lang="sass" type="text/css">
    .left{
        float: left;
    }
    .right{
        float: right;
    }
    .seller_list {
        background: #fff;
        item{
            height:120px;
            padding: 10px;
            clear: both;
            border-bottom: 1px solid #eee;
        }
    }
    .seller_list_divimg{
        width: 150px;
        height:100px;
        margin-right: 12px;
        img{
            width:100%;
            height:100%;
        }
    }
    .seller_list_info{
        p.seller-title{
            font-size:18px;
            font-weight:bold;
            line-height:30px;
            span.right{
                font-size:12px;
                font-weight:normal;
                color: #666;
            }
        }
        .month-sell{
            font-size:12px;
            color: #999;
        }
        .sell-price{
            line-height:30px;
            font-size:12px;
            color: #666;
            span{
                color:#ea5a49;
            }
        }
    }





    header {
    background-color: rgb(68, 204, 0);
    padding: 10px 15px;
}

.swiper-container {
    width: 100%;
    height: 210px;
}

.swiper-container img {
    width: 100%;
    height: 100%;
}

.classify {
    width: 100%;
    height: 400px;
}

.type-icon {
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 1px solid #ccc;
}


/**顶部菜单**/

.index__menu {
    background: #fff;
    border-bottom: 1px solid #ddd;
    padding-top: 10px;
    margin-bottom: 10px;
}

.index__location {
    height: 45px;
    position: relative;
    text-align: center;
}

.index__location span {
    display: block;
    width: 40px;
    height: 30px;
    border-radius: 100%;
    background: #fff;
    line-height: 27px;
    color: #fd2e4a;
    text-align: center;
    position: absolute;
    left: 50%;
    margin-left: -20px;
    top: -24px;
    z-index: 9;
    font-size: 20px;
}

.index__location--name {
    display: inline-block;
    margin: 0 auto;
    text-align: center;
    background: #fdefe6;
    color: #333;
    padding: 3px 16px;
    border-radius: 20px;
    margin-top: 6px;
    font-size: 12px;
}

.index__menu--ul {
    list-style: none;
    clear: both;
    display: flex;
    display: -webkit-flex;
    /* Safari */
    flex-wrap: wrap;
}

.index__menu--ul li {
    width: 25%;
    margin-bottom: 10px;
}

.index__menu--a {
    display: block;
    text-align: center;
    text-decoration: none;
}

.index__menu--a span {
    display: block;
    height: 50px;
    width: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 100%;
    background: #fd2e4a;
    font-size: 20px;
    color: #fff;
    margin: 0 auto 10px;
}

.index__menu--a p {
    color: #333;
    line-height: 12px;
    font-size: 12px;
}

.index__menu--a span.index__menu--food {
    background: #ffce57;
}

.index__menu--a span.index__menu--drink {
    background: #be6fdb;
}

.index__menu--a span.index__menu--fruit {
    background: #feaf48;
}

.index__menu--a span.index__menu--chaoshi {
    background: #ff77ab;
}

.index__menu--a span.index__menu--flower {
    background: #74d886;
}

.index__menu--a span.index__menu--pinpai {
    background: #79b0ff;
}

.index__menu--a span.index__menu--chicken {
    background: #fb7070;
}

.index__menu--a span.index__menu--tianpin {
    background: #59cfdd;
}

.icon-drink,
.icon-chicken {
    font-size: 24px;
}

.index__active {
    display: block;
    background: #fff;
    border-bottom: 1px solid #ddd;
    width: 100%;
    vertical-align: middle;
    line-height: 1;
    img {
        width: 100%;
    }
}

.index__active2 {
    display: flex;
    flex-wrap: wrap;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
    a {
        width: 50%;
        box-sizing: border-box;
        display: block;
        background: #fff;
        vertical-align: middle;
        line-height: 1;
        img {
            width: 100%;
        }
    }
}



</style>
