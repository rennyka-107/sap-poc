sap.ui.define(
  ["sap-app/controllers/BaseController", "sap/ui/model/json/JSONModel"],
  function (BaseController, JSONModel) {
    "use strict";
    return BaseController.extend(
      "sap-app.controllers.components.BlockDetailPart3",
      {
        onInit: function () {
          let dataLogin = {
            number: 68688,
            dialogMode: true,
            listLayout: true,
            time: 112,
            amount: 12,
            salary: 10000,
          };
          let model = new JSONModel(dataLogin);
          this.getView().setModel(model);
        },
        onAfterRendering: function () {},
        handleSubmit: function () {
          // const { username, password } = this.getView().getModel().getData();
          // if (username === "admin" && password === "admin") {
          //   localStorage.setItem("accessToken", "admin-token");
          //   this.getRouter().navTo("home");
          // }
        },
        onContainerOpen: function (oEvt) {
          var oView = this.getView();
          var oPopup = oView.byId("p13nPopup");
          if (!this._bIsOpen) {
            this._setInitialData();
            this._bIsOpen = true;
          }

          oPopup.open(oEvt.getSource());
        },
        _setInitialData: function () {
          var oView = this.getView();

          var oSelectionPanel = oView.byId("columnsPanel");
          var oSortPanel = oView.byId("sortPanel");
          var oGroupPanel = oView.byId("groupPanel");

          oSelectionPanel.setP13nData(this._initialData.columns);
          oSortPanel.setP13nData(this._initialData.sort);
          oGroupPanel.setP13nData(this._initialData.group);
        },
      }
    );
  }
);
