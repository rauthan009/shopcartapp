$(()=>{
    
    refreshList()
    
    $("#add").click(()=>{
        $.post('/vendors',{
            name: $('#Name').val()
        },
        (data) => {
            if (data.success) {
                refreshList();
            } else {
              alert('Some error occurred')
            }
          }
    )})
    
})
function refreshList()
    {
        $.get('/vendors',(data)=>{
            $('#Vendor').empty();
            for(let todo of data){
                $('#Vendor').append(
                    `<tr>
                    <td>${todo.name}</td> 
                    <td><button id="delete"  onclick="deleteElement(${todo.id})">Delete</button></td>
                    </tr>`
                    )
            }
        })
    }
    function deleteElement(id)
    {
        $.post(
            'vendors/delete',
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