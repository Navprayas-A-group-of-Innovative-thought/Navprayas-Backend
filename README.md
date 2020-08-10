<img src="http://navprayas.in/static/img/pp2.png">
<h1>Navprayas - Main Website (Backend)
</h1>This will be our official main website.

## Tech Stack

* *Backend*
    * [Node](https://nodejs.org/en/)
    * [Express](https://expressjs.com/)
    * [Mongoose](https://mongoosejs.com/)
    * [Passport](http://www.passportjs.org/)

## How to run
<br>
* **Run your code for development**

```
npm start
```

* **Building your code**

```
npm run build
```

* **Run production code**

```
npm run production
```

* **Clean dist folder**

```
npm run clean
```

## Contribution Guide (Follow example in bottom for the best understanding)

* Fork the repo
* Clone the forked repo (From your profile)

> Use **npm** to install the dependency

* Since task will be assign in issue . So It is suggested to create a branch of that issue number and put all codes for the fulfillment of that task in that branch

> For example i am assigned to create a sign in page in issue#1

* First create a branch and checkout to issue branch
    * `git checkout -b issue#1`
    * Added Sign in API and update this to github by following commands
    * `git add .`
    * `git commit -m "Add Sign in API"`
    Note:- Always add relevant commit message that define your work and should answer what this commit will do.
    Answer should be this commit will "your commit message"
    * `git push -u origin issue#1`
* Now create a Pull Request to dev branch (It will pop on github site)
    * Note: Don't create PR in master branch . May be it create conflicts

> Note: After merging your code into master branch you can delete your branch related to that issue and before working on next issue you must fetch all the code from original repo i.e (Upstream remote) command has been given below

##### Basic commands

* Cloning Command

```
git clone <repo link>
```

* For creating new branch

```
git checkout -b <branch name>
```

* Keeping main repo to upto date from your repo

```
git remote add upstream https://github.com/Navprayas-A-group-of-Innovative-thought/Backend.git
```

* First add a remote of this repo to your local named upstream
* Once added you can pull all the commits from main repo using below commands
To get all latest copy from upstream i.e the repo you forked

```
git fetch upstream master
```

To merge into your local master branch

```
git merge upstream/master
```

* Note: Make sure currently you are in master branch of your local repo
* To check remote
`git remote -v`

> Generally origin is remote name associated to repo from your profile
> and upstream is remote name associated to main repo

I think these commands are enough but still you forgot some commands you can take help from [here](https://github.com/kmrakash/practice/blob/master/GithubCommands.md)
<br>
### Example

* Open your github profile
* Fork Backend repo
* come to your profile and you will see you have a copy of that repo i.e Backend in your profile
* Copy clone url and open terminal
* Url will be <span class="colour" style="color:rgb(212, 212, 212)"></span>

```
https://github.com/<your-profile>/Backend.git
```

* Paste `git clone <url>`
* You will see a backend folder
* `cd Backend`
* To check your current branch `git branch`
* Do not write any changes in master.
* Now your are assigned to issue#1. So to create local branch for it from your local master branch on your local computer. First be in master branch.
* \<repeat from here for issue 2 or later otherwise ignore>
* open terminal and ensure you are in master branch and paste `git checkout -b issue#1`
* Now work on your issue
* Now check status of your files changed
* `git status`
* To add those changes in your branch `git add .`
* Now commit your changes `git commit -m "add signin API or your message"`
* Now it is time to push your changes to your remote branch not in upstream(Navprayas Backend)
* `git push origin issue#1`
* Now it is time to push your work to navprayas backend but note you have to push changes to devlopment branch, process is also known as creating a pull request.
* Open you github profile and select branch issue#1
* Now create a pull request to Navprayas Backend development branch
* Then Admin will merge your request to master accordingly.
* For another issue, first go to master branch.
* `git checkout master`
* Get changes from Navprayas main repo i.e upstream. So to update you will have to fetch code from navprayas master branch.
* `git fetch upstream master`
* Now repeat steps indicated above.


##### Instructions for Files

* Write schemas in model and name like user.model.js
* routes should be in routes folder and name like user.route.js
* Do not delete sample.route.js ans sample.model.js
* Learn to use .env and keep only secret info there
* Keep non secret info in Backend/config.js file
* Comments should in between the codes
* write there how to use your API in HOWTO.md

<br>
Happy Coding !!!
