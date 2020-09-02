# Contact Form Instructions

## 1. Route

* This is not a protected route, and can be filled by anybody.
* The route(POST) is {{URL}}**/contact/submit**.
* The following things are expected in the body of the request:
    ```json
        {
            "name":" Ashutosh Krishna    ",
            "email":"ashutosh.devil7@gmail.com",
            "contact":"",
            "subject":"Hello World",
            "body": "What is up buddy?"
        }
    ```
* The above fields are first validated against the [validations](#validations).
* If there is any error, error with status code 422 and errorDetails is passed to the frontend.
* If there is no error, we try to save the details in database.
    * If there is any error while saving, error with status code 500 and errorDetails is passed to the frontend.
    * If there is no error, we check if the user has filled contact number(this field is optional). We will send the user a mail with his filled details.
        * If there is any error while sending email, we will respond with error with status code 451 and errorDetails.
        * If there is no error, we will respond with status code 200 and responseData.


### Validations

* Name must **not** be **empty** and should be a **string**.
* Email must **not** be **empty** and should be a **valid** email.
* Contact Number is **optional** and if filled, must be of **length 10**.
* Subject must **not** be **empty** and should be within the range **6 to 60** characters.
* Body must **not** be **empty** and should be within the range **5 to 250** characters.