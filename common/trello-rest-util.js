const trelloRestUtil = {};
const readLine = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});


trelloRestUtil.getListOfBoards = (fetch, 
                                  scriptSettings, 
                                  createTextReport, 
                                  projectMapObjectGenerator) => {

    fetch('https://api.trello.com/1/members/me/boards?key=' + scriptSettings.apiKey + '&token=' + scriptSettings.token + '&filter=open', {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        return response.text();
    })
    .then(text => {
        trelloRestUtil.letUserSelectBoard(fetch, 
                                          scriptSettings, 
                                          createTextReport, 
                                          projectMapObjectGenerator, 
                                          text);
    })
    .catch(err => console.error(err));
}




trelloRestUtil.letUserSelectBoard = (fetch, 
                                    scriptSettings, 
                                    createTextReport, 
                                    projectMapObjectGenerator, 
                                    boardResponseText) => {

    const boardResponse = JSON.parse(boardResponseText);
    var boardSelectionText = createBoardSelectionText(boardResponse);
    
    readLine.question(boardSelectionText, value => {
        console.clear();
        trelloRestUtil.retrieveListsOnBoard(fetch, scriptSettings, createTextReport, projectMapObjectGenerator, boardResponse[value-1].id);
    });
}




function createBoardSelectionText(boardResponse) {
    var boardSelectionText = 'Please select the board:\n';
    for (i=0; i < boardResponse.length; i++) {
        var currLine = i+1 + ': ' + boardResponse[i].name + '\n';
        boardSelectionText = boardSelectionText + currLine;
    }

    return boardSelectionText;
}




trelloRestUtil.retrieveListsOnBoard = (fetch, 
                                       scriptSettings, 
                                       createTextReport, 
                                       projectMapObjectGenerator, 
                                       boardId) => {
    
    fetch('https://api.trello.com/1/boards/' + 
            boardId + 
            '/lists?key=' + 
            scriptSettings.apiKey + 
            '&token=' + 
            scriptSettings.token + 
            '&filter=open', 
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            }
    )
    .then(response => {
        return response.text();
    })
    .then(text => {
        trelloRestUtil.letUserSelectList(fetch, 
                                         scriptSettings, 
                                         createTextReport, 
                                         projectMapObjectGenerator, 
                                         text);
    })
    .catch(err => console.error(err));
}




trelloRestUtil.letUserSelectList = (fetch, 
                                    scriptSettings, 
                                    createTextReport, 
                                    projectMapObjectGenerator, 
                                    listResponseText) => {

    const listResponse = JSON.parse(listResponseText);
    var listSelectionText = createListSelectionText(listResponse);

    readLine.question(listSelectionText, value => {
        console.clear();
        trelloRestUtil.retrieveCardsInList(fetch, 
                                           scriptSettings, 
                                           createTextReport, 
                                           projectMapObjectGenerator, 
                                           listResponse[value-1].id);
    });
}




function createListSelectionText(listResponse) {
    var listSelectionText = 'Please select the list:\n';
    for (i=0; i < listResponse.length; i++) {
        var currLine = i+1 + ': ' + listResponse[i].name + '\n';
        listSelectionText = listSelectionText + currLine;
    }

    return listSelectionText;
}




trelloRestUtil.retrieveCardsInList = (fetch, 
                                      scriptSettings, 
                                      createTextReport, 
                                      projectMapObjectGenerator, 
                                      listId) => {

    fetch('https://api.trello.com/1/lists/' + 
            listId + 
            '/cards?key=' + 
            scriptSettings.apiKey + 
            '&token=' + 
            scriptSettings.token + 
            '&filter=open', 
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            }
    )
    .then(response => {
        return response.text();
    })
    .then(text => {
        createTextReport(projectMapObjectGenerator, text);
        closeReadLine();
    })
    .catch(err => {
        console.error(err);
        closeReadLine();
    });
}




function closeReadLine() {
    readLine.close();
    readLine.removeAllListeners();
}




module.exports = trelloRestUtil;