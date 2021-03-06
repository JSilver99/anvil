$.ajaxSetup({
    cache: false
});
$(function() { 
	var say_up           = $('#network_link_state').data('up');
	var say_down         = $('#network_link_state').data('down');
	var say_speed_suffix = $('#network_link_speed').data('mbps');
	//console.log('say_up: ['+say_up+'], say_down: ['+say_down+'], say_speed_suffix: ['+say_speed_suffix+']');
	if($("#network_status").length) {
		//alert('network status exists.');
		setInterval(function() {
			$.getJSON('/status/network.json', { get_param: 'value' }, function(data) {
				$.each(data.networks, function(index, element) {
					
					console.log('entry: ['+index+'], name: ['+element.name+'], mac: ['+element.mac+'], link: ['+element.link+'], up order: ['+element.order+']');
					
					var link = say_up;
					if (element.link == 0) {
						link = say_down;
					}
					$("#"+element.name+"_mac").text(element.mac);
					$("#"+element.name+"_link").text(link);
					$("#"+element.name+"_speed").text(element.speed+' '+say_speed_suffix);
					$("#"+element.name+"_order").text(element.order);
				});
			});
		}, 1000);
	}
	else
	{
		//alert('network status strings not loaded.');
	}
	if($("#disk_status").length) {
		//alert('disk status exists.');
		//$("#bar").text('B');
	}
});

$( window ).on( "load", function()
{
	// NOTE: Disabled for now. Clears the URL to remove everything off after '?'.
	//var newURL = location.href.split("?")[0];
	//window.history.pushState('object', document.title, newURL);
})
