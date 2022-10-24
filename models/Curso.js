var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CursoSchema = new Schema({
    curso: {type: String, required: true, max: 20},
    fecha_inscripcion: {type: String, required: true, max: 20},
    mensualidad: {type: String, required: true},
});

module.exports = mongoose.model('Curso', CursoSchema);