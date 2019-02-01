<template>
    <div>
        <header class="top-bar">
            <span class="btn-top back" @click="$router.back(-1)">[返回]</span>
            <h1 class="top-title">每日更新</h1>
            <!-- search -->
            <router-link 
                class="search-link"
                tag="a"
                to="/search"
                >
                <i class="sprite-app-search"></i>
            </router-link>
        </header>
        <section class="week-day-tab">
            <ul class="tab-list">
                <li 
                    class="tab-list-item" 
                    :class="{'active':active == index}" 
                    v-for="(item,index) of week_days"
                    :key="index"
                     @click="selected(index)"
                    >
                    {{week_days[index]}}
                    </li>
            </ul>
        </section>
        <section class="comic-list">
            <div class="middle" v-show="endPageStatus">
                <div class="rows">
                    <div class="HomeList" v-for="(item,index) of onedayList" :key="index">
                        <router-link 
                        tag="a"
                        :to="'/detail/' + item.comic_id"
                        :key="item.comic_id"
                        class="itemLink"
                        >
                            <img :src="item.vertical_image_url" alt=""> 
                            <div class="comic-content">
                                <span class="comic-title">{{item.comic_title}}</span>
                            </div>
                        </router-link>
                    </div>        
                </div>
            </div>
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
    export default {
        name:'UpdateToday',
        data () {
            return {
                'ShowOne':true,
                week_days:[],
                endPageStatus:false,
                active: 0,
                onedayList:[],
            }
        },
        methods: {
            getDay () {
                let self = this
                const url =`${this.$hostname}/get_day?pos=0`
                axios.get(url).then(res => {
                    let data = res.data
                    if (data.success){
                        self.week_days = data.data.week_days
                        self.onedayList = data.data.msg
                        this.endPageStatus = true
                    }
                })
            },
            selected(index){
                let self = this
                self.active = index
                const url = `${this.$hostname}/get_day?pos=`+index
                this.endPageStatus = false
                axios.get(url).then(res => {
                    let data = res.data
                    var count = 0 
                    if (data.success){
                        self.onedayList = data.data.msg
                        this.endPageStatus = true
                    }
                })
            }
        },
        mounted () {
            this.getDay()
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
    .week-day-tab{
        position: fixed;
        top: 2.5rem;
        left: 0;
        width: 100%;
        height: 2rem;
        z-index: 149;
        background-color: #FFFFFF;
        .tab-list {
            display: flex;
            width: 100%;
            height: 100%;
            overflow: hidden;
            .tab-list-item {
                flex: 1;
                display: block;
                position: relative;
                height: 2rem;
                line-height: 2rem;
                font-size: 0.75rem;
                color: #969696;
                text-align: center;
            }
            .active {
                color: #535252;
            }
            .active::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 50%;
                -webkit-transform: translate(-50%, 0);
                transform: translate(-50%, 0);
                width: 0.5rem;
                height: 0.15rem;
                background-color: #ff9a6a;
            }    
        }
    }
    section.comic-list {
        padding-top: 4.5rem;
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

