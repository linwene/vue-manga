<template>
    <div>
        <header class="top-bar">
            <span class="btn-top back" @click="$router.back(-1)">[返回]</span>
            <h1 class="top-title">历史记录</h1>
            <!-- search -->
            <router-link 
                class="search-link"
                tag="a"
                to="/search"
                >
                <i class="sprite-app-search"></i>
            </router-link>
        </header>
        <section class="comic-list" @scroll="onScroll($event)">
            <ul class="list-hot">
                <li class="comic-item" v-for="(item,index) of ComicList" :key="index">
                    <router-link 
                        :to="'/detail/' + item.id"
                        tag="a"
                        :key="item.id"
                        class="comic-link">
                        <div class="comic-cover">
                            <img class="cover-image" :src="item.vertical_image_url"/>
                        </div>
                        <div class="comic-info">
                            <strong class="comic-title">{{item.title}}</strong>
                            <small class="comic-hot">作者：{{item.author}}</small>
                            <small class="comic-tag">
                                <span v-for ="(cg,i) of item.category" :key="i">{{cg}}</span>
                            </small>
                            <small class="comic-desc">{{item.desc}}</small>
                        </div>
                    </router-link>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
export default {
    name:'HistoryPage',
    data () {
        return{
            ComicList:[]
        }
    },
    methods:{
        
    },
    mounted () {

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
    .comic-list{
        position: absolute;
        top: 2.5rem;
        bottom: 0;
        left: 0;
        right: 0;
        padding-top: 0.25rem;
        background-color: #F5F5EE;
        overflow: auto;
        .list-hot{
            margin:0;
            padding:0 0.25rem;
            list-style: none;
            .comic-item {
                margin: 0;
                padding: 0;
                border-bottom: 0.25rem solid #F5F5EE;
                .comic-link{
                    display: flex;
                    background-color: white;
                    padding: 0.25rem;
                    box-sizing: border-box;
                    text-decoration: none;
                    .comic-cover {
                        height: 4.675rem;
                        width: 3.5rem;
                        margin-right: 0.5rem;
                        img {
                            display: block;
                            border-radius: 0.1rem;
                            overflow: hidden;
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .comic-info {
                        flex: 1;
                        min-width: 1px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        strong {
                            color: #535252;
                            font-size: 0.8rem;
                            line-height: 150%;
                            padding-top: 0.25rem;
                        }
                        small {
                            font-size: 0.6rem;
                            color: #969696;
                            line-height: 1rem;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            padding-top: 1px;
                        }
                        .comic-tag{
                            span{
                                margin-right: .2rem;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
