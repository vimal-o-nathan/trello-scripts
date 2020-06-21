# time-scraper
A Script to scrape a tasks name, project and time spent. This information, once pulled from Trello, can be used to populate a report indicating the tasts for a day that were part of a single project, as well the time spent throughout the day on that project.

---
## Usage Notes

To use this there are a couple of things to note:

1. The title of the card is to be the task as it will appear in the report copied to a timesheet
1. The first two lines of the description in a Trello card **MUST** have a particular format, that will be used by the scraper to determine the project and the time spent:
    ```
    Project: ${projectName}
    Time: ${timeInHours}
    ```
    * Where:
        * ${projectName} is the name of the project
        * ${timeInHours} is the time in hours for the tasl
    * For example:
        ```
        Project: Storm Sustain
        Time: 0.25
        ```
        * In this case the ${projectName} is "Storm Sustain" and the time spent is 15 minutes
1. The report presented will look similar to the following:
    ```
    =========================================================================================
    =========================================================================================
    =========================================================================================
    Project: Storm Sustain
    Time: 3.5
    Tasks:
    - Dev Environment Configuration
    - Running Existing Unit Test Suite
    - Running Performance Tests

    =========================================================================================
    Project: General Admin
    Time: 0.25
    Tasks:
    - Submitting Timeshhets

    =========================================================================================
    Project: Objectives
    Time: 2
    Tasks:
    - Spring Framework Training

    =========================================================================================
    Project: Failed To Parse Cards
    Time: 0
    Tasks:
    - Coding Feature Request

    =========================================================================================
    =========================================================================================
    Total Time: 5.75
    =========================================================================================
    =========================================================================================
    =========================================================================================
    ```
    - Where:
        
        - Unique Projects will get their own section under the `Project` heading
        - Time for each task in a Project will be summed together and presented in the `Time` heading
        - Cards under a particular project will be grouped together under the `Tasks` heading in a list
        - There will be a single line of `=` between each Project
        - `Total Time` for the day will be presented near the bottom
        - If any cards did not contain the correct in order to retrieve the `Project` or the `Time`, these cards will appear under the `Failed to Parse Cards` project
            - **Note**: This project does not necessarily appear at the end of the report (order is not guaranteed)

---
## Execution Instructions
1. On the first run, the user will need to use npm to pull down necessary dependencies:
    - In a console, navigate to the time-scraper directory and perform an npm install:
    ```
    cd ${projectLocationOnDrive}/time-scraper/
    npm install
    ```
1. To execute the script, do the following:
    - In a console, navigate to the directory and execute time-scraper:
    ```
    cd ${projectLocationOnDrive}/time-scraper/
    node time-scraper.js
    ```