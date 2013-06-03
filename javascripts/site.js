var data_id = '0Aj7zn-PTgttkdEtSRl9FYUFlVTQ0TVpKVkFkZnlCR3c',
    map_id = 'ciudadreal-eea.map-j969i073',
    markerLayer,
    features,
    features_summary,
    interaction,
    map = L.mapbox.map('map', map_id),
    a_tipo = [],
    a_agua = [],
    a_atmosfera = [],
    a_caminos = [],
    a_fauna = [],
    a_flora = [],
    a_paisaje = [],
    a_patrimonio = [],
    a_suelo = [],
    a_otros = [];

mmg_google_docs_spreadsheet_1(data_id, mapData);
map.setView([39.08039479636465,-3.850912890625005],9);
// Add fullscreen
var fullscreenControl = new L.Control.Fullscreen();
fullscreenControl.addTo(map);
// Add map leyend
map.legendControl.addLegend(document.getElementById('legend-content').innerHTML);
L.tileLayer('Ecologistas en Acción de Ciudad Real', {
    attribution: '<a href="http://www.ecologistasenaccion.org/rubrique52.html">Ecologistas en Acción de Ciudad Real</a>'
}).addTo(map);

// add a marker in the given location, attach some popup content to it and open the popup
//L.marker([38.870721,-3.99353]).addTo(map).bindPopup('Aeropuerto de Ciudad Real');


//Listen for individual marker clicks
map.markerLayer.on('click',function(e) {
	var feature = e.layer.feature;
	e.layer.bindPopup('<h3>' + feature.properties.título + '</h3><span style="font-weight:bold">Término municipal: ' + 
			feature.properties.términomunicipal + '</span><br>' +
			'<span style="font-weight:bold">Lugar: ' + feature.properties.lugar + '</span>' +
			'<p><img src="' + feature.properties.foto + '" width="400"></p>', {minWidth: 400});
	var info = '<h2>' + feature.properties.título + '</h2>' +
	'<p>' + feature.properties.descripción + '</p>';
	document.getElementById('info').innerHTML = info;
});

// Clear the tooltip when map is clicked
map.on('click',function(e){
	document.getElementById('info').innerHTML = '';
});



// Build map
function mapData(f) {
    map.markerLayer.setGeoJSON(f);
}

function newMarker() {
    if (window.location.hash == '#new') {
        $('#new').fadeIn('slow');
        window.location.hash = '';
        window.setTimeout(function () {
            $('#new').fadeOut('slow');
        }, 4000);
    }
}

// Get data from spreadsheet "resumen"
mmg_google_docs_spreadsheet_2(data_id, statisticData);

// function get all data from spreadsheet
function statisticData(f) {
    features_summary = f;

    _.each(f, function (value, key) {
        a_tipo_incidente.push(f[key].properties.tipo_incidente);
        a_cantidad_type.push(f[key].properties.cantidad_type);
        a_cantjanuary.push(f[key].properties.cantjanuary);
        a_cantfebruary.push(f[key].properties.cantfebruary);
        a_cantmarch.push(f[key].properties.cantmarch);
        a_cantapril.push(f[key].properties.cantapril);
        a_canmay.push(f[key].properties.canmay);
        a_cantjune.push(f[key].properties.cantjune);
        a_cantjuly.push(f[key].properties.cantjuly);
        a_cantaugust.push(f[key].properties.cantseptember);
        a_cantseptember.push(f[key].properties.cantmarch);
        a_cantoctober.push(f[key].properties.cantoctober);
        a_cantnovember.push(f[key].properties.cantnovember);
        a_cantdecember.push(f[key].properties.cantdecember);

    });
}

// call the fuction from google chart API, for create main statistic box
google.load('visualization', '1', {
    packages: ['corechart']
});
google.setOnLoadCallback(draw_main_box);

