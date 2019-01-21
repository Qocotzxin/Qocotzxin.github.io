Proyecto de promoción (nivel 6)

## Autor: Cristian Etchebarne

### Para trabajar en el repositorio:

1 - Clonar el proyecto: git clone https://github.com/Qocotzxin/Qocotzxin.github.io.git

2 - Instalar dependencias: npm install

3 - Aplicar git hooks: git config init.templatedir '.githooks'

4 - Correr la aplicación: npm start (Por default corre en localhost:3000)

5 - Correr los test: npm test (Esto también genera los reportes a los cuales se puede acceder mediante localhost:3000/coverage)

6 - Generar documentación: npm run documentation (Para acceder se puede ir a localhost:3000/docs)

## Estructura:

    - Framework: React

    - CSS framework: Bootstrap

    - Transpiler: Babel

    - Module Bundler: Webpack

    - CI: Travis

    - Lint: ESLint

    - Version Control Flow: Git

    - Test environment: Jest + Enzyme

    - Documentación: JSDoc

## Diseño de arquitectura:

    - El proyecto se realizará aplicando una arquitectura de componentes con el objetivo de aplicar las nuevas normas de
    desarrollo que aportan escalabilidad y modularidad en entorno Javascript.

    - El objetivo de aplicar modularidad en el proyecto es principalmente aplicar el concepto de "división de responsablidades",
    donde cada pequeña pieza tiene una función clara y definida. Esto genera un desarrollo mucho más claro, dividido en piezas
    de menor tamaño, las cuales pueden ser testeadas y debugueadas con mayor rapidez y claridad.

    - Dentro del conecpto de modularidad se ha aplicado específicamente la división entre componentes "smart" y "dumb".
    Dicha división promueve una categorización específica de tareas, la cual ayuda, inevitablemente, a tener un control
    claro de las responsabilidades dentro de cada módulo. En el caso de esta aplicación, siendo que hay un sólo módulo,
    existe un sólo componente "smart" que se encarga de realizar todos los request y los cambios de estado generales
    que definen ruteos y vistas. El resto de los componentes son "dumb" y se encargan de manipular solamente estados
    internos y de mostrar información que provee el component "smart".

## Path de ejecución:

    1 - Entry: punto incial de acceso definido en el archivo de configuración de Webpack. En este archivo comenzará la búsqueda
    de Webpack para determinar que módulos y librerías son necesarios para cargar la aplicación. En este caso
    (y por default en Webpack) esta ruta es '.src/index.js'.

    2 - A partir de ese entry point se general un árbol de dependencias que incluye, no sólo los módulos y librerías necesarios
    para el correcto funcionamiento de la aplicación, sino también todos los assets (imágenes, archivos, etc) que se van importando
    en cada archivo.

    3 - Para que todos los archivos necesarios puedan cargarse al árbol de dependencias, deben ser entendidos por Webpack. Por default,
    Webpack sólo entiendo Javascript y JSON, por lo que se vale de herramientas especiales llamadas 'loaders' para poder cargar cualquier
    otro tipo de archivo a las dependencias de manera entendible para si mismo. Los loaders son definidos también en el archivo de
    configuración de Webpack.

    4 - En este proceso también se incluye el transpile de Babel. Mediante una simple configuración (a través de un archivo específico de
    Babel llamado .babelrc, pero también en Webpack) todo el código escrito en determinada versión estandarizada de Javascript (ES2018 por ejemplo), será
    transformado en otra versión estandarizada que tenga compatibilidad con todos los navegadores deseados. Estos navegadores pueden
    ser especificados en la configuración (no es este el caso) y mediante sub dependencias de Babel se determinará como transformar
    la sintaxis. En el caso de esta configuración de Babel, también fue agregado un plugin que permite agregar propiedades a una clase
    que sean "arrow functions";

    5 - Una vez que el árbol de dependencias está completo, se genera un nuevo archivo llamado bundle.js (este nombre se puede definir)
    y es el archivo más importante de la aplicación ya que contiene todo lo que se necesita. Además este archivo está optimizado para
    ser lo más pequeño posible y será automáticamente incluido en el index.html mediante un tag 'script'.

    6 - Finalmente, cuando se mande a producción la aplicación, se subirán sólo 2 archivos, index.html y bundle.js. Cuando el servidor
    busque index.html, automáticamente estará cargando toda la aplicación mediante el bundle que generó Webpack.

    7 (Git flow y automatización para producción) - En el caso de esta aplicación, para llegar finalmente a la etapa de producción
    se debe pasar por un proceso previo automatizado mediante Travis. Existen 2 "branches" para este repositorio develop y master.
    Develop es el el "branch" de desarrollo y "master" se utiliza para producción. Una vez que el código está listo y se quiere
    mandar a producción se debe, antes que nada, someter al proceso de prueba de ESlint. Este proceso se configura, por un lado,
    en el archivo .eslintrc.json que determina las reglas que el código debe cumplir para estar en condiciones de ir a producción,
    y por otro lado en los "hooks" de git, que define en que momento se va a hacer esta prueba.
    En el caso de esta aplicación la prueba del lint se realiza antes de un commit, por ende, si alguna regla no se cumple (por ejemplo
    se utilizan comillas dobles en vez de simples en un archivo javascript) no se puede hacer el commit. Esto significa que se deben arreglar
    los errores y volver a realizar el commit hasta que el lint no de ningún tipo de error.
    Una vez que se realiza el commit el código se pushea a develop y de manera automática, Travis se encargará de enviarlo a producción.
    Este proceso está definido en el archivo .travis.yml, en el que básicamente se dice que tareas se deben correr y desde y hacia que branch.
    En este proyecto, una vez que develop se actualiza, Travis automáticamente comienza una tarea de deploy que consiste en instalar las
    dependencias del proyecto, correr los tests, y, en caso de que los tests estén en valor mínimo del 90% de aprobación, avanza hacia el
    proceso de build que es el último paso antes de subir los archivos al servidor (al branch master en este caso ya que se trabaja con
    Github Pages). Si el build sale bien, se actualiza master y los cambios ya se pueden ver en la url de producción (qocotzxin.github.com)
