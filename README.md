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

1. DB Schema and Seeding
To run `npm run dbSetup`, you will need to create a `creds.txt` file that follows the following format:
`
[client]
user={your_username_here}
password={your_password_here}
`

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```