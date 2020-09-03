# FAQ INSTRUCTIONS

### 1. FAQ page
* The route(**GET**) of FAQ page is {{URL}}**/faq**.
* This route can be accessed by **ANYONE**.
* Thee backend will search all the faq stored in the database
    * if found, the followiing details an faq will be passed to the frontend : 
    ```json
    {
        "question" : "Who can access the faq page?",
        "answer" : "anyone"
    }
    ```
### 2. ADD FAQ (only admin access)
* The route(**POST**) of ADD FAQ is {{URL}}**/faq/add**.
* This route is protected and only the user **LOGGED IN as ADMIN** i.e. (**isAdmin : true**) can acces the route to **ADD an FAQ**.
    * so you must be Signed up and Logged in as an Admin.
    * for signup and login, refer to [AuthInstructions.md](https://github.com/Navprayas-A-group-of-Innovative-thought/Navprayas-Backend/blob/master/authInstructions.md)
* FAQ Schema : 
```json
{
        "question" : "Who can access the faq page?",
        "answer" : "anyone"
}
```

### 3. UPDATE FAQ (only admin access)
* The route(**PUT**) of UPDATE FAQ is {{URL}}**/faq/{id_of_faq_obect}/update**.
* This route is protected and only the user **LOGGED IN as ADMIN** i.e. (**isAdmin : true**) can acces the route to **Update an FAQ**.
    * so you must be Signed up and Logged in as an Admin.
    * for signup and login, refer to [AuthInstructions.md](https://github.com/Navprayas-A-group-of-Innovative-thought/Navprayas-Backend/blob/master/authInstructions.md)
* The route works if the **_id**(extracted from the URL i.e. req.params) of an faq object exist in the database.
* Update FAQ Schema can be :
    * If you want to update the "question" only :
    ```json
    {
        "question" : "Your updated ques here"
    }
    ```
    * If you want to update the "answer" only :
    ```json
    {
        "answer" : "Your updated ans here"
    }
    ```
    * If you want to update both "question" and "answer" :
    ```json
    {
        "question" : "Your updated ques here",
        "answer" : "Your updated ans here"
    }
    ```
### 4. DELETE FAQ
* The route(**DELETE**) of DELETE FAQ is {{URL}}**/faq/{id_of_faq_obect}/delete**.
* This route is protected and only the user **LOGGED IN as ADMIN** i.e. (**isAdmin : true**) can acces the route to **Delete an FAQ**.
    * so you must be Signed up and Logged in as an Admin.
    * for signup and login, refer to [AuthInstructions.md](https://github.com/Navprayas-A-group-of-Innovative-thought/Navprayas-Backend/blob/master/authInstructions.md)
* The route works if the **_id**(extracted from the URL i.e. req.params) of an faq object exist in the database.
    * If exists, that FAQ will get deleted from the database.

**Note :** /src/helper/authAdmin.js is a middleware to check if a user is an admin or not.