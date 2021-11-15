# In-memory Orderbook 🚀🚀🚀

A simple In-memory database built with Node.js.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### File tree

┣ 📂node_modules

┣ 📂api

┃ ┣ 📂assets

┃ ┃ ┗ 📜orderflow.png

┃ ┣ 📂controllers

┃ ┃ ┣ 📂**test**

┃ ┃ ┃ ┣ 📜saveOrder.controller.test.js

┃ ┃ ┃ ┣ 📜saveTradeLog.controller.test.js

┃ ┃ ┃ ┣ 📜tradeAndUpdateOrderbook.controller.test.js

┃ ┃ ┃ ┗ 📜tradeHandler.controller.test.js

┃ ┃ ┣ 📜index.js

┃ ┃ ┣ 📜saveOrder.controller.js

┃ ┃ ┣ 📜saveTradeLog.controller.js

┃ ┃ ┣ 📜tradeAndUpdateOrderbook.controller.js

┃ ┃ ┗ 📜tradeHandler.controller.js

┃ ┣ 📂middleware

┃ ┃ ┣ 📂**tests**

┃ ┃ ┃ ┣ 📜fetchOrderbook.middleware.test.js

┃ ┃ ┃ ┣ 📜fetchTradeHistory.middleware.test.js

┃ ┃ ┃ ┗ 📜limitOrder.middleware.test.js

┃ ┃ ┣ 📜fetchOrderbook.middleware.js

┃ ┃ ┣ 📜fetchTradeHistory.middleware.js.js

┃ ┃ ┣ 📜index.js

┃ ┃ ┗ 📜limitOrder.middleware.js

┃ ┗ 📂routes

┃ ┃ ┣ 📜limitorder.route.js

┃ ┃ ┣ 📜orderbook.route.js

┃ ┃ ┗ 📜tradehistory.route.js

┣ 📂database

┃ ┗ 📂models

┃ ┃ ┣ 📂**tests**

┃ ┃ ┃ ┣ 📜order.model.test.js

┃ ┃ ┃ ┗ 📜tradehistory.model.test.js

┃ ┃ ┣ 📜order.model.js

┃ ┃ ┗ 📜tradehistory.model.js

┣ 📂utils

┃ ┣ 📂global_utils

┃ ┃ ┗ 📜dbHandler.utils.js

┃ ┗ 📂test_utils

┃ ┃ ┣ 📜dummyData.js

┃ ┃ ┣ 📜interceptors.utils.js

┃ ┃ ┗ 📜validators.utils.js

┣ 📜.gitignore

┣ 📜app.js

┣ 📜package-lock.json

┣ 📜package.json

┣ 📜README.md

┗ 📜route.rest

### Prerequisites

What things you need to install the software and how to install them.

```
NPM / Yarn
Code Editor (This app was built on VSCode)
Git
```

### Setup

To get this project on your local machine, you first need to clone it using the `git clone` command.

```
git clone https://github.com/brianchiruka/In-memory_Orderbook
```

Running this on your terminal will ensure you receive the latest version with all it's changes.

Once you've cloned it, install all dependencies using:

```
npm install
```

This should retrieve all the necessary dependencies named in the [package.json](https://github.com/brianchiruka/In-memory_Orderbook/blob/master/package.json) file.

### How To Use:

Once dependencies are installed, be sure to include a `.env` file with the necessary environment variable:

```
LOCAL_MONGO_URI = <mongodb uri goes here...>
PORT = <port number goes here...>
```

When everything is in place, the application can be run locally using:

```
npm run dev
```

## Running tests 🧪

The testing framework utilized is Jest. Tests can be run by using the command:

```
npm test

OR

npm run test
```

To run tests and see the code coverage. Run using the command:

```
npm run coverage
```
