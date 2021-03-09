import { Testimonial } from '../models/Testimoniales.js';

const guardarTestimoniales = async(req, res) => {

    //validar
    const { nombre, correo, mensaje } = req.body;

    const errores = [];

    if(nombre.trim() === '') {
        errores.push({mensaje: 'El Nombre Esta Vacio'});
    }

    if(correo.trim() === '') {
        errores.push({mensaje: 'El Correo Esta Vacio'});
    }

    if(mensaje.trim() === '') {
        errores.push({mensaje: 'El Mensaje Esta Vacio'});
    }

    if(errores.length > 0){

        //consultar testimoniales existentes
        const testimoniales = await Testimonial.findAll();

        //Mostrar la vista con errores
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        });
    } else {
        // almacenarlo en la base de datos
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            }),
            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error);
        }
    }

}

export {
    guardarTestimoniales
}