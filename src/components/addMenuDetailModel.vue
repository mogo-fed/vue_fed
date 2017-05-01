<template>
  <div class="page has-navbar" v-nav="{title: '完善我的菜谱面板', showBackButton: true}">
    <div class="page-content" style="padding-top: 54px;">
      <accordion default-index="0">
        <accordion-item title="请选择类别" style="height:auto;padding-bottom: 50px;">
            <accordion default-index="0" v-for="item in menusort">
                <div @click="selectMenuDetail()" v-bind:data-msid="item.msId">
                    <accordion-item v-bind:title="item.msName" style="height:auto;padding-bottom:0px;">
                        <item class="item-icon-right" v-for="item in menudetail">
                            {{item.mdName}}
                            <span class="item-note">{{item.mdNowprice}}</span>
                        </item>
                        <button class="button button-assertive button-block button-outline" @click="addMyMenuDetailBtn()" v-bind:data-msid="item.msId" style="width: 94%;">添加</button>
                    </accordion-item>
                </div>
            </accordion>
        </accordion-item>
      </accordion>
    </div>
  </div>
</template>

<script>
    import $ from 'jquery';
    import addMyMenuDetailModal from './addMyMenuDetailModal.vue';
    export default{
        data() {
            return {
                menusort:[],
                menudetail:[]
            }
        },
        created(){
            this.selectMenuSort();
        },
        mounted() {

        },
        methods:{
            selectMenuSort(){
                var _this  = this;
                $.post('/ssm/menusort/queryMenuSortAll').then(function (menusort) {
                    console.log(menusort);
                    _this.menusort.push(...menusort);
                });
            },

            // TODO:查询每种分类下的菜单，而不是全部
            selectMenuDetail(){
                var _this  = this;
                let msid = $(event.currentTarget).data('msid');
//                console.log(msid);
                $.post('/ssm/menudetail/queryMdByMsId',{msId:msid}).then(function (menudetail) {
//                    console.warn(menudetail);
                    _this.menudetail = menudetail;
                });
            },
            addMyMenuDetailBtn(){
                var _this = this;
                let msid = $(event.target).data('msid');
//                console.log(event,'event');
                $modal.fromComponent(addMyMenuDetailModal, {
                    title: '添加我的菜单',
                    theme: 'default',
                    onHide: () => {
                        console.log('modal hide');
                    }
                }).then((modal) => {
                    modal.content.msidaa = msid;
                    modal.content.$on('closeMyMenuDetailModal',function () {
                        modal.hide();
                        _this.selectMenuDetail();
                    });
                    modal.show();
                })
            }
        },
        beforeDestroy() {
            $tabbar.$emit('hideTabbar');
        },
        destroyed() {
            if (this.addMyMenuDetailModal){
                $modal.destroy(this.addMyMenuDetailModal);
            }
            window.MultiModal = undefined;
        }


    }
</script>


<style scoped>

</style>
