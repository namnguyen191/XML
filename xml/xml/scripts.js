$(document).ready(function(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            showData(this);
            filterRecord(this);
        }
    };
    xhttp.open("GET", "automobile.xml", true);
    xhttp.send();   
});

function showData(xml) {
    var xmlDoc = xml.responseXML;
    // console.table(xmlDoc.children[0].children);

    var txt = '<table class="table">'+
                '<thead>'+
                    '<tr>'+
                        '<th>Brand</th>'+
                        '<th>Model</th>'+
                        '<th>Year</th>'+
                        '<th>Top Speed</th>'+
                        '<th>Price</th>'+
                        '<th>Modify</th>'+
                    '</tr>'+
                '</thead>';

    var tagCar = xmlDoc.getElementsByTagName("car");
    var tagMake = xmlDoc.getElementsByTagName("make");
    var tagModel = xmlDoc.getElementsByTagName("model");
    var tagYear = xmlDoc.getElementsByTagName("year");
    var tagKm = xmlDoc.getElementsByTagName("speed");
    var tagPrice = xmlDoc.getElementsByTagName("price");

    for(var i = 0; i < tagCar.length; i++){
    
        txt += '<tr data-id="record-'+i+'" class="itemRecord">'+
                '<td>'+tagMake[i].childNodes[0].nodeValue+'</td>'+
                '<td>'+tagModel[i].childNodes[0].nodeValue+'</td>'+
                '<td>'+tagYear[i].childNodes[0].nodeValue+'</td>'+
                '<td>'+tagKm[i].childNodes[0].nodeValue+'</td>'+
                '<td>'+parseInt(tagPrice[i].childNodes[0].nodeValue).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+'</td>'+
                '<td>'+
                    '<a href="javascript:;" class="btn btn-sm btn-secondary d-block w-100 text-left m-1 btn-edit">'+
                        '<i class="fas fa-edit"></i> Edit'+
                    '</a>'+
                    '<a href="javascript:;" class="btn btn-sm btn-danger d-block w-100 text-left m-1 btn-remove">'+
                        '<i class="fas fa-trash"></i> Remove'+
                    '</a>'+
                '</td>'+
            '</tr>';

    }

    txt += '<tr>'+
            '<td colspan="6" id="txterror" class="d-none text-strong text-danger">'+
                '<small><i class="fas fa-exclamation-circle"></i> Please fill the form first!</small>'+
            '</td>'+
        '</tr>';
    txt += '<tr class="form__addRecord">'+
            '<td>'+
                '<input class="form-control" type="text" name="txtBrand" id="txtBrand" placeholder="Brand"/>'+
            '</td>'+
            '<td>'+
                '<input class="form-control" type="text" name="txtModel" id="txtModel" placeholder="Model"/>'+
            '</td>'+
            '<td>'+
                '<input class="form-control" type="text" name="txtYear" id="txtYear" placeholder="Year"/>'+
            '</td>'+
            '<td>'+
                '<input class="form-control" type="text" name="txtSpeed" id="txtSpeed" placeholder="Speed"/>'+
            '</td>'+
            '<td>'+
                '<input class="form-control" type="text" name="txtPrice" id="txtPrice" placeholder="Price"/>'+
            '</td>'+
            '<td>'+
                '<a href="javascript:;" class="btn btn-sm btn-secondary d-block w-100 text-left m-1" id="addRecord">'+
                    '<i class="fas fa-plus"></i> Add'+
                '</a>'+
            '</td>'+
        '</tr>';

    txt += "</table>";
    document.getElementById("table").innerHTML = txt;
    addRecord(xml);
    editRecord(xml);
    removeRecord(xml);
    searchRecord(xml);
}


