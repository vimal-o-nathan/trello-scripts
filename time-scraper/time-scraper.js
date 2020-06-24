const fetch = require('node-fetch');
const scriptSettings = require('../trelloAuthSettings.json');
const trelloRestUtil = require('../common/trello-rest-util');
const textReportUtil = require('../common/text-report-util');

// Program starts here
trelloRestUtil.getListOfBoards(fetch, scriptSettings, textReportUtil.createTextReport, tsUtil.projectMapObjectGenerator);