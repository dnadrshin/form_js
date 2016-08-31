$(function() {
var poemForm = document.forms['poem'];

var poemName = poemForm.elements.name.value;
var poemEmail = poemForm.elements.email.value;
var poemPhone = poemForm.elements.phone.value;
var poemText = poemForm.elements.poem.value;
var poemApprove = poemForm.elements.approve.checked;

var Poem = {
	Name: poemForm.elements.name,
	Email: poemForm.elements.email,
	Phone: poemForm.elements.phone,
	Text: poemForm.elements.poem,
	Approve: poemForm.elements.approve,
	allFieldFill: false,
	red: "1px solid red",
	onClick: function(){
		if(this.Name.value=="") this.Name.style.border this.red else this.Name.style.border = "0px";
		if(this.Email.value=="") this.Email.style.border = "1px solid red" else this.Email.style.border = "0px";
		if(this.Phone.value=="") this.Phone.style.border = "1px solid red" else this.Phone.style.border = "0px";
	}
}

if (poemForm.addEventListener) {
    poemForm.addEventListener("submit", function(evt) {
        evt.preventDefault();
        window.history.back();
        Poem.onClick();
    }, true);
}
else {
    poemFormt.attachEvent('onsubmit', function(evt){
        evt.preventDefault();
        window.history.back();
        Poem.onClick();
    });
}



});