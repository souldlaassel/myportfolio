(function(){
    var bossFiller = {
         selector : '.bar',
         counter: true,
    }
    var oo = 0;
   var barOffset = $(bossFiller.selector).offset().top;
   var screen   = $(window).height();
   if(barOffset > screen){
     if(barOffset){
         var scrolling = 0;
        $(window).scroll(function(e){
              scrolling = $(this).scrollTop();
                console.log(scrolling)
                 if(scrolling > barOffset - screen){
                   if(oo < 1){
                       init();
                   } 
                    oo += 10;
                }
        })
     }
   }else{
        init();
       
   }
/*=================================
==================================*/
function init (){
var bar = $(bossFiller.selector);
 if(bar){
      var colorArray = [];
      var targetCounter = [];
      var counterNumber = [];
      var duration = [];
      var height = [];
      var tipTarget = [];
      for(i = 0; i < bar.length; i++){
          colorArray.push(bar[i].dataset.color);
          targetCounter.push(bar[i].dataset.counter);
          if(parseInt(bar[i].dataset.to) >= 0 && parseInt(bar[i].dataset.to) <= 100){
             counterNumber.push(parseInt(bar[i].dataset.to));
          }
          else if(parseInt(bar[i].dataset.to) < 0 && parseInt(bar[i].dataset.to) > 100){
              alert('You can not use data-to less than 0 and grater than 100');
          }
          else{ 
              counterNumber.push(100);
          }
          if(bar[i].dataset.duration){
              duration.push(parseInt(bar[i].dataset.duration))
          }
          else{
              duration.push(2000)
          }
          if(bar[i].dataset.height){
              height.push(parseInt(bar[i].dataset.height));
          }else{
              height.push(5);
          }
        $(bar[i]).css({
              height: height[i],
              background: bar[i].dataset.bgcolor,
              position: 'relative',
          });
         var line = '<div class="bline line-' + i + '"></div>';
         $(bar[i]).prepend(line);
          var bline = $(".bline");
          var tipCounter = '<span class="tip tip-'+ i +'"></span>';
          if(bar[i].dataset.tip == 'false'){
               $(bar[i]).prepend(tipCounter);
          }
          function init(){
              console.log(bar[i])
          }
           var tip = $(".tip");
           tipTarget.push(tip[i]);
          $(bline[i]).css({
              width: 0,
              height: height[i],
              background: colorArray[i],
              'position':'relative',
          })
           $(tip[i]).css({
              height: height[i],
              background: colorArray[i],
              position: 'absolute',
              top: -40,
              left: 0,
              transform: 'translateX(-100%)'
          })
            $(bline[i]).animate({
              width: counterNumber[i] + "%",
            }, duration[i])
            $(tip[i]).animate({
              left: counterNumber[i] + "%",
            }, duration[i])
      }
     /*===================================
                Counter Start
     ====================================*/ 
     if(bossFiller.counter === true){
           var num = {
               x: -1,
           }
         setInterval(function(){
             if(num.x < targetCounter.length - 1){
                 num.x++;
                 displayCounter(targetCounter[num.x], counterNumber[num.x], duration[num.x], tipTarget[num.x]);
             }
         },1)
         function displayCounter(target, countTo, dur, tip){
             var mynum ={
                 x: 0,
             }
             setInterval(function(){
                 if(mynum.x < countTo){
                     mynum.x++;
                     $(target).text(mynum.x);
                     $(tip).text(mynum.x)
                 }
             }, dur/ countTo);
         }
     }
     }
} 
})();