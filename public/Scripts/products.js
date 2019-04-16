$(()=>{
    
    refreshList()
    
    refreshVendors()
    $("#add").click(()=>{
        $.post('/products',{
            name: $('#name').val(),
            price:$("#price").val(),
            qty: $("#qty").val(),
            vendorId: $("#Vendor").val()
        },
        (data) => {
            if (data.success) {
                $.get('/products',(data)=>{
                    $('#Products').empty();
                    for(let todo of data){
                        $('#Products').append( 
                            `<tr>
                            <td>${todo.name}</td> <td>${todo.price}</td> <td>${todo.qty}</td> <td>${todo.vendor.name}</td><td><input type='submit' value='X' class="btn btn-danger" onclick='deleteElement(${todo.id})'></td>
                            </tr>`
                            )
                    }
                })
            } else {
              alert('Some error occurred')
            }
          }
    )})
    
})
function deleteElement(id)
{
    $.post(
        'products/delete',
        {
            id: id
        },
        (data) => {
            if (data.success) {
                $.get('/products',(data)=>{
                    $('#Products').empty();
                    for(let products of data)
                    {
                        $('#Products').append( 
                `<tr>
                <td>${products.name}</td> <td>${products.price}</td> <td>${products.qty}</td> <td>${products.vendor.name}</td><td><input type='submit' class="btn btn-danger" value='Delete' onclick='deleteElement(${products.id})'></td>
                </tr>`
                )
                    }
                })
            } else {
              alert('Some error occurred')
            }
          }
        )
}
function refreshList()
    {
        $.get('/products',(data)=>{
            $('#Products').empty();
            for(let products of data){
                $('#Products').append( 
                    `<tr>
                    <td>${products.name}</td> <td>${products.price}</td> <td>${products.qty}</td> <td>${products.vendor.name}</td><td><input type='submit' class="btn btn-danger" value='Delete' onclick='deleteElement(${products.id})'></td>
                    </tr>`
                    )
            }
        })
    }
    function refreshVendors()
    {
        $.get('/vendors',(data)=>{
            $('#Vendor').empty();
            for(let vendor of data){
                $('#Vendor').append(`<option value=${vendor.id}>${vendor.name}</option>`)
            }
        })
    }