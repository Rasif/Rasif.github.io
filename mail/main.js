$('.myform').submit(function () {
	console.log(' i am here ');

	var th = $(this);

	$.ajax({
		type: 'POST',
		url: 'mail.php',
		data: th.serialize()
	}).done(function () {
		console.log('good');
	});

	return false;
});
