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
	if(style == undefined) style='default';
	if(text == undefined) return;
	
	style = style.toLowerCase();
	var bgColor,fColor;
	switch(style)
	{
		case 'error':
			bgColor = '#f44336';
			color = 'black';
			break;
		case 'success':
			bgColor = '#388e3c';
			color = 'white';
			break;
		case 'sahara':
			bgColor = '#fb8c00';
			color = 'white';
			break;
		case 'prince':
			bgColor = '#5e35b1';
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
var excludedLoc = ['index','registro','restauraPass'];
var notified = false;

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

function setCantidad()
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
	window.location.replace('index.html');
}

function notifyCant()
{
	var cant = getItem('cantidad');
	if(cant != undefined && cant > 0 && getLoc() == 'inicio' &&  !notified)
	{
		notified = true;
		toasty(`Tiene ${cant} graduados por activar`,'sahara');
	}
}

function checkMenu()
{
	if(excludedLoc.indexOf(getLoc()) != -1) return;
	var cH,pH,eH,dH;
	var pfH = 'perfil.html';
	var iH = 'inicio.html';
	var gH = 'graduadosAdmin.html';
	if(checkAdministrador())
	{
		cH = 'cursosAdmin.html';
		pH = 'posgradosAdmin.html';
		eH = 'empleoAdmin.html';
		dH = 'descuentosAdmin.html';
		$('.hideNotAdmin').show();
		setCantidad();
		notifyCant();
	}
	else
	{
		cH = 'cursos.html';
		pH = 'posgrados.html';
		eH = 'empleo.html';
		dH = 'descuentos.html';
		$('.hideNotAdmin').hide();
	}
	
	addClick('cursosHref',cH);
	addClick('posgradosHref',pH);
	addClick('empleoHref',eH);
	addClick('descuentosHref',dH);
	addClick('perfilHref',pfH);
	addClick('inicioHref',iH);
	addClick('graduadosHref',gH);
}

function redirect(url)
{
	window.location.replace(url);
}

function addClick(classN,url)
{
	var arr = document.getElementsByClassName(classN);
	for(var i = 0; i < arr.length; i++)
	{
		arr[i].addEventListener('click',function(){redirect(url)});
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

function getCard(cT,cC)
{
	return `<div class="row"><div class="col s12">
			<div class="card blue-grey darken-1">
			<div class="card-content white-text">
			<span class="card-title">${cT}</span>
			<p class="center-align">${cC}</p>
			</div></div></div></div>`;
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

document.addEventListener("DOMContentLoaded", checkMenu, false);
document.addEventListener("DOMContentLoaded", checkSelectedOption, false);