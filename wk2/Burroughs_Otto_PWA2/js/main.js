/*  
	Fitness Management
	Author: Otto "Meister" Burroughs
*/

(function($){
	
	/*
	===============================================
	=========================== APPLICATION GLOBALS	
	*/
	
	var win = $(window),
		body = $(document.body),
		container = $('#container'),	// the only element in index.html
		currentUser = {}
	;
	
	
	/*
	===============================================
	========================= APPLICATION FUNCTIONS	
	*/
	
	
	var checkLoginState = function(){
		$.ajax({
			url: 'xhr/check_login.php',
			type: 'get',
			dataType: 'json',
			success: function(response){
				// if user, loadApp()
				// if error, loadLanding()
			}
		});
	};

	/*
	===============================================
	========================= WELCOME PAGE TEXT ANIMATION	
	*/


	$(".tagline").html();
	/*$(".tagline").text("Laurie was here!");*/
	var $main = $(".tagline p");
	$main.text("Fitness Management").animate({fontSize: 40}, 1000);



	/*
	===============================================
	========================= NAVIGATION ANIMATION	
	*/

	$(function() {
	 $('#sdt_menu > li').bind('mouseenter',function(){
	  var $elem = $(this);
	  $elem.find('img')
	    .stop(true)
	    .animate({
	    'width':'170px',
	    'height':'170px',
	    'left':'0px'
	    },400,'easeOutBack')
	    .andSelf()
	    .find('.sdt_wrap')
	    .stop(true)
	    .animate({'top':'140px'},500,'easeOutBack')
	    .andSelf()
	    .find('.sdt_active')
	    .stop(true)
	    .animate({'height':'170px'},300,function(){
	   var $sub_menu = $elem.find('.sdt_box');
	   if($sub_menu.length){
	    var left = '170px';
	    if($elem.parent().children().length == $elem.index()+1)
	     left = '-170px';
	    $sub_menu.show().animate({'left':left},200);
	   }
	  });
	 }).bind('mouseleave',function(){
	  var $elem = $(this);
	  var $sub_menu = $elem.find('.sdt_box');
	  if($sub_menu.length)
	   $sub_menu.hide().css('left','0px');
	 
	  $elem.find('.sdt_active')
	    .stop(true)
	    .animate({'height':'0px'},300)
	    .andSelf().find('img')
	    .stop(true)
	    .animate({
	    'width':'0px',
	    'height':'0px',
	    'left':'85px'},400)
	    .andSelf()
	    .find('.sdt_wrap')
	    .stop(true)
	    .animate({'top':'25px'},500);
	 });
});




	/*
	===============================================
	========================= ADMIN PAGE Interface
	*/

	

	// 	============================================
	//	SETUP FOR INIT
		
	var init = function(){
	
		checkLoginState();
	};
	
	/*testing commint to wk2*/
	/*
	*
	*there was an error in committing to branch 2 which is wk2 somehow all commmits for week to were sent 
	* to wk1
	*/





	init();
	
		
	/*
	===============================================
	======================================== EVENTS	
	*/
	
	win.on('submit', '#user-reg-form', function(){
		
		return false;
	});
	
	/*	
	==================================== END EVENTS 
	===============================================
	*/

		
		

	
})(jQuery); // end private scope




