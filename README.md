<img src="cricket.png" width="128">

# DrDocu (TypeScript)

[![GitHub license](https://img.shields.io/github/license/IsNevis/DrDocu?style=for-the-badge)](https://github.com/IsNevis/DrDocu/blob/main/LICENSE)
![GitHub top language](https://img.shields.io/github/languages/top/IsNevis/DrDocu?style=for-the-badge)
![GitHub package.json version](https://img.shields.io/github/package-json/v/IsNevis/DrDocu?style=for-the-badge)

A discord game bot made for the topic during 4th Documatic Hackathon!
## Features

### HandCricket (IN-COMPLETE)
- Commands
  - /help
  - /ping
  - /play
  - /gamerules

- wrote this last so i dont know have energy for this...
## Installation

Clone the project
```bash
git clone https://github.com/IsNevis/DrDocu
```

Go to the project directory
```bash
cd ./DrDocu
```

Install dependencies
```bash
npm install
```

Now Go inside the **src** directory and make a copy of [config-example.ts](src/config-example.ts) and rename the copy to **config.ts** and enter the necessary details in there!

After that start the bot
```bash
npm run start
```


## Acknowledgements

 - [Flaticon](https://www.flaticon.com/free-icons/cricket) - Cricket icons created by Freepik - Flaticon

 ---
# Hackathon Info

This section is only realted to the Hackathon! It servers no other purpose than that!
## Bot Issues

Due to this being a week long hackathon which has led me to make some erros which may be considered an features and not definitely bugs. Here are some of the known ones:

 - I have not really played HandCricket a lot in school so there are some changes which shoudnt be there
 - (Only in Second Phase) Bot can Bat or Ball first and get the points for it without giving player a chance to combat it. It does not happen in first phase as there is a seperate if condition for the first match embed to get the players input to update the score in second match embed in first phase.
 - (Only while viewing through Smartphone) The embeds most of the times start after a tab or some spaces while viewing it in Smartphone.
 - Inconsistent Grammar and Word naming
 - Spamming Console with 'interaction has already been acknowledged'
 - \*\*...\*\* status in different device shows differently!
## Incomplete Features

Some of the features could not be completed in time. So, some are Incomplete and some were removed, Here is the list:

### Incomplete (works somewhat)
 - Help Command: Wanted to have a category based one which added commands from folder
 - Gamerules Command: Does not show all rules
 - Info Button: It was origanly supposed to show a custom made info message

### Removed
 - Player vs Player Guild Matches
 - Player vs Player Global Matches
 - Foerfit Command
 - Leaderboards Command
 - Stats Command
