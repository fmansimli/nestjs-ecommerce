# deployment to Heroku

$ heroku auth:whoami    // heroku login

$ git add . && git commit -m "preproduction commit"

$ heroku create

$ heroku addons:create heroku-postgresql:hobby-dev
$ heroku config:set JWT_KEY=extremly-secret-key
$ heroku config:set NODE_ENV=production

$ git push heroku master