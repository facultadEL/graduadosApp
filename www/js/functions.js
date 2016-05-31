/* Noty
Hay que agregar esto al html
<script src="js/noty/packaged/jquery.noty.packaged.min.js"></script>
<script src="js/noty/themes/bootstrap.js"></script>

Se usa así
showNoty('success','Este va a ser el mensaje que se muestre');
*/

function showNoty(type,text)
{
	var bgClass;
	switch(type)
	{
		case 'danger':
			bgClass = 'bg-danger';
			break;
		case 'warning':
			bgClass = 'bg-warning';
			break;
		case 'success':
			bgClass = 'bg-success';
			break;
		default:
			bgClass = 'bg-info';
			break;
	}

	var n = noty({
		text: text,
		type: type,
		theme: 'defaultTheme', // or 'relax'
		template: '<div class="noty_message '+bgClass+'"><span class="glyphicon glyphicon-warning-sign" style="color: white" aria-hidden="true"></span><b><span class="noty_text"></span><div class="noty_close"></b></div></div>',
		animation: {
			open: 'animated pulse', // Animate.css class names
			close: 'animated bounceOutLeft', // Animate.css class names
			easing: 'swing', // easing
			speed: 500 // opening & closing animation speed
		},
		timeout: 3000,
	});
}

function toasty(text,style)
{
	style = style.toLowerCase();
	var bgColor,fColor;
	switch(style)
	{
		case 'error':
			bgColor = '#f44336';
			color = 'black';
			break;
		case 'success':
			bgColor = 'green';
			color = 'white';
			break;
		default:
			 bgColor = 'black';
			 color = 'white';
			 break;
	}

	var $toastContent = $(`<span>${text}</span>`);
	Materialize.toast($toastContent, 1000);
	$('.toast').css('background-color',bgColor);
	$('.toast').css('color',color);
	$('#toast-container').css('top','auto');
	$('#toast-container').css('right','auto');
	$('#toast-container').css('bottom','50%');
}

var storage = window.localStorage;
var excludedLoc = ['index','registro','restaurarPass'];

function getLoc()
{
	return window.location.pathname.split('/')[(window.location.pathname.split('/')).length - 1].split('.')[0];
}

function checkId()
{
	if(excludedLoc.indexOf(getLoc()) == -1)
	{
		if(getItem('id') == undefined)
		{
			logout();
		}
	}
}
checkId();

function checkAdministrador()
{
	if(getItem('administrador') == 't')
	{
		return true;
	}
	else
	{
		return false;	
	}
}

//Trae la cantidad de graduados a la espera de ser habilitados
function setCantidad()
{
	var cant = getItem('cantidad');
	if(parseInt(cant) > 0)
	{
		$('.cantGraduados').html(cant);
	}
	else
	{
		$('.cantGraduados').hide();
	}
}

function initializeCantidad(cant)
{
	setItem('cantidad',cant);
	setCantidad();
}

function getItem(item)
{
	return storage.getItem(item);
}

function removeItem(item)
{
	storage.removeItem(item);
}

function setItem(item,val)
{
	storage.setItem(item,val);
}

function logout()
{
	removeItem('id');
	removeItem('administrador');
	removeItem('cantidad');
	setItem('logout','t');
	window.location.href = 'index.html';
}

function checkMenu()
{
	if(excludedLoc.indexOf(getLoc()) != -1) return;
	var cH,pH,eH,dH;
	if(checkAdministrador())
	{
		cH = 'cursosAdmin.html';
		pH = 'posgradosAdmin.html';
		eH = 'empleoAdmin.html';
		dH = 'descuentosAdmin.html';
		$('.hideNotAdmin').show();
		successGetCantGraduados();
	}
	else
	{
		cH = 'cursos.html';
		pH = 'posgrados.html';
		eH = 'empleo.html';
		dH = 'descuentos.html';
		$('.hideNotAdmin').hide();
	}
	
	$('.cursosHref').prop('href',cH);
	$('.posgradosHref').prop('href',pH);
	$('.empleoHref').prop('href',eH);
	$('.descuentosHref').prop('href',dH);
}

