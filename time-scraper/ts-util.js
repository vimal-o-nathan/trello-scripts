const tsUtil = {};

tsUtil.projectMapObjectGenerator = (cardResponse) => {
    var projectTimeSplit = cardResponse.desc.split('\n');
    var project = projectTimeSplit[0].replace(/Project:? ?/, '');
    var time = parseFloat(projectTimeSplit[1].replace(/Time:? ?/, ''));

    return {
        key: project,
        time: time
    };
}

module.exports = tsUtil;