$(()=>{
    refreshList();
    $("#login").click(()=>{
        $.post('/shopping',
        {
            username: $("#name").val(),
            email: $("#email").val()
        },
        (data)=>
        {
            sessionStorage.setItem("userid",data.id);
            alert(`Welcome user: ${data.username}`);
            refreshList()
        })
    })
})
function refreshList(){
    $.post(
        '/cart',
        {
            userId: sessionStorage.getItem("userid")
        },
        (data)=>{
            var sum=0;
            $('#Products').empty();
            for(let todo of data){
                var price=parseInt(todo.product.price);
                var qty=parseInt(todo.qty);
                sum+=(price*qty);
                $('#Products').append( 
                    `<tr>
                    <td>${todo.product.name}</td> <td>${todo.product.price}</td> <td>${todo.qty}</td> <td>${todo.product.vendor.name}</td><td><input type='submit' value='X' onclick='deleteElement(${todo.id})'></td>
                    </tr>`
                    )
            }
            $('#Products').append(
                `<tr>
                <td><h3>Total:</h3></td><td> </td><td> </td><td> </td><td>${sum}</td>
                </tr>`
            )
        })
}
function deleteElement(id)
{
    $.post(
        'cart/delete',
        {
            id: id
        },
        (data) => {
            if (data.success) {
                refreshList();
            } else {
              alert('Some error occurred')
            }
          }
        )
}
