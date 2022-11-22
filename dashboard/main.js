$(document).ready(function(){
    tablaPersonas = $("#tablaPersonas").DataTable({
       "columnDefs":[{
        "targets": -1,
        "data":null,
        "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btnEditar'>Cargar</button>"  
       }],
       //<button class='btn btn-danger btnBorrar'>Borrar</button></div></div>
    "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sSearch": "Buscar:",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast":"Último",
                "sNext":"Siguiente",
                "sPrevious": "Anterior"
             },
             "sProcessing":"Procesando...",
        }
    });
    
$("#btnNuevo").click(function(){
    $("#formPersonas").trigger("reset");
    $(".modal-header").css("background-color", "#1cc88a");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Nueva Persona");            
    $("#modalCRUD").modal("show");        
    id=null;
    opcion = 1; //alta
});    
    
var fila; //capturar la fila para editar o borrar el registro  
//botón EDITAR    
$(document).on("click", ".btnEditar", function(){
    fila = $(this).closest("tr");
    id = parseInt(fila.find('td:eq(0)').text());
    cedula = fila.find('td:eq(1)').text();
    sede = fila.find('td:eq(2)').text();
    nombre = fila.find('td:eq(3)').text();
    cargo = fila.find('td:eq(4)').text();
    area = fila.find('td:eq(5)').text();
    evento = fila.find('td:eq(6)').text();
    //signature=fila.find('td:eq(6)').text();
    //area = parseInt(fila.find('td:eq(5)').text());
    
    $("#id").val(id);
    $("#cedula").val(cedula);
    $("#sede").val(sede);
    $("#nombre").val(nombre);
    $("#cargo").val(cargo);
    $("#area").val(area);
    $("#evento").val(evento);
   // $("#signature").val(signatur);
    opcion = 2; //editar
    $(".modal-header").css("background-color", "#4e73df");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Editar Persona");            
    $("#modalCRUD").modal("show");  
    
});

var limpiar = document.getElementById("limpiar");
limpiar.addEventListener("click",function(){
	canvas.width=canvas.width;
},false);
//botón BORRAR
/*$(document).on("click", ".btnBorrar", function(){    
    fila = $(this);
    id = parseInt($(this).closest("tr").find('td:eq(0)').text());
    opcion = 3 //borrar
    var respuesta = confirm("¿Está seguro de eliminar el registro: "+id+"?");
    if(respuesta){
        $.ajax({
            url: "bd/crud.php",
            type: "POST",
            dataType: "json",
            data: {opcion:opcion, id:id},
            success: function(){
                tablaPersonas.row(fila.parents('tr')).remove().draw();
            }
        });
    }   
});*/

$("#formPersonas").submit(function(e){
    e.preventDefault();  
    id = $.trim($("#id").val());  
    cedula = $.trim($("#cedula").val());
    sede = $.trim($("#sede").val());
    nombre = $.trim($("#nombre").val());  
    cargo = $.trim($("#cargo").val());
    area = $.trim($("#area").val());
    evento = $.trim($("#evento").val());
    var canvas = document.getElementById('the_canvas');
    const signatur = canvas.toDataURL("image/png");
    const hoy = new Date();

      function formatoFecha(fecha, formato) {
	//
     }

     formatoFecha(hoy, 'dd/mm/yy');
     //console.log(signatur);
   // signature = $.trim($("#signature").val());  
    $.ajax({
        url: "bd/crud.php",
        type: "POST",
        dataType: "json",
        data: {cedula:cedula, sede:sede,nombre:nombre, cargo:cargo, area:area, signatur:signatur,fecha:hoy,evento:evento, id:id, opcion:opcion},
        success: function(data){  
            console.log(data);
           // id = data[0].id;   
            cedula = data[0].cedula;
            sede = data[0].sede;
            nombre = data[0].nombre;         
            cargo = data[0].cargo;
            area = data[0].area;
            signature = data[0].signature;
            evento = data[0].evento;
            if(opcion == 1){tablaPersonas.row.add([id,cedula,sede,nombre,cargo,area,signatur,hoy,evento]).draw();}
            else{tablaPersonas.row(fila).data([id,cedula,sede,nombre,cargo,area,signatur,hoy,evento]).draw();} 
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);           
        }        
    });
    $("#modalCRUD").modal("hide");    

});    
    
});