# Authorisation and Authentication Instructions

## 1. Sign Up

* From the frontend, request will be passed from the body as : 
```json
{
    "firstName" : "Ashutosh",
    "lastName" : "Krishna",
    "email" : "sekado1151@brosj.net",
    "password" : "Asdfghjkl1@",
    "confirmPassword" : "Asdfghjkl1@",
    "dob" : "2000-05-20",
    "gender" : "Male"
}
```

* All the fields will be validated as per the [validations](#validation).
* If the user already exists, error with status code of 400 will be sent to frontend with a message.
* The route for the signup will be {{URL}}/signup
* Backend will send a verification email with an activation link(generated on the backend) to the user's email.

## 2. Account Activation

* The route for activation will be {{URL}}/activation.
* Once the user clicks on the email, the account will be activated and ready to use.
* If there is any error on the backend part, or the verification link expires(15 minutes), an error with status code of 401 will be sent to the frontend.

## 3. Log In

* From the frontend, request will be passed from the body as :

```json
{
    "email" : "lednor@mailpoof.com",
    "password" : "Asdfghjkl1@"
}
```
* The email and password will be validated against the [validations](#validation).
* Once validated successfully, the email is checked if it exists or not.
    * If it doesn't exist, an error with status code of 400 will be sent to frontend.
    * If it exists, the password is compared against the hashed password in the database.
        * If it doesn't match, an error with status code of 400 will be sent to frontend.
        * If it matches, the user is signed in and a token(expiring in 7 days) is generated.

## 4. Forgot Password

* From the frontend, request will be passed from the body as :

```json
{
    "email" : "sekado1151@brosj.net"
}
```
* The route will be {{URL}}/forgotpassword
* The email is matched in the database. If there's no user, an error with status code of 400 will be sent to frontend.
* If user is found, a password reset link(expires in 10 min) is sent to the email of the user. 
* Also, the resetPasswordLink field in the database is updated with the token generated.

## 5. Reset Password

* The route is {{URL}}/resetpassword
* Once the user clicks on the email, if it's expired or there is any error, an error with status code of 400 will be sent to frontend.
* If there is no error, the token is matched with the resetPasswordLink field in the user's database.
* If it matches, the following parameter is received from the frontend:
```json
{
    "newPassword" : "kuchhbhi1_"
}
```
* This password in the database is now updated with the newPassword(hashed) and resetPasswordLink is again made empty.
* If there's any error in updating the password, an error with status code of 400 will be sent to frontend.

## 6. Protected Routes

* All the form routes(GET and POST) have been made protected with a middleware.
* When the user logs in, the generated token is passed in the header by the frontend. The backend verifies the token with the one stored in the database.
    * If the user is verified, he/she can fill any form.
    * If the user is not verified, an error of status code 401 is passed to the frontend with a message of Unauthorised User. The frontend can render a page asking the user to login or signup.


## Validations (using express-validator)

* firstName is **required**.
* email is **required**.
* password is **required** and it should contain:
    * atleast one lowercase letter
    * atleast one uppercase letter
    * atleast one digit
    * atleast one special character
* confirmPassword is **required** and should **match** with password
* dob should be a **valid** date
* gender should be either **Male** or **Female**
