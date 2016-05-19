

//data
var myUsers = [1,2,3,4,5,6,7,8,9,10];
var myUsers2 = [];

var cookieUser = {};

var emailSelected = "";



var originURL = document.location.origin; 
$.ajax({url: originURL + '/something', method: 'GET'}).done(function(response){
	console.log(response);
	cookieUser = response;
	$('#cookieName').text(cookieUser.name);
	$('#cookieEmail').text(cookieUser.email);
});
// {
// id: 1,
// name: "Greg",
// Instrument: "Guitar",
// level: "beginner",
// youtube: "https://youtu.be/nNYcRzHKb-g",
// city: "Bound Brook"
// },
// {
// id: 2,
// name: "Mike",
// Instrument: "Guitar// level: "beginner",
// youtube: "https://youtu.be/-ZTvqUvgYCI",
// city: "Bound Brook"
// },
// {
// id: 3,
// name: "Dave",
// Instrument: "Guitar",
// level: "intermediate",
// youtube: "https://youtu.be/gXbPlFgSfao",
// city: "Bound Brook"
// },
// {
// id: 4,
// name: "Tom",
// Instrument: "Guitar",
// level: "intermediate",
// youtube: "https://youtu.be/4WoxLk2g4-w",
// city: "Bound Brook"
// },
// {
// id: 5,
// name: "Jim",
// Instrument: "Guitar",
// level: "expert",
// youtube: "https://youtu.be/CinJuVtdp3Y",
// city: "Bound Brook"
// },
// ];
//home page counter
$('.timer').countTo({   
    from: 0, 
    to: 1205, //myUsers.length,
    speed: 3000,
    refreshInterval: 50,
});
//filter isotope grid
var $isogrid = $('.isogrid')
$isogrid.isotope({
  itemSelector: '.grid-item',
  resizable: false,
  masonry: { columnWidth: $isogrid.width() / 3 }
});
// filter items on button click
$('.filter-button-group').on( 'click', 'button', function() {
  var filterValue = $(this).attr('data-filter');
  //alert($(this).attr('data-filter'));
  $isogrid.isotope({ filter: filterValue });
});
//submit button
$('#searchnow').on('click', function(){

	myUsers2 = [];

    allMarkers = [];
    beginnerMarkers = [];
    intermediateMarkers = [];
    expertMarkers = [];



//send selection
console.log($('#search-inst').val());
console.log($('#search-inst2').val());
console.log($('#search-city').val());
console.log($('#search-genre').val());
// var originURL = document.location.origin;
var queryURL = '/api?';

if ( $('#search-inst').val() != "" ) {
	queryURL += 'instrument=' + $('#search-inst').val();
}

if ( $('#search-inst2').val() != "" ) {
    queryURL += '&instrument=' + $('#search-inst2').val();
}

if ( $('#search-city').val() != "" ) {
    queryURL += '&city=' + $('#search-city').val();
}

if ( $('#search-genre').val() != "" ) {
    queryURL += '&genre=' + $('#search-genre').val();
}

$.ajax({url: originURL + queryURL, method: 'GET'}).done(function(data){
		console.log(data)
		console.log(document.cookie)
        for (var i = 0; i < data.length; i++) {
        	myUsers2.push(data[i]);
        }
        console.log('==== myUswrs2 =====')
        console.log(myUsers2)

        $(".grid-container").html("");
	    for (var i = 0; i < myUsers2.length; i++){
	    var youtubeString = myUsers2[i].sample;
	    var videoId = youtubeString.split('be/')[1];
	    var $newitems = 
	            $('<div class="portfolio-item grid-item' + " " + myUsers2[i].skilllevel + '" id="' + [i] + '" data-youtube="https://www.youtube.com/embed/' + videoId  + '">' +
	                        '<div class="porttopbar' + ' ' + myUsers2[i].skilllevel + '"></div>' +
	                        '<div class="innerport">' +
	                        '<div class="isoimg col-xs-4"><img src="' + myUsers2[i].photo + '"></div>' +
	                        '<div class="isodiv col-xs-8">' +
	                        '<div class="name"><strong>' + myUsers2[i].name + '</strong></div>' +
	                        '<div class="inst">' + myUsers2[i].instrument + '</div>' +
	                        '<div class="city">' + myUsers2[i].city + '</div>' +
	                        '</div></div></div>');
	        $isogrid.isotope( 'insert', $newitems );
	    }

        initMap();
        chooseArrays();

});


	
//populate iso box
    // $(".grid-container").html("");
    // for (var i = 0; i < myUsers2.length; i++){
    // var youtubeString = myUsers2[i].sample;
    // var videoId = youtubeString.split('be/')[1];
    // var $newitems = 
    //         $('<div class="portfolio-item grid-item' + " " + myUsers2[i].level + '" id="' + [i] + '" data-youtube="https://www.youtube.com/embed/' + videoId  + '">' +
    //                     '<div class="porttopbar' + ' ' + myUsers2[i].level + '"></div>' +
    //                     '<div class="innerport">' +
    //                     '<div class="isoimg col-xs-4"><img src="images/placeholder_75x75.png"></div>' +
    //                     '<div class="isodiv col-xs-8">' +
    //                     '<div class="name">' + myUsers2[i].name + '</div>' +
    //                     '<div class="inst">' + myUsers2[i].Instrument + '</div>' +
    //                     '<div class="city">' + myUsers2[i].city + '</div>' +
    //                     '</div></div></div>');
    //     $isogrid.isotope( 'insert', $newitems );
    // }
});
/////Open Modal
$('.grid-container').on( 'click', '.grid-item', function() {
    var modalID = this.id;
    var url = $(this).data('youtube');
    var level = myUsers2[modalID].level;
    var emailSelect = myUsers2[modalID].email;
    emailSelected = emailSelect;
    
    console.log("EMAIL EMAIL EMAIL: " + emailSelect);

  $('#myModal').modal('show');
  $('#modalTitle').text(myUsers2[modalID].name);
  $('#modalInst').text(myUsers2[modalID].instrument);
  $('#modalCity').text(myUsers2[modalID].city);
  $('#modalLevel').text(myUsers2[modalID].skilllevel);
  $('#modalGenre').text(myUsers2[modalID].genre);
  $('#modalAbout').text(myUsers2[modalID].about);
  //$('#modalInfo').text(myUsers2[modalID].info);
  $('#modalPhoto').attr('src', myUsers2[modalID].photo);
  $('#modalFrame').attr('src', url);
 
///close modal from X modalX
$('#myModal').on( 'click', '#modalX', function() {
    // $isogrid.isotope( 'remove', $('#' + modalID))
    // // layout remaining item elements
    // .isotope('layout');
$('#myModal').modal('hide');
$('#modalFrame').attr('src', "");
})

///Popup Modal - Email 
$('#myModal').on( 'click', '#modalEmail', function() {
    $('#myModal').modal('hide');
    $('#modalFrame').attr('src', "");
    $('#myModal2').modal('show');
})

//Close Modal - Email 
$('#myModal2').on( 'click', '#emailButton', function() {

    $('#myModal2').modal('hide');
    
   
    console.log("BRAND NEW EMAIL: " + emailSelected);

    var contact = 
      {
        subject: $("#emailSubject").val().trim(),
        mess: $("#emailMessage").val().trim(),
        email: emailSelected    
      };

      var currentURL = window.location.origin;

      $.post( currentURL + "/", contact)
        .done(function(data){
          console.log(data);
          alert("Preparing to send")
        })

      $('#emailSubject').val("");
      $('#emailMessage').val("");

    // $isogrid.isotope( 'remove', $('#' + modalID))
    
    // // layout remaining item elements
    // .isotope('layout');
    
    return false;

    })
  
});
///////////////login////////////////
$('#login-submit').on('click', function(){
    var username = $('#login-username').val().trim();
    var password = $('#login-password').val().trim();
    $('#login-username').val("");
    $('#login-password').val("");
    //console.log(username + " " + password);
    return false;
})
/////registration////////////
$('#register-submit').on('click', function(){
    var name = $('#register-name').val().trim(); 
    var username = $('#register-username').val().trim();
    var password = $('#register-password').val().trim();
    var city = $('#register-city').val();
    var state = $('#register-state').val();
    var instrument = $('#register-inst').val();
    var skill = $('#register-skill').val();
    var photo = $('#register-photo').val().trim();
    var about = $('#register-about').val().trim();
    //var info = $('#register-info').val().trim();
    var youtube = $('#register-youtube').val().trim();
console.log(name  + '\n' + username  + '\n' + password  + '\n' + city  + '\n' + state  + '\n' + instrument  + '\n' + skill  + '\n' + photo  + '\n' +
        about  + '\n' + info  + '\n' + youtube);
    $('#register-name').val(""); 
    $('#register-username').val("");
    $('#register-password').val("");
    $('#register-city').val("");
    $('#register-state').val("");
    $('#register-inst').val("");
    $('#register-skill').val("");
    $('#register-photo').val("");
    $('#register-about').val("");
    $('#register-info').val("");
    $('#register-youtube').val("");
        return false;
})

