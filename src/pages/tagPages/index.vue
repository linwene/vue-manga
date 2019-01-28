<template>
    <div>
        <header class="top-bar">
            <span class="btn-top back" @click="$router.back(-1)">[返回]</span>
            <h1 class="top-title">分类</h1>
            <a href="" title="分类" class="search-link">
                <i class="sprite-app-search"></i>
            </a>
        </header>
        <div class="content">
            <div class="item" v-for="(item,index) of categoryList" :key="index">
                <router-link 
                    class="itemsLink" 
                    :to="'/tagListAll/' + item.category_name"
                    tag="a"
                    >
                    <span class="bgCover" :style="item.style"></span>
                    <span class="text">{{item.category_name}}</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name:'TagPages',
        data () {
            return{
                categoryList:[]
            }
        },
        methods: {
            getCategory () {
                let self = this
                const url =`${this.$hostname}/get_category`
                axios.get(url).then(res => {
                    let data = res.data
                    if (data.success){
                        self.categoryList = data.data.msg
                    }
                })
            }
        },
        mounted () {
            this.getCategory()
        }
}
</script>

<style lang="less" scoped>
    .top-bar {
        display: flex;
        align-items: center;
        position: fixed;
        z-index: 149;
        top: 0;
        left: 0;
        width: 100%;
        height: 2.5rem;
        background-color: #FFFFFF;
        box-shadow: 0 0 0.125rem rgba(9, 2, 4, 0.06);
        .btn-top.back {
            padding: 0.375rem;
            border-radius: 0.1rem;
            overflow: hidden;
            display: block;
            text-indent: -2500rem;
            font-size: 0;
        }
        .btn-top.back::after {
            content: "";
            display: block;
            width: 1.35rem;
            height: 1.35rem;
            background: url('../../../static/images/sc_img_default.png') no-repeat -3.9rem -5.3rem;
            background-size: 14.8rem 7rem;
            width: 1.35rem;
            height: 1.35rem;
            background-repeat: no-repeat;
        }
        .top-title {
            display: block;
            height: 1.1rem;
            line-height: 1.1rem;
            font-size: 0.9rem;
            color: #535252;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .sprite-app-search {
            background-image: url('../../../static/images/sc_img_default.png');
            background-size: 14.8rem 7rem;
            display: block;
        }
        .search-link{
            position: absolute;
            right: 10px;
            .sprite-app-search {
                background-position: -7.1rem -5.3rem;
                width: 25px;
                height: 25px;
            }
        }
    }
    .content{
        margin-top:2.5rem;
        padding: .6rem;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .item{
            flex: 1;
            display: flex;
            align-items: center;
            padding: .9rem .7rem;
            box-sizing: border-box;
            max-width: 33.4%;
            min-width: 33%;
            .itemsLink{
                flex: 1;
                color: #999;
                text-decoration: none;
                text-align: center;
                span{
                    display: block;
                    box-sizing: border-box;
                    width: 100%;
                }
                .bgCover{
                    border: 1px solid #cfcfcf;
                    height: 4.2rem;
                    overflow: hidden;
                    color: #999;
                    background: no-repeat;
                    background-size: cover;
                }
                .text{
                    text-align: center;
                    padding-top: .6rem;
                    font-size: .8rem;
                    overflow: hidden;
                }
            }
        }
    }
</style>


