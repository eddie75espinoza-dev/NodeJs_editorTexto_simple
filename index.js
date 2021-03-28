/* 
Aplicacion segmentada por modulos, realizada con NodeJs, es un simple editor de texto 
se ejecuta sobre el CMD

 */

const readline = require('readline');
const Messages = require('./messages');
const Document = require('./document');
const Directory = require('./directory');

const dir = new Directory();

let interface = readline.createInterface(process.stdin, process.stdout);

const tools = `Comandos: | :s = Guardar | :sa = Guardar como | :q = salir
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`;

const screen = `
                ========================
                Editor de texto simple\n
                ========================
                Elija una opcion:\n
                1 Crear nuevo documento\n
                2 Abrir documento\n
                3 Cerrar editor\n
                \n\tOpcion: `;

mainScreen();

function mainScreen() {
    process.stdout.write('\033c'); // '\033c' o '\x1Bc'    
    interface.question(screen, res =>{
        switch (res.trim()) {
            case '1':
                createFile();
                break;
            case '2':
                openFileInterface();
                break;
            case '3':
                interface.close();
                break;

            default:
                mainScreen();
        }
    });
}

function createFile(name) {
    let file = new Document(dir.getPath());

    renderInterface(file);
    readCommands(file);
}

function openFileInterface(){
    let file = new Document(dir.getPath());
    dir.getFilesInDir();
    interface.question(Messages.requestFileName, name =>{
        if(file.exists(name)){
            openFile(file, name);
        }else{
            console.log(Messages.fileNotFound);
            setTimeout(()=>{
                interface.removeAllListeners('line');
                mainScreen();
            }, 3000);
        }
    });
}

function openFile(file, name) {
    file.open(name);
    renderInterface(file);
    readCommands(file);
}

function renderInterface(file, mensage) {
    process.stdout.write('\033c'); // limpia la consola
    (file.getName() == '') ? console.log(`| Untitled |`) : console.log(`| ${file.getName()} |`);
    console.log(tools);

    if(mensage != null){
        console.log(mensage)
    }
    console.log(file.getContent());
}

function readCommands(file) {
    interface.on('line', input =>{
        switch (input.trim()) {
            case ':s':
                save(file);
                break;
            case ':sa':
                saveAs(file);
                break;
            case ':q':
                interface.removeAllListeners('line');
                mainScreen();
                break;
        
            default:
                file.append(input.trim());
                break;
        }
    });    
}

function saveAs(file) {
    interface.question(Messages.requestFileName, name => {
        if(file.exists(name)){
            // si existe el archivo
            console.log(Messages.fileExists);
            interface.question(Messages.replaceFile, confirm =>{
                if(confirm == 'y'){
                    file.saveAs(name);
                    renderInterface(file, Messages.fileSaved + '\n');
                }else{
                    renderInterface(file, Messages.fileNotSaved + '\n');
                }
            });
        }else{
            // si no existe el archivo
            file.saveAs(name);
            renderInterface(file, Messages.fileSaved + '\n');
        }
    });
}

function save(file) {
    if(file.hasName()){
        file.save();
        renderInterface(file, Messages.fileSaved + '\n');
    }else{
        saveAs(file);
    }
}