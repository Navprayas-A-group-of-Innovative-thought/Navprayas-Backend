# Profile Instructions

## 1. Profile Page

* The route(GET) will be {{URL}}**/user/profile**.
* Only authorised requests will be accepted since the route has been protected else error will be passed with status code 401 and message Please sign in.
* Refer to [Protected Routes](https://github.com/Navprayas-A-group-of-Innovative-thought/Navprayas-Backend/blob/master/authInstructions.md#6-protected-routes) for instructions regarding authorised requests.
* From the frontend, authorisation token will be passed in the header.
* The backend will extract the user id and search for the user in the database.
    * If the user is not found, an error with status code of 404 with error message of User doesn't exist is passed to the frontend.
    * If the user is found, the following details are passed to the frontend :
    ```json
    {
        firstName: firstName,
        lastName: lastName,
        email: email,
        dob: dob,
        gender: gender,
        fatherName: fatherName,
        motherName: motherName,
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

* The route(GET/POST) will be {{URL}}**/user/profile/edit**.
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