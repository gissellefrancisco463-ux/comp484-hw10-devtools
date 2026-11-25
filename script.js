$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
    
    // Called function to update the name, happiness, and weight of our pet in our HTML
    checkAndUpdatePetInfoInHtml();
  
    // When each button is clicked, it will "call" function for that button (functions are below)
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);
    $('.nap-button').click(clickedNapButton);
    $('#pet-select').on('change', function (){
      const selectedPet = pets[Number(this.value)];

      //check whether the selected pet exists 
      if(!selectedPet){
        //Add console error: console.warn
        console.error(`Cannot switch pets.`);
        //retore the dropdown to the current pet
        this.value = String(pets.indexOf(pet_info));
        //exit the handler before updating the pet
        return;
      }

      pet_info = pets[Number(this.value)];
      $('#pet-comment').remove();
      checkAndUpdatePetInfoInHtml();

      //Add Log Group: console.group() and console.groupEnd()
      //Start a console group for the pet selection details
      console.group("Pet selection");
      //Log the name of the pet the user selected
      console.info(`Switched to ${selectedPet.name}`);
      //Show each pet's name, weight, and happiness in a table
      console.table(pets, ["name", "weight", "happiness"]);
      //End the group so future messages appear outside it
      console.groupEnd();


      //Add Log Table: console.table() to show pet's name, weight, happiness
      console.table(pets, ["name", "weight", "happiness"]);
    })

    $('#demo-404').on('click', function (){
      //Request an image that does not exist in the images folder
      fetch("./images/missing-pet.png");
    });

    $('#demo-type-error').on('click',function (){
      //Index 99 does not exist, so missingPet is undefined
      const missingPet = pets[99];

      //Reading .name from undefind triggers an uncaught TypeError
      return missingPet.name;
    });

    document.querySelector('#demo-violation').addEventListener('click', function(){
      //keep the browser's main thread busy for about 
      const stopAt = performance.now() + 500; 

      while (performance.now() < stopAt){
        //intentionally wait here 
      }
    });
 
  })
  
    // Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
   function Pet(name, weight, happiness, image){
    this.name = name;
    this.weight = weight;
    this.happiness = happiness;
    this.image = image; 
   }

   //new pet creates a separate object so each pet has its own info for weight and happiness
   var pets = [
    new Pet("Michi", 9, 12, "images/pixelcat.png"),
    new Pet("Mochi", 6, 10, "images/pixelcat2.png")
   ]

    var pet_info = pets[0];
  
    function clickedTreatButton() {
      // Increase pet happiness
      pet_info.happiness -= 2;
      // Increase pet weight
      pet_info.weight += 1;

      // adding Log Info: console.info()
      console.info(`${pet_info.name} recieved a treat!`);

      checkAndUpdatePetInfoInHtml();
      showPetComment("That was yummy! Can I have another?");
    }
    
    function clickedPlayButton() {
      // Increase pet happiness
      pet_info.happiness += 3;
      // Decrease pet weight
      pet_info.weight -= 1;
      checkAndUpdatePetInfoInHtml();
      showPetComment("That was fun!");
    }
    
    function clickedExerciseButton() {
      // Decrease pet happiness
      pet_info.happiness -=1 ; 
      // Decrease pet weight
      pet_info.weight -= 2;
      checkAndUpdatePetInfoInHtml();
      showPetComment("Whew! I need a break.")
    }

    function clickedNapButton() {
      //Increases pet happiness
      pet_info.happiness += 1;
      //Add Log Custom: %c
      console.log(
        //used %c to style the nap message in the console
       ` %c${pet_info.name} finished a nap`, "background-color: #4a235a; color: white; font-weight: bold; padding: 4px 8px;"
      );
      checkAndUpdatePetInfoInHtml();
      showPetComment("Zzz... that was a good nap.");
    }
  
    function checkAndUpdatePetInfoInHtml() {
      checkWeightAndHappinessBeforeUpdating();  
      updatePetInfoInHtml();
    }
    
    function checkWeightAndHappinessBeforeUpdating() {
      // Add conditional so if weight is lower than zero.
      if(pet_info.weight < 0){
        //Add Log Warning: console.warn()
        console.warn(`${pet_info.name}'s weight dropped below zero. Resetting it back to 0. `);
        pet_info.weight = 0;
      }

      if(pet_info.happiness < 0){
        pet_info.happiness = 0; 
      }
    }
    
    function showPetComment(message){
      //.remove deletes the previous comment paragraph from the page
      //so messages do not stack up after each button press
      $('#pet-comment').remove();
      var comment = $('<p id="pet-comment"></p>').text(message);
      //.after() inserts the new comment immediately after the entire happiness row
      $('#pet-happiness-row').after(comment);
    }

    // Updates your HTML with the current values in your pet_info object
    function updatePetInfoInHtml() {
      $('.name').text(pet_info['name']);
      $('.weight').text(pet_info['weight']);
      $('.happiness').text(pet_info['happiness']);
      $('.pet-image').attr('src', pet_info.image);
    }
  