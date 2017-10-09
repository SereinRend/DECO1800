var map;
var MiningMarkers = [];
var ConvictMarkers = [];
var PhotoMarkers = [];
var PictureMarkers = [];

      function initMap() {

        var uluru = {lat: -25.363, lng: 131.044};

        map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru
        });
      }

     function createMarker(domElm, latlongStr, catalogue) {

  //repurposed from JscripFromFlickr.js
  var locDetails = latlongStr.split(',')

  var latStr = locDetails[0]
  var longStr = locDetails[1]
  
      //convert string to float
      recordLat = parseFloat(latStr);
      recordLon = parseFloat(longStr);

      var myLatlng = {lat: recordLat, lng: recordLon};
      
      //where we will save the marker temporarily
      var marker = new google.maps.Marker({
              position: myLatlng,
              map: map
              });

      if (catalogue == "Mining"){
      MiningMarkers.push(marker);
      }
      if (catalogue == "Photo"){
      PhotoMarkers.push(marker);
      }
      if (catalogue == "Picture"){
      PictureMarkers.push(marker);
      }
      if (catalogue == "Convict"){
      ConvictMarkers.push(marker);
      }

}

      function setMapOnMining(map) {
        for (var i = 0; i < MiningMarkers.length; i++) {
          MiningMarkers[i].setMap(map);
        }
      }

      function clearMiningMarkers() {
        setMapOnMining(null);
      }

      // Shows any markers currently in the array.
      function showMiningMarkers() {
        setMapOnMining(map);
      }

      function setMapOnPhoto(map) {
        for (var i = 0; i < PhotoMarkers.length; i++) {
          PhotoMarkers[i].setMap(map);
        }
      }

      function clearPhotoMarkers() {
        setMapOnPhoto(null);
      }

      // Shows any markers currently in the array.
      function showPhotoMarkers() {
        setMapOnPhoto(map);
      }

      function setMapOnConvict(map) {
        for (var i = 0; i < ConvictMarkers.length; i++) {
          ConvictMarkers[i].setMap(map);
        }
      }

      function clearConvictMarkers() {
        setMapOnConvict(null);
      }

      // Shows any markers currently in the array.
      function showConvictMarkers() {
        setMapOnConvict(map);
      }

      function setMapOnPicture(map) {
        for (var i = 0; i < PictureMarkers.length; i++) {
          PictureMarkers[i].setMap(map);
        }
      }

      function clearPictureMarkers() {
        setMapOnPicture(null);
      }

      // Shows any markers currently in the array.
      function showPictureMarkers() {
        setMapOnPicture(map);
      }

      function checkcata(){
          if ($("#Mining").prop("checked")){
           showMiningMarkers();
         }else{
           clearMiningMarkers();
         }

          if ($("#Photo").prop("checked")){
           showPhotoMarkers();
         }else{
           clearPhotoMarkers();
         }

          if ($("#Convict").prop("checked")){
           showConvictMarkers();
         }else{
           clearConvictMarkers();
         }

          if ($("#Picture").prop("checked")){
           showPictureMarkers();
         }else{
           clearPictureMarkers();
         }
      }


     //convict records

      function convicts(convict_data) {

        console.log(convict_data);

        $.each(convict_data.result.records, function(recordKey, recordValue) {

          var recordTitle = recordValue['ConvictName'];
          var recordYear = recordValue['DateofDeparture'];
          var recordPlace = recordValue['PlaceofArrival'];
          var recordShip = recordValue['Vessel'];
          

          if(recordTitle && recordYear && recordPlace && recordShip) {


             var newConvictElement = $('#convict_records').append(
                
                  $('<h2>').text(recordTitle),
                  $('<h3>').text(recordYear),
                  $('<p>').text(recordPlace),
                  $('<p>').text(recordShip)
                
              );

              if(recordPlace == "Van Diemen's Land.") {

                recordGPS = "-41.640079, 146.315918"
              }
              if(recordPlace == "New South Wales.") {
                recordGPS = "-31.840233, 145.612793"
              }
              if(recordPlace == "Western Australia.") {
                recordGPS = "-25.760321, 122.805176"
              }
              if(recordPlace == "Moreton Bay.") {
                recordGPS = "-27.470125, 153.021072"
              }
              if(recordPlace == "Van Diemen's Land and Norfolk Island.") {
                recordGPS = "-29.05459, 167.96628"
              }
              if(recordPlace == "Port Phillip [convicts did not disembark at Port Phillip, but were sent on to Sydney].") {
                recordGPS = "-38.0065, 145.0863"
              }


              var catalogue = "Convict"
              createMarker(newConvictElement, recordGPS, catalogue);

              clearConvictMarkers();

                         

          }

        });

        

      }

      

      //photos 1914-1918

      function photos(photos_data) {

        console.log(photos_data);

        $.each(photos_data.result.records, function(recordKey, recordValue) {

          var recordImage = recordValue['150_pixel'];
          var recordYear = recordValue['temporal'];
          var recordPlace = recordValue['spatial'];
          

          if(recordImage && recordYear && recordPlace) {


              var newPhotoElement = $('#photo_records').append(
                
                  $('<img>').attr('src', recordImage),
                  $('<h3>').text(recordYear),
                  $('<p>').text(recordPlace)
                
              );

              if(recordPlace.includes(';')) {
                var recordPlaceSplit = recordPlace.split('; ');
                var recordGPS = recordPlaceSplit[1];

             var catalogue = "Photo"
             createMarker(newPhotoElement, recordGPS, catalogue ); 
             clearPhotoMarkers();


              }

                           

          }

        });

        

      }

      //Queensland pictures

      function pictures(pictures_data) {

        console.log(pictures_data);

        $.each(pictures_data.result.records, function(recordKey, recordValue) {

          var recordImage = recordValue['150_pixel_jpg'];
          var recordDesc = recordValue['dc:description'];
          var recordYear = recordValue['dcterms:temporal'];
          var recordPlace = recordValue['dcterms:spatial'];
          

          if(recordImage && recordDesc && recordYear && recordPlace) {


              var newPictureElement = $('#picture_records').append(
                
                  $('<img>').attr('src', recordImage),
                  $('<h3>').text(recordDesc),
                  $('<p>').text(recordYear),
                  $('<p>').text(recordPlace)
                
              );

              if(recordPlace.includes(';')) {
                var recordPlaceSplit = recordPlace.split('; ');
              var recordGPS = recordPlaceSplit[1];

              var catalogue = "Picture"
              createMarker(newPictureElement, recordGPS, catalogue);
              }

              clearPictureMarkers();

              



          }

        });

        

      }

      //mining accidents

      function mining(mining_data) {

        console.log(mining_data);

        $.each(mining_data.result.records, function(recordKey, recordValue) {

          var recordTitle = recordValue['Name Of Mine'];
          var recordYear = recordValue['Date'];
          var recordPlace = recordValue['Geo-subject'];
          var recordRemarks = recordValue['Remarks'];
          var recordLatLong = recordValue['Latitude'];
          

          if(recordTitle && recordYear && recordPlace && recordRemarks) {
        var newDomElm = $('#mining_records').append(
            $('<h2>').text(recordTitle),
            $('<h3>').text(recordYear),
            $('<p>').text(recordPlace),
            $('<p>').text(recordRemarks),
            $('<p>').text(recordLatLong),
        );
       
        var catalogue = "Mining"
              

              //create a marker
        createMarker(newDomElm,recordLatLong, catalogue);    
        clearMiningMarkers();       

          }

        });

        

      }

      

      $(document).ready(function() {

        

          


            //convict arrivals

          var convict_data = {
            resource_id: '6ab35f9a-e476-4d29-84de-2e18d1e704c7',
            limit: 100
          }

          $.ajax({
            url: 'http://data.gov.au/api/action/datastore_search',
            data: convict_data,
            dataType: 'jsonp',
            cache: true,
            success: function(convict_data) {
              convicts(convict_data);
              convict_data = JSON.stringify(convict_data);
              
              console.log('From API');
            }
          });

        //photos 1914-1918

          var photos_data = {
            resource_id: '26b0b235-13f0-4132-ae47-5ccf3d1c8e89',
            limit: 100
          }

          $.ajax({
            url: 'http://data.gov.au/api/action/datastore_search',
            data: photos_data,
            dataType: 'jsonp',
            cache: true,
            success: function(photos_data) {
              photos(photos_data);
              photos_data = JSON.stringify(photos_data);
              
              console.log('From API');
            }
          });

          //Queensland pictures

          var pictures_data = {
            resource_id: '9913b881-d76d-43f5-acd6-3541a130853d',
            limit: 100
          }

          $.ajax({
            url: 'http://data.gov.au/api/action/datastore_search',
            data: pictures_data,
            dataType: 'jsonp',
            cache: true,
            success: function(pictures_data) {
              pictures(pictures_data);
              pictures_data = JSON.stringify(pictures_data);
              
              console.log('From API');
            }
          });

          //mining accidents
          var mining_data = {
            resource_id: '63fd8050-0bab-4c04-b837-b2ce664077bf',
            limit: 100
          }

          $.ajax({
            url: 'http://data.gov.au/api/action/datastore_search',
            data: mining_data,
            dataType: 'jsonp',
            cache: true,
            success: function(mining_data) {
              mining(mining_data);
              mining_data = JSON.stringify(mining_data);
              
              console.log('From API');
            }
          });

           

          

        

      });
