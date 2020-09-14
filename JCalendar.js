/*=========================
@ Author: Jay Praksh
@ Email: jp024556@gmail.com
============================*/
function startJC(cl, icon){
	// Check if JC exists or not
	if(!document.getElementById("JC"))
		createJCLayout();

	// Method to create JC Layout
	function createJCLayout(){
		var JCDiv = document.createElement("DIV");
		JCDiv.className = "jcalendar";
		JCDiv.id = "JC";

		var JCSelectBoxes = document.createElement("DIV");
		JCSelectBoxes.id = "jcalendar_selectboxes";
		JCSelectBoxes.innerHTML = 
		'<select id="jcalendar_month">\
			<option value="1">January</option>\
			<option value="2">February</option>\
			<option value="3">March</option>\
			<option value="4">April</option>\
			<option value="5">May</option>\
			<option value="6">June</option>\
			<option value="7">July</option>\
			<option value="8">August</option>\
			<option value="9">September</option>\
			<option value="10">October</option>\
			<option value="11">November</option>\
			<option value="12">December</option>\
		</select>\
		<div id="jcalendar_y_m">\
			<div></div>\
			<div></div>\
		</div>\
		<select id="jcalendar_year">\
		</select>';

		var JCTable = '<table>';
		JCTable +=
		'<tr>\
			<th>Su</th>\
			<th>Mo</th>\
			<th>Tu</th>\
			<th>We</th>\
			<th>Th</th>\
			<th>Fr</th>\
			<th>Sa</th>\
		</tr>';
		for(var i = 0; i < 6; i++){
			JCTable += '<tr>';
			for(var j = 0; j < 7; j++){
				JCTable += '<td></td>';
			}
			JCTable += '</tr>';
		}
		JCTable += '</table>';
		// Making final layout
		JCDiv.appendChild(JCSelectBoxes);
		JCDiv.innerHTML += JCTable;

		// Appending final layout to document flow
		document.body.appendChild(JCDiv);
	}
	cl = document.getElementsByClassName(cl);
	for(var i = 0; i < cl.length; i++){
		var img = document.createElement("IMG");
		img.src = icon;
		img.className = "JC_ICON";
		cl[i].parentElement.insertBefore(img, cl[i+1]);
		img.onclick = function(mainEvt){
			bindJC(mainEvt);
		}
		cl[i].onclick = function(mainEvt){
			bindJC(mainEvt);
		}
	}

	

	function bindJC(mainEvt){
		if(mainEvt.target.className !== cl[0].className){
			mainEvt.target.previousElementSibling.click();
			return;
		}
		var jcalendar_year = document.getElementById("jcalendar_year");
		var jcalendar_month = document.getElementById("jcalendar_month");
		var jcalendar_y_m = document.getElementById("jcalendar_y_m");
		var JC = document.getElementById("JC");
		var JC_TD = JC.getElementsByTagName("TD");
		var JC_Months = [];
		JC_Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

		var JC_Days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

		/*== Date Logic ==*/
		var JC_cur_year = new Date().getFullYear();
		var JC_cur_month = addLeadingZero(new Date().getMonth() + 1);
		var JC_cur_date = addLeadingZero(new Date().getDate());
		var start = (JC_cur_year - 10);
		var end = (JC_cur_year + 10);
		for(var i = start; i <= end; i++){
			jcalendar_year.innerHTML += '<option value="'+i+'">'+i+'</option>';
		}

		// Year onchange event listener
		jcalendar_year.onchange = function(e){
			jcalendar_y_m.children[1].textContent = e.target.value;
			jcalendar_month = document.getElementById("jcalendar_month");
			var total_days = getTotalDays(e.target.value, jcalendar_month.value);
			var _1stday = get1stDayOfMonth(e.target.value+"-"+addLeadingZero(jcalendar_month.value)+"-"+"01");

			// Populating Data
			populateData(_1stday, total_days);
		}

		// Month onchange event listener
		jcalendar_month.onchange = function(e){
			jcalendar_y_m.children[0].textContent = JC_Months[e.target.value - 1];
			jcalendar_year = document.getElementById("jcalendar_year");
			var total_days = getTotalDays(jcalendar_year.value, e.target.value);
			var _1stday = get1stDayOfMonth(jcalendar_year.value+"-"+addLeadingZero(e.target.value)+"-"+"01");

			// Populating Data
			populateData(_1stday, total_days);
		}

		// Show calendar when clicked on user given class selector
		showJC(mainEvt);

		// Hide calendar when clicked outside it's body
		document.body.onmouseup = function(e){
			if(JC !== e.target && !JC.contains(e.target)){
				hideJC(e);
			}
		}

		// Method to show JC
		function showJC(e){
			var el = e.target.getBoundingClientRect();
			JC.style.top = (el.top + el.height) + "px";
			JC.style.left = el.left + "px";
			JC.style.display = "block";
		}

		// Method to hide JC
		function hideJC(e){
			JC.style.display = "none";
		}

		// Method to get total no. of days
		function getTotalDays(y, m){
			return new Date(y, m, 0).getDate();
		}

		// Method to get first day of month
		function get1stDayOfMonth(date){
			return new Date(date).getDay();
		}

		// Method to add leading zero
		function addLeadingZero(n) {
			n = parseInt(n, 10);
		    return (n < 10) ? ("0" + n) : n;
		}

		// Start populating initial values when calendar opens first time
		populateInitialValues();

		// Method to populate initial values in JC
		function populateInitialValues(){
			var existingDate = mainEvt.target.value;
			existingDate = existingDate.split(".");
			if(existingDate.length > 1){
				var date = existingDate[2] + "-" + addLeadingZero(existingDate[1]) + "-01";
				// Update display date
				jcalendar_y_m.children[0].textContent = JC_Months[existingDate[1] - 1];
				jcalendar_y_m.children[1].textContent = existingDate[2];
				// Update select boxes
				jcalendar_year.value = existingDate[2];
				jcalendar_month.value = (+existingDate[1]);
				populateData(get1stDayOfMonth(date), getTotalDays(existingDate[2], existingDate[1]));
			}else{
				var date = JC_cur_year + "-" + JC_cur_month + "-01";
				// Update display date
				jcalendar_y_m.children[0].textContent = JC_Months[JC_cur_month - 1];
				jcalendar_y_m.children[1].textContent = JC_cur_year;
				// Update select boxes
				jcalendar_year.value = JC_cur_year;
				jcalendar_month.value = (+JC_cur_month);
				populateData(get1stDayOfMonth(date), getTotalDays(JC_cur_year, JC_cur_month));
			}
		}

		// Method to actually populate data
		function populateData(_1stday, total_days){
			// Clearing previous data
			for(var i = 0; i < JC_TD.length; i++){
				JC_TD[i].textContent = "";
				JC_TD[i].style.backgroundImage = 'linear-gradient(to bottom, #fff, #ccc)';
				JC_TD[i].style.pointerEvents = 'none';
			}

			// Populating new data
			for(var i = 1; i <= total_days; i++){
				JC_TD[_1stday].textContent = i;
				JC_TD[_1stday].style.backgroundImage = 'linear-gradient(to bottom, #ff6600, brown)';
				JC_TD[_1stday].style.pointerEvents = 'auto';
				JC_TD[_1stday].onclick = function(e){
					selectDate(e);
				}
				_1stday++;
			}
		}

		// Method to select date
		function selectDate(e){
			mainEvt.target.value = addLeadingZero(e.target.textContent)+"."+addLeadingZero(jcalendar_month.value)+"."+jcalendar_year.value;
			JC.style.display = "none";
		}
	}
}
