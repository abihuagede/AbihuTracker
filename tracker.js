async function getIPInfo(ipAddress = null) {
  let ip = ipAddress;
  if (!ip) {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      ip = data.ip;
      document.getElementById("ip").textContent = ip;
    } catch (error) {
      console.error("Error fetching public IP:", error);
      document.getElementById("error-message").style.display = "block";
      document.getElementById("ip-info").style.display = "none";
      return;
    }
  }
  try {
    document.getElementById("ip").textContent = ip;
    const Tokens = "6b181ab280415d";

    const ipInfoResponse = await fetch(
      `https://ipinfo.io/${ip}?token=${Tokens}`
    );
    if (!ipInfoResponse.ok) throw new Error("Failed to fetch IP info");
    const ipInfoData = await ipInfoResponse.json();

    document.getElementById(
      "location"
    ).textContent = `${ipInfoData.city}, ${ipInfoData.region}, ${ipInfoData.country}`;
    document.getElementById("timezone").textContent = ipInfoData.timezone;
    document.getElementById("isp").textContent = ipInfoData.org;

    const mapElement = document.getElementById("map");
    mapElement.innerHTML = ""; // Clear previous map instance
    const map = L.map("map").setView(ipInfoData.loc.split(",").map(Number), 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker(ipInfoData.loc.split(",").map(Number))
      .addTo(map)
      .bindPopup("Location of the IP address")
      .openPopup();
  } catch (error) {
    console.error("Error fetching IP information:", error);
    document.getElementById("error-message").style.display = "block";
    document.getElementById("ip-info").style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getIPInfo();

  document.getElementById("track-button").addEventListener("click", () => {
    const ipInput = document.getElementById("ip-input").value.trim();
    if (ipInput) {
      getIPInfo(ipInput);
    } else {
      const invalid = document.querySelector(".closebox");
      invalid.style.display = "block";
      setInterval(() => {
        invalid.style.display = "none";
      }, 5000);
      document.querySelector(".close").addEventListener("click", (e) => {
        e.preventDefault();
        const invalid = document.querySelector(".closebox");
        invalid.style.display = "none";
      });
    }
  });
});
