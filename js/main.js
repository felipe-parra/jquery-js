//  Archivo JS definido por phick.

const urlApi = "https://yts.am/api/v2/list_movies.json?genre=";

let genre = ['action', 'drama','animation'];

(async function load(){
    //  await
    async function getData(url,genero){
        let urlComplete = url + genero;
        let response = await fetch(urlComplete);
        let data = await response.json();
        console.log(data);
    }
    getData(urlApi,genre[2])
})()

const $home = document.getElementById('modal')