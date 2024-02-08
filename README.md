# pokemon-voter-be
This is the Pokemon Voter application backend
You can find the front end of this application here:
- https://github.com/AttilaMuller/pokemon-voter-fe

- This backend service uses
    - Docker (you need docker installed)
        - server container
        - prod psql db
        - test psql db
    - Express
    - TypeOrm
    - TypeScript
    - Jest and Supertest

In order to be able to run tests and start application:
- Rename .env.example to .env
then run these commands:
```
npm i
npm run docker
npm t
```
