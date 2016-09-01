$(function() {
	var poemForm = document.forms['poem'];

	var Poem = {
		/**
		 * Object with elements
		 * @type {Object}
		 */
		fields:{
			Name: poemForm.elements.name,
			Email: poemForm.elements.email,
			Phone: poemForm.elements.phone,
			Text: poemForm.elements.poem[0]
		},
		Approve: poemForm.elements.approve,
		approveLable: document.getElementsByClassName('planeta_form_submit')[0].getElementsByTagName('label')[0],
		allFieldFill: false,
		red: "2px solid red",

		/**
		 * Check field and if it not fill made it red
		 * @param  {DOM object} el - checked DOM object
		 * @return {boolean}    is element fill
		 */
		checkField: function(el){
			if(el.value=="") el.style.border = this.red; else el.style.border = "0px";
			return (el.value!="")
		},
		/**
		 * Open popup window and send form data via AJAX
		 */
		sendAJAX: function(){
			$(".poem_popup").fadeIn();
			//$.post( "/test.php", $( "#poemForm" ).serialize() );//uncomment
		},

		onClick: function(){
			this.allFieldFill = true;
			for(el in this.fields){
				this.checkField(this.fields[el]);
				this.allFieldFill = this.allFieldFill&&this.checkField(this.fields[el]);
			}

			if(!this.Approve.checked) this.approveLable.style.color = "red"; else this.approveLable.style.color = "#fff";
			this.allFieldFill = this.allFieldFill&&this.Approve.checked;

			if(this.allFieldFill)this.sendAJAX();

		}
	}

	if (poemForm.addEventListener) {
	    poemForm.addEventListener("submit", function(evt) {
	        evt.preventDefault();
	        Poem.onClick();
	    }, true);
	}
	else {
	    poemFormt.attachEvent('onsubmit', function(evt){
	        evt.preventDefault();
	        Poem.onClick();
	    });
	}

	$(".poem_popup").click(function(){
		$(".poem_popup").fadeOut();
	})

});