////google maps //////////////////////////////////////////////////////////
//key: AIzaSyBOo3mntkfMMomnO0V0P6Mt4bQ3vMUUWIw

// global variable
var initalMap = {lat: 40.488, lng: -74.439};
var allMarkers = [];
var beginnerMarkers = [];
var intermediateMarkers = [];
var expertMarkers = [];
var counter = 0;

// if ($('#search-city').val == "new brunswick") {
//  initalMap = {lat: 40.488, lng: -74.439};
// }
// if ($('#search-city').val == "nyc") {
//  initalMap = {lat: 40.7128, lng: -74.0059};
// }
// if ($('#search-city').val == "philadelphia") {
//  initalMap = {lat: 39.9526, lng: -75.1652};
// }



var marker = [];
var map;

function initMap() {
    var myLatLng = {lat: 40.488, lng: -74.439};
    var mapOptions = {
        center: myLatLng,
        zoom: 10,
        disableDefaultUI: true,
        styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
    };

  var map = new google.maps.Map(document.getElementById('google-map5'), mapOptions);
  var geocoder = new google.maps.Geocoder();

  
var infowindow = new google.maps.InfoWindow({
        content: "holding..."
    });

 geocodeAddress(geocoder, map);
}



function initMap2() {
    var myLatLng = {lat: 40.488, lng: -74.439};
    var mapOptions = {
        center: myLatLng,
        zoom: 10,
        disableDefaultUI: true,
        styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
    };

  var map = new google.maps.Map(document.getElementById('google-map5'), mapOptions);
  var geocoder = new google.maps.Geocoder();
  
var infowindow = new google.maps.InfoWindow({
        content: "holding..."
    });
geocodeBeginner(geocoder, map);
}

