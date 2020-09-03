# Profile Instructions

## 1. Profile Page

* The route(GET) will be {{URL}}**/user/profile**.
* Only authorised requests will be accepted since the route has been protected else error will be passed with status code 401 and message Please sign in.
* Refer to [Protected Routes](https://github.com/Navprayas-A-group-of-Innovative-thought/Navprayas-Backend/blob/master/authInstructions.md#6-protected-routes) for instructions regarding authorised requests.
* From the frontend, authorisation token will be passed in the header.
* The backend will extract the user id and search for the user in the database.
    * If the user is not found, an error with status code of 404 with error message of User doesn't exist is passed to the frontend.
    * If the user is found, the following details are passed to the frontend :
    ```
    {
        firstName: firstName,
        lastName: lastName,
        email: email,
        dob: dob,
        gender: gender,
        fatherName: fatherName,
        motherName: motherName,
        contact: contact,
        class: grade,
        year: year,
        schoolOrUniv: schoolOrUniv,
        board: board,
        houseNumber: houseNumber,
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        landmark: landmark,
        district: district,
        city: city,
        pincode: pincode,
        country: country,
        facebookLink: facebookLink,
        linkedinLink: linkedinLink,
        githubLink: githubLink,
    }
    ```

## 2. Update Profile

* The route(GET/PUT) will be {{URL}}**/user/profile/edit**.
* Only authorised requests will be accepted since the route has been protected else error will be passed with status code 401 and message Please sign in.
* Refer to [Protected Routes](https://github.com/Navprayas-A-group-of-Innovative-thought/Navprayas-Backend/blob/master/authInstructions.md#6-protected-routes) for instructions regarding authorised requests.
* The GET request will work similarly as the profile page route since only the data is to be sent to the frontend to be rendered at the Edit Profile Page.
* For the POST request, from the frontend, authorisation token will be passed in the header.
* The backend will extract the user id and search for the user in the database.
    * If the user is not found, an error with status code of 404 with error message of User doesn't exist is passed to the frontend.
    * If the user is found, the following fields will be passed from the body from the frontend to the backend :
    ```json
        firstName
        lastName
        fatherName
        motherName
        contact
        class
        year
        schoolOrUniv
        board
        houseNumber
        addressLine1
        addressLine2
        landmark
        district
        city
        pincode
        country
        facebookLink
        linkedinLink
        githubLink
    ```
    * The above fields will be updated in the database. If there is any error while saving in the database, an error with status code of 500 with error details will be sent to the frontend.
    * If there is no error, responseData with status code of 200 with message will be sent to frontend.


## 3. Change Password

* The route(PUT) will be {{URL}}**/user/password/change**.
* Only authorised requests will be accepted since the route has been protected else error will be passed with status code 401 and message Please sign in.
* Refer to [Protected Routes](https://github.com/Navprayas-A-group-of-Innovative-thought/Navprayas-Backend/blob/master/authInstructions.md#6-protected-routes) for instructions regarding authorised requests. 
* From the frontend, authorisation token will be passed in the header.
* Following fields have to be passed from the frontend in the body :
```json
{
    "oldPassword" : "kuchhbhi1_",
    "newchangePassword":"changeKiye1@",
    "confirmchangePassword":"changeKiye1@"
}
```
* The incoming fields are validated against the [validators](https://github.com/Navprayas-A-group-of-Innovative-thought/Navprayas-Backend/blob/master/authInstructions.md#validations).
    * If there is an error, error with status code 422 and errorDetails will be sent to frontend.
    * If there is no error, the user is searched in the database.
        * If the user is not found, error with status code 404 and errorDetails is passed to the frontend.
        * If user is found, the oldPassword coming from the body is compared with the password saved in the database.
            * If the passwords don't match, error with status code 401 and errorDetails is sent to frontend.
            * If they match, the incoming newchangePassword and confirmchangePassword is matched against each other.
                * If they don't match, error with status code of 401 and errorDetails is passed to frontend.
                * If they match, the password in the database is updated with the incoming newchangePassword.
                    * If there is any error in updating the password, error with status code 400 and errorDetails is sent to frontend.
                    * If there is no error, responseData with status code of 200 and message is passed to the frontend.
