var selectedPlan;
var counter_vePlan;
var selectedDate;
var orgSelectedMeal=0;
var sl_meals_list=[];

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
            let checkout_day_list=document.getElementById('sl-checkout-date');
            for(let i=0;i<10;i++){
                var li=document.createElement("li");
                let opt=document.createElement("option");
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
                    opt.selected=true;
                });
                var strong=document.createElement("strong");
                strong.appendChild(document.createTextNode(moment().add(1, 'weeks')
                .add(i, 'days').format("dddd")));
                var span=document.createElement("span");
                span.appendChild(document.createTextNode(moment().add(1, 'weeks')
                .add(i, 'days').format(", MMM D")));

                opt.appendChild(document.createTextNode(moment().add(1, 'weeks').subtract((7-(7-currDay)-1), "days")
                .add(i, 'days').format("dddd, MMM D")));
                
                opt.value=moment().add(1, 'weeks').subtract((7-(7-currDay)-1), "days")
                .add(i, 'days').format("dddd, MMM D");

                li.appendChild(strong);
                li.appendChild(span);
                mainList.appendChild(li);
                checkout_day_list.appendChild(opt);
            }
        }
        else{
            console.log(currDay);
            console.log(moment().add(1, 'weeks').subtract((7-(7-currDay)-1), "days").format("MMM Do YY"));
            var mainList=document.getElementById('day-list');
            let checkout_day_list=document.getElementById('sl-checkout-date');
            for(let i=0;i<10;i++){
                var li=document.createElement("li");
                let opt=document.createElement("option");
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
                    opt.selected=true;

                });
                var strong=document.createElement("strong");
                strong.appendChild(document.createTextNode(moment().add(1, 'weeks').subtract((7-(7-currDay)-1), "days")
                .add(i, 'days').format("dddd")));
                var span=document.createElement("span");
                span.appendChild(document.createTextNode(moment().add(1, 'weeks').subtract((7-(7-currDay)-1), "days")
                .add(i, 'days').format(", MMM D")));

                opt.appendChild(document.createTextNode(moment().add(1, 'weeks').subtract((7-(7-currDay)-1), "days")
                .add(i, 'days').format("dddd, MMM D")));

                opt.value=moment().add(1, 'weeks').subtract((7-(7-currDay)-1), "days")
                .add(i, 'days').format("dddd, MMM D");

                li.appendChild(strong);
                li.appendChild(span);
                mainList.appendChild(li);
                checkout_day_list.appendChild(opt);
            }
        }
        console.log(selectedPlan);
        $('#meal-warning').text('Add '+selectedPlan);
        $('#meal-warning-toast').text('Add '+selectedPlan);
        $('#sl-totl-meal').text(orgSelectedMeal);
        $('#totl-meal').text(selectedPlan);
        $('#total-meal-checkout').text(selectedPlan);
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
            var checkout_meals=document.getElementsByClassName('sl-checkout-meal')
            for(let i=0;i<sl_meals_list.length;i++){
                let temp=document.getElementsByClassName('checkout-sl-meal')[0];
                temp.content.getElementById('sl-meal-qty').innerHTML=sl_meals_list[i]['count'];
                temp.content.getElementById('temp-checkout-img').src=sl_meals_list[i]['img'];
                temp.content.getElementById('temp-checkout-name').innerHTML=sl_meals_list[i]['name'];
                temp.content.getElementById('temp-checkout-desc').innerHTML=sl_meals_list[i]['desc'];

                let clon = temp.content.cloneNode(true);
                console.log(clon);
                document.getElementById('sl-checkout-meal').appendChild(clon);
            }
            $('#next').click();
        }
         
    });
    $('.meal-add-btn').click(function(){
        orgSelectedMeal++;
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
        let prod_id=$(this).parents(".meal-card").attr('id');
        console.log("id->"+prod_id);
        let product_added=false;
        for(let i=0;i<sl_meals_list.length;i++){
            if(sl_meals_list[i]["id"]==prod_id){
                sl_meals_list[i]["count"]++;
                product_added=true;
            }
        }

        if(!product_added){
            sl_meals_list.push({
                'id':prod_id,
                'img':$(this).parentsUntil(".meal-card").find('.card-img').attr('src'),
                'name':$(this).parentsUntil(".meal-card").find('.meal-card-name').text(),
                'desc':$(this).parentsUntil('.meal-card').find('.meal-card-desc').text(),
                'count':1
            });
        }
        

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
                    $('#meal-warning').text('Add '+selectedPlan);
                    $('#meal-warning-toast').text('Add '+selectedPlan);
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
                
                let prod_flag=false;
                // let prod_id=$(this).parents(".meal-card").attr('id');
                for(let i=0;i<sl_meals_list.length;i++){
                    if(sl_meals_list[i]["id"]==prod_id){
                        if(sl_meals_list[i]["count"]>1){
                            --sl_meals_list[i]["count"];
                            console.log(sl_meals_list[i]);
                        }
                        else{
                            console.log(sl_meals_list[i]);
                            sl_meals_list.splice(i, 1);
                        }
                        break;
                    }
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
