document.addEventListener("DOMContentLoaded", function() {
    function obtenerGeneros() {
        fetch('http://localhost:3000/api/generos')
            .then(response => response.json())
            .then(generos => {
                const listaGeneros = document.getElementById('generos-list');
                listaGeneros.innerHTML = '';
                generos.forEach(genero => {
                    const li = document.createElement('li');

                    const div = document.createElement('div');
                    div.classList.add('card'); 
                    div.style.width = '18rem'; 

                    const img = document.createElement('img');
                    img.classList.add('card-img-top');
                    img.src = genero.imageUrl; 
                    img.alt = genero.nombre; 

                    const divCardBody = document.createElement('div');
                    divCardBody.classList.add('card-body');
    
                    const h5 = document.createElement('h5');
                    h5.classList.add('card-title');
                    h5.textContent = genero.nombre;

                    const button = document.createElement('button');
                    button.textContent = 'Ver Artistas';
                    button.classList.add('btn', 'btn-primary', 'mt-2'); 
                    button.addEventListener('click', function() { 
                        window.location.href = `artistas.html?genero=${genero.id}`;
                    });

                    divCardBody.appendChild(h5);
                    divCardBody.appendChild(button); 
                    div.appendChild(img);
                    div.appendChild(divCardBody);
                    li.appendChild(div);
                    listaGeneros.appendChild(li);
                });
            })
            .catch(error => console.error('Error al obtener generos:', error));
    }

    obtenerGeneros();
});


