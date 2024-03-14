<template>
    <div class="leftBottomBox">
        <ul>
            <li class="leftBox">
                <h2>20k-30k</h2>
                <p>40%</p>
            </li>
            <li class="rightBox">
                <div class="top">
                    <h2>10k-20k</h2>
                    <p>25%</p>
                </div>
                <div class="bottom">
                    <div class="small">
                        <span>
                            <h2>10k-20k</h2>
                            <p>25%</p>
                        </span>
                        <span>
                            <h2>10k-20k</h2>
                            <p>10%</p>
                        </span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
    
<script setup>

</script>
    
<style lang="scss" scoped>
.leftBottomBox {
    width: 432px;
    height: 364px;
    background: url("@images/payrollManagement/border.png") 0% 0% / 100% 100%;
    padding: 16px;
    box-sizing: border-box;



    .leftBox {
        padding: 16px;
        box-sizing: border-box;
        width: 100%;
        height: 150px;
        border-radius: 8px;
        opacity: 1;
        background: linear-gradient(180deg, rgba(62, 100, 181, 0.0254) 0%, rgba(62, 100, 181, 0.0659) 100%);
        border: 1px solid;
        border-image: linear-gradient(212deg, rgba(255, 255, 255, 0.64) 1%, rgba(50, 64, 200, 0.64) 31%, rgba(255, 255, 255, 0.8) 96%);
        box-shadow: 0px 0px 3px 0px rgba(80, 157, 253, 0.2431), inset 0px 0px 24px 0px #3C97F1;
        position: relative;

        h2,
        p {

            font-size: 12px;
            font-weight: 500;
            line-height: 16px;
            text-align: center;
            background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 52%, #3C97F1 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
            text-shadow: 0px 4px 10px rgba(166, 178, 255, 0.91);
        }

        h2 {
            position: absolute;
            top: 16px;
            left: 16px;
        }

        p {
            position: absolute;
            bottom: 16px;
            left: 16px;
        }

    }

    .rightBox {
        display: flex;
        margin-left: 4px;

        .top {
            margin-top: 4px;
            padding: 16px;
            box-sizing: border-box;
            width: 198px;
            height: 180px;
            border-radius: 8px;
            opacity: 1;
            background: linear-gradient(180deg, rgba(62, 100, 181, 0.0254) 0%, rgba(62, 100, 181, 0.0659) 100%);
            border: 1px solid;
            border-image: linear-gradient(232deg, rgba(255, 255, 255, 0.64) 1%, #3240C8 31%, rgba(255, 255, 255, 0.8) 97%);
            box-shadow: 0px 0px 3px 0px rgba(4, 197, 197, 0.2431), inset 0px 0px 24px 0px rgba(11, 230, 230, 0.6);
            position: relative;

            h2,
            p {

                font-size: 12px;
                font-weight: 500;
                line-height: 16px;
                text-align: center;
                background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 52%, #3C97F1 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-fill-color: transparent;
                text-shadow: 0px 4px 10px rgba(166, 178, 255, 0.91);
            }

            h2 {
                position: absolute;
                top: 16px;
                left: 16px;
            }

            p {
                position: absolute;
                bottom: 16px;
                left: 16px;
            }
        }

        .bottom {
            margin-top: 6px;
            display: flex;

            .big {
                padding: 16px;
                box-sizing: border-box;
                width: 97px;
                height: 180px;
                border-radius: 8px;
                opacity: 1;
                background: linear-gradient(180deg, rgba(62, 100, 181, 0.0254) 0%, rgba(62, 100, 181, 0.0659) 100%);
                border: 1px solid;
                border-image: linear-gradient(212deg, rgba(255, 255, 255, 0.64) 1%, #3240C8 31%, rgba(255, 255, 255, 0.8) 96%);
                box-shadow: 0px 0px 3px 0px rgba(181, 87, 0, 0.2431), inset 0px 0px 24px 0px rgba(255, 153, 59, 0.6);
                position: relative;

                h2,
                p {

                    font-size: 12px;
                    font-weight: 500;
                    line-height: 16px;
                    text-align: center;
                    background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 52%, #3C97F1 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    text-fill-color: transparent;
                    text-shadow: 0px 4px 10px rgba(166, 178, 255, 0.91);
                }

                h2 {
                    position: absolute;
                    top: 16px;
                    left: 16px;
                }

                p {
                    position: absolute;
                    bottom: 16px;
                    left: 16px;
                }
            }

            .small {
                margin-left: 4px;

                span:first-child {
                    padding: 16px;
                    box-sizing: border-box;
                    display: block;
                    width: 192px;
                    height: 90px;
                    border-radius: 8px;
                    opacity: 1;
                    background: linear-gradient(180deg, rgba(62, 100, 181, 0.0254) 0%, rgba(62, 100, 181, 0.0659) 100%);
                    border: 1px solid;
                    border-image: linear-gradient(232deg, rgba(255, 255, 255, 0.64) 1%, #3240C8 31%, rgba(255, 255, 255, 0.8) 97%);
                    box-shadow: 0px 0px 3px 0px rgba(170, 117, 2, 0.2431), inset 0px 0px 24px 0px rgba(235, 172, 35, 0.6);
                    position: relative;

                    h2,
                    p {

                        font-size: 12px;
                        font-weight: 500;
                        line-height: 16px;
                        text-align: center;
                        background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 52%, #3C97F1 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        text-fill-color: transparent;
                        text-shadow: 0px 4px 10px rgba(166, 178, 255, 0.91);
                    }

                    h2 {
                        position: absolute;
                        top: 16px;
                        left: 16px;
                    }

                    p {
                        position: absolute;
                        bottom: 16px;
                        left: 16px;
                    }
                }

                span:last-child {
                    display: block;
                    padding: 16px;
                    box-sizing: border-box;
                    width: 192px;
                    height: 90px;
                    border-radius: 8px;
                    opacity: 1;
                    background: linear-gradient(180deg, rgba(62, 100, 181, 0.0254) 0%, rgba(62, 100, 181, 0.0659) 100%);
                    border: 1px solid;
                    border-image: linear-gradient(232deg, rgba(255, 255, 255, 0.64) 1%, #3240C8 31%, rgba(255, 255, 255, 0.8) 97%);
                    box-shadow: 0px 0px 3px 0px rgba(63, 1, 149, 0.2431), inset 0px 0px 24px 0px rgba(148, 70, 255, 0.6);
                    position: relative;

                    h2,
                    p {

                        font-size: 12px;
                        font-weight: 500;
                        line-height: 16px;
                        text-align: center;
                        background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 52%, #3C97F1 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        text-fill-color: transparent;
                        text-shadow: 0px 4px 10px rgba(166, 178, 255, 0.91);
                    }

                    h2 {
                        position: absolute;
                        top: 16px;
                        left: 16px;
                    }

                    p {
                        position: absolute;
                        bottom: 16px;
                        left: 16px;
                    }

                }
            }
        }
    }
}
</style>