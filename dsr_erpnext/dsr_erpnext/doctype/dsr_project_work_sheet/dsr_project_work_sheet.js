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
			$(frm.fields_dict['manpower_html'].wrapper)
			.html(frappe.render_template("manpower", {"manpower": r.message || []})).find(".btn-vehicle").on("click", function() {

			});
		}
	});
}

function get_material(frm) {
	frappe.call({
		doc: frm.doc,
		method: "get_material",
		callback: function(r) {
			$(frm.fields_dict['material_html'].wrapper)
			.html(frappe.render_template("material", {"materials": r.message || []}));
		}
	});
}

function get_equipments(frm) {
	frappe.call({
		doc: frm.doc,
		method: "get_equipments",
		callback: function(r) {
			$(frm.fields_dict['equipment_html'].wrapper)
			.html(frappe.render_template("equipments", {"equipments": r.message || []})).find(".btn-vehicle").on("click", function() {

			});
		}
	});
}

function get_consumables(frm) {
	frappe.call({
		doc: frm.doc,
		method: "get_consumables",
		callback: function(r) {
			$(frm.fields_dict['consumables_html'].wrapper)
			.html(frappe.render_template("consumables_and_goods_received", {"consumables": r.message || []})).find(".btn-vehicle").on("click", function() {

			});
		}
	});
}

function get_expense(frm) {
	frappe.call({
		doc: frm.doc,
		method: "get_expense",
		callback: function(r) {
			$(frm.fields_dict['expenses_html'].wrapper)
			.html(frappe.render_template("expense", {"expenses": r.message || []})).find(".btn-vehicle").on("click", function() {

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