function initMap3() {
    var myLatLng = {lat: 40.488, lng: -74.439};
    var mapOptions = {
        center: myLatLng,
        zoom: 10,
        disableDefaultUI: true,
        styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
    };

  var map = new google.maps.Map(document.getElementById('google-map5'), mapOptions);
  var geocoder = new google.maps.Geocoder();
  
var infowindow = new google.maps.InfoWindow({
        content: "holding..."
    });
geocodeIntermediate(geocoder, map);
}

function initMap4() {
    var myLatLng = {lat: 40.488, lng: -74.439};
    var mapOptions = {
        center: myLatLng,
        zoom: 10,
        disableDefaultUI: true,
        styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
    };

  var map = new google.maps.Map(document.getElementById('google-map5'), mapOptions);
  var geocoder = new google.maps.Geocoder();
  
var infowindow = new google.maps.InfoWindow({
        content: "holding..."
    });
geocodeExpert(geocoder, map);
}

function geocodeAddress(geocoder, resultsMap) {
  for (var j = 0; j < myUsers2.length; j++){
     address = myUsers2[j].zipcode;
     inst = myUsers2[j].Instrument;
     name = myUsers2[j].name;
      //console.log(myUsers2[j].zipcode);
      geocoder.geocode({'address': address}, function(results, status) {
        // alert(name);

        if (status === google.maps.GeocoderStatus.OK) {           
          resultsMap.setCenter(results[0].geometry.location);
        var markers = new google.maps.Marker({
                            position: results[0].geometry.location,
                            map: resultsMap,
                            title: myUsers2[counter].name,
                            id: myUsers2[counter].level,
///test                         
                            name: myUsers2[counter].name,
                            genre: myUsers2[counter].genre,
                            inst: myUsers2[counter].instrument,
                            city: myUsers2[counter].city,
                            level: myUsers2[counter].skilllevel,
                            about: myUsers2[counter].about,
                            youtube: myUsers2[counter].sample,
                            photo: myUsers2[counter].photo,
                            html: 
                                    '<div class="markerPop">' +
                                    '<h1>' + myUsers2[counter].name + '</h1>' + 
                                    '<p>' + myUsers2[counter].instrument + '</p>' +
                                    '</div>'
                        });

        var contentString = '<div id="content">'+
                                '<h4 class="firstHeading">'+ myUsers2[counter].name +'</h4>'+
                                '<div id="bodyContent">'+
                                '<p><b>'+myUsers2[counter].instrument+'</b></p>'+
                                '</div>'+
                                '</div>';

            infowindow = new google.maps.InfoWindow({
                    content: contentString,
                    maxWidth: 300, 
                    buttons: { close: { visible: false } }
                });

                        //put all in array
                        allMarkers.push(markers);
                        
                        counter++;
                        //console.log(counter);
/////////test
/////Open Modal
                google.maps.event.addListener(markers, 'click', function () {
                            var modalID = this.id;
                            var videoId = this.youtube
                            var url = videoId.split('be/')[1];
                            var fullURL = "https://www.youtube.com/embed/" + url;
                            //alert(this.name);
                //var url = myUsers2[modalID].youtube;
                //var level = myUsers2[modalID].level;
              $('#myModal').modal('show');
              $('#modalTitle').text(this.name);
              $('#modalInst').text(this.inst);
              $('#modalCity').text(this.city);
              $('#modalLevel').text(this.level);
              $('#modalAbout').text(this.about);
              $('#modalGenre').text(this.genre);
              $('#modalPhoto').attr('src', this.photo);
             $('#modalFrame').attr('src', fullURL);
                        });



//////end test




                        google.maps.event.addListener(markers, 'mouseover', function () {
                            infowindow.setContent(this.html);
                            infowindow.open(resultsMap, this);
                        });
                        google.maps.event.addListener(markers, 'mouseout', function () {
                            //infowindow.setContent(this.html);
                            infowindow.close(resultsMap, this);
                        });
                    };
          })
    }
}

