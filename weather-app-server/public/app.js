window.onload = () => {
  const $forecastBtn = document.getElementById("forecastBtn");

  if (!$forecastBtn)
    return console.error("Button with id 'forecastBtn' not found!");

  $forecastBtn.onclick = async () => {
    $forecastBtn.disabled = true;
    $forecastBtn.textContent = "Loading...";

    try {
      // delay for 2 seconds to see UI loading
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await fetch("/forecast?location=");
      if (!response.ok) {
        throw new Error("HTTP error! status: ${response.status}");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching forecast data:", error);
    } finally {
      $forecastBtn.disabled = false;
      $forecastBtn.textContent = "Forecast";
    }
  };

  console.log("Client-side Javascript file loaded!");
};
