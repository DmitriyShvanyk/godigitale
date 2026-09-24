	/*
		* -------------------------------------------------------
		*  Get leads by program id
		* -------------------------------------------------------
	*/

	window.onload = function () {
		const buttonGetData = document.getElementById("getData");
		console.log("Button Get Data", buttonGetData);

		const buttongetLeadsByProgramId = document.getElementById("getLeadsByProgramId");
		console.log("Button Program Id", buttongetLeadsByProgramId);

		const buttongetLeadDataByLeadId = document.getElementById("geLeadDataByLeadId");
		console.log("Button Lead", buttongetLeadDataByLeadId);

		const buttongeLeadsByStaticListId = document.getElementById("geLeadsByStaticListId");
		console.log("Button Static Id", buttongeLeadsByStaticListId);


		// click on program id

		buttongetLeadsByProgramId.addEventListener('click', event => {

			var inputValue = document.getElementById("inputValue").value;
			console.log(inputValue);

			// Create a request variable and assign a new XMLHttpRequest object to it.
			var xhr = new XMLHttpRequest()
				
			// Open a new connection, using the GET request on the URL endpoint
			xhr.open('GET', 'https://0554-195-114-145-129.ngrok.io/api/v1/leads/' + inputValue, true)
	
			xhr.onload = function () {
				// Begin accessing JSON data here
				var data = JSON.parse(this.response)
				console.log(data.result)
	
				// data.forEach((jsonData) => {
				// 	// Log each jsonData
				// 	alert(jsonData)
				// 	console.log(jsonData)
				// })
			}
	
			xhr.withCredentials = false;
			xhr.setRequestHeader("Content-Type", "application/json");
	
			// Send request
			xhr.send()
			
		});

    // click on lead id

		buttongetLeadDataByLeadId.addEventListener('click', event => {

			var inputValue = document.getElementById("inputValue").value;
			console.log(inputValue);

			// Create a request variable and assign a new XMLHttpRequest object to it.
			var xhr = new XMLHttpRequest()
				
			// Open a new connection, using the GET request on the URL endpoint
			xhr.open('GET', 'https://0554-195-114-145-129.ngrok.io/api/v1/lead/' + inputValue, true)
	
			xhr.onload = function () {
				// Begin accessing JSON data here
				var data = JSON.parse(this.response)
				console.log(data.result)
	
				// data.forEach((jsonData) => {
				// 	// Log each jsonData
				// 	alert(jsonData)
				// 	console.log(jsonData)
				// })
			}
	
			xhr.withCredentials = false;
			xhr.setRequestHeader("Content-Type", "application/json");
	
			// Send request
			xhr.send()
			
		});


    // click on static list id

		buttongeLeadsByStaticListId.addEventListener('click', event => {

			var inputValue = document.getElementById("inputValue").value;
			console.log(inputValue);

			// Create a request variable and assign a new XMLHttpRequest object to it.
			var xhr = new XMLHttpRequest()
				
			// Open a new connection, using the GET request on the URL endpoint
			xhr.open('GET', 'https://0554-195-114-145-129.ngrok.io/api/v1/sl/' + inputValue, true)
	
			xhr.onload = function () {
				// Begin accessing JSON data here
				var data = JSON.parse(this.response)
				console.log(data.result)
	
				// data.forEach((jsonData) => {
				// 	// Log each jsonData
				// 	alert(jsonData)
				// 	console.log(jsonData)
				// })
			}
	
			xhr.withCredentials = false;
			xhr.setRequestHeader("Content-Type", "application/json");
	
			// Send request
			xhr.send()
			
		});


  }    