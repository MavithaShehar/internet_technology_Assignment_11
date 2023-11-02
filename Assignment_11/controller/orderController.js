import {OrdersModel} from "../model/ordersModel.js"
import {customer_db} from "../db/db.js";
import {items_db} from "../db/db.js";
import {orders_db} from "../db/db.js"
import {ItemModel} from "../model/itemModel.js";


function getLastCustomerId(customer_db) {
    const lastIndex = customer_db.length - 1;
    if (lastIndex >= 0) {
        return customer_db[lastIndex].customer_id;
    } else {
        return null; // Or you can return a default value or handle it differently
    }
}

// Example usage:

const lastCustomerId = getLastCustomerId(customer_db);

if (lastCustomerId !== null) {
    console.log("Last Customer ID:", lastCustomerId);
} else {
    console.log("The array is empty. There are no customer IDs.");
}


// date pick
const loadDate = () => {

    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const nowDate = yyyy + '-' + mm + '-' + dd;

    console.log(nowDate);
    document.getElementById("datePicker").defaultValue = nowDate;


    // var now = new Date();
    //
    // var day = ("0" + now.getDate()).slice(-2);
    // var month = ("0" + (now.getMonth() + 1)).slice(-2);
    //
    // var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
    //
    // $('#datePicker').val(today);

}

// generate oder ID
function generateOderId() {
    if (orders_db.length === 0) {
        $("#order_id").val("OD001");
        return;
    }
    let lastId = orders_db[orders_db.length - 1].order_id;
    lastId = lastId.substring(1);

    let newId = Number.parseInt(lastId) + 1 + "";
    newId = newId.padStart(3, "0");

    $("#order_id").val("OD" + newId);
}



// load customers
export const loadCustomers = () => {

    getLastCustomerId(customer_db);
    loadDate();

    $("#customer").empty();
    customer_db.map((customer) => {
        $("#customer").append(`<option value="${customer.customer_id}">${customer.customer_id}</option>`);
    });
};

// load customers for order customer text field
$("#customer").on('change' , ()=> {
    let customerId = $("#customer").val();

    // Find the customer in the customer_db array based on customer_id
    let customer = customer_db.find(customer => customer.customer_id === customerId);

    console.log("customer is: ", customer);

    // Find the index of the customer in the customer_db array
    let cusRowIndex = customer_db.findIndex(customer => customer.customer_id === customerId);

    console.log("customer index is: ", cusRowIndex);

    let customer_id = customer_db[cusRowIndex].customer_id;
    let customer_name = customer_db[cusRowIndex].customer_name;
    let customer_address = customer_db[cusRowIndex].customer_address;
    let customer_mobile = customer_db[cusRowIndex].customer_mobile;

    console.log("01 customer id is: ", customerId);
    console.log("02 customer name is: ", customer_name);
    console.log("03 customer address is: ", customer_address);
    console.log("04 customer mobile is: ", customer_mobile);

    // $('#customer_id').val(customer_id);
    $('#order_customer_name').val(customer_name);
    $('#order_customer_address').val(customer_address);
    $('#order_customer_mobile').val(customer_mobile);

});


// load items
export const loadItems = () => {

    $("#items").empty();
    items_db.map((items) => {
        $("#items").append(`<option value="${items.items_id}">${items.items_id}</option>`);
    });
};

//load customers for order customer text field
$("#items").on('change', () => {
    let itemsId = $("#items").val();

    // Find the items in the items_db array based on items_id
    let items = items_db.find(items => items.items_id === itemsId);

    console.log("items is: ", items);

    // Check if the item exists in the items_db array
    if (items) {
        // If it exists, find the index
        let itmRowIndex = items_db.findIndex(item => item.items_id === itemsId);

        console.log("items index is: ", itmRowIndex);

        //Access properties of the selected item
        let items_id = items.items_id;
        let order_items_name = items.items_name;
        let order_items_qty = items.items_qty;
        let order_items_price = items.items_price;

        console.log("01 items_id is: ", items_id);
        console.log("02 items name is: ", order_items_name);
        console.log("03 items qty is: ", order_items_qty);
        console.log("04 items price is: ", order_items_price);

        // $('#items_id').val(items_id);
        $('#order_items_name').val(order_items_name);
        $('#store_items_qty').val(order_items_qty);
        $('#order_items_price').val(order_items_price);

        // Now, you can use these properties as needed
    } else {
        toastr.error("Item not found in Data Base");
    }
});


