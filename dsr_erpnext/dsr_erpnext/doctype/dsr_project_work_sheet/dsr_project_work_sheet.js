// Copyright (c) 2017, MN Technique and contributors
// For license information, please see license.txt

frappe.ui.form.on('DSR Project Work Sheet', {
	onload: function(frm) {
		frm.set_df_property("sb_particulars", "hidden", frm.doc.__islocal ? 1:0);
		frm.set_df_property("sb_manpower", "hidden", frm.doc.__islocal ? 1:0);
		frm.set_df_property("sb_equipments", "hidden", frm.doc.__islocal ? 1:0);
		frm.set_df_property("sb_consumables", "hidden", frm.doc.__islocal ? 1:0);
		frm.set_df_property("sb_material", "hidden", frm.doc.__islocal ? 1:0);
		frm.set_df_property("sb_expenses", "hidden", frm.doc.__islocal ? 1:0);
	},
	project: function(frm) {
		if (frm.doc.project) {
			msgprint("Please save the worksheet before proceeding.");
		}
	},
	refresh: function(frm) {
		if (frm.doc.project) {
			frm.set_df_property("sb_particulars", "hidden", frm.doc.__islocal ? 1:0);
			frm.set_df_property("sb_manpower", "hidden", frm.doc.__islocal ? 1:0);
			frm.set_df_property("sb_equipments", "hidden", frm.doc.__islocal ? 1:0);
			frm.set_df_property("sb_consumables", "hidden", frm.doc.__islocal ? 1:0);
			frm.set_df_property("sb_material", "hidden", frm.doc.__islocal ? 1:0);
			frm.set_df_property("sb_expenses", "hidden", frm.doc.__islocal ? 1:0);

			get_particulars(frm);
			get_manpower(frm);
			get_material(frm);
			get_equipments(frm);
			get_consumables(frm);
			get_expense(frm);
		}
	}
});

function get_particulars(frm) {
	frappe.call({
		doc: frm.doc,
		method: "get_work_log",
		callback: function(r) {
			var wrapper = $(frm.fields_dict['particulars_html'].wrapper);
			
			wrapper.html(frappe.render_template("particulars", {"particulars": r.message || []}));
			wrapper.find(".btn-work-particulars-add").on("click", function() {
				create_new();
			});
			wrapper.find(".btn-work-particulars-view-all").on("click", function() {
				frappe.route_options = {"project_worksheet": cur_frm.doc.name};
				frappe.set_route("List", "DSR Daily Project Work Log");
			});
		}
	});
}

function get_manpower(frm) {
	frappe.call({
		doc: frm.doc,
		method: "get_manpower",
		callback: function(r) {
			var wrapper = $(frm.fields_dict['manpower_html'].wrapper);
			
			wrapper.html(frappe.render_template("manpower", {"manpower": r.message || []}));
			wrapper.find(".btn-manpower-add").on("click", function() {
				create_new_manpower();
			});
			wrapper.find(".btn-manpower-view-all").on("click", function() {
				frappe.route_options = {"project_worksheet": cur_frm.doc.name};
				frappe.set_route("List", "DSR Daily Manpower Log");
			});
		}
	});
}

function get_material(frm) {
	frappe.call({
		doc: frm.doc,
		method: "get_material",
		callback: function(r) {
			var wrapper = $(frm.fields_dict['material_html'].wrapper);
			
			wrapper.html(frappe.render_template("material", {"materials": r.message || []}));
			wrapper.find(".btn-material-add").on("click", function() {
				create_new_material_log();
			});
			wrapper.find(".btn-material-view-all").on("click", function() {
				frappe.route_options = {"project_worksheet": cur_frm.doc.name};
				frappe.set_route("List", "DSR Daily Material Log");
			});
		}
	});
}

function get_equipments(frm) {
	frappe.call({
		doc: frm.doc,
		method: "get_equipments",
		callback: function(r) {
			var wrapper = $(frm.fields_dict['equipment_html'].wrapper);
			
			wrapper.html(frappe.render_template("equipments", {"equipments": r.message || []}));
			wrapper.find(".btn-equipments-add").on("click", function() {
				create_new_equipments_log();
			});
			wrapper.find(".btn-equipments-view-all").on("click", function() {
				frappe.route_options = {"project_worksheet": cur_frm.doc.name};
				frappe.set_route("List", "DSR Daily Equipment Log");
			});
		}
	});
}

