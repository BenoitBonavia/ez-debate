# EZ-Debate

### Usage back

- Java 11
- Maven 3


#### Database Configuration

The configuration of the database is made throw the environment variables

`MYSQL_ADDON_ADDRESS` for the database host <br>
`MYSQL_ADDON_USER` for the database user <br>
`MYSQL_ADDON_PASSWORD` for the database password <br>
`MYSQL_ADDON_PORT` for the database port <br>
`MYSQL_ADDON_DB_NAME` for the database name <br>

#### SMTP Mail Configuration

The smtp configuration is made throw the environment variables

`MAIL_HOST` for the smtp mail host *(for default google smtp server : **smtp.gmail.com**)* <br>
`MAIL_PORT` for the smtp port *(for the default google smtp server : **587**)*<br>
`MAIL_USERNAME` for the smtp username *(for the default google smtp server : **your_email_address@gmail.com**)*<br>
`MAIL_PASSWORD` for the smtp password *(for the default google smtp server : **your_email_password**)*<br>

### Usage Front

Every front commands have to be run into the webapp folder

#### Development server

Run `npm run start` to start the development server

#### Run build

Run `npm run buildapp` to start the build of the webapp

#### App deployement

Run `npm run deployapp` to start the deployment of the app
The builded app is automatically copied into the `src/resources/static` folder

