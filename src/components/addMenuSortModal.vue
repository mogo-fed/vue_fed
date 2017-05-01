<template>
  <div class="page has-navbar" v-nav="{title: '', showBackButton: true}" >
    <div class="page-content" style="padding-top: 54px;">
      <von-input type="text" v-model="menusort" placeholder="我的菜单分类" label="新增菜单分类" floating-label="true"></von-input>
      <div class="padding">
        <button class="button button-positive button-block" @click="showChoose()">添加</button>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  export default{
    data() {
      return {
          menusort: ''
      }
    },
      methods: {
        //确定添加分类的弹窗
          showChoose() {
              let options = {
                  effect: 'scale',
                  title: '',
                  buttons: [
                      {text: '确定'},
                      {text: '取消'},
                  ]
              }
              let popup = $popup.fromTemplate('<p style="margin-bottom: 0; text-align: center;">确定添加分类?</p>', options);
              popup.show().then((buttonIndex) => {
                  //console.log(buttonIndex);
                  if(buttonIndex == 0){
                      this.addMenuSortBtn();
                  }
              })
          },
          addMenuSortBtn(){
              var _this  = this;
              $.post('/ssm/menusort/addMenuSort',{msName:_this.menusort}).then(function (data) {
                  $toast.show('添加分类成功');
                  _this.$emit('closeMenuSortModal',1);
              });
          }
      }


  }
</script>
