document.addEventListener("DOMContentLoaded", function () {
    // Obtengo el id del artista de la url
    const urlParams = new URLSearchParams(window.location.search);
    const artistaId = urlParams.get('artista');

    function obtenerAlbumesPorArtista(artistaId) {
        fetch(`http://localhost:3000/api/albumes?artista_id=${artistaId}`)
            .then(response => response.json())
            .then(albumes => {
                const listaAlbumes = document.getElementById('albums-list');
                listaAlbumes.innerHTML = '';
                albumes.forEach(album => {
                    if (album.artista_id === parseInt(artistaId)) {
                        const li = document.createElement('li');

                        const div = document.createElement('div');
                        div.classList.add('card');
                        div.style.width = '18rem';

                        const img = document.createElement('img');
                        img.classList.add('card-img-top');
                        img.src = album.imageUrl;
                        img.alt = album.nombre;


                        const divCardBody = document.createElement('div');
                        divCardBody.classList.add('card-body');


                        const h5 = document.createElement('h5');
                        h5.classList.add('card-title');
                        h5.textContent = album.nombre;


                        const button = document.createElement('button'); 
                        button.textContent = 'Ver canciones'; 
                        button.classList.add('btn', 'btn-primary', 'mt-2'); 
                        
                        button.addEventListener('click', function() { 
                            window.location.href = `canciones.html?album=${album.id}`;
                        });

                        divCardBody.appendChild(h5);
                        divCardBody.appendChild(button);
                        div.appendChild(img);
                        div.appendChild(divCardBody);
                        li.appendChild(div);
                        listaAlbumes.appendChild(li);
                    }
                });
            })
            .catch(error => console.error('Error al obtener álbumes:', error));
    }

    obtenerAlbumesPorArtista(artistaId);
});
