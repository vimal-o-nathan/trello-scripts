const assert = require('assert');
const tsUtil = require('../ts-util');

describe('Testing that Project Map parses cards correctly', () => {
    it('Project and time are handled correctly', () => {
        var stubCardResponse = [
            {
                "desc": "Project: Stupid\nTime: 2\nSome other text description",
                "name": "Stupid Project Task 1"
            }
        ];
        var expectedProjectMap = {
            "Stupid": {
                "time": 2.0,
                "tasks": "- Stupid Project Task 1\n"
            }
        };


        assert.deepEqual(expectedProjectMap, tsUtil.createProjectMap(stubCardResponse));
    });




    it('Time for same Project is summed correctly', () => {
        var stubCardResponse = [
            {
                "desc": "Project: Stupid\nTime: 2\nSome other text description",
                "name": "Stupid Project Task 1"
            },
            {
                "desc": "Project: Stupid\nTime: 1.25",
                "name": "Stupid Project Task 2"
            }
        ];
        var expectedProjectMap = {
            "Stupid": {
                "time": 3.25,
                "tasks": "- Stupid Project Task 1\n- Stupid Project Task 2\n"
            }
        };

        assert.deepEqual(expectedProjectMap, tsUtil.createProjectMap(stubCardResponse));
    });




    it('Time for different Projects are not summed together', () => {
        var stubCardResponse = [
            {
                "desc": "Project: Stupid\nTime: 2\nSome other text description",
                "name": "Stupid Project Task 1"
            },
            {
                "desc": "Project: Stupid\nTime: 1.25",
                "name": "Stupid Project Task 2"
            },
            {
                "desc": "Project: Smart\nTime: 2.75",
                "name": "Smart Project Task 1"
            }
        ];
        var expectedProjectMap = {
            "Stupid": {
                "time": 3.25,
                "tasks": "- Stupid Project Task 1\n- Stupid Project Task 2\n"
            },
            "Smart": {
                "time": 2.75,
                "tasks": "- Smart Project Task 1\n"
            }
        };

        assert.deepEqual(expectedProjectMap, tsUtil.createProjectMap(stubCardResponse));
    });




    it('Cards with an invalid description are categorized with 0 time under "Problematic Cards" Project', () => {
        var stubCardResponse = [
            {
                "desc": "Project: Stupid\nTime: 2\nSome other text description",
                "name": "Stupid Project Task 1"
            },
            {
                "desc": "Project: Stupid\nTime: 1.25",
                "name": "Stupid Project Task 2"
            },
            {
                "desc": "",
                "name": "Smart Project Task 1"
            }
        ];
        var expectedProjectMap = {
            "Stupid": {
                "time": 3.25,
                "tasks": "- Stupid Project Task 1\n- Stupid Project Task 2\n"
            },
            "Failed To Parse Cards": {
                "time": 0,
                "tasks": "- Smart Project Task 1\n"
            }
        };

        assert.deepEqual(expectedProjectMap, tsUtil.createProjectMap(stubCardResponse));
    });




    it ('Cards with a missing colon on Project are parsed correctly', () => {
        var stubCardResponse = [
            {
                "desc": "Project Stupid\nTime: 2\nSome other text description",
                "name": "Stupid Project Task 1"
            },
            {
                "desc": "Project: Stupid\nTime: 1.25",
                "name": "Stupid Project Task 2"
            }
        ];
        var expectedProjectMap = {
            "Stupid": {
                "time": 3.25,
                "tasks": "- Stupid Project Task 1\n- Stupid Project Task 2\n"
            }
        };

        assert.deepEqual(expectedProjectMap, tsUtil.createProjectMap(stubCardResponse));
    });




    it('Cards with a no space between Project are parsed correctly', () => {
        var stubCardResponse = [
            {
                "desc": "ProjectStupid\nTime: 2\nSome other text description",
                "name": "Stupid Project Task 1"
            },
            {
                "desc": "Project: Stupid\nTime: 1.25",
                "name": "Stupid Project Task 2"
            }
        ];
        var expectedProjectMap = {
            "Stupid": {
                "time": 3.25,
                "tasks": "- Stupid Project Task 1\n- Stupid Project Task 2\n"
            }
        };

        assert.deepEqual(expectedProjectMap, tsUtil.createProjectMap(stubCardResponse));
    });




    it ('Cards with a missing colon on Time are parsed correctly', () => {
        var stubCardResponse = [
            {
                "desc": "Project: Stupid\nTime 2\nSome other text description",
                "name": "Stupid Project Task 1"
            },
            {
                "desc": "Project: Stupid\nTime: 1.25",
                "name": "Stupid Project Task 2"
            }
        ];
        var expectedProjectMap = {
            "Stupid": {
                "time": 3.25,
                "tasks": "- Stupid Project Task 1\n- Stupid Project Task 2\n"
            }
        };

        assert.deepEqual(expectedProjectMap, tsUtil.createProjectMap(stubCardResponse));
    });




    it('Cards with a no space between Time are parsed correctly', () => {
        var stubCardResponse = [
            {
                "desc": "Project: Stupid\nTime: 2\nSome other text description",
                "name": "Stupid Project Task 1"
            },
            {
                "desc": "Project: Stupid\nTime1.25",
                "name": "Stupid Project Task 2"
            }
        ];
        var expectedProjectMap = {
            "Stupid": {
                "time": 3.25,
                "tasks": "- Stupid Project Task 1\n- Stupid Project Task 2\n"
            }
        };

        assert.deepEqual(expectedProjectMap, tsUtil.createProjectMap(stubCardResponse));
    });




    it('Project description that contains the word Project isn\'t replaced', () => {
        var stubCardResponse = [
            {
                "desc": "Project: Project1\nTime: 2\nSome other text description",
                "name": "Stupid Project Task 1"
            },
            {
                "desc": "Project: Project1\nTime1.25",
                "name": "Stupid Project Task 2"
            }
        ];
        var expectedProjectMap = {
            "Project1": {
                "time": 3.25,
                "tasks": "- Stupid Project Task 1\n- Stupid Project Task 2\n"
            }
        };

        assert.deepEqual(expectedProjectMap, tsUtil.createProjectMap(stubCardResponse));
    });
})