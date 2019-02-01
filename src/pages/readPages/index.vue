<template>
    <div class="contentComics">
        <div class="ComicPics">
            <img :src="item.img_src" v-for="(item,index) of imgList" :key="index">
        </div>
        <div class="pagenation" v-if="!loadingStatus">
            <div class="grid-half">
                <div href="javascript:;" class="btn prev" @click="clickPagenation(prev_url)">
                    <img src="../../../static/images/icon_left.png">
                    上一篇
                </div>
            </div>
            <div class="grid-half">
                <div href="javascript:;" class="btn next" @click="clickPagenation(next_url)">
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
    export default {
        name: 'ReadPages',
        data () {
            return{
                chapterId:this.$route.params.chapterId,
                imgList:[],
                prev_url:'',
                next_url:'',
                showFirstPage:false,
                loadingStatus:true,
            }
        },
        methods:{
            getComicImg () {
                const url =`${this.$hostname}/get_detail_img?href=${this.chapterId}`
                axios.get(url).then(res => {
                    let data = res.data
                    if (data.success){
                        this.imgList = data.data.msg
                        this.prev_url = data.data.prev_url
                        this.next_url = data.data.next_url
                        this.loadingStatus = false
                    }
                })
            },
            clickPagenation (cid) {
                if (cid != null){
                    const url =`${this.$hostname}/get_detail_img?href=${cid}`
                    axios.get(url).then(res => {
                        let data = res.data
                        if (data.success){
                            this.imgList = data.data.msg
                            this.prev_url = data.data.prev_url
                            this.next_url = data.data.next_url
                            document.documentElement.scrollTop = document.body.scrollTop = 0;
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
            }
        },
        mounted () {
            this.getComicImg()
        }
    }
</script>
<style lang="less" scoped>
    .contentComics{
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