// function for draw the main statistic box
function draw_main_box() {
    var data = new google.visualization.DataTable(),
        options = {
            backgroundColor: 'transparent',
            colors: ['#CB3334', '#FFCC33', '#653332', '#CC6633', '#666535', '#222222']
        },
        chart = new google.visualization.PieChart(document.getElementById('img_total_percentage'));

    data.addColumn('string', 'Incidencias');
    data.addColumn('number', 'Porcentaje');
    data.addRows([
        [a_tipo_incidente[0], parseInt(a_cantidad_type[0], 10)],
        [a_tipo_incidente[1], parseInt(a_cantidad_type[1], 10)],
        [a_tipo_incidente[2], parseInt(a_cantidad_type[2], 10)],
        [a_tipo_incidente[3], parseInt(a_cantidad_type[3], 10)],
        [a_tipo_incidente[4], parseInt(a_cantidad_type[4], 10)],
        [a_tipo_incidente[5], parseInt(a_cantidad_type[5], 10)]
    ]);

    chart.draw(data, options);

    // put the total number incident on the view
    $('#num-incident').html('Total de incidentes registrados : ' + a_cantidad_type[6]);
}

// function to draw line for all incidents
function drawIncidents() {
    var data = google.visualization.arrayToDataTable([]);
    var options = {
        title: 'GRAFICO DE LINEA DEL TOTAL DE INCIDENCIAS',
        hAxis: {
            title: 'Meses',
            titleTextStyle: {
                color: '#404040'
            },
            textStyle: {
                color: '#404040',
                fontSize: 13
            }
        },
        vAxis: {
            title: 'Cantidad',
            titleTextStyle: {
                color: '#404040'
            }
        },
        gridlines: {
            color: '#404040',
            count: 5
        },
        backgroundColor: 'transparent'
    };
    var chart = new google.visualization.LineChart(document.getElementById('all_incident_type_statistic'));

    data.addColumn('string', 'Mes');
    data.addColumn('number', 'Total');
    data.addRows([
        ['Enero', a_cantjanuary[6]],
        ['Febrero', a_cantfebruary[6]],
        ['Marzo', a_cantmarch[6]],
        ['Abril', a_cantapril[6]],
        ['Mayo', a_canmay[6]],
        ['Junio', a_cantjune[6]],
        ['Julio', a_cantjuly[6]],
        ['Agosto', a_cantaugust[6]],
        ['Septiembre', a_cantseptember[6]],
        ['Octubre', a_cantoctober[6]],
        ['Noviembre', a_cantnovember[6]]
    ]);

    chart.draw(data, options);
}

// function to draw line by type of incidents
function draw_type_incedent(id_x, i) {
    var data = google.visualization.arrayToDataTable([]);
    var options = {
        title: ' GRAFICO DE LINEA DE TIPO DE INCIDENCIA - ' + id_x.replace('_statistic', "").replace('_', " ").replace('_', " ").toUpperCase(),
        hAxis: {
            title: 'Meses',
            titleTextStyle: {
                color: '#404040'
            },
            textStyle: {
                color: '#404040',
                fontSize: 11
            }
        },
        vAxis: {
            title: 'Cantidad',
            titleTextStyle: {
                color: '#404040'
            }
        },
        gridlines: {
            color: '#404040',
            count: 4
        },
        backgroundColor: 'transparent'
    };
    var chart = new google.visualization.LineChart(document.getElementById(id_x));

    data.addColumn('string', 'Mes');
    data.addColumn('number', 'Cantidad');
    data.addRows([
        ['Enero', a_cantjanuary[i]],
        ['Febrero', a_cantfebruary[i]],
        ['Marzo', a_cantmarch[i]],
        ['Abril', a_cantapril[i]],
        ['Mayo', a_canmay[i]],
        ['Junio', a_cantjune[i]],
        ['Julio', a_cantjuly[i]],
        ['Agosto', a_cantaugust[i]],
        ['Septiembre', a_cantseptember[i]],
        ['Octubre', a_cantoctober[i]],
        ['Noviembre', a_cantnovember[i]]
    ]);
    chart.draw(data, options);
}

// function for put href for download data
function download_data() {
    $('#download_csv').attr('href', 'https://docs.google.com/a/developmentseed.org/spreadsheet/pub?key=' + data_id + '&output=csv');
    $('#download_josn').attr('href', 'https://spreadsheets.google.com/feeds/list/' + data_id + '/od6/public/values?alt=json-in-script');
}

