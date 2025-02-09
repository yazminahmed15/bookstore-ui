window.onload = () =>{
	
		let menuList = document.getElementById("menuList");
		menuList.style.maxHeight = "0px";
	
		let menuButton = document.getElementById("menuButton");
		menuButton.addEventListener("click", function() {
			if (menuList.style.maxHeight === "0px") {
				menuList.style.maxHeight = "300px";
			} else {
				menuList.style.maxHeight = "0px"; 
			}  
		});

	    document.getElementById("pay-btn").addEventListener("click", function(event) {
			event.preventDefault(); // Prevent form submission for now
		
			// Retrieve form inputs
			var cardNumber = document.getElementById("card").value.trim();
			var expiryMonth = document.getElementById("expiry-month").value;
			var expiryYear = document.getElementById("expiry-year").value;
			var cvv = document.getElementById("security").value.trim();
		
			// Validate card number
			if (!/^\d{16}$/.test(cardNumber) || !/^(51|52|53|54|55)/.test(cardNumber)) {
				alert("Please enter a valid card number starting with 51, 52, 53, 54, or 55 and containing 16 digits.");
				return;
			}
		
			// Validate expiry date
			var currentDate = new Date();
			var currentYear = currentDate.getFullYear();
			var currentMonth = currentDate.getMonth() + 1; 
			if (expiryYear < currentYear || (expiryYear == currentYear && expiryMonth < currentMonth)) {
				alert("Please enter a valid expiry date.");
				return;
			}
		
			// Validate CVV
			if (!/^\d{3}$/.test(cvv)) {
				alert("Please enter a valid 3-digit CVV code.");
				return;
			}
            // if all validation passed move on to the JSON data
			var postData = {
				"master_card": parseInt(cardNumber),
				"exp_year": parseInt(expiryYear),
				"exp_month": parseInt(expiryMonth),
				"cvv_code": cvv
			};
		
			// Send POST request to the server
			fetch("https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(postData)
			})
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json(); 
			})
			.then(data => {
				
				// Handle success response from the server
				console.log("Server response:", data);
				alert(data.message); // Display success message to the user
				
				// Redirect to the success page with the last 4 digits included in the URL
				var lastFourDigits = cardNumber.slice(-4); 
				window.location.href = "success.html?lastFourDigits=" + lastFourDigits;
			})
			.catch(error => {
				
				// Handle errors
				console.error('There was a problem with the fetch operation:', error);
				alert("There was an error processing your payment. Please try again later.");
			});
		});
		

};


