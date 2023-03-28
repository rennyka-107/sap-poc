sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";

	var BlockEmpDetailPart1 = BlockBase.extend("sap-app.components.Employee.employment.BlockDetailPart1", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "sap-app.components.Employee.employment.BlockDetailPart1",
					type: "XML"
				},
				Expanded: {
					viewName: "sap-app.components.Employee.employment.BlockDetailPart1",
					type: "XML"
				}
			}
		}
	});
	return BlockEmpDetailPart1;
});
