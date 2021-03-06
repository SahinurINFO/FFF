const searchBtn = document.getElementById("searchItemBtn");
// Enter key
document.getElementById("searchItem").addEventListener('keypress', function (event){
  if(event.key == 'Enter'){
    document.getElementById('searchItemBtn').click();
  }
});
// API call
const foodItemShow = async () => {
  toggleSpinner();
  const searchInput = document.getElementById("searchItem").value;
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    foodShow(data);
  } catch (error) {
    displayError("Sorry, try again!!!");
  }
};

const foodShow = (food) => {
  const foodArr = food.meals;
  // looping
  foodArr.forEach((foodList) => {
    const rowDiv = document.createElement("div");
    rowDiv.classList = "col box-food order-last";
    const singleFood = `
                    <div onclick="foodDetailsData('${foodList.idMeal}')"  data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <img src="${foodList.strMealThumb}">
                        <h1>${foodList.strMeal}</h1>
                    </div>
                `;
    rowDiv.innerHTML = singleFood;
    document.getElementById("foodShoww").appendChild(rowDiv);
    toggleSpinner();
  });
};

const foodDetailsData = async (id) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    foodDetailsDisplay(data.meals[0]);
  } catch (error) {
    displayError("Sorry, try again!!!");
  }
};
// food details show display
const foodDetailsDisplay = (meal) => {
  const singleDetails = `
                        <img src="${meal.strMealThumb}">
                        <h6>Name: ${meal.strMeal}</h6>
                        <p>Category Name: ${meal.strCategory}</p>
                        <p>Weight: ${meal.strMeasure1} ${meal.strCategory}</p>
                        <p>Country: ${meal.strArea}</p>
                        <p>Ingredients: ${meal.strIngredient1}, ${meal.strIngredient2}, ${meal.strIngredient3}, ${meal.strIngredient4}, ${meal.strIngredient4}, ${meal.strIngredient6}, ${meal.strIngredient1}</p>
                        
            `;
  document.getElementById("details-food-contan").innerHTML = singleDetails;
};

const displayError = (error) => {
  alert(error);
  //   document.getElementById('error-massage').innerText = error;
};

// Spinner
const toggleSpinner = () => {
  const spinner = document.getElementById("loading-spinner");
  let foodd = document.getElementById("foodShoww");
  spinner.classList.toggle("d-none");
  foodd.classList.toggle("d-none");
  // if (show){
  //   spinner.classList.remove('d-none');
  // }else{
  //   spinner.classList.add('d-none')
  // }
};