$(document).ready(function () {

    var $typesMenu = $('#types'),
        $causesMenu = $('#causes');
    
    // get event click on menu causes
    $causesMenu.on('click', 'a', function (e) {
        var id_causes = e.target.id;

        //check if click is on all causes
        if (id_causes === 'Todas_causas') {
            //renove all active class
            $causesMenu.find('a').removeClass('active');
            //put in here the active class
            $('#' + id_causes).addClass('active');

            if ($typesMenu.find('.active').attr('id') !== 'Todas') {
            	map.markerLayer.setFilter(function(f) {
            		return f.properties['tipo'].indexOf($typesMenu.find('.active').attr('id')) !== -1;
            	});
            } else {
            	map.markerLayer.setFilter(function(f) {
            		return true;
                });
            }
        } else {
            $causesMenu.find('a').removeClass('active');
            $('#' + id_causes).addClass('active');
            // Check if on menu type incident is active option "Todos Incidentes" with id=all_incident_type
            if ($typesMenu.find('.active').attr('id') === 'Todas') {
                //here classified by cause all incidente
                map.markerLayer.setFilter(function(f) {
            		return f.properties['causa'].indexOf($causesMenu.find('.active').attr('id')) !== -1;
            	});
             } else {
                 //here classified by cause and by type of agression
                map.markerLayer.setFilter(function(f) {
             		return f.properties['causa'].indexOf($causesMenu.find('.active').attr('id')) !== -1 && f.properties['tipo'].indexOf($typesMenu.find('.active').attr('id')) !== -1;
             	});
            }
        }
        return false;
    });

    // get event click on menu types
    $typesMenu.find('a').click(function (e) {
        var id_event_type = e.target.id;

        // check is is active on menu type "Mostrar Todos "
        if (id_event_type === 'Todas') {
            $typesMenu.find('a').removeClass('active');
            $('#' + id_event_type).addClass('active');

            // check to enable block where statistics show a cause
            if ($('.close_block_stac').css('display') === 'block') {
                $('.statistic_by_month').attr('id', 'all_incident_type_statistic');
                // draw the graphics statistic
                drawIncidents();
                google.setOnLoadCallback(drawIncidents);
            }

            if ($causesMenu.find('.active').attr('id') !== 'todas_causas') {
            	map.markerLayer.setFilter(function(f) {
            		return f.properties['causa'].indexOf($causesMenu.find('.active').attr('id')) !== -1;
            	});
            } else {
            	map.markerLayer.setFilter(function(f) {
            		return true;
                });
            }
        } else {
        	$typesMenu.find('a').removeClass('active');
            $('#' + id_event_type).addClass('active');
            // check if is active in menu causes "Todas_causas"
            if ($causesMenu.find('.active').attr('id') == 'Todas_causas') {
                map.markerLayer.setFilter(function(f) {
             		return f.properties['tipo'].indexOf($typesMenu.find('.active').attr('id')) !== -1;
             	});
            } else {
                map.markerLayer.setFilter(function(f) {
             		return f.properties['causa'].indexOf($causesMenu.find('.active').attr('id')) !== -1 && f.properties['tipo'].indexOf($typesMenu.find('.active').attr('id')) !== -1;
             	});
            }

            // agrega una id para mostrar la imagen ejem id=Robo_statistic
            $('.statistic_by_month').attr('id', id_event_type + '_statistic');

            // obtiene el atributo de name , is important for to show what data
			// we want to show
            var number_name = $('#' + id_event_type).attr('data-layer') - 1;
            // draw the graphics statistic by type of incident
            draw_type_incedent(id_event_type + '_statistic', number_name);
            google.setOnLoadCallback(draw_type_incedent);
        }

        return false;
    });

    $('a[href="#opendata"]').click(function (e) {
        $('#backdrop').fadeIn(200);
        $('#opendata, #close').show();
        return false;
    });

    $('a[href="#howto"]').click(function (e) {
        $('#backdrop').fadeIn(200);
        $('#howto, #close').show();
        return false;
    });

    $('#close').click(function (e) {
        $('#backdrop').fadeOut(200);
        $('#opendata, #howto, #close').hide();
        return false;
    });

    $('#arrow_block_inf').click(function (e) {
        $('.block_inf_type').css('display', 'block');
        $('#close_block_inf').show();

        // close other block static
        $('.statistic_by_month').css('display', 'none');
        $('#close_block_stac').css('display', 'none');
        return false;
    });

    $('#close_block_inf').click(function (e) {
        $('.zoomer').show();
        $('.block_inf_type').hide();
        $('#close_block_inf').hide();
        return false;
    });

    // get the click fro close block statistic line
    $('#close_block_stac').click(function () {
        $(this).hide();
        $('.statistic_by_month').css('display','none');
        $('#arrow_show_block').css('display','block');
    });
});
