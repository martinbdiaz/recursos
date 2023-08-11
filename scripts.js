$(document).ready(function() {
    $('nav a').click(function() {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500);
        return false;
    });
    $('form').submit(function(e) {
        e.preventDefault();
        fetch('https://www.ayudapsicologica.co/contact.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify({
              name: document.getElementById("nombre").value,
              email: document.getElementById("correo").value,
              cel: document.getElementById("celular").value,
              msj: document.getElementById("msj").value
            })
        })
        .then(response => response.text())
        .then(data => {
            $('#form-contacto').addClass('hide')
            $('.registro-exitoso').removeClass('hide')
            // Aquí puedes manejar la respuesta del servidor, si es necesario
            console.log(data);
        })
        .catch(error => {
            // Aquí puedes manejar cualquier error que ocurra durante la solicitud
            console.error(error);
        });
    });
    $('.navbar-toggle').click(function(){
        if($('.menu-principal').hasClass('menu-mobile')){
            $('.menu-principal').removeClass('menu-mobile');
            $(this).removeClass('fa-times').addClass('fa-bars')
        }else{
            $('.menu-principal').addClass('menu-mobile');
            $(this).addClass('fa-times').removeClass('fa-bars')
        }
    })
    $('.contenido-menu li a').click(function(){
        setTimeout(function(){
            $('.menu-principal').removeClass('menu-mobile');
            $('.navbar-toggle').removeClass('fa-times').addClass('fa-bars')
        },300)
    })


    const categorias = document.querySelectorAll('#categorias .categoria');
    const contenedorPreguntas = document.querySelectorAll('.contenedor-preguntas');
    let categoriaActiva = null;

    categorias.forEach((categoria) => {
        categoria.addEventListener('click', (e) => {
            categorias.forEach((elemento) => {
                elemento.classList.remove('activa');
            });

            e.currentTarget.classList.toggle('activa');
            categoriaActiva = categoria.dataset.categoria;


            // Activamos el contenedor de preguntas que corresponde
            contenedorPreguntas.forEach((contenedor) => {
                if(contenedor.dataset.categoria === categoriaActiva){
                    contenedor.classList.add('activo');
                } else {
                    contenedor.classList.remove('activo');
                }
            });
        });
    });
    const preguntas = document.querySelectorAll('.preguntas .contenedor-pregunta');
    preguntas.forEach((pregunta) => {
        pregunta.addEventListener('click', (e) => {
            e.currentTarget.classList.toggle('activa');
            const respuesta = pregunta.querySelector('.respuesta');
            const alturaRealRespuesta = respuesta.scrollHeight;
            if(!respuesta.style.maxHeight){
                // Si esta vacio el maxHeight entonces ponemos un valor.
                respuesta.style.maxHeight = parseInt(alturaRealRespuesta) + 70 + 'px';
            } else {
                respuesta.style.maxHeight = null;
            }
            // [Opcional] Reiniciamos las demas preguntas
            preguntas.forEach((elemento) => {
                // Solamente queremos ejecutar el codigo para las preguntas que no 
                // sean la pregunta a la que le dimos click.
                if(pregunta !== elemento){
                    elemento.classList.remove('activa');
                    elemento.querySelector('.respuesta').style.maxHeight = null;
                }
            });
        });
    });





});
    /*
    var fechaLanzamiento = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000); // Fecha de lanzamiento en 10 días
    var contador = document.getElementById("time");
    function actualizarContador() {
        var finalDate = new Date(2023,07,07)
        var ahora = new Date().getTime();
        var tiempoRestante = finalDate - ahora;
        var dias = Math.floor(tiempoRestante / (1000 * 60 * 60 * 24));
        var horas = Math.floor((tiempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
        var segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000);
        contador.innerHTML = "<td>"+ dias +"</td><td>" + horas +"</td><td>"+ minutos + "</td><td>"+ segundos + "</td>";
        if (tiempoRestante <= 0) {
            clearInterval(temporizador);
            contador.innerHTML = "¡Ya estamos en línea!";
        }
    }
    var temporizador = setInterval(actualizarContador, 1000);
    actualizarContador();
    */