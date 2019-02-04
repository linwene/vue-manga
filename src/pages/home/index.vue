<template>
    <div>
        <header class="index-header">
            <!-- logo -->
            <div class="logo">
                <a title="一本漫画" href="/">
                    <i class="sprite-index-logo"></i>
                </a>
            </div>
            <!-- search -->
            <router-link 
                class="search-link"
                tag="a"
                to="/search"
                >
                <i class="sprite-app-search"></i>
            </router-link>
        </header>
        <!-- 轮播 -->
        <div class="wrapper">
            <swiper :options="swiperOption">
                <swiper-slide>
                    <img src="../../../static/images/1.jpg" width="100%"/>
                </swiper-slide>
                <swiper-slide>
                    <img src="../../../static/images/2.jpg" width="100%" />
                </swiper-slide>
                <swiper-slide>
                    <img src="../../../static/images/3.jpg" width="100%" />
                </swiper-slide>
                <swiper-slide>
                    <img src="../../../static/images/4.jpg" width="100%" />
                </swiper-slide>                
                <!-- <div class="swiper-pagination" slot="pagination"></div> -->
            </swiper>
            <!-- 菜单 -->
            <div class="menu-list">
                <div class="row-item">
                    <router-link 
                        class="plain-text" 
                        to="/tagPages"
                        tag="a">
                        <i class="sprite-index-rank"></i>
                        分类
                    </router-link>
                </div>
                <div class="row-item">
                    <router-link
                        :to="'/tagListAll/'+encodeURI('全部漫画')"
                        >
                        <i class="sprite-index-category"></i>
                        <div class="plain-text">全部</div>
                    </router-link>
                </div>
                <div class="row-item">
                    <router-link
                        :to="'/updateWeek/'"
                        >
                        <i class="sprite-index-update"></i>
                        <div class="plain-text">追更</div>
                    </router-link>
                </div>
                <div class="row-item">
                    <router-link
                        :to="'/historyPage/'"
                        >
                        <i class="sprite-index-history"></i>
                        <div class="plain-text">历史</div>
                    </router-link>
                </div>
            </div>
        </div>
        <!-- 随机推荐 -->
        <section class="recommend">
            <h2 class="sub-title">
                <strong class="title-content">[无良推荐]</strong>
                <small class="desc">“随机推荐超好看的漫画”</small>
                <router-link
                    class="link-more"
                    to="/recommend"
                    >
                    [更多]</router-link>
            </h2>
            <div class="middle">
                <div class="rows">
                    <div class="HomeList" v-for="(item,index) of recommendList" :key="index">
                        <router-link 
                        tag="a"
                        :to="'/detail/' + item.id"
                        :key="item.id"
                        class="itemLink"
                        >
                            <img :src="item.vertical_image_url" alt=""> 
                            <div class="comic-content">
                                <span class="comic-title">{{item.title}}</span>
                            </div>
                        </router-link>
                    </div>        
                </div>
            </div>
        </section>
        <!-- 今天我更新 -->
        <section class="update-today">
            <h2 class="sub-title">
                <strong class="title-content">[今日我更新]</strong>
                <small class="desc">“已把作者逼疯，吐血ing...”</small>
                <router-link
                    class="link-more"
                    to="/updateToday"
                    >
                    [更多]</router-link>
            </h2>
            <div class="update-area">
                <aside class="npc">[NPC图片]</aside>
                <ul class="comic-list">
                    <li class="comic-item" v-for="(item,index) of updateComicList" :key="index">
                        <router-link 
                            :to="'/detail/' + item.comic_id"
                            :key="item.comic_id"
                            tag = "a"
                            class="comic-link">
                            <div class="comic-cover">
                                <img class="cover-image" :src="item.img_url"/>
                            </div>
                            <div class="comic-content">
                                <strong class="comic-title">{{item.comic_title}}</strong>
                                <small class="comic-artist">作者: {{item.author}}</small>
                                <small class="comic-tag">
                                    <span v-for ="(cg,i) of item.category" :key="i">{{cg}}</span>
                                </small>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>          
        </section>
        <!-- 日漫经典 -->
        <section class="japan-comic">
            <h2 class="sub-title">
                <strong class="title-content">[日漫经典]</strong>
                <small class="desc">“那些年，一起挖过的宝藏。”</small>
                <router-link 
                    class="link-more"
                    tag="a"
                    :to="'/tagListAll/'+encodeURI('日漫')"
                    >[更多]</router-link>
            </h2>
            <div class="middle">
                <div class="rows">
                    <div class="HomeList" v-for="(item,index) of jpComicList" :key="index">
                        <router-link 
                        tag="a"
                        :to="'/detail/' + item.id"
                        :key="item.id"
                        class="itemLink"
                        >
                            <img :src="item.vertical_image_url" alt=""> 
                            <div class="comic-content">
                                <span class="comic-title">{{item.title}}</span>
                            </div>
                        </router-link>
                    </div>        
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        name:'Home',
        data() {
            return {
                swiperOption: {
                    pagination: '.swiper-pagination',
                    loop: true,
                    autoplay: {
                        disableOnInteraction: false,
                        delay:4000
                    }
                },
                recommendList:[],
                updateComicList:[],
                jpComicList:[]
            }
        },
        methods: {
            // 获取随机推荐，6条，推荐是3的倍数，否则页面样式会出错
            getRecommendList () {
                let self = this
                const url =`${this.$hostname}/random_select_comic?quantity=${6}`
                axios.get(url).then(res => {
                    let data = res.data
                    if (data.success){
                        self.recommendList = data.data.msg
                    }
                })
            },
            getUpdateComic () {
                let self = this
                const url = `${this.$hostname}/get_update_comic?day=0`
                axios.get(url).then(res => {
                    let data = res.data
                    var count = 0 
                    if (data.success){
                        data.data.msg.some(element => {
                            const update_url = `${this.$hostname}/get_detail?id=${element.comic_id}`
                            axios.get(update_url).then(res => {
                                let data = res.data
                                if (data.success){
                                    const msg = data.data.msg[0]
                                    var comic_detail = {
                                        comic_id:msg.id,
                                        comic_title:msg.title,
                                        img_url:msg.vertical_image_url,
                                        author:msg.author,
                                        category:msg.category,
                                        desc:msg.desc
                                    }
                                    self.updateComicList.push(comic_detail)    
                                }
                            })
                            count +=1
                            if (count > 2){
                                //使用some来遍历时，选择return true可以跳出循环
                                return true
                            }
                        });
                    }
                })
            },
            getJPcomic () {
                let self = this
                // encodeURI是为了解决get提交有可能中文乱码问题
                const url = `${this.$hostname}/category_query?`+encodeURI('tags=日漫')+`&page=1&count=6`
                axios.get(url).then(res => {
                    let data = res.data
                    if (data.success){
                        self.jpComicList = data.data.msg
                    }
                })
            }
        },
        mounted () {
            this.getRecommendList(),
            this.getUpdateComic(),
            this.getJPcomic()
        }
    }
