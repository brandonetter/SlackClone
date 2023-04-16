# Sluck

![postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)![python](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue)![javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)![render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)![flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)![font-awesome](https://img.shields.io/badge/Font_Awesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white)

Sluck is a Python and React project meant to emulate core functionality of the popular messaging app, [Slack](http://slack.com). Sluck was created as part of the [App Academy Part-Time Program](https://www.appacademy.io/) by two Developers:

 - [Yining Mao](https://github.com/ymao21) 
 - [Brandon Etter](https://github.com/brandonetter)
 
---

[![render](https://img.shields.io/badge/Live%20Site-green?style=for-the-badge)](https://slackclone-m2ga.onrender.com/)
 The application is hosted on Render.com and can be accessed by clicking the `Live Site` Badge above

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


