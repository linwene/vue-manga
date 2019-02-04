<template>
    <div>
        <header class="top-bar">
            <span class="btn-top back" @click="$router.back(-1)">[返回]</span>
            <h1 class="top-title">搜索：{{keyword}}</h1>
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
                <li class="comic-item" v-for="(item,index) of searchComicList" :key="index">
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
            <section class="mod-load-more">
                <div class="mlm-status-loading" v-if="!endPageStatus">
                    <div class="mlm-dots">
                        <span class="mlm-dot"></span>
                        <span class="mlm-dot"></span>
                        <span class="mlm-dot"></span>
                    </div>
                    <span class="mlm-info">嘿咻嘿咻加载中</span>
                </div>
                <div class="mlm-status-over" v-else>
                    客官，人家已经没有那个的啦~~
                </div>
            </section>
        </section>
    </div>
</template>

<script>
    import axios from 'axios'
    import _ from 'lodash'
    export default {
        name:'SearchDetail',
        data () {
            return{
                keyword:this.$route.params.keyword,
                searchComicList:[],
                page:1,
                endPageStatus:false
            }
        },
        methods:{
            onScroll(e){
                if(e.srcElement.scrollTop+e.srcElement.offsetHeight>e.srcElement.scrollHeight-100){
                    // 当获取到最后一页的时候，禁用加载更多接口
                    if (!this.endPageStatus){
                        this.loadMoreComic()
                    }
                }
            },
            getComic () {
                let self = this
                const url =`${this.$hostname}/search_comic?title=${encodeURI(this.keyword)}&page=${this.page}&count=10`
                axios.get(url).then(res => {
                    let data = res.data
                    if (data.success){
                        self.searchComicList = data.data.msg
                        if (self.searchComicList.length < 10){
                            this.endPageStatus = true
                        }
                    }else{
                        this.endPageStatus = true
                    }
                })
            },
            // 加载防抖
            loadMoreComic:_.debounce(function(){
                let self = this
                self.page = self.page + 1;
                const url =`${this.$hostname}/search_comic?title=${encodeURI(this.keyword)}&page=${this.page}&count=10`
                axios.get(url).then(res => {
                    let data = res.data
                    if (data.success){
                        var list = data.data.msg
                        self.searchComicList = self.searchComicList.concat(list)
                        if (list.length < 10){
                            this.endPageStatus = true
                        }
                    }else{
                        this.endPageStatus = true
                    }
                })
            },200)
        },
        mounted () {
            this.getComic()
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
        .mod-load-more {
            text-align: center;
            padding-top: 0.95rem;
            padding-bottom: 0.95rem;
            color: #9a9a9a;
            font-size: 0.6rem;
            .mlm-status-loading{
                margin: 0;
                padding: 0;
                border: 0;
                outline: 0;
                font-size: 100%;
                vertical-align: baseline;
                background: transparent;
                display: inline-block;
                .mlm-dots{
                    margin: 0;
                    padding: 0;
                    text-align: center;
                    display: inline-block;
                    .mlm-dot{
                        display: inline-block;
                        vertical-align: middle;
                        width: 5px;
                        height: 5px;
                        background-color: #7a8090;
                        border-radius: 50%;
                        margin: 0 3px;
                    }
                    .mlm-dot:nth-of-type(1) {
                        background-color: #7a8090;
                        animation: dot 1s ease-in infinite;
                    }
                    .mlm-dot:nth-of-type(2) {
                        background-color: rgba(122, 128, 144, 0.6);
                        animation: dot 1s ease-in 0.3s infinite;
                    }
                    .mlm-dot:nth-of-type(3) {
                        background-color: rgba(122, 128, 144, 0.3);
                        animation: dot 1s ease-in 0.7s infinite;
                    }
                    @keyframes dot {
                        25% { border-color: #7a8090; background-color: transparent; }
                        50% { border-right-color: transparent; background-color: #7a8090; }
                        75% { border-right-color: rgba(122, 128, 144, 0.3); }
                    }
                    .mlm-info {
                        display: inline-block;
                        vertical-align: middle;
                    }
                }
            }
        }
    }
</style>

