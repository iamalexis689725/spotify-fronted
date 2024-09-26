document.addEventListener("DOMContentLoaded", function () {
    const crearGeneroForm = document.getElementById("crearGeneroForm");
    const actualizarGeneroForm = document.getElementById("actualizarGeneroForm");
    const eliminarGeneroForm = document.getElementById("eliminarGeneroForm");
    const listaGeneros = document.getElementById("listaGeneros");

    // Función para obtener y mostrar todos los géneros
    function obtenerGeneros() {
        fetch('http://localhost:3000/api/generos')
            .then(response => response.json())
            .then(generos => {
                listaGeneros.innerHTML = '';
                generos.forEach(genero => {
                    const li = document.createElement('li');
                    li.classList.add('list-group-item');
                    li.textContent = `ID: ${genero.id} - Nombre: ${genero.nombre}`;
                    listaGeneros.appendChild(li);
                });
            })
            .catch(error => console.error('Error al obtener géneros:', error));
    }

    
    crearGeneroForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(this);
        fetch('http://localhost:3000/api/generos', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(() => {
            obtenerGeneros(); // Actualizar la lista 
            this.reset(); // Limpiar el formulario
        })
        .catch(error => console.error('Error al crear género:', error));
    });

    
    actualizarGeneroForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(this);
        const generoId = formData.get('id');
        fetch(`http://localhost:3000/api/generos/${generoId}`, {
            method: 'PUT',
            body: formData
        })
        .then(response => response.json())
        .then(() => {
            obtenerGeneros(); // Actualizar la lista 
            this.reset(); // Limpiar el formulario
        })
        .catch(error => console.error('Error al actualizar género:', error));
    });

    
    eliminarGeneroForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(this);
        const generoId = formData.get('id');
        fetch(`http://localhost:3000/api/generos/${generoId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(() => {
            obtenerGeneros(); // Actualizar la lista 
            this.reset(); // Limpiar el formulario
        })
        .catch(error => console.error('Error al eliminar género:', error));
    });

    // Inicializo la lista de géneros al cargar la página
    obtenerGeneros();
});
