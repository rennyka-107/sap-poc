
sap.ui.define(
  ["sap-app/controllers/BaseController", "sap/ui/model/json/JSONModel"],
  function (BaseController, JSONModel) {
    "use strict";
    return BaseController.extend("sap-app.controllers.Employee.List", {
      onInit: function () {
        // this.getView().byId("html").setContent("<canvas id='signature-pad' width='400' height='200' class='signature-pad'></canvas>");
        fetch("../../models/data.json")
          .then((res) => res.json())
          .then((res) => {
            const model = new JSONModel({
              users: res.data,
              user: {
                name: "Long",
                age: "123",
              },
              product: {
                "ProductId": "HT-1000",
                "Category": "Laptops",
                "MainCategory": "Computer Systems",
                "TaxTarifCode": "1",
                "SupplierName": "Very Best Screens",
                "WeightMeasure": 4.2,
                "WeightUnit": "KG",
                "Description": "Notebook Basic 15 with 2,80 GHz quad core, 15\" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro",
                "Name": "Notebook Basic 15",
                "DateOfSale": "2017-03-26",
                "ProductPicUrl": "https://sdk.openui5.org/test-resources/sap/ui/documentation/sdk/images/HT-1000.jpg",
                "Status": "Available",
                "Quantity": 10,
                "UoM": "PC",
                "CurrencyCode": "EUR",
                "Price": 956,
                "Width": 30,
                "Depth": 18,
                "Height": 3,
                "DimUnit": "cm"
              }
            });
            this.getView().setModel(model);
            console.log(res, "res");
          });
      },
      onAfterRendering: function () {
        console.log("after rendering");
      },
      onListItemPress: function(n) {
        console.log("haha", n);
        this.getRouter().navTo("employeeDetail", { id: n })
      },
      handleGenerateQRCode: function () {

        // var Arr = [];
        // // Google Chart API....
        // var baseURL = "http://chart.apis.google.com/chart?cht=qr&chs=250x250&chl=";
        // var allString = "";
        // Arr.push({
        //  key: "Product-Id",
        //  value: 123
        // });
        // Arr.push({
        //  key: "Product-Name",
        //  value: "Name"
        // });
        // Arr.push({
        //  key: "Product-Desc",
        //  value: "Desc"
        // });
        // Arr.push({
        //  key: "Company-Name",
        //  value: "Company"
        // });
        // allString = escape(JSON.stringify(Arr));
        // var url = baseURL + allString;
        // // setting final URL to image,which I have taken in view....
        // this.byId("imgId").setSrc(url);
       },
       onSign : function(oEvent){
        var canvas = document.getElementById("signature-pad");
        var context = canvas.getContext("2d");
        canvas.width = 276;
        canvas.height = 180;
        context.fillStyle = "#fff";
        context.strokeStyle = "#444";
        context.lineWidth = 1.5;
        context.lineCap = "round";
        context.fillRect(0, 0, canvas.width, canvas.height);
        var pixels = [];
        var xyLast = {};
        var xyAddLast = {};
        var calculate = false;
        var signaturePad = new SignaturePad(document.getElementById('signature-pad'), {
          backgroundColor: '#ffffff',
          penColor: 'rgb(0, 0, 0)',
          penWidth : '1'
      })
        { 	//functions
          function remove_event_listeners() {
            canvas.removeEventListener('mousemove', on_mousemove, false);
            canvas.removeEventListener('mouseup', on_mouseup, false);
            canvas.removeEventListener('touchmove', on_mousemove, false);
            canvas.removeEventListener('touchend', on_mouseup, false);
    
            document.body.removeEventListener('mouseup', on_mouseup, false);
            document.body.removeEventListener('touchend', on_mouseup, false);
          }
    
          function get_coords(e) {
            var x, y;
    
            if (e.changedTouches && e.changedTouches[0]) {
              var offsety = canvas.offsetTop || 0;
              var offsetx = canvas.offsetLeft || 0;
    
              x = e.changedTouches[0].pageX - offsetx;
              y = e.changedTouches[0].pageY - offsety;
            } else if (e.layerX || 0 == e.layerX) {
              x = e.layerX;
              y = e.layerY;
            } else if (e.offsetX || 0 == e.offsetX) {
              x = e.offsetX;
              y = e.offsetY;
            }
    
            return {
              x : x, y : y
            };
          };
    
          function on_mousedown(e) {
            e.preventDefault();
            e.stopPropagation();
    
            canvas.addEventListener('mouseup', on_mouseup, false);
            canvas.addEventListener('mousemove', on_mousemove, false);
            canvas.addEventListener('touchend', on_mouseup, false);
            canvas.addEventListener('touchmove', on_mousemove, false);
            document.body.addEventListener('mouseup', on_mouseup, false);
            document.body.addEventListener('touchend', on_mouseup, false);
    
            empty = false;
            var xy = get_coords(e);
            context.beginPath();
            pixels.push('moveStart');
            context.moveTo(xy.x, xy.y);
            pixels.push(xy.x, xy.y);
            xyLast = xy;
          };
    
          function on_mousemove(e, finish) {
            e.preventDefault();
            e.stopPropagation();
    
            var xy = get_coords(e);
            var xyAdd = {
              x : (xyLast.x + xy.x) / 2,
              y : (xyLast.y + xy.y) / 2
            };
    
            if (calculate) {
              var xLast = (xyAddLast.x + xyLast.x + xyAdd.x) / 3;
              var yLast = (xyAddLast.y + xyLast.y + xyAdd.y) / 3;
              pixels.push(xLast, yLast);
            } else {
              calculate = true;
            }
    
            context.quadraticCurveTo(xyLast.x, xyLast.y, xyAdd.x, xyAdd.y);
            pixels.push(xyAdd.x, xyAdd.y);
            context.stroke();
            context.beginPath();
            context.moveTo(xyAdd.x, xyAdd.y);
            xyAddLast = xyAdd;
            xyLast = xy;
    
          };
    
          function on_mouseup(e) {
            remove_event_listeners();
            disableSave = false;
            context.stroke();
            pixels.push('e');
            calculate = false;
          };
        }
        canvas.addEventListener('touchstart', on_mousedown, false);
        canvas.addEventListener('mousedown', on_mousedown, false);
    
      },
      
      
      /***********Download the Signature Pad********************/
      
      saveButton : function(oEvent){
        var canvas = document.getElementById("signature-pad");
        var link = document.createElement('a');
        link.href = canvas.toDataURL('image/jpeg'); 
        link.download = 'sign.jpeg';
        link.click(); 
        var signaturePad = new SignaturePad(document.getElementById('signature-pad'), {
            backgroundColor: '#ffffff',
            penColor: 'rgb(0, 0, 0)'
        })
      },
      
      /************Clear Signature Pad**************************/
      
      clearButton : function(oEvent){
        var canvas = document.getElementById("signature-pad");
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        var signaturePad = new SignaturePad(document.getElementById('signature-pad'), {
            backgroundColor: '#ffffff',
            penColor: 'rgb(0, 0, 0)',
            penWidth : '1'
        })
      }
     
    });
  }
);
