# Form Schema and validation INSTRUCTIONS

#### 1. MTSE FORM SCHEMA
* The route (**GET**) is ((URL))/**mtse/allUsers/**
    * This route will only be accessed by those who are logged in as ADMIN.
    * This route is used to get all the registered users of MTSE.
* The route (**POST**) is ((URL))/**mtse/register/**
    * This route will be accessed by those users who are logged in.
    * Body request will be passed as :
    ```json
    {
        "user": {
            "firstName": "hriik",
            "lastName": "kumar",
            "dob": "2002-03/21",
            "gender": "male",
            "email": "a@gmail.com",
            "contact": {
                "primary": "9204534523",
                "other": "7026378427"
            },
            "address": {
                "houseNumber": "BR-01-02",
                "landmark": "new delhi park",
                "addressLine1": "manpur",
                "addressLine2": "patwatoli",
                "district": "gaya",
                "city": "gaya",
                "state": "bihar",
                "country": "india",
                "pincode": "672589"
            },
            "fatherName": "me",
            "motherName": "fu",
            "education": {
                "class": "6",
                "school": "pes",
                "board": "cbse"
            }
        },
        "transactionId": "1234",
        "transactionDate": "2020/08/15",
        "orderId": "MTSE23413",
        "paymentStatus": "PENDING",
        "registrationDate": "2020/08/15",
        "formSubmitted": "false",
        "formVerified": "false",
        "eventId": "mtse",
        "questionPaperLang": "english",
        "admitCardNumber": "12",
        "year": "2020"
    }
    ```
    * These Fields are validated. [Click me](#validation) to go to Validation section.
    * After the submission of form, **formSubmitted** will be set to **true**.

#### 2. PUZZLE RACE FORM SCHEMA
* Puzzle Race is team event.
* The route (**GET**) is ((URL))/**puzzlerace/allUsers/**
    * This route will only be accessed by those who are logged in as ADMIN.
    * This route is used to get all the registered users of PUZZLE RACE.
* The route (**POST**) is ((URL))/**puzzlerace/register/**
    * This route will be accessed by those users who are logged in.
    * Body request will be passed as :
    ```json
    {
        "user": [{
            "firstName": "hritik",
            "lastName": "kumar",
            "dob": "2002-03/21",
            "gender": "male",
            "email":"yowakaw366@mojzur.com",
            "contact": {
                "primary": "9204534523",
                "other": "7026378427"
            },
            "address": {
                "houseNumber": "BR-01-02",
                "landmark": "new delhi park",
                "addressLine1": "manpur",
                "addressLine2": "patwatoli",
                "district": "gaya",
                "city": "gaya",
                "state": "bihar",
                "country": "india",
                "pincode": "672589"
            },
            "fatherName": "me",
            "motherName": "fu",
            "education": {
                "class": "6",
                "school": "pes",
                "board": "cbse"
            }
        },
        {
            "firstName": "hritik",
            "lastName": "kumar",
            "dob": "2002-03/21",
            "gender": "male",
            "email": "a@gmail.com",
            "contact": {
                "primary": "9204534523",
                "other": "7026378427"
            },
            "address": {
                "houseNumber": "BR-01-02",
                "landmark": "new delhi park",
                "addressLine1": "manpur",
                "addressLine2": "patwatoli",
                "district": "gaya",
                "city": "gaya",
                "state": "bihar",
                "country": "india",
                "pincode": "672589"
            },
            "fatherName": "me",
            "motherName": "fu",
            "education": {
                "class": "6",
                "school": "pes",
                "board": "cbse"
            }
        },
        {
            "firstName": "hritik",
            "lastName": "kumar",
            "dob": "2002-03/21",
            "gender": "male",
            "email": "asdf@intrees.org",
            "contact": {
                "primary": "9204534523",
                "other": "7026378427"
            },
            "address": {
                "houseNumber": "BR-01-02",
                "landmark": "new delhi park",
                "addressLine1": "manpur",
                "addressLine2": "patwatoli",
                "district": "gaya",
                "city": "gaya",
                "state": "bihar",
                "country": "india",
                "pincode": "672589"
            },
            "fatherName": "me",
            "motherName": "fu",
            "education": {
                "class": "6",
                "school": "pes",
                "board": "cbse"
            }
        }],
        "transactionId": "1234",
        "transactionDate": "2020/08/15",
        "orderId": "PR1234",
        "paymentStatus": "PENDING",
        "formSubmitted": "false",
        "formVerified": "false",
        "registrationDate": "2020/08/15",
        "eventId": "puzzle",
        "admitCardNumber": "12",
        "category": "junior",
        "year": "2020"
    }

    ```
    * **user** is an array having length <=3.
    * These Fields are validated. [Click me](#validation) to go to Validation section.
    * After the submission of form, **formSubmitted** will be set to **true**.

#### 3. FREE HAND SKETCHING FORM SCHEMA
* The route (**GET**) is ((URL))/**fhs/allUsers/**
    * This route will only be accessed by those who are logged in as ADMIN.
    * This route is used to get all the registered users of FREE HAND SKETCHING.
* The route (**POST**) is ((URL))/**fhs/register/**
    * This route will be accessed by those users who are logged in.
    * Body request will be passed as :
    ```json
    {
        "user": {
            "firstName": "hriik",
            "lastName": "kumar",
            "dob": "2002-03/21",
            "gender": "male",
            "email": "a@gmail.com",
            "contact": {
                "primary": "9204534523",
                "other": "7026378427"
            },
            "address": {
                "houseNumber": "BR-01-02",
                "landmark": "new delhi park",
                "addressLine1": "manpur",
                "addressLine2": "patwatoli",
                "district": "gaya",
                "city": "gaya",
                "state": "bihar",
                "country": "india",
                "pincode": "672589"
            },
            "fatherName": "me",
            "motherName": "fu"
        },
        "transactionId": "1234",
        "transactionDate": "2020/08/15",
        "orderId": "FHS1234",
        "paymentStatus": "PENDING",
        "formSubmitted": "false",
        "formVerified": "false",
        "registrationDate": "2020/08/15",
        "eventId": "fhs",
        "category": "junior",
        "admitCardNumber": "12",
        "year": "2020"
    }
    ```
    * These Fields are validated. [Click me](#validation) to go to Validation section.
    * After the submission of form, **formSubmitted** will be set to **true**.    

#### 4. CHESS FORM SCHEMA
* The route (**GET**) is ((URL))/**chess/allUsers/**
    * This route will only be accessed by those who are logged in as ADMIN.
    * This route is used to get all the registered users of CHESS.
* The route (**POST**) is ((URL))/**chess/register/**
    * This route will be accessed by those users who are logged in.
    * Body request will be passed as :
    ```json
    {
        "user": {
            "firstName": "hriik",
            "lastName": "kumar",
            "dob": "2002-03/21",
            "gender": "male",
            "email": "a@gmail.com",
            "contact": {
                "primary": "9204534523",
                "other": "7026378427"
            },
            "address": {
                "houseNumber": "BR-01-02",
                "landmark": "new delhi park",
                "addressLine1": "manpur",
                "addressLine2": "patwatoli",
                "district": "gaya",
                "city": "gaya",
                "state": "bihar",
                "country": "india",
                "pincode": "672589"
            },
            "fatherName": "me",
            "motherName": "fu"
        },
        "transactionId": "1234",
        "transactionDate": "2020/08/15",
        "orderId": "CHES1234",
        "paymentStatus": "PENDING",
        "formSubmitted": "false",
        "formVerified": "false",
        "registrationDate": "2020/08/15",
        "eventId": "mtse",
        "haveChessBoard":"true",
        "category": "junior",
        "admitCardNumber": "12",
        "year": "2020"
    }
    ```
    * These Fields are validated. [Click me](#validation) to go to Validation section.
    * After the submission of form, **formSubmitted** will be set to **true**.

#### 5. RANGOTSAV FORM SCHEMA
* Rangotsav is team event.
* The route (**GET**) is ((URL))/**rangotsav/allUsers/**
    * This route will only be accessed by those who are logged in as ADMIN.
    * This route is used to get all the registered users of RANGOTSAV.
* The route (**POST**) is ((URL))/**rangotsav/register/**
    * This route will be accessed by those users who are logged in.
    * Body request will be passed as :
    ```json
    {
        "user": [{
            "firstName": "hritik",
            "lastName": "kumar",
            "dob": "2002-03/21",
            "gender": "male",
            "email":"yowakaw366@mojzur.com",
            "contact": {
                "primary": "9204534523",
                "other": "7026378427"
            },
            "address": {
                "houseNumber": "BR-01-02",
                "landmark": "new delhi park",
                "addressLine1": "manpur",
                "addressLine2": "patwatoli",
                "district": "gaya",
                "city": "gaya",
                "state": "bihar",
                "country": "india",
                "pincode": "672589"
            },
            "fatherName": "me",
            "motherName": "fu"
        },
        {
            "firstName": "hritik",
            "lastName": "kumar",
            "dob": "2002-03/21",
            "gender": "male",
            "email": "a@gmail.com",
            "contact": {
                "primary": "9204534523",
                "other": "7026378427"
            },
            "address": {
                "houseNumber": "BR-01-02",
                "landmark": "new delhi park",
                "addressLine1": "manpur",
                "addressLine2": "patwatoli",
                "district": "gaya",
                "city": "gaya",
                "state": "bihar",
                "country": "india",
                "pincode": "672589"
            },
            "fatherName": "me",
            "motherName": "fu"
        },
        {
            "firstName": "hritik",
            "lastName": "kumar",
            "dob": "2002-03/21",
            "gender": "male",
            "email": "asdf@intrees.org",
            "contact": {
                "primary": "9204534523",
                "other": "7026378427"
            },
            "address": {
                "houseNumber": "BR-01-02",
                "landmark": "new delhi park",
                "addressLine1": "manpur",
                "addressLine2": "patwatoli",
                "district": "gaya",
                "city": "gaya",
                "state": "bihar",
                "country": "india",
                "pincode": "672589"
            },
            "fatherName": "me",
            "motherName": "fu"
        }],
        "registrationDate": "2020/08/15",
        "formSubmitted": "false",
        "formVerified": "false",
        "eventId": "mtse",
        "category": "junior",
        "admitCardNumber": "12",
        "year": "2020"
    }

    ```
    * **user** is an array having length <=3.
    * These Fields are validated. [Click me](#validation) to go to Validation section.
    * After the submission of form, **formSubmitted** will be set to **true**.

#### 6. CAREER COUNSELLING FORM SCHEMA
* The route (**GET**) is ((URL))/**career/allUsers/**
    * This route will only be accessed by those who are logged in as ADMIN.
    * This route is used to get all the registered users of CAREER COUNSELLING.
* The route (**POST**) is ((URL))/**career/register/**
    * This route will be accessed by those users who are logged in.
    * Body request will be passed as :
    ```json
    {
        "firstName": "hriik",
        "lastName": "kumar",
        "dob": "2002-03/21",
        "gender": "male",
        "email": "a@gmail.com",
        "contact": {
            "primary": "9204534523",
            "other": "7026378427"
        },
        "address": {
        "addressLine1":"Patwatoli",
        "district":"Gaya",
        "city":"Gaya",
        "state":"Bihar",
        "pincode":"823003"
    },
        "registrationDate": "2020/08/15",
        "formSubmitted": "false",
        "formVerified": "false",
        "eventId": "mtse",
        "year": "2020"
    }
    ```
    * These Fields are validated. [Click me](#validation) to go to Validation section.
    * After the submission of form, **formSubmitted** will be set to **true**.

### Validation
* used **express-validator** package
* Not required fields:
    * contact.other
    * address.houseNo
    * address.landmark
    * address.addressLine2
    * registrationDate (by default set to present date of registration)
    * transactionId
    * transactionDate
    * orderId
    * paymentStatus
    * admitCardNumber
    * year (by default set to present year)
* Except these above mentioned **not required** field, all are required.
* Value of the fields is accepted in the following format :
    * **firstName**, **lastName** : hritik (only a-zA-Z)
    * **fatherName**, **motherName** : Meghnath prasad (only a-zA-Z and space in between)
    * **dates** : 2002/03/21 (YYYY/MM/DD)
    * **email** : hritik.kmr.111@gmail.com
    * **mobile no.** : +919204526767 or 09204253423 or 9204256251 
    * **pincode** : 823003 (valid 6 digit indian postal code)
    * **orderId** : string (eg. mtse12345)
    * **paymentStatus** : PENDING (by default)
    * **transactionId** : string
 <br>
* **ERROR HANDLING** 
    * All errors in validation will be shown in an array (if any)
    example: 
    ```json
    {
    "errors": [
        {
            "value": "6",
            "msg": "10 digit mobile number",
            "param": "contact.other",
            "location": "body"
        }
    ]
    }
    ```

**GO TO LINKS**
1. [MTSE](#1-mtse-form-schema) 
2. [Puzzle Race](#2-puzzle-race-form-schema)
3. [Free Hand Sketching](#3-free-hand-sketching-form-schema)
4. [Chess](#4-chess-form-schema)
5. [Rangotsav](#5-rangotsav-form-schema)
6. [Career Counselling](#6-career-counselling-form-schema)
