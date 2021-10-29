# In-memory Orderbook 🚀🚀🚀

A simple In-memory database built with Node.js.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

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
