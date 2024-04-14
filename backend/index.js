import express from "express"; //Se importa el módulo express, que es un marco de aplicación web para Node.js que permite manejar peticiones HTTP, rutas, middleware, etc.
import { PORT, mongoDBURL } from "./config.js"; //Se importa la constante PORT del archivo config.js, lo que significa que estás utilizando el puerto definido en ese archivo para configurar tu servidor.
import mongoose from 'mongoose';

const app = express(); //Se crea una instancia de una aplicación Express llamada app.


/*
app.get('/' ...:  Define una ruta de tipo GET en la aplicación Express. Especifica que cuando se realice una petición HTTP GET 
a la raíz del servidor (denotada por '/'), se ejecutará la función callback proporcionada.

(request, response) => { ...: Es la función callback que maneja la petición. Recibe dos argumentos: request y response. 
request contiene información sobre la petición HTTP, como encabezados (headers), parámetros, cuerpo del mensaje, etc. 
response se utiliza para construir y enviar la respuesta HTTP al cliente.

console.log(request): Imprime el objeto request completo en la consola del servidor. Esto es útil para depuración, 
ya que puedes ver todos los detalles de la petición entrante, pero en un entorno de producción, imprimiría mucha información 
y podría considerarse una mala práctica debido a problemas de rendimiento y seguridad.

return response.status(234).send('Vamos Team Meli'): Envía una respuesta al cliente con un estado HTTP de 234 y el 
texto 'Vamos Team Meli' como cuerpo de la respuesta.
*/

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Omar mi padre')
});

/*
Finalmente, le dices a la aplicación Express que empiece a escuchar en el puerto definido por la constante PORT. 
Cuando el servidor comience a escuchar en ese puerto, se ejecutará una función de callback que, en este caso, imprime 
un mensaje en la consola indicando que el servidor está funcionando y escuchando en el puerto especificado.
*/

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch(() => {
        console.log(error);
    });