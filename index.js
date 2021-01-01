var selectedPlan;
var counter_vePlan;
var selectedDate;
var orgSelectedMeal=0;

$(document).ready(function(){
    $("#freshly-main-div").steps({
        transitionEffect: "slideLeft",
       
    });
    $('.m-card').click(function(){
        selectedPlan=$(this).attr('data');
        var currDate=new Date();
        var currDay=currDate.getDay();
        if(currDay==0){
            console.log(moment().add(1, 'days').calendar());
            var mainList=document.getElementById('day-list');
            for(let i=0;i<10;i++){
                var li=document.createElement("li");
                if(i==0){
                    li.className="list-group-item day-list-item item-selected";
                }
                else{
                    li.className="list-group-item day-list-item";
                }
                li.addEventListener('click', function(){
                    alert("abc")
                    $(this).siblings().removeClass('item-selected');
                    $(this).addClass('item-selected');
                    $('#selected-date').text($(this).text());
                    console.log($("#selected-date").text());
                    $('#sl-meal-day').text($(this).text());
                    console.log($('#sl-meal-date').text());
                });
                var strong=document.createElement("strong");
                strong.appendChild(document.createTextNode(moment().add(1, 'weeks')
                .add(i, 'days').format("dddd")));
                var span=document.createElement("span");
                span.appendChild(document.createTextNode(moment().add(1, 'weeks')
                .add(i, 'days').format(", MMM D")));
                li.appendChild(strong);
                li.appendChild(span);
                mainList.appendChild(li);
            }
        }
        else{
            console.log(currDay);
            console.log(moment().add(1, 'weeks').subtract((7-(7-currDay)-1), "days").format("MMM Do YY"));
            var mainList=document.getElementById('day-list');
            for(let i=0;i<10;i++){
                var li=document.createElement("li");
                if(i==0){
                    li.className="list-group-item day-list-item item-selected";
                }
                else{
                    li.className="list-group-item day-list-item";
                }
                li.addEventListener('click', function(){
                    $(this).siblings().removeClass('item-selected');
                    $(this).addClass('item-selected');
                    $('#selected-date').text($(this).text());
                    console.log($(this).text());
                    $('#sl-meal-day').text($(this).text());

                });
                var strong=document.createElement("strong");
                strong.appendChild(document.createTextNode(moment().add(1, 'weeks').subtract((7-(7-currDay)-1), "days")
                .add(i, 'days').format("dddd")));
                var span=document.createElement("span");
                span.appendChild(document.createTextNode(moment().add(1, 'weeks').subtract((7-(7-currDay)-1), "days")
                .add(i, 'days').format(", MMM D")));
                li.appendChild(strong);
                li.appendChild(span);
                mainList.appendChild(li);
            }
        }
        console.log(selectedPlan);
        $('#meal-warning').text('Add '+selectedPlan);
        $('#meal-warning-toast').text('Add '+selectedPlan);
        $('#sl-totl-meal').text(orgSelectedMeal);
        $('#totl-meal').text(selectedPlan);
        $('#selected-date').text(moment().add(1, 'weeks').subtract((7-(7-currDay)-1), "days").format("dddd, MMM D"));
        $('#sl-meal-day').text(moment().add(1, 'weeks').subtract((7-(7-currDay)-1), "days").format("dddd, MMM D"));
        $('#next').click();
        counter_vePlan=selectedPlan;
        // window.location.href = "day.html";
    });
    $('#day-next-btn').click(function(){

        $("#next").click();
    });
    $('#meal-next-btn').mouseenter(function(){
        if(orgSelectedMeal!=selectedPlan){
            $(this).css('opacity', 0.4);
            $(this).css('cursor', 'no-drop');
        }
        else{
            $(this).css('opacity', 1);
            $(this).css('cursor', 'pointer');
        }
        
    });
    $('#meal-next-btn').click(function(){
        if(orgSelectedMeal<selectedPlan || orgSelectedMeal>selectedPlan){
            $('.toast').toast('show'); 
        }
        else{
            $('#next').click();
        }
         
    });
    $('.meal-add-btn').click(function(){
        orgSelectedMeal++;
        console.log(orgSelectedMeal);
        counter_vePlan--;
        if(orgSelectedMeal==0){
            $('#empty-cart-label').removeClass('d-none');
            $('#empty-cart-label').addClass('d-block');
        }
        else if(orgSelectedMeal>selectedPlan){
            $('#meal-warning').text('Remove '+(orgSelectedMeal-selectedPlan));
            $('#meal-warning-toast').text('Remove '+(orgSelectedMeal-selectedPlan));
            $('#sl-totl-meal').text(orgSelectedMeal);
        }
        else{
            $('#empty-cart-label').removeClass('d-block');
            $('#empty-cart-label').addClass('d-none');
            $('#meal-warning').text('Add '+(selectedPlan-orgSelectedMeal));
            $('#meal-warning-toast').text('Add '+(selectedPlan-orgSelectedMeal));
            $('#sl-totl-meal').text(orgSelectedMeal);
        }

        var add=document.getElementById("sl-item-list");

        // Main row div
        var mainDiv=document.createElement('div');
        mainDiv.className="row sl-meal mt-1";

        // Image Div
        var imgDiv=document.createElement("div");
        imgDiv.className="col-3";
        // img element
        var img=document.createElement("img");
        img.setAttribute('width','60px');
        img.setAttribute('height','60px');
        img.src=$(this).parentsUntil(".meal-card").find('.card-img').attr('src');
        

        // Append image to its div
        imgDiv.appendChild(img);

        // Product Name Div
        var nameDiv=document.createElement("div");
        nameDiv.className="col-7 pt-3 text-left sl-meal-label";
        var name=document.createTextNode($(this).parentsUntil(".meal-card").find('.meal-card-name').text());

        // Append name to its div
        nameDiv.appendChild(name);

        // Remove Icon Div
        var iconDiv=document.createElement("div");
        iconDiv.className="col-2 pt-3";

        iconDiv.addEventListener('click',function(){
            
            if(orgSelectedMeal>0){
                orgSelectedMeal--;
                console.log(orgSelectedMeal);
                if(orgSelectedMeal==0){
                    $('#empty-cart-label').addClass('d-block');
                    $('#meal-warning').text('Add 0');
                    $('#meal-warning-toast').text('Add 0');
                    $('#sl-totl-meal').text(orgSelectedMeal);
                }
                else if(orgSelectedMeal>selectedPlan){
                    $('#meal-warning').text('Remove '+(orgSelectedMeal-selectedPlan));
                    $('#meal-warning-toast').text('Remove '+(orgSelectedMeal-selectedPlan));
                    $('#sl-totl-meal').text(orgSelectedMeal);
                }
                else{
                    $('#empty-cart-label').removeClass('d-block');
                    $('#empty-cart-label').addClass('d-none');
                    $('#meal-warning').text('Add '+(selectedPlan-orgSelectedMeal));
                    $('#meal-warning-toast').text('Add '+(selectedPlan-orgSelectedMeal));
                    $('#sl-totl-meal').text(orgSelectedMeal);
                }
                
                mainDiv.remove();
                
            }
            
        });

        // Remove Icon element
        var ricon=document.createElement("i");
        ricon.className="fas fa-times cursor-pointer sl-meal-remove";

        // Append Remove icon to its Div
        iconDiv.appendChild(ricon);

        // Append all childrens to main div
        mainDiv.appendChild(imgDiv);
        mainDiv.appendChild(nameDiv);
        mainDiv.appendChild(iconDiv);

        add.appendChild(mainDiv);


        // $('#meal-warning').text(selectedPlan-orgSelectedMeal);
        // $('#meal-warning-toast').text(selectedPlan-orgSelectedMeal);
        
        
        console.log($(this).parentsUntil(".meal-card").find('.meal-card-name').text());
        console.log($(this).parentsUntil(".meal-card").find('.card-img').attr('src'));
    });

    $('#clear-all').click(function(){
        $('.sl-meal').remove();
        orgSelectedMeal=0;
        $('#meal-warning').text('Add '+(selectedPlan));
        $('#meal-warning-toast').text('Add '+(selectedPlan));
        $('#sl-totl-meal').text(orgSelectedMeal);
        $('#empty-cart-label').remove('d-none');
        $('#empty-cart-label').addClass('d-block');
    });
    
});