//// Geocode Beginner ///////////////////////////////
function geocodeBeginner(geocoder, resultsMap) {
  for (var j = 0; j < beginnerMarkers.length; j++){
     address = beginnerMarkers[j].zipcode;
     inst = beginnerMarkers[j].Instrument;
     name = beginnerMarkers[j].name;
      //console.log(beginnerMarkers[j].zipcode);
      geocoder.geocode({'address': address}, function(results, status) {
  
        if (status === google.maps.GeocoderStatus.OK) {
          
          resultsMap.setCenter(results[0].geometry.location);
    var markers = new google.maps.Marker({
              position: results[0].geometry.location,
              map: resultsMap,
              title: beginnerMarkers[counter].name,
              id: beginnerMarkers[counter].level,
///test                         
                name: beginnerMarkers[counter].name,
                genre: beginnerMarkers[counter].genre,
                inst: beginnerMarkers[counter].instrument,
                city: beginnerMarkers[counter].city,
                level: beginnerMarkers[counter].skilllevel,
                about: beginnerMarkers[counter].about,
                youtube: beginnerMarkers[counter].sample,
                photo: beginnerMarkers[counter].photo,

              html: 
                  '<div class="markerPop">' +
                  '<h1>' + beginnerMarkers[counter].name + '</h1>' + 
                  '<p>' + beginnerMarkers[counter].instrument + '</p>' +
                  '</div>'
            });

    var contentString = '<div id="content">'+
                      '<h4 class="firstHeading">'+ beginnerMarkers[counter].name +'</h4>'+
                '<div id="bodyContent">'+
                '<p><b>'+beginnerMarkers[counter].instrument+'</b></p>'+
                '</div>'+
                '</div>';

      infowindow = new google.maps.InfoWindow({
          content: contentString,
          maxWidth: 300, 
          buttons: { close: { visible: false } }
        });
            //dont push to array
           // allMarkers.push(markers); 
            counter++;
           // console.log(counter);
/////////test
/////Open Modal
                google.maps.event.addListener(markers, 'click', function () {
                            var modalID = this.id;
                            var videoId = this.youtube
                            var url = videoId.split('be/')[1];
                            var fullURL = "https://www.youtube.com/embed/" + url;
                            //alert(this.name);
                //var url = myUsers2[modalID].youtube;
                //var level = myUsers2[modalID].level;
              $('#myModal').modal('show');
              $('#modalTitle').text(this.name);
              $('#modalInst').text(this.inst);
              $('#modalCity').text(this.city);
              $('#modalLevel').text(this.level);
              $('#modalAbout').text(this.about);
              $('#modalGenre').text(this.genre);
              $('#modalPhoto').attr('src', this.photo);
             $('#modalFrame').attr('src', fullURL);
                        });



//////end test




            google.maps.event.addListener(markers, 'mouseover', function () {
            infowindow.setContent(this.html);
            infowindow.open(resultsMap, this);
            });
            google.maps.event.addListener(markers, 'mouseout', function () {
            //infowindow.setContent(this.html);
            infowindow.close(resultsMap, this);
            });

          };      
      })

  }
}
//// Geocode Beginner END///////////////////////////////

