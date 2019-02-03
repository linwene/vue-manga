<template>
    <div>
       <!--搜索顶栏-->
        <section class="search-top-bar">
            <div class="search-form">
                <span class="search-top-btn back" @click="$router.back(-1)">[返回]</span>
                <!--搜索栏文本-->
                <div class="search-txt">
                    <!--搜索栏文本 - 文本提示框-->
                    <div class="search-hint-box">
                        <div class="search-hint-pad focus-ani"></div>
                        <i class="search-hint-icon">[搜]</i>
                        <span class="search-hint-txt">漫画名|作者</span>
                        <div class="search-hint-pad"></div>
                    </div>
                    <!--搜索栏文本 - 文本输入框-->
                    <div class="search-text-box">
                        <div class="txt-input-pad"></div>
                        <input class="txt-input" type="search"/>
                    </div>
                </div>
                <input class="search-top-btn search" type="submit" value="搜索"/>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name:'Search',
        data () {
            return {
                
            }
        }
    }
</script>

<style lang="less" scoped>
    .search-top-bar{
        .search-form {
            display: flex;
            align-items: center;
            position: relative;
            z-index: 1;
            height: 2.5rem;
            background-color: #ff9a6a;
            .search-top-btn.back {
                text-indent: -2500rem;
                font-size: 0;
                padding: 0.375rem;
                border-radius: 0.1rem;
                overflow: hidden;
            }
            .back::after {
                content: "";
                display: block;
                width: 1.35rem;
                height: 1.35rem;
                background: url(../../../static/images/sc_img_search.png) no-repeat -2.15rem -1.75rem;
                background-size: 5.1rem 4.275rem;
                width: 1.35rem;
                height: 1.35rem;
                background-repeat: no-repeat;
            }
            .search-txt {
                flex: 1;
                display: flex;
                align-items: center;
                position: relative;
                height: 1.65rem;
                margin-left: 0.15rem;
                box-sizing: border-box;
                overflow: hidden;
                background-color: white;
                border-radius: 0.1rem;
                .search-hint-box {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    .search-hint-pad {
                        flex: 1;
                        display: block;
                    }
                    .focus-ani {
                        margin-left: 0.3rem;
                        visibility: hidden;
                        transform: translate3d(0, 0, 0);
                        transition: transform 200ms ease, visibility 200ms ease, -webkit-transform 200ms ease;
                        line-height: 0.8rem;
                        height: 0.8rem;
                    }
                    .focus-ani::after {
                        content: "";
                        display: block;
                        margin-left: 100%;
                        width: 0.8rem;
                        height: 0.8rem;
                        background: url(../../../static/images/sc_img_search.png) no-repeat -3.75rem -1.75rem;
                        background-size: 5.1rem 4.275rem;
                        width: 0.8rem;
                        height: 0.8rem;
                        background-repeat: no-repeat;
                        text-indent: -2500rem;
                        font-size: 0;
                    }
                    .search-hint-icon {
                        width: 0.8rem;
                        height: 0.8rem;
                        background: url(../../../static/images/sc_img_search.png) no-repeat -3.75rem -1.75rem;
                        background-size: 5.1rem 4.275rem;
                        width: 0.8rem;
                        height: 0.8rem;
                        background-repeat: no-repeat;
                        text-indent: -2500rem;
                        font-size: 0;
                    }
                    .search-hint-txt {
                        margin-left: 0.1rem;
                        font-size: 0.75rem;
                        color: #C5C5C5;
                        display: block;
                        line-height: 0.8rem;
                        height: 0.8rem;
                        visibility: visible;
                        opacity: 1;
                        transition: opacity 200ms ease, visibility 200ms ease;
                    }
                    .search-hint-pad {
                        flex: 1;
                        display: block;
                    }
                }
                .search-text-box {
                    display: flex;
                    align-items: center;
                    position: absolute;
                    z-index: 1;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%; 
                    input{
                        vertical-align: middle;
                        -webkit-appearance: none;
                    }
                    .txt-input-pad {
                        width: 1.35rem;
                    }
                    .txt-input {
                        flex: 1;
                        display: block;
                        height: 0.95rem;
                        line-height: 0.95rem;
                        margin: 0;
                        padding: 0;
                        border: 0 none;
                        background-color: transparent;
                        outline: none;
                        font-size: 0.75rem;
                        color: #535252;
                    }
                    /*此处只是去掉search默认的小×*/
                    input[type=search]::-webkit-search-cancel-button{
                        -webkit-appearance: none;
                    }
                    /*自己重写小x的样式*/
                    input[type="search"]::-webkit-search-cancel-button{
                        -webkit-appearance: none;
                        margin-left: 0.25rem;
                        margin-right: 0.3rem;
                        width: 0.8rem;
                        height: 0.8rem;
                        background: url(../../../static/images/sc_img_search.png) no-repeat 0rem -3.475rem;
                        background-size: 5.1rem 4.275rem;
                        width: 0.8rem;
                        height: 0.8rem;
                        background-repeat: no-repeat;
                        text-indent: -2500rem;
                        font-size: 0;
                        transition: transform 200ms ease, visibility 200ms ease, -webkit-transform 200ms ease;
                    }
                }
                
            }
            .search {
                    display: block;
                    padding: 0.5rem;
                    font-size: 0.75rem;
                    color: white;
                    border: 0 none;
                    background: transparent;
                    -webkit-appearance: none;
                }
        }
    }
</style>
