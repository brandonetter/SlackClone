


# Sluck

![redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=whit)![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)![python](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue)![javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)![render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

![postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)![flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)![font-awesome](https://img.shields.io/badge/Font_Awesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white)![socket-io](https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white)

Sluck is a Python and React project meant to emulate core functionality of the popular messaging app, [Slack](http://slack.com). Sluck was created as part of the [App Academy Part-Time Program](https://www.appacademy.io/) by two Developers:

 - [Yining Mao](https://github.com/ymao21)
 - [Brandon Etter](https://github.com/brandonetter)

---

[![render](https://img.shields.io/badge/Live%20Site-green?style=for-the-badge)](https://slackclone-m2ga.onrender.com/)

 The application is hosted on Render.com and can be accessed by clicking the `Live Site` Badge above

---

### Building The Application

    pip install -r requirements.txt
    pip install psycopg2
    flask db upgrade
    flask seed all
    npm install --prefix react-app
    npm run build --prefix react-app

After a successful build the application can then be ran using gunicorn

    gunicorn --worker-class eventlet -w 1 --bind 0.0.0.0:5000 app:app
To remove all messages, channels, dms and reset back to initial DB state run:

    flask seed undo

---

### Feature List

 - Live chat
 - Rich Text including Underline, Italics, Bold, and Lists
 - User and Message Search
 - User status updates
 - Dynamic message loading
 - Channel Browser
 - Direct Messages

### Database Design

![image](https://user-images.githubusercontent.com/4108484/232324020-3d717378-198d-49aa-ab59-6d9e2ed00909.png)
The database is has a simple design putting all types of communication (Channels, DMs, Group DMs) into a single table 'Rooms', that relates to a constants table called 'Types' to determine what kind of room it is. This design allows for quickly adding and removing types for further changes and features.

# Developer Experience

## Brandon Etter
Coming into this project I had experience with Socket-IO, but not with integrating it along-side React, Flask and Python. This project gave me a lot of confidence that I can learn new technologies and combine them as I learn. I also was forced to learn a lot of new design patterns that I will absolutely be taking with me for future projects.
#### Challenges
- **Rich Text Editor**
Using [Facebook's DraftJS](https://draftjs.org/) framework was challenging at first but incredibly rewarding. DraftJS provides a state-driven input editor that is incredibly powerful and extensible. Custom additions to the editor like @user-mentions can be added using the entity and decorator system provided by DraftJS- allowing you to insert custom HTML or full react components into the editor when the user types a certain phrase or interacts with buttons. This allowed me to open a modal when the user types "@" that contains a list of user's in the room, and insert a 'user-mention' entity inside the editor once the user clicks or presses TAB. This particular function `confirmMention` grabs the content state, adds the mention entity to the end, and modifies the editor state to include the new content state

![image](https://user-images.githubusercontent.com/4108484/232327577-e8921b75-4bed-4b1a-9505-683657845f26.png)

Properly managing editor state was a challenge, but resulted in a very customizable editor for user messages, that was easy to drop into and use elsewhere, like for allowing editing.

[edited.webm](https://user-images.githubusercontent.com/4108484/232327962-7fca9000-e871-4ec3-9fc8-5bba65d83443.webm)

- **Controlling Windows With Redux**
A challenge I had faced in the past with applications has been keeping multiple pop-up windows and modals organized and 'always-on-top' even when embedded deep within layers of divs. Using redux, I took a new approach to managing these by simply setting the state of all the modals into a redux slice, and drawing them **after** the rest of the application while keeping each window in it's own separate React Component.
This allowed me for the first time to not worry about z-index or layers or breaking the design with whatever window I wanted to show. It also gave me a central place of logic to close all open windows.
 The initial state and the toggle functions of the modal slice can be seen here:
 ![image](https://user-images.githubusercontent.com/4108484/232328323-93a3bf88-4ab9-4855-a07e-64210e017a46.png)

 Along with a simple way to handle when to draw them shown here. This is just added after the rest of the MainWindow component to ensure it is always on top:
 ![image](https://user-images.githubusercontent.com/4108484/232328431-67bfb438-015e-49c8-b0f3-0115ed710608.png)

 I'm very happy with this solution and it allowed me to have many windows and states managed quickly and easily, as seen here:

 [window-example.webm](https://user-images.githubusercontent.com/4108484/232329025-267a24f8-0677-4fec-80a6-3950cb6f646a.webm)

### Crud Features**
The Slack-Clone project includes full CRUD features (which includes Create, Read, Update, Delete) for both the channels and the direct message portion of the page
