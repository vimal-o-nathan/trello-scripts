# trello-scripts

## Setting up REST API Authentication

**trello-scripts** utilizes Trello's REST API in the various scripts contained in the sub-directories of this project. In order to utilize the REST API, you will need to do the following:

1. Create a file names trelloAuthSettings.json_ in this directory, then add the following to this file:
    ```
    {
        "apiKey": "${apiKeyValue}",
        "token": "${token}"
    }
    ```

    * Where:
        * _${apiKey}_ is your Trello Developer API Key retrieved from the following page:
            https://trello.com/app-key
        * _${token}_ is your token retrieved from the "generate a Token" link in the page above (where Developer API Key is retrieved)
    * **DO NOT UNDER ANY CIRCUMSTANCE** commit your API Key and Token to GitHub. trelloAuthSettings.json has been added to the .gitignore file to prevent this.


## Setting Up Sub-Projects

In order to utilize one of the sub-projects, please go to the following link:

- [time-scraper](time-scraper)