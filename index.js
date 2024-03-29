import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const recipeJSON =
  '[{"id": "0001","type": "taco","name": "Chicken Taco","price": 2.99,"ingredients": {"protein": {"name": "Chicken","preparation": "Grilled"},  "salsa": {"name": "Tomato Salsa","spiciness": "Medium"},  "toppings": [{"name": "Lettuce",  "quantity": "1 cup",  "ingredients": ["Iceberg Lettuce"]  },      {"name": "Cheese",  "quantity": "1/2 cup",  "ingredients": ["Cheddar Cheese", "Monterey Jack Cheese"]  },      {"name": "Guacamole",  "quantity": "2 tablespoons",  "ingredients": ["Avocado", "Lime Juice", "Salt", "Onion", "Cilantro"]  },      {"name": "Sour Cream",  "quantity": "2 tablespoons",  "ingredients": ["Sour Cream"]  }      ]    }  },{"id": "0002","type": "taco","name": "Beef Taco","price": 3.49,"ingredients": {"protein": {"name": "Beef","preparation": "Seasoned and Grilled"},  "salsa": {"name": "Salsa Verde","spiciness": "Hot"},  "toppings": [{"name": "Onions",  "quantity": "1/4 cup",  "ingredients": ["White Onion", "Red Onion"]  },      {"name": "Cilantro",  "quantity": "2 tablespoons",  "ingredients": ["Fresh Cilantro"]  },      {"name": "Queso Fresco",  "quantity": "1/4 cup",  "ingredients": ["Queso Fresco"]  }      ]    }  },{"id": "0003","type": "taco","name": "Fish Taco","price": 4.99,"ingredients": {"protein": {"name": "Fish","preparation": "Battered and Fried"},  "salsa": {"name": "Chipotle Mayo","spiciness": "Mild"},  "toppings": [{"name": "Cabbage Slaw",  "quantity": "1 cup",  "ingredients": [    "Shredded Cabbage",    "Carrot",    "Mayonnaise",    "Lime Juice",    "Salt"          ]  },      {"name": "Pico de Gallo",  "quantity": "1/2 cup",  "ingredients": ["Tomato", "Onion", "Cilantro", "Lime Juice", "Salt"]  },      {"name": "Lime Crema",  "quantity": "2 tablespoons",  "ingredients": ["Sour Cream", "Lime Juice", "Salt"]  }      ]    }  }, {"id": "0004", "type": "taco", "name": "Vegetarian Taco", "price": 2.99, "ingredients": { "protein": { "name": "Tofu", "preparation": "Grilled" }, "salsa": { "name": "Chipotle Mayo", "spiciness": "Mild" }, "toppings": [ { "name": "Lettuce", "quantity": "1 cup", "ingredients": ["Iceberg Lettuce"] }, { "name": "Cheese", "quantity": "1/2 cup", "ingredients": ["Cheddar Cheese", "Monterey Jack Cheese"] }, { "name": "Guacamole", "quantity": "2 tablespoons", "ingredients": ["Avocado", "Lime Juice", "Salt", "Onion", "Cilantro"] }, { "name": "Sour Cream", "quantity": "2 tablespoons", "ingredients": ["Sour Cream"] }, { "name": "Queso Fresco", "quantity": "1/4 cup", "ingredients": ["Queso Fresco"] } ] } } ]';

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { recipe: null }); // Pasa null como receta inicialmente
});

app.post("/recipe", (req, res) => {
  const choice = req.body.choice; // Obtener el valor del botón seleccionado

  let recipe = null;

  // Renderizar la página con el contenido correspondiente al botón seleccionado
  switch (choice) {
    case "chicken":
      recipe = getRecipe("Chicken Taco");
      break;
    case "beef":
      recipe = getRecipe("Beef Taco");
      break;
    case "fish":
      recipe = getRecipe("Fish Taco");
      break;
    case "vegetarian":
      recipe = getRecipe("Vegetarian Taco");
      break;
  }

  res.render("index.ejs", { recipe: recipe });
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

// Helpers
function getRecipe(tacoName) {
  const recipes = JSON.parse(recipeJSON);
  return recipes.find((recipe) => recipe.name === tacoName);
}
