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
                <li class="tab-list-item" :class="{'active':ShowOne}" data-index="0">{{dayList[0]}}</li>
                <li class="tab-list-item" data-index="1">{{dayList[1]}}</li>
                <li class="tab-list-item" data-index="2">{{dayList[2]}}</li>
                <li class="tab-list-item" data-index="3">{{dayList[3]}}</li>
                <li class="tab-list-item" data-index="4">{{dayList[4]}}</li>
                <li class="tab-list-item" data-index="5">{{dayList[5]}}</li>
                <li class="tab-list-item" data-index="6">{{dayList[6]}}</li>
            </ul>
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
                dayList:[]
            }
        },
        methods: {
            getDay () {
                let self = this
                const url =`${this.$hostname}/get_day`
                axios.get(url).then(res => {
                    let data = res.data
                    if (data.success){
                        self.dayList = data.data.msg
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
</style>

