# Quotekeeper

## Introduction 
This is a full-stack application, which allows for the storage of lists in a Mongo DB connected database. User authentication is done by using an express server and JSON web tokens. Responsive front-end is powered by React and React-router-dom which routes to paths depending on conditionals. This application uses CRUD server principles.

## Table of Contents
* [General Info](#general-info)
* [Features](#features)
* [Technologies](#technologies)
* [Setup](#setup)
* [Status](#status)

## General Info
Quotekeeper is an application that uses React for front-end mobile responsive UI and Express.js REST API for MongoDB database queries. Provide routes for for rendering the client side static application as well as provides the routes for the storage and the update of existing data from MongoDB database.
1. The server listens for calls made to PORT
2. Upon root request "/" the server feeds the client static file
3. The server follows CRUD requests for the quotes being stored in the database
4. Dependent on path calls. Corresponding user data will be sent from MongoDB queries, and updates.
5. User authentication is required to serve database user data
6. Once authenticated the front-end local storage will hold respective access and refresh tokens.
7. React front-end is responsible for correct routing depending on error codes and invalid token responses.
8. Upon successful authentication and valid JSON web tokens the user can modify existing lists and items from their grocery lists.

## Features
* Data persistent
* MongoDB data storage 
* Mobile responsive front-end
* User Authentication 
* Access-tokens, refresh-token handling 

## Technologies
* HTML
* CSS
* Javascript
* React
* Express
* Chai-Http v4
* Morgan v1
* Mongoose v5
* Nodemon v2
* Dotenv v8
* Body-parser v1

## Setup
Running this project requires local installation of npm: 
1. $ cd ..groceries
2. $ npm install
3. $ node app.js / nodemon app.js

## Status
Application is functional. Development still ongoing.
