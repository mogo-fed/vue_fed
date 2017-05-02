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

        <div class="text-center" v-if="show == 1">历史订单</div>
        <div class="text-center" v-if="show == 2">
          <p>待处理订单</p>
          <button class="button button-assertive" @click="updateBadge(2)">update badge</button>
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
            badge: 5
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
        menuSortData:[]
      }
    },
    // computed: {
    //     // 仅读取，值只须为函数
    //   base64Img: function () {
    //       return this.base64Img
    //       }
    // },
    created(){
        this.selectSellerInfo();
    },
    mounted() {
      window.vmm=this
    },
    methods: {
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
        //TODO:某种情况 切换tab之后，在第一个页面中出现两次重复数据，原因：第一次请求数据没有清空，需要知道切换的事件。
        selectMenuSortAll(){
            var _this = this;
            $.post('/ssm/menusort/queryMenuSortAll',{sellerId:localStorage.getItem('userid')}).then(function (menuSortData) {
               if(menuSortData.length != 0){
                   _this.addMenuSortPanl = true;
               }else {
                   _this.emptyMenuSortPanl = true;
               }
                _this.menuSortData = menuSortData;
            });
        },

        //TODO:根据username查询商家信息，若已经完善过电话、地址等信息，则登录后跳过完善信息页 到添加菜单页
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

<style scoped>
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

</style>


