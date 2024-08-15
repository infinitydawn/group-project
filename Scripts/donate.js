document.addEventListener("DOMContentLoaded", () => {
    const donationOptions = document.querySelectorAll(".donation-option");
    const otherOption = document.querySelector("#other-option");
    const customAmountContainer = document.querySelector("#custom-amount-container");
    const customAmountInput = document.querySelector("#custom-amount");
    const donateButton = document.querySelector("#donate-btn");
    const cardDetailsSection = document.querySelector("#card-details-section");
    const submitButton = document.querySelector("#submit-btn");

    donationOptions.forEach(button => {
        button.addEventListener("click", (event) => {
            donationOptions.forEach(btn => btn.classList.remove("selected"));
            event.target.classList.add("selected");

            if (event.target === otherOption) {
                customAmountContainer.style.display = "block";
                customAmountInput.focus(); 
            } else {
                customAmountContainer.style.display = "none";
                customAmountInput.value = ""; 
            }
        });
    });

    donateButton.addEventListener("click", (event) => {
        event.preventDefault(); 
        cardDetailsSection.style.display = "block"; 
    });

    submitButton.addEventListener("click", () => {
        // it will go to thank_you.html after sumbit the donation
        window.location.href = "thank_you.html";
    });
});
