# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from . import __version__ as app_version

app_name = "dsr_erpnext"
app_title = "DSR ERPNext"
app_publisher = "MN Technique"
app_description = "ERPNext Customization for DSR"
app_icon = "fa fa-road"
app_color = "#ffbc00"
app_email = "support@mntechnique.com"
app_license = "GPL v3"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
app_include_js = "/assets/js/dsr.min.js"

# include js, css files in header of web template
# web_include_css = "/assets/dsr_erpnext/css/dsr_erpnext.css"
# web_include_js = "/assets/dsr_erpnext/js/dsr_erpnext.js"

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Website user home page (by function)
# get_website_user_home_page = "dsr_erpnext.utils.get_home_page"

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "dsr_erpnext.install.before_install"
# after_install = "dsr_erpnext.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "dsr_erpnext.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"dsr_erpnext.tasks.all"
# 	],
# 	"daily": [
# 		"dsr_erpnext.tasks.daily"
# 	],
# 	"hourly": [
# 		"dsr_erpnext.tasks.hourly"
# 	],
# 	"weekly": [
# 		"dsr_erpnext.tasks.weekly"
# 	]
# 	"monthly": [
# 		"dsr_erpnext.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "dsr_erpnext.install.before_tests"

# Overriding Whitelisted Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "dsr_erpnext.event.get_events"
# }

