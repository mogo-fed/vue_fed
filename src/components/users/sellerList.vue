<template>
  <div class="page">
    <div class="page-content">

        <header>
            <div class="address">
                <div>
                    <span>上海市静安区江宁路212号</span>
                </div>
            </div>
        </header>


      <!--<list v-for="item in data">
        <item class="item-icon-left">
         {{item.userName}}
          <i class="icon ion-social-github dark"></i>
        </item>
      </list>-->

    </div>
  </div>
</template>

<script>

  import $ from 'jquery';

  export default {
      data() {
          return {
              data:[]
          }
      },
      created(){
          this.getUserAll();
      },
      methods: {
          getUserAll(){
              var _this  = this;
              $.post('/ssm/user/queryUserAll').then(function (data) {
                  console.log(data);
                 _this.data.push(...data);

              });
          }
      },

      beforeDestroy() {
          $tabbar.$emit('hideTabbar');
      }
  }


</script>

<style lang="scss" scoped="" type="text/css">
    header{
        background-color: rgb(255, 80, 0);
        padding:10px 15px;
        color: #fff;
    }
</style>