//// Geocode Intermediate ///////////////////////////////
function geocodeIntermediate(geocoder, resultsMap) {
  for (var j = 0; j < intermediateMarkers.length; j++){
     address = intermediateMarkers[j].zipcode;
     inst = intermediateMarkers[j].instrument;
     name = intermediateMarkers[j].name;
      //console.log(intermediateMarkers[j].zipcode);
      geocoder.geocode({'address': address}, function(results, status) {
  
        if (status === google.maps.GeocoderStatus.OK) {
          
          resultsMap.setCenter(results[0].geometry.location);
    var markers = new google.maps.Marker({
              position: results[0].geometry.location,
              map: resultsMap,
              title: intermediateMarkers[counter].name,
              id: intermediateMarkers[counter].level,
///test                         
                name: intermediateMarkers[counter].name,
                genre: intermediateMarkers[counter].genre,
                inst: intermediateMarkers[counter].instrument,
                city: intermediateMarkers[counter].city,
                level: intermediateMarkers[counter].skilllevel,
                about: intermediateMarkers[counter].about,
                youtube: intermediateMarkers[counter].sample,
                photo: intermediateMarkers[counter].photo,
              html: 
                  '<div class="markerPop">' +
                  '<h1>' + intermediateMarkers[counter].name + '</h1>' + 
                  '<p>' + intermediateMarkers[counter].instrument + '</p>' +
                  '</div>'
            });

    var contentString = '<div id="content">'+
                      '<h4 class="firstHeading">'+ intermediateMarkers[counter].name +'</h4>'+
                '<div id="bodyContent">'+
                '<p><b>'+intermediateMarkers[counter].Instrument+'</b></p>'+
                '</div>'+
                '</div>';

      infowindow = new google.maps.InfoWindow({
          content: contentString,
          maxWidth: 300, 
          buttons: { close: { visible: false } }
        });
            //dont push to array
           // allMarkers.push(markers); 
            counter++;
           // console.log(counter);
/////////test
/////Open Modal
                google.maps.event.addListener(markers, 'click', function () {
                            var modalID = this.id;
                            var videoId = this.youtube
                            var url = videoId.split('be/')[1];
                            var fullURL = "https://www.youtube.com/embed/" + url;
                            //alert(this.name);
                //var url = myUsers2[modalID].youtube;
                //var level = myUsers2[modalID].level;
              $('#myModal').modal('show');
              $('#modalTitle').text(this.name);
              $('#modalInst').text(this.inst);
              $('#modalCity').text(this.city);
              $('#modalLevel').text(this.level);
              $('#modalAbout').text(this.about);
              $('#modalGenre').text(this.genre);
              $('#modalPhoto').attr('src', this.photo);
             $('#modalFrame').attr('src', fullURL);
                        });



//////end test
            google.maps.event.addListener(markers, 'mouseover', function () {
            infowindow.setContent(this.html);
            infowindow.open(resultsMap, this);
            });
            google.maps.event.addListener(markers, 'mouseout', function () {
            //infowindow.setContent(this.html);
            infowindow.close(resultsMap, this);
            });
          };      
      })

  }
}
//// Geocode Intermediate END///////////////////////////////

