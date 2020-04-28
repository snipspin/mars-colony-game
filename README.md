# Mars Colony (Martian Terraforming)

## [Play it here](https://mars-colony-game.herokuapp.com/)

## Idea

* For this project we want to create a science fiction themed clicker game where players can develope a Martian colony.

## Technologies

* Back End Language: [GO](https://golang.org/)
    * [Gin - HTTP web framework](https://github.com/gin-gonic/gin)
    * [Gorm - ORM library for Golang](https://gorm.io/)
* Front End Framework: React.js
* Styling Tools: Material-UI and CSS

## User Stories

* As a user I want to be able to play the game without having to create an account.
* As a user[with an account] I want to be able to save my game state.
* As a user I want to collect resources for my colony:
* As a user I want to create assests to harvest the following resources:
        1. Water (Ice Mining)
        2. Food (Farming Biospheres)
        3. People (Housing units)
* As a user I want to be able to level up my resource collection assests once an assest has harvested a certain threshold of resources.
* As a user[with an account] I want to be able to continue to collect resources when I leave the page.  [STRETCH]
* As a user I want to be able to increase the overall size of my colony (again once a certain threshold of resources is reached).

## MVP

* Working resource collection system with manual haversting (users must click a button to harvert resources)
* Users[with an account] can save the state of the game, leave the site, and have their saved state loaded when they return
* Ability to upgrade resource collection assests up by at least one level
* Ability to increase the overall size of the colony (unlock new cells to build new resource collection assests)
*  Create a relationship between resources:
*  Users must have a certain threshold of water to build food collection assets
*  Users must have a certain threshold of food to build colonist housing assests
*  Colonists drain water and food resources inorder to surive

## Stretch Goals

* Save the time when a user leaves the site and the time when they return and use this data to calculate updated resource values to represent the amount of resources they would have gain if they kept the game open.
* Have maximum storage values associated with certain recource collection assests [bound to the level of said asset]
* Random events (sand storms, rogue colonists, diseases, etc) that set the user back
* Decrease resource totals
* Decrease level of certain buildings
* An Alien invasion (or Martian revolution from Earth) that introduces a new mechanic such as defense mechanism
* Defense mechanism will be in play to protect users resource collection assests from invaders

## Wire frames
![](https://i.imgur.com/CYiglNP.jpg)


## Impressions

![](https://i.imgur.com/JYlGVA7.jpg)
> You start with just 2 buildings

![](https://i.imgur.com/MHJDVQ4.png)
> There's no account needed to play however if you you sign up, you can save your current game state

![](https://i.imgur.com/pwKHYSa.png)
> To sign in you can either use your email address or your username together with your password

![](https://i.imgur.com/LjPFisL.jpg)
> After signing in, your game will automatically be loaded

![](https://i.imgur.com/FX0BwON.jpg)
> And you can reinvest your resources to grow your martian colony

![](https://i.imgur.com/Vazq9ee.jpg)
>Maybe even with the help of some managers

## Sources

Background image: 
https://wallpapersite.com/space/mars-astronaut-alone-sci-fi-4k-14678.html

https://levelup.gitconnected.com/crud-restful-api-with-go-gorm-jwt-postgres-mysql-and-testing-460a85ab7121

https://getflywheel.com/layout/css-breakpoints-responsive-design-how-to/

https://stackoverflow.com/questions/39195687/setting-a-backgroundimage-with-react-inline-styles

https://www.golangprograms.com/nested-struct-type-in-go-programming-language.html

https://flaviocopes.com/react-hook-usecallback/

https://material-ui.com/

https://coderwall.com/p/ewxn9g/storing-and-retrieving-objects-with-localstorage-html5

https://medium.com/@cgrant/developing-a-simple-crud-api-with-go-gin-and-gorm-df87d98e6ed1

https://dev.to/stevensunflash/real-world-app-with-golang-gin-and-react-hooks-44ph

https://github.com/gin-gonic/examples

https://www.freecodecamp.org/news/how-to-build-a-web-app-with-go-gin-and-react-cffdc473576/

https://blog.logrocket.com/how-to-build-a-rest-api-with-golang-using-gin-and-gorm/

https://dev.to/dinhhuyams/introduction-to-react-memo-usememo-and-usecallback-5ei3
