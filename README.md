# ARISTOTELES DASHBOARDS

## REQUIREMENTS

To run This project yo only need to have Docker and docker-compose installed on your machine

## RUN

`docker-compose up`

Add `--build` to force containers to re-create

`docker-compose up --build`

Backend will be runing on port 8000 and Frontend on port 3000

```
# Django project
localhost:8000

# React Project
localhost:3000
```

_As of right now, backend will be working with an sqlite3 database, although Postgres container is already created, they're not linked yet_