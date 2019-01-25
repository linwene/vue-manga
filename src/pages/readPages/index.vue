<template>
    <div class="contentComics">
        <div class="ComicPics">
            <img :src="item.img_src" v-for="(item,index) of imgList" :key="index">
        </div>
        <div class="pagenation">
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
            }
        },
        methods:{
            getComicImg () {
                const url =`http://127.0.0.1:5000/get_detail_img?href=${this.chapterId}`
                axios.get(url).then(res => {
                    let data = res.data
                    if (data.success){
                        this.imgList = data.data.msg
                        this.prev_url = data.data.prev_url
                        this.next_url = data.data.next_url
                    }
                })
            },
            clickPagenation (cid) {
                if (cid != null){
                    const url =`http://127.0.0.1:5000/get_detail_img?href=${cid}`
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
    }
</style>


