const frecuencia = document.getElementById('frecuencia');
const amplitud = document.getElementById('amplitud');
const longitud = document.getElementById('longitud');
const longitudUnidad = document.getElementById('longitud-unidad');
const amplitudUnidad = document.getElementById('amplitud-unidad');

function calcular() {

    const medio = document.getElementById('selectMedio');
    document.getElementById('tituloPrin').style.display = 'none';
    document.getElementById('tituloSecun').style.display = 'block';

    let tituloMedio;


    let tipoOnda;

    let velocidad;
    let valorMedio = medio.value;


    let valorFrecuencia = frecuencia.value;

    let valorPeriodo = 1 / valorFrecuencia;

    let longitudValue = longitud.value;
    let unidadLongitud = longitudUnidad.value;
    let valorLongitud;

    if (unidadLongitud === "cm") {
        valorLongitud = longitudValue / 100;
    } else {
        valorLongitud = longitudValue;
    }

    let numeroOnda = 2 * Math.PI / valorLongitud;

    let frecuenciaAngular = 2 * Math.PI * valorFrecuencia;

    let amplitudValue = amplitud.value;
    let amplitudUnid = amplitudUnidad.value;
    let valorAmplitud;

    if (amplitudUnid === "cm") {
        valorAmplitud = amplitudValue / 100;
    } else {
        valorAmplitud = amplitudValue;
    }

    console.log(valorFrecuencia);

    // Validación de campos
    if (!valorFrecuencia || !valorLongitud || !valorAmplitud) {
        alert('Todos los campos son obligatorios.');
        return;
    } else if (valorFrecuencia <= 0 || valorLongitud <= 0 || valorAmplitud <= 0) {
        alert('Todos los valores deben ser mayores a 0.');
        return;
    } else if (medio.selectedIndex === 0) { // Suponiendo que el primer valor es una opción no válida o un placeholder
        alert('Por favor, selecciona un medio válido.');
        return;
    } else {
        // Ocultar la sección de entrada de datos y mostrar la sección de resultados
        document.getElementById('input-container').style.display = 'none';
        document.getElementById('results-container').style.display = 'block';
    }


    let Y, p; // Y modulo de young p densidad

    switch (valorMedio) {
        case '1':
            // Formula para el aire √γRT
            tituloMedio = 'el Aire';
            let y = 1.4; // relacion de calores especificos del aire 
            let R = 8.314 //constante universal de los gases J/mol·K
            let TC = 20;// Temperatura en Celsius
            let TK = TC + 273.15; // Convertir la temperatura de celsius a kelvin
            velocidad = Math.sqrt(y * R * TK);
            tipoOnda = 'Onda longitudinal';

            graficaOndaLongitudinal(valorFrecuencia, valorLongitud, valorAmplitud);
            break;
        case '2':
            // Formula para el agua salada v = √(g * λ / (2 * π * ρ)) 
            tituloMedio = 'Agua salada';

            let g = 9.81; //m/s^2
            let densidad = 1000;
            velocidad = Math.sqrt((g * valorLongitud) / (2 * Math.PI * densidad));
            tipoOnda = 'Onda longitudinal';

            graficaOndaLongitudinal(valorFrecuencia, valorLongitud, valorAmplitud);

            break;
        case '3':
            // Formula para el agua dulce v = √(g * λ / (2 * π * ρ)) 

            tituloMedio = 'Agua dulce';

            let g2 = 9.81;
            let densidad2 = 1025;
            velocidad = Math.sqrt((g2 * valorLongitud) / (2 * Math.PI * densidad2));
            tipoOnda = 'Onda longitudinal';

            graficaOndaLongitudinal(valorFrecuencia, valorLongitud, valorAmplitud);

            break;
        case '4':

            tituloMedio = 'el Acero';

            //Velocidad del acero √young/densidad

            Y = 200e9;
            p = 7850;
            velocidad = Math.sqrt(Y / p);
            tipoOnda = 'Onda transversal';

            graficaOndaTransversal(valorFrecuencia, valorLongitud, valorAmplitud);

            break;
        case '5':

            tituloMedio = 'el Vidrio';

            // velocidad del vidrio √young/densidad
            Y = 80e9;
            p = 2500;
            velocidad = Math.sqrt(Y / p);
            tipoOnda = 'Onda transversal';

            graficaOndaTransversal(valorFrecuencia, valorLongitud, valorAmplitud);

            break;
        case '6':
            tituloMedio = 'el Cobre';
            // velocidad del cobre √young/densidad
            Y = 117e9;
            p = 8960;
            velocidad = Math.sqrt(Y / p);
            tipoOnda = 'Onda transversal';

            graficaOndaTransversal(valorFrecuencia, valorLongitud, valorAmplitud);

            break;
        case '7':
            tituloMedio = 'el Aluminio';
            // velocidad del aluminio √young/densidad
            Y = 11e6;
            p = 2700;
            velocidad = Math.sqrt(Y / p);
            tipoOnda = 'Onda transversal';

            graficaOndaTransversal(valorFrecuencia, valorLongitud, valorAmplitud);

            break;
        case '8':
            tituloMedio = 'el Hormigón';
            // velocidad del Hormigón √young/densidad
            Y = 30e9;
            p = 2400;
            velocidad = Math.sqrt(Y / p);
            tipoOnda = 'Onda longitudinal';

            graficaOndaLongitudinal(valorFrecuencia, valorLongitud, valorAmplitud);

            break;
        case '9':
            tituloMedio = 'la Madera (Pino)';
            // velocidad de la Madera (Pino) √young/densidad
            Y = 10e9;
            p = 500;
            velocidad = Math.sqrt(Y / p);
            tipoOnda = 'Onda longitudinal';

            graficaOndaLongitudinal(valorFrecuencia, valorLongitud, valorAmplitud);
            break;
        case '10':
            tituloMedio = 'el Plástico';
            // velocidad del Plástico √young/densidad
            Y = 1e9;
            p = 950;
            velocidad = Math.sqrt(Y / p);
            tipoOnda = 'Onda longitudinal';

            graficaOndaLongitudinal(valorFrecuencia, valorLongitud, valorAmplitud);
            break;
        default:
            console.log("Ocurrió un error");
            break;
    }

    // Mostrar resultados
    document.getElementById('tituloTipo').innerText = `${tituloMedio} `;
    document.getElementById('tipoOndaOn').innerText = `${tipoOnda} `;
    document.getElementById('frecuencia-resultado').innerText = `${valorFrecuencia} Hz`;
    document.getElementById('longitud-resultado').innerText = `${valorLongitud} m`;
    document.getElementById('amplitud-resultado').innerText = `${valorAmplitud} m`;
    document.getElementById('periodo-resultado').innerText = `${valorPeriodo.toFixed(3)} s`;
    document.getElementById('numeroOnda-resultado').innerText = `${numeroOnda.toFixed(3)} m⁻¹`;
    document.getElementById('frecuenciaAngular-resultado').innerText = `${frecuenciaAngular.toFixed(3)} s`;
    document.getElementById('velocidad-resultado').innerText = `${velocidad.toFixed(4)} m/s`;

}

