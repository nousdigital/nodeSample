# Introduction
This Project is a nodeJS Sample project.

Technologies:
* node.js (v 14.15.1)
* Typescript (es2018)
* MongoDB
* swagger
* docker

## Getting Started
1.	Clone repository to your workspace
2.	Make sure Node.JS version 14.15.1 is installed
3.	Install dependencies by running the following command via your command line tool within the project directory
      ```
      npm run install
      ```

## Build and Test
Build the module by running the following command via your command line tool within the project directory:
```
npm run build
```

To start the module you need a locally running MongoDB. To do so, you can use the *docker-compose.yml* in the */docker* folder.
```
docker-compose up
```

The MongoDB is exposed on port 27017.
Finally, start the module by running the following command via your command line tool within the project directory:
```
npm run start
```
You should see the initialisation log messages from the module.
Check [API Documentation](http://localhost:6565/sample/api-docs) if the server is running. 
