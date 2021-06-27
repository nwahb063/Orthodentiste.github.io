// Function to verify that the phone number is correct.
// Here, I validate for (12345), but you have to change that for a phone validation
// Tutorials on Regular expressions
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions 
// https://flaviocopes.com/javascript-regular-expressions/ 
// Regular expressions can get complex, you can think in terms of a series of characters
// or numbers 
function validatePhone(txtPhone) {
    var a = document.getElementById(txtPhone).value;
    // This filter asks for something like (12345), so parentheses with any number (at least 1)
    // of digits
    var filter = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (filter.test(a)) {
        return true;
    }
    else {
        return false;
    }
}


function validateEmail(txtEmail) {
    var a = document.getElementById(txtEmail).value;
    var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (filter.test(a)) {
        return true;
    }
    else {
        return false;
    }
}

function validateCreditCard(txtCreditCard) {
    var a = document.getElementById(txtCreditCard).value;
    var filter = /[0-9]{4} {0,1}[0-9]{4} {0,1}[0-9]{4} {0,1}[0-9]{4}/;
    if (filter.test(a)) {
        return true;
    }
    else {
        return false;
    }
} 

function validateCVV(txtCVV) {
    var a = document.getElementById(txtCVV).value;
    var filter = /[0-9]\d\d/;
    if (filter.test(a)) {
        return true;
    }
    else {
        return false;
    }
} 

// Using date restrictions on datepicker
// Document of datepicker is here: https://api.jqueryui.com/datepicker/ 
// The following code shows how to set specific dates to exclude, as well as Sundays (Day 0)
// Make sure in your version that you associate Days to remove with Experts (e.g. John doesn't work Mondays)
// var unavailableDates = ["06/29/2020","07/07/2020","07/10/2020"];

const setDateFormat = "mm/dd/yy";

function disableDates(date) {
    // Sunday is Day 0, disable all Sundays

    var crewDateSelected = $('input[name=crewchosen]:checked').val();
    var stylechoice = $('input[name=stylechoice]:checked').val();
    if (crewDateSelected && stylechoice) {
        if(crewDateSelected == 1) {
            // Sunday and Monday
            if (date.getDay() == 0 || date.getDay() == 1) {
                return [false];
            }
            //Tuesday
        } else if (crewDateSelected == 2) {
            if (date.getDay() == 2) {
                return [false];
            }
            //Thursday
        } else if (crewDateSelected == 3) {
            if (date.getDay() == 4) {
                return [false];
            }
        }
        return [true];
    }
    return [false];
    // var string = jQuery.datepicker.formatDate(setDateFormat, date);
    // return [ unavailableDates.indexOf(string) == -1 ]
}


