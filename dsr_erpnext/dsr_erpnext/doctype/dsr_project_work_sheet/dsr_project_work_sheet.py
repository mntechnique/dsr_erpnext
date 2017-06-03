# -*- coding: utf-8 -*-
# Copyright (c) 2017, MN Technique and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class DSRProjectWorkSheet(Document):
	def get_work_log(self):
		particulars = frappe.get_all("DSR Daily Project Work Log", fields=["*"], filters={"project_worksheet" : self.project})	
		return particulars

	def get_manpower(self):
		manpower = frappe.get_all("DSR Daily Manpower Log", fields=["*"], filters={"project_worksheet" : self.project})	
		return manpower

	def get_material(self):
		materials = frappe.get_all("DSR Daily Material Log", fields=["*"], filters={"project_worksheet" : self.project})	
		return materials

	def get_equipments(self):
		equipments = frappe.get_all("DSR Daily Equimpent Log", fields=["*"], filters={"project_worksheet" : self.project}) 
		return equipments			

	def get_consumables(self):
		consumables = frappe.get_all("DSR Daily Consumables Log", fields=["*"], filters={"project_worksheet" : self.project}) 
		return consumables

	def get_expense(self):
		expense = frappe.get_all("DSR Daily Expense Log", fields=["*"], filters={"project_worksheet" : self.project})
		return expense
		
	def	new_worklog(self,values):
		worklog = frappe.new_doc("DSR Daily Project Work Log")
		worklog.project_worksheet = values.get("project_worksheet")
		worklog.work_particulars = values.get("work_particulars")
		worklog.uom = values.get("uom")
		worklog.total = values.get("total")
		worklog.save()
		frappe.db.commit()
		msg = "New Daily Work Log Created"
		return msg	