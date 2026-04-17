// -------------------- DROPDOWN --------------------

const dropdownBtn = document.getElementById("cityDropdown");
const dropdownMenu = document.getElementById("dropdown");

dropdownBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    dropdownMenu.classList.toggle("show");
});

dropdownMenu.addEventListener("click", function (e) {
    e.stopPropagation();
});

document.addEventListener("click", function (e) {
    if (!dropdownBtn.contains(e.target)) {
        dropdownMenu.classList.remove("show");
    }
});


// -------------------- CITY + UI UPDATE --------------------

const selectedCity = document.getElementById("selectedCity");

// City card click
const cities = document.querySelectorAll(".city-card");

cities.forEach(city => {
    city.addEventListener("click", function () {

        let cityName = this.innerText.trim();

        // Update navbar
        selectedCity.innerText = cityName + " ▼";

        // Save
        localStorage.setItem("selectedCity", cityName);

        // Redirect
        let fileName = cityName.toLowerCase().replace(/\s+/g, "");
        window.location.href = fileName + ".html";

    });
});


// -------------------- LOCATION DETECTION --------------------

const detectBtn = document.getElementById("detectLocation");
const resetBtn = document.getElementById("resetLocation");

detectBtn.addEventListener("click", () => {

    if (!navigator.geolocation) {
        alert("Geolocation not supported");
        return;
    }

    detectBtn.innerText = "Detecting...";

    navigator.geolocation.getCurrentPosition(
        async (position) => {

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`
                );

                const data = await res.json();

                let city =
                    data.address.city ||
                    data.address.town ||
                    data.address.suburb ||
                    data.address.village ||
                    data.address.state_district ||
                    data.address.state ||
                    "Your Location";

                // Update navbar
                selectedCity.innerText = city + " ▼";

                // Save
                localStorage.setItem("selectedCity", city);

                detectBtn.innerText = "📍 Detect my location";

            } catch (err) {
                alert("Error detecting location");
                detectBtn.innerText = "📍 Detect my location";
            }

        },
        () => {
            alert("Permission denied or location unavailable");
            detectBtn.innerText = "📍 Detect my location";
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
});


// -------------------- RESET LOCATION --------------------

resetBtn.addEventListener("click", () => {

    localStorage.removeItem("selectedCity");
    selectedCity.innerText = "Bangalore ▼";

});


// -------------------- LOAD SAVED CITY --------------------

window.addEventListener("load", () => {

    let savedCity = localStorage.getItem("selectedCity");

    if (savedCity) {
        selectedCity.innerText = savedCity + " ▼";
    }

});


// -------------------- MODAL --------------------

const modal = document.getElementById("modal");
const loginBox = document.getElementById("loginBox");
const registerBox = document.getElementById("registerBox");

function openModal() {
    modal.style.display = "flex";
}

function closeModal() {
    modal.style.display = "none";
}

function showRegister() {
    loginBox.classList.add("hidden");
    registerBox.classList.remove("hidden");
}

function showLogin() {
    registerBox.classList.add("hidden");
    loginBox.classList.remove("hidden");
}


// -------------------- LOGIN --------------------

function login() {
    let phone = document.getElementById("loginPhone").value;

    if (phone.length !== 10 || isNaN(phone)) {
        alert("Enter valid 10-digit mobile number");
        return;
    }

    alert("Login Successful ✅");
    closeModal();
}


// -------------------- REGISTER --------------------

function register() {
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let password = document.getElementById("password").value;

    if (!name || !phone || !password) {
        alert("All fields are required");
        return;
    }

    if (phone.length !== 10 || isNaN(phone)) {
        alert("Enter valid phone number");
        return;
    }

    alert("Registration Successful 🎉");
    showLogin();
}


// -------------------- CLOSE MODAL OUTSIDE --------------------

window.addEventListener("click", function (e) {
    if (e.target === modal) {
        closeModal();
    }
});
// -------------------- SEARCH FUNCTION --------------------

const searchInput = document.getElementById("searchInput");
const cityCards = document.querySelectorAll(".city-card");
const zones = document.querySelectorAll(".other-cities a");
const noResult = document.getElementById("noResult");

searchInput.addEventListener("keyup", function () {

    let value = this.value.toLowerCase();
    let found = false;

    // Filter city cards
    cityCards.forEach(card => {
        let text = card.innerText.toLowerCase();

        if (text.includes(value)) {
            card.style.display = "block";
            found = true;
        } else {
            card.style.display = "none";
        }
    });

    // Filter zones
    zones.forEach(zone => {
        let text = zone.innerText.toLowerCase();

        if (text.includes(value)) {
            zone.style.display = "inline-block";
            found = true;
        } else {
            zone.style.display = "none";
        }
    });

    // Show / hide "no result"
    if (noResult) {
        noResult.style.display = found ? "none" : "block";
    }
});
const tabButtons = document.querySelectorAll(".tabs button");

tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".tabs .active").classList.remove("active");
        btn.classList.add("active");
    });
});