function addRecord(xml){
    var xmlDoc = xml.responseXML;
    $("#txtPrice").focusout(function(){
        var price = parseFloat($("#txtPrice").val().replace(/[,-]+/g,"")).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        price = (price == 'NaN') ? '0.00' : price;
        $("#txtPrice").val(price);
    })
    $("#addRecord").on("click", function(){
        var inpBrand = $("#txtBrand").val();
        var inpModel = $("#txtModel").val();
        var inpYear = $("#txtYear").val();
        var inpSpeed = $("#txtSpeed").val();
        var inpPrice = $("#txtPrice").val().replace(/[,-]+/g,"");
        if (inpBrand.length*inpModel.length*inpYear.length*inpSpeed.length*inpPrice.length == 0) {
            $("#txterror").removeClass("d-none");
        } else {
            $("#txterror").addClass("d-none");
            var xmlRecord_car = xmlDoc.createElement("car");
            var xmlRecord__make = xmlDoc.createElement("make");
            var xmlRecord__model = xmlDoc.createElement("model");
            var xmlRecord__year = xmlDoc.createElement("year");
            var xmlRecord__speed = xmlDoc.createElement("speed");
            var xmlRecord__price = xmlDoc.createElement("price");
            xmlRecord__make.appendChild(xmlDoc.createTextNode(inpBrand));
            xmlRecord__model.appendChild(xmlDoc.createTextNode(inpModel));
            xmlRecord__year.appendChild(xmlDoc.createTextNode(inpYear));
            xmlRecord__speed.appendChild(xmlDoc.createTextNode(inpSpeed));
            xmlRecord__price.appendChild(xmlDoc.createTextNode(inpPrice));
            xmlRecord_car.appendChild(xmlRecord__make);
            xmlRecord_car.appendChild(xmlRecord__model);
            xmlRecord_car.appendChild(xmlRecord__year);
            xmlRecord_car.appendChild(xmlRecord__speed);
            xmlRecord_car.appendChild(xmlRecord__price);
            xmlDoc.getElementsByTagName("auto")[0].appendChild(xmlRecord_car);
            showData(xml);
        }    
    });
}

function editRecord(xml) {
    $(".btn-edit").on("click", function(){

        var $domTr = $(this).parent().parent();
        var $domTd = $(this).parent().siblings();
        var codeId = '#'+$domTr.data("id");
        var currentBrand = $domTd.eq(0).html();
        var currentModel = $domTd.eq(1).html();
        var currentYear = $domTd.eq(2).html();
        var currentSpeed = $domTd.eq(3).html();
        var currentPrice = $domTd.eq(4).html();
        // console.log(currentYear)

        var txt = '<td>'+
                    '<input class="form-control" type="text" name="txtBrand" id="txtBrand" value="'+currentBrand+'"/>'+
                '</td>'+
                '<td>'+
                    '<input class="form-control" type="text" name="txtModel" id="txtModel" value="'+currentModel+'"/>'+
                '</td>'+
                '<td>'+
                    '<input class="form-control" type="text" name="txtYear" id="txtYear" value="'+currentYear+'"/>'+
                '</td>'+
                '<td>'+
                    '<input class="form-control" type="text" name="txtSpeed" id="txtSpeed" value="'+currentSpeed+'"/>'+
                '</td>'+
                '<td>'+
                    '<input class="form-control" type="text" name="txtPrice" id="txtPrice" value="'+currentPrice+'"/>'+
                '</td>'+
                '<td>'+
                    '<a href="javascript:;" class="btn btn-sm btn-primary d-block w-100 text-left m-1 btn-save">'+
                        '<i class="fas fa-check"></i> Save'+
                    '</a>'+
                    '<a href="javascript:;" class="btn btn-sm btn-secondary d-block w-100 text-left m-1 btn-cancel">'+
                        '<i class="fas fa-times"></i> Cancel'+
                    '</a>'+
                '</td>';
        $domTr.html(txt);

        saveRecord(xml);
        cancelRecord(xml);

        $("#addRecord").addClass("disabled");
        $(".btn-edit").addClass("disabled");
        $(".btn-remove").addClass("disabled");
    })
}

