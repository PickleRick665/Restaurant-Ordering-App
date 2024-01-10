import menuArray from './data.js'

const menuItemsSection = document.getElementById('menu-items-section')
const orderItems = document.getElementById('order-items')
const orderDetails = document.getElementById('order-details')
const priceContainer = document.getElementById('price-container')
let totalPrice = 0

function getMenuItemsHtml(menuArray){

    const menuItemsHtml = menuArray.map(function(menuItem){
        
        const {
            name,
            ingredients,
            id,
            price,
            emoji 
        } = menuItem 
        
        return `
        <div class="menu-item-block">
            <div class="emojis">${emoji}</div>
            
            <div class="menu-item">
                <h2>${name}</h2>
                <div class="ingredients">${ingredients}</div>
                <div class="boldened">&dollar;${price}</div>
            </div>

            <button id="add-item-${id}" class="add-items-btn">+</button>
        
        </div>
            `
    }).join('')

    return menuItemsHtml
}

menuItemsSection.innerHTML = getMenuItemsHtml(menuArray)

let isHidden = true;
var index = 0

document.addEventListener('click',function(e){

    for(let menuItem of menuArray){
        if(e.target.id === `add-item-${menuItem.id}`){

            if(isHidden){
                orderDetails.classList.toggle('hidden')
                isHidden = false;
            }

            orderItems.innerHTML += `
            <div class="flex-container" id="item-for-checkout-${menuItem.id}-${index}">
                <div class="flex-container-2">
                    <p class="item-order-name">${menuItem.name}</p>
                    <button id="remove-from-checkout-btn" class="remove-from-checkout-btn">remove</button>
                </div>
                <p class="item-order-price">&dollar;${menuItem.price}</p>
            </div>
            `
            totalPrice += menuItem.price
            updateTotalPriceHTML()
            index++
        }
    }

    if(e.target.id === `order-button`){
        document.querySelector('.payment-modal').showModal()
    }

    else if(e.target.id === `remove-from-checkout-btn`){
        const elementToBeRemoved = document.getElementById(e.target.parentElement.parentElement.id)
        elementToBeRemoved.remove();
        console.log(e.target.parentElement.parentElement.id)

        for(let i=0; i<totalPrice; i++){
            if(e.target.parentElement.parentElement.id == `item-for-checkout-0-${i}`){
                totalPrice -= 14;
                updateTotalPriceHTML()
            }

            else if(e.target.parentElement.parentElement.id == `item-for-checkout-1-${i}`){
                totalPrice -= 12;
                updateTotalPriceHTML()
            }

            else if(e.target.parentElement.parentElement.id == `item-for-checkout-2-${i}`){
                totalPrice -= 12;
                updateTotalPriceHTML()
            }
        }
    }

    else if(e.target.id === `pay-button`){
        
        const customerName = document.getElementById('customer-name').value
        orderDetails.innerHTML = `
        <div class="order-recieved-message">
            <p>Thanks ${customerName}! Your order is on the way</p>
        </div>
        `
    }
})

function updateTotalPriceHTML(){

    priceContainer.innerHTML =`
        <div class="flex-container">
            <p class="item-order-name">Total Price:</p>
            <p class="item-order-price">&dollar;${totalPrice}</p>
        </div>
    `

    if(totalPrice <= 0){
        orderDetails.classList.toggle('hidden')
        isHidden=true
        index=0
    }
}
