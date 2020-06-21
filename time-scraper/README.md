# time-scraper
A Script to scrape a tasks name, project and time spent. This information, once pulled from Trello, can be used to populate a report indicating the tasts for a day that were part of a single project, as well the time spent throughout the day on that project.

To use this there are a couple of things to note:

1. The title of the card is to be the task as it will appear when copied to a timesheet
1. The first two lines of the description have a particular format, that will be used by the scraper to determine the project and the time spent:
    ```
    Project: ${projectName}
    Time: ${timeInHours}
    ```
    * Where:
        * ${projectName} is the name of the project
        * ${timeInHours} is the time in hours for the tasl
    * For example:
        ```
        Project: IOM Sustain
        Time: 0.25
        ```
        * In this case the ${projectName} is "IOM Sustain" and the time spent is 15 minutes