// customer place order
// $('#add_items').eq(0).on('click', () => {
//
//     console.log("Hello ADD Items");
//
//         let order_qty = $("#order_qty").val();
//         console.log("Order qty is: ", order_qty);
//
//         let order_items_price = $("#order_items_price").val();
//         console.log("Order items price is: ", order_items_price);
//
//         some();
//         reduce();
//         subTotal();
//
// });
//
//
// //items some
// const some = () =>{
//
//     let order_qty = $("#order_qty").val();
//     let order_items_price =$("#order_items_price").val();
//
//     let some = order_qty * order_items_price;
//     $("#total_label>#total_mount").text(some);
//
//     return some;
//     console.log("*** Total is : ", some);
// };
//
// //items reduce
// const reduce = () => {
//
//     let order_qty = $("#order_qty").val();
//     let store_qty =$("#store_items_qty").val();
//
//   let reduce = store_qty - order_qty ;
//     $('#store_items_qty').val(reduce);
//
// }
//
// const subTotal = () => {
//     let total = some(some);
//     let discount =$("#discount").val();
//
//     console.log("DISCOUNT IS ; ",discount );
//
//     let subTotal = some - (some(discount/100));
//
//     $("#sub_total").text(subTotal);
//
//
//
// };


// Handle "Add Items" button click
$('#add_items').eq(0).on('click', () => {

    const order_id = parseFloat($("#order_id").val());
    const customer = parseFloat($("#customer").val());
    const item = parseFloat($("#item").val());

    $("#discount").val(0);

    if (isNaN(order_id))  {
        toastr.error("Order ID is null or empty.");
        $("#order_id").css("border", "2px solid red");
        return;
    }else {
        $("#order_id").css("border", "");
    }


    // Continue with processing order items
    let order_items_id =  $('#items').val();
    let order_qty = parseFloat($("#order_qty").val());
    let order_items_name = $("#order_items_name").val(); // Assuming it's a string, not a number
    let order_items_price = parseFloat($("#order_items_price").val());
    let store_items_qty = parseFloat($("#store_items_qty").val());


    // Validate order_qty and order_items_price
    if (isNaN(order_qty) ) {
        toastr.error("Invalid input for order quantity or price.");
        return;
    }

    // Check if store_items_qty is available
    if (store_items_qty === 0) {
        toastr.error("This Item is out of Stock.");
        return;
    }

    if (store_items_qty < order_qty) {
        toastr.error("This Item Cunt not in Stock .");
        return;
    }

    // Check if order_qty is greater than 0
    if (order_qty === 0) {
        toastr.error("Please Input the Order Count of This Item.");
        return;
    }

    // Proceed with calculations and updates
    let total = some(order_qty, order_items_price);
    reduce(order_qty);
    dataLabel(total);

    // Create an order instance and push it into orders_db
    lodeDatabase(order_items_id, order_items_name, order_qty, order_items_price, total);


    $('#order_qty').val('');

    loadOrders();

    updateTbl(order_items_id);

});

// calqulate balance
$('#cash, #discount').on('input', () => {

    subTotal();
});

const lodeDatabase = (order_items_id, order_items_name, order_qty, order_items_price, total) => {
    let index = orders_db.findIndex(item => item.items_id === order_items_id);

    if (index !== -1) {
        // Update an existing order if it exists
        orders_db[index].items_qty = order_items_id;
        orders_db[index].items_name = order_items_name;
        orders_db[index].order_qty += order_qty;
        orders_db[index].items_price = order_items_price;
        orders_db[index].order_total += total;
    } else {
        // Create a new order if it doesn't exist
        let order = new OrdersModel(order_items_id, order_items_name, order_qty, order_items_price, total);
        orders_db.push(order);
    }
}

//updateTbl items tabel
const updateTbl = (order_items_id) => {

    let items = order_items_id;

    let order_items_name = $('#order_items_name').val();
    let order_items_price = $('#order_items_price').val();
    let store_items_qty = $('#store_items_qty').val();

    let items_obj = new ItemModel(items, order_items_name, store_items_qty, order_items_price);

    // find item index
    let index = items_db.findIndex(item => item.items_id === items);

    // update item in the db
    items_db[index] = items_obj;

    newloadItems();

}

