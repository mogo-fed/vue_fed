<template>
    <div class="page has-navbar has-tabbar" v-nav="{title: '菜更香', showBackButton: true}">
        <div class="page-content" style="padding-top: 45px;height:100%;">
            <div class="detail__top">
                <div class="detail__top--con">
                    <div class="detail__top--left">
                        <div class="detail__top--logo"><img src="/src/static/images/restaurant.jpg"></div>
                    </div>
                    <div class="detail__top--right">
                        <div class="detail__top--title">菜更香</div>
                        <div class="detail__top--remark">月销量：103笔</div>
                        <div class="detail__top--remark"><span><i class="demo-icon icon-location"></i>1.6km</span><span>￥19元起送</span></div>
                    </div>
                </div>
            </div>
            <div style="position: relative;margin-top:-49px;height:93px;">
                <tabs :tab-items="tabs" :tab-index="tabIndex" :on-tab-click="onTabClick"></tabs>
            </div>
            <div style="height:calc(100% - 188px);overflow:hidden;">
                <div v-show="tabIndex==0" class="detail__con">
                    <!--列表了-->
                    <div class="detail__menu--title menu-wrapper" ref="menuWrapper">
                        <ul>
                            <li v-for="(item,index) in menuSortData" @click="menuClick(index,$event)" :class="index==menuCurrentIndex?'menu-item-selected':'menu-item'"> {{item.msName}}</li>
                        </ul>
                    </div>
                    <div class="detail__menu--con" id="wrapper" ref="foodsWrapper">
                        <ul>
                            <li v-for="(item,indexClass) in goods" class="food-list food-list-hook">
                                <h1>{{item.name}}</h1>
                                <ul>
                                    <li v-for="(food,index) in item.foods"   @click="menuChoose(indexClass,index,food)" :class="selectedFood.indexOf(indexClass+''+index) > -1?'food-item choose':'food-item'" :data-name="food.name" :data-price="food.price">

                                        <div class="icon"><img width="57" height="57" :src="food.icon" /></div>
                                        <div class="content">
                                            <h2>{{food.name}}</h2>
                                            <div class="sell-info">
                                                <span class="sellCount">月售{{food.sellCount}}份</span>
                                                <span class="rating">好评率{{food.rating}}%</span>
                                            </div>
                                            <div class="price">
                                                <span class="newPrice"><span class="unit">￥</span>{{food.price}}</span>
                                                <span v-show="food.oldPrice" class="oldPrice">￥{{food.oldPrice}}</span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <!--/列表了-->
                </div>
                <div v-show="tabIndex==1" class="detail__con">
                    <list>
                        <item>
                            电话<span class="item-note">02112345678</span>
                        </item>
                        <item>
                            地址<span class="item-note">上海市静安区江宁路凯迪克大厦</span>
                        </item>
                        <item>
                            配送时间<span class="item-note">10:30-21:00</span>
                        </item>
                        <item style="line-height:20px;">
                            商家活动<span class="item-note">①满23减5;满60减13(在线支付专享)<br />②新用户立减24元<br />③该商家支持在线支付</span>
                        </item>
                    </list>
                </div>
            </div>
            <!--底部购物车-->
            <div class="detail__footer">
                <div class="detail__footer--left">
                        <div class="detail__footer--cart">
                            <span v-bind:class="{active:isActive}">
                                <i class="demo-icon icon-cart"></i>
                            </span>
                        </div>
                    </div>
                <div class="detail__footer--money">配送费￥4</div>
                <div class="detail__footer--btn" v-bind:class="{active:isActive}" @click="toOrder()">选好了</div>
            </div>

        </div>

    </div>
</template>
<script type="text/javascript">
import $ from 'jquery';
import BScroll from 'better-scroll';
export default {
    data() {
        return {
            tabs: [
                "点菜",
                "商家详情",
            ],
            tabIndex: 0,
            goods: [],
            listHeight: [],
            foodsScrollY: 0,
            isActive:false,
            selectedFood:[],
            cartList:[],
            menuSortData:[],
            menuDetailData:[]
        }
    },
    created() {
        $.get('data.json').then((res) => {
            this.goods = res.goods;
            console.log(res.goods,'=======res.goods===========');
            this.$nextTick(() => {
                this._initScroll(); // 初始化scroll
                this._calculateHeight(); // 初始化列表高度列表
            })
        });
        this.getMenuSort();
//        this.getMenuDetail();
    },
    props: {
        seller: Object
    },
    computed: {
        menuCurrentIndex() {
            for (let i = 0, l = this.listHeight.length; i < l; i++) {
                let topHeight = this.listHeight[i];
                let bottomHeight = this.listHeight[i + 1];
                if (!bottomHeight || (this.foodsScrollY >= topHeight && this.foodsScrollY < bottomHeight)) {
                    return i;
                }
            }
            return 0;
        }
    },
    methods: {
        getMenuSort(){
            let _this = this;
            $.get('/ssm/menusort/queryMenuSortAll').then(function (menuSortData) {
                _this.menuSortData = menuSortData;
                console.log(this.menuSortData,'=========menuSortData========');
            });
        },
        getMenuDetail(){
            let _this = this;
            $.get('/ssm/menudetail/queryMdByMsId',{msId:''}).then(function (menuDetailData) {
                _this.menuDetailData = menuDetailData;

                console.log(this.menuDetailData,'=========menuDetailData=========');
            });
        },
        onTabClick(index) {
            console.log(index);
            this.tabIndex = index;
        },
        _initScroll() {
            this.menuWrapper = new BScroll(this.$refs.menuWrapper, {
                click: true
            });
            this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                click: true,
                probeType: 3
            });
            // 监控滚动事件
            this.foodsScroll.on('scroll', (pos) => {
                this.foodsScrollY = Math.abs(Math.round(pos.y));
            })
        },
        _calculateHeight() {
            let foodList = this.$refs.foodsWrapper.querySelectorAll('.food-list-hook');
            let height = 0;
            this.listHeight.push(height);
            for (let i = 0, l = foodList.length; i < l; i++) {
                let item = foodList[i];
                height += item.clientHeight;
                this.listHeight.push(height);
            }
        },
        menuClick(index, event) {
            if (!event._constructed) {
                return;
            }
            this.foodsScroll.scrollTo(0, -this.listHeight[index], 300)
        },
        menuChoose(indexClass,i, food){
            let s=indexClass+''+i;
            let index = this.selectedFood.indexOf(s);
            let chooseFood={
                foodname:$(event.currentTarget).data('name'),
                foodprice:$(event.currentTarget).data('price'),
                foodnumber:1
            };
            if (index == -1) {
                this.selectedFood.push(s);
                this.cartList.push(chooseFood);
            } else {
                this.selectedFood.splice(index, 1);
                this.cartList.splice(index, 1);
            }

            this.selectedFood.sort();
            this.cartList.sort();
            console.log(this.cartList);
            if(this.selectedFood.length>0){
                this.isActive=true;
            }else{
                this.isActive=false;
            }
        },
        toOrder(){
            if(!this.isActive){
                return ;
            }
            $router.push({path:'cart',query:{cartList:this.cartList}});
        }
    }
}
</script>
<style lang="scss" scoped type="text/css">
.detail__top {
    background: url(/src/static/images/detailBg.jpg) no-repeat;
    padding: 10px 4%;
    min-height: 80px;
    background-size: cover;
}

