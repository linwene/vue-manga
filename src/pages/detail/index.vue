<template>
    <div>
        <div class="Lists">
            <header class="listsHeader">
                <img src="../../../static/images/img_bg_2.png" class="headerBg" v-if="cover_loading">
                <img class="headerBg" :src="cover_image_url" v-else>
                <span class="returnBtn" @click="$router.back(-1)"></span>
                <div class="mask" v-if="!cover_loading">
                    <h3 class="maskTitle">{{comic_title}}</h3>
                    <div class="maskContent">
                        <!-- 限制页面只能够存在4个分类，防止超出页面样式出错 -->
                        <router-link 
                            tag="div"
                            class="category" 
                            v-for="(item,index) of categoryList" 
                            :key="index" 
                            v-if="index<4"
                            :to="'/tagListAll/' + item"
                            >
                            {{item}}
                        </router-link>
                        <div class="text">
                            <span class="kuaikanPraise">快看总热度：{{kuaikan_praise}}</span>
                        </div>
                    </div>
                </div>
            </header>
            <div class="tab-list">
                <span 
                    class="tab-list-item" 
                    @click="showDeatil" 
                    :style="{
                        color:showDeatilStatus?'#535252':'#969696',
                        borderBottom:showDeatilStatus?'3px solid #FF9A66':'3px solid rgba(0,0,0,0)'}">
                    详情
                </span>
                <span 
                    class="tab-list-item" 
                    @click="showComicList" 
                    :style="{
                        color:showComicListStatus?'#535252':'#969696',
                        borderBottom:showComicListStatus?'3px solid #FF9A66':'3px solid rgba(0,0,0,0)'}">
                    目录
                </span>
            </div>
            <div class="detail" v-show="showDeatilStatus">
                <h3>作品简介</h3>
                <p>{{desc}}</p>
                <span>作者：<img src="../../../static/images/avatar_image.jpg"/> {{author}}</span>
            </div>
            <div class="comicList" v-show="showComicListStatus">
                <div class="comicListTitle">
                    <span>共{{chapterList.length}}话</span>
                    <span @click="orderReverse" v-if="!orderReverseStatus">
                        <span class="Right orderIcon1">正序</span>
                    </span>
                    <span @click="orderReverse" v-if="orderReverseStatus">
                        <span class="Right orderIcon2">倒序</span>
                    </span>                    
                    <!-- .reverse() -->
                </div>
                <div class="ChapterList" v-for="(item, index) of chapterList" :key="index">
                    <router-link 
                        tag = "div"
                        :to="'/readPages/' + item.href"
                        class="listItem"
                        :key="item.href"
                    >
                        <div class="left">
                            <img :src="item.img_url" />
                        </div>
                        <div class="right">
                            <div class="chapterTitle">{{item.title}}</div>
                        </div>
                    </router-link>
                </div>
                <section class="mod-load-more"  v-if="loadingStatus">
                    <div class="mlm-status-loading">
                        <div class="mlm-dots">
                            <span class="mlm-dot"></span>
                            <span class="mlm-dot"></span>
                            <span class="mlm-dot"></span>
                        </div>
                        <span class="mlm-info">嘿咻嘿咻加载中</span>
                    </div>
                </section>
            </div> 
        </div>
        <section class="mod-toolBar" v-if="!loadingStatus">
            <div class="lay-flex" >
                <!-- 三目判断是选择显示第一次阅读的样式还是看过的样式 -->
                <div class="lay-box">
                    {{seeStatus?SeeHistory.chapter_title:firstChapter.title}}
                </div>
                <router-link 
                    :to="`/readPages/${seeStatus?SeeHistory.chapterId:firstChapter.href}`"
                    tag="div"
                    :key="SeeHistory.chapterId"
                    class="toolBar-toolRead" 
                >
                    {{seeStatus?'继续阅读':'开始阅读'}}
                </router-link>
            </div>
        </section>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        name: 'Detail',
        data () {
            return{
                id:this.$route.params.id,
                comic_title:"",
                cover_image_url:"",
                desc:"",
                categoryList:[],
                kuaikan_praise:"",
                showDeatilStatus:false,
                showComicListStatus:true,//true一开始默认显示章节目录
                chapterList:[],
                orderReverseStatus:true,
                author:"",
                loadingStatus:true,
                cover_loading:true, //封面加载状态
                firstChapter:{},
                SeeHistory:{},
                seeStatus:false
            }
        },
        methods: {
            showDeatil(){
                this.showDeatilStatus = true
                this.showComicListStatus = false
            },
            showComicList(){
                this.showComicListStatus = true
                this.showDeatilStatus = false
            },
            getComicDetail () {
                const url =`${this.$hostname}/get_detail?id=${this.id}`
                axios.get(url).then(res => {
                    let data = res.data
                    if (data.success){
                        let comic_detail = data.data.msg
                        this.comic_title = comic_detail[0].title
                        this.cover_image_url = comic_detail[0].cover_image_url
                        this.desc = comic_detail[0].desc
                        this.categoryList = comic_detail[0].category
                        this.author = comic_detail[0].author
                        this.cover_loading = false
                    }
                })
            },
            getChapterDetail () {
                const url =`${this.$hostname}/get_chapter?id=${this.id}`
                axios.get(url).then(res => {
                    let data = res.data
                    if (data.success){
                        let comic_chapter = data.data.msg
                        this.kuaikan_praise = data.data.hot_num
                        this.chapterList = comic_chapter
                        this.firstChapter = comic_chapter[comic_chapter.length - 1]
                        this.loadingStatus = false
                    }
                   
                })
            },
            orderReverse () {
                this.chapterList.reverse()
                this.orderReverseStatus = !this.orderReverseStatus
            },
            getHistory () {
                var self = this
                var readHistory = []
                var read = {
                    comic_id:this.comic_id,
                    chapterId:this.chapterId,
                    chapter_title:this.chapter_title
                }
                if (localStorage.getItem("LOCAL_HISTORY") != null) {
                    readHistory = JSON.parse(localStorage.getItem('LOCAL_HISTORY'))
                    readHistory.forEach((e,i)=>{  
                        if (e.comic_id === this.id){
                            var history = {
                                chapterId:e.chapterId,
                                chapter_title:e.chapter_title
                            }
                            self.SeeHistory = history
                            self.seeStatus = true
                        }
                    });
                }
            }
        },
        mounted () {
            this.getComicDetail(),
            this.getChapterDetail(),
            this.getHistory()
        }
    }
