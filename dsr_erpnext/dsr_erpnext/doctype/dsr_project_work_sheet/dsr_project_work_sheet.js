// Copyright (c) 2017, MN Technique and contributors
// For license information, please see license.txt

frappe.ui.form.on('DSR Project Work Sheet', {
	onload: function(frm) {
		get_particulars(frm);
		get_manpower(frm);
		get_material(frm);
		get_equipments(frm);
		get_consumables(frm);
		get_expense(frm);
	}
});

function get_particulars(frm) {
	frappe.call({
		doc: frm.doc,
		method: "get_work_log",
		callback: function(r) {
			$(frm.fields_dict['particulars_html'].wrapper)
			.html(frappe.render_template("particulars", {"particulars": r.message})).find(".btn-vehicle").on("click", function() {
				// frappe.new_doc("Vehicle");
			});
		}
	});
}

function get_manpower(frm) {
	frappe.call({
		method: "get_manpower",
		callback: function(r) {
			$(frm.fields_dict['manpower_html'].wrapper)
			.html(frappe.render_template("manpower", {"manpower": r.message})).find(".btn-vehicle").on("click", function() {

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
			.html(frappe.render_template("material", {"materials": r.message}));
		}
	});
}

function get_equipments(frm) {
	frappe.call({
		doc: frm.doc,
		method: "get_equipments",
		callback: function(r) {
			$(frm.fields_dict['equipment_html'].wrapper)
			.html(frappe.render_template("equipments", {"equipments": r.message})).find(".btn-vehicle").on("click", function() {

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
			.html(frappe.render_template("consumables_and_goods_received", {"consumables": r.message})).find(".btn-vehicle").on("click", function() {

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
			.html(frappe.render_template("expense", {"expenses": r.message})).find(".btn-vehicle").on("click", function() {

			});
		}
	});
}