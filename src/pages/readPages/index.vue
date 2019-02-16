<template>
    <div class="contentComics">
        <!-- 悬浮栏 -->
        <section class="float-bar top" :class="{'hidden':!clickStatus}">
            <span class="float-bar-btn back" @click="$router.back(-1)">[返回]</span>
            <label class="float-bar-title">
                <span class="progress">{{chapter_title}}</span>
            </label>
            <router-link 
                class="float-bar-btn home"
                tag="a"
                to = "/"
            >
                [首页]
            </router-link>
        </section>
        <section class="float-bar bottom" :class="{'hidden':!clickStatus}">
            <router-link 
                class="float-bar-btn chapter-list"
                tag="a"
                :to="'/detail/' + comic_id"
            >[目录]</router-link>
            <span class="float-bar-btn prev-chapter" @click="clickPagenation(prev_url)">[上一章]</span>
            <span class="float-bar-btn next-chapter" @click="clickPagenation(next_url)">[下一章]</span>
        </section>

        <div class="ComicPics" @click="showMenu" v-if="!loadingStatus">
            <img :src="item.img_src" v-for="(item,index) of imgList" :key="index">
        </div>
        <div class="pagenation" v-if="!loadingStatus">
            <div class="grid-half">
                <div class="btn prev" @click="clickPagenation(prev_url)">
                    <img src="../../../static/images/icon_left.png">
                    上一篇
                </div>
            </div>
            <div class="grid-half">
                <div class="btn next" @click="clickPagenation(next_url)">
                    下一篇
                    <img src="../../../static/images/icon_right.png">
                </div>
            </div>
        </div>
        <div class="searchTips"
            :class="{'animation':showFirstPage}"
            >
            已经到达了尽头啦~
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
</template>
<script>
    import axios from 'axios'
    import _ from 'lodash'
    export default {
        name: 'ReadPages',
        data () {
            return{
                chapterId:this.$route.params.chapterId,
                chapter_title:'',
                comic_id: 0,
                imgList:[],
                prev_url:'',
                next_url:'',
                showFirstPage:false,
                loadingStatus:true,
                clickStatus:false,//决定悬浮栏隐藏与否
            }
        },
        methods:{
            getComicImg () {
                var self = this
                const url =`${this.$hostname}/get_detail_img?href=${this.chapterId}`
                axios.get(url).then(res => {
                    let data = res.data
                    if (data.success){
                        this.imgList = data.data.msg
                        this.comic_id = data.data.comic_id
                        this.chapter_title = data.data.chapter_title
                        this.prev_url = data.data.prev_url
                        this.next_url = data.data.next_url
                        this.loadingStatus = false
                    }
                })
                
            },
            showMenu:_.debounce(function(){
                this.clickStatus = !this.clickStatus
                setTimeout(() => {
                    this.clickStatus = false
                }, 3000);
            },200),
            clickPagenation (cid) {
                if (cid != null){
                    this.loadingStatus = true
                    const url =`${this.$hostname}/get_detail_img?href=${cid}`
                    axios.get(url).then(res => {
                        let data = res.data
                        if (data.success){
                            this.imgList = data.data.msg
                            this.prev_url = data.data.prev_url
                            this.next_url = data.data.next_url
                            this.comic_id = data.data.comic_id
                            this.chapter_title = data.data.chapter_title
                            this.chapterId = cid
                            document.documentElement.scrollTop = document.body.scrollTop = 0;
                            this.loadingStatus = false
                        }
                    }).catch(e=>{
                        this.showFirstPage=!this.showFirstPage
                        setTimeout(() => {
                            this.showFirstPage=!this.showFirstPage
                        }, 1200);
                    })
                }else{
                    this.showFirstPage=!this.showFirstPage
                    setTimeout(() => {
                        this.showFirstPage=!this.showFirstPage
                    }, 1200);
                }
            },
            saveHistory () {
                var readHistory = []
                var read = {
                    comic_id:this.comic_id,
                    chapterId:this.chapterId,
                    chapter_title:this.chapter_title
                }
                if (localStorage.getItem("LOCAL_HISTORY") != null) {
                    readHistory = JSON.parse(localStorage.getItem('LOCAL_HISTORY'))
                    readHistory.forEach((e,i)=>{  
                        if (e.comic_id === this.comic_id){
                            readHistory.splice(i,1)
                        }
                    });
                    readHistory.push(read)
                }else{
                    readHistory.push(read)
                }
                localStorage.setItem('LOCAL_HISTORY',JSON.stringify(readHistory))
            }
        },
        mounted () {
            this.getComicImg()
        },
        updated () {
            this.saveHistory()
        }
    }
