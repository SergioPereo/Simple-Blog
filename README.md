# Simple Blog

## Table of contents

* [General Information](#general-information)
* [Technologies](#technologies)
* [Setup](#setup)
* [Methods](#methods)

---

## General Information
Javascript Blog API Code (Just a simple thing for an academic concept)

---

## Technologies
Project is created with:
* Body-Parser: 1.18.3
* Cors: 2.8.5
* Express: 4.16.4
* Mongoose 5.3.13

---

## Setup
Clone this repository (you can use the next sample line if you have git installed in your pc)
* `git clone https://github.com/SergioPereo/Simple-Blog.git`

Use the following command line to start to run the server (In the project directory):
* `node index.js`

The server will be listening at an ENV PORT or in the 3000 port as default

---

## Methods and Mongoose Schemas

### Publication Schema
* Publication {ObjectId}
* Author: String
* Date: Date
* Message: String
* Comments: [Object{author: String, commentMessage: String, commentDate: Date}]
* Themes: [{ObjectId}]


### Type Schema
* Type: {ObjectId}
* Title: String
* Publications Related: [{ObjectId]




