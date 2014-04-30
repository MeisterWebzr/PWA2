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
	==================================== LOGIN 
	===============================================
	*/

var projects 

	$('#signinButton').click(function(e){
        e.preventDefault();
		var user = $('#user').val();
		var pass = $('#pass').val();
		$.ajax({

			url: 'xhr/login.php',
			type: 'POST',
			dataType: 'json',
			data: {

				username: user,

				password: pass

			},

			success: function(response){

				if (response.error){
					
					 alert(response.error);

				}else{

				alert('HELLO' + " " + user);
				window.location.assign("addworkouts.html");
				};

			}

		});

	 });
    
   
/*
	===============================================
	========================= Registration Page
	*/


	$('#register').on('click', function () {
    var firstname = $('#first').val(),
        lastname = $('#last').val(),
        user = $('#userName').val(),
        email = $('#email').val(),
        pass = $('#password').val();

    console.log("Name: " + firstname + " " + lastname);
    console.log("Username: " + " " + user); 
    console.log("Password: " + " " + pass); 
    console.log("Email: " + " " + email);

    $.ajax({

        url: 'xhr/register.php',
        type: 'post',
        dataType: 'json',

        data: {

            firstname: firstname,
            lastname: lastname,
            username: user,
            email: email,
            password: pass
        },


        success: function (response) {

            if (response.error) {
                alert(response.error);

	            } else {
	            alert("Hello" + " " + user);
                window.location.assign('projects.html');
            }

        }
    });
});


	// 	============================================
	//	Go to add projects page


	$('#workoutsbtn').on('click', function(e){

		e.preventDefault();
		window.location.assign('addworkouts.html');

	});


	//==============================================
	//register button


	$('#register').on('click', function(e){

		e.preventDefault();
		window.location.assign('projects.html');

	});

	//==============================================
	//dashboard button


	$('#projects').on('click', function(e){

		
		window.location.assign('projects.html');

	});




	/*
	===============================================
	========================= Workout ADD/ R
	*/
	
	
	$('#addButton').on('click', function(e){

		e.preventDefault();
		var projName = $('#projectName').val(),
		    projDesc = $('#projectDescription').val(),
		    projDue = $('#projectDueDate').val(),
		    status = $('#projectStatus').val();

		$.ajax({

			url: "xhr/new_project.php",
			type: "POST",
			dataType: "json",
			data: {

				projectName: projName,
				projectDescription: projDesc,
				dueDate: projDue,
				status: status
			},

			success: function(response){
				
			
				if(response.error){
					
					alert(response.error);
				
				}else{
					 
					alert('Testing for success');
					window.location.assign("projects.html");
			    }
			}	
		});
	});
	
	




	/*	
	==================================== GET PROJECTS
	===============================================
	*/
	 var projects = function(){

	 	$.ajax({

	 		url: 'xhr/get_projects.php',
	 		type: 'get',
	 		dataType: 'json',
	 		success: function(response){

			 		if (response.error) {
			 		  console.log(response.error);
			 		}else{

		 					for (var i = 0, j = response.projects.length; i > j; i++) {
		 					        
		 					        var result = response.projects[i];
									$(".projects_div").append(

										'<div style="border:1px solid black">'+
										"Projects Name: " + result.projName + "<br>" +
										"Projects Description: " + result.projDesc + "<br>" +
										"Projects DueDate: " + result.projDue + "<br>" +
										"Projects Status: " + result.status + "<br>"
										
										+ '<button class="deletebtn">Delete</button>'
										+"</div> <br>"

									);//end .append 	
		 					};//end for increment loop

		 			        $('.deletebtn').on('click', function(e){
		 				            console.log('Test Delete');
		 						    $.ajax({
						 					url:'xhr/delete_project.php',
						 					data:{
						 						projectID: result.projectName
						 					},
						 					type: 'POST',
						 					dataType: 'json',
						 					success: function(response){
						 						alert('Testing for success');
						 						if(response.error){
						 							alert(response.error);
						 						}else{
						 							window.location.assign("projects.html");

						 						};//end if/else

						 					}//end of success  
		 	        
		 	          			    });//end of ajax
					
					        });//end get deletebtn
			
			        };//end of if/else
           
            }//end of success
        
        });//end of Ajax
	
	};//end of projects function

    $("#projectList").bind(projects());
    
    
	/*	
	==================================== LOG OUT
	===============================================
	*/

	$('#logOut').click(function(e){

		e.preventDefault;
		$.get('xhr/logout.php', function(){

			window.location.assign('logout.html')
			console.log("logout function")

		})
	});

	

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




