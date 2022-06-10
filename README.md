# SpectrumUi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.6.

# Run
```
ng serve --host=0.0.0.0 --disable-host-checka
```

# Docker
```
docker buildx create --use
docker buildx build --push --platform linux/arm/v7,linux/arm64,linux/amd64 -t maxthom/spectrum-ui:latest .
docker build -t maxthom/spectrum-ui:latest .
docker run -p 80:80 maxthom/spectrum-ui:latest
docker push maxthom/spectrum-ui:latest
```

# Ports for wsl2
- https://stackoverflow.com/questions/61002681/connecting-to-wsl2-server-via-local-network
- netsh interface portproxy add v4tov4 listenaddress=0.0.0.0 listenport=4200 connectaddress=localhost connectport=4200
- netsh advfirewall firewall add rule name= "Open Port 4200" dir=in action=allow protocol=TCP localport=4200
- netsh interface portproxy add v4tov4 listenport=4200 listenaddress=0.0.0.0 connectport=4200 connectaddress=172.27.150.229

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
