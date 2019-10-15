/*!
 *  jQuery plugin for lab carousel of Faculty WordPress theme
 *  Version   : 1.0
 *  Date      : 2 Oct 2014
 *  Licence   : All rights reserved 
 *  Author    : owwwlab (Ehsan Dalvand & Alireza Jahandideh)
 *  Contact   : owwwlab@gmail.com
 *  Web site  : http://themeforest.net/user/owwwlab
 *  Dependencies: jQuery, CarouFredSel
 */

// Utility
if ( typeof Object.create !== 'function'  ){ // browser dose not support Object.create
    Object.create = function (obj){
        function F(){};
        F.prototype = obj;
        return new F();
    };
};

(function($, window, document, undefined) {
    
    
    var LabCarousel = {
      init: function( options , elem ){

          var self = this; //store a reference to this
          self.$elem = $(elem);
          self.options = $.extend( {}, $.fn.LabCarousel.options, options);

          
          var $carouselContainer = self.$elem.find('.labp-heads-wrap').first();
          var $dummyItems = self.$elem.find('.dummy-lab-item');
          var $car = self.$elem.find('.lab-carousel').first();
          var $contentWrapper = self.$elem.find('.lab-details').first();
          
          $dummyItems.each(function(){
            $(this).children().eq(0).appendTo($car);
            $(this).children().eq(0).appendTo($contentWrapper);
            $(this).remove();
          });

          var useSingleLayout = self.options.useSingleLayout;

          var $labDetailsItems=$contentWrapper.find('div'),
            carItemNum=$car.children().length,
            visibleCount,indexCount;

          var defaultCss = {
            width: 100,
            height: 100,
            marginTop: 50,
            marginRight: 0,
            marginLeft: 0,
            opacity: 0.2
          };
          var selectedCss = {
            width: 150,
            height: 150,
            marginTop: 30,
            marginRight: -25,
            marginLeft: -25,
            opacity: 1
          };
          var aniOpts = {
            queue: false,
            duration: 300,
            //easing: 'cubic'
          };
          if (carItemNum<=3 || useSingleLayout){
            //1 item visible layout
            visibleCount=1;
            indexCount=0;

          }else{
            //Default layout 3 item visible
            visibleCount=3;
            indexCount=1;
          }

          $car.find('img').css('zIndex', 1).css( defaultCss );

          $car.children('div').each(function(i){
            $(this).data('index',i);
          });


          if ($car.length>0){
            $car.carouFredSel({
              circular: true,
              infinite: true,
              width: '100%',
              height: 250,
              items: {
                visible:visibleCount,
                start:0
              },
              prev: self.$elem.find('.prev').first(),
              next: self.$elem.find('.next').first(),
              auto: false,
              swipe : {
                onTouch :true,
                onMouse :true
              },
              scroll: {
                items: 1,
                duration: 300,
                //easing: 'cubic',
                onBefore: function( data ) {
                  var $comming = data.items.visible.eq(indexCount),
                    $going = data.items.old.eq(indexCount),
                    $commingdetail = $labDetailsItems.eq($comming.data('index')),
                    $goingdetail = $labDetailsItems.eq($going.data('index'));


                  $goingdetail.fadeOut(100,function(){
                    $goingdetail.siblings().hide();
                    $commingdetail.fadeIn(300);
                  });
                  

                  $comming.find('img').css('zIndex', 2).animate( selectedCss, aniOpts );
                  $going.find('img').css('zIndex', 1).animate( defaultCss, aniOpts );
                }
              },onCreate:function(data){
                data.items.eq(indexCount).find('img').css('zIndex', 2).animate( selectedCss, aniOpts );
                $labDetailsItems.eq(indexCount).fadeIn();
              }

            });
          }

          $(window).on('newContent',function(){
            self.init();
          });
      }

      
    }

    
    $.fn.LabCarousel = function( options ) {
        return this.each(function(){
            var dCar = Object.create( LabCarousel ); 
            dCar.init( options, this );
        }); 
    };

    $.fn.LabCarousel.options = {
      useSingleLayout   : false 
    };



})(jQuery, window, document);