const textReportUtil = {};



textReportUtil.createTextReport = (projectMapObjectGenerator, cardResponseText) => {
    const cardResponse = JSON.parse(cardResponseText);

    var breakingText = "=========================================================================================";

    console.log(breakingText);
    console.log(breakingText);
    console.log(breakingText);

    var totalTime = 0;
    var projectMap = textReportUtil.createTextReportMap(projectMapObjectGenerator, cardResponse);
    for (i in projectMap) {
        totalTime += projectMap[i].time;
        console.log('Project: ' + i);
        console.log('Time: ' + projectMap[i].time);
        console.log('Tasks:\n' + projectMap[i].tasks);
        console.log(breakingText);
    }

    console.log(breakingText);
    
    console.log('Total Time: ' + totalTime);

    console.log(breakingText);
    console.log(breakingText);
    console.log(breakingText);
}




textReportUtil.createTextReportMap = (projectMapObjectGenerator, cardResponse) => {
    var textReportMap = {};
    for (i=0; i < cardResponse.length; i++) {
        try{
            var textReportTimeObject = projectMapObjectGenerator(cardResponse[i]);
        } catch(ex) {
            var textReportTimeObject = {
                key: "Failed To Parse Cards",
                time: 0
            };
        }

        textReportUtil.initTextReportMapIfDoesntContainKey(textReportMap, textReportTimeObject.key);
        textReportMap[textReportTimeObject.key].time += textReportTimeObject.time;
        textReportMap[textReportTimeObject.key].tasks += "- " + cardResponse[i].name + "\n";
    }

    return textReportMap;
}




textReportUtil.initTextReportMapIfDoesntContainKey = (textReportMap, key) => {
    if (!(key in textReportMap)) {
        textReportMap[key] = {
            time: 0,
            tasks: ""
        };
    }
}




module.exports = textReportUtil;