async function getFoodTypesSummary() {
    try {
      const response = await fetch('http://localhost:3000/get-food-types-summary');
      const foodSummary = await response.json();
  
      let tableHtml = `
        <table>
          <thead>
            <tr>
              <th>Food Type</th>
              <th>Total Weight (lbs)</th>
            </tr>
          </thead>
          <tbody>
      `;
  
      foodSummary.forEach(food => {
        tableHtml += `
          <tr>
            <td>${food.foodType}</td>
            <td>${food.totalWeight}</td>
          </tr>
        `;
      });
  
      tableHtml += `</tbody></table>`;
  
      document.querySelector(".food-summary-table").innerHTML = tableHtml;
    } catch (error) {
      console.error("Error fetching food types summary:", error);
    }
  }

document.addEventListener("DOMContentLoaded", ()=>{
    getFoodTypesSummary();
})
  