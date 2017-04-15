<template>
    <div class="page has-navbar has-tabbar" v-nav="{title: '提交订单', showBackButton: true}">
        <div class="page-content" style="padding-top: 45px;height:100%;">
            <div class="cart__content">
                <div class="cart__address" @click="$router.forward('../edit/EditAddress')">
                    <div>
                        <p>凯迪克大厦 16层蘑菇公寓</p>
                        <p>云老师 1856345345</p>
                    </div>
                    <div class="cart__address--icon"><span class="icon ion-ios-arrow-right"></span></div>
                </div>
                <item>
                    支付方式
                    <span class="item-note dark">在线支付</span>
                </item>
                <item>
                    送达时间
                    <span class="item-note assertive">立即送出(大约12:00送达)</span>
                </item>
                <!--用餐人数-->
                <item class="item-icon-right" style="margin-bottom: 10px;" @click.native="showActionSheet('weixin')">
                    用餐人数<span class="item-note">{{personNumber}}</span>
                    <i class="icon ion-ios-arrow-right"></i>
                </item>
                <!--列表-->
                <div class="cart__list">
                    <item thin>
                        <i class="demo-icon icon-shoping assertive"></i> 菜更香
                    </item>
                    <ul>
                        <li class="cart__item" v-for="(item,index) in cartList">
                            <div class="cart__item--name">{{item.foodname}}</div>
                            <div class="cart__item--price">￥<span>{{item.foodprice}}</span>
                            </div>
                            <div class="cart__item--number">
                                <span class="cart__sub" @click="subNumber(index)"><i
                                        class="demo-icon icon-subtract"></i></span>
                                <span class="cart__num">{{item.foodnumber}}</span>
                                <span class="cart__add" @click="addNumber(index)"><i
                                        class="demo-icon icon-add"></i></span>
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
                        <div class="cart__item--price cart__total--price" style="color:#ea5a49;font-size: 14px;">￥{{totalMoney}}
                        </div>
                        <div class="cart__item--number dark">
                            <span class="cart__num">{{total}}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!--底部购物车-->
            <div class="cart__footer">
                <div class="cart__money">￥{{totalMoney}}</div>
                <div class="cart__submit" @click="submitOrder()">支付订单</div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery';
    export default {
        data() {
            return {
                personNumber: '以便商家给您带够餐具',
                cartList: this.$route.query.cartList,

            }
        },
        created() {
            console.log(this.$route.query.cartList);

        },
        methods: {

            //下拉选择人数
            showActionSheet(theme) {
                $actionSheet.show({
                    theme: theme || '',
                    title: '请选择用餐人数',
                    buttons: {
                        '1人': () => {
                            this.personNumber = '1人';
                            console.log('action 1 called.')
                        },
                        '2人': () => {
                            this.personNumber = '2人';
                            console.log('action 2 called.')
                        },
                        '3人': () => {
                            this.personNumber = '3人';
                            console.log('action 3 called.')
                        },
                        '4人': () => {
                            this.personNumber = '4人';
                            console.log('action 4 called.')
                        },
                        '最多5人': () => {
                            this.personNumber = '5人';
                            console.log('action 5 called.')
                        }
                    }
                })
            },
            //单独的删除
            subNumber(index){
                if (this.cartList[index].foodnumber > 1) {
                    this.cartList[index].foodnumber -= 1;
                } else {
                    this.cartList[index].foodnumber = 1;
                    $dialog.confirm({
                        // 设置为ios样式
                        theme: 'ios',
                        // 标题
                        title: '您确定要移除这个菜吗？',
                        // 取消按钮文本
                        cancelText: '取消',
                        // 确定按钮文本
                        okText: '确定'
                    }).then((res) => {
                        this.cartList.splice(index, 1);
                        console.log(this.cartList);
                    })
                }
                console.log('subNumber');
            },
            //单独的增加
            addNumber(index){
                this.cartList[index].foodnumber += 1;
                console.log('addNumber');
            },
            //提交
            submitOrder(){
                $toast.show('支付成功', 3000).then(() => {
                    console.log('toast hide');
                    $router.push({path:'orderDetail',query:{cartList:this.cartList,totalnum:this.total,totalmoney:this.totalMoney,personNumber:this.personNumber}});
                })
            }
        },
        computed: {
            total(){
                let totalNumber = 0;
                this.cartList.forEach(function (val) {
                    totalNumber += parseInt(val.foodnumber);
                });
                console.log(totalNumber);
                return totalNumber + 2;
            },
            totalMoney(){
                let money = 0;
                this.cartList.forEach(function (val) {
                    money += parseInt(val.foodnumber) * parseInt(val.foodprice);
                });
                return money + 4;
            }

        }
    }
</script>

<style scoped type="text/css">
    .item {
        font-size: 12px;
    }

    .item-note {
        font-size: 12px;
    }

    .cart__content {
        height: calc(100% - 52px);
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .cart__address {
        background: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 4% 0;
        border-bottom: 1px solid #ddd;
        margin-bottom: 10px;
    }

    .cart__address--icon {
        padding-left: 10px;
        font-size: 24px;
        color: #ddd;
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

    .cart__sub {
        font-size: 20px;
        color: #999;
        vertical-align: text-bottom;
    }

    .cart__num {
        display: inline-block;
    }

    .cart__add {
        font-size: 22px;
        color: #64cdb9;
        vertical-align: text-bottom;
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

    .cart__footer {
        width: 100%;
        background: #fff;
        border-top: 1px solid #ddd;
        height: 52px;
        line-height: 52px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-item: center;
    }

    .cart__money {
        padding-left: 4%;
        font-size: 20px;
        color: #64cdb9;
        font-weight: 400;
    }

    .cart__submit {
        flex-basis: 120px;
        color: #fff;
        background: #ea5a49;
        text-align: center;
        font-size: 20px;
    }
</style>