// HERE, JQuery "LISTENING" starts
$(document).ready(function(){

    //Tooltip
    $("#name").tooltip({
        position: {
            my: "center bottom", // the "anchor point" in the tooltip element
            at: "center top", // the position of that anchor point relative to selected element
        },
        classes: {
            "ui-tooltip": "highlight"
          }
    });
    $("#phone").tooltip({
        position: {
            my: "center bottom", // the "anchor point" in the tooltip element
            at: "center top", // the position of that anchor point relative to selected element
        },
        classes: {
            "ui-tooltip": "highlight"
          }
    });
    $("#email").tooltip({
        position: {
            my: "center bottom", // the "anchor point" in the tooltip element
            at: "center top", // the position of that anchor point relative to selected element
        },
        classes: {
            "ui-tooltip": "highlight"
          }
    });

    $("#name").on("change", function(){
        var value = $("#name").val();
        if (value.length == 0){
            $("#name").addClass("is-invalid");
        }
        else {
            $("#name").removeClass("is-invalid");
        }
    });


    $("#email").on("change", function(){
        if (!validateEmail("email")){
            $("#email").addClass("is-invalid");
        }
        else {
            $("#email").removeClass("is-invalid");
        }
    });


    // phone validation, it calls validatePhone
    // and also some feedback as an Alert + putting a value in the input that shows the format required
    // the "addClass" will use the class "error" defined in style.css and add it to the phone input
    // The "error" class in style.css defines yellow background and red foreground
    $("#phone").on("change", function(){
        if (!validatePhone("phone")){
            $("#phone").addClass("is-invalid");
        }
        else {
            $("#phone").removeClass("is-invalid");
        }
    });

    // To change the style of the calender, look in jqueryui.com, under Themes, in the ThemeRoller Gallery 
    // You can try different themes (the names are under the calendars) / This is Excite Bike 
    // To use a different theme you must include its css in your HTML file. 
    // The one I included in my HTML is the Excite Bike, but you can try others

    // Also, here is a good tutorial for playing with the datepicker in https://webkul.com/blog/jquery-datepicker/ 
    // Datepicker is also documented as one of the widgets here: https://api.jqueryui.com/category/widgets/


    var today = new Date();

    $( "#dateInput" ).datepicker(
        {
            dateFormat: setDateFormat,
            minDate: today,  
            maxDate: '+4M',
            // used to disable some dates
            beforeShowDay: $.datepicker.noWeekends,
            beforeShowDay: disableDates
        }   
    );

    $( "#dateInput" ).tooltip({
        position: {
            my: "center bottom", // the "anchor point" in the tooltip element
            at: "center top", // the position of that anchor point relative to selected element
        },
        classes: {
            "ui-tooltip": "highlight"
          }
    });
    
    $("#nameCreditCard").tooltip({
        position: {
            my: "center bottom", // the "anchor point" in the tooltip element
            at: "center top", // the position of that anchor point relative to selected element
        },
        classes: {
            "ui-tooltip": "highlight"
          }
    });

    $("#creditCard").tooltip({
        position: {
            my: "center bottom", // the "anchor point" in the tooltip element
            at: "center top", // the position of that anchor point relative to selected element
        },
        classes: {
            "ui-tooltip": "highlight"
          }
    });

    $("#creditCard").on("change", function(){
        if (!validateCreditCard("creditCard")){
            $("#creditCard").addClass("is-invalid");
        }
        else {
            $("#creditCard").removeClass("is-invalid");
        }
    });

    $("#nameCreditCard").on("change", function(){
        var value = $("#nameCreditCard").val();
        if (value.length == 0){
            $("#nameCreditCard").addClass("is-invalid");
        }
        else {
            $("#nameCreditCard").removeClass("is-invalid");
        }
    });

    $("#creditCard").tooltip({
        position: {
            my: "center bottom", // the "anchor point" in the tooltip element
            at: "center top", // the position of that anchor point relative to selected element
        },
        classes: {
            "ui-tooltip": "highlight"
          }
    });

    $("#creditCard").on("change", function(){
        if (!validateCreditCard("creditCard")){
            $("#creditCard").addClass("is-invalid");
        }
        else {
            $("#creditCard").removeClass("is-invalid");
        }
    });

    $("#cvv").tooltip({
        position: {
            my: "center bottom", // the "anchor point" in the tooltip element
            at: "center top", // the position of that anchor point relative to selected element
        },
        classes: {
            "ui-tooltip": "highlight"
          }
    });

    $("#cvv").on("change", function(){
        if (!validateCVV("cvv")){
            $("#cvv").addClass("is-invalid");
        }
        else {
            $("#cvv").removeClass("is-invalid");
        }
    });

    $("#confirm").on("click", function(){
        var crewDateSelected = $('input[name=crewchosen]:checked').val();
        var stylechoice = $('input[name=stylechoice]:checked').val();
        var dateInput = $("#dateInput").val();
        var name = $("#name").val();
        var email = $("#email").val();
        var phone = $("#phone").val();
        var nameCreditCard = $("#nameCreditCard").val();
        var creditCard = $("#creditCard").val();
        var cvv = $("#cvv").val();
        if (crewDateSelected && stylechoice && name && email && dateInput && phone && nameCreditCard && creditCard && cvv) {
            alert('Appointment confirm');
        } else {
            if(name.length == 0) {
                $("#name").addClass("is-invalid");
            }
            if(email.length == 0) {
                $("#email").addClass("is-invalid");
            }
            if(phone.length == 0) {
                $("#phone").addClass("is-invalid");
            }
            if(nameCreditCard.length == 0) {
                $("#nameCreditCard").addClass("is-invalid");
            }
            if(creditCard.length == 0) {
                $("#creditCard").addClass("is-invalid");
            }
            if(cvv.length == 0) {
                $("#cvv").addClass("is-invalid");
            }
            alert('Missing information please fill in all fields');
        }
    });
});