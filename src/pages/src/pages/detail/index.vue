<template>
    <div>
        <div class="Lists">
            <header class="listsHeader">
                <img class="headerBg" :src="cover_image_url">
                <span class="returnBtn" @click="$router.back(-1)"></span>
                <div class="mask">
                    <h3 class="maskTitle">{{comic_title}}</h3>
                    <div class="maskContent">
                        <div class="category" v-for="item of categoryList">
                            {{item}}
                        </div>
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
                        borderBottom:showDeatilStatus?'3px solid #FFD806':'3px solid rgba(0,0,0,0)'}">
                    详情
                </span>
                <span 
                    class="tab-list-item" 
                    @click="showComicList" 
                    :style="{
                        color:showComicListStatus?'#535252':'#969696',
                        borderBottom:showComicListStatus?'3px solid #FFD806':'3px solid rgba(0,0,0,0)'}">
                    目录
                </span>
            </div>
            <div class="detail" v-show="showDeatilStatus">
                <h3>作品简介</h3>
                <p>{{desc}}</p>
                <span>作者<img src="../../../static/images/avatar_image.jpg"/> {{author}}</span>
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
            </div>
        </div>
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
                author:""
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
                const url =`http://127.0.0.1:5000/get_detail?id=${this.id}`
                axios.get(url).then(res => {
                    let data = res.data
                    if (data.success){
                        let comic_detail = data.data.msg
                        this.comic_title = comic_detail[0].title
                        this.cover_image_url = comic_detail[0].cover_image_url
                        this.desc = comic_detail[0].desc
                        this.categoryList = comic_detail[0].category
                        this.author = comic_detail[0].author
                    }
                })
            },
            getChapterDetail () {
                const url =`http://127.0.0.1:5000/get_chapter?id=${this.id}`
                axios.get(url).then(res => {
                    let data = res.data
                    if (data.success){
                        let comic_chapter = data.data.msg
                        this.kuaikan_praise = data.data.hot_num
                        this.chapterList = comic_chapter
                        // console.log(comic_chapter)
                    }
                })
            },
            orderReverse () {
                this.chapterList.reverse()
                this.orderReverseStatus = !this.orderReverseStatus
            }
        },
        mounted () {
            this.getComicDetail(),
            this.getChapterDetail()
        }
    }
</script>
<style lang="less" scoped>
    .Lists{
        width: 100%;
        height: auto;
        .listsHeader{
            position: relative;
            box-sizing: border-box;
            height: 100%;
            // height: 11.7rem;
            .headerBg{
                width: 100%;
                display: block
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
                    }
                    .text{
                        text-align: right;
                        flex: 1;
                    }
                    .kuaikanPraise{
                        font-size: 12px;
                        box-sizing: border-box;
                        padding: .7rem 0 0 1.1rem;
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

            img{
                width: 25px;
                height: 25px;
                border-radius: 25px;
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
                border-bottom: 1px solid #e5e5e5;
                .listItem{
                    display: flex;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                    .left{
                        width: 6rem;
                        height: 100%;
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
        }
    }
</style>


