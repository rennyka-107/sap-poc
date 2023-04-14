sap.ui.define(
  [
    "sap-app/controllers/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
    "sap/m/MessageBox",
  ],
  function (
    BaseController,
    JSONModel,
    Filter,
    FilterOperator,
    Sorter,
    MessageBox
  ) {
    "use strict";
    return BaseController.extend("sap-app.controllers.Employee.List", {
      onInit: function () {
        var oModel = new JSONModel();
        let oProductsModel = new JSONModel(
          sap.ui.require.toUrl("sap-app/models/products.json")
        );
        console.log(oProductsModel);
        oProductsModel.setSizeLimit(1000);
        // this.getView().setModel(oProductsModel, "products");
        fetch("/proxy/sphinx/api_get_emp2?sap-client=800", {
          method: "GET",
          headers: {
            Authorization: "Basic dnVvbmc6dHVlbWluaDQ=",
          },
        })
          .then((res) => res.json())
          .then((res) => {
            oModel.setData(res);
            console.log(res);
            this.getView().setModel(oModel, "products");
          });
        // this.getView().byId("html").setContent("<canvas id='signature-pad' width='400' height='200' class='signature-pad'></canvas>");
        this.oView = this.getView();
        this._bDescendingSort = false;
        this.oModel = this.oView.byId("productsTable");
        this.oRouter = this.getOwnerComponent().getRouter();
      },
      onAfterRendering: function () {
        console.log("after rendering");
      },
      onSearch: function (oEvent) {
        var oTableSearchState = [],
          sQuery = oEvent.getParameter("query");

        if (sQuery && sQuery.length > 0) {
          oTableSearchState = [
            new Filter("Name", FilterOperator.Contains, sQuery),
          ];
        }

        this.oProductsTable
          .getBinding("items")
          .filter(oTableSearchState, "Application");
      },
      handleOpen: function () {
        const oDialog = this.getView().byId("helloDialog");
        console.log("vào đây", oDialog);
        oDialog.show();
      },
      handleClose: function () {
        var oDialog = this.getView().byId("helloDialog");
        oDialog.close();
      },
      onAdd: function () {
        MessageBox.information("This functionality is not ready yet.", {
          title: "Aw, Snap!",
        });
      },

      onSort: function () {
        this._bDescendingSort = !this._bDescendingSort;
        var oBinding = this.oProductsTable.getBinding("items"),
          oSorter = new Sorter("Name", this._bDescendingSort);

        oBinding.sort(oSorter);
      },
      onListItemPress: function (oEvent) {
        var supplierPath = oEvent
            .getSource()
            .getBindingContext("products")
            .getPath(),
          employeeId = supplierPath.split("/").slice(-1).pop();
        console.log(employeeId);
        this.getRouter().navTo("employeeDetail", { employeeId });
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
      onSign: function (oEvent) {
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
        var signaturePad = new SignaturePad(
          document.getElementById("signature-pad"),
          {
            backgroundColor: "#ffffff",
            penColor: "rgb(0, 0, 0)",
            penWidth: "1",
          }
        );
        {
          //functions
          function remove_event_listeners() {
            canvas.removeEventListener("mousemove", on_mousemove, false);
            canvas.removeEventListener("mouseup", on_mouseup, false);
            canvas.removeEventListener("touchmove", on_mousemove, false);
            canvas.removeEventListener("touchend", on_mouseup, false);

            document.body.removeEventListener("mouseup", on_mouseup, false);
            document.body.removeEventListener("touchend", on_mouseup, false);
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
              x: x,
              y: y,
            };
          }

          function on_mousedown(e) {
            e.preventDefault();
            e.stopPropagation();

            canvas.addEventListener("mouseup", on_mouseup, false);
            canvas.addEventListener("mousemove", on_mousemove, false);
            canvas.addEventListener("touchend", on_mouseup, false);
            canvas.addEventListener("touchmove", on_mousemove, false);
            document.body.addEventListener("mouseup", on_mouseup, false);
            document.body.addEventListener("touchend", on_mouseup, false);

            empty = false;
            var xy = get_coords(e);
            context.beginPath();
            pixels.push("moveStart");
            context.moveTo(xy.x, xy.y);
            pixels.push(xy.x, xy.y);
            xyLast = xy;
          }

          function on_mousemove(e, finish) {
            e.preventDefault();
            e.stopPropagation();

            var xy = get_coords(e);
            var xyAdd = {
              x: (xyLast.x + xy.x) / 2,
              y: (xyLast.y + xy.y) / 2,
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
          }

          function on_mouseup(e) {
            remove_event_listeners();
            disableSave = false;
            context.stroke();
            pixels.push("e");
            calculate = false;
          }
        }
        canvas.addEventListener("touchstart", on_mousedown, false);
        canvas.addEventListener("mousedown", on_mousedown, false);
      },

      /***********Download the Signature Pad********************/

      saveButton: function (oEvent) {
        var canvas = document.getElementById("signature-pad");
        var link = document.createElement("a");
        link.href = canvas.toDataURL("image/jpeg");
        link.download = "sign.jpeg";
        link.click();
        var signaturePad = new SignaturePad(
          document.getElementById("signature-pad"),
          {
            backgroundColor: "#ffffff",
            penColor: "rgb(0, 0, 0)",
          }
        );
      },

      /************Clear Signature Pad**************************/

      clearButton: function (oEvent) {
        var canvas = document.getElementById("signature-pad");
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);

        var signaturePad = new SignaturePad(
          document.getElementById("signature-pad"),
          {
            backgroundColor: "#ffffff",
            penColor: "rgb(0, 0, 0)",
            penWidth: "1",
          }
        );
      },
    });
  }
);
