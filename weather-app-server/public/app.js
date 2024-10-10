console.log("Client-side Javascript file loaded!");

window.onload = () => {
  const $form = document.getElementById("form");
  const $searchInput = document.getElementById("searchInput");
  const $searchBtn = document.getElementById("searchBtn");
  const $unitsSelect = document.getElementById("unitsSelect");
  const $location = document.getElementById("location");
  const $forecast = document.getElementById("forecast");
  const $error = document.getElementById("error");

  if (!$form) {
    return console.error("Form with id 'form' not found!");
  } else if (!$searchInput) {
    return console.error("Input with id 'searchInput' not found!");
  } else if (!$searchBtn) {
    return console.error("Button with id 'searchBtn' not found!");
  } else if (!$unitsSelect) {
    return console.error("Select with id 'unitsSelect' not found!");
  } else if (!$location) {
    return console.error("Element with id 'location' not found!");
  } else if (!$forecast) {
    return console.error("Element with id 'forecast' not found!");
  } else if (!$error) {
    return console.error("Element with id 'error' not found!");
  }

  let unit = $unitsSelect.value ?? "m";

  $unitsSelect.addEventListener("change", (e) => {
    unit = e.target.value;
    const unitDescription = unit === "m" ? "Celsius" : "Fahrenheit";
  });

  $form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const location = $searchInput.value.trim();

    if (!location) {
      return console.error("Location is not provided!");
    }

    $searchBtn.disabled = true;
    $searchBtn.textContent = "Loading...";
    $forecast.textContent = "";
    $location.textContent = "";
    $error.textContent = "";

    try {
      // delay for 1 second to see loading
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await fetch(
        `/forecast?location=${location}&unit=${unit}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.status < 200 || 299 < data.status) {
        console.log("ERROR");

        throw new Error(`${data.status}. ${data.message}`);
      }

      console.log(data);

      $forecast.textContent = data.forecast;
      $location.textContent = data.location;
    } catch (error) {
      $error.textContent = error.message;
      console.error("Error fetching forecast data:", error);
    } finally {
      $searchBtn.disabled = false;
      $searchBtn.textContent = "Search";
    }
  });
};

// function celsiusToFahrenheit(celsius) {
//   return (celsius * 9) / 5 + 32;
// }

// function fahrenheitToCelsius(fahrenheit) {
//   return ((fahrenheit - 32) * 5) / 9;
// }
