const menuSectionElement = document.querySelector('.menu-container');
const tablesSectionElement = document.querySelector('.tables-container');

const displayListItems = (ulElement,sectionElement) => {
    //console.log(ulElement);
    sectionElement.append(ulElement);
};

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

var draggedElement;

const dragHandler = (evtObj) => {
    console.log("drag invoke");
}

const dragStartHandler = (evtObj) => {
    draggedElement = evtObj.target;
    console.log("dragging begins");
    //console.log(evtObj);
    evtObj.target.style.opacity = 0.5;
};
const dragEndHandler = (evtObj) => {
    console.log("dragging ends");
    //console.log(evtObj);
    evtObj.target.style.opacity = "";
};


const makeListOfFoodItems = foodItems => { /*convert each foodItems to <li> element*/
    const foodLiElements = foodItems.map( (dish) => {
        
        let foodTitleElement = document.createElement('h3');
        foodTitleElement.innerText = dish.dishName 
        
        let foodPriceElement = document.createElement('span');
        foodPriceElement.innerHTML = `Price: <span id="foodPrice">${dish.dishPrice}</span>`;

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
        liItem.addEventListener('drag',dragHandler,false);
        liItem.addEventListener('dragstart',dragStartHandler,false);
        liItem.addEventListener('dragend',dragEndHandler,false);
        
        /* liItem.addEventListener('dragover',dragOverHandler,false);
        liItem.addEventListener('dragenter',dragEnterHandler,false);
        liItem.addEventListener('dragleave',dragLeaveHandler,false); */

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
        this.tableTotalItems =  0;
        this.tableCartList = [];
    }
}

const allTables = [
    new Table("Table 1"),
    new Table("Table 2"),
    new Table("Table 3")
];

const dragOverHandler = (evtObj) => {
    evtObj.preventDefault();
    console.log("dragging over");
    //console.log(evtObj);
    //console.log("dragging over");
    // if(evtObj.target.className.indexOf("dropzone")!==-1){// to account for multiple classes
        
    // }
}
const dragEnterHandler = (evtObj) => {
    //console.log(evtObj);
    console.log('drag enter')
    evtObj.target.style.background="yellow";
    // if(evtObj.target.className.indexOf("dropzone")!==-1){// to account for multiple classes
        
    // }
}
const dragLeaveHandler = (evtObj) => {
    //console.log(evtObj);
    console.log('drag leave');
    evtObj.target.style.background="";
    // if(evtObj.target.className.indexOf("dropzone")!==-1){// to account for multiple classes
        
    // }
}
const dropHandler = (evtObj) => {
    evtObj.preventDefault();
    evtObj.target.style.background="";
    console.log("DROPPED!!!!!!!!!!!!!!!!!");
    
    console.log(draggedElement);
    let foodTitle = draggedElement.querySelector('h3').innerText;
    let foodPrice = draggedElement.querySelector('#foodPrice').innerText;
    console.log(foodTitle)
    console.log(foodPrice)

    let dropZoneElement = evtObj.target;
    console.log(dropZoneElement);
    let tableNameElement = dropZoneElement.querySelector('h3')
    let tablePriceElement = dropZoneElement.querySelector('#tablePrice');
    let tableTotalItemsElement = dropZoneElement.querySelector('#tableTotalItems');
    console.log(tableNameElement);
    console.log(tablePriceElement);
    console.log(tableTotalItemsElement);

    /* updating table values in the DOM*/
    tablePriceElement.innerText = ( parseFloat(tablePriceElement.innerText) + 
                                    parseFloat(foodPrice) ).toFixed(2);
    tableTotalItemsElement.innerText = (Number(tableTotalItemsElement.innerText)+1).toString();
    
    /* updating table values in local DB*/
    let workingIndex = tableNameElement.innerText.match(/\d+/)[0] - 1; //extract tablenumber and subtract 1 to get its index
    let targetTable = allTables[workingIndex];
    console.log('working index is:'+workingIndex);
    console.log(targetTable);

    targetTable.tableTotalBill = tablePriceElement.innerText;
    targetTable.tableTotalItems = tableTotalItemsElement.innerText;
    let newCartItem = {
            foodTitle :`${foodTitle}`,
            foodPrice : `${foodPrice}`,
            foodServings: '1'
    };
    let cartList = targetTable.tableCartList;
    let cartItemIndex = cartList.findIndex
                        (currCartItem => currCartItem.foodTitle === foodTitle );
    console.log('cartItemIndex: '+cartItemIndex);
    if(cartItemIndex>-1){
        cartList[cartItemIndex].foodServings = 
                            (Number(cartList[cartItemIndex].foodServings)+1).toString();
        console.log(`current Servings of ${cartList[cartItemIndex].foodTitle} are 
                        ${cartList[cartItemIndex].foodServings}`);
    } else{
        cartList.push(newCartItem);
    }

    console.log('name: '+targetTable.tableName)
    console.log('table total bill '+targetTable.tableTotalBill)
    console.log('cart list ==> ')
    targetTable.tableCartList.forEach(currCartItem => {
        console.log(`dishName: ${currCartItem.foodTitle}\n
                     dishPrice: ${currCartItem.foodPrice}\n
                     servings: ${currCartItem.foodServings}`);
    })
    console.log('total items '+targetTable.tableTotalItems)
    
}

const tableClickHandler = (evtObj) => {

    let cartPopUpElement =  document.querySelector('.cart-popup');

    let clickedElement = evtObj.target;
    console.log(clickedElement);
    let tableNameElement = clickedElement.querySelector('h3');
    console.log(tableNameElement)
    if(evtObj.target.style.background=='white'){
        evtObj.target.style.background="yellow"
    }else {
        evtObj.target.style.background="white"
    }
    
    let workingIndex = tableNameElement.innerText.match(/\d+/)[0] - 1; //extract tablenumber and subtract 1 to get its index
    let targetTable = allTables[workingIndex];
    console.log('working index is:'+workingIndex);
    console.log(targetTable);

    document.querySelector('#cart-header-table-number').innerText = (workingIndex+1).toString();

    if(targetTable.tableCartList.length!=0){
        
    }else{
       cartPopUpElement.style.display="block";
       cartPopUpElement.querySelector('.cart-container').style.height="25%"
       console.log(cartPopUpElement);
    }
}

const makeListOfTables = allTables => {
    const tableLiElements = allTables.map( (table) => {
        let tableTitleElement = document.createElement('h3');
        tableTitleElement.innerText = table.tableName; 

        let tablePriceElement = document.createElement('span');
        tablePriceElement.innerHTML = `Rs. 
                                       <span id="tablePrice">${table.tableTotalBill}</span> 
                                       | `;

        let tableTotalItemsElement  = document.createElement('span')
        tableTotalItemsElement.innerHTML = `Total Items: 
                                <span id="tableTotalItems">${table.tableTotalItems}</span>`;

        let liContainer = document.createElement('li');
        liContainer.append(tableTitleElement,tablePriceElement,tableTotalItemsElement);
        return liContainer;
    });

    tableLiElements.forEach(liItem => {
        liItem.classList.add('list-item');
        liItem.classList.add('dropzone');

        liItem.addEventListener('dragover',dragOverHandler,false);
        liItem.addEventListener('dragenter',dragEnterHandler,false);
        liItem.addEventListener('dragleave',dragLeaveHandler,false);
        liItem.addEventListener('drop',dropHandler,false);
        liItem.addEventListener('click',tableClickHandler,false)
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

cartCloseButtonHanlder = (evtObj) => {
    let cartPopUpElement =  document.querySelector('.cart-popup');
    cartPopUpElement.style.display="none";
}

let cartCloseButton = document.querySelector('#cart-header-close-btn');
cartCloseButton.addEventListener('click',cartCloseButtonHanlder);



  

