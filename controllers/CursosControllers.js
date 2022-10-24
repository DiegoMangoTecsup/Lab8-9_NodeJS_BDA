var mongoose = require('mongoose');
var Curso = require("../models/Curso");

var cursoController = {};

cursoController.list = function(req, res){
    
    Curso.find({}).exec(function(err, resultado){
        if( err ){ console.log('Error: ', err); return; }
        console.log("The INDEX");
        res.render('../views/curso/index',{cursos: resultado,titulo:'INDEX'} );
        
    });
    
};

cursoController.show = function(req, res){
    Curso.findOne({_id: req.params.id}).exec(function(err, curso){
        if( err ){ console.log('Error: ', err); return; }
        
        res.render('../views/curso/show', {curso: curso} );
    });
    
};

cursoController.create = function(req, res){
    res.render('../views/curso/create');
};

cursoController.save = function(req, res){
    var curso = new Curso( req.body );
    
    curso.save(function(err){
        if( err ){ console.log('Error: ', err); return; }
        
        console.log("Successfully created a curso. :)");
        res.redirect("/cursos/show/"+curso._id);
        //res.redirect("");
    });
};

cursoController.edit = function(req, res) {
  Curso.findOne({_id: req.params.id}).exec(function (err, curso) {
    if (err) { console.log("Error:", err); return; }
    
    res.render("../views/curso/edit", {curso: curso});
    
  });
};

cursoController.update = function(req, res){
    Curso.findByIdAndUpdate( req.params.id, {$set: {
        curso: req.body.curso,
        fecha_inscripcion: req.body.fecha_inscripcion,
        mensualidad: req.body.mensualidad,
    }}, { new: true },
    function( err, curso){
        if( err ){ 
            console.log('Error: ', err); 
            res.render('../views/curso/edit', {curso: req.body} );
        }
        
        console.log( curso );
        
        res.redirect('/cursos/show/' + curso._id);
        
    });
};

cursoController.delete = function(req, res){
    
    Curso.remove({_id: req.params.id}, function(err){
        if( err ){ console.log('Error: ', err); return; }
        
        console.log("Curso deleted!");
        res.redirect("/cursos");
    });
    
};

module.exports = cursoController;