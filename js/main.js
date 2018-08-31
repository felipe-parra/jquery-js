//  Archivo JS definido por phick.

const urlApi = "https://yts.am/api/v2/list_movies.json?genre=";

let genre = ['action', 'drama','animation'];

(async function load(){
    async function getData(url,genero){
        const urlComplete = url + genero;
        const response = await fetch(urlComplete);
        const data = await response.json();
        return data;

    }
    const actionList = await getData(urlApi,'action');
    const $actionContainer = document.getElementById('action');
    function videoItemTemplate(movie){
        return (
            `<div class="row-fluid">
                <div class="col-sm-6 col-md-4">
                    <div class="thumbnail" id="action">
                        <img src="${movie.medium_cover_image}" class="img-thumbnail" alt="">
                        <div class="caption">
                            <h3>${movie.title}</h3>
                            <p>${movie.description_full}</p>
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
    //  await
    //console.log(actionList);
    function renderMovieList(list, $container){
        //actionList.data.movies
        $container.children[0].remove();
        list.forEach((movie) => {
            const HTMLString = videoItemTemplate(movie);
            const movieElement = createTemplate(HTMLString);
            $actionContainer.append(movieElement);
        })
    }
    renderMovieList(actionList.data.movies,$actionContainer)

})()