//// Geocode Expert ///////////////////////////////
function geocodeExpert(geocoder, resultsMap) {
  for (var j = 0; j < expertMarkers.length; j++){
     address = expertMarkers[j].zipcode;
     inst = expertMarkers[j].instrument;
     name = expertMarkers[j].name;
      //console.log(expertMarkers[j].zipcode);
      geocoder.geocode({'address': address}, function(results, status) {
  
        if (status === google.maps.GeocoderStatus.OK) {
          
          resultsMap.setCenter(results[0].geometry.location);
    var markers = new google.maps.Marker({
              position: results[0].geometry.location,
              map: resultsMap,
              title: expertMarkers[counter].name,
              id: expertMarkers[counter].level,
///test                         
                name: expertMarkers[counter].name,
                genre: expertMarkers[counter].genre,
                inst: expertMarkers[counter].instrument,
                city: expertMarkers[counter].city,
                level: expertMarkers[counter].skilllevel,
                about: expertMarkers[counter].about,
                youtube: expertMarkers[counter].sample,
                photo: expertMarkers[counter].photo,
              html: 
                  '<div class="markerPop">' +
                  '<h1>' + expertMarkers[counter].name + '</h1>' + 
                  '<p>' + expertMarkers[counter].instrument + '</p>' +
                  '</div>'
            });

    var contentString = '<div id="content">'+
                      '<h4 class="firstHeading">'+ expertMarkers[counter].name +'</h4>'+
                '<div id="bodyContent">'+
                '<p><b>'+expertMarkers[counter].Instrument+'</b></p>'+
                '</div>'+
                '</div>';

      infowindow = new google.maps.InfoWindow({
          content: contentString,
          maxWidth: 300, 
          buttons: { close: { visible: false } }
        });
            //dont push to array
           // allMarkers.push(markers); 
            counter++;
           // console.log(counter);
/////////test
/////Open Modal
                google.maps.event.addListener(markers, 'click', function () {
                            var modalID = this.id;
                            var videoId = this.youtube
                            var url = videoId.split('be/')[1];
                            var fullURL = "https://www.youtube.com/embed/" + url;
                            //alert(this.name);
                //var url = myUsers2[modalID].youtube;
                //var level = myUsers2[modalID].level;
              $('#myModal').modal('show');
              $('#modalTitle').text(this.name);
              $('#modalInst').text(this.inst);
              $('#modalCity').text(this.city);
              $('#modalLevel').text(this.level);
              $('#modalAbout').text(this.about);
              $('#modalGenre').text(this.genre);
              $('#modalPhoto').attr('src', this.photo);
             $('#modalFrame').attr('src', fullURL);
                        });
//////end test
            google.maps.event.addListener(markers, 'mouseover', function () {
            infowindow.setContent(this.html);
            infowindow.open(resultsMap, this);
            });
            google.maps.event.addListener(markers, 'mouseout', function () {
            //infowindow.setContent(this.html);
            infowindow.close(resultsMap, this);
            });
          };      
      })

  }
}
//// Geocode Expert END///////////////////////////////


function chooseArrays(){
    for (var i = 0; i < myUsers2.length; i++){
        if (myUsers2[i].skilllevel == "beginner") {
            beginnerMarkers.push(myUsers2[i]);
        } else if (myUsers2[i].skilllevel == "intermediate") {
            intermediateMarkers.push(myUsers2[i]);
        } else {
            expertMarkers.push(myUsers2[i]);
        }
    }
}

// chooseArrays();



////google maps buttons////
$('#showallButton').on('click', function(){
    counter = 0;
    initMap();
    //alert("show all");
})


$('#beginnerButton').on('click', function(){
    counter = 0;
    initMap2();
    //alert("beginner");
})

$('#intermediateButton').on('click', function(){
    counter = 0;
    initMap3();
    //alert("intermediate");
})

$('#expertButton').on('click', function(){
    counter = 0;
    initMap4();
    //alert("expert");
})
////google maps buttons end /////


//Close Modal - Pass 
$('#myModal').on( 'click', '#modalPass', function() {
    // $isogrid.isotope( 'remove', $('#' + modalID))
    // // layout remaining item elements
    // .isotope('layout');
    $('#myModal').modal('hide');
    $('#modalFrame').attr('src', "");
})

// $('#myModal').on( 'hide', function() {
//     $('#modalFrame').attr('src', "");
// })
// jQuery(".modal-backdrop, #myModal .close, #myModal .btn").live("click", function() {
//         jQuery("#myModal iframe").attr("src", jQuery("#myModal iframe").attr("src"));
// });

$('#myModal').on('hidden.bs.modal', function () {
   var src = $(this).find('iframe').attr('src');
   $(this).find('iframe').attr('src', '');
   $(this).find('iframe').attr('src', src);
});

initMap();