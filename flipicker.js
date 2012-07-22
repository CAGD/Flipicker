	function initFlipickers()
	{
		$('.flipicker').not('.wrapped').each(function(i){
			var newID = $(this).attr('id') ;
			var d = new Date(parseInt($(this).val())) ;
			
			var newHours = d.getHours() ;
			var newMinutes = d.getMinutes() ;
			var pm = '' ;

			if(newHours>11) { pm = 'pm' ; }
			if(newHours>12) { newHours -=12 ; }
			if(newHours==0) { newHours = 12 ; }
			if(newMinutes<10) { newMinutes = '0' + newMinutes ; }
			$(this).addClass('wrapped').wrap('<div class="flipicker_wrapper" id="' + newID + '_flipicker">') ;
			$('#' + newID + '_flipicker').append('<div class="hours"><a href="#" class="val">' + newHours + '</a><div class="tophalf"><a href="#" class="val">' + newHours + '</a></div><div class="pm">' + pm + '</div></div><div class="minutes"><a href="#" class="val">' + newMinutes + '</a><div class="tophalf"><a href="#" class="val">' + newMinutes + '</a></div></div>') ;
		});
	

		$('.flipicker_wrapper .minutes').click(function(){
			var d = getTimeFromInput($(this));
			d.setMinutes(d.getMinutes()+5) ;
			updateClock($(this), d) ;
			return false ;
		});
		$('.flipicker_wrapper .minutes .tophalf').click(function(){
			var d = getTimeFromInput($(this));
			d.setMinutes(d.getMinutes()-5) ;
			updateClock($(this), d) ;
			return false ;
		});
		$('.flipicker_wrapper .hours').click(function(){
			var d = getTimeFromInput($(this));
			d.setHours(d.getHours()+1) ;
			updateClock($(this), d) ;
			return false ;
		});
		$('.flipicker_wrapper .hours .tophalf').click(function(){
	
			var d = getTimeFromInput($(this));
			d.setHours(d.getHours()-1) ;
			updateClock($(this), d) ;
			return false ;
		});
		
	}
	
	function updateFlipickers()
	{
		$('.flipicker').each(function(i){
			var d = new Date(parseInt($(this).val())) ;
			
			var newHours = d.getHours() ;
			var newMinutes = d.getMinutes() ;
			var pm = '' ;

			if(newHours>11) { pm = 'pm' ; }
			if(newHours>12) { newHours -=12 ; }
			if(newHours==0) { newHours = 12 ; }
			if(newMinutes<10) { newMinutes = '0' + newMinutes ; }
			updateClock($(this), d);
		});
	}
	
	function getTimeFromInput(el)
	{
		var mainHours = el.closest('.flipicker_wrapper').find('.hours') ;
		var mainMinutes = mainHours.closest('.flipicker_wrapper').find('.minutes');
		var hours = mainHours.find('.tophalf');
		var minutes = mainMinutes.find('.tophalf');
		var pm = el.closest('.flipicker_wrapper').find('.hours .pm');
		var d = new Date("January 1, 1970 " + hours.find('.val').text().trim() + ':' + minutes.find('.val').text().trim());
		if(d.getHours()==12) { d.setHours(0);}
		if(pm.text().trim().length>0) { d.setHours(d.getHours()+12); }
		return d ;
	}
	
	function updateClock(el, d)
	{
		var mainHours = el.closest('.flipicker_wrapper').find('.hours') ;
		var mainMinutes = mainHours.closest('.flipicker_wrapper').find('.minutes');
		var hours = mainHours.find('.tophalf');
		var minutes = mainMinutes.find('.tophalf');
		var pm = el.closest('.flipicker_wrapper').find('.hours .pm');
		
		var newHours = d.getHours() ;
		if(newHours>11)
		{
			pm.text('pm') ;
		} else {
			pm.text('');
		}
		if(newHours>12) { newHours -=12 ; }
		if(newHours==0) { newHours = 12 ; }
		
		var newMinutes = d.getMinutes() ;
		if(newMinutes<10) { newMinutes = '0' + newMinutes ; }
		
		mainHours.find('.val').text(newHours);
		hours.find('.val').text(newHours);
		mainMinutes.find('.val').text(newMinutes);
		minutes.find('.val').text(newMinutes);
				
		el.closest('.flipicker_wrapper').find('input').val(d.getTime()).change() ;
	}