</script>
<style lang="less" scoped>
    .Lists{
        width: 100%;
        height: auto;
        background-color: #fff;
        margin-bottom: 2.5rem;
        overflow-x: hidden;
        .listsHeader{
            position: relative;
            box-sizing: border-box;
            height: 100%;
            // height: 11.7rem;
            .headerBg{
                width: 100%;
                display: block;
                pointer-events: none;//这句的作用是禁止移动端点击放大
            }
            .returnBtn{
                position: absolute;
                text-align: center;
                left: .8rem;
                top: 1rem;
                width: 1.2rem;
                height: 1.2rem;
                background: url('../../../static/images/icon-back.png') no-repeat 50%/1rem rgba(0,0,0,.6);
                border-radius: 50%;
                background-size: 30% 50%;
            }
            .mask{
                box-sizing: border-box;
                position: absolute;
                left: 0;
                bottom: 0;
                padding-top: 3rem;
                width: 100%;
                height: 6rem;
                background: url(../../../static/images/icon_cover_mask.png) repeat-x 0 100%;
                background-size: contain;
                .maskTitle{
                    box-sizing: border-box;
                    padding: 0 .6rem;
                    margin: 0;
                    width: 100%;
                    font-size: .9rem;
                    font-weight: 500;
                    color: #fff;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .maskContent{
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    padding: 0 .6rem;
                    width: 100%;
                    color:#eee;
                    height: 1.8rem;
                    line-height: 1.8rem;
                    .category{
                        border:1px solid #eee;
                        text-align: center;
                        border-radius:14px;
                        font-size: 12px;
                        line-height: 18px;
                        height: 18px;
                        padding: 1px 5px 1px 5px;
                        margin-right: 5px;
                        white-space: nowrap;
                    }
                    .text{
                        text-align: right;
                        flex: 1;
                        height: 1.8rem;
                        line-height: 1.8rem;
                    }
                    .kuaikanPraise{
                        font-size: 12px;
                        box-sizing: border-box;
                        padding: 0;
                        display: inline-block;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        align-self: flex-end;
                    }
                }
            }
        }
        .tab-list{
            display: flex;
            justify-content: space-around;
            background-color:#fff;
            border-bottom: 1px solid #ebebeb;
            .tab-list-item{
                display: block;
                width: 5.75rem;
                text-align: center;
                height: 2.25rem;
                line-height: 2.25rem;
                font-size: 0.75rem;
                position: relative;
                color: #969696;
                // border-bottom: 1px solid #FFD806
            }
        }
        .detail{
            padding: 0 10px;
            h3{
                font-size: 0.8rem;
                font-weight:500;
                margin:10px 0;
            }
            p{
                margin:10px 0;
                font-size: 0.75rem;
            }
            span{
                display: block;
                font-size: 0.75rem;
                line-height: 25px;
                height: 25px;
                img{
                    width: 25px;
                    height: 25px;
                    border-radius: 25px;
                    vertical-align: middle;
                }
            }
        }
        .comicList{
            background-color: #fff;
            .comicListTitle{
                display: flex;
                font-size: 13px;
                height: 40px;
                line-height: 40px;
                padding: 0 10px;
                background-color: #fff;
                color:#999;
                padding-top: 10px;
                justify-content:space-between;
                .Right{
                    font-size: 13px;
                    color: #999999;
                    letter-spacing: 0;
                    float: right;
                    padding-left: 30px;
                    background-position: 7px 11px;
                    background-size: 18px 17px;
                    background-repeat: no-repeat;
                }
                .orderIcon1{
                        background-image: url('../../../static/images/detail-order-1.png')
                    }
                .orderIcon2{
                        background-image: url('../../../static/images/detail-order-2.png')
                }
            }
            .ChapterList{
                box-sizing: border-box;
                padding: .5rem;
                width: 100%;
                height: 4.55rem;
                // border-bottom: 1px solid #e5e5e5;
                .listItem{
                    display: flex;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                    .left{
                        width: 6rem;
                        height: 100%;
                        background-image: url('../../../static/images/img_bg_2.png');
                        background-size: contain;
                        background-position: center;
                        img {
                            height: 100%;
                            widows: 100%;
                            background: no-repeat 50%;
                            background-size: cover;
                        }
                    }
                    .right{
                        flex: 1;
                        max-width: 11.25rem;
                        padding-left: .5rem;
                        height: 100%;
                        .chapterTitle{
                            width: 100%;
                            line-height: 1.4rem;
                            font-size: .8rem;
                            color: #333;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
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
    }
    .mod-toolBar{
        background-color: white;
        height: 2.5rem;
        position: relative;
        box-sizing: border-box;
        position: fixed;
        z-index: 9;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        .lay-flex {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .lay-box{
                font-size: 0.8rem;
                color: #969696;
                line-height: 1rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                padding-top: 1px;
                flex:1;
                margin: 0 .7rem;
            }
            .toolBar-toolRead {
                width: 6rem;
                font-size: 0.9rem;
                font-weight: bold;
                color: white;
                height: 2.5rem;
                line-height: 2.5rem;
                background-color: #ff9a6a;
                text-align: center;
            }
        }
    }
    .mod-toolBar::before {
        content: "";
        display: block;
        position: absolute;
        transform-origin: center top;
        width: 100%;
        top: 0;
        width: 200%;
        left: -50%;
        transform: scale(0.5);
        border-top: 1px solid #C5C5C5;
    }    
</style>


