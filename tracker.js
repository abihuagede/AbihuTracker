const locA = document.getElementById("location");

async function fetchIP() {
  // Dynamically fetch the input value
  const inputIP = document.getElementById("Insert").value.trim();

  // Validate the input
  if (!inputIP) {
    locA.innerHTML = "Please enter a valid IP address.";
    locA.style.color = "red";
    return;
  }

  const apiURl = `https://api.ipstack.com/${inputIP}?access_key=6f9f7e4bf37b6e5a22da454b4ae0b187&output=json&hostname=1`;

  try {
    locA.innerHTML = "Fetching data...";
    locA.style.color = "black";

    const res = await fetch(apiURl);
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      // Extract data with fallback values
      const ip = data.ip || "Could not get IP";
      const city = data.city || `Could not get city`;
      const connectiontype =
        data.connection_type || "Could not get connection type";
      const continentname =
        data.continent_name || "Could not get continent name";
      const connectionCode =
        data.continent_code || "Could not get connection speed";
      const flag = data.location.country_flag || "Could not get flag";
      const region = data.region_name || "Could not get region";
      const country = data.country_name || "Could not get country";
      const latitude = data.latitude || "Could not get latitude";
      const longitude = data.longitude || "Could not get longitude";

      // Check if location and country_code exist
      const countryCode =
        data.location && data.location.country_code
          ? data.location.country_code.toLowerCase()
          : null;

      locA.innerHTML = `
        <p>IP: <span style="color:green;">${ip}</span></p>
        <p>Country Flag: <span style="color:green;">${flag}</span> </p>
        <p> City: ${city}</p>
        <p>connectionType: ${connectiontype}</p>
        <p>Region: ${region}</p>
        <p>Country: ${country}</p>
        <p>Connection-Code: ${connectionCode}</p>
          <p>Continent-Name: ${continentname}</p>
        <p style="color:blue;"; >Lat/Long: <span style="color:green;">  (${latitude}   ${longitude})</span></p>
      `;
    } else {
      locA.innerHTML = "Failed to load location data.";
    }
  } catch (error) {
    console.error("Fetch error:", error);
    locA.innerHTML = "An error occurred while fetching location data.";
  }
}
