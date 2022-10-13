# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The project contains both a front-end as well as an implemented back-end with mongodb as the database.

First the project needs to be installed. Run `npm install` in the root directory of the project to install the project's front-end. The back-end is contained within the server file, which has its own dependencies and package.json file. Once inside the server file, run `npm install` to install the project's back-end.

## To run the front-end

In the root project directory, run:

### `npm start`

This script will start up the React development server, which will automatically open within a browser on [http://localhost:3000]. The page will reload upon detecting changes in the code.

## To run the back-end

In the "server" directory, run:

### `npm run server`

This is a custom script, which works with nodemon to run the server. The same script is also used to directly run the database. The server starts up on [http://localhost:4000]. Due to the script implementing nodemon, the server reloads automatically upon detecting changes in the code.

## Once both front-end and back-end have been installed and initialized

Once the project is all set up it will be completely ready for use. The first thing that is recommended would be to create a new user, which can be logged into.

NOTE: Due to security concerns, the default user creation does not allow a user to register themselves as anything other than a "Trainee", which is the default role with the least privileges aside from the un-logged-in users ("Anonymous users"). To create an Administrator, when none such exists, an edit needs to be made to the database record of the user, in particular the "role". The role of "Administrator" is an enum with the value of "3". Once an Administrator exists, they are able to freely manipulate other user accounts as long as the Administrator is logged in.

Logged users, despite their role, are able to edit or delete their accounts, as well as their exercises. Every single type of user, even the anonymous ones ("the ones that are not logged in"), are able to view the full list of users, as well as all of their respective exercises. Users with the role of "Instructor" are able to view, create and update not only their exercises, but also the exercises of other users on the platform.

Link to the github repository of the project: [https://github.com/Martiyn/training-buddy-v2]
