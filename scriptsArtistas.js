document.addEventListener("DOMContentLoaded", function () {
    // Obtengo el id del artista de la url
    const urlParams = new URLSearchParams(window.location.search);
    const generoId = urlParams.get('genero');

    function obtenerArtistasPorGenero(generoId) {
        fetch(`http://localhost:3000/api/artistagenero`)
            .then(response => response.json())
            .then(artistasGenero => {
                // Filtro los elementos con genero_id igual al obtenido de la URL
                const artistasPorGenero = artistasGenero.filter(item => item.genero_id === parseInt(generoId));

                // Obtengo los id de los artistas filtrados
                const artistasIds = artistasPorGenero.map(item => item.artista_id);

                fetch(`http://localhost:3000/api/artistas`)
                    .then(response => response.json())
                    .then(artistas => {
                        const listaArtistas = document.getElementById('artistas-list');
                        listaArtistas.innerHTML = '';
                        // Iterar sobre los artistas filtrados y mostrarlos en la lista
                        artistasIds.forEach(id => {
                            const artista = artistas.find(item => item.id === id);
                            if (artista) {
                                const li = document.createElement('li');

                                const div = document.createElement('div');
                                div.classList.add('card');
                                div.style.width = '18rem';

                                const img = document.createElement('img');
                                img.classList.add('card-img-top');
                                img.src = artista.imageUrl;
                                img.alt = artista.nombre;

                                const divCardBody = document.createElement('div');
                                divCardBody.classList.add('card-body');

                                const h5 = document.createElement('h5');
                                h5.classList.add('card-title');
                                h5.textContent = artista.nombre;

                                const button = document.createElement('button'); 
                                button.textContent = 'Ver Album'; 
                                button.classList.add('btn', 'btn-primary', 'mt-2'); 
                                button.addEventListener('click', function() {
                                    window.location.href = `albumes.html?artista=${artista.id}`;
                                });

                                divCardBody.appendChild(h5);
                                divCardBody.appendChild(button);
                                div.appendChild(img);
                                div.appendChild(divCardBody);
                                li.appendChild(div);
                                listaArtistas.appendChild(li);
                            }
                        });
                    })
                    .catch(error => console.error('Error al obtener artistas:', error));
            })
            .catch(error => console.error('Error al obtener artistas por género:', error));
    }

    obtenerArtistasPorGenero(generoId);
});
