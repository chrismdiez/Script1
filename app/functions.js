$(document).ready(function () {

    ZOHO.CREATOR.init()
        .then(function (data) {
            var config = {
                reportName: "Calendar_Report"
            }

            //get all records API
            ZOHO.CREATOR.API.getAllRecords(config).then(function (response) {
                console.log(response.data);
                GenerarComboQuarters(response.data);
                //GenerateCalendar(response.data);
            });
        });
});

function GenerarComboQuarters(events) {
    var quarters = [];

    for (i = (new Date().getFullYear() + 1); i >= 2019; i--) {
        quarters.push({ "id": "" + i + "#10$11$12", "desc": "" + i + " - Q4" });
        quarters.push({ "id": "" + i + "#7$8$9", "desc": "" + i + " - Q3" });
        quarters.push({ "id": "" + i + "#4$5$6", "desc": "" + i + " - Q2" });
        quarters.push({ "id": "" + i + "#1$2$3", "desc": "" + i + " - Q1" });
    }

    console.log(quarters);

    $("#lookup").dxLookup({
        dropDownOptions: {
            showTitle: false
        },
        items: quarters,
        displayExpr: "desc",
        valueExpr: "id",
        onValueChanged: function (e) {
            console.log(e);
            GenerateCalendars(e.value, events);
        }
    });
}

function GetUltimoDiaMes(year, month) {
    return new Date(year, month, 0).getDate();
}

function GenerateCalendars(quarter, events) {
    var data = quarter.split("#");
    var year = data[0];
    var quarters = data[1].split('$');

    CreateCalentar("calendario", events, year, quarters[0]);
    CreateCalentar("calendario2", events, year, quarters[1]);
    CreateCalentar("calendario3", events, year, quarters[2]);
}

function CreateCalentar(contenedor, datos, year, month) {
    $("." + contenedor).dxScheduler({
        dataSource: datos,
        views: ["month", "week", "day"],
        zoomLevel: 'year',
        startDateExpr: "StartDate",
        endDateExpr: "EndDate",
        min: new Date(year, month - 1, 01),
        max: new Date(year, month - 1, GetUltimoDiaMes(year, month)),
        currentDate: new Date(year, month - 1, 01),
        currentView: "month",
        height: 580
    });
}

