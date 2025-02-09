window.onload = () => {
    // Retrieves the last 4 digits of the card from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const lastFourDigits = urlParams.get('lastFourDigits');

    // Displays success message with last 4 digits on the page
    const successMessage = document.getElementById("success-message");
    successMessage.textContent = " Last 4 digits of your card number: " + lastFourDigits;
}; 