// Load new items table lode
const newloadItems = () => {
    $('#items-tbl-body').empty();

    items_db.map((item, index) => {
        let tbl_row = `<tr>
                        <td class="items_id">${item.items_id}</td>
                        <td class="items_name">${item.items_name}</td>
                        <td class="items_qty">${item.items_qty}</td>
                        <td class="items_price">${item.items_price}</td>
                        </tr>`;
        $('#items-tbl-body').append(tbl_row);
    });
};


// load order table
const loadOrders = () => {

    console.log("ORDERS IS ", orders_db);


    $('#order-tbl-body').empty();

    orders_db.map((item, index) => {
        let tbl_row = `<tr>
                        <td class="order_itrms_id">${item.items_id}</td>
                        <td class="order_itrms_name">${item.items_name}</td>
                        <td class="order_itrms_qty">${item.order_qty}</td>
                        <td class="order_itrms_price">${item.items_price}</td>
                        <td class="order_itrms_total">${item.order_total}</td>
                         <td class="selection"><button type="button" class="btn btn-danger">Remove</button></i></td>
                        </tr>`;
        $('#order-tbl-body').append(tbl_row);
    });

};



// Calculate total price of items
const some = (order_qty, order_items_price) => {
    let total = order_qty * order_items_price;
    console.log("*** Total is: ", total);
    return total;
};

// Reduce store items quantity
const reduce = (order_qty) => {
    let store_qty = parseFloat($("#store_items_qty").val());

    if (isNaN(store_qty) || isNaN(order_qty)) {
        console.log("Invalid input for store quantity or order quantity.");
        return;
    }

    let reducedQty = store_qty - order_qty;
    $('#store_items_qty').val(reducedQty);
}

// Set total for label
let runningTotal = 0;
const dataLabel = (total) => {
    runningTotal += total;
    $("#total_mount").text(runningTotal);
    $("#sub_total_label #sub_total").text(runningTotal);
    // Update the subtotal with the new total
}

// Calculate subtotal with discount
const subTotal = () => {
    let discount = parseFloat($("#discount").val());
    let cash = parseFloat($("#cash").val());
    let total = $('#total_mount').text();

    let discountedAmount = total * (discount / 100);
    let subTotal = total - discountedAmount;
    let change = cash - subTotal;

    // Update the sub-total label
    $("#sub_total_label #sub_total").text(subTotal);
    $("#balance").val(change);
}

// Click event for the "Purchase" button
$('#purchase').on('click', () => {


});

// delete
$('#order-tbl-body').on('click', '.selection button', function () {
    console.log("click Remove button");
    console.log("click Remove button")

    const orderID = $(this).closest('tr').find('.order_itrms_id').text();
    const indexToRemove = orders_db.findIndex(item => item.items_id === orderID);
    const items_db_index = items_db.findIndex(item => item.items_id === orderID);

    const order_qty = parseFloat(orders_db[indexToRemove].order_qty);
    console.log("Order quantity is:", order_qty);

    const order_total = parseFloat(orders_db[indexToRemove].order_total);
    const old_total = $('#total_mount').text();
    const sub_total_label = $('#sub_total_label').text();

    console.log("Order quantity is:", order_total);

    const stock_qty = parseFloat(items_db[items_db_index].items_qty);
    console.log("Stock quantity is:", stock_qty);

    const new_qty = stock_qty + order_qty;
    console.log("New stock quantity is:", new_qty);

    const new_total = old_total - order_total;
    const new_sub_total = sub_total_label - old_total
    $('#total_mount').text(new_total);
    $("#sub_total_label #sub_total").text(new_total);
    runningTotal -=new_total;

    $('#store_items_qty').val(new_qty) ;
        orders_db.splice(indexToRemove, 1);
        updateTbl(orderID);
        loadOrders();
});

// search orders
$('#order_id').on('input', () => {
    let search_term = $('#order_id').val();


    let results = orders_db.filter((item) =>

        item.items_name.toLowerCase().startsWith(search_term.toLowerCase()) || item.order_qty.toLowerCase().startsWith(search_term.toLowerCase()) || item.items_price.startsWith(search_term)|| item.order_total.startsWith(search_term)
    )
});