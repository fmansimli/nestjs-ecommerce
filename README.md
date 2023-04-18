# deployment to Heroku

$ heroku auth:whoami // heroku login

$ git add . && git commit -m "preproduction commit"

$ heroku create

$ heroku addons:create heroku-postgresql:hobby-dev
$ heroku config:set JWT_KEY=extremly-secret-key
$ heroku config:set NODE_ENV=production

$ git push heroku master

```shell

docker run --name postgres-cont -p 5432:5432 -e POSTGRES_PASSWORD=12345 -e POSTGRES_DB -d postgres

```
