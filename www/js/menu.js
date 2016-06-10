document.write(`<div class="navbar-fixed">
	<ul id="dropdownMoreOptions" class="dropdown-content">
		<li class="liGraduado hideNotAdmin"><a class="graduadosHref">Graduados <span class="new badge cantGraduados">0</span></a></li>
		<li class="liPerfil"><a class="perfilHref">Perfil</a></li>
		<li class="liContacto"><a class="contactoHref">Contacto</a></li>
		<li><a onclick="logout()">Cerrar Sesión</a></li>
	</ul>
	<nav id="nav">
	<div class="nav-wrapper blue darken-4">
		<a class="brand-logo center inicioHref">Graduate UTN</a>
		<a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
		<!--ul class="left hide-on-med-and-down">
			<li><a class="liPerfil perfilHref" ><i class="material-icons">perm_identity</i></a></li>
			<li class="liGraduado hideNotAdmin"><a class="graduadosHref">Graduados <span class="new badge cantGraduados">0</span></a></li>
		</ul-->
		<ul class="right hide-on-med-and-down">
			<li class="liCurso"><a class="cursosHref">Cursos</a></li>
			<li class="liPosgrado"><a class="posgradosHref">Posgrados</a></li>
			<li class="liEmpleo"><a class="empleoHref">Empleo</a></li>
			<li class="liDescuento"><a class="descuentosHref">Descuentos</a></li>
			<li><a class="dropdown-button" href="#" data-activates="dropdownMoreOptions"><i class="material-icons">more_vert</i></a></li>
			<!--li><a onclick="logout()"><i class="material-icons">power_settings_new</i></a></li-->
		</ul>
		<ul class="right show-on-med-and-down">
			<li id="backMenuArrow"><a onclick="window.location.replace('inicio.html')"><i class="material-icons">keyboard_arrow_left</i></a></li>
		</ul>
		<ul class="side-nav" id="mobile-demo">
			<li class="liGraduate"><a class="inicioHref"><strong>Graduate UTN</strong></a></li>
			<li class="liPerfil"><a class="perfilHref">Perfil</a></li>
			<li class="liGraduado hideNotAdmin"><a class="graduadosHref">Graduados <span class="new badge cantGraduados">0</span></a></li>
			<li class="liCurso"><a class="cursosHref">Cursos</a></li>
			<li class="liPosgrado"><a class="posgradosHref">Posgrados</a></li>
			<li class="liEmpleo"><a class="empleoHref">Empleo</a></li>
			<li class="liDescuento"><a class="descuentosHref">Descuentos</a></li>
			<li class="liContacto"><a class="contactoHref">Contacto</a></li>
			<li><a onclick="logout()">Cerrar Sesión</a></li>
		</ul>
	</div>
</nav></div>`);

function showSubNavBar(menu)
{
    document.write(`<div class="navbar-fixed" id="subnavbar">
	<nav id="navsubnavbar">
		<div class="nav-wrapper teal lighten-1">
		    <a class="brand-logo center"><h6  style="color:white">${menu}</h6></a>
        </div>
    </nav>
    </div>`);
}