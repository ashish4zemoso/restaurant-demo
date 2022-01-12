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
        this.tableTotalBill = '0.0';
        this.tableTotalItems =  '0';
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
    evtObj.target.style.background="orange";
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
    //tableTotalItemsElement.innerText = (Number(tableTotalItemsElement.innerText)+1).toString();
    
    /* updating table values in local DB by fetching it from DOM*/
    let workingIndex = tableNameElement.innerText.match(/\d+/)[0] - 1; //extract tablenumber and subtract 1 to get its index
    let targetTable = allTables[workingIndex];
    console.log('working index is:'+workingIndex);
    console.log(targetTable);

    targetTable.tableTotalBill = tablePriceElement.innerText;
    //targetTable.tableTotalItems = tableTotalItemsElement.innerText;
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

    targetTable.tableTotalItems = cartList.length;
    tableTotalItemsElement.innerText = cartList.length;

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

var workingTableNumber ;

const closeSessionHandler = (evtObj) => {
    console.log('evtObj target is =====>>')
    console.log(evtObj.target);

    let targetTable = allTables[workingTableNumber-1];
    console.log(targetTable.tableName);
    console.log(targetTable.tableTotalBill);
    console.log(targetTable.tableCartList);
    console.log(targetTable.tableTotalItems);

   let cartPopUpElement =  document.querySelector('.cart-popup');
   cartPopUpElement.style.display="none";

   let tableLiElement = document.querySelector
                        (`.tables-container ul 
                           li:nth-of-type(${workingTableNumber})`
                        );
    console.log(tableLiElement)
    tableLiElement.style.background="";
    tableLiElement.querySelector('#tablePrice').innerText="0.0";
    tableLiElement.querySelector('#tableTotalItems').innerText="0";
    /* tableLiElements.forEach(liItem => {
        if(liItem.style.background==="yellow"){
            liItem.style.background="";
            console.log("changed!!!!!!!!!!")
        }
    }) */
    //let tableLiElements = document.querySelectorAll('.tables-container ul li');

    let allCartFoodItems = document.querySelectorAll('.cart-bill-item');
    console.log('following will be removed ===>')
    allCartFoodItems.forEach(foodItem => {
        console.log(foodItem);
        foodItem.remove();
    });

    targetTable.tableTotalBill='0.0';
    targetTable.tableCartList=[];
    targetTable.tableTotalItems='0'; 
}

const generateBillHandler = (evtObj) => {
    let targetTable = allTables[workingTableNumber-1];
    targetTable.tableTotalBill='0.0';
    targetTable.tableCartList=[];
    targetTable.tableTotalItems='0';

    let allDeleteElements = document.querySelectorAll('.cart-item-delete');
    let allServingsInputElements = document.querySelectorAll('.cart-food-servings');

    allDeleteElements.forEach((deleteElement)=>{
        deleteElement.style.display="none";
    })

    for(let i=1;i<allServingsInputElements.length;i++){
        let currServingsInputElement = allServingsInputElements[i];
        console.log(currServingsInputElement);
        let finalServingsValue = currServingsInputElement.
                                    querySelector('input').value;
        currServingsInputElement.querySelector('input').remove();

        let newServingsInnerElement = document.createElement('span');
        newServingsInnerElement.innerText=`${finalServingsValue}`;
        currServingsInputElement.style.textAlign='center';
        currServingsInputElement.append(newServingsInnerElement);
        console.log(currServingsInputElement+"VALUE WAS: "+finalServingsValue);
    }

    let tableLiElement = document.
        querySelector(`.tables-container 
                        .list-container 
                        .list-item:nth-of-type(${workingTableNumber})`);
    
    let tableTotalBillElement = tableLiElement.querySelector('#tablePrice');
    let tableTotalItemsElement = tableLiElement.querySelector('#tableTotalItems')
    
    tableTotalBillElement.innerText = targetTable.tableTotalBill;
    tableTotalItemsElement.innerText = targetTable.tableTotalItems;
            
}

const showBillFooterElement = () => {
    let targetTable = allTables[workingTableNumber-1];
    let footerElement = document.querySelector('.cart-footer');
    if(targetTable.tableCartList.length!=0){
        footerElement.style.display="flex";
        let closeSessionElement = footerElement.querySelector('.close-session');
        let generateBillElement = footerElement.querySelector('.generate-bill');
        closeSessionElement.addEventListener('click',closeSessionHandler);
        generateBillElement.addEventListener('click',generateBillHandler);
    } else{
        footerElement.style.display="none";
    } 
}

const updateTableTotalElement = () => {
    let targetTable = allTables[workingTableNumber-1];
    let totalBillAmountElement = document.querySelector('.cart-bill-total span');
    if(targetTable.tableCartList.length!=0){
        totalBillAmountElement.parentElement.style.display="flex";
        let total = allTables[workingTableNumber-1].tableTotalBill;
        totalBillAmountElement.innerText=`Total: ${total}`;
        console.log('totalBillAmountElement '+ totalBillAmountElement);
    } else{
        totalBillAmountElement.parentElement.style.display="none"
    } 
}

