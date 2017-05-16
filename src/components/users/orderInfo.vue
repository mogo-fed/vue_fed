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
        <div class="showMapBtn" @click="showMapBtn">点击查看路程</div>
        <div id="allmap" class="hide">

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
          <span v-if="orderstatus==0">订单已取消</span>
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

        </div>

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
                cartList: [],
                isActive:false,
                orderstatus:1
            }
        },
        created() {
            this.orderstatus = this.$route.query.orderstatus;
            this.cartList = JSON.parse(this.$route.query.cartList);
            console.log(this.orderstatus,'this.orderstatus============');
            console.log(JSON.parse(this.$route.query.cartList),'cartList============');

           /* $app.$nextTick(function () {
                this.getCurrentLocation();
            });*/
        },
        methods: {
            // 获取当前位置
          /*  getCurrentLocation(){
                // 百度地图API功能
                let map = new BMap.Map("allmap");
                let point = new BMap.Point(121.462601,31.237669);
                map.centerAndZoom(point,12);
                //红色
                var icon2 = new BMap.Icon('src/static/images/ding2.png', new BMap.Size(40, 40), {
                    anchor: new BMap.Size(20, 40)
                });

                map.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用
                map.enableContinuousZoom(); //启用地图惯性拖拽，默认禁用
                let geolocation = new BMap.Geolocation();

                // 获取经纬度
                geolocation.getCurrentPosition(function(r) {
                    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                        let mk = new BMap.Marker(r.point);
                        map.addOverlay(mk);
                        map.panTo(r.point);
                        let xx = r.point.lng, yy = r.point.lat;
                        map.centerAndZoom(r.point, 15);
                        let markergps = new BMap.Marker(r.point, {
                            icon: icon2
                        });
                        map.addOverlay(markergps); //添加GPS标注
                        console.log('您的位置2：'+r.point.lng+','+r.point.lat);
                        // 获取地名
                        let gc = new BMap.Geocoder();
                        let point = new BMap.Point(r.point.lng,r.point.lat);
                        gc.getLocation(point, function(rs) {
                            alert(rs.sematic_description);
                            let addComp = rs.addressComponents;
                            let mapAddress = addComp.province+addComp.city + addComp.district
                                + addComp.street + addComp.streetNumber;
                            console.log(mapAddress,'----------------');
                        });
                    } else {
                        toast('定位失败' + this.getStatus());
                    }
                }, {
                    enableHighAccuracy: true
                });
            },*/

            getCurrentLocation(){
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showMap, handleError, {
                        enableHighAccuracy: true,
                        maximumAge: 1000
                    });
                } else {
                    alert('您的浏览器不支持使用HTML 5来获取地理位置服务');
                }

                function showMap(value) {
                    let map = new BMap.Map("allmap");
                    let x = value.coords.longitude; //原始坐标121.450997,31.234389
                    let y = value.coords.latitude;
                    let ggPoint = new BMap.Point(x, y);
                    map.centerAndZoom(ggPoint, 15);
//                    alert('您的位置111：' + x + ',' + y);
                    let _point = {"lng":x,"lat":y};
                    let mk = new BMap.Marker(_point);
                    map.addOverlay(mk);
                    map.panTo(_point);
                    let icon2 = new BMap.Icon('src/static/images/ding2.png', new BMap.Size(40, 40), {
                        anchor: new BMap.Size(20, 40)
                    });
                    map.addControl(new BMap.NavigationControl({
                        anchor: BMAP_ANCHOR_TOP_LEFT
                    }));

                    let markergps = new BMap.Marker(_point, {
                        icon: icon2
                    });
                    map.addOverlay(markergps); //添加GPS标注

                    // 获取地名
                    let gc = new BMap.Geocoder();
                    let point = new BMap.Point(x, y);
                    gc.getLocation(point, function (rs) {
                        console.log(JSON.stringify(rs), '=========getLocation');
                        let addComp = rs.addressComponents;
                        let mapAddress = addComp.province + addComp.city + addComp.district
                            + addComp.street + addComp.streetNumber;
                        alert(mapAddress, '----------------00000');
                    });

                    //原始坐标转百度坐标
                    /*let convertor = new BMap.Convertor();
                    let pointArr = [];
                    pointArr.push(ggPoint);
                    alert(111);
                    convertor.translate(pointArr, 1, 5, translateCallback);
                    alert(1112111);*/

                    //坐标转换完之后的回调函数
                    //translateCallback = function (data) {
                        alert(3);
                       // if (data.status === 0) {
                            let newX = x;
                            let newY = y;
                            console.log('您的位置：' + newX + ',' + newY);
                            let myP1 = new BMap.Point(newX, newY); //起点
                            let myP2 = new BMap.Point(121.535155, 31.238999); //终点
                            let myIcon = new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/Mario.png", new BMap.Size(32, 70), { //小车图片
                                imageOffset: new BMap.Size(0, 0) //图片的偏移量。为了是图片底部中心对准坐标点。
                            });
                            let driving2 = new BMap.DrivingRoute(map, {
                                renderOptions: {
                                    map: map,
                                    autoViewport: true
                                }
                            });
                            //驾车实例
                            driving2.search(myP1, myP2); //显示一条公交线路
                            run = function () {
                                alert('run');
                                let driving = new BMap.DrivingRoute(map); //驾车实例
                                driving.search(myP1, myP2);
                                driving.setSearchCompleteCallback(function () {
                                    let pts = driving.getResults().getPlan(0).getRoute(0).getPath(); //通过驾车实例，获得一系列点的数组
                                    let paths = pts.length; //获得有几个点
                                    let carMk = new BMap.Marker(pts[0], {
                                        icon: myIcon
                                    });
                                    map.addOverlay(carMk);
                                    i = 0;
                                    function resetMkPoint(i) {
                                        carMk.setPosition(pts[i]);
                                        if (i < paths) {
                                            setTimeout(function () {
                                                i++;
                                                resetMkPoint(i);
                                            }, 100);
                                        }
                                    }
                                    setTimeout(function () {
                                        resetMkPoint(5);
                                    }, 100)
                                });
                            }
                            setTimeout(function () {
                                run();
                            }, 1500);
                    //    }
                    //}

                }

                function handleError(value) {
                    switch (value.code) {
                        case 1:
                            alert('位置服务被拒绝');
                            break;
                        case 2:
                            alert('暂时获取不到位置信息');
                            break;
                        case 3:
                            alert('获取信息超时');
                            break;
                        case 4:
                            alert('未知错误');
                            break;
                    }
                }

            },

            // TODO 一进入页面 在created生命周期还没有渲染完成，无法获取地图容器；
            // TODO 使用$app.$nextTick(function () { }); 在created生命周期 $app 仍未定义
            //点击按钮 查看地图
            showMapBtn(){
//                $('.showMapBtn').hide();
                $('#allmap').show();
                this.getCurrentLocation();
            },
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
  #allmap{
    width:100%;
    height:250px;
    margin-bottom: 20px;
  }
  .showMapBtn{
    padding: 0 20px 20px;
    color: orange;
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
