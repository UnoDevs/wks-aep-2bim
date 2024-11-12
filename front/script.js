document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Previne o envio do formulário padrão

    // Coletando os valores dos campos
    const email = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    var token;

    const loginData = {
        email: email,
        senha: password,
    };

    try {

        console.log(loginData)
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData)
            
        });

        if (!response.ok) {
            throw new Error('Erro ao realizar o login');
        }
        const data = await response.json();
        if (data) {
            localStorage.setItem('accessToken', data.access_token);
            token = data.access_token;
            window.location.href = 'senhas.html';
        } else {
            alert('Código de autenticação inválido ou ausente. Tente novamente.');
        }

    } catch (error) {
        window.location.href = 'index.html';
        console.error('Erro:', error);
    }
});

async function getPasswords() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        alert('Você precisa estar logado para acessar as senhas');
        window.location.href = 'index.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/passwords/user/1', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar as senhas');
        }

        const data = await response.json();
        if (data && data.length > 0) {
            generateTable(data);
        } else {
            document.querySelector('.content').innerHTML = '<p>Não há senhas cadastradas.</p>';
        }

    } catch (error) {
        console.error('Erro:', error);
        alert('Falha ao carregar as senhas. Tente novamente mais tarde.');
    }
}


function generateTable(passwords) {
    const table = document.createElement('table');
    console.log(passwords)
    table.innerHTML = `
        <thead>
            <tr>
                <th>Nome</th>
                <th>Serviço</th>
                <th>Senha</th>
                <th>Descrição</th>
            </tr>
        </thead>
        <tbody>
            ${passwords.map(password => `
                <tr>
                    <td>${password.name}</td>
                    <td>${password.service}</td>
                    <td>${password.password}</td>
                    <td>${password.description}</td>
                </tr>
            `).join('')}
        </tbody>
    `;
    document.querySelector('.content').appendChild(table);
}

document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('accessToken'); 
    window.location.href = 'index.html'; 
});