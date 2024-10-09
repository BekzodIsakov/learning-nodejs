console.log("Client-side Javascript file loaded!");

window.onload = () => {
  const $forecastInput = document.getElementById("forecast-input");
  const $unitsSelect = document.getElementById("units");
  const $forecastBtn = document.getElementById("forecast-btn");
  const $forecast = document.getElementById("forecast");
  const $forecastForm = document.getElementById("forecast-form");

  let unit = $unitsSelect.value ?? "m";

  $unitsSelect.addEventListener("change", (e) => {
    unit = e.target.value;
    const unitDescription = unit === "m" ? "Celsius" : "Fahrenheit";
  });

  if (!$forecastBtn) {
    return console.error("Button with id 'forecast-btn' not found!");
  } else if (!$forecastInput) {
    return console.error("Input with id 'forecast-input' not found!");
  } else if (!$forecastInput) {
    return console.error("Input with id 'forecast-input' not found!");
  } else if (!$forecast) {
    return console.error("Element with id 'forecast' not found!");
  } else if (!$forecastForm) {
    return console.error("Form with id 'forecast-form' not found!");
  }

  $forecastForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const location = $forecastInput.value.trim();

    if (!location) {
      return console.error("Location is not provided!");
    }

    $forecastBtn.disabled = true;
    $forecastBtn.textContent = "Loading...";
    $forecast.textContent = "";

    try {
      // delay for 2 seconds to see UI loading
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await fetch(
        `/forecast?location=${location}&unit=${unit}`
      );
      if (!response.ok) {
        throw new Error("HTTP error! status: ${response.status}");
      }
      const data = await response.json();
      $forecast.textContent = data.message;
      console.log(data);
    } catch (error) {
      $forecast.textContent =
        "Error fetching forecast data. Check console for more info.";
      $forecast.style.color = "red";
      console.error("Error fetching forecast data:", error);
    } finally {
      $forecastBtn.disabled = false;
      $forecastBtn.textContent = "Search";
    }
  });
};

function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function fahrenheitToCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}
