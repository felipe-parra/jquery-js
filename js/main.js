//  Archivo JS definido por phick.

const urlApi = "https://yts.am/api/v2/list_movies.json?limit=4&genre=";
const BASE_API = "https://yts.am/api/v2/list_movies.json?";


let genre = ['action', 'drama','animation'];

(async function load(){
    async function getData(url, genero){
        const urlComplete = url + genero;
        const response = await fetch(urlComplete);
        const data = await response.json();
        return data;
    }
    async function getMovieSearch(url){
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    const $form = document.getElementById("form");
    const $featuring = document.getElementById("featuring");
    function setAttributes($element, attributes){
        for (const attribute in attributes){
            $element.setAttribute(attribute,attributes[attribute]);
        }
    };
    const actionList = await getData(urlApi,'action');
    const biographyList = await getData(urlApi,'biography');
    const dramaList = await getData(urlApi,'drama');

    const $actionContainer = document.getElementById('action');
    const $biographyContainer = document.getElementById('biography');
    const $dramaContainer = document.getElementById('drama');
    function resultTemplate(dataMovie){
        return (
            `<div class="home-featuring alert alert-success alert-dismissible fade in" id="featuring" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                <div class="media">
                    <div class="media-left">
                        <img id="imgResultado" src="${dataMovie.medium_cover_image}" alt="">
                    </div>
                    <div class="media-body">
                        <h4 class="media-heading">${dataMovie.title}</h4>
                        <p>${dataMovie.description_full}</p>
                    </div>
                </div>
            </div>`
        )
    }
    function failResult(){
        return (
            `<div class="home-featuring alert alert-danger alert-dismissible fade in" id="featuring" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                <div class="media">
                    <strong>Sorry, not find the movie.</strong>
                    <div class="media-left">
                        <img id="imgResultado" src="img/error.jpg" alt="">
                    </div>
                    <div class="media-body">
                    </div>
                </div>
            </div>`
        )
    }
    function videoItemTemplate(movie){
        return (
            `<div class="row-fluid">
                <div class="col-sm-4 col-md-3">
                    <div class="thumbnail" id="action">
                        <img src="${movie.medium_cover_image}" class="img-thumbnail" alt="">
                        <div class="caption">
                            <h4>${movie.title}</h4>
                            <p>${movie.description_full.slice(0,140)}</p>
                            <p>
                                <a href="#" class="btn btn-primary btn-sm"  data-toggle="modal" data-target="#myModal" role="button">Ver mas</a>
                                <a href="#" class="btn btn-default btn-sm" role="button">Download
                                </a>
                            </p>
                        </div>
                    </div>
                </div>`
        )
    }
    function createTemplate(HTMLString){
        const html = document.implementation.createHTMLDocument();
        html.body.innerHTML = HTMLString;
        return html.body.children[0];
    }
    const $modal = document.getElementById('myModal');
    const $modalTitle = document.getElementById('myModalLabel');
    const $modalBody = document.getElementsByClassName('modal-body');

    const $modalBodyTitle = document.querySelector('h4');
    const $modalImage = document.querySelector('img');
    const $modalDescription = document.querySelector('p');

    $form.addEventListener("submit", async (event) => {
        event.preventDefault(); //Para evitar que el navegador haga refresh al enviar submit
        //$featuring.classList.add("search-active");
        // $featuring.append($loader);
        const data = new FormData($form);
        const dataMovie = await getMovieSearch(`${BASE_API}limit=1&query_term=${data.get('movieSearch')}`);

        if (dataMovie.data.movie_count <= 0) {
            const HTMLString = failResult();
            $featuring.innerHTML = HTMLString;
            } else{
                const HTMLString = resultTemplate(dataMovie.data.movies[0]);
                $featuring.innerHTML = HTMLString;
            }
    })
    function mostrarModal(){

    }
    function addEventClick($element){

    }
    function renderMovieList(list, $container){
        $container.querySelector("#loader").remove();
        list.forEach((movie) => {
            const HTMLString = videoItemTemplate(movie);
            const movieElement = createTemplate(HTMLString);
            $container.append(movieElement);
            addEventClick(movieElement);
        })
    }
    renderMovieList(actionList.data.movies,$actionContainer)
    renderMovieList(biographyList.data.movies,$biographyContainer)
    renderMovieList(dramaList.data.movies,$dramaContainer)

    function selectedDropdown(){
      let selectedItem = document.getElementById("selectGenre").value;
      const actionList = getData(urlApi,selectedItem);
      renderMovieList(actionList.data.movies,$actionContainer)
    }

})()