function get_consumables(frm) {
	frappe.call({
		doc: frm.doc,
		method: "get_consumables",
		callback: function(r) {
			var wrapper = $(frm.fields_dict['consumables_html'].wrapper);
			
			wrapper.html(frappe.render_template("consumables_and_goods_received", {"consumables": r.message || []}));
			wrapper.find(".btn-consumables-add").on("click", function() {
				create_new_consumables_log();
			});
			wrapper.find(".btn-consumables-view-all").on("click", function() {
				frappe.route_options = {"project_worksheet": cur_frm.doc.name};
				frappe.set_route("List", "DSR Daily Consumables Log");
			});
		}
	});
}

function get_expense(frm) {
	frappe.call({
		doc: frm.doc,
		method: "get_expense",
		callback: function(r) {
			var wrapper = $(frm.fields_dict['expenses_html'].wrapper);
			
			wrapper.html(frappe.render_template("expense", {"expenses": r.message || []}));
			wrapper.find(".btn-expense-add").on("click", function() {
				create_new_expense_log();
			});
			wrapper.find(".btn-expense-view-all").on("click", function() {
				frappe.route_options = {"project_worksheet": cur_frm.doc.name};
				frappe.set_route("List", "DSR Daily Expense Log");
			});
		}
	});
}

function create_new() {
	var frm = cur_frm;
	var dialog = new frappe.ui.Dialog({
		title: __("New Particulars"),
		fields: [
			{fieldtype: "Data", fieldname: "work_particulars", label: __("Work Particulars"), reqd: 1},
			{fieldtype: "Link", fieldname: "uom", options:"UOM", label: __("UOM"), reqd: 1},
			{fieldtype: "Currency", fieldname: "total", label: __("Total"), reqd: 1}
		]
	});

	dialog.set_primary_action(__("Save"), function() {
		var btn = this;
		var values = dialog.get_values();
		frappe.call({
			doc: frm.doc,
			method: "new_worklog",
			args: {
				"values": values
			},
			callback: function(r) {
				get_particulars(frm);
				frappe.show_alert(r.message);
				dialog.clear(); dialog.hide();
			}
		})
	});
	dialog.show();
}

function create_new_manpower() {
	var frm = cur_frm;
	var dialog = new frappe.ui.Dialog({
		title: __("New Manpower"),
		fields: [
			{fieldtype: "Link", fieldname: "work_alloted", options:"Task", label: __("Work Alloted"), reqd: 1},
			{fieldtype: "Int", fieldname: "no_of_personnel", label: __("No of personnel"), reqd: 1},
			{fieldtype: "Link", fieldname: "manpower_category", options:"Workstation", label: __("Manpower Category"), reqd: 1},
			{fieldtype: "Data", fieldname: "wage_calculation", label: __("Wage Calculation"), reqd: 1}
		]
	});

	dialog.set_primary_action(__("Save"), function() {
		var btn = this;
		var values = dialog.get_values();
		frappe.call({
			doc: frm.doc,
			method: "new_manpower",
			args: {
				"values": values
			},
			callback: function(r) {
				get_manpower(frm);
				frappe.show_alert(r.message);
				dialog.clear(); dialog.hide();
			}
		})
	});
	dialog.show();
}

function create_new_material_log() {
	var frm = cur_frm;
	var dialog = new frappe.ui.Dialog({
		title: __("New Material"),
		fields: [
			{fieldtype: "Link", fieldname: "truck", options:"Vehicle", label: __("Truck"), reqd: 1},
			{fieldtype: "Data", fieldname: "vehicle_no", label: __("Vehicle No"), reqd: 1},
			{fieldtype: "Data", fieldname: "driver_name", label: __("Driver Name"), reqd: 1},
			// ****************Below Fieldtype needs to be finalised****************
			{fieldtype: "Data", fieldname: "material_direction", label: __("Material Direction"), reqd: 1},
			{fieldtype: "Link", fieldname: "material", options:"Item", label: __("Material"), reqd: 1},
			{fieldtype: "Datetime", fieldname: "time", label: __("Time"), reqd: 1},					
			{fieldtype: "Link", options:"Warehouse", fieldname: "from", label: __("From"), reqd: 1},
			{fieldtype: "Link", options:"Warehouse", fieldname: "to", label: __("To"), reqd: 1},
			{fieldtype: "Float", fieldname: "tonnage", label: __("Tonnage"), reqd: 1},
			{fieldtype: "Currency", fieldname: "rate", label: __("Rate"), reqd: 1},
		]
	});

	dialog.set_primary_action(__("Save"), function() {
		var btn = this;
		var values = dialog.get_values();
		frappe.call({
			doc: frm.doc,
			method: "new_material_log",
			args: {
				"values": values
			},
			callback: function(r) {
				get_material(frm);
				frappe.show_alert(r.message);
				dialog.clear(); dialog.hide();
			}
		})
	});
	dialog.show();
}