function saveRecord(xml) {
    $(".btn-save").on("click", function(){
        var $domTr = $(this).parent().parent();
        var $domTd = $(this).parent().siblings();
        var codeId = '#'+$domTr.data("id");
        var code = parseInt($domTr.data("id").substring(7));

        var currentBrand = $domTd.eq(0).children("input").val();
        var currentModel = $domTd.eq(1).children("input").val();
        var currentYear = $domTd.eq(2).children("input").val();
        var currentSpeed = $domTd.eq(3).children("input").val();
        var currentPrice = $domTd.eq(4).children("input").val();


        var xmlDoc = xml.responseXML;
        var xmlRecord_car = xmlDoc.createElement("car");
        var xmlRecord__make = xmlDoc.createElement("make");
        var xmlRecord__model = xmlDoc.createElement("model");
        var xmlRecord__year = xmlDoc.createElement("year");
        var xmlRecord__speed = xmlDoc.createElement("speed");
        var xmlRecord__price = xmlDoc.createElement("price");
        xmlRecord__make.appendChild(xmlDoc.createTextNode(currentBrand));
        xmlRecord__model.appendChild(xmlDoc.createTextNode(currentModel));
        xmlRecord__year.appendChild(xmlDoc.createTextNode(currentYear));
        xmlRecord__speed.appendChild(xmlDoc.createTextNode(currentSpeed));
        xmlRecord__price.appendChild(xmlDoc.createTextNode(currentPrice));
        xmlRecord_car.appendChild(xmlRecord__make);
        xmlRecord_car.appendChild(xmlRecord__model);
        xmlRecord_car.appendChild(xmlRecord__year);
        xmlRecord_car.appendChild(xmlRecord__speed);
        xmlRecord_car.appendChild(xmlRecord__price);

        var theItemWillBeEdit = xmlDoc.getElementsByTagName("car")[code];
        xmlDoc.documentElement.replaceChild(xmlRecord_car, theItemWillBeEdit);
        showData(xml);

        $("#addRecord").removeClass("disabled");
        $(".btn-edit").removeClass("disabled");
        $(".btn-remove").removeClass("disabled");

    })
}

function cancelRecord(xml) {
    $(".btn-cancel").on("click", function(){
        var $domTr = $(this).parent().parent();
        var $domTd = $(this).parent().siblings();
        var codeId = '#'+$domTr.data("id");
        var currentBrand = $domTd.eq(0).children("input").val();
        var currentModel = $domTd.eq(1).children("input").val();
        var currentYear = $domTd.eq(2).children("input").val();
        var currentSpeed = $domTd.eq(3).children("input").val();
        var currentPrice = $domTd.eq(4).children("input").val();

        var txt = '<td>'+
                    currentBrand+
                '</td>'+
                '<td>'+
                    currentModel+
                '</td>'+
                '<td>'+
                    currentYear+
                '</td>'+
                '<td>'+
                    currentSpeed+
                '</td>'+
                '<td>'+
                    currentPrice+
                '</td>'+
                '<td>'+
                    '<a href="javascript:;" class="btn btn-sm btn-secondary d-block w-100 text-left m-1 btn-edit">'+
                        '<i class="fas fa-edit"></i> Edit'+
                    '</a>'+
                    '<a href="javascript:;" class="btn btn-sm btn-danger d-block w-100 text-left m-1 btn-remove">'+
                        '<i class="fas fa-trash"></i> Remove'+
                    '</a>'+
                '</td>';
        $domTr.html(txt);

        $("#addRecord").removeClass("disabled");
        $(".btn-edit").removeClass("disabled");
        $(".btn-remove").removeClass("disabled");

        editRecord(xml);
        addRecord(xml);
        removeRecord(xml);
    })
}

function removeRecord(xml) {
    $(".btn-remove").on("click", function(){
        var $domTr = $(this).parent().parent();
        var $domTd = $(this).parent().siblings();
        var code = parseInt($domTr.data("id").substring(7));

        var txt = '<td colspan="6" class="text-success p-0" style="height: 92px; position: relative; overflow: hidden;">'+
                    '<small style="position: absolute;"><i class="fas fa-check"></i> Item removed!</small>'+
                '</td>';
        $domTr.html(txt);

        $domTr.children("td").animate({
            height: 0,
        }, 800, function(){
            var xmlDoc = xml.responseXML;
            var theItemWillBeRemoved = xmlDoc.getElementsByTagName("car")[code];
            xmlDoc.documentElement.removeChild(theItemWillBeRemoved)
            showData(xml);
        })
    })
}

function searchRecord(xml) {
    $(".btn-search").on("click", function(){
        var path = "/auto/car[contains(.,'"+$("#search-query").val()+"')]";
        showResultRecord(xml, path);
    })
    // $("#search-query").keyup(function(){
    //     var query = $(this).val();
    //     $(".btn-search").removeClass("disabled");
    //     $(".btn-search").on("click", function(){
    //         var path = "/auto/car[contains(.,'"+$("#search-query").val()+"')]";
    //         showResultRecord(xml, path);
    //     })
    // })
}