const deleteItemHandler = evtObj => {
    //console.log(allTables);
    console.log(evtObj.target);
    console.log(evtObj.target.parentElement);
    //evtObj.target.parentElement.remove();
    console.log(workingTableNumber);

    let tableWorkingIndex = workingTableNumber-1;
    //console.log(allTables[tableWorkingIndex]);
    let deletedCartItemElement = evtObj.target.parentElement;
    let cartItemSno = deletedCartItemElement.querySelector('.sno').innerText;
    let cartItemIndex = Number(cartItemSno) - 1;
    console.log(cartItemIndex);

    /*updating values in local DB*/
    let deletedCartItem = allTables[tableWorkingIndex].tableCartList[cartItemIndex];
    allTables[tableWorkingIndex].tableCartList.splice(cartItemIndex,1);

    let tableTotal = Number(allTables[tableWorkingIndex].tableTotalItems);
    allTables[tableWorkingIndex].tableTotalItems = (tableTotal-1).toString();
    let amountToBeDeducted = deletedCartItem.foodPrice * deletedCartItem.foodServings;
    let newTableTotal = parseFloat(allTables[tableWorkingIndex].tableTotalBill); 
    newTableTotal-=amountToBeDeducted;
    allTables[tableWorkingIndex].tableTotalBill = newTableTotal.toFixed(2);

    console.log(allTables[tableWorkingIndex]);
    
    /*updating Cart Container DOM*/
    let nextCartItemElement = deletedCartItemElement.nextElementSibling;
    while(nextCartItemElement){
        console.log('current nextCartItemElement: '+ nextCartItemElement)
        nextCartItemElement.querySelector('.sno').innerText = 
            (Number(nextCartItemElement
                .querySelector('.sno').innerText)-1).toString();
        nextCartItemElement = nextCartItemElement.nextElementSibling;
    }
    deletedCartItemElement.remove();

    /*updating Table Tab DOM*/
    let tableLiElement = document.
        querySelector(`.tables-container 
                        .list-container 
                        .list-item:nth-of-type(${workingTableNumber})`);
    
    let tableTotalBillElement = tableLiElement.querySelector('#tablePrice');
    let tableTotalItemsElement = tableLiElement.querySelector('#tableTotalItems')
    
    tableTotalBillElement.innerText = allTables[tableWorkingIndex].tableTotalBill;
    tableTotalItemsElement.innerText = allTables[tableWorkingIndex].tableTotalItems;
            
    updateTableTotalElement();
    showBillFooterElement();
}

const servingsChangeHandler = evtObj => {
    let servingsInputElement = evtObj.target;
    //console.log(servingsInputElement);
    let updatedServings = servingsInputElement.value;
    console.log('updatedServings '+ updatedServings);
    let currentCartItemElement = servingsInputElement.parentElement.parentElement;
    //console.log(currentCartItemElement);

    let tableWorkingIndex = workingTableNumber-1;
    let cartItemSno = currentCartItemElement.querySelector('.sno').innerText;
    let cartItemIndex = Number(cartItemSno) - 1;

    let currTable = allTables[tableWorkingIndex];
    let currCartItem = currTable.tableCartList[cartItemIndex];

    /*updating local DB to values fetched from DOM*/
    currCartItem.foodServings = (parseFloat(updatedServings)).toFixed(2);
    console.log('!!currCartItem.foodServings '+ currCartItem.foodServings);
    
    let newTotalBillAmount =  currTable.tableCartList.reduce(
        function(accumulatedCartBill,currCartItem){
           let currCartItemPrice = parseFloat(currCartItem.foodPrice);
           let currCartItemServings = parseFloat(currCartItem.foodServings);

           console.log('currCartItemPrice '+currCartItemPrice)
           console.log('currCartItemServings '+currCartItemServings)
           console.log('till now '+ ( accumulatedCartBill + 
           (currCartItemServings*currCartItemPrice) )  );

           return accumulatedCartBill + 
                    (currCartItemServings*currCartItemPrice); 
        },0);
    console.log('newTotalBillAmount '+newTotalBillAmount);
    currTable.tableTotalBill = newTotalBillAmount.toFixed(2);
    
    /*updating DOM via values fetched from DB*/
    let tableLiElement = document.
        querySelector(`.tables-container 
                        .list-container 
                        .list-item:nth-of-type(${workingTableNumber})`);
    
    let tableTotalBillElement = tableLiElement.querySelector('#tablePrice');
    tableTotalBillElement.innerText = currTable.tableTotalBill;

    updateTableTotalElement();
}


