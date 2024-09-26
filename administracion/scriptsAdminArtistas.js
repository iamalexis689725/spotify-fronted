document.addEventListener("DOMContentLoaded", function () {
    const crearArtistaForm = document.getElementById("crearArtistaForm");
    const actualizarArtistaForm = document.getElementById("actualizarArtistaForm");
    const eliminarArtistaForm = document.getElementById("eliminarArtistaForm");
    const listaArtistas = document.getElementById("listaArtistas");

    // Función para obtener y mostrar todos los artistas
    function obtenerArtistas() {
        fetch('http://localhost:3000/api/artistas')
            .then(response => response.json())
            .then(artistas => {
                listaArtistas.innerHTML = '';
                artistas.forEach(artista => {
                    const li = document.createElement('li');
                    li.classList.add('list-group-item');
                    li.textContent = `ID: ${artista.id} - Nombre: ${artista.nombre}`;
                    listaArtistas.appendChild(li);
                });
            })
            .catch(error => console.error('Error al obtener artistas:', error));
    }

    crearArtistaForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(this);
        fetch('http://localhost:3000/api/artistas', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(() => {
            obtenerArtistas(); // Actualizar la lista
            this.reset(); // Limpiar el formulario
        })
        .catch(error => console.error('Error al crear artista:', error));
    });

    
    actualizarArtistaForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(this);
        const artistaId = formData.get('id');
        fetch(`http://localhost:3000/api/artistas/${artistaId}`, {
            method: 'PUT',
            body: formData
        })
        .then(response => response.json())
        .then(() => {
            obtenerArtistas(); // Actualizar la lista
            this.reset(); // Limpiar el formulario
        })
        .catch(error => console.error('Error al actualizar artista:', error));
    });

    eliminarArtistaForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(this);
        const artistaId = formData.get('id');
        fetch(`http://localhost:3000/api/artistas/${artistaId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(() => {
            obtenerArtistas(); // Actualizar la lista
            this.reset(); // Limpiar el formulario
        })
        .catch(error => console.error('Error al eliminar artista:', error));
    });

    // Inicializo la lista de artistas al cargar la página
    obtenerArtistas();
});