function successGetCantGraduados()
{
	var cant = getItem('cantidad');
	if(cant == null) return;
		
	if(parseInt(cant) > 0)
	{
		$('.cantGraduados').show();
		$('.cantGraduados').html(cant);
	}
	else
	{
		$('.cantGraduados').hide();
	}
}

function controlVacio(nombreSelector)
{
	if($.trim($(nombreSelector).val()) == '')
	{
		$(nombreSelector).css('box-shadow','0px 0px 1px 1px #f24d4d');
		$(nombreSelector).focus();
		return false;
	}
	return true;
}

function sacarColor(me)
{
	$(me).css('box-shadow','0px 0px 0px 0px #ccc');
}

function loadNav()
{
	$("#nav").load("menu.html"); 
}

function getCard(cT,cC)
{
	return `<div class="row"><div class="col s12">
			<div class="card blue-grey darken-1">
			<div class="card-content white-text">
			<span class="card-title">${cT}</span>
			<p class="center-align">${cC}</p>
			</div></div></div></div>`;
}

function controlBack()
{
	if(getItem('back') == 't')
	{
		removeItem('back');
		history.back()
	};
	
	window.onload = function () {
		var loc = getLoc();
		if (typeof history.pushState === "function") {
			history.pushState("jibberish", null, null);
			window.onpopstate = function () {
				if(loc == 'inicio' || loc == 'index')
				{
					try
					{
					(navigator.app && navigator.app.exitApp()) || (device && device.exitApp());
					}
					catch(err)
					{
						setItem('back','t');
						var next = (history.length - 2) * -1;
						history.go(next);
					}
				}
				else
				{
					if(loc != "registrar" || loc != "restaurarPass")
					{
						window.location.href = "inicio.html";
					}
				}
			};
		}
		else {
			var ignoreHashChange = true;
			window.onhashchange = function () {
				if(loc == 'inicio' || loc == 'index')
				{
					try
					{
					(navigator.app && navigator.app.exitApp()) || (device && device.exitApp());
					}
					catch(err)
					{
						setItem('back','t');
						var next = (history.length - 1) * -1;
						history.go(next);
					}
				}
				else
				{
					if(loc != "registrar" || loc != "restaurarPass")
					{
						window.location.href = "inicio.html";
					}	
				}
			};
		}
	}
}

function parse(json)
{
	return JSON.parse(json);
}

function checkSelectedOption()
{
	var options = {
		'cursos':'liCurso',
		'cursosAdmin':'liCurso',
		'descuentos':'liDescuento',
		'descuentosAdmin':'liDescuento',
		'empleo':'liEmpleo',
		'empleoAdmin':'liEmpleo',
		'graduadosAdmin':'liGraduado',
		'perfil':'liPerfil',
		'posgrados':'liPosgrado',
		'posgradosAdmin':'liPosgrado'
	};
	var l = getLoc();
	var name = `.${options[l]}`;
	$(name).addClass('selectedOption');
}
/*
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener("backbutton", function (e){
        e.preventDefault();
		alert('VOY A SALIR'); 
		(navigator.app && navigator.app.exitApp()) || (device && device.exitApp()); 
    }, false);
}, false);

function onDeviceReady(){
	alert('READY');
    document.addEventListener("backbutton", function(e){
       alert('Acá si entro');
    }, false);
}

document.addEventListener("deviceready", onDeviceReady, false);
*/
/*
$(function()
{
    var rx = /INPUT|SELECT|TEXTAREA/i;
	alert('Entro control');
    $(document).bind("keydown keypress", function(e){
		alert(e.which);
        if( e.which == 8 ){ // 8 == backspace
            if(!rx.test(e.target.tagName) || e.target.disabled || e.target.readOnly ){
                alert('Ba');
            }
        }
    });
});
*/
//document.addEventListener("deviceready", onDeviceReady, false);
//document.addEventListener("DOMContentLoaded", controlBack, false);
document.addEventListener("DOMContentLoaded", checkMenu, false);
document.addEventListener("DOMContentLoaded", checkSelectedOption, false);