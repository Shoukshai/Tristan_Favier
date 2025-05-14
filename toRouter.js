$(document).ready(function () {
    const button = document.getElementById("toRouter");
    if (button) {
        button.addEventListener("click", function () {
            window.location.href = "src/router.html";
            console.log("Button clicked!");
        });
    }
});