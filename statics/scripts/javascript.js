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

// ================= TAB SWITCH =================
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");
const filters = document.getElementById("filters");

tabBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {

        e.stopPropagation();

        // remove all active
        tabBtns.forEach(b => b.classList.remove("active"));
        tabContents.forEach(t => t.classList.remove("active"));

        // activate clicked tab
        btn.classList.add("active");
        document.getElementById(btn.dataset.tab).classList.add("active");

        // 🔥 SAME behavior for ALL tabs (Buy + Projects + others)
        filters.style.display = "none";
    });
});

// ================= OUTSIDE CLICK =================
document.addEventListener("click", function (e) {

    const searchPanel = document.querySelector(".search-panel");

    // if click is OUTSIDE search panel
    if (!searchPanel.contains(e.target)) {

        // remove active tabs
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(t => t.classList.remove("active"));

        // show filters again
        const filters = document.getElementById("filters");
        if (filters) filters.style.display = "flex";
    }
});
// ================= PREVENT CLOSE WHEN INSIDE =================
document.querySelector(".search-panel").addEventListener("click", function (e) {
    e.stopPropagation();
});
// ================= SLIDER =================
document.querySelectorAll(".slider-container").forEach(container => {

    const slider = container.querySelector(".slider");
    const leftBtn = container.querySelector(".left");
    const rightBtn = container.querySelector(".right");

    rightBtn.addEventListener("click", () => {
        slider.scrollBy({
            left: 250,
            behavior: "smooth"
        });
    });

    leftBtn.addEventListener("click", () => {
        slider.scrollBy({
            left: -250,
            behavior: "smooth"
        });
    });

});
function scrollLocalities(button, direction) {
    const container = button.parentElement.querySelector(".localities-slider");

    container.scrollBy({
        left: direction * 200,
        behavior: "smooth"
    });
}

window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});



function addChip(name) {
    const container = document.getElementById("selectedChips");

    // prevent duplicate
    if ([...container.children].some(chip => chip.innerText.includes(name))) {
        return;
    }

    const chip = document.createElement("div");
    chip.className = "chip";
    chip.innerHTML = name + " ✖";

    // remove chip on click
    chip.onclick = () => chip.remove();

    container.appendChild(chip);
}
function moveHot(direction) {
    const track = document.getElementById("hotTrack");

    track.scrollBy({
        left: direction * 350,
        behavior: "smooth"
    });
}
 

const tabs = document.querySelectorAll('.tab');
const grid = document.getElementById('grid');

// DATA FOR EACH TAB
const data = {
    buyers: [
        { img: "https://img.icons8.com/fluency/96/home.png", name: "Home Loan",link: "home-loan.html" },
        { img: "https://img.icons8.com/fluency/96/sofa.png", name: "Home Interior Design",link:"interior.html" },
        { img: "https://img.icons8.com/fluency/96/combo-chart.png", name: "Valuation",link:"valuation.html" },
        { img: "https://img.icons8.com/fluency/96/compass.png", name: "Vastu Calculator", link:"calculator.html" },
        { img: "https://img.icons8.com/fluency/96/property.png", name: "Property Management",link:"management" },
        { img: "https://img.icons8.com/fluency/96/sold.png", name: "Sell or Rent Property",link:"sellorrent.html" }
    ],

    tenants: [
        { img: "https://img.icons8.com/fluency/96/home.png", name: "Online Rent Agreement",link:"agreement.html" },
        { img: "https://img.icons8.com/fluency/96/search.png", name: "Rent Receipts" , link:"receipts.html"},
        { img: "https://img.icons8.com/fluency/96/contract.png", name: "Property Management",link:"property.html" },
        
    ],

    agents: [
        { img: "https://img.icons8.com/fluency/96/manager.png", name: "List Property With Us",link:"list.html" },
        { img: "https://img.icons8.com/fluency/96/sell.png", name: "Co-Broking For New Projects",link:"new.html" },
       
    ],

    builders: [
        { img: "https://img.icons8.com/fluency/96/building.png", name: "Advertise With Us",link:"advertise.html" },
        { img: "https://img.icons8.com/fluency/96/bank.png", name: "3D/AR/VR Services",link:"ar.html" },
        { img: "https://img.icons8.com/fluency/96/blueprint.png", name: "Data Intelligence",link:"intelligence.html" },
        { img: "https://img.icons8.com/fluency/96/investment.png", name: "Mortgage Partnerships",link:"partner.html" },
        { img: "https://img.icons8.com/fluency/96/marketing.png", name: "Super Agent Pro",link:"pro.html" },
    ]
};

// LOAD CARDS FUNCTION
function loadCard_s(type){
    grid.innerHTML = "";

    data[type].forEach(item => {
        grid.innerHTML += `
            <div class="card_s" onclick="location.href='${item.link}'">
                <img src="${item.img}">
                <p>${item.name}</p>
            </div>
        `;
    });
}
// default load
loadCard_s("buyers");

// TAB CLICK
tabs.forEach(tab => {
    tab.addEventListener("click", () => {

        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        if(tab.textContent.includes("Tenants")){
            loadCard_s("tenants");
        }
        else if(tab.textContent.includes("Agents")){
            loadCard_s("agents");
        }
        else if(tab.textContent.includes("Builders")){
            loadCard_s("builders");
        }
        else{
            loadCard_s("buyers");
        }
    });
});


const reTabs = document.getElementById("reTabs");
const reDisplay = document.getElementById("reDisplay");

