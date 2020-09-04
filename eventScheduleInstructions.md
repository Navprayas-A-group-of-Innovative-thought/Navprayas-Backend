# EVENT SCHEDULE INSTRUCTIONS

### 1. EVENT SCHEDULE page
* The route(**GET**) of EVENT SCHEDULE page is {{URL}}**/eventschedule**.
* This route can be accessed by **ANYONE**.
* Thee backend will search all the EVENT SCHEDULE stored in the database
    * if found, the followiing details an EVENT SCHEDULE will be passed to the frontend : 
    ```json
    {
        "date": "YYYY/MM/DD",
        "eventName": "Puzzle Race"
    }
    ```
### 2. ADD EVENT SCHEDULE (only admin access)
* The route(**POST**) of ADD EVENT SCHEDULE is {{URL}}**/eventschedule/add**.
* This route is protected and only the user **LOGGED IN as ADMIN** i.e. (**isAdmin : true**) can acces the route to **ADD an EVENT SCHEDULE**.
    * so you must be Signed up and Logged in as an Admin.
    * for signup and login, refer to [AuthInstructions.md](https://github.com/Navprayas-A-group-of-Innovative-thought/Navprayas-Backend/blob/master/authInstructions.md)
* EVENT SCHEDULE Schema : 
```json
{
    "date": "YYYY/MM/DD",
    "eventName": "Puzzle Race"
}
```

### 3. UPDATE EVENT SCHEDULE (only admin access)
* The route(**PUT**) of UPDATE EVENT SCHEDULE is {{URL}}**/eventschedule/{id_of_eventschedule_obect}/update**.
* This route is protected and only the user **LOGGED IN as ADMIN** i.e. (**isAdmin : true**) can acces the route to **Update an EVENT SCHEDULE**.
    * so you must be Signed up and Logged in as an Admin.
    * for signup and login, refer to [AuthInstructions.md](https://github.com/Navprayas-A-group-of-Innovative-thought/Navprayas-Backend/blob/master/authInstructions.md)
* The route works if the **_id**(extracted from the URL i.e. req.params) of an EVENT SCHEDULE object exist in the database.
* Update EVENT SCHEDULE Schema can be :
    * If you want to update the "date" only :
    ```json
    {
        "date" : "YYYY/MM/DD"
    }
    ```
    * If you want to update the "eventName" only :
    ```json
    {
        "eventName" : "mtse"
    }
    ```
    * If you want to update both "date" and "eventName" :
    ```json
    {
        "date": "YYYY/MM/DD",
        "eventName": "mtse"
    }
    ```
### 4. DELETE EVENT SCHEDULE
* The route(**DELETE**) of DELETE EVENT SCHEDULE is {{URL}}**/eventschedule/{id_of_eventschedule_obect}/delete**.
* This route is protected and only the user **LOGGED IN as ADMIN** i.e. (**isAdmin : true**) can acces the route to **Delete an EVENT SCHEDULE**.
    * so you must be Signed up and Logged in as an Admin.
    * for signup and login, refer to [AuthInstructions.md](https://github.com/Navprayas-A-group-of-Innovative-thought/Navprayas-Backend/blob/master/authInstructions.md)
* The route works if the **_id**(extracted from the URL i.e. req.params) of an EVENT_SCHEDULE object exist in the database.
    * If exists, that EVENT_SCHEDULE will get deleted from the database.

**Note :** /src/helper/authAdmin.js is a middleware to check if a user is an admin or not.