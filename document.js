const fs = require('fs'); // manejador de archivos
const os = require('os'); // permite ejecutar comandos el SO

class Document{

    constructor(dir){
        this._content = '';
        this._isSaved = false;
        this._fileName = '';
        this._dir = dir;
    }

    exists(name){
        // validar si existe un archivo
        return fs.existsSync(`${this._dir}/${name}`);
    }

    append(text){
        // permite a#adir mas texto
        this._content += os.EOL + text; // os.EOL obtiene la diagonal
        this._isSaved = false;
    }

    saveAs(name){
        // permite guardar el archivo si no existe
        fs.writeFileSync(`${this._dir}/${name}`, this._content); // usando funciones sincronas
        this._isSaved = true;
        this._fileName = name;
    }

    save(){
        // guarda el archivo ya existente
        fs.writeFileSync(`${this._dir}/${this._fileName}`, this._content); // usando funciones sincronas
        this._isSaved = true;
        this._fileName = this._fileName;
    }

    getContent(){
        // Obtiene el contenido
        return this._content;
    }

    hasName(){
        // valida si el archivo tiene nombre para poder invocar save() o saveAs()
        if(this._fileName != ''){
            return true;
        }else{
            return false;
        }
    }

    getName(){
        // obtiene nombre del archivo
        return  this._fileName;
    }

    isSaved(){
        // obtiene el estado de un documento
        return  this._isSaved;
    }

    open(name){
        this._content = fs.readFileSync(`${this._dir}/${name}`, 'UTF-8'); // UTF-8 para poder leerlo
        this._fileName = name;
        this._isSaved = true;
        return this._content;
    }
}

module.exports = Document;