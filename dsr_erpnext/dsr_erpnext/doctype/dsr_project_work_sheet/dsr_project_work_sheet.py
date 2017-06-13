# -*- coding: utf-8 -*-
# Copyright (c) 2017, MN Technique and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class DSRProjectWorkSheet(Document):
	def get_work_log(self):
		particulars = frappe.get_all("DSR Daily Project Work Log", fields=["*"], filters={"project_worksheet" : self.name})	
		out = [p for p in particulars if p.creation.date() == frappe.utils.getdate(self.log_date)]
		return out

	def get_manpower(self):
		manpower = frappe.get_all("DSR Daily Manpower Log", fields=["*"], filters={"project_worksheet" : self.name})	
		out = [m for m in manpower if m.creation.date() == frappe.utils.getdate(self.log_date)]
		return out

	def get_material(self):
		materials = frappe.get_all("DSR Daily Material Log", fields=["*"], filters={"project_worksheet" : self.name})	
		out = [m for m in materials if m.creation.date() == frappe.utils.getdate(self.log_date)]
		return out

	def get_equipments(self):
		equipments = frappe.get_all("DSR Daily Equipment Log", fields=["*"], filters={"project_worksheet" : self.name}) 
		out = [e for e in equipments if e.creation.date() == frappe.utils.getdate(self.log_date)]
		return out

	def get_consumables(self):
		from erpnext.stock.stock_balance import get_balance_qty_from_sle

		consumables = frappe.get_all("DSR Daily Consumables Log", fields=["*"], filters={"project_worksheet" : self.name}) 
		out = [c for c in consumables if c.creation.date() == frappe.utils.getdate(self.log_date)]
		return out

	def get_expenses(self):
		expense = frappe.get_all("DSR Daily Expense Log", fields=["*"], filters={"project_worksheet" : self.name})
		out = [e for e in expense if e.creation.date() == frappe.utils.getdate(self.log_date)]
		return out
		
	def	new_worklog(self,values):
		worklog = frappe.new_doc("DSR Daily Project Work Log")
		worklog.project_worksheet = self.name
		worklog.work_particulars = values.get("work_particulars")
		worklog.uom = values.get("uom")
		worklog.total = values.get("total")
		worklog.save()
		frappe.db.commit()
		msg = "New Daily Work Log Created"
		return msg

	def	new_manpower(self,values):
		manpower = frappe.new_doc("DSR Daily Manpower Log")
		manpower.project_worksheet = self.name
		manpower.work_alloted = values.get("work_alloted")
		manpower.no_of_personnel = values.get("no_of_personnel")
		manpower.manpower_category = values.get("manpower_category")
		manpower.wage_calculation = values.get("wage_calculation")
		manpower.save()
		frappe.db.commit()
		msg = "New Manpower Log Created"
		return msg

	def	new_material_log(self,values):
		material = frappe.new_doc("DSR Daily Material Log")
		material.project_worksheet = self.name
		material.truck = values.get("truck")
		material.driver_name = values.get("driver_name")
		material.material_direction = values.get("material_direction")
		material.material = values.get("material")
		material.time = values.get("time")
		material.from_warehouse = values.get("from_warehouse")
		material.to_warehouse = values.get("to_warehouse")
		material.tonnage = values.get("tonnage")						
		material.rate = values.get("rate")								
		material.save()
		frappe.db.commit()
		msg = "New Material Log Created"
		return msg			

	def	new_equipment_log(self,values):
		equipment = frappe.new_doc("DSR Daily Equipment Log")
		equipment.project_worksheet = self.name
		equipment.equipment = values.get("equipment")
		equipment.equipment_type = values.get("equipment_type")
		equipment.registration_no = values.get("registration_no")
		equipment.operator_name = values.get("operator_name")
		equipment.opening_reading = values.get("opening_reading")
		equipment.closing_reading = values.get("closing_reading")
		equipment.total = values.get("total")						
		equipment.fuel_received = values.get("fuel_received")
		equipment.remarks = values.get("remarks")								
		equipment.save()
		frappe.db.commit()
		msg = "New Equipment Log Created"
		return msg	

	def	new_consumables_log(self,values):
		consumables = frappe.new_doc("DSR Daily Consumables Log")
		consumables.project_worksheet = self.name
		consumables.item = values.get("item")
		consumables.delivered_by = values.get("delivered_by")
		consumables.qty = values.get("qty")
		consumables.qty_used = values.get("qty_used")
		consumables.qty_balance = values.get("qty_balance")
		consumables.remarks = values.get("remarks")								
		consumables.save()
		frappe.db.commit()
		msg = "New Consumables Log Created"
		return msg						

	def	new_expense_log(self,values):
		expense = frappe.new_doc("DSR Daily Expense Log")
		expense.project_worksheet = self.name
		expense.expense_type = values.get("expense_type")
		expense.particulars = values.get("particulars")
		expense.amount = values.get("amount")
		expense.save()
		frappe.db.commit()
		msg = "New Expense Log Created"
		return msg
