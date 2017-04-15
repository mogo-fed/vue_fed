<template>
  <div class="page has-navbar" v-nav="{title: '添加我的菜单'}" >
    <div class="page-content" style="padding-top: 54px;">
      <von-input type="text" v-model="msid" class="hide"></von-input>
      <von-input type="text" v-model="mdname" placeholder="菜品名称" label="菜品名称" floating-label="true"></von-input>
      <von-input type="text" v-model="mdnowprice" placeholder="现在价格" label="现在价格" floating-label="true"></von-input>
      <!-- <input type="file" v-model="mdimg" placeholder="菜品图片" label="菜品图片" floating-label="true"></input> -->
      
      <von-input type="text" v-model="mdpreprice" placeholder="之前价格" label="之前价格" floating-label="true"></von-input>
      <von-input type="text" v-model="mddescribe" placeholder="菜品描述" label="菜品描述" floating-label="true"></von-input>
      <von-input type="tel" v-model="mdmonthsale" placeholder="月售" label="月售" floating-label="true"></von-input>
      <von-input type="text" v-model="mdpraise" placeholder="好评率" label="好评率" floating-label="true"></von-input>
      <label class="fileBtn"><span>上传图片</span><input type="file" name="" v-on:change="fileChange"></label>
      
      <img class="img" :src="mdimg" width="50%">
      <div class="padding">
        <button class="button button-positive button-block" @click="showChoose()">确认</button>
      </div>

    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  export default{
    data() {
      return {
          msid:'',
          mdname: '',
          mdnowprice: '',
          mdimg: null,
          mdpreprice: '',
          mddescribe: '',
          mdmonthsale: '',
          mdpraise: '',
      }
    },
      created(){
        // TODO:前一个确定按钮绑定的自定义msid传过来 -> 方法？？？
//        this.msid = this.msid;

      },
      methods: {
        fileChange(){

        let oFReader = new FileReader(), 
             rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;

          oFReader.onload=oFREvent=>{
            this.mdimg=oFREvent.target.result;
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
              let popup = $popup.fromTemplate('<p style="margin-bottom: 0; text-align: center;">确定添加菜单?</p>', options);
              popup.show().then((buttonIndex) => {
                  if(buttonIndex == 0){
                      this.addMyMenuDetail();
                  }
              })
          },
          addMyMenuDetail(){
              console.log(this,'999999');
              let addMenuDetailParms = {
                  msId:this.msidaa,
                  mdName: this.mdname,
                  mdNowprice: this.mdnowprice,
                  mdImg: this.mdimg,
                  mdPreprice: this.mdpreprice,
                  mdDescribe: this.mddescribe,
                  mdMonthsale: this.mdmonthsale,
                  mdPraise: this.mdpraise

              };
              let _this  = this;
              $.post('/ssm/menudetail/addMenuDetail',addMenuDetailParms).then(function (data) {
                  $toast.show('添加菜单成功');
                  console.log(data);
                  _this.$emit('closeMyMenuDetailModal',1);
              });
          },
         

      }

  }
</script>
<style scoped>
  .fileBtn{background: #fff;height: 75px;border: none;width: 100%;display: block;position: relative;}
  .fileBtn input{visibility: hidden;width: 100%;display: block;height: 74px;}
  .fileBtn span{position: absolute;left: 12px;bottom: 12px;}
  .img{display: block;margin: 10px auto;}
</style>
