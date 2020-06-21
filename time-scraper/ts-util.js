const tsUtil = {};




tsUtil.createBoardSelectionText = (boardResponse) => {
    var boardSelectionText = 'Please select the board:\n';
    for (i=0; i < boardResponse.length; i++) {
        var currLine = i+1 + ': ' + boardResponse[i].name + '\n';
        boardSelectionText = boardSelectionText + currLine;
    }

    return boardSelectionText;
}




tsUtil.createListSelectionText = (listResponse) => {
    var listSelectionText = 'Please select the list:\n';
    for (i=0; i < listResponse.length; i++) {
        var currLine = i+1 + ': ' + listResponse[i].name + '\n';
        listSelectionText = listSelectionText + currLine;
    }

    return listSelectionText;
}




tsUtil.createTextReport = (cardResponseText) => {
    const cardResponse = JSON.parse(cardResponseText);

    var breakingText = "=========================================================================================";

    console.log(breakingText);
    console.log(breakingText);
    console.log(breakingText);

    var totalTime = 0;
    var projectMap = tsUtil.createProjectMap(cardResponse);
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




tsUtil.createProjectMap = (cardResponse) => {
    var projectMap = {};
    for (i=0; i < cardResponse.length; i++) {
        try{
            var projectTimeSplit = cardResponse[i].desc.split('\n');
            var project = projectTimeSplit[0].replace(/Project:? ?/, '');
            var time = parseFloat(projectTimeSplit[1].replace(/Time:? ?/, ''));
        } catch(ex) {
            var project = "Failed To Parse Cards";
            var time = 0;
        }

        initProjectMapIfDoesntContainProject(projectMap, project);
        projectMap[project].time += time;
        projectMap[project].tasks += "- " + cardResponse[i].name + "\n";
    }

    return projectMap;
}




function initProjectMapIfDoesntContainProject(projectMap, project) {
    if (!(project in projectMap)) {
        projectMap[project] = {
            time: 0,
            tasks: ""
        };
    }
}




module.exports = tsUtil;