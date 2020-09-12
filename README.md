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

#### S3 Bucket Configuration

The upload feature require the amazon s3 configuration 

`S3_BUCKET_NAME` <br>
`S3_ACCESS_KEY` <br>
`S3_SECRET_KEY` <br>

### Usage Front

Every front commands have to be run into the webapp folder

#### Development server

Run `npm run start` to start the development server

#### Run build

Run `npm run buildapp` to start the build of the webapp

#### App deployement

Run `npm run deployapp` to start the deployment of the app
The builded app is automatically copied into the `src/resources/static` folder

