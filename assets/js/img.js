function getPhoto() {
    var year = $('#car-years').val();
    var make = $('#car-makes').val();
    var model = $('#car-models').val();

    const xmlLink = "https://www.carimagery.com/api.asmx/GetImageUrl?searchTerm=" + year + "+" + make + "+" + model

    $.ajax({
        url: xmlLink,
        dataType: 'xml',
        success: function(data){
            imgLink = $(data).text();
            $("#veh-img").empty();
            $('#veh-img').append($('<img>').attr('src', imgLink));
        },
        error: function(data){
            console.log('Error loading XML data');
        }
    });
}