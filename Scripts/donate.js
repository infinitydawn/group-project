document.addEventListener("DOMContentLoaded", () => {
    const donationOptions = document.querySelectorAll(".donation-option");
    const otherOption = document.querySelector("#other-option");
    const customAmountContainer = document.querySelector("#custom-amount-container");
    const customAmountInput = document.querySelector("#custom-amount");

    // Handle predefined donation options
    donationOptions.forEach(button => {
        button.addEventListener("click", (event) => {
            donationOptions.forEach(btn => btn.classList.remove("selected"));
            event.target.classList.add("selected");

            // If "Other" is selected, show the custom input field
            if (event.target === otherOption) {
                customAmountContainer.style.display = "block";
                customAmountInput.focus(); // Focus on the custom input field
            } else {
                customAmountContainer.style.display = "none";
                customAmountInput.value = ""; // Clear the custom input field
            }
        });
    });
});
