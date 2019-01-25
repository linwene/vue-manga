<template>
    <div class="contentComics">
        <div class="ComicPics">
            <img :src="item.img_src" v-for="item of imgList">
        </div>
        <div class="pagenation">
            <div class="grid-half">
                <a href="javascript:;" class="btn prev">
                    <img src="../../../static/images/icon_left.png">
                    上一篇
                </a>
            </div>
            <div class="grid-half">
                <a href="javascript:;" class="btn next">
                下一篇
                <img src="../../../static/images/icon_right.png"></a>
            </div>
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
                next_url:''
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
    }
</style>


