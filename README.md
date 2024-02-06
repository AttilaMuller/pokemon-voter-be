# pokemon-voter-be
This is the Pokemon Voter application backend

- This backend service uses
    - Docker (you need docker installed)
        - server container
        - prod psql db
        - test psql db
    - Express
    - TypeOrm
    - TypeScript
    - Jest and Supertest

In order to be able to run tests and start application run:
```
npm i
npm docker
npm t
```