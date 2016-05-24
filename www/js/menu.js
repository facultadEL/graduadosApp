document.write(`<div class="navbar-fixed"><nav id="nav">
	<div class="nav-wrapper blue darken-4">
		<a href="inicio.html" class="brand-logo center">Graduados FRVM</a>
		<a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
		<ul class="left hide-on-med-and-down">
			<li><a href="perfil.html"><i class="material-icons">perm_identity</i></a></li>
			<li class="hideNotAdmin"><a class="graduadosHref" href="graduadosAdmin.html">Graduados <span class="new badge cantGraduados">0</span></a></li>
		</ul>
		<ul class="right hide-on-med-and-down">
			<li><a class="cursosHref" href="cursos.html">Cursos</a></li>
			<li><a class="posgradosHref" href="posgrados.html">Posgrados</a></li>
			<li><a class="empleoHref" href="empleo.html">Empleo</a></li>
			<li><a class="descuentosHref" href="descuentos.html">Descuentos</a></li>
			<li><a href="#" onclick="logout()"><i class="material-icons">power_settings_new</i></a></li>
		</ul>
		<ul class="side-nav" id="mobile-demo">
			<li><a href="perfil.html">Perfil</a></li>
			<li class="hideNotAdmin"><a class="graduadosHref" href="graduadosAdmin.html">Graduados <span class="new badge cantGraduados">0</span></a></li>
			<li><a class="cursosHref" href="cursos.html">Cursos</a></li>
			<li><a class="posgradosHref" href="posgrados.html">Posgrados</a></li>
			<li><a class="empleoHref" href="empleo.html">Empleo</a></li>
			<li><a class="descuentosHref" href="descuentos.html">Descuentos</a></li>
			<li><a href="#" onclick="logout()">Cerrar Sesión</a></li>
		</ul>
	</div>
</nav></div>`);

function showSubNavBar(menu)
{
    document.write(`<div class="navbar-fixed" id="subnavbar">
	<nav id="navsubnavbar">
		<div class="nav-wrapper teal lighten-1">
		    <a href="" class="brand-logo center"><h6  style="color:white">${menu}</h6></a>
        </div>
    </nav>
    </div>`);
}