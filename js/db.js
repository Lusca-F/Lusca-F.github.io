db.enablePersistence()
    .catch(function(err) {
        if (err.code == 'failed-precondition') {
            console.log('persistance failed');
        } else if (err.code == 'unimplemented') {
            console.log('persistance not available');
        }
    });

db.collection('Comidas').onSnapshot(snapshot => {
 snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
            desenhaCard(change.doc.data(), change.doc.id);
        }
        if (change.type === 'removed') {
            removeCard(change.doc.id);
        }
    });
}); 

const form = document.querySelector('form');
form.addEventListener('submit', evt => {
    evt.preventDefault();

    const Comidas = {
        Nome: form.ComidaNome.value,
        Descrição: form.ComidaDescrição.value,
        link: form.ComidaLink.value,
        Titulo: form.ComidaTitulo.value,
        

    };

    db.collection('Comidas').add(comida)
        .catch(err => console.log(err));

    //reseta o formulario
    form.ComidaNome.value= '';
    form.ComidaTitulo.value = '';
    form.ComidaDescrição.value = '';
    form.ComidaLink.value = '';
    form.ComidaArquivo.value = '';

});
