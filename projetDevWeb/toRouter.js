$(document).ready(function () {
    const button = document.getElementById("toRouter");
    if (button) {
        button.addEventListener("click", function () {
            window.location.href = "navBar/router.html";
            console.log("Button clicked!");
        });
    }
});