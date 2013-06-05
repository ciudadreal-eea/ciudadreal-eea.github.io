$(function(){
    //Set up date pickers
//    var now = new Date();
//    now = now.getDate()  + '/' +  now.getMonth() + '/' + now.getFullYear();
//    $('#entry_8').datepicker({
//        dateFormat: 'dd/mm/yy', // formato de fecha que se usa en España
//        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado'], // días de la semana
//        dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'], // días de la semana (versión super-corta)
//        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'], // días de la semana (versión corta)
//        firstDay: 1, // primer día de la semana (Lunes)
//        maxDate: new Date(), // fecha máxima
//        minDate: '-2y',
//        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'], // meses
//        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'], // meses
//        navigationAsDateFormat: true,
//    });

    //Add href and disable some fields
    $('form').attr('action','https://docs.google.com/spreadsheet/formResponse?formkey=dEtSRl9FYUFlVTQ0TVpKVkFkZnlCR3c6MQ&amp;theme=0AX42CRMsmRFbUy1iYTQxMmQyMy02N2Q1LTRmYjUtYmJiMS0yZGZlZTExMGVlZWU&amp;ifq');
});


function Valida(formulario){
    //Selected the list and renplace wit "_"
//    var typeincidente=$('#entry_0 option:selected').text().replace(/\s/g,"_");
//    var getdate=$('#entry_1').val().split("/");

    if ($("#entry_0").val().length==0) {
        alert("Introduzca el título de la agresión");
        return false;
    } else if ($("#entry_3").val().length==0 ) {
        alert("Introduzca la descripción breve de la agresión");
        return false;
    } else if ($("#entry_2").val().length==0 ) {
        alert("Introduzca la latitud de la agresión");
        return false;
    } else if ($("#entry_10").val().length==0 ) {
        alert("Introduzca la longitud de la agresión");
        return false;
    } else if ($("#entry_3").val().length>800 ) {
        alert("El número máximo de caracteres para la descripción breve es de 800. Puedes utilizar la descripción detallada para escribir más.");
        return false;
    } else {
        return true;
    }

}
