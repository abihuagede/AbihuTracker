const locA = document.getElementById("location");

async function fetchIP() {
  let inputIP = document.getElementById("Insert").value.trim();

  if (!inputIP) {
    locA.innerHTML = "No IP entered. Detecting your IP...";
    locA.style.color = "black";

    try {
      const ipRes = await fetch("https://api.ipify.org?format=json");
      const ipData = await ipRes.json();
      inputIP = ipData.ip;
    } catch (err) {
      locA.innerHTML = "Failed to detect your IP.";
      return;
    }
  }

  const apiURl = `https://api.ipstack.com/${inputIP}?access_key=6f9f7e4bf37b6e5a22da454b4ae0b187&output=json&hostname=1`;

  try {
    locA.innerHTML = "Fetching data...";
    locA.style.color = "black";

    const res = await fetch(apiURl);
    const data = await res.json();
    console.log(data);
    localStorage.setItem("IPData", JSON.stringify(data));

    if (res.ok) {
      const ip = data.ip || "N/A";
      const hostname = data.hostname || "N/A";
      const type = data.type || "N/A";
      const continent = data.continent_name || "N/A";
      const continentCode = data.continent_code || "N/A";
      const country = data.country_name || "N/A";
      const countryCode = data.country_code || "N/A";
      const region = data.region_name || "N/A";
      const regionCode = data.region_code || "N/A";
      const city = data.city || "N/A";
      const zip = data.zip || "N/A";
      const latitude = data.latitude || "N/A";
      const longitude = data.longitude || "N/A";
      const msa = data.msa || "N/A";
      const dma = data.dma || "N/A";
      const radius = data.radius || "N/A";
      const routingType = data.ip_routing_type || "N/A";
      const connectionType = data.connection_type || "N/A";

      const capital = data.location?.capital || "N/A";
      const flagUrl = data.location?.country_flag || null;
      const flagEmoji = data.location?.country_flag_emoji || "N/A";
      const callingCode = data.location?.calling_code || "N/A";
      const isEU = data.location?.is_eu ? "Yes" : "No";

      const languages =
        data.location?.languages
          ?.map((lang) => `${lang.name} (${lang.native})`)
          .join(", ") || "N/A";

      locA.innerHTML = `
        <h3 style="background-color:wheat; padding:10p;">IP Information</h3>
        <p><strong>IP Address:</strong> ${ip} ${
        flagUrl
          ? `<img src="${flagUrl}" alt="Flag of ${country}" width="20">`
          : ""
      }</p>
        <p><strong>Hostname:</strong> ${hostname}</p>
        <p><strong>Type:</strong> ${type}</p>

        <h3 style="background-color:wheat; padding:10p;">Location Tracked</h3>
        <p><strong>Continent:</strong> ${continent} (${continentCode})</p>
        <p><strong>Country:</strong> ${country} (${countryCode})</p>
        <p><strong>Region:</strong> ${region} (${regionCode})</p>
        <p><strong>City:</strong> ${city}</p>
        <p><strong>ZIP:</strong> ${zip}</p>

        <h3 style="background-color:wheat; padding:10p;">Geo Coordinates</h3>
        <p><strong>Latitude / Longitude:</strong> ${latitude}, ${longitude}</p>
        <p><strong>Capital:</strong> ${capital}</p>

        <h3 style="background-color:wheat; padding:10p;">More Info for ${hostname}</h3>
        <p><strong>Languages:</strong> ${languages}</p>
        <p><strong>EU Member:</strong> ${isEU}</p>

        <h3>Network Connection</h3>
        <p><strong>Routing Type:</strong> ${routingType}</p>
        <p><strong>Connection Type:</strong> ${connectionType}</p>
        <p><strong>MSA:</strong> ${msa}</p>
        <p><strong>DMA:</strong> ${dma}</p>
        <p><strong>Radius:</strong> ${radius}</p>

        <h3 style="background-color:wheat; padding:10p;">Country Flag</h3>
        <p><strong>Emoji:</strong> ${flagEmoji}</p>
        ${
          flagUrl
            ? `<img src="${flagUrl}" alt="Flag of ${country}" width="100">`
            : "Flag not available"
        }

        <h3>Calling Code</h3>
        <p>+${callingCode}</p>
      `;
    } else {
      locA.innerHTML = "Failed to load location data.";
    }
  } catch (error) {
    console.error("Fetch error:", error);
    locA.innerHTML = "An error occurred while fetching location data.";
  }
}
