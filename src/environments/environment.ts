// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
    firebase: {
        apiKey: 'AIzaSyDrbJTtaQHfuPlg6W2UblVtbNOGBITJHe8',
        authDomain: 'ng-fitness-tracker-28f35.firebaseapp.com',
        databaseURL: 'https://ng-fitness-tracker-28f35.firebaseio.com',
        projectId: 'ng-fitness-tracker-28f35',
        storageBucket: 'ng-fitness-tracker-28f35.appspot.com',
        messagingSenderId: '1085672609278',
    }
};
