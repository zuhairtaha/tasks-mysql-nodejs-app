
/*
 * Editor client script for DB table tasks
 * Created by http://editor.datatables.net/generator
 */

(function($){

$(document).ready(function() {
	var editor = new $.fn.dataTable.Editor( {
		ajax: '/api/tasks',
		table: '#tasks',
		fields: [
			{
				"label": "Title:",
				"name": "title"
			},
			{
				"label": "Due date:",
				"name": "due_date",
				"type": "datetime",
				"format": "YYYY-MM-DD HH:mm:ss"
			},
			{
				"label": "Status:",
				"name": "status",
				"type": "select",
				"def": "Not started",
				"options": [
					"Not started",
					"In progress",
					"Done"
				]
			},
			{
				"label": "User:",
				"name": "user",
				"type": "select",
				"def": "u1",
				"options": [
					"u1",
					"u2",
					"u3"
				]
			},
			{
				"label": "Description:",
				"name": "description"
			}
		]
	} );

	var table = $('#tasks').DataTable( {
		dom: 'Bfrtip',
		ajax: '/api/tasks',
		columns: [
			{
				"data": "title"
			},
			{
				"data": "due_date"
			},
			{
				"data": "status"
			},
			{
				"data": "user"
			},
			{
				"data": "description"
			}
		],
		select: true,
		lengthChange: false,
		buttons: [
			{ extend: 'create', editor: editor },
			{ extend: 'edit',   editor: editor },
			{ extend: 'remove', editor: editor }
		]
	} );
} );

}(jQuery));