const tableClickHandler = (evtObj) => {

    let cartPopUpElement =  document.querySelector('.cart-popup');
    cartPopUpElement.style.display="block";
    let clickedElement = evtObj.target;
    console.log(clickedElement);
    let tableNameElement = clickedElement.querySelector('h3');
    console.log(tableNameElement)
    evtObj.target.style.background="orange"
    
    let workingIndex = tableNameElement.innerText.match(/\d+/)[0] - 1; //extract tablenumber and subtract 1 to get its index
    workingTableNumber = workingIndex+1;
    let targetTable = allTables[workingIndex];
    console.log('working index is:'+workingIndex);
    console.log(targetTable);

    document.querySelector('#cart-header-table-number').innerText = (workingIndex+1).toString();
    let cartPlaceHolderElement = document.querySelector('#empty-cart-placeHolder');
    let cartBillContainerElement = document.querySelector('.cart-bill-container');
    let totalBillAmountElement = document.querySelector('.cart-bill-total span');

    if(targetTable.tableCartList.length!=0){
        cartPopUpElement.querySelector('.cart-container').style.height="75%";
        console.log(cartPlaceHolderElement);
        cartPlaceHolderElement.style.display="none";
        cartBillContainerElement.style.display="flex";
        
        /*creating a cart element*/
        for(let i=0;i<targetTable.tableCartList.length;i++){
            let cartBillItem = document.createElement('section');
            cartBillItem.classList.add('cart-bill-item');

            let sNoElement = document.createElement('div');
            sNoElement.append(document.createElement('span').innerText=`${i+1}`);
            sNoElement.classList.add('sno');

            let foodTitleElement = document.createElement('div');
            let dishName = targetTable.tableCartList[i].foodTitle;
            foodTitleElement.append(document.
                        createElement('span').innerText=`${dishName}`);
            foodTitleElement.classList.add('cart-food-title');

            let foodPriceElement = document.createElement('div');
            let dishPrice = targetTable.tableCartList[i].foodPrice;
            foodPriceElement.append(document.
                        createElement('span').innerText=`${dishPrice}`);
            foodPriceElement.classList.add('cart-food-price');

            let foodServingsElement = document.createElement('div');
            let dishServings = targetTable.tableCartList[i].foodServings;
            /* foodServingsElement.append(document.
                        createElement('span').innerText=`${dishServings}`) */;
            let inputNumberFieldElement = document.createElement('input');
            inputNumberFieldElement.setAttribute('type','number');
            inputNumberFieldElement.setAttribute('value',`${dishServings}`)
            inputNumberFieldElement.setAttribute('min','1');

            inputNumberFieldElement.classList.add('servings-field');
            inputNumberFieldElement.addEventListener('input',
                servingsChangeHandler)
            foodServingsElement.classList.add('cart-food-servings')

            foodServingsElement.append(inputNumberFieldElement);
            

         /* <input type="number" id="numberOfServings" value="${z[1]}"
                min="1"/> */
                // <i class="fas fa-trash"></i>
                
            /* let deleteIconElement = document.createElement('div');
            deleteIconElement.append(document.
                        createElement('span').innerText='DEL'); */

            let deleteIconElement = document.createElement('i');
            deleteIconElement.classList.add('cart-item-delete');
            deleteIconElement.classList.add('glyphicon');
            deleteIconElement.classList.add('glyphicon-trash');
            deleteIconElement.addEventListener('click',deleteItemHandler,false);
                

            cartBillItem.append(sNoElement,foodTitleElement,
                            foodPriceElement,foodServingsElement,
                            deleteIconElement);
            cartBillItem.classList.add('cart-bill-item');

            cartBillContainerElement.append(cartBillItem);
        }
    }else{ 
      
       cartPopUpElement.querySelector('.cart-container').style.height="25%";
       cartPlaceHolderElement.style.display="block";
       cartBillContainerElement.style.display="none";
       //document.querySelector('.cart-body ').style.border="none";
       console.log(cartPopUpElement);
    }
    console.log(allTables)
    updateTableTotalElement();
    showBillFooterElement();
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

const cartCloseButtonHanlder = (evtObj) => {
    let cartPopUpElement =  document.querySelector('.cart-popup');
    cartPopUpElement.style.display="none";
    let tableLiElements = document.querySelectorAll('.tables-container ul li');
    console.log(tableLiElements)
    tableLiElements.forEach(liItem => {
        if(liItem.style.background==="orange"){
            liItem.style.background="";
            console.log("changed!!!!!!!!!!")
        }
    })
    console.log('evtObj target is =====>>')
    console.log(evtObj.target);

    let allCartFoodItems = document.querySelectorAll('.cart-bill-item');
    console.log('following will be removed ===>')
    allCartFoodItems.forEach(foodItem => {
        console.log(foodItem);
        foodItem.remove();
    })

}

let cartCloseButton = document.querySelector('#cart-header-close-btn');
cartCloseButton.addEventListener('click',cartCloseButtonHanlder);



  

