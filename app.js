const menuSectionElement = document.querySelector('.menu-container');
const tablesSectionElement = document.querySelector('.tables-container');

const displayListItems = (ulElement,sectionElement) => {
    //console.log(ulElement);
    sectionElement.append(ulElement);
};

const dragStartHandler = (evtObj) => {
    console.log("dragging begins");
    evtObj.target.style.opacity = 0.5;
};
const dragEndHandler = (evtObj) => {
    console.log("dragging ends");
    evtObj.target.style.opacity = "";
};
const dragOverHandler = (evtObj) => {
    evtObj.preventDefault();
    console.log("dragging over");
}
const dragEnterHandler = (evtObj) => {
    if(evtObj.target.className == "dropzone"){
        console.log('drag enter')
        evtObj.target.style.background="yellow";
    }
}
const dragLeaveHandler = (evtObj) => {
    if(evtObj.target.className=="dropzone"){
        console.log('drag leave')
        evtObj.target.style.background="";
    }
}


class Dish{
    constructor(dishName,dishPrice,dishType){
        this.dishName = dishName;
        this.dishPrice = dishPrice;
        this.dishType = dishType;
    }
}

const foodItems = [
    new Dish("Crusty Garlic Focaccia with Melted Cheese","105.00","entree"),
    new Dish("French Fries","105.00","appetizers"),
    new Dish("Home Country Fries with Herbs & Chilli Flakes","105.00","appetizers"),
    new Dish("French Fries with Cheese & Jalapenos","135.00","entree"),
    new Dish("Dal Tadka","200.0","main-course"),
    new Dish("Paneer Butter Masala","165.00","main-course"),
    new Dish("Mushroom Do Pyaza","225.0","main-course"),
    new Dish("Hot Chocolate Fudge","150.0","desserts"),
    new Dish("Kulfi Faluda","100.0","desserts"),
    new Dish("Gulab Jamun","75.00","desserts"),
    new Dish("Coffee","100.0","beverages"),
    new Dish("Vanilla Milkshake Topped with Cherry","125.00","beverages"),
    new Dish("Sparkling Water","65.0","beverages")
];

const makeListOfFoodItems = foodItems => { /*convert each foodItems to <li> element*/
    const foodLiElements = foodItems.map( (dish) => {
        
        let foodTitleElement = document.createElement('h3');
        foodTitleElement.innerText = dish.dishName 
        
        let foodPriceElement = document.createElement('span');
        foodPriceElement.innerText = `Price: ${dish.dishPrice}`;

        let foodTypeElement = document.createElement('span');
        foodTypeElement.innerText = dish.dishType;
        foodTypeElement.classList.add('hide-from-display');
        foodTypeElement.classList.add('meta-info');

        let liContainer = document.createElement('li');
        liContainer.append(foodTitleElement,foodPriceElement,foodTypeElement);
        
        return liContainer;

        /*return document.createElement('li').innerHTML = 
        (document.createElement('h3').innerHTML = `${dish.dishName}`) +
        (document.createElement('span').innerHTML = `${dish.dishPrice}`)*/
    
        // return `<li> <h3>${dish.dishName}</h3> <span> Price: ${dish.dishPrice}</span> </li>` */
    });
    // console.log(foodLiElements);
    foodLiElements.forEach(liItem => {
        liItem.classList.add('list-item');
        liItem.setAttribute('draggable','true');
        liItem.addEventListener('dragstart',dragStartHandler);
        liItem.addEventListener('dragend',dragEndHandler);
        liItem.addEventListener('dragover',dragOverHandler);
        liItem.addEventListener('dragenter',dragEnterHandler);
        liItem.addEventListener('dragleave',dragLeaveHandler);
        //liItem.addEventListener('')
        //console.log(li.getAttribute('draggable'));
       
    });
    
    //const foodItemsUlElement = `<ul>\n${foodLiElements.join('\n')}\n</ul>`;
    
    const foodItemsUlElement = document.createElement('ul');
    foodItemsUlElement.classList.add('list-container');

    foodLiElements.forEach(liItem => foodItemsUlElement.appendChild(liItem));
    displayListItems(foodItemsUlElement,menuSectionElement);
    // foodItemsUlElement.innerHTML = foodLiElements.join('\n');
    //console.log(foodItemsUlElement);
   
}

makeListOfFoodItems(foodItems);

class Table{
    constructor(tableName,){
        this.tableName = tableName;
        this.tableTotalBill = 0;
        this.tableCartList =[];
        this.tableTotalItems =  0;
    }
}

const allTables = [
    new Table("Table 1"),
    new Table("Table 2"),
    new Table("Table 3"),
];


const makeListOfTables = allTables => {
    const tableLiElements = allTables.map( (table) => {
        let tableTitleElement = document.createElement('h3');
        tableTitleElement.innerText = table.tableName; 

        let tablePriceElement = document.createElement('span');
        tablePriceElement.innerText = `Price: ${table.tableTotalBill} | `;

        let tableTotalItemsElement  = document.createElement('span')
        tableTotalItemsElement.innerText = `Total Items: ${table.tableTotalItems}`;

        let liContainer = document.createElement('li');
        liContainer.append(tableTitleElement,tablePriceElement,tableTotalItemsElement);
        return liContainer;
    });

    tableLiElements.forEach(li => {
        li.classList.add('list-item');
        li.classList.add('dropzone');
    });
    
    const tableItemsUlElement = document.createElement('ul');
    tableItemsUlElement.classList.add('list-container');

    tableLiElements.forEach(liItem => tableItemsUlElement.appendChild(liItem))
    displayListItems(tableItemsUlElement,tablesSectionElement);
 
}

makeListOfTables(allTables);

const tableSearchElement = document.querySelector('#tableSearch');
const foodSearchElement = document.querySelector('#menuSearch');

const displayMatchingFoodItems = () => {
    let searchQuery = foodSearchElement.value.trim().toLowerCase();
    let foodLiElements = document.querySelectorAll('.menu-container ul li');
   
    foodLiElements.forEach(liItem => {
        let foodTitle = liItem.querySelector('h3').innerText.toLowerCase();
        let foodType = liItem.querySelector('.meta-info').innerText.toLowerCase();
        if(foodTitle.indexOf(searchQuery)===-1 && foodType.indexOf(searchQuery)===-1){
            //console.log('hide');
            liItem.classList.add('hide-from-display');
            
        } else{
           //console.log('show');
            liItem.classList.remove('hide-from-display');
            //console.log(liItem);
        }
    });
}

foodSearchElement.addEventListener('input',displayMatchingFoodItems);

const displayMatchingTables = () => {
    let searchQuery = tableSearchElement.value.trim().toLowerCase();
    let tableLiElements = document.querySelectorAll('.tables-container ul li');
    //console.log(tableLiElements);
    tableLiElements.forEach(liItem => {
        let tableName = liItem.querySelector('h3').innerText.toLowerCase();
        console.log(tableName);
        if(tableName.indexOf(searchQuery)===-1){
            console.log('hide');
            liItem.style.display="none";
            //liItem.classList.add('.hide-from-display');
        }else{
            console.log('show');
            liItem.style.display="";
            //liItem.classList.remove('.hide-from-display');
        }
    }); 
}

tableSearchElement.addEventListener('input',displayMatchingTables);



  