.detail__top--con {
    display: flex;
    align-items: center;
}

.detail__top--left {
    flex-basis: 80px;
}

.detail__top--logo {
    border-radius: 100%;
    overflow: hidden;
    height: 70px;
    width: 70px;
    border: 4px solid rgba(255, 255, 255, .3);
}

.detail__top--logo img {
    width: 100%;
}

.detail__top--right {
    color: #fff;
}

.detail__top--title {
    color: #fff;
    font-size: 18px;
    line-height: 30px;
}

.detail__top--remark {
    line-height: 22px;
    font-size: 12px;
}

.detail__top--remark span {
    font-size: 14px;
    margin-right: 20px;
}

.detail__con {
    display: flex;
    height: 100%;
    overflow: hidden;
}

.detail__menu--title {
    flex-basis: 100px;
    background: #efefef;
    height: 100%;
    overflow-y: scroll;
}

.detail__menu--title ul {
    list-style: none;
}

.menu-item {
    display: flex;
    align-items:center;
    justify-content: center;
    height: 50px;
    text-align: center;
    color: #333;
    border-bottom: 1px dashed #dedede;
}

.menu-item-selected {
     display: flex;
    align-items:center;
    justify-content: center;
    height: 50px;
    text-align: center;
    color: #64cdb9;
    background: #fff;
}

.detail__menu--con {
    width: 100%;
    background: #fff;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
}

.detail__menu--tag {
    display: block;
    height: 30px;
    line-height: 30px;
    background: #ededed;
    padding-left: 10px;
    font-size: 12px;
    color: #999;
}

.list {
    width: 100%;
}

.food-list h1 {
    height: 30px;
    line-height: 30px;
    background: #ededed;
    border-left: 2px solid #ddd;
    padding-left: 10px;
    color: #999;
    font-size: 12px;
}

.food-list ul {
    list-style: none;
}

.food-item {
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    margin:5px 0;
    padding:5px 0;
}
.food-item.choose {
    background:#fcf8e8;
}
.food-item .icon {
    flex-basis: 57px;
}

.food-item .content {
    padding-left:10px;
}
.food-item .content h2{
    margin-top: 2px;
    font-size: 14px;
    line-height: 10px;
    color: #666;
}
.food-item .content .price {
    font-size: 10px;
    font-weight: 700;
}
.food-item .content .newPrice {
    font-size: 14px;
    color: rgb(240, 20, 20);
}
.food-item .content .unit {
    font-size: 10px;
    font-weight: normal;
}
.food-item .content .oldPrice {
    text-decoration: line-through;
    color: rgb(147, 153, 159);
    padding-left: 4px;
}
.detail__footer{
    width:100%;
    background:#494949;
    height:52px;
    line-height:52px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content:space-between;
    align-item:center;
}
.detail__footer--left{
    flex:1;
    position: relative;
}
.detail__footer--cart{
    height:60px;
    width:60px;
    background:#494949;
    border-radius: 100%;
    position:absolute;
    top:-20px;
    left:10%;
}
.detail__footer--cart span{
    display:block;
    width:50px;
    height:50px;
    position:absolute;
    top:5px;
    left:5px;
    color:#999;
    border-radius: 100%;
    line-height:44px;
    text-align: center;
    font-size:30px;
}
.detail__footer--cart span.active{
    background: #64cdb9;
    color:#fff;
}
.detail__footer--money{
    font-size:14px;
    color:#bfbfbf;
    flex:2;
}
.detail__footer--btn{
    flex:2;
    background:#6c6c6c;
    color:#999;
    font-weight: 400;
    font-size:20px;
    text-align: center;
}
.detail__footer--btn.active{
    background:#64cdb9;
    color:#fff;
}

</style>