</script>
<style lang="less" scoped>
    .sprite-index-logo{
        display: block;
        width: 6rem;
        height: 2.5rem;
        background: url('../../../static/images/sc_img_default.png') no-repeat 0rem -2.55rem;
        background-size: 14.8rem 7rem;
    } 
    .sprite-index-rank,.sprite-index-category,.sprite-index-update,.sprite-index-history{
        background-image: url('../../../static/images/sc_img_index.png');
        background-size: 20.5rem 17.5rem;
        display: block;
    } 
    .sprite-app-search {
        background-image: url('../../../static/images/sc_img_default.png');
        background-size: 14.8rem 7rem;
        display: block;
    }
    .index-header{
        display: flex;
        height:50px;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        position: fixed;
        z-index: 133;
        top: 0;
        left: 0;
        width: 100%;
        background-color: #FFFFFF;
        box-shadow: 0 0 0 2px rgba(9, 2, 4, 0.06);
        .logo{
            a{
                background-color: transparent;
                text-decoration: none;
                .sprite-index-logo {
                    width: 6rem;
                    height: 2.5rem;
                    background-repeat: no-repeat;
                    text-indent: -2500rem;
                    font-size: 0;
                    margin: 0;
                    padding: 0;
                }
            }
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
    .wrapper{
        margin-top: 50px;
        position: relative;
        background: #fff;
        overflow: hidden;
        width: 100%;
        font-size: 0;
        border-bottom: 1px solid #ebebeb;
        .menu-list{
            position: relative;
            display: flex;
            justify-content:space-between;
            padding: 0 40px;
            margin-top: -1.4rem;
            background: transparent url('../../../static/images/background.png') no-repeat scroll 0 100%;
            background-size:100% 4.45rem;
            z-index: 99;

            a {
                background-color: transparent;
                text-decoration: none;
                color: #969696;
                .plain-text{
                    padding-top:2px;
                    padding-bottom: 4px;
                }
            }
            .row-item{
                margin-top: 10px;
                // flex:1;
                // -webkit-box-flex: 1;
                text-align: center;
                padding-top: 16px;
                font-size: 12px;
                .sprite-index-rank {
                    margin:0 auto;
                    background-position: -17rem -3.75rem;
                    width: 1.7rem;
                    height: 1.7rem;
                }
                .sprite-index-category {
                    margin:0 auto;
                    background-position: -13rem -5.825rem;
                    width: 1.7rem;
                    height: 1.7rem;
                }
                .sprite-index-update {
                    margin:0 auto;
                    background-position: -14.95rem -5.825rem;
                    width: 1.7rem;
                    height: 1.7rem;
                }
                .sprite-index-history {
                    margin:0 auto;
                    background-position: -16.9rem -5.825rem;
                    width: 1.7rem;
                    height: 1.7rem;
                }
            }
        }
    }
    section.recommend {
        padding-top: 0.25rem;
        .sub-title{
            display: flex;
            align-items: center;
            box-sizing: border-box;
            width: 100%;
            height: 2.3rem;
            padding: 0 0.5rem;
            margin: 0;
            overflow: hidden;
            .title-content {
                width: 12.5rem;
                height: 1.75rem;
                background: url('../../../static/images/sc_img_index.png') no-repeat -5.25rem 0rem;
                background-size: 20.5rem 17.5rem;
                width: 7.5rem;
                height: 2rem;
                background-repeat: no-repeat;
                display: block;
                text-indent: -2500rem;
                font-size: 0;
            }
            .desc {
                display: block;
                flex: 1;
                margin-left: 0.1rem;
                visibility: hidden;
                font-size: 0.65rem;
                font-weight: 200;
                color: #969696;
            }
            .link-more {
                display: block;
                text-indent: -2500rem;
                font-size: 0;
                width: 3rem;
                height: 1.25rem;
                width: 2.9rem;
                height: 1.15rem;
                background: url('../../../static/images/sc_img_index.png') no-repeat -17rem -2.25rem;
                background-size: 20.5rem 17.5rem;
                width: 3rem;
                height: 1.25rem;
                background-repeat: no-repeat;
            }
        }
        .middle{
            .rows {
                display: flex;
                padding: 0 .4rem;
                align-items: center;
                flex-wrap: wrap;
                .HomeList{
                    flex: 1;
                    min-width: 25%;
                    padding: .3rem;
                    height: 6.8rem;
                    overflow: hidden;
                    .itemLink{
                        position: relative;
                        background-image: url('../../../static/images/img_bg.png');
                        background-size: contain;
                        background-position: center;
                        background-color: #fff;
                        display: block;
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                        img{
                            width: 100%;
                            height: 100%;
                            pointer-events: none;//这句的作用是禁止移动端点击放大
                        }
                        .comic-content{
                            // background: #fff;
                            width: 100%;
                            height: 2.5rem;
                            z-index: 20;
                            span{
                                padding: 0 6px;
                                background: rgba(255, 255, 255,.85);
                                position: absolute;
                                left: 0;
                                bottom: 0;
                                width: 100%;
                                height: 1.3rem;
                                line-height: 1.3rem;
                                box-sizing: border-box;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                font-size: .7rem;
                                color: #3e3e3e;
                                z-index: 22;
                            }
                        }
                    }
                }
            }

        }
    }
    section.update-today {
        margin-top: 0.25rem;
        background-color: #fff;
        .sub-title{
            display: flex;
            align-items: center;
            box-sizing: border-box;
            width: 100%;
            height: 2.3rem;
            padding: 0 0.5rem;
            margin: 0;
            overflow: hidden;
            .title-content {
                width: 12.5rem;
                height: 1.75rem;
                background: url('../../../static/images/sc_img_index.png') no-repeat -5.25rem -6.75rem;
                background-size: 20.5rem 17.5rem;
                width: 7.5rem;
                height: 2rem;
                background-repeat: no-repeat;
                display: block;
                text-indent: -2500rem;
                font-size: 0;
            }
            .desc {
                display: block;
                flex: 1;
                margin-left: 0.1rem;
                visibility: hidden;
                font-size: 0.65rem;
                font-weight: 200;
                color: #969696;
            }
            .link-more {
                display: block;
                text-indent: -2500rem;
                font-size: 0;
                width: 3rem;
                height: 1.25rem;
                width: 2.9rem;
                height: 1.15rem;
                background: url('../../../static/images/sc_img_index.png') no-repeat -17rem -2.25rem;
                background-size: 20.5rem 17.5rem;
                width: 3rem;
                height: 1.25rem;
                background-repeat: no-repeat;
            }
        }
        .update-area{
            display: flex;
            .npc{
                display: block;
                text-indent: -2500rem;
                font-size: 0;
                width: 5rem;
                height: 17.5rem;
                background: url('../../../static/images/sc_img_index.png') no-repeat 0rem 0rem;
                background-size: 20.5rem 17.5rem;
                background-repeat: no-repeat;
            }
            .comic-list{
                margin: 0 0.5rem 0 0;
                padding: 0;
                flex: 1;
                overflow:hidden;
                .comic-item {
                    display: block;
                    background-color: #F5F4EF;
                    .comic-link {
                        display: flex;
                        height: 5.25rem;
                        margin-bottom: 0.6rem;
                        overflow: hidden;
                        .comic-cover{
                            display: block;
                            width: 4rem;
                            height: 5.25rem;
                            margin-right: 0.65rem;
                            background-image: url('../../../static/images/img_bg.png');
                            background-size: contain;
                            background-position: center;
                            background-color: #fff;
                            .cover-image{
                                display: block;
                                width: 4rem;
                                height: 5.25rem;
                                pointer-events: none;//这句的作用是禁止移动端点击放大
                            }
                        }
                        .comic-content{
                            flex:1;
                            margin: 0;
                            padding: 0;
                            border: 0;
                            outline: 0;
                            font-size: 100%;
                            vertical-align: baseline;
                            background: transparent;
                            overflow: hidden;
                            .comic-title{
                                display: block;
                                margin-top: 0.7rem;
                                font-size: 0.8rem;
                                line-height: 1rem;
                                font-weight: bold;
                                color: #535252;
                            }
                            .comic-artist{
                                display: block;
                                margin-top: 0.35rem;
                                line-height: 1rem;
                                font-size: 0.6rem;
                                font-weight: normal;
                                color: #969696;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }
                            .comic-tag{
                                font-size: 0.6rem;
                                color: #969696;
                                line-height: 1rem;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                span{
                                    margin-right: 2px;
                                }
                            }
                        }
                    }
                    a {
                        margin: 0;
                        padding: 0;
                        font-size: 100%;
                        vertical-align: baseline;
                        background: transparent;
                        text-decoration: none;
                    }
                }
            }
        }
    }
    section.japan-comic {
        padding-bottom: 0.25rem;
        .sub-title{
            display: flex;
            align-items: center;
            box-sizing: border-box;
            width: 100%;
            height: 2.3rem;
            padding: 0 0.5rem;
            margin: 0;
            overflow: hidden;
            .title-content {
                width: 12.5rem;
                height: 1.75rem;
                background: url('../../../static/images/sc_img_index.png') no-repeat -5.25rem -11.25rem;
                background-size: 20.5rem 17.5rem;
                width: 7.5rem;
                height: 2rem;
                background-repeat: no-repeat;
                display: block;
                text-indent: -2500rem;
                font-size: 0;
            }
            .desc {
                display: block;
                flex: 1;
                margin-left: 0.1rem;
                visibility: hidden;
                font-size: 0.65rem;
                font-weight: 200;
                color: #969696;
            }
            .link-more {
                display: block;
                text-indent: -2500rem;
                font-size: 0;
                width: 3rem;
                height: 1.25rem;
                width: 2.9rem;
                height: 1.15rem;
                background: url('../../../static/images/sc_img_index.png') no-repeat -17rem -2.25rem;
                background-size: 20.5rem 17.5rem;
                width: 3rem;
                height: 1.25rem;
                background-repeat: no-repeat;
            }
        }
        .middle{
            .rows {
                display: flex;
                padding: 0 .4rem;
                align-items: center;
                flex-wrap: wrap;
                .HomeList{
                    flex: 1;
                    min-width: 25%;
                    padding: .3rem;
                    height: 6.8rem;
                    overflow: hidden;
                    .itemLink{
                        position: relative;
                        background-image: url('../../../static/images/img_bg.png');
                        background-size: contain;
                        background-position: center;
                        background-color: #fff;
                        display: block;
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                        img{
                            width: 100%;
                            height: 100%;
                            pointer-events: none;//这句的作用是禁止移动端点击放大
                        }
                        .comic-content{
                            // background: #fff;
                            width: 100%;
                            height: 2.5rem;
                            z-index: 20;
                            span{
                                padding: 0 6px;
                                background: rgba(255, 255, 255,.85);
                                position: absolute;
                                left: 0;
                                bottom: 0;
                                width: 100%;
                                height: 1.3rem;
                                line-height: 1.3rem;
                                box-sizing: border-box;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                font-size: .7rem;
                                color: #3e3e3e;
                                z-index: 22;
                            }
                        }
                    }
                }
            }
        }

    }
</style>