        const searchBtn = document.getElementById('searchItemBtn');
          // API 
          const foodItemShow = () => {
            const searchInput = document.getElementById('searchItem').value;
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
            .then(res => res.json())
            .then(data => foodShow(data))
            .catch(erro => console.log(erro))
          }

          const foodShow = (food) => {
            const foodArr = food.meals;
            // looping
            foodArr.forEach(foodList => {
                const rowDiv = document.createElement('div');
                rowDiv.classList ='col box-food order-last'
                const singleFood = `
                    <div onclick="foodDetailsData('${foodList.idMeal}')"  data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <img src="${foodList.strMealThumb}">
                        <h1>${foodList.strMeal}</h1>
                    </div>
                `;
                rowDiv.innerHTML= singleFood;

                document.getElementById('foodShoww').appendChild(rowDiv);

                
            });
          }

          const foodDetailsData = id => {
              fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
              .then(res => res.json())
              .then(data => foodDetailsDisplay(data.meals[0]))
              .catch(error => console.log(error))
          }
           
          const foodDetailsDisplay = meal => {
              console.log(meal);
            // const popUPDiv = document.createElement('div')
            const singleDetails = `
                        <img src="${meal.strMealThumb}">
                        <h6>Name: ${meal.strMeal}</h6>
                        <p>Category Name: ${meal.strCategory}</p>
                        <p>Weight: ${meal.strMeasure1} ${meal.strCategory}</p>
                        <p>Country: ${meal.strArea}</p>
                        <p>Food ingredients: ${meal.strIngredient1}, ${meal.strIngredient2}, ${meal.strIngredient3}, ${meal.strIngredient4}, ${meal.strIngredient4}, ${meal.strIngredient6}, ${meal.strIngredient1}</p>
                        
            `;
            // popUPDiv.innerHTML = singleDetails;
            document.getElementById('details-food-contan').innerHTML = singleDetails;
          }