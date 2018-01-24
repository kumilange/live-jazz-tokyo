# Live Jazz Tokyo ![rsz_1rsz_1rsz_1rsz_4logo](https://user-images.githubusercontent.com/28984604/35333415-01adbab8-0152-11e8-9f4a-ec45e55cab9d.png)

**How come finding local jazz events and booking one is so difficult in Tokyo?** This is a simple app to find local jazz events happening around your area tonight. Click the event you are interested, check the detail then book it straight away!

![2018-01-24 22 22 09](https://user-images.githubusercontent.com/28984604/35334271-2218071a-0155-11e8-90bb-d6f97f14533c.png)

## Getting Started
### Prerequisites

- node > 8.0.0
- yarn
- PostgreSQL

### 1. Installing
```
git clone https://github.com/kumiko-haraguchi/live-jazz-tokyo.git
cd live-jazz-tokyo
yarn install
```

### 2. Creating DB & Running migration & Seeding dummy data
```
psql
# CREATE DATABASE livejazz
# \c livejazz

yarn migrate
yarn seed
```

### 3. Running Dev & API servers
```
yarn frontend
yarn backend
```
=> You'll see the map on http://localhost:3000! 🗺💃

### How do I book a ticket with a fake credit account?
Put `4242 4242 4242 4242` for Card Number
![2018-01-25 0 50 47](https://user-images.githubusercontent.com/28984604/35341818-e54e9a14-0169-11e8-906d-6e48a1d8c711.png)

=> You can book a (fake) event!!!🎉 

## Built With
* [React](https://facebook.github.io/react/) - Frontend
* [Redux](https://github.com/reactjs/redux) - State Management
* [Material UI](http://www.material-ui.com/) - UI Component
* [Atomic Design](http://atomicdesign.bradfrost.com/table-of-contents/) - Component Design
* [Express](https://expressjs.com/) - Backend
* [PostgreSQL](https://www.postgresql.org/) - Database
* [Knex](http://knexjs.org/) - Query Builder
* [Stripe](https://stripe.com/) - Online Payment
* [Hello.js](https://adodson.com/hello.js/) - OAuth2
* [Yarn](https://yarnpkg.com/en/) - Dependency Management
* [Heroku](https://heroku.com/) - Continuous Integration / Continuous Deployment
