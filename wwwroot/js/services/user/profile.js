const user = JSON.parse(localStorage.getItem('usuario'));

function formatDate(inputDate) {
    let date = new Date(inputDate);

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    return `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
}

document.querySelector('#user-name').innerText = user.nome;
document.querySelector("#member-since").innerText = formatDate(user.dataCadastro);