function graficaOndaTransversal(frecuencia, longitudOnda, amplitud) {


    const canvas = document.getElementById("grafica");
    const ctx = canvas.getContext("2d");


    const datos = {
        labels: [],
        datasets: [
            {
                label: "Onda",
                data: [],
                borderColor: "blue",
                fill: false,
            },
        ],
    };

    // Calcular los puntos de la onda
    const periodoOnda = 1 / frecuencia;
    const incrementoTiempo = periodoOnda / 100; // 100 puntos por periodo
    const numPeriodos = 4; // Graficar 4 periodos

    for (let t = 0; t < numPeriodos * periodoOnda; t += incrementoTiempo) {
        const x = (t / periodoOnda) * longitudOnda;
        const y = amplitud * Math.sin(2 * Math.PI * (x / longitudOnda));
        datos.labels.push(t.toFixed(2));
        datos.datasets[0].data.push(y);
    }

    // Crear la gráfica
    new Chart(ctx, {
        type: "line",
        data: datos,
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Tiempo (s)",
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: "Amplitud (m)",
                    },
                },
            },
        },
    });
}

function graficaOndaLongitudinal(frecuencia, longitud, amplitud) {
    const canvas = document.getElementById("grafica");
    const ctx = canvas.getContext("2d");

    const datos = {
        labels: [],
        datasets: [
            {
                label: "Desplazamiento",
                data: [],
                borderColor: "blue",
                fill: false,
            }
        ],
    };

    // Calcular los puntos de la onda
    const incrementoPosicion = longitud / 100; // 100 puntos en la longitud de onda
    const numOndas = 4; // Graficar 4 ondas completas

    for (let x = 0; x <= numOndas * longitud; x += incrementoPosicion) {
        const t = 0;
        const y = amplitud * Math.sin(2 * Math.PI * (frecuencia * t - x / longitud));
        datos.labels.push(x.toFixed(2));
        datos.datasets[0].data.push(y);
    }

    // Crear la gráfica
    new Chart(ctx, {
        type: "line",
        data: datos,
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Posición (m)",
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: "Desplazamiento (m)",
                    },
                },
            },
        },
    });
}