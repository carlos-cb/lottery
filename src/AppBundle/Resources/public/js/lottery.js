$(document).ready(function() {
    var allMatchTexts = $('div.hidden').find('.matchText');
    var allMatchDivs = $('div.normal').find('.matchDiv');
    var ruleTexts = [];

    var str = [];
    var $str = [];
    var czLastInfo = [];
    var czTime = [];
    var czTimes = [];
    var czShangpan = [];
    var czXiapan = [];
    var mlLastInfo_1 = [];
    var mlTime_1 = [];
    var mlShangpan_1 = [];
    var mlXiapan_1 = [];
    var mlLastInfo_2 = [];
    var mlTime_2 = [];
    var mlShangpan_2 = [];
    var mlXiapan_2 = [];
    var psPankou = [];
    //每个比赛的循环
    for(var k=0; k<allMatchTexts.length; k++){
        str[k] = $(allMatchTexts[k]).text();
        $str[k] = $(str[k]);
        var teamName = $($str[k]).find('.teamname').text().replace('报错','');
        $(allMatchDivs[k]).find('#teamname').html(teamName);
        //CZ栏
        czLastInfo[k] = $(allMatchDivs[k]).find('tr#cz td span#lastInfo');
        czTime[k] = $(allMatchDivs[k]).find('tr#cz td span#time');
        czTimes[k] = $(allMatchDivs[k]).find('tr#cz td span#times');
        czShangpan[k] = $(allMatchDivs[k]).find('tr#cz td span#shangpan');
        czXiapan[k] = $(allMatchDivs[k]).find('tr#cz td span#xiapan');
        //ML栏
        mlLastInfo_1[k] = $(allMatchDivs[k]).find('tr#ml td span#lastInfo_1');
        mlTime_1[k] = $(allMatchDivs[k]).find('tr#ml td span#time_1');
        mlShangpan_1[k] = $(allMatchDivs[k]).find('tr#ml td span#shangpan_1');
        mlXiapan_1[k] = $(allMatchDivs[k]).find('tr#ml td span#xiapan_1');
        mlLastInfo_2[k] = $(allMatchDivs[k]).find('tr#ml td span#lastInfo_2');
        mlTime_2[k] = $(allMatchDivs[k]).find('tr#ml td span#time_2');
        mlShangpan_2[k] = $(allMatchDivs[k]).find('tr#ml td span#shangpan_2');
        mlXiapan_2[k] = $(allMatchDivs[k]).find('tr#ml td span#xiapan_2');
        //PS栏
        psPankou[k] = $(allMatchDivs[k]).find('tr#ps td span#numPankou');
        var psNumMatch = 0;

        //读取各公司数据
        var company = [];
        var companyGunqiu = [];
        company[0] = ($str[k]).find('table#oddsDetail tr td[style="background:#white"]:nth-child(1), table#oddsDetail tr td[style="background:#CCFFEE"]:nth-child(1)');
        company[1] = ($str[k]).find('table#oddsDetail tr td[style="background:#white"]:nth-child(2), table#oddsDetail tr td[style="background:#CCFFEE"]:nth-child(2)');
        company[2] = ($str[k]).find('table#oddsDetail tr td[style="background:#white"]:nth-child(3), table#oddsDetail tr td[style="background:#CCFFEE"]:nth-child(3)');
        company[3] = ($str[k]).find('table#oddsDetail tr td[style="background:#white"]:nth-child(4), table#oddsDetail tr td[style="background:#CCFFEE"]:nth-child(4)');
        company[4] = ($str[k]).find('table#oddsDetail tr td[style="background:#white"]:nth-child(5), table#oddsDetail tr td[style="background:#CCFFEE"]:nth-child(5)');
        company[5] = ($str[k]).find('table#oddsDetail tr td[style="background:#white"]:nth-child(6), table#oddsDetail tr td[style="background:#CCFFEE"]:nth-child(6)');
        company[6] = ($str[k]).find('table#oddsDetail tr td[style="background:#white"]:nth-child(7), table#oddsDetail tr td[style="background:#CCFFEE"]:nth-child(7)');
        company[7] = ($str[k]).find('table#oddsDetail tr td[style="background:#white"]:nth-child(8), table#oddsDetail tr td[style="background:#CCFFEE"]:nth-child(8)');
        company[8] = ($str[k]).find('table#oddsDetail tr td[style="background:#white"]:nth-child(9), table#oddsDetail tr td[style="background:#CCFFEE"]:nth-child(9)');
        company[9] = ($str[k]).find('table#oddsDetail tr td[style="background:#white"]:nth-child(10), table#oddsDetail tr td[style="background:#CCFFEE"]:nth-child(10)');
        company[10] = ($str[k]).find('table#oddsDetail tr td[style="background:#white"]:nth-child(11), table#oddsDetail tr td[style="background:#CCFFEE"]:nth-child(11)');
        company[11] = ($str[k]).find('table#oddsDetail tr td[style="background:#white"]:nth-child(12), table#oddsDetail tr td[style="background:#CCFFEE"]:nth-child(12)');
        companyGunqiu[0] = ($str[k]).find('table#oddsDetail tr td[style="background:#ccccee"]:nth-child(1)');
        companyGunqiu[1] = ($str[k]).find('table#oddsDetail tr td[style="background:#ccccee"]:nth-child(2)');
        companyGunqiu[2] = ($str[k]).find('table#oddsDetail tr td[style="background:#ccccee"]:nth-child(3)');
        companyGunqiu[3] = ($str[k]).find('table#oddsDetail tr td[style="background:#ccccee"]:nth-child(4)');
        companyGunqiu[4] = ($str[k]).find('table#oddsDetail tr td[style="background:#ccccee"]:nth-child(5)');
        companyGunqiu[5] = ($str[k]).find('table#oddsDetail tr td[style="background:#ccccee"]:nth-child(6)');
        companyGunqiu[6] = ($str[k]).find('table#oddsDetail tr td[style="background:#ccccee"]:nth-child(7)');
        companyGunqiu[7] = ($str[k]).find('table#oddsDetail tr td[style="background:#ccccee"]:nth-child(8)');
        companyGunqiu[8] = ($str[k]).find('table#oddsDetail tr td[style="background:#ccccee"]:nth-child(9)');
        companyGunqiu[9] = ($str[k]).find('table#oddsDetail tr td[style="background:#ccccee"]:nth-child(10)');
        companyGunqiu[10] = ($str[k]).find('table#oddsDetail tr td[style="background:#ccccee"]:nth-child(11)');
        companyGunqiu[11] = ($str[k]).find('table#oddsDetail tr td[style="background:#ccccee"]:nth-child(12)');
/*
        //如果BET365无数据跳过
        if(company[5].length < 1){
            $(allMatchDivs[k]).addClass("hidden");
            continue;
        }
        //如果数据小于等于4行的跳过
        var allNumData = company[0].length + company[1].length + company[2].length + company[3].length + company[4].length + company[5].length
            + company[6].length + company[7].length + company[8].length + company[9].length + company[10].length + company[11].length;
        if(allNumData <= 4){
            $(allMatchDivs[k]).addClass("hidden");
            continue;
        }*/

        //每个公司的循环
        var lastInfo = [];
        var time = [];
        var times = [];

        var allShangpan = [];
        var allXiapan = [];
        var rule2Shangpan = 0;
        var rule2Xiapan = 0;
        var rule2Companys = 0;
        var rule3Shangpan = 0;
        var rule3Xiapan = 0;
        var rule3ShangJianXia =[];
        var rule5Shangpan = [];
        var rule5Xiapan = [];
        var rule5Aocai = false;
        for(var h=0; h<12; h++){
            var companyName = changeCompanyName(h);
            var rule5ShangpanColors = "";
            var rule5XiapanColors = "";
            //填写最后一个盘口
            lastInfo[h] = company[h].eq(0).clone().children().remove().end().text();
            $(czLastInfo[k]).eq(h).html(lastInfo[h]);

            //判断有三种及以上的盘口 PS
            var arrayPankou = [];
            for(var v=0; v<company[h].length; v++){
                var pankou = company[h].eq(v).clone().children().remove().end().text();
                if(arrayPankou.indexOf(pankou) == -1){
                    arrayPankou.push(pankou);
                }
            }
            if(arrayPankou.length >= 3){
                $(psPankou[k]).eq(h).html(arrayPankou.length);
                psNumMatch++;
                if(h = 0){
                    rule5Aocai =true;
                }
            }


            //判断是否有最后一个盘口 CZ
            if(company[h].length>0){
                rule2Companys++;
                //填写最后一个盘口时间
                time[h] = company[h].eq(0).parent().find('td:nth-child(14)').html().replace('<br>','&nbsp;');
                $(czTime[k]).eq(h).html(time[h]);

                //填写和最后一个盘口相同的次数
                times[h] = company[h].filter(function(){
                    return $(this).clone().children().remove().end().text() == lastInfo[h];
                }).length;
                $(czTimes[k]).eq(h).html(times[h]);

                //填写上盘
                allShangpan[h] = company[h].filter(function(){
                    return $(this).clone().children().remove().end().text() == lastInfo[h];
                }).find('span.f3');
                var arrayShangpan = [];
                for(var z=0; z<times[h]; z++){
                    arrayShangpan[z] = Math.abs(parseFloat($(allShangpan[h]).eq(z).text()));
                }
                var maxNumShangpan = Math.max.apply(Math, arrayShangpan);
                var lastNumShangpan = parseFloat(company[h].eq(0).find('span.f3').text());
                var chazhiShangpan = (maxNumShangpan - lastNumShangpan).toFixed(2);

                $(czShangpan[k]).eq(h).text(chazhiShangpan);
                //规则1 上盘差值大于等于0.6
                if(chazhiShangpan >= 0.6){
                    $(czShangpan[k]).eq(h).css("color", "blue");
                    var ruleText_1s = teamName + "的比赛," + companyName + "公司的上盘符合规则1，数值为" + chazhiShangpan;
                    ruleTexts.push(ruleText_1s);
                }
                //如果上盘差值等于0
                if(chazhiShangpan > 0){
                    rule2Shangpan++;
                }
                //规则3 如果上盘差值大于0.12
                if(chazhiShangpan < 0.12){
                    rule3Shangpan++;
                }

                //填写下盘
                allXiapan[h] = company[h].filter(function(){
                    return $(this).clone().children().remove().end().text() == lastInfo[h];
                }).find('span.f2');
                var arrayXiapan = [];
                for(var d=0; d<times[h]; d++){
                    arrayXiapan[d] = Math.abs(parseFloat($(allXiapan[h]).eq(d).text()));
                }
                var maxNumXiapan = Math.max.apply(Math, arrayXiapan);
                var lastNumXiapan = parseFloat(company[h].eq(0).find('span.f2').text());
                var chazhiXiapan = (maxNumXiapan - lastNumXiapan).toFixed(2);
                $(czXiapan[k]).eq(h).text(chazhiXiapan);
                //规则1 下盘差值大于等于0.6
                if(chazhiXiapan >= 0.6){
                    $(czXiapan[k]).eq(h).css("color", "blue");
                    var ruleText_1x = teamName + "的比赛," + companyName + "公司的下盘符合规则1，数值为" + chazhiXiapan;
                    ruleTexts.push(ruleText_1x);
                }
                //规则2 如果下盘差值等于0
                if(chazhiXiapan > 0){
                    rule2Xiapan++;
                }
                //规则3 如果下盘差值大于0.12
                if(chazhiXiapan < 0.12){
                    rule3Xiapan++;
                }

                //规则3 上盘减下盘
                rule3ShangJianXia[h] = chazhiShangpan - chazhiXiapan;

                //规则9 判断最后1个盘口和前2个走地盘
                if(companyGunqiu[h].length > 1){
                    var firstGunqiuInfo_1_9 = companyGunqiu[h].eq(-1).clone().children().remove().end().text();
                    var firstGunqiuInfo_2_9 = companyGunqiu[h].eq(-2).clone().children().remove().end().text();
                    if(lastInfo[h] != firstGunqiuInfo_2_9 && lastInfo[h] != firstGunqiuInfo_1_9 && firstGunqiuInfo_1_9 != firstGunqiuInfo_2_9){
                        var ruleText_9 = teamName + "的比赛," + companyName + "公司连续变盘,符合规则9";
                        ruleTexts.push(ruleText_9);
                    }
                }

                //规则10 判断最后1个盘口和第1个走地盘
                if(companyGunqiu[h].length > 0){
                    var role10GunqiuNumShangpan = parseFloat(companyGunqiu[h].eq(-1).find('span.f3').text());
                    var role10ChazhiShangpan = (lastNumShangpan - role10GunqiuNumShangpan).toFixed(2);
                    if(role10ChazhiShangpan >= 0.49){
                        var ruleText_10s = teamName + "的比赛," + companyName + "公司的上盘符合规则10，数值为" + role10ChazhiShangpan;
                        ruleTexts.push(ruleText_10s);
                    }
                    var role10GunqiuNumXiapan = parseFloat(companyGunqiu[h].eq(-1).find('span.f2').text());
                    var role10ChazhiXiapan = (lastNumXiapan - role10GunqiuNumXiapan).toFixed(2);
                    if(role10ChazhiXiapan >= 0.49){
                        var ruleText_10x = teamName + "的比赛," + companyName + "公司的下盘符合规则10，数值为" + role10ChazhiXiapan;
                        ruleTexts.push(ruleText_10x);
                    }

                }
            }

            //判断是否至少有两个盘口ML
            if(company[h].length>1){
                //填写倒数第一个盘口数据
                var lastInfo_1 = company[h].eq(0).clone().children().remove().end().text();
                $(mlLastInfo_1[k]).eq(h).html(lastInfo_1);
                var time_1 = company[h].eq(0).parent().find('td:nth-child(14)').html().replace('<br>','&nbsp;');
                $(mlTime_1[k]).eq(h).html(time_1);
                var shangpan_1 = parseFloat(company[h].eq(0).find('span.f3').text());
                $(mlShangpan_1[k]).eq(h).html(shangpan_1);
                var xiapan_1 = parseFloat(company[h].eq(0).find('span.f2').text());
                $(mlXiapan_1[k]).eq(h).html(xiapan_1);
                //填写倒数第二个盘口数据
                var lastInfo_2 = company[h].eq(1).clone().children().remove().end().text();
                $(mlLastInfo_2[k]).eq(h).html(lastInfo_2);
                var time_2 = company[h].eq(1).parent().find('td:nth-child(14)').html().replace('<br>','&nbsp;');
                $(mlTime_2[k]).eq(h).html(time_2);
                var shangpan_2 = parseFloat(company[h].eq(1).find('span.f3').text());
                $(mlShangpan_2[k]).eq(h).html(shangpan_2);
                var xiapan_2 = parseFloat(company[h].eq(1).find('span.f2').text());
                $(mlXiapan_2[k]).eq(h).html(xiapan_2);

                //规则4
                var role4ChazhiShangpan = shangpan_2 - shangpan_1;
                var role4ChazhiXiapan = xiapan_2 - xiapan_1;
                if(role4ChazhiShangpan >= 0.49){
                    $(mlShangpan_1[k]).eq(h).css("color", "purple");
                    var ruleText_4s = teamName + "的比赛," + companyName + "公司的上盘符合规则4，数值为" + role4ChazhiShangpan;
                    ruleTexts.push(ruleText_4s);
                    if(arrayPankou.length >= 3){
                        rule5ShangpanColors.push("紫");
                    }
                }else{
                    if(lastInfo_1 == lastInfo_2){
                        if(role4ChazhiShangpan > 0){
                            $(mlShangpan_1[k]).eq(h).css("color", "green");
                            if(arrayPankou.length >= 3){
                                rule5ShangpanColors.push("绿");
                            }
                        }
                        if(role4ChazhiShangpan < 0){
                            $(mlShangpan_1[k]).eq(h).css("color", "red");
                            if(arrayPankou.length >= 3){
                                rule5ShangpanColors.push("红");
                            }
                        }
                        if(role4ChazhiShangpan = 0){
                            if(arrayPankou.length >= 3){
                                rule5ShangpanColors.push("黑");
                            }
                        }
                    }else{
                        if(arrayPankou.length >= 3){
                            rule5ShangpanColors.push("黑");
                        }
                    }
                }
                if(role4ChazhiXiapan >= 0.49){
                    $(mlXiapan_1[k]).eq(h).css("color", "purple");
                    var ruleText_4x = teamName + "的比赛," + companyName + "公司的下盘符合规则4，数值为" + role4ChazhiXiapan;
                    ruleTexts.push(ruleText_4x);
                    if(arrayPankou.length >= 3){
                        rule5XiapanColors.push("紫");
                    }
                }else{
                    if(lastInfo_1 == lastInfo_2){
                        if(role4ChazhiXiapan > 0){
                            $(mlXiapan_1[k]).eq(h).css("color", "green");
                            if(arrayPankou.length >= 3){
                                rule5XiapanColors.push("绿");
                            }
                        }
                        if(role4ChazhiXiapan < 0){
                            $(mlXiapan_1[k]).eq(h).css("color", "red");
                            if(arrayPankou.length >= 3){
                                rule5XiapanColors.push("红");
                            }
                        }
                        if(role4ChazhiXiapan = 0){
                            if(arrayPankou.length >= 3){
                                rule5XiapanColors.push("黑");
                            }
                        }
                    }else{
                        if(arrayPankou.length >= 3){
                            rule5XiapanColors.push("黑");
                        }
                    }
                }

                //规则8 判断最后2个盘口和第一个走地盘
                if(companyGunqiu[h].length > 0){
                    var firstGunqiuInfo_1_8 = companyGunqiu[h].eq(-1).clone().children().remove().end().text();
                    if(lastInfo_1 != lastInfo_2 && lastInfo_1 != firstGunqiuInfo_1_8 && lastInfo_2 != firstGunqiuInfo_1_8){
                        var ruleText_8 = teamName + "的比赛," + companyName + "公司连续变盘,符合规则8";
                        ruleTexts.push(ruleText_8);
                    }
                }

            }

            //判断是否至少有三个盘口 规则6 规则7
            if(company[h].length>2){
                //规则6 判断最后3个盘口是否一致
                var lastInfo_3 = company[h].eq(2).clone().children().remove().end().text();
                if(lastInfo_1 == lastInfo_2 && lastInfo_2 == lastInfo_3){
                    var role6Shangpan_3 = parseFloat(company[h].eq(2).find('span.f3').text());
                    var role6ShangpanChazhi2 = role6Shangpan_3 - shangpan_2;
                    var role6ShangpanChazhi1 = shangpan_2 - shangpan_1;
                    if(role6ShangpanChazhi2 >= 0.16 && role6ShangpanChazhi1 >= 0.16){
                        var ruleText_6s = teamName + "的比赛," + companyName + "公司,上盘最后两格大跌,符合规则6";
                        ruleTexts.push(ruleText_6s);
                    }

                    var role6Xiapan_3 = parseFloat(company[h].eq(2).find('span.f2').text());
                    var role6XiapanChazhi2 = role6Xiapan_3 - xiapan_2;
                    var role6XiapanChazhi1 = xiapan_2 - xiapan_1;
                    if(role6XiapanChazhi2 >= 0.16 && role6XiapanChazhi1 >= 0.16){
                        var ruleText_6x = teamName + "的比赛," + companyName + "公司,下盘最后两格大跌,符合规则6";
                        ruleTexts.push(ruleText_6x);
                    }
                }

                //规则7 判断最后3个盘口是否完全不同
                if(lastInfo_1 != lastInfo_2 && lastInfo_1 != lastInfo_3 && lastInfo_2 != lastInfo_3){
                    var ruleText_7 = teamName + "的比赛," + companyName + "公司连续变盘,符合规则7";
                    ruleTexts.push(ruleText_7);
                }
            }

            rule5Shangpan.push(rule5ShangpanColors);
            rule5Xiapan.push(rule5XiapanColors);
        }//结束公司循环

        //规则2 最终判断
        if(rule2Companys >= 7 && rule2Shangpan == 0){
            var ruleText_2s = teamName + "的比赛，所有的" + rule2Companys + "个公司都符合规则2，上盘全为0";
            ruleTexts.push(ruleText_2s);
        }
        if(rule2Companys >= 7 && rule2Xiapan == 0){
            var ruleText_2x = teamName + "的比赛，所有的" + rule2Companys + "个公司都符合规则2，下盘全为0";
            ruleTexts.push(ruleText_2x);
        }

        //规则3 最终判断
        if(rule2Companys >= 7 && rule3Shangpan == 0 && rule3Xiapan == 0){
            var shangpanDa = true;
            var xiapanDa = true;
            for(var y=0; y<rule3ShangJianXia.length; y++){
                if(rule3ShangJianXia[y] >= 0){
                    shangpanDa = true;
                }else{
                    shangpanDa = false;
                    break;
                }
            }
            for(var x=0; x<rule3ShangJianXia.length; x++){
                if(rule3ShangJianXia[x] <= 0){
                    xiapanDa = true;
                }else{
                    xiapanDa = false;
                    break;
                }
            }
            if(shangpanDa){
                var ruleText_3s = teamName + "的比赛，所有的" + rule2Companys + "个公司都符合规则3，上盘大";
                ruleTexts.push(ruleText_3s);
            }
            if(xiapanDa){
                var ruleText_3x = teamName + "的比赛，所有的" + rule2Companys + "个公司都符合规则3，下盘大";
                ruleTexts.push(ruleText_3x);
            }
        }

        //规则5
        if(rule5Aocai && (psNumMatch >= 3)){
            //上盘
            var role5ShangpanColorsSame = true;
            for(var r=1; r< rule5Shangpan.length; r++){
                if(rule5Shangpan[r-1] != rule5Shangpan[r]){
                    role5ShangpanColorsSame = false;
                    break;
                }
            }
            if(role5ShangpanColorsSame){
                var ruleText_5s = teamName + "的比赛，有" + psNumMatch + "个公司多变盘，符合规则5，上盘全为" + rule5Shangpan[0] + "色";
                ruleTexts.push(ruleText_5s);
            }
            //下盘
            var role5XiapanColorsSame = false;
            for(var t=1; t< rule5Xiapan.length; t++){
                if(rule5Xiapan[t-1] != rule5Xiapan[t]){
                    role5XiapanColorsSame = false;
                    break;
                }
            }
            if(role5XiapanColorsSame){
                var ruleText_5x = teamName + "的比赛，有" + psNumMatch + "个公司多变盘，符合规则5，下盘全为" + rule5Xiapan[0] + "色";
                ruleTexts.push(ruleText_5x);
            }
        }


    }


    /*
    var str1 = $('.hidden #match_1').text();
    var $str1 = $(str1);
     */
    if(ruleTexts.length == 0){
        ruleTexts.push('目前没有数据符合规则');
    }
    var path = $('div.router').attr("data-path");
    $.ajax({
        type: 'POST',
        url: path,
        data: {val2: ruleTexts }
    });
});

function changeCompanyName(companyId){
    switch (companyId)
    {
        case 0:
            return "澳门";
            break;
        case 1:
            return "SB";
            break;
        case 2:
            return "10Bet";
            break;
        case 3:
            return "金宝博";
            break;
        case 4:
            return "利记";
            break;
        case 5:
            return "Bet365";
            break;
        case 6:
            return "立博";
            break;
        case 7:
            return "韦德";
            break;
        case 8:
            return "易胜";
            break;
        case 9:
            return "12Bet";
            break;
        case 10:
            return "明陞";
            break;
        case 11:
            return "盈禾";
            break;
    }
}