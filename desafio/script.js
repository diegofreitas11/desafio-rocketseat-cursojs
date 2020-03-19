var lista = document.querySelector('#app ul');
var input = document.querySelector('#app input');
var botao = document.querySelector('#app button');
var container = document.querySelector('#app');



botao.onclick = function(){
	var nome = document.createTextNode('Carregando...');
	var itemp = document.createElement('li');
	itemp.setAttribute('class', 'list-group-item');
	itemp.appendChild(nome);
	lista.appendChild(itemp);

	var alerta = document.getElementById('alertaErro');
	if(alerta){
		alerta.remove();
	}

	axios.get('https://api.github.com/users/'+ input.value +'/repos')
	.then(function(response){
		lista.innerHTML = '';

		for (repo of response.data){
			var nome = document.createTextNode(repo.name);
			var item = document.createElement('li');
			item.setAttribute('class', 'list-group-item');
			item.appendChild(nome);
			lista.appendChild(item);

		}
		console.log(response);
	})
	.catch(function(error){
		if(error.response.status === 404){
			lista.innerHTML = '';
			var alerta = document.createElement('div');
			alerta.setAttribute('class', 'alert alert-danger');
			alerta.setAttribute('role', 'alert');
			alerta.setAttribute('id', 'alertaErro');

			var texto = document.createTextNode('User não existe.');
			alerta.appendChild(texto);

			container.insertBefore(alerta, container.firstChild);
			//alert("usuário não existe");
		}
	});
}