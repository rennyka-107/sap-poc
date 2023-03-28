sap.ui.define(
  ["sap-app/controllers/BaseController", "sap/ui/model/json/JSONModel"],
  function (BaseController, JSONModel) {
    return BaseController.extend("sap-app.controllers.Employee.Detail", {
      onInit: function () {
        this._oObjectPage = this.getView().byId("ObjectPageLayout");
        this._oObjectPage.attachEvent("subSectionVisibilityChange", this.onSectionVisibilityChanged, this);
      },
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
      onSectionVisibilityChanged: function(oEvent) {
        var oVisibleSubSections = oEvent.getParameter("visibleSubSections"),
          aSubSectionsIds = Object.keys(oVisibleSubSections);
  
        if (aSubSectionsIds.length === 1) {
          oVisibleSubSections[aSubSectionsIds[0]].addStyleClass("sapUxAPObjectPageSubSectionFitContainer");
        } else {
          aSubSectionsIds.forEach(function(sKey) {
            oVisibleSubSections[sKey].removeStyleClass("sapUxAPObjectPageSubSectionFitContainer");
          });
        }
      }
    });
  }
);
