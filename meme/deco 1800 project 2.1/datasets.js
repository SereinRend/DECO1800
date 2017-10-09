var map;
var markerCluster = new MarkerClusterer(map, marker,
            {imagePath: 'markerimg'});

     function createMarker(domElm, latlongStr) {

  
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

      
  

}

     //soldier portraits

      function soldiers(soldier_data) {

        console.log(soldier_data);

        $.each(soldier_data.result.records, function(recordKey, recordValue) {

          var recordTitle = recordValue['Full name (from National Archives of Australia)'];
          var recordYear = recordValue['Temporal'];
          var recordImage = recordValue['Thumbnail image'];
          

          if(recordTitle && recordYear && recordImage) {


              $('#soldier_records').append(
                
                  $('<h2>').text(recordTitle),
                  $('<h3>').text(recordYear),
                  $('<img>').attr('src', recordImage)
                
              );

                         

          }

        });

        

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


              $('#convict_records').append(
                
                  $('<h2>').text(recordTitle),
                  $('<h3>').text(recordYear),
                  $('<p>').text(recordPlace),
                  $('<p>').text(recordShip)
                
              );

                         

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

             createMarker(newPhotoElement, recordGPS); 


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
                var recordPlaceSplit = recordPlace.split(',');
              var recordGPS = recordPlaceSplit[1];

              createMarker(newPictureElement, recordGPS);
              }

              



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
       

              

              //create a marker
        createMarker(newDomElm,recordLatLong);           

          }

        });

        

      }

      

      $(document).ready(function() {

        //soldier records

        

        

          
          var soldier_data = {
            resource_id: 'cf6e12d8-bd8d-4232-9843-7fa3195cee1c',
            limit: 100
          }
          
            
          

          $.ajax({
            url: 'http://data.gov.au/api/action/datastore_search',
            data: soldier_data,
            dataType: 'jsonp',
            cache: true,
            success: function(soldier_data) {
              soldiers(soldier_data);
              soldier_data = JSON.stringify(soldier_data);
              //localStorage.setItem('slqData', data);
              console.log('From API');
            }
          });

          


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
