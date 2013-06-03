function mmg_google_docs_spreadsheet_1(id, callback) {
    if (typeof reqwest === 'undefined'){
        throw 'CSV: reqwest required for mmg_csv_url';
    }

    var url = 'https://spreadsheets.google.com/feeds/list/' +
        id + '/od6/public/values?alt=json-in-script&callback=callback';
    reqwest({
        url: url,
        type: 'jsonp',
        jsonpCallback: 'callback',
        success: response,
        error: response
    }); 
   
   
    function response(x) {
        var features = [],
            latfield = '',
            lonfield = '';
        if (!x || !x.feed) return features;

        for (var f in x.feed.entry[0]) {
            if (f.match(/\$Lat/i)) latfield = f;
            if (f.match(/\$Lon/i)) lonfield = f;
        }

        for (var i = 0; i < x.feed.entry.length; i++) {
            var entry = x.feed.entry[i];
            var feature = {
            	type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: []
                },
                properties: {
                }
            };
            for (var y in entry) {
                if (y === latfield) feature.geometry.coordinates[1] = parseFloat(entry[y].$t);
                else if (y === lonfield) feature.geometry.coordinates[0] = parseFloat(entry[y].$t);
                else if (y.indexOf('gsx$') === 0) {
                    feature.properties[y.replace('gsx$', '')] = entry[y].$t;
                }
            }
            if (feature.geometry.coordinates.length == 2) features.push(feature);
	    
	    _.each(feature, function(value, key) {
                if(feature.properties['gravedad']=="Baja"){ feature.properties['marker-color']='#FFFF00'} 
                if(feature.properties['gravedad']=="Media"){ feature.properties['marker-color']='#FFA500'} 
                if(feature.properties['gravedad']=="Alta"){ feature.properties['marker-color']='#FF0000'} 
                if(feature.properties['gravedad']=="Muy alta"){ feature.properties['marker-color']='#000000'} 
            });
        }

        return callback(features);
    }    
}


//function for get data from spreadsheet "resumen"

function mmg_google_docs_spreadsheet_2(id, callback) {
    if (typeof reqwest === 'undefined'){
        throw 'CSV: reqwest required for mmg_csv_url';
    }
    var url = 'https://spreadsheets.google.com/feeds/list/' +
        id + '/od7/public/values?alt=json-in-script&callback=callback';
    reqwest({
        url: url,
        type: 'jsonp',
        jsonpCallback: 'callback',
        success: response,
        error: response
    }); 
   
    function response(x) {
        var features_summary = [];
        if (!x || !x.feed) return features_summary; 
        for (var i = 0; i < x.feed.entry.length; i++) {                               
            var entry = x.feed.entry[i];
            var feature_summary = {
                properties: {                    
                    'tipo_incidente': entry['gsx$tipoincidente'].$t,
                    'cantidad_type': parseInt(entry['gsx$cantidadtype'].$t),  
               }
            };

            features_summary.push(feature_summary);

        }

        return callback(features_summary);
    }
}