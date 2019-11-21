// habilitar dados offline
db.enablePersistence()
    .catch(function(err) {
        if (err.code == 'failed-precondition') {
            // provavelmente multiplas abas abertas ao mesmo tempo
            console.log('Persistencia de dados falhou');
        } else if (err.code == 'unimplemented') {
            // browser nao suporta
            console.log('Persistencia nao disponivel');
        }
    });

// real-time listener que verifica as mudanças que ocorrem
db.collection('Comidas').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
            desenhaCard(change.doc.data(), change.doc.id);
        }
        if (change.type === 'removed') {
            // remover da pagina tambem
        }
    });
});

// adicionar nova sobremesa
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
    evt.preventDefault();

    const sobremesa = {
        nome: form.ComidaTitulo.value,
        descricao: form.ComidaDescricao.value,
        link: form.ComidaLink.value,
        endereco_imagem: form.ComidaArquivo.value
    };

    db.collection('Comidas').add(Comida)
        .catch(err => console.log(err));

    //reseta o formulario
    form.ComidaTitulo.value = '';
    form.ComidaDescricao.value = '';
    form.ComidaLink.value = '';
    form.ComidaArquivo.value = '';

});