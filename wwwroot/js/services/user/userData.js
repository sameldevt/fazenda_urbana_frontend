const form = document.getElementById('personalDataForm');
const btnEdit = document.getElementById('btnEdit');
const actionButtons = document.getElementById('actionButtons');
const initialButtons = document.getElementById('initialButtons');
const fields = form.querySelectorAll('input:not([type="password"])');

btnEdit.addEventListener('click', function () {
    fields.forEach(field => field.disabled = false);
    initialButtons.classList.add('d-none');
    actionButtons.classList.remove('d-none');
});

const initialValues = {};
fields.forEach(field => {
    initialValues[field.id] = field.value;
});

document.querySelector('#actionButtons .btn-light').addEventListener('click', function () {
    fields.forEach(field => {
        field.disabled = true;
        field.value = initialValues[field.id];
    });
    actionButtons.classList.add('d-none');
    initialButtons.classList.remove('d-none');
});
