$(".remove").click(function(){
    element = $(this).stairUp({level:1});
    id= element.attr("myid");
    console.log("remove clikced",id);
    $.ajax({
        url:thisdomain+"deleteRecord/"+id,
        type:"get"
    })
    .done(function(){
        console.log("success remove",id);
       element.hide();
    })
    .fail(function(err){
        console.log("error remove",id,err);
    });
});