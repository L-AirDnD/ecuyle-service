# L'AirDnD: Reservations/Calendar Service

Microservice to provide the reservations and calendar components to the L'AirDnD application.

## Related Projects

  - https://github.com/L-AirDnD/Ceciil-service
  - https://github.com/L-AirDnD/leananepari-service
  - https://github.com/L-AirDnD/rghosh8-service
  - https://github.com/L-AirDnD/timluu-service

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

1. DB Schema and Seeding<br />
To run `npm run dbSetup`, you will need to create a `creds.txt` file and a `config.js file` in the `server/` folder of the service that follows the following formats *(Note: Delete </> brackets when filling in your details)*:
```txt
# server/creds.txt
[client]
user=<your_username_here>
password=<your_password_here>
```
```js
// server/config.js
module.exports = {
  MYSQL_HOST: <your_hostname>,
  MYSQL_USER: <your_username>,
  MYSQL_PASSWORD: <your_password>,
  MYSQL_DB_NAME: 'lairdnd-reservations',
};
```
2. Compiling Webpack<br />
In a separate terminal window, navigate to the root folder of this service and run `npm run build`. This will run the `webpack -d --watch` command.

3. Running the server<br />
In a separate terminal window, navigate to the root folder of this service and run `npm start`. This will start the service on PORT 3003.


## Requirements

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```