**Prueba de Programacion - Simulacion Ruleta**

Tecnologias utilizadas:

* **Node.js**
* **MongoDb**
* **Webpack**




**Instrucciones de instalacion.**

Para Unix (Distribucion Ubuntu):

**Instalar Mongodb**

Adicionar el repositorio al sistema
```sh
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
```

Recargar paquetes
```sh
sudo apt-get update
```

Instalar Mongodb
```sh
sudo apt-get install -y mongodb-org
```

Iniciar el servicio
```sh
sudo service mongod start
```

**Instalar NodeJs**

Node.js v11.x:

```sh
curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Instalar el codigo fuente**

Una vez preparado el ambiente procedemos a descargar el codigo de git


Situarse en el directorio donde se va a desplegar la aplicacion
```sh
cd /vhosts/ruleta-fullstack/
```

Iniciar git
```sh
git init
```

Adicionar el repositorio
```sh
git remote add origin https://github.com/pablovlez/ruleta.git
```

Descargar los paquetes
```sh
git pull origin master
```

Modificar archivo de configuracion para conexion a la base de datos

```sh
vi backend/database.js
Reemplazar process.env.MONGODB_URI por el string de conexion 'mongodb://nombre_servidor/nombre_base_datos'
```

**Instalacion de la aplicacion y dependencias**

Situarse en el directorio del proyecto y ejecutar los siguientes comandos

```sh
cd /vhosts/ruleta-fullstack/
npm install 
npm run postinstall
```

**Iniciar la aplicacion**
Para iniciar la aplicacion y  el servicio, ejecutar el siguiente comando:

```sh
npm start
```