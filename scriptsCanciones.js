document.addEventListener("DOMContentLoaded", function () {
    // Obtengo el id del album de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const albumId = urlParams.get('album');

    function obtenerCancionesPorAlbum(albumId) {
        fetch(`http://localhost:3000/api/canciones?album_id=${albumId}`)
            .then(response => response.json())
            .then(canciones => {
                const listaCanciones = document.getElementById('canciones-list');
                listaCanciones.innerHTML = '';

                // Itero sobre las canciones y mostrarlas en la lista
                canciones.forEach(cancion => {
                    if (cancion.album_id === parseInt(albumId)) {
                        const div = document.createElement('div');
                        div.classList.add('col-md-4', 'mb-4');

                        const card = document.createElement('div');
                        card.classList.add('card', 'h-100');

                        const img = document.createElement('img');
                        img.classList.add('card-img-top');
                        img.src = cancion.imageUrl;
                        img.alt = cancion.nombre;

                        const cardBody = document.createElement('div');
                        cardBody.classList.add('card-body');

                        const h5 = document.createElement('h5');
                        h5.classList.add('card-title');
                        h5.textContent = cancion.nombre;

                        const audio = document.createElement('audio');
                        audio.controls = true;
                        audio.classList.add('w-100');
                        audio.src = cancion.musicaUrl;

                        cardBody.appendChild(h5);
                        cardBody.appendChild(audio);

                        card.appendChild(img);
                        card.appendChild(cardBody);

                        div.appendChild(card);
                        listaCanciones.appendChild(div);
                    }
                });
            })
            .catch(error => console.error('Error al obtener canciones:', error));
    }

    obtenerCancionesPorAlbum(albumId);
});
