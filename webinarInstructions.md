# Webinar Instructions

## 1. Webinar Page

* This is a **unprotected** route and can be accessed by **anyone**.
* The route(GET) will be {{URL}}**/webinar/**
* An additional query of **id** can be passed in the URL as : {{URL}}**/webinar/?id=ObjectIdOfWebinar**
* If the query is not passed, the backend will try to respond with the entire list of webinars fetched from the database.
    * If there is no webinar in the database, an error with status code **404** and **errorDetails** will be passed to the frontend.
    * If there is atleast one webinar in the database, a response with status code **200** and **responseData** will be passed to the backend as :
        ```json
        {
            "reponseData": [
                {
                    "speakers": [
                        "S1",
                        "S2"
                    ],
                    "_id": "5f564caea1ed1e5e9ce49240",
                    "title": "Final Webinar",
                    "date": "2020-09-20T00:00:00.000Z",
                    "time": "9PM to 11PM",
                    "link": "https://www.google.com/webinar",
                    "__v": 0
                },
                {
                    "speakers": [
                        "S1",
                        "S2",
                        "S3"
                    ],
                    "_id": "5f564ee86eb0c92a04445879",
                    "title": "Final Webinar 2",
                    "date": "2020-09-20T00:00:00.000Z",
                    "time": "9PM to 11PM",
                    "link": "https://www.google.com/webinar",
                    "__v": 0
                }
            ]
        }
        ```

* If a query is passed in the URL in the way as shown above, the backend will try to respond with the specific webinar associated with that id.
    * If no webinar is found associated with that id, the backend will respond with an error code of **404** and **errorDetails**.
    * If a webinar is found, the backend will respond with a status code of **200** and message as :
        ```json
        {
            "title": "Final Webinar 2",
            "date": "2020-09-20T00:00:00.000Z",
            "time": "9PM to 11PM",
            "link": "https://www.google.com/webinar",
            "speakers": [
                "S1",
                "S2",
                "S3"
            ]
        }
        ```

## 2. Create a new Webinar

* This is a **protected** route and only **admin** can access it.
* The route(POST) will be {{URL}}**/webinar/add**.
* Following data is to be passed from the body:
    ```json
    {
        "title": "Final Webinar 2",
        "date": "2020-09-20",
        "time": "9PM to 11PM",
        "link": "https://www.google.com/webinar",
        "speakers": ["S1","S2", "S3"]
    }
    ```
* All the fields are validated against the [validations](#validations).
* If there is any error while validating, an error with status code **422** and **errorDetails** is passed to the frontend.
* If no error, the backend tries to save it in the database.
* If there is any error while saving into database, an error with status code **500** and **errorDetails** is passed to the frontend.
* If no error, the data is saved into the database successfully and response with status code **200** and **responseData** is passed to the frontend.

## 3. Update a webinar

* This is a **protected** route and only **admin** can access it.
* The route(GET/PUT) will be {{URL}}**/webinar/edit?id=ObjectIdOfWebinar**.
* The backend searches for the webinar using the webinar ID.
* The GET request will work similarly as the GET request on [Webinar Page](#1-webinar-page) with query and the previous details of the webinar is sent to the frontend.
* If there is no such webinar, an error with status code **404** and **errorDetails** is passed to the frontend.
* If a webinar is found, the following are to be passed in the body: 
    ```json
    {
        "title": "Final Webinar",
        "date": "2020-09-20T00:00:00.000Z",
        "time": "9PM to 10 PM",
        "link": "https://www.google.com/webinar",
        "speakers": [
            "S1",
            "S2",
            "S3"
        ]
    }
    ```
* The above fields are validated against [validations](#validations).
* If there is any error while validating, an error with status code **422** and **errorDetails** is passed to the frontend.
* If no error, the backend tries to save it in the database.
* If there is any error while saving into database, an error with status code **500** and **errorDetails** is passed to the frontend.
* If no error, the data is saved into the database successfully and response with status code **200** and **responseData** is passed to the frontend.

## 4.Delete a webinar

* * This is a **protected** route and only **admin** can access it.
* The route(DELETE) will be {{URL}}**/webinar/delete?id=ObjectIdOfWebinar**.
* The backend searches for the webinar using the webinar ID.
* If there is no such webinar, an error with status code **404** and **errorDetails** is passed to the frontend.
* If a webinar is found, it is deleted from the database and a response with status code **200** and **responseData** is sent to the frontend.

### Validations

* Title must **not** be **empty** and should be a **string**.
* Date must **not** be **empty** and should be a **valid date** in the format YYYY-MM-DD.
* Time must **not** be **empty** and should be a **string**.
* Link must **not** be **empty** and should be a **valid URL**.
* Speakers is an **array** which must **not** be **empty** and should contain only **strings**.