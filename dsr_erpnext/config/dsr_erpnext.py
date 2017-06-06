from frappe import _

def get_data():
	return [
		{
			"label": _("DSR ERPNext"),
			"icon": "icon-star",
			"items": [
				{
					"type": "doctype",
					"name": "DSR Project Work Sheet",
					"label": "Project Work Sheet",
					"description": _("Ongoing worksheet for project."),
				},
			]
		}
	]
