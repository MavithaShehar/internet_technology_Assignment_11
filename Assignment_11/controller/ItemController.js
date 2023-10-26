import {item_db} from '../DB/db';
import {ItemModel} from '../model/ItemModel';

// clean inputs
const cleanInputs = () => {

    $('#item_id').val('');
    $('#item_name').val('');
    $('#item_qty').val('');
    $('#item_price').val('');

};

// load item
const loadItem = () => {

    $('#item-tbl-body').empty();

    item_db.map((item, index) => {
        let tbl_row = `<tr>
                        <td class="item_id">${item.item_id}</td>
                        <td class="item_name">${item.item_name}</td>
                        <td class="item_qty">${item.item_qty}</td>
                        <td class="item_price">${item.item_price}</td>
                        </tr>`;
        $('#item-tbl-body').append(tbl_row);
    });

};

// Add item
$('#item-btns>button').eq(0).on('click', () => {

    console.log("hello Item");

    let item_id = $('#item_id').val();
    let item_name = $('#item_name').val();
    let item_qty = $('#item_qty').val();
    let item_price = $('#item_price').val();

    let item = new ItemModel(item_id, item_name, item_qty, item_price);
    item_db.push(item);

});

// update item
$("#item-btns-btns").eq(1).on("click", () => {

    let item_id = $('#item_id').val();
    let item_name = $('#item_name').val();
    let item_qty = $('#item_qty').val();
    let item_price = $('#item_price').val();

    let item_obj = new ItemModel(item_id, item_name, item_qty, item_price);

    // find item index
    let index = item_db.findIndex(item => item.item_id === item_id);

    // update item in the db
    customer_db[index] = item_obj;

    // clear();
    $("#item-btns>button").click();

    // load customer data
    loadItem();
})

// delete
$("#item-btns>button").eq(2).on("click", () => {

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

            let item_id = $("#item_id").val();

            // find item index
            let index = item_db.findIndex(item => item.item_id === item_id);

            // remove the item from the db
            item_db.splice(index, 1);

            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )

            $("#item-btns>button").click();

            // load student data
            loadItem();
        }
    })
})

// fill item
$('#item-btns-body').on('click', 'tr' , function() {
    let index = $(this).index();

    let item_id = $(this).find('.item_id').text();
    let item_name= $(this).find('.item_name').text();
    let item_qty = $(this).find('.item_qty').text();
    let item_price = $(this).find('.item_price').text();

    $('#item_id').val(item_id);
    $('#item_name').val(item_name);
    $('#item_qty').val(item_qty);
    $('#item_price').val(item_price);

    console.log("item_id: ", item_id);
});


// serch customer

$('#item-search').on('input', () => {
    let item_search = $('#item-search').val();

    let results = item_db.filter((item) =>

        item.item_name.toLowerCase().startsWith(search_term.toLowerCase()) ||
        item.item_id.toLowerCase().startsWith(search_term.toLowerCase())

    );

    console.log(results);

    $('#item-tbl-body').empty();
    results.map((item, index) => {
        let tbl_row = `<tr>
                        <td class="item_id">${item.item_id}</td>
                        <td class="item_name">${item.item_name}</td>
                        <td class="item_qty">${item.item_qty}</td>
                        <td class="item_price">${item.item_price}</td></tr>`;
        $('#item-tbl-body').append(tbl_row);
    });

});
