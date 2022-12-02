class StorageManager {

    static saveCollectorName(collectorName){
        sessionStorage.setItem(StorageManager.KEY, collectorName);
    }

    static getCollectorName(){
        return sessionStorage.getItem(StorageManager.KEY);
    }

    static deleteCollectorName(){
        sessionStorage.removeItem(StorageManager.KEY);
    }



    static saveLogin(login){
        sessionStorage.setItem(StorageManager.KEY2, login);
    }


    static getLogin(){
        return sessionStorage.getItem(StorageManager.KEY2);
    }

    static deleteLogin(){
        sessionStorage.removeItem(StorageManager.KEY2);
    }

}


StorageManager.KEY = "CollectorId";
StorageManager.KEY2 = "Flag";