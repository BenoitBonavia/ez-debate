# EZ-Debate

### Usage back

- Java 11
- Maven 3

The configuration of the database is made throw the environment variable

`MYSQL_ADDON_ADDRESS` for the database host <br>
`MYSQL_ADDON_USER` for the database user <br>
`MYSQL_ADDON_PASSWORD` for the database password <br>
`MYSQL_ADDON_PORT` for the database port <br>
`MYSQL_ADDON_DB_NAME` for the database name <br>
The database have to be named ez-debate <br>

### Usage Front

Every front commands have to be run into the webapp folder

#### Development server

Run `npm run start` to start the development server

#### Run build

Run `npm run buildapp` to start the build of the webapp

#### App deployement

Run `npm run deployapp` to start the deployment of the app
The builded app is automatically copied into the `src/resources/static` folder