function filterRecord(xml) {
    var filterBrand = [];
    var filterYear = [];
    $("#filterBrand").html("");
    $("#filterYear").html("");

    $(".itemRecord td:nth-child(1)").each(function(){
        var value = $(this).html();
        if (filterBrand.indexOf(value) === -1) {
            filterBrand.push(value);
            var txt = $("#filterBrand").html();
            txt += '<option>'+value+'</option>';
            $("#filterBrand").html(txt);
        }
    })
    $(".itemRecord td:nth-child(3)").each(function(){
        var value = $(this).html();
        if (filterYear.indexOf(value) === -1) {
            filterYear.push(value);
            var txt = $("#filterYear").html();
            txt += '<option>'+value+'</option>';
            $("#filterYear").html(txt);
        }
    })


    $(".btn-filterToggle").on("click", function(){
        if ($("#filter").hasClass("active")) {
            $("#filter").removeClass("active");
            $("#filter").animate({
                height: 0,
            }, 500)

        } else {
            $("#filter").addClass("active");
            $("#filter").animate({
                height: 150+"px",
            }, 500)
        }
    })

    $("#filterMinPrice").focusout(function(){
        var price = parseFloat($("#filterMinPrice").val().replace(/[,-]+/g,"")).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        price = (price == 'NaN') ? '0.00' : price;
        $("#filterMinPrice").val(price);
    })
    $("#filterMaxPrice").focusout(function(){
        var price = parseFloat($("#filterMaxPrice").val().replace(/[,-]+/g,"")).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        price = (price == 'NaN') ? '0.00' : price;
        $("#filterMaxPrice").val(price);
    })

    $(".btn-filterConfirm").on("click", function(){
        var arrBrands = $("#filterBrand").val();
        var arrYears = $("#filterYear").val();
        var minPrice = parseFloat($("#filterMinPrice").val().replace(/[,-]+/g,""));
        var maxPrice = parseFloat($("#filterMaxPrice").val().replace(/[,-]+/g,""));
        if (maxPrice == 0) {
            maxPrice = 999999999999;
        }

        // var path = "/auto/car[contains(.,'"+$("#search-query").val()+"')]";
        var path = "/auto/car[(";

        $.each(arrBrands, function(i, val){
            flagFilter = true;
            path += "contains(make,'"+val+"') or ";
        })
        if (arrBrands.length > 0) {
            path = path.slice(0,-4);
            path +=  ") and ("
        } else {}
        

        $.each(arrYears, function(i, val){
            path += "contains(year,'"+val+"') or ";
        })
        if (arrYears.length > 0) {
            path = path.slice(0,-4);
            path +=  ") and "
        } else {
            path = path.slice(0,-1);
        }
        

        path += "price>="+minPrice+" and ";
        path += "price<="+maxPrice+" and ";

        path = path.slice(0,-5);
        
        path += "]"
        // console.log(path);
        showResultRecord(xml, path);

    })



}

function showResultRecord(xml, path) {
    if (xml == undefined || path == undefined) {
        return false;
    }
    var xmlDoc = xml.responseXML;
    var t0 = performance.now();
    var nodes = xmlDoc.evaluate(path, xmlDoc, null, XPathResult.ANY_TYPE, null);
    var result = nodes.iterateNext();
    var txt = '<table class="table">'+
                '<thead>'+
                    '<tr>'+
                        '<th>Brand</th>'+
                        '<th>Model</th>'+
                        '<th>Year</th>'+
                        '<th>Top Speed</th>'+
                        '<th>Price</th>'+
                    '</tr>'+
                '</thead>';
    var foundedResult = 0;
    var temp = '';
    while (result) {
        foundedResult += 1;
        temp += '<tr data-id="record-search" class="itemRecord">'+
                '<td>'+result.children[0].innerHTML+'</td>'+
                '<td>'+result.children[1].innerHTML+'</td>'+
                '<td>'+result.children[2].innerHTML+'</td>'+
                '<td>'+result.children[3].innerHTML+'</td>'+
                '<td>'+parseInt(result.children[4].innerHTML).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+'</td>'+
            '</tr>';
        result = nodes.iterateNext();
    } 
    var t1 = performance.now();
    txt += temp;
    txt += '<tr>'+
                '<td colspan="1"><a href="javascript:;" class="btn btn-secondary btn-sm btn-showAll"><i class="fas fa-angle-left"></i> Show all result </a></td>'+
                '<td colspan="4"><small>Founded '+foundedResult+' results ('+((t1 - t0)/1000).toFixed(3)+' seconds)</small></td>'+
            '</tr>';
    txt += "</table>";
    document.getElementById("table").innerHTML = txt;

    $(".btn-showAll").on("click", function(){
        showData(xml);
    })
}