sap.ui.define(
  ["sap-app/controllers/BaseController", "sap/ui/model/json/JSONModel"],
  function (BaseController, JSONModel) {
    return BaseController.extend("sap-app.controllers.Employee.Detail", {
      // onInit: function () {
      //   var oRouter = this.getRouter();
      //   console.log(oRouter, "o router")
      // },
      onAfterRendering: function() {
        const {id} = this.getCurrentParams();
        if(id) {
          let model = new JSONModel({id});
          this.getView().setModel(model);
        }
      },
      getCurrentParams: function(router = this.getOwnerComponent().getRouter()) {
        const currentHash = router.getHashChanger().getHash();
        const { arguments } = router.getRouteInfoByHash(currentHash);
        return arguments;
      },
    });
  }
);
