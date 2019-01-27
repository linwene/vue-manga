<template>
    <div>
        <header class="top-bar">
            <span class="btn-top back" @click="$router.back(-1)">[返回]</span>
            <h1 class="top-title">{{category_name}}</h1>
            <a href="" title="分类" class="search-link">
                <i class="sprite-app-search"></i>
            </a>
        </header>
        <section class="comic-list">
            <ul class="list-hot">
                <li class="comic-item" v-for="(item,index) of categoryComicList" :key="index">
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
    import axios from 'axios'
    export default {
        name:'TagListAll',
        data () {
            return{
                category_name:this.$route.params.category_name,
                categoryComicList:[],
                // throttleLoad:'',
                page:1
            }
        },
        created() {
            window.addEventListener('scroll', _.throttle(this.onScroll,200));
            // window.addEventListener('scroll',this.onScroll)

        },
        destroyed () {
            // window.removeEventListener('scroll',this.onScroll)
            window.removeEventListener('scroll',this.onScroll)
        },
        methods:{
            onScroll(){
                //滚动容器的高度
                let innerHeight = document.querySelector('#app').clientHeight;
                //屏幕尺寸高度
                let outerHeight = document.documentElement.clientHeight;
                //可滚动容器超出当前窗口显示范围的高度
                let scrollTop = document.documentElement.scrollTop;
                //scrollTop在页面为滚动时为0，开始滚动后，慢慢增加，滚动到页面底部时，出现innerHeight < (outerHeight + scrollTop)的情况，严格来讲，是接近底部。
                console.log(innerHeight + " " + outerHeight + " " + scrollTop);
                if (innerHeight < (outerHeight + scrollTop)) {
                    //加载更多操作
                    console.log("loadmore");
                    this.page = this.page + 1;
                    this.loadMoreComic();
                }
            },
            getComic () {
                let self = this
                const url =`${this.$hostname}/category_query?tags=${encodeURI(this.category_name)}&page=${this.page}&count=10`
                axios.get(url).then(res => {
                    let data = res.data
                    if (data.success){
                        self.categoryComicList = data.data.msg
                    }
                })
            },
            loadMoreComic () {
                let self = this
                const url =`${this.$hostname}/category_query?tags=${encodeURI(this.category_name)}&page=${this.page}&count=10`
                axios.get(url).then(res => {
                    let data = res.data
                    if (data.success){
                        self.categoryComicList = self.categoryComicList.concat(data.data.msg)
                    }
                })
            }
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
        margin-top:2.5rem;
        padding-top: 0.25rem;
        background-color: #F5F5EE;
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
                    }
                }
            }
        }
    }
</style>

