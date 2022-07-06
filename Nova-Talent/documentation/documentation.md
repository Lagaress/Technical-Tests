# Nova Nomination API 

Nova Nomination API is a REST API coded in vanilla NodeJS (no express, no NetJS...). Using it you can interact with a SQL database to nominate potential Nova candidates or see the list of non-rejected nominations. 

You can use the Nova Nomination API in dev mode too, which will cause the auomatic restart of the server if any change in the code.

All errors are saved in logs inside /documentation/logs/.

## **Table of Contents**
- [**User Mode**](#user-mode)
  - [**Nominate**](#nominate)
  - [**Nomination-List**](#nomination-list)
  - [**API-Instructions**](#api-instructions)
- [**Dev Mode**](#dev-mode)
  - [**Configuration**](#configuration)
    - [**Server**](#server)
    - [**Database**](#database)
    - [**Mailing**](#mailing)

<br>

## **User Mode** 

The API starts using the command

`npm start`

Once the server is running you will be able to access the following endpoints:
* Nominate.
* Nomination-list.

Or API-Instructions by default. 

<br />

### **Nominate**

The endpoint is: 
`[POST] /nominate/{userWhoNominate}/{userToNominate}/{explanation}/{involvement}/{overall}/`

This endpoint is to nominate a new user to Nova. If the nominated user is automatically rejected, an email is sent to userWhoNominate and userToNominate. It only works with POST method.

Parameters: 
* **userWhoNominate**. Email of the person that is nominating (your current email). Obligatory parameter (string). 
* **userToNominate**. Email of the person that will be nominated. Obligatory parameter (string). 
* **explanation**. Brief explanation of the of the reasons for the nomination. Obligatory parameter (string). 
* **involvement**. Candidate's involvement in others comunities. Obligatory parameter (int between 1 - 10). 
* **overall**. Overall talent of the nominated person. Obligatory parameter (int between 1 - 10). 

Sample endpoint with parameters:
> localhost:8000/nominate/userwhonominate@gmail.com/usertonominate@gmail.com/This is a explanation to nominate/5/8

The endpoint will add the new nomination to the database. The response will be a message of success or a message notifying that this is already in the database.

<br />

### **Nomination-List**

The endpoint is:
`[GET] /nomination-list/{user}`

This endpoint is to get a list (JSON) of non-rejected nominations. This only can be done by an admin. It only works with GET method.

Parameters: 
* **user**. Type of the user who wants to obtain nomination list. For a success response, it has to be an admin user. Obligatory parameter (string). 

Sample endpoint with parameters:
> localhost:8000/nomination-list/admin/

The endpoint returns a list of non-rejected nominations in JSON format. The JSON contains these elements:



<br />

### **API-Instructions**
In case you try another endpoint than Nominate or Nomination-list the API-Instructions will get as response.

<br />
<br >

## **Dev Mode**
You can run the API in developer mode if you want make any changes to the API. The only difference form User Mode is that, in dev mode, the server will restart automatically when changes are made to the code. 

To start dev mode the command is: 

`npm run dev`

As developer you can modify the different services that API uses.

<br>

### **Configuration**
The API contains different *config.json* files to save and outsource the configuration of the different services.

<br>

#### **Server**
You can configure the port on which the server is opened. By default it is 8000.

The route of the config file for the server is:

`/Nova-Talent/server/config.json` 

An example of this file could be seen below
```
{
    "port": 8000
}
```
<br>

#### **Database**
You can configure the host, user, password, and the port, and the name of database that you will be using. 

By default the values of this fields are:
* host: localhost. 
* user: localhost. 
* password: root.
* port: 3306.

The route of the config file for the database is:

`/Nova-Talent/data/database/config.json` 

An example of this file could be seen below
```
{
    "host": "localhost",
    "user": "localhost",
    "password": "root",
    "port": 3306
}
```
<br>

#### **Mailing**
You can configure the service that you will see for mailing and the content of the mailing you you will send. 

In the config file you can configure the service for mailing, the user and the pass of the account that will send the message. 

*If you are using gmail as service, the pass that you have to use is [app password gmail](https://support.google.com/accounts/answer/185833?hl=es).*

The values of the config file are:
* **service**: gmail. 
* **auth.user**: emaildepruebaapi@gmail.com. 
* **auth.pass**: ujkzrzmxyqjjivlc.

The route of the config file for the mailing service is:

`/Nova-Talent/mailing/config.json` 

An example of the config file could be seen below
```
{
    "service": "gmail",
    "auth":
    {
        "user": "emaildepruebaapi@gmail.com",
        "pass": "ujkzrzmxyqjjivlc"
    }
}
```
<br>

In the mail content file you can configure the email that will send the message, the subject and the content of this message.

By default the values of the mail content are:
* **from**: emaildepruebaapi@gmail.com. 
* **subject**: Nomination rejected. 
* **text**: Sorry but your nomination was not accepted this time because your overall talent is so low! Working hard and you're going to be prepared.

The route of the file for the mail content is:

`/Nova-Talent/mailing/mailContent.json` 

An example of the mail content file could be seen below
```
{
    "from": "emaildepruebaapi@gmail.com",
    "subject": "Nomination rejected",
    "text": "Sorry but your nomination was not accepted this time because your overall talent is so low! Working hard and you're going to be prepared"
}
```