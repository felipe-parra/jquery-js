//  Archivo JS definido por phick.

const urlApi = "https://yts.am/api/v2/list_movies.json?genre=";

let genre = ['action', 'drama','animation'];

(async function load(){
    async function getData(url, genero){
        const urlComplete = url + genero;
        const response = await fetch(urlComplete);
        const data = await response.json();
        return data;

    }
    const $form = document.getElementById("form");
    $form.addEventListener("submit", (event) => {
      debugger
    })
    const actionList = await getData(urlApi,'action');
    const biographyList = await getData(urlApi,'biography');
    const dramaList = await getData(urlApi,'drama');

    const $actionContainer = document.getElementById('action');
    const $biographyContainer = document.getElementById('biography');
    const $dramaContainer = document.getElementById('drama');

    function videoItemTemplate(movie){
        return (
            `<div class="row-fluid">
                <div class="col-sm-6 col-md-3">
                    <div class="thumbnail" id="action">
                        <img src="${movie.medium_cover_image}" class="img-thumbnail" alt="">
                        <div class="caption">
                            <h3>${movie.title}</h3>
                            <p>${movie.description_full.slice(0,140)}</p>
                            <p>
                                <a href="#" class="btn btn-primary" role="button">Ver mas</a>
                                <a href="#" class="btn btn-default" role="button">Download
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
    function addEventClick($element){
      $element.addEventListener("click", function(){
        alert("click")
      })
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
