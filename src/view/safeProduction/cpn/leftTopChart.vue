<template>
    <div class="leftTopChart">
        <div class="top">
            <h2>60</h2>
            <i>总数量</i>
        </div>
        <div class="bottom">
            <div class="item">
                <h2>伤亡人数</h2>
                <div class="line"></div>
                <p style="color: #F6BB3B;">34<i>人</i></p>
            </div>
            <div class="item">
                <h2>死亡人数</h2>
                <div class="line"></div>
                <p style="color: #F1606C">10<i>人</i></p>
            </div>
        </div>
    </div>
</template>
    
<script setup lang='ts'>

</script>
    
<style lang="scss" scoped>
.leftTopChart {
    background: url("@images/propertyManagement/item-bg.png") 0% 0% / 100% 100% no-repeat;
    width: 432px;
    height: 365px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .top {
        background: url('@images/safeProduction/总数量.png');
        background-size: 100% 100%;
        width: 200px;
        height: 120px;
        text-align: center;

        h2 {
            font-size: 32px;
            font-weight: normal;
            line-height: 36px;
            text-align: center;
            letter-spacing: 0px;
            color: #00CCFF;
            z-index: 0;
        }

        i {
            display: block;
            font-size: 16px;
            font-weight: normal;
            line-height: 20px;
            letter-spacing: 1.44px;
            color: #FFFFFF;
            z-index: 1;
            margin-top: 14px;
        }
    }

    .bottom {
        display: flex;
        margin-top: 30px;

        .item {
            background: url("@images/safeProduction/弧形框.png") 0% 0% / 100% 100% no-repeat;
            width: 192px;
            height: 88px;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;

            h2 {
                font-size: 16px;
                font-weight: normal;
                line-height: 16px;
                letter-spacing: 0em;
                color: #ECECEC;
                z-index: 0;
            }

            .line {
                width: 152px;
                height: 2px;
                opacity: 1;
                margin: 8px 0;
                background: linear-gradient(90deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.51) 26%, #7B90FF 50%, rgba(123, 144, 255, 0.57) 71%, rgba(255, 255, 255, 0.00) 100%);
            }

            p {
                font-size: 22px;
                font-weight: normal;
                line-height: 22px;
                letter-spacing: 0em;

                z-index: 0;

                i {
                    margin-left: 5px;
                    font-size: 12px;
                    font-weight: normal;
                    line-height: 12px;
                    letter-spacing: 0em;
                    color: #ECECEC;
                    z-index: 1;
                }
            }
        }
    }
}
</style>