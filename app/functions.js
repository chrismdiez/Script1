var data = [];

var datos1 = {};
datos1.StartDate = "2021-09-01 07:00";
datos1.EndDate = "2021-09-01 08:00";
datos1.Description = "test";

data.push(datos1);

datos1.StartDate = "2021-09-05 07:00";
datos1.EndDate = "2021-09-05 08:00";
datos1.Description = "test2";

data.push(datos1);

datos1.StartDate = "2021-09-05 07:00";
datos1.EndDate = "2021-09-05 08:00";
datos1.Description = "test4";

data.push(datos1);
datos1.StartDate = "2021-09-08 07:00";
datos1.EndDate = "2021-09-08 08:00";
datos1.Description = "test3";

data.push(datos1);

$(document).ready(function () {

    passValidator();

    GenerarComboQuarters();

    var id = $("#lookup").dxLookup("instance").option("value");
    GenerateCalendars(id);

});

function passValidator() {
    var code = window.location.search.split("=");
    var datos = code[1];

    console.log(datos);

    var day = dayOfYear() + 99999;
    datos = datos.replace(day, "=");
    datos = decodeBase64(datos);
    //datos = datos.replace("m", "a");
    //datos = datos.replace("n", "b");
    //datos = datos.replace("o", "c");
    //datos = datos.replace("p", "d");
    //datos = datos.replace("q", "e");
    //datos = datos.replace("r", "f");
    //datos = datos.replace("s", "g");
    //datos = datos.replace("t", "h");
    //datos = datos.replace("u", "i");
    //datos = datos.replace("v", "j");
    //datos = datos.replace("w", "k");
    //datos = datos.replace("x", "l");
    //datos = datos.replace("y", "m");
    //datos = datos.replace("z", "n");
    //datos = datos.replace("a", "o");
    //datos = datos.replace("b", "p");
    //datos = datos.replace("c", "q");
    //datos = datos.replace("d", "r");
    //datos = datos.replace("e", "s");
    //datos = datos.replace("f", "t");
    //datos = datos.replace("g", "u");
    //datos = datos.replace("h", "v");
    //datos = datos.replace("i", "w");
    //datos = datos.replace("j", "x");
    //datos = datos.replace("k", "y");
    //datos = datos.replace("l", "z");
    datos = decodeBase64(datos);
    console.log(datos);

}

function decodeBase64(str) {
    return decodeURIComponent(escape(window.atob(str)));
}

function dayOfYear() {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now - start;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);

    return day;
}

function GenerarComboQuarters() {
    var quarters = [];

    for (i = (new Date().getFullYear()); i >= 2019; i--) {
        quarters.push({ "id": "" + i + "#10$11$12", "desc": "" + i + " - Q4" });
        quarters.push({ "id": "" + i + "#7$8$9", "desc": "" + i + " - Q3" });
        quarters.push({ "id": "" + i + "#4$5$6", "desc": "" + i + " - Q2" });
        quarters.push({ "id": "" + i + "#1$2$3", "desc": "" + i + " - Q1" });
    }


    $("#lookup").dxLookup({
        dropDownOptions: {
            showTitle: false
        },
        items: quarters,
        displayExpr: "desc",
        valueExpr: "id",
        value: quarters[1].id,
        onValueChanged: function (e) {
            console.log(e);
            GenerateCalendars(e.value);
        }
    });
}

function GetUltimoDiaMes(year, month) {
    return new Date(year, month, 0).getDate();
}

function GenerateCalendars(quarter) {
    var data = quarter.split("#");
    var year = data[0];
    var quarters = data[1].split('$');

    CreateCalentar("calendario", year, quarters[0]);
    CreateCalentar("calendario2", year, quarters[1]);
    CreateCalentar("calendario3", year, quarters[2]);

    $(".dx-scheduler .dx-button-text").each(function () {
        var parts = $(this).html().split(" ");

        var texto = $(this).html().replace(parts[1], "");
        $(this).html(texto);
    });
}

function CreateCalentar(contenedor, year, month) {
    var cal = $("." + contenedor).dxScheduler({
        dataSource: data,
        views: ["month"],
        zoomLevel: 'month',
        startDateExpr: "StartDate",
        endDateExpr: "EndDate",
        adaptivityEnabled: true,
        textExpr: "Description",
        min: new Date(year, month - 1, 01),
        max: new Date(year, month - 1, GetUltimoDiaMes(year, month)),
        currentDate: new Date(year, month - 1, 01),
        currentView: "month",
        height: 580,
        onAppointmentFormOpening: function (data) {
            var form = data.form;
            var botones = data.popup.option("toolbarItems");

            botones.splice(1, 1);
            data.popup.option("toolbarItems", botones);
        }
    });


    $("#" + contenedor).dxSpeedDialAction({
        icon: "plus",
        onClick: function () {
            cal.showAppointmentPopup();
        }
    })
}

