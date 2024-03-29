# Social App

## Live site: https://social-app-academy.netlify.app/

<img width="488" alt="image" src="https://github.com/MariuszRozycki/social-app/assets/55709542/da6880a4-c953-4d21-a4f8-42f046a97de2">


##
This project it is a quasi Twitter app. The application was built to demonstrate knowledge of React.

It was created exclusively with functional components and shared hooks.

## Application description

### View of a non-logged in user:

- Navigation menu with links to the home page (Home), login page (Login), registration page (Signup)

### The Home page with a list of posts:

- A list of 10 posts with a Load more button underneath which, when clicked, downloads the next 10 posts
- The single post view displays the username, date added, content, avatar and number of likes

### The Login page:

- The login page contains a login form with username and password fields
  
Important! Adding a new user involves sending an object with the fields: username, email, and password (the user is NOT physically added to the database, but the API simulates the real process of adding a user. It returns an object with information that the registration was completed successfully or with an error).

For logging, use: <br>
"username": "adam",<br>
"password": "1234"


#### Login fail:

- If logging in is not successful, appropriate messages are displayed

#### Login success

- If login is successful, we are redirected to the home page

### The Sign up page:

- The Sign up page contains a registration form with username, email, password and confirmPassword fields

#### Fields must be validated according to the rules:

- username (username) – cannot be empty, min. 4 characters, cannot contain whitespace
- email address – cannot be empty, cannot contain whitespace, it must be a valid email address
- password – cannot be empty, min. 6 characters, must contain at least 1 digit, must contain at least one special character from the following: ! #@$%
- password confirmation (confirmPassword) – it must be identical to the password field

#### Sign up success:

- If the registration was successful, we deactivate the form submit button and display a button redirecting to registration

### Logged in user view:

- Navigation menu with a link to the home page (Home) and a logout link, which, when clicked, logs the user out
- Home page with a list of posts
- A list of 10 posts with a Load more button underneath which, when clicked, downloads the next 10 posts
- The single post view displays the username, date added, content, avatar and number of likes, as well as the like/dislike button
- Additionally, if the post is added by the currently logged in user, there is a Delete post button.
- Additionally, if the post is not added by the currently logged in user, there is an Unfollow button.
- Above the list of posts there is a box displaying profiles recommended for following - each proposed profile has a Follow button, clicking which adds this profile to following.
- Above the list of profiles recommended for tracking, there is a form for adding a post with a text field and an Add button allowing the currently logged in user to add a post.

# Getting Started with Social App

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
