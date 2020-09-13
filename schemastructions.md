# Form Schema and validation INSTRUCTIONS

#### 1. MTSE FORM SCHEMA
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
* The route for the MTSE Form is http://localhost:5000/mtse

#### 2. PUZZLE RACE FORM SCHEMA
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
    "orderId": "PR1234",
    "paymentStatus": "PENDING",
    "formSubmitted": "false",
    "formVerified": "false",
    "registrationDate": "2020/08/15",
    "eventId": "mtse",
    "category": "junior",
    "admitCardNumber": "12",
    "year": "2020"
}
```
* These Fields are validated. [Click me](#validation) to go to Validation section.
* The route for the Puzzle Race Form is http://localhost:5000/puzzlerace

#### 3. FREE HAND SKETCHING FORM SCHEMA
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
    "eventId": "mtse",
    "category": "junior",
    "admitCardNumber": "12",
    "year": "2020"
}
```
* These Fields are validated. [Click me](#validation) to go to Validation section.
* The route for the Free Hand Sketching Form is http://localhost:5000/fhs

#### 4. CHESS FORM SCHEMA
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
* The route for the Chess Form is http://localhost:5000/chess

#### 5. RANGOTSAV FORM SCHEMA
* Body request will be passed as :
```json
{
    "user":[ {
        "firstName": "hriik",
        "lastName": "kumar",
        "dob": "2002/03/21",
        "gender": "male",
        "email": "a@gmail.com",
        "contact": {
            "primary": "9204534523",
            "other": "7026374627"
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
* These Fields are validated. [Click me](#validation) to go to Validation section.
* The route for the Rangotsav Form is http://localhost:5000/rangotsav

#### 6. CAREER COUNSELLING FORM SCHEMA
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
    "registrationDate": "2020/08/15",
    "formSubmitted": "false",
    "formVerified": "false",
    "eventId": "mtse",
    "year": "2020"
}
```
* These Fields are validated. [Click me](#validation) to go to Validation section.
* The route for the Career Counselling Form is http://localhost:5000/career

### Validation
* used **express-validator** package
* Every field of the form is required to be filled, except 
    * registrationDate
    * transactionId
    * transactionDate
    * orderId
    * paymentStatus
    * admitCardNumber
* Value of the fields is accepted in the following format :
    * **firstName**, **lastName** : hritik (only a-zA-Z)
    * **fatherName**, **motherName** : Meghnath prasad (only a-zA-Z and space in between)
    * **dates** : 2002/03/21 (YYYY/MM/DD)
    * **email** : hritik.kmr.111@gmail.com
    * **mobile no.** : +919204526767 or 09204253423 or 9204256251 
    * **pincode** : 823003 (valid 6 digit postal code)
    * **orderId** : string (eg. mtse12345)
    * **paymentStatus** : PENDING (by default)
    * **transactionId** : string

**GO TO LINKS**
1. [MTSE](#1-mtse-form-schema) 
2. [Puzzle Race](#2-puzzle-race-form-schema)
3. [Free Hand Sketching](#3-free-hand-sketching-form-schema)
4. [Chess](#4-chess-form-schema)
5. [Rangotsav](#5-rangotsav-form-schema)
6. [Career Counselling](#6-career-counselling-form-schema)
