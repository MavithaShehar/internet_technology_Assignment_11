import {ItemModel} from "../model/itemModel.js";
import {items_db} from "../db/db.js";

// clean inputs
const cleanInputs = () => {

    $('#items_id').val('');
    $('#items_name').val('');
    $('#items_qty').val('');
    $('#items_price').val('');

};

// load item
const loadItems = () => {

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

// Add item
$('#items-btns>button').eq(0).on('click', () => {

    console.log("hello Item");

    let items_id = $('#items_id').val();
    let items_name = $('#items_name').val();
    let items_qty = $('#items_qty').val();
    let items_price = $('#items_price').val();

    let items = new ItemModel(items_id, items_name, items_qty, items_price);
    items_db.push(items);
    console.log("hello Item 02 ");

    cleanInputs();
    loadItems(); // call load customer function
});

// update item
$("#items-btns-btns").eq(1).on("click", () => {

    let items_id = $('#items_id').val();
    let items_name = $('#items_name').val();
    let items_qty = $('#items_qty').val();
    let items_price = $('#items_price').val();

    let items_obj = new ItemModel(items_id, items_name, items_qty, items_price);

    // find item index
    let index = items_db.findIndex(item => item.items_id === items_id);

    // update item in the db
    items_db[index] = items_obj;

    // clear();
    $("#items-btns>button").click();

    // load customer data
    loadItems();
})

// delete
$("#items-btns>button").eq(2).on("click", () => {

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete this!'
    }).then((result) => {
        if (result.isConfirmed) {

            let items_id = $("#items_id").val();

            // find item index
            let index = items_db.findIndex(item => item.items_id === items_id);

            // remove the item from the db
            item_db.splice(index, 1);

            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )

            $("#items-btns>button").click();

            // load student data
            loadItems();
        }
    })
})

// fill item
$('#item-btns-body').on('click', 'tr' , function() {
    let index = $(this).index();

    let items_id = $(this).find('.items_id').text();
    let items_name= $(this).find('.items_name').text();
    let items_qty = $(this).find('.items_qty').text();
    let items_price = $(this).find('.items_price').text();

    $('#items_id').val(items_id);
    $('#items_name').val(items_name);
    $('#items_qty').val(items_qty);
    $('#items_price').val(items_price);

    console.log("items_id: ", items_id);
});


// serch customer

$('#items-search').on('input', () => {
    let items_search = $('#items-search').val();

    let results = items_db.filter((item) =>

        item.items_name.toLowerCase().startsWith(search_term.toLowerCase()) ||
        item.items_id.toLowerCase().startsWith(search_term.toLowerCase())

    );

    console.log(results);

    $('#items-tbl-body').empty();
    results.map((item, index) => {
        let tbl_row = `<tr>
                        <td class="items_id">${item.items_id}</td>
                        <td class="items_name">${item.items_name}</td>
                        <td class="items_qty">${item.items_qty}</td>
                        <td class="items_price">${item.items_price}</td></tr>`;
        $('#items-tbl-body').append(tbl_row);
    });

});
