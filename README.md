# Job Compare - Server
Server-side application for Job Compare.

## TL;DR
* Use UNIX-based terminals
* Learn Node.js, Express, and ES6 syntax
* To install - `npm install`
* To start - `npm start`
* To test - `npm test`
* To check coding styles - `npm run lint`
* To build api - `npm run apidoc`
* Read [Project File Structure](https://github.com/JobCompare/jc-server/wiki/Project-File-Structure) wiki page

## Setup
1. Make sure you have access to UNIX/POSIX commands (i.e. Windows OS may need [cygwin](https://www.cygwin.com/) or a VM)
2. Download and/or install [Node.js](https://nodejs.org/en/) (v7.8.0). If you have previously installed Node.js, you may use [nvm](https://github.com/creationix/nvm) to change your node version locally.
3. Download and/or install [Mongodb](https://www.mongodb.com/download-center)
4. Clone this repo: `git clone https://github.com/JobCompare/jc-server.git`
5. Install dependencies: `npm install`
6. To start this application, `npm start`. By default, it should use `http://localhost:3000` for local development.

## Prerequisites
JobCompare attempts to follow modern practices of web (as of late 2016).
In order to execute these practices properly, clear understanding of ES6 and Node.js is required.
### ES6 and Coding Style
Prior to development, it is highly recommended that you have strong knowledge in ECMAScript6 (or ES6).
This project will use [Airbnb's Javascipt Style Guide](https://github.com/airbnb/javascript) as a base.
All client-side code under ``app`` directory must follow this style guideline.
Please use `eslint` script to confirm that your code is using correct syntax.
```
./node_modules/.bin/eslint <filename>
```
### Package Management
JobCompare uses [Node.js](https://nodejs.org/en/) (v7.8.0) as a main package manager.
Understanding Node.js can help significantly during development.
Feel free to use `nvm` to manage your Node.js version locally.
```
nvm use
```

## Tech Stack
* **Package Management:** [Node.js](https://nodejs.org/en/)
* **Server:** [Express.js](https://expressjs.com/)
* **Database:** [MongoDB](https://www.mongodb.com/)
* **Test:** [Mocha](https://mochajs.org/)

## Other Tools
* [Lodash](https://lodash.com/) - collection of Javascript functions and utilities
* [Apidoc](http://apidocjs.com/) - generates apidoc
* [Camo](https://github.com/scottwrobinson/camo) - MongoDB ODM
* [Immutable](https://facebook.github.io/immutable-js/) - supplemental data structures

## Git
JobCompare application will have some specific guidelines for using git.
### Branches
* Any feature implementation must be its own branch
* Any pull request should be sent to "development" branch (not to "master")
* Delete any branch that will not be used in future
### Pull
* Please pull with rebase after your commit: `git pull --rebase origin development`
* If any merge conflict occurs, please fix them locally before sending a pull request
### Push
* Make sure your commits are squashed prior to push: http://gitready.com/advanced/2009/02/10/squashing-commits-with-rebase.html
* Push to your feature branch
* DO NOT force push
### Summary of Git
* After commit your change: `git pull --rebase origin <branch_name>`
* `git rebase -i <commit_before_your_target_of_squash>`
* Handle merge conflicts, push to feature branch.
### Recommended Git Tools
* [SourceTree](https://www.sourcetreeapp.com/) or [GitX](http://gitx.frim.nl/)
