//TAB CONTROL
$(".tab").on("click", function () {
    const idNum = $(this).attr("id");
    const setId = '#' + idNum;
    const div = '#' + idNum + '-div'

    $('.tab').removeClass('is-active');
    $(setId).addClass('is-active');

    $('.tab-content').addClass('hide');
    $(div).removeClass('hide');

});

$("#search-btn").on("click", function (event) {
    var model = $('#car-models').val();
    if ( model === "") {
        
    } else {
        event.preventDefault();
        getVehinfo();
        getRecall();
        getPhoto();
    }
});

//PARSE DATA & RETURN VEHICLE ID
function getVehinfo() {
    var year = $('#car-years').val();
    var make = $('#car-makes').val();
    var model = $('#car-models').val();

    const idLink = "https://cors-anywhere.herokuapp.com/https://one.nhtsa.gov/webapi/api/SafetyRatings/modelyear/" + year + "/make/" + make + "/model/" + model + "?format=json"

    $.ajax({
        url: idLink,
        type: 'GET',
        beforeSend: loading(),

        success: function (response) {

            $("#safety-div").empty();

            var resultCount = response.Results.length;

            if (resultCount === 0) {
                $('#safety-div').append($('<h5>').text('No crash data available for this vehicle'));
            } else {
                const vehId = response.Results[0].VehicleId;
                getSafety(vehId);
            }
        }
    });
}

//USING ID LOOKUP CRASH TEST DATA
function getSafety(value) {
    var year = $('#car-years').val();
    var make = $('#car-makes').val();
    var model = $('#car-models').val();

    const safetyQuery = "https://cors-anywhere.herokuapp.com/https://one.nhtsa.gov/webapi/api/SafetyRatings/VehicleId/" + value + "?format=json";

    $.ajax({
        url: safetyQuery,
        type: 'GET',


        success: function (response) {

            $("#safety-div").empty();

            const overallRating = response.Results[0].OverallRating;
            const overallFrontCrashRating = response.Results[0].OverallFrontCrashRating;
            const frontCrashDriversideRating = response.Results[0].FrontCrashDriversideRating;
            const frontCrashPassengersideRating = response.Results[0].FrontCrashPassengersideRating;
            const overallSideCrashRating = response.Results[0].OverallSideCrashRating;
            const sideCrashDriversideRating = response.Results[0].SideCrashDriversideRating;
            const sideCrashPassengersideRating = response.Results[0].SideCrashPassengersideRating;
            const rolloverRating = response.Results[0].RolloverRating;
            const sidePoleCrashRating = response.Results[0].SidePoleCrashRating;
            const nhtsaElectronicStabilityControl = response.Results[0].NHTSAElectronicStabilityControl;
            const nhtsaForwardCollisionWarning = response.Results[0].NHTSAElectronicStabilityControl;
            const nhtsaLaneDepartureWarning = response.Results[0].NHTSALaneDepartureWarning;

            $('#safety-div').addClass('columns');

            $('#safety-div').append($('<div>').addClass('column is-half').attr('id', 'left-safety'));
            $('#safety-div').append($('<div>').addClass('column is-half').attr('id', 'right-safety'));

            $('#left-safety').append('<div class="rating-row"><span class="safety-title">Overall Rating: </span>' + '<span class="safety-desc">' + overallRating + '</span></div>');
            $('#left-safety').append('<div class="rating-row"><span class="safety-title">Overall Front Crash Rating: </span>' + '<span class="safety-desc">' + overallFrontCrashRating + '</span></div>');
            $('#left-safety').append('<div class="rating-row"><span class="safety-title">Drivers Front Crash Rating: </span>' + '<span class="safety-desc">' + frontCrashDriversideRating + '</span></div>');
            $('#left-safety').append('<div class="rating-row"><span class="safety-title">Passenger Front Crash Rating: </span>' + '<span class="safety-desc">' + frontCrashPassengersideRating + '</span></div>');
            $('#left-safety').append('<div class="rating-row"><span class="safety-title">Overall Side Crash Rating: </span>' + '<span class="safety-desc">' + overallSideCrashRating + '</span></div>');
            $('#left-safety').append('<div class="rating-row"><span class="safety-title">Passenger Side Crash Rating: </span>' + '<span class="safety-desc">' + sideCrashPassengersideRating + '</span></div>');
            $('#right-safety').append('<div class="rating-row"><span class="safety-title">Rollover Rating: </span>' + '<span class="safety-desc">' + rolloverRating + '</span></div>');
            $('#right-safety').append('<div class="rating-row"><span class="safety-title">Side Pole Crash Rating: </span>' + '<span class="safety-desc">' + sidePoleCrashRating + '</span></div>');
            $('#right-safety').append('<div class="rating-row"><span class="safety-title">Electronic Stability Control: </span>' + '<span class="safety-desc">' + nhtsaElectronicStabilityControl + '</span></div>');
            $('#right-safety').append('<div class="rating-row"><span class="safety-title">Forward Collision Warning: </span>' + '<span class="safety-desc">' + nhtsaForwardCollisionWarning + '</span></div>');
            $('#right-safety').append('<div class="rating-row"><span class="safety-title">Lane Departure Warning: </span>' + '<span class="safety-desc">' + nhtsaLaneDepartureWarning + '</span></div>');

        },

        error: function () {
            alert('ERROR! Unable to get NCAP safety data!');
        }

    });
}

//PARSE RECALL DATA & DISPLAY
function getRecall() {
    var year = $('#car-years').val();
    var make = $('#car-makes').val();
    var model = $('#car-models').val();

    const recallQuery = "https://cors-anywhere.herokuapp.com/https://webapi.nhtsa.gov/api/Recalls/vehicle/modelyear/" + year + "/make/" + make + "/model/" + model + "?format=json";

    $.ajax({
        url: recallQuery,
        type: 'GET',

        success: function (response) {

            $("#recall-div").empty();

            var recallCount = response.Results.length;

            if (recallCount === 0) {
                $('#recall-div').append($('<h5>').text('No recall data available for this vehicle'));
            } else {
                for (i = 0; i < recallCount; i++) {
                    const title = response.Results[i].Component;
                    const summary = response.Results[i].Summary;
                    const recallNum = response.Results[i].NHTSACampaignNumber;
                    const t = $('<h5>').text(title).addClass('recall-title')
                    const s = $('<p>').text(summary).addClass('recall-summary')
                    const r = $('<p>').text('NHTSA CAMPAIGN NUMBER: ' + recallNum).addClass('recall-number')
                    const b = $('<br>')
                    $('#recall-div').append(t);
                    $('#recall-div').append(s);
                    $('#recall-div').append(r);
                    $('#recall-div').append(b);
                }
            }
        },

        error: function () {
            alert('ERROR! Unable to get NHTSA recall data!');
        }
    });
}

//MOMENTARY LOADING MESSAGE UNTIL DATA IS FETCHED
function loading() {
    $("#safety-div").empty();
    $("#recall-div").empty();
    $("#tsb-div").empty();
    $('#safety-div').append($('<h5>').text('Loading please wait...'));
    $('#recall-div').append($('<h5>').text('Loading please wait...'));
    $('#tsb-div').append($('<h5>').text('Loading please wait...'));
};