</script>
<style lang="less" scoped>
    .contentComics{
        /* 悬浮栏 */
        .float-bar {
            display: flex;
            align-items: center;
            position: fixed;
            z-index: 10;
            left: 0;
            width: 100%;
            height: 3rem;
            background-color: rgba(40, 40, 40, 0.95);
            transition: opacity 300ms ease, visibility 300ms ease, -webkit-transform 300ms ease;
            transition: opacity 300ms ease, visibility 300ms ease, transform 300ms ease;
            transition: opacity 300ms ease, visibility 300ms ease, transform 300ms ease, -webkit-transform 300ms ease;
            opacity: 1;
            visibility: visible;
            transform: translate3d(0, 0, 0);
        }
        .float-bar.hidden {
            opacity: 0;
            visibility: hidden; 
        }
        .float-bar.top {
            top: 0;
            box-shadow: 0 0.05rem 0.125rem rgba(0, 0, 0, 0.26); 
        }
        .float-bar.top.hidden {
            transform: translate3d(0, -100%, 0); 
        }
        .float-bar.top .float-bar-title {
            flex: 1;
            display: block;
            color: #969696;
            font-size: 0.75rem; 
        }
        .float-bar.top .float-bar-btn {
            display: block;
            width: 1.35rem;
            height: 1.35rem;
            padding: 0.825rem 0.75rem;
            text-indent: -2500rem;
            font-size: 0; 
        }
        .float-bar.top .float-bar-btn::after {
            content: "";
            display: block; 
        }
        .float-bar.top .float-bar-btn.back {
            padding: 0.825rem 0.225rem; 
        }
        .float-bar.top .float-bar-btn.back::after {
            width: 1.35rem;
            height: 1.35rem;
            background: url("../../../static/images/sc_img_chapter.png") no-repeat -25.4rem -10.2rem; background-size: 27.1rem 26.65rem; width: 1.35rem; height: 1.35rem;    
            background-repeat: no-repeat;
        }
        .float-bar.top .float-bar-btn.home::after {
            width: 1.35rem;
            height: 1.35rem;
            background: url("../../../static/images/sc_img_chapter.png") no-repeat -22.2rem -10.2rem; background-size: 27.1rem 26.65rem; width: 1.35rem; height: 1.35rem;        
            background-repeat: no-repeat;
        }
        .float-bar.bottom {
            bottom: 0;
            box-shadow: 0 -0.05rem 0.125rem rgba(0, 0, 0, 0.26);
        }
        .float-bar.bottom.hidden {
            transform: translate3d(0, 100%, 0); 
        }
        .float-bar.bottom .float-bar-btn {
            flex: 1;
            display: block;
            height: 100%;
            text-align: center;
            text-indent: -2500rem;
            font-size: 0; 
        }
        .float-bar.bottom .float-bar-btn::after {
            content: "";
            display: block;
            margin: 0.825rem auto; 
        }
        .float-bar.bottom .float-bar-btn.chapter-list::after {
            width: 1.35rem;
            height: 1.35rem;
            background: url("../../../static/images/sc_img_chapter.png") no-repeat -11.55rem -20.325rem; background-size: 27.1rem 26.65rem; width: 1.35rem; height: 1.35rem;
            background-repeat: no-repeat; 
        }
        .float-bar.bottom .float-bar-btn.prev-chapter::after {
            width: 1.35rem;
            height: 1.35rem;
            background: url("../../../static/images/sc_img_chapter.png") no-repeat -19rem -10.2rem; background-size: 27.1rem 26.65rem; width: 1.35rem; height: 1.35rem; 
            background-repeat: no-repeat;
        }
        .float-bar.bottom .float-bar-btn.next-chapter::after {
            width: 1.35rem;
            height: 1.35rem;
            background: url("../../../static/images/sc_img_chapter.png") no-repeat -20.6rem -10.2rem; background-size: 27.1rem 26.65rem; width: 1.35rem; height: 1.35rem;
            background-repeat: no-repeat; 
        }

        .ComicPics{
            position: relative;
            width: 100%;
            height: auto;
            img{
                display: block;
                pointer-events: none;//这句的作用是禁止移动端点击放大
                width: 100%;
                min-height: 100px;
                background: #fff url('../../../static/images/img_bg_3.png') no-repeat scroll center 2.5rem;
            }
        }
        .pagenation{
            border-top: 1px solid #e3e3e3;
            border-bottom: 1px solid #e3e3e3;
            background-color: #fff;
            .grid-half{
                display: inline-block;
                width: 49%;
                padding: 24px 0;
                a{text-decoration: none;}
                .btn {
                    display: inline-block;
                    width: 100%;
                    height: 60px;
                    line-height: 60px;
                    text-align: center;
                    color: #757575;
                    font-size: .9rem;
                    img {
                        margin: 0 .6rem;
                        width: .6rem;
                        vertical-align: middle;
                    }
                }
                .prev {
                    border-right: 1px solid #ccc;
                }
            }
        }
        .searchTips{
            display: none;
            position: fixed;
            left: 0;
            right: 0;
            bottom: 20%;
            margin: 0 auto;
            border-radius: 5px;
            width: 40%;
            height: 1.6rem;
            line-height: 1.6rem;
            font-size: .7rem;
            text-align: center;
            background: #000;
            color: #fff;
        }
        .animation{
            display:block;
            animation:myfirst 1.5s
        }
        @keyframes myfirst{
            50%{
                bottom:20%;
                opacity:1
            }
            to{
                bottom:0;
                opacity:0
            }
        }
        .mod-load-more {
            margin-top: 45vh;
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


