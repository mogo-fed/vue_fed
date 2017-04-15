<template>
    <div class="page has-navbar has-tabbar" v-tabbar-menu-index="2">
        <div class="member__bg">
            <div class="member__top">
                <div class="member__tx">
                    <img src="/src/static/images/tx.jpg" />
                </div>
                <div class="member_name">{{userinfo.userName}}</div>
                <div class="member_name" v-show="userInfo" @click='goLogin'>登录 / 注册</div>
            </div>
        </div>

 	  <!--<item class="item-icon-right" @click.native="$router.forward('/edit/EditName')">
        用户名<span class="item-note">{{userinfo.userName}}</span>
        <i class="icon ion-ios-arrow-right"></i>
      </item>-->
      <item class="item-icon-right" @click.native="$router.forward('/edit/EditPhone')">
      手机号<span class="item-note">{{userinfo.userTel}}</span>
       <i class="icon ion-ios-arrow-right"></i>
     </item>
      <item class="item-icon-right" @click.native="$router.forward('/edit/EditPwd')">
      修改密码<span class="item-note"></span>
       <i class="icon ion-ios-arrow-right"></i>
     </item>
      <item class="item-icon-right" @click.native="$router.forward('/edit/EditAddress')">
      我的地址<span class="item-note"></span>
       <i class="icon ion-ios-arrow-right"></i>
     </item>
    </div>
</template>
<script type="text/javascript">
import $ from 'jquery';
export default {
    data() {
    	return {
            userInfo:true,
    	    userinfo:'',
    	    username : localStorage.getItem('username'),
            userpwd : localStorage.getItem('userpwd'),
            useradr : localStorage.getItem('useradr'),
            usertype : localStorage.getItem('usertype')
    	}
    },
    created(){
        this.getUserInfo();
    },
    methods:{
        getUserInfo(){
            let _this = this;
            $.get('/ssm/user/queryByName',{username:this.username,userpwd:this.userpwd,usertype:this.usertype}).then( function (data) {
                console.log(data,'data111111111');
                console.log(data.userTel,'0000000');
                localStorage.setItem('usertel',data.userTel);
                _this.userinfo = data;
                if(data != 0){
                    _this.userInfo = false;
                }
            } );
        },
        goLogin(){
            $router.forward('/login');
        }
    }
}
</script>

<style scoped="" type="text/css">
.member__bg {
    width: 100%;
    height: 200px;
    background: url("/src/static/images/memberbg.jpg") no-repeat center center;
    background-size: cover;
    position: relative;
    margin-bottom: 10px;
}

.member__top {
    position: absolute;
    top: 20%;
    width: 100%;
    text-align: center;
}

.member__tx {
    height: 70px;
    width: 70px;
    border-radius: 100%;
    overflow: hidden;
    border: 6px solid rgba(255, 255, 255, 0.3);
    margin: 0 auto;
}

.member__tx img {
    height: 100%;
}

.member_name {
    color: #333;
    font-size: 14px;
    text-align: center;
    height: 30px;
    line-height: 30px;
}
</style>
