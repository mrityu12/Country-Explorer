document.addEventListener("DOMContentLoaded", () => {
  //select all the elements

  const search = document.querySelector(".search");

  //search country

  async function searchCountry() {
    const searchInput = document.getElementById("searchInput").value;
    const resultDiv = document.getElementById("result");
    if (!searchInput) {
      alert("Please enter a country name");
      return;
    }
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${searchInput}`
      );
      const data = await response.json();

      if (data.status === 404) {
        throw new Error("Country not found");
      }
      const country = data[0];

      //Create HTML Content for the country information
      const currencies = Object.values(country.currencies || {})
        .map((currency) => {
          return `${currency.name} (${currency.symbol})`;
        })
        .join(",");

      const languages = Object.values(country.languages || {}).join(",");
      resultDiv.innerHTML = `
       <img src="${country.flags.png}"/>
       <div class='country-info'>

         <div class='info-item'>
         <h3>Country Name</h3>
          <p>${country.name.common}
         </div>

         <div class='info-item'>
           <h3>Capital</h3>
           <p>${country.capital[0] || "N/A"}
         </div>
        <div class='info-item'>
           <h3>Population</h3>
           <p>${country.population}
         </div>

         <div class='info-item'>
           <h3>Currencies</h3>
           <p>${currencies || "N/A"}
         </div>

          <div class='info-item'>
           <h3>Region</h3>
           <p>${country.region}
         </div>

          <div class='info-item'>
           <h3>Languages</h3>
           <p>${languages || "N/A"}
         </div>
       </div>
`;
      resultDiv.classList.remove("hidden");
    } catch (error) {}
  }
  //add event
  search.addEventListener("click", searchCountry);
});
