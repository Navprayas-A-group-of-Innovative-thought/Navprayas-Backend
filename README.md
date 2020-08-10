<img src="http://navprayas.in/static/img/pp2.png">
<h1>Navprayas-A Group of Innovative Thoughts ( Main Website Backend )
</h1>This will be our official main website.

## Tech Stack

* *Backend*
    * [Node](https://nodejs.org/en/)
    * [Express](https://expressjs.com/)
    * [Mongoose](https://mongoosejs.com/)
    * [Passport](http://www.passportjs.org/)

<h1>How to run</h1>

<b>Run your code for development</b>

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
<br>
<h1>Basic Commands</h1>

* Clone a repo

```
git clone <repo link>
```

* Create a new branch

```
git branch <branch name>
```
* Create a new branch and switch to that branch
```
git checkout -b <branch name>
```

* Update local master from remote master(ensuring currently in master branch)

```
git pull
```

* Check remote
`git remote -v`

*Check all branches

```
git branch -a
```
*Check remote branches

```
git branch -r
```
* Check local branches

```
git branch
```
* Push you files

```
git push origin <branch-name>
``` 



I think these commands are enough but still you forgot some commands you can take help from [here](https://github.com/kmrakash/practice/blob/master/GithubCommands.md)
<br>
<br>
<h1>Contribution Guide</h1>

* Clone Navprayas Backend Repo

```
git clone https://github.com/Navprayas-A-group-of-Innovative-thought/Backend.git
```

* <span class="highlight" style="background-color:inherit"><span class="colour" style="color:var(--vscode-markdown-wysList)">You will see a backend folder</span></span>
* `cd Backend`
* Install all dependencies
* `npm install`
* To check your current branch - `git branch`
* Now you have been assigned issue#1. 
* Update your master branch from origin master
  
   **Repeat Point : commands to be reused**
* `git checkout master` to switch to master branch
* `git pull` to get changes from remote master branch to your local master branch
* Now create a local branch named issue#1 for your work.
* `git checkout -b issue#1`
* Now you are in issue#1 branch and now do your work.Then add your changes.
* `git add .`
* Then commit your changes.
* `git commit -m "your message"`
* Your commit should answer what this commit will do. Answer should be This commit will "your message".
* Now push your branch work to Navprayas backend repo.
* `git push origin issue#1`
*  Now it is time to push your work to navprayas backend but note you have to push changes to devlopment branch, process is also known as creating a pull request.
* Open you github and select branch issue#1
* Now create a pull request to development branch
* Then Admin will merge your request to master accordingly.
* For another issue, first go to **Repeat point**.


<h3>Instructions for Files</h3>

* Write schemas in model and name like user.model.js
* routes should be in routes folder and name like user.route.js
* Do not delete sample.route.js ans sample.model.js
* Learn to use .env and keep only secret info there
* Keep non secret info in config.js file
* Comments should in between the codes
* write there how to use your API in HOWTO.md

<br>
Happy Coding !!!
