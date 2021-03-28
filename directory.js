const fs = require('fs'); // manejador de archivos
const path = require('path'); // manejador de rutas

class Directory{

        constructor(){
            this._path = __dirname; // obtiene la ruta del directorio
            this._dir = 'docs'; // nombre de la carpeta
            this.createDocsDir(); 
        }

        createDocsDir(){ 
            // funcion para crear la carpeta para almacenar los docs
            this._path = path.join(this._path, this._dir); // crear una URL completa a partir de string

            if(!fs.existsSync(this._dir)){ // verifica si no existe la carpeta
                fs.mkdirSync(this._dir); // crea la carpeta
            } 
        }

        getPath(){
            // Regresa toda la URL
            return this._path;
        }

        getShortPath(){
            // Direccion corta de la ultima URL para mostrar en la interfaz grafica
            const paths = path.parse(this._path);
            let delimiter = '/'; // delimitar la ruta

            if(paths.dir.indexOf(delimiter) < 0){
                // verificar la diagonal
                delimiter = `\\`;
            }
            return `${paths.root}...${delimiter}${paths.name}`;
        }

        getFilesInDir(){
            // obtiene los archivos que hay en la carpeta
            const files = fs.readdirSync(this._path);
            let n = 0;
            console.log(`
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Ubicacion: ${this.getShortPath()}
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);

            files.forEach(file => {
                if(file != '.DS_Store'){
                    console.log(`   ${file}`);
                    n++;
                }
            });
        }
}

module.exports = Directory;