# Plantilla para Node.js

Esta plantilla incluye:

- ES6 a traves de [babel](https://babeljs.io/setup#installation), para más detalles ver [./.babelrc](./.babelrc).
- [EsLint](https://eslint.org/docs/user-guide/getting-started), para más detalles ver [./.estlintrc.json](./..eslintrc.json).
- [Prettier](https://prettier.io/docs/en/editors.html) , para más detalles ver [./.prettierrc](./.prettierrc).

## Comandos:

- `start`, inicia el servidor en productivo.
- `start:dev`, inicia el servidor en modo de desarrollo.
- `build`, compila todo nuestro proyecto.
- `build:babel`, compila nuestra carpeta src con babel.
- `prettier`, ejecuta prettier.
- `prettier:fix`, ejecuta prettier en modo de sobre-escritura.

## Notas carlos

- importante:antes de usar el servidor, debe de borrar el archivo package-lock.json, eliminar la carpeta build, y escribir en la consola npm i, seguido de los siguientes comandos

- instalamos:
express: npm i express --save
mongoose: npm i mongoose
bcrypt: npm install bcrypt
jsonwebtoken: npm install jsonwebtoken
babel: npm i -g  @babel/node 

- si clona el proyecto solo con npm i bastaŕa para que funcione el servidor con todo los modulos mencionados arriba. sino te toca instalarlo todo. thanks :) xD