function create_new_equipments_log() {
	var frm = cur_frm;
	var dialog = new frappe.ui.Dialog({
		title: __("New Equipment"),
		fields: [
			{fieldtype: "Link", fieldname: "equipment", options:"Asset", label: __("Equipment"), reqd: 1},
			// ****************Below Fieldtype needs to be finalised****************
			{fieldtype: "Data", fieldname: "equipment_type", label: __("Equipment Type"), reqd: 1},
			{fieldtype: "Data", fieldname: "registration_no", label: __("Registration No"), reqd: 1},
			{fieldtype: "Link", fieldname: "operator_name", options:"Employee", label: __("Operator Name"), reqd: 1},
			{fieldtype: "Float", fieldname: "opening_reading", label: __("Opening Reading"), reqd: 1},
			{fieldtype: "Float", fieldname: "closing_reading", label: __("Closing Reading"), reqd: 1},					
			{fieldtype: "Float", fieldname: "total", label: __("Total"), reqd: 1},					
			{fieldtype: "Check", fieldname: "fuel_received", label: __("Fuel Received")},
			{fieldtype: "Small Text", fieldname: "remarks", label: __("Remarks"), reqd: 1}
		]
	});

	dialog.set_primary_action(__("Save"), function() {
		var btn = this;
		var values = dialog.get_values();
		frappe.call({
			doc: frm.doc,
			method: "new_equipment_log",
			args: {
				"values": values
			},
			callback: function(r) {
				get_equipments(frm);
				frappe.show_alert(r.message);
				dialog.clear(); dialog.hide();
			}
		})
	});
	dialog.show();
}

function create_new_consumables_log() {
	var frm = cur_frm;
	var dialog = new frappe.ui.Dialog({
		title: __("New Consumable"),
		fields: [
			{fieldtype: "Link", fieldname: "item", options:"Item", label: __("Item"), reqd: 1},
			{fieldtype: "Link", fieldname: "delivered_by", options:"Employee", label: __("Delivered By"), reqd: 1},
			{fieldtype: "Float", fieldname: "qty", label: __("Quantity"), reqd: 1},
			{fieldtype: "Float", fieldname: "qty_used", label: __("Quantity Used"), reqd: 1},
			{fieldtype: "Float", fieldname: "qty_balance", label: __("Quantity Balance"), reqd: 1},
			{fieldtype: "Small Text", fieldname: "remarks", label: __("Remarks"), reqd: 1}
		]
	});

	dialog.set_primary_action(__("Save"), function() {
		var btn = this;
		var values = dialog.get_values();
		frappe.call({
			doc: frm.doc,
			method: "new_consumables_log",
			args: {
				"values": values
			},
			callback: function(r) {
				get_consumables(frm);
				frappe.show_alert(r.message);
				dialog.clear(); dialog.hide();
			}
		})
	});
	dialog.show();
}

function create_new_expense_log() {
	var frm = cur_frm;
	var dialog = new frappe.ui.Dialog({
		title: __("New Expense"),
		fields: [
			{fieldtype: "Link", fieldname: "expense_type", options:"Item", label: __("Expense Type"), reqd: 1},
			{fieldtype: "Small Text", fieldname: "particulars", label: __("Particulars"), reqd: 1},
			{fieldtype: "Currency", fieldname: "amount", label: __("Amount"), reqd: 1}
		]
	});

	dialog.set_primary_action(__("Save"), function() {
		var btn = this;
		var values = dialog.get_values();
		frappe.call({
			doc: frm.doc,
			method: "new_expense_log",
			args: {
				"values": values
			},
			callback: function(r) {
				get_expense(frm);
				frappe.show_alert(r.message);
				dialog.clear(); dialog.hide();
			}
		})
	});
	dialog.show();
}