/* DATA */
const reData = {

projects: {
tabs: [],
html: `
<div class="re-cards">

<a href="project1.html" class="re-box-link">
<div class="re-box" style="background-image:url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2')">
<div class="re-text">Ready to Move</div>
</div>
</a>

<a href="project2.html" class="re-box-link">
<div class="re-box" style="background-image:url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')">
<div class="re-text">New Launch</div>
</div>
</a>

</div>`
},

sale: {
tabs: ["By Budget", "By BHK"],
html: {
0: `
<div class="re-cards">

<a href="under50.html" class="re-box-link">
<div class="re-box" style="background-image:url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c')">
<div class="re-text">Under 50 Lakhs</div>
</div>
</a>

</div>`,

1: `
<div class="re-cards">

<a href="1bhk.html" class="re-box-link">
<div class="re-box" style="background-image:url('https://images.unsplash.com/photo-1507089947368-19c1da9775ae')">
<div class="re-text">1 BHK</div>
</div>
</a>

<a href="2bhk.html" class="re-box-link">
<div class="re-box" style="background-image:url('https://images.unsplash.com/photo-1568605114967-8130f3a36994')">
<div class="re-text">2 BHK</div>
</div>
</a>

</div>`
}
},

rent: {
tabs: ["By Type", "By Budget"],
html: {
0: `
<div class="re-grid">

<a href="flats.html" class="re-box-link">
<div class="re-box" style="background-image:url('https://images.unsplash.com/photo-1507089947368-19c1da9775ae')">
<div class="re-text">Flats</div>
</div>
</a>

<a href="houses.html" class="re-box-link">
<div class="re-box" style="background-image:url('https://images.unsplash.com/photo-1568605114967-8130f3a36994')">
<div class="re-text">Houses</div>
</div>
</a>

</div>`,

1: `
<div class="re-grid">

<a href="rent-low.html" class="re-box-link">
<div class="re-box" style="background-image:url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')">
<div class="re-text">Under ₹10K</div>
</div>
</a>

<a href="rent-mid.html" class="re-box-link">
<div class="re-box" style="background-image:url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c')">
<div class="re-text">₹10K - ₹25K</div>
</div>
</a>

</div>`
}
}

};

/* LOAD FUNCTION */
function reLoad(type) {

reTabs.innerHTML = "";
const section = reData[type];

if (section.tabs.length === 0) {
    reDisplay.innerHTML = section.html;
    return;
}

section.tabs.forEach((tab, i) => {

let btn = document.createElement("button");
btn.innerText = tab;

if (i === 0) {
    btn.classList.add("active");
    reDisplay.innerHTML = section.html[i];
}

btn.onclick = () => {

document.querySelectorAll(".re-tabs button")
.forEach(b => b.classList.remove("active"));

btn.classList.add("active");
reDisplay.innerHTML = section.html[i];
};

reTabs.appendChild(btn);

});
}

/* ACCORDION */
document.querySelectorAll(".re-header").forEach(h => {
h.onclick = () => {

document.querySelectorAll(".re-accordion")
.forEach(a => a.classList.remove("active"));

h.parentElement.classList.add("active");

reLoad(h.dataset.type);

};
});

/* REDIRECT BUTTON */
function reGo(type){
window.location.href = type + ".html";
}

/* DEFAULT */
reLoad("projects");


const tlData = [
["Varthur","Attibele","Nelamangala","Devanahalli","Hoskote","Sarjapur"],
["Whitefield","Electronic City","ORR","Marathahalli","Bellandur"],
["Jayanagar","Banashankari","RR Nagar","Malleshwaram","Rajajinagar"]
];

// Generate cards
tlData.forEach((tab, i)=>{
let container=document.getElementById("tl-tab"+(i+1));

tab.forEach(name=>{
container.innerHTML+=`
<div class="swiper-slide">
<div class="tl-card">
<h4>${name}</h4>

<div class="tl-price-box">
<span>₹15,000/Sq.Ft</span>
<span>₹40 Rent</span>
</div>

<p>Good locality with growth potential.</p>

<div class="tl-stats">
<div class="tl-stat">120 Sale</div>
<div class="tl-stat">80 Rent</div>
<div class="tl-stat">60 Projects</div>
</div>

<div class="tl-buttons">
<a href="#" class="tl-btn tl-dark">Rates</a>
<a href="#" class="tl-btn tl-yellow">Insights →</a>
</div>

</div>
</div>`;
});
});

// Swiper INIT (unique selectors)
document.querySelectorAll(".tl-swiper").forEach(swiper=>{
new Swiper(swiper,{
    slidesPerView: 4,
    spaceBetween: 15,

    navigation:{
        nextEl: swiper.querySelector('.tl-next'),
        prevEl: swiper.querySelector('.tl-prev'),
    },

    observer: true,          // ✅ FIX
    observeParents: true,    // ✅ FIX

    breakpoints:{
        320:{slidesPerView:1},
        480:{slidesPerView:2},
        768:{slidesPerView:3},
        1024:{slidesPerView:4}
    }
});
});

// Tabs
function tlShowTab(i){
let tabs=document.querySelectorAll(".tl-tab");
let swipers=document.querySelectorAll(".tl-swiper");

tabs.forEach(t=>t.classList.remove("active"));
swipers.forEach(s=>s.classList.remove("active"));

tabs[i].classList.add("active");
swipers[i].classList.add("active");
}


//slider fix for other pages
function slideLeft() {
    const slider = document.getElementById("slider");
    slider.scrollBy({
        left: -300,
        behavior: "smooth"
    });
}

function slideRight() {
    const slider = document.getElementById("slider");
    slider.scrollBy({
        left: 300,
        behavior: "smooth"
    });
}
async function sendLink() {
    const phone = document.getElementById("phone").value;

    if (phone.length < 10) {
        alert("Enter valid mobile number");
        return;
    }

    try {
        const res = await fetch("http://localhost:3000/send-sms", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ phone })
        });

        const data = await res.json();
        alert(data.message);

    } catch (err) {
        alert("Server error");
    }
}