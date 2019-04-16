
$(()=>{
    $("#login").click(()=>{
        $.post('/shopping',
        {
            username: $("#name").val(),
            email: $("#email").val()
        },
        (data)=>
        {
            sessionStorage.setItem("userid",data.id);
            refreshList()
        })
    })
    
})
function refreshList()
    {
        $.get('/products',(data)=>{
            $('#Products').empty();
            for(let todo of data){
                $('#Products').append( 
                    `<tr>
                    <td>${todo.name}</td> <td>${todo.price}</td> <td>${todo.qty}</td> <td>${todo.vendor.name}</td><td><input type='submit' class="btn btn-success" value='+' onclick='AddElement(${todo.id})'></td>
                    </tr>`
                    )
            }
        })
    }
    function AddElement(productId)
    {
        
        $.post(
            'cart/add',
            {
                userId:sessionStorage.getItem("userid"),
                productId: productId
            },
            (data) => {
                if (data.success) {
                    alert("Product added to cart");
                      
                } else {
                  alert('Some error occurred')
                }
              }
            )
    }