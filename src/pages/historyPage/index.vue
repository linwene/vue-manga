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
        <section class="comic-list">
            <div class="edit">
                <span>所有浏览过的漫画都在这儿哦...</span>
                <i 
                    class="edit-bottom" 
                    :class="{'onEdit':clickClearHistory}"
                    @click="showClearHistory"
                    ></i>
            </div>
            <ul class="list-history">
                <li class="comic-item" v-for="(item,index) of ComicList" :key="index">
                    <router-link 
                        :to="'/readPages/' + item.chapterId"
                        tag="a"
                        :key="item.chapterId"
                        class="comic-link">
                        <div class="comic-cover">
                            <img class="cover-image" :src="item.vertical_image_url"/>
                        </div>
                        <div class="comic-info">
                            <strong class="comic-title">{{item.comic_title}}</strong>
                            <small class="comic-hot">作者：{{item.author}}</small>
                            <small class="comic-chapter_title">看到：{{item.chapter_title}}</small>
                            <div class="comic-continue">
                                <i class="continue-img"></i>
                                <small>续看</small>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
            <div class="empty" v-if="emptyStatus">
                <img class="bgImg" src="../../../static/images/empty.png">
                <p class="bgP">空空如也，您这样真的好吗？</p>
            </div>
            <div class="mod-edit" v-show="clickClearHistory">
                <span class="edit-del" @click="clearHistory">
                    <i class="edit-del-normal"></i>  
                    <span>清空浏览历史</span>
                </span>
            </div>
        </section>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name:'HistoryPage',
        data () {
            return{
                ComicList:[],
                emptyStatus:true,
                clickClearHistory:false
            }
        },
        methods:{
            getHistory () {
                var self = this
                var readHistory = []
                if (localStorage.getItem("LOCAL_HISTORY") != null) {
                    readHistory = JSON.parse(localStorage.getItem('LOCAL_HISTORY'))
                    readHistory.forEach((e)=>{  
                        var url = `${this.$hostname}/get_detail?id=${e.comic_id}`
                        axios.get(url).then(res => {
                            let data = res.data
                            if (data.success){
                                const msg = data.data.msg[0]
                                var comic_detail = {
                                    comic_id:e.comic_id,
                                    comic_title:msg.title,
                                    vertical_image_url:msg.vertical_image_url,
                                    author:msg.author,
                                    chapterId:e.chapterId,
                                    chapter_title:e.chapter_title
                                }
                                self.ComicList.push(comic_detail)    
                            }
                        })    
                    });
                    self.emptyStatus = false
                }
            },
            showClearHistory () {
                this.clickClearHistory = !this.clickClearHistory
            },
            clearHistory () {
                if (localStorage.getItem("LOCAL_HISTORY") != null){
                    localStorage.removeItem("LOCAL_HISTORY")
                    this.ComicList = []
                    this.emptyStatus = true
                    this.clickClearHistory = false
                }else{
                    this.clickClearHistory = false
                }
            }
        },
        mounted () {
            this.getHistory()
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
        .edit{
            width: 100%;
            position: relative;
            border-left: 0.25rem #F5F5EE solid;
            border-right: 0.25rem #F5F5EE solid;
            margin: 0 0 0.25rem 0;
            padding-left: 0.25rem;
            padding-right: 0.25rem;
            height: 2rem;
            box-sizing: border-box;
            background-color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
            span {
                color: #969696;
                font-size: 0.7rem;
                display: block;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-right: 0.5rem;
            }
            .edit-bottom{
                display: block;
                position: absolute;
                right: 0.5rem;
                top: 0.325rem;
                width: 1.35rem;
                height: 1.35rem;
                background: url(../../../static/images/sc_img_bookshelf.png) no-repeat 0rem 0rem;
                background-size: 4.55rem 4.55rem;
                background-repeat: no-repeat;
            }
            .edit-bottom.onEdit {
                width: 1.35rem;
                height: 1.35rem;
                background: url(../../../static/images/sc_img_bookshelf.png) no-repeat -1.6rem 0rem;
                background-size: 4.55rem 4.55rem;
                background-repeat: no-repeat;
            }
        }
        .list-history{
            margin:0;
            padding:0 0.25rem;
            list-style: none;
            position: relative;
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
                        position: relative;
                        strong {
                            color: #535252;
                            width: 10rem;
                            font-size: 0.8rem;
                            line-height: 150%;
                            padding-top: 0.25rem;
                        }
                        .comic-hot,.comic-chapter_title {
                            width: 10rem;
                            font-size: 0.6rem;
                            color: #969696;
                            line-height: 1rem;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            padding-top: 1px;
                        }
                        .comic-continue {
                            position: absolute;
                            z-index: 1;
                            right: 0;
                            top: 1.2rem;
                            width: 3.25rem;
                            .continue-img {
                                margin: 0 auto;
                                padding-bottom: 0.25rem;
                                display: block;
                                width: 1.35rem;
                                height: 1.35rem;
                                background: url(../../../static/images/sc_img_bookshelf.png) no-repeat 0rem -1.6rem;
                                background-size: 4.55rem 4.55rem;
                                background-repeat: no-repeat;
                            }
                            small {
                                display: block;
                                text-align: center;
                                font-size: 0.6rem;
                                color: #969696;
                                line-height: 1rem;
                            }
                        }
                    }
                }
            }
        }
        .empty{
            display: flex;
            align-items: center;
            flex-direction: column;
            .bgImg {
                display: block;
                width: 8.8rem;
                height: 6.875rem;
                margin-top: 1rem;
                margin-bottom: 0.45rem;
            }
            .bgP {
                font-size: 0.7rem;
                color: #C5C5C5;
                padding-bottom: 0.75rem;
                text-align: center;
                line-height: 120%;
            }
        }
        .mod-edit {
            display: flex;
            z-index: 2;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 3rem;
            position: fixed !important;
            background-color: white;
            .edit-del {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                color: #535252;
                .edit-del-normal {
                    width: 1.35rem;
                    height: 1.35rem;
                    background: url(../../../static/images/sc_img_bookshelf.png) no-repeat -2.8rem -1.4rem;
                    background-size: 4rem 4rem;
                    background-repeat: no-repeat;
                }
                span{
                    margin-left: .1rem;
                    font-size: .7rem;
                    height: 3rem;
                    line-height: 3rem;
                }
            }
        }
        .mod-edit::before {
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
    }
</style>
