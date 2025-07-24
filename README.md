# Spring Boot React Example

This is a sample project for a Spring Boot app with a React frontend. It provides CRUD functions for managing flowers, persisted in HSQL. Implementation details:

* Contains the webpack configuration, including devserver for development (no deprecated `create-react-app`)
* The actual React code is located in `src/main/webapp` using only Typescript
* `react-router` for routing, `react-i18next` for internationalization, `react-hook-form` with `yup` for forms, and much more
* The `ReactForwardController` returns the `index.html` for all non-backend requests
* Gradle Node plugin for integration into the build process

Further background information can be found in [Integrating React with Spring Boot](https://bootify.io/frontend/react-spring-boot-integration.html).

Create your own Spring Boot application with a React frontend at [Bootify.io](https://bootify.io). Choose between **Maven and Gradle, define your own database schema,** and much more.

## Development

Update your local database connection in `application.yml` or create your own `application-local.yml` file to override
settings for development.

During development it is recommended to use the profile `local`. In IntelliJ `-Dspring.profiles.active=local` can be
added in the VM options of the Run Configuration after enabling this property in "Modify options".

In addition to the Spring Boot application, the DevServer must also be started - for this
[Node.js](https://nodejs.org/) version 22 is required. On first usage and after updates the dependencies have to be installed:

```
npm install
```

The DevServer can be started as follows:

```
npm run devserver
```

Using a proxy the whole application is now accessible under `localhost:3000`. All changes to the templates and JS/CSS
files are immediately visible in the browser. Frontend unit tests can be executed with `npm run test`.

## Build

The application can be built using the following command:

```
gradlew clean build
```

Node.js is automatically downloaded using the `gradle-node-plugin` and the final JS/CSS files are integrated into the jar.

Start your application with the following command - here with the profile `production`:

```
java -Dspring.profiles.active=production -jar ./build/libs/react-0.0.1-SNAPSHOT.jar
```

If required, a Docker image can be created with the Spring Boot plugin. Add `SPRING_PROFILES_ACTIVE=production` as
environment variable when running the container.

```
gradlew bootBuildImage --imageName=io.bootify/react
```

## Further readings

* [Gradle user manual](https://docs.gradle.org/)  
* [Spring Boot reference](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)  
* [Spring Data JPA reference](https://docs.spring.io/spring-data/jpa/reference/jpa.html)
* [Learn React](https://react.dev/learn)
* [Webpack concepts](https://webpack.js.org/concepts/)  
* [npm docs](https://docs.npmjs.com/)  
* [Bootstrap docs](https://getbootstrap.com/docs/5.3/getting-started/introduction/)  
