// This code sample uses the 'node-fetch' library:
// https://www.npmjs.com/package/node-fetch
const fetch = require('node-fetch');
const scriptSettings = require('../trelloAuthSettings.json');
const tsUtil = require('./ts-util');
const readLine = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});




function getListOfBoards() {
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
        letUserSelectBoard(text);
    })
    .catch(err => console.error(err));
}





function letUserSelectBoard(boardResponseText) {
    const boardResponse = JSON.parse(boardResponseText);
    var boardSelectionText = tsUtil.createBoardSelectionText(boardResponse);
    
    readLine.question(boardSelectionText, value => {
        console.clear();
        retrieveListsOnBoard(boardResponse[value-1].id);
    });
}





function retrieveListsOnBoard(boardId) {
    fetch('https://api.trello.com/1/boards/' + boardId + '/lists' + '?key=' + scriptSettings.apiKey + '&token=' + scriptSettings.token + '&filter=open', {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        return response.text();
    })
    .then(text => {
        letUserSelectList(text);
    })
    .catch(err => console.error(err));
}




function letUserSelectList(listResponseText) {
    const listResponse = JSON.parse(listResponseText);
    var listSelectionText = tsUtil.createListSelectionText(listResponse);

    readLine.question(listSelectionText, value => {
        console.clear();
        retrieveCardsInList(listResponse[value-1].id);
    });
}




function retrieveCardsInList(listId) {
    fetch('https://api.trello.com/1/lists/' + listId + '/cards' + '?key=' + scriptSettings.apiKey + '&token=' + scriptSettings.token + '&filter=open', {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        return response.text();
    })
    .then(text => {
        tsUtil.createTextReport(text);
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




// Program starts here
getListOfBoards();