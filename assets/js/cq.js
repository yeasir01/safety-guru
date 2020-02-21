$(document).ready(
     function () { //Create a variable for the CarQuery object.  You can call it whatever you like.
          var carquery = new CarQuery();
          //Run the carquery init function to get things started:
          carquery.init();
          //Optionally, you can pre-select a vehicle by passing year / make / model / trim to the init function:
          //carquery.init('2000', 'dodge', 'Viper', 11636);
          //Optional: Pass sold_in_us:true to the setFilters method to show only US models. 
          carquery.setFilters({
               sold_in_us: true
          });
          //Optional: initialize the year, make, model, and trim drop downs by providing their element IDs
          carquery.initYearMakeModelTrim('car-years', 'car-makes', 'car-models', 'car-model-trims');
          //Optional: set the onclick event for a button to show car data.
          //$('#search-btn').click(  function(){ carquery.populateCarData('car-model-data'); } );
          //Optional: initialize the make, model, trim lists by providing their element IDs.
          carquery.initMakeModelTrimList('make-list', 'model-list', 'trim-list', 'trim-data-list');
          //Optional: set minimum and/or maximum year options.
          carquery.year_select_min = 1991;
          //carquery.year_select_max=2019;
          //Optional: initialize search interface elements.
          //The IDs provided below are the IDs of the text and select inputs that will be used to set the search criteria.
          //All values are optional, and will be set to the default values provided below if not specified.
          //If creating a search interface, set onclick event for the search button.  Make sure the ID used matches your search button ID.
          $('#search-btn').click(function () {
               carquery.search();
          });
     });