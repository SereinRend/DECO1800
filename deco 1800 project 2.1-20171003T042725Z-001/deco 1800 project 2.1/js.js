  function iterateRecords(data) {
        console.log(data)

        $.each(data.result.records, function(recordKey, recordValue) {

          var recordLatitude= recordValue['Latitude'];
          var recordLongitude = recordValue['Longitude'];


          if(recordLatitude && recordLongitude) {
              console.log(recordLongitude);

          }

        });

      }

  $(document).ready(function() {
    var data = {
    resource_id: '63fd8050-0bab-4c04-b837-b2ce664077bf', // the resource id
    limit: 6, // get 5 results // query for 'jones'
     };
     $.ajax({
    url: 'http://data.gov.au/api/action/datastore_search',
    data: data,
    dataType: 'jsonp',
    cache: true,
    success: function(data) {
              iterateRecords(data);
              data = JSON.stringify(data);
              localStorage.setItem('slqData', data);
              console.log('From API');
    }
    });

  });
