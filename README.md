# Hotelify

## Table of Contents
- Introduction
- Features
- Built With
- Database
- Installation

## Introduction

Hotelify is a hotel-review website which shows different hotels and the reviews left by users.
Upload hotels onto Hotelify and leave reviews for your favourite hotels!

![1](https://user-images.githubusercontent.com/95274873/178106211-925dbaeb-fd5a-4120-a13b-55fd7f17d7c9.png)

![2](https://user-images.githubusercontent.com/95274873/178106251-4653d46c-6d47-495a-b2c9-5ff313df9253.png)

![3](https://user-images.githubusercontent.com/95274873/178106292-13bf7611-5b78-46a9-9a75-ff9ba1519a77.png)

![4](https://user-images.githubusercontent.com/95274873/178106306-6de92df7-c409-40a9-b12e-eeb9533bc2be.png)

## Features

The application displays a clustered map which shows the distribution of hotels in the database.
A new hotel can be added, along with multiple photos of the same. 

- Users can do the following:
	- Create an account, login and logout
	- Add new hotels
	- Add reviews for existing hotels
	- Edit and/or delete own hotels/reviews
	
![7](https://user-images.githubusercontent.com/95274873/178106522-52da36b2-8c2d-48b7-aa30-2613e6b1e577.png)

  
  ![5](https://user-images.githubusercontent.com/95274873/178106266-27e9ec7d-b9c0-41a6-8f71-7b4c89b5ebf3.png)
  
  ![6](https://user-images.githubusercontent.com/95274873/178106279-0ae2ed61-9603-4b77-ab19-2e523f0196ed.png)


  
##  BUILT WITH

- Frontend: 
	- HTML
	- CSS
	- Bootstrap
- Backend:
	- Node.js
	- Mongoose
	- MongoDB
	- Express
	- Joi
	- Passport
	- MapBox API
	- Cloudinary
	
## Databases

Used MongoDB to maintain the databases.
All the models can be found in the models directory created using mongoose.

- Hotel Schema:
	- title (String)
	- price (Number)
	- images ([ImageSchema])
	- geometry  
		- type	
		- coordinates
	- description (String)

	- location (String)
	- author (referenced by id from User Schema)
	- reviews ([referenced by id from Review Schema])
	
- Review Schema: 
	- body (String)
	- rating (Number)
	- author (referenced by id from USer Schema)
	
- User Schema:
	- email (String)
			
			
## Installation

- Check the versions to see if you have Node.js and npm installed on your machine, using the following commands:
	node -v
	npm -v

- If you do not have node package manager on your system, go to the following link and follow the steps to install:
https://nodejs.org/en/download/

- You will have to make a cloudinary account to use the Cloudinary API and a MapBox account to use the MapBox API. Both of these are totally free and very easy to setup!

To run this application, you have to set your own environmental variables. For security reasons, some variables have been hidden from view and used as environmental variables with the help of dotenv package. Below are the variables that you need to set in order to run the application:

	- CLOUDINARY_CLOUD_NAME : Cloud name alloted to you on making a cloudinary account
	- CLOUDINARY_KEY : API key which will be needed to make requests
	- CLOUDINARY_SECRET : Secret alloted to you to use cloudinary API
	- MAPBOX_TOKEN : Again, a token is needed to use MapBox API 

After you've set these environmental variables in the .env file at the root of the project, you need to navigate to the "seeds" folder and run "node index.js" to fill your empty MongoDB database.

Now you can run "npm start" in the terminal and the application should work.

