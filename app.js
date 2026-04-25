const API_URL = 'https://backend-app-user-registration.onrender.com/api/users';

const form = document.getElementById('user-form');
const userId = document.getElementById('user-id');
const name = document.getElementById('name');
const email = document.getElementById('email');
const usersList = document.getElementById('users-list');
const message = document.getElementById('message');
const cancelEdit = document.getElementById('cancel-edit');
const formTitle = document.getElementById('form-title');
const reloadBtn = document.getElementById('reload-btn');

function showMessage(text) {
  message.textContent = text;
}

function clearForm() {
  form.reset();
  userId.value = '';
  formTitle.textContent = 'Novo usuário';
  cancelEdit.classList.add('hidden');
}


async function loadUsers() {
  const response = await fetch(API_URL);
  const users = await response.json();

  if (!users.length) {
    usersList.innerHTML = '<p>Nenhum usuário encontrado.</p>';
    return;
  }

  usersList.innerHTML = users.map(user => `
    <div class="entry-item">
      <h3>${user.name}</h3>
      <p>${user.email}</p>
      <div class="user-buttons">
        <button onclick="editUser('${user._id}')">Editar</button>
        <button onclick="deleteUser('${user._id}')">Excluir</button>
      </div>
    </div>
  `).join('');
}

async function saveUser(data) {
  const id = userId.value;
  const url = id ? `${API_URL}/${id}` : API_URL;
  const method = id ? 'PUT' : 'POST';

  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

window.editUser = async function (id) {
  const response = await fetch(`${API_URL}/${id}`);
  const user = await response.json();

  userId.value = user._id;
  name.value = user.name;
  email.value = user.email;

  formTitle.textContent = 'Editar usuário';
  cancelEdit.classList.remove('hidden');
  showMessage('Editando usuário.');
};

window.deleteUser = async function (id) {
  if (!confirm('Deseja excluir este usuário?')) return;

  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  showMessage('Registro excluído.');
  loadUsers();
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    name: name.value,
    email: email.value,
  };

  await saveUser(data);
  showMessage(userId.value ? 'Usuário atualizado.' : 'Usuário criado.');
  clearForm();
  loadUsers();
});

cancelEdit.addEventListener('click', () => {
  clearForm();
  showMessage('Edição cancelada.');
});

reloadBtn.addEventListener('click', loadUsers);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      await navigator.serviceWorker.register('./service-worker.js');
      console.log('Service Worker registrado com sucesso.');
    } catch (error) {
      console.log('Erro ao registrar Service Worker:', error);
    }
  });
}

clearForm();
loadUsers();
