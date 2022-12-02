// Guardamos en el seSSionStorage el collector_name, pasando 
// por la condicion de que haya sido logeado anteriormente

let sessionCollector = () => {  
    
    if (StorageManager.getLogin()) {
    
        collectorName = document.getElementById("collectorName").value;
        console.log(collectorName);        

        if(StorageManager.getCollectorName() == null){
        StorageManager.saveCollectorName(collectorName);
        }
    }
}

// Le damos el valor guardado en el sessioStorage para mostrarlo en el input


let checkCollector = () => {
    let collectorName = StorageManager.getCollectorName();

    if (collectorName != null){
    document.getElementById("sesionAllCollector").value = `Sesión On/OFF: ${collectorName}`; 
    document.getElementById("entrar").innerHTML = "";
    document.getElementById("registro").innerHTML = "";
    }

    // else{
    //     document.getElementById("addObject").innerHTML = "";
    //     document.getElementById("EditCollector").innerHTML = "";
    //     document.getElementById("deleteCollector").innerHTML = "";        
    //     document.getElementById("editObjet").innerHTML = "";
    //     document.getElementById("deleteObject").innerHTML = "";
    // }
}


// Borramos lo guardado en el sessionStorage

let eliminateCollectorName = () => {
    StorageManager.deleteCollectorName();
}


// Le asignamos el valor de true a la variable y la guardamos. La
// cual, usaremos despues.

let loginOk = () => {
    let login = true;

    StorageManager.saveLogin(login);
}


// eliminamos el sessionStorage

let eliminateLogin = () => {
    StorageManager.deleteLogin();
}

