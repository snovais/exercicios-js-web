// ============================================================
// URL BASE DA API FAKE (JSONPlaceholder)
// ============================================================
const API_URL = 'https://jsonplaceholder.typicode.com/users';

// ============================================================
// FUNÇÃO AUXILIAR: Exibir resultado e status
// ============================================================
function exibirResultado(elementId, data, statusCode = null, isError = false) {
    const elemento = document.getElementById(elementId);
    const statusElement = document.getElementById(`status${elementId.replace('resultado', '')}`);
    
    if (isError) {
        elemento.innerHTML = `<span style="color: #e53e3e;">❌ ERRO: ${data}</span>`;
        elemento.style.borderLeftColor = '#e53e3e';
        if (statusElement) {
            statusElement.innerHTML = `🔴 Status: ${statusCode || 'Erro'}`;
            statusElement.className = 'status status-error';
        }
    } else {
        if (typeof data === 'object') {
            elemento.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        } else {
            elemento.innerHTML = data;
        }
        elemento.style.borderLeftColor = '#38a169';
        if (statusElement && statusCode) {
            statusElement.innerHTML = `✅ Status: ${statusCode} - Sucesso!`;
            statusElement.className = 'status status-success';
        }
    }
}

// ============================================================
// EXERCÍCIO 1: REQUISIÇÃO GET
// ============================================================
async function buscarUsuario() {
    const userId = document.getElementById('userId').value;
    
    if (!userId) {
        exibirResultado('resultadoGet', 'Por favor, digite um ID', null, true);
        return;
    }
    
    try {
        // Faz a requisição GET
        const response = await fetch(`${API_URL}/${userId}`);
        
        // Verifica se a resposta foi bem sucedida
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const usuario = await response.json();
        exibirResultado('resultadoGet', usuario, response.status);
        
    } catch (erro) {
        // Tratamento do erro (ex: 404 quando usuário não existe)
        exibirResultado('resultadoGet', erro.message, null, true);
        
        // Atualiza o status específico
        const statusElement = document.getElementById('statusGet');
        if (erro.message.includes('404')) {
            statusElement.innerHTML = '🔴 Status: 404 - Usuário não encontrado!';
            statusElement.className = 'status status-error';
        }
    }
}

// ============================================================
// EXERCÍCIO 2: REQUISIÇÃO POST
// ============================================================
async function criarUsuario() {
    const nome = document.getElementById('postNome').value;
    const email = document.getElementById('postEmail').value;
    
    if (!nome || !email) {
        exibirResultado('resultadoPost', 'Preencha nome e email!', null, true);
        return;
    }
    
    const novoUsuario = {
        name: nome,
        email: email,
        username: nome.toLowerCase().replace(' ', ''),
        phone: '(11) 99999-9999'
    };
    
    try {
        // Faz a requisição POST
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novoUsuario)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const usuarioCriado = await response.json();
        exibirResultado('resultadoPost', usuarioCriado, response.status);
        
        // Limpar campos
        document.getElementById('postNome').value = '';
        document.getElementById('postEmail').value = '';
        
    } catch (erro) {
        exibirResultado('resultadoPost', erro.message, null, true);
    }
}

// ============================================================
// EXERCÍCIO 3: REQUISIÇÃO PUT
// ============================================================
async function atualizarUsuario() {
    const id = document.getElementById('putId').value;
    const novoNome = document.getElementById('putNome').value;
    
    if (!id || !novoNome) {
        exibirResultado('resultadoPut', 'Preencha ID e novo nome!', null, true);
        return;
    }
    
    const usuarioAtualizado = {
        id: parseInt(id),
        name: novoNome,
        username: novoNome.toLowerCase().replace(' ', ''),
        email: `usuario${id}@email.com`
    };
    
    try {
        // Faz a requisição PUT
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuarioAtualizado)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const usuario = await response.json();
        exibirResultado('resultadoPut', usuario, response.status);
        
        // Limpar campo
        document.getElementById('putNome').value = '';
        
    } catch (erro) {
        exibirResultado('resultadoPut', erro.message, null, true);
    }
}

// ============================================================
// EXERCÍCIO 4: REQUISIÇÃO DELETE
// ============================================================
async function deletarUsuario() {
    const id = document.getElementById('deleteId').value;
    
    if (!id) {
        exibirResultado('resultadoDelete', 'Digite um ID para deletar!', null, true);
        return;
    }
    
    try {
        // Faz a requisição DELETE
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        // DELETE retorna 200 ou 404 se não encontrar
        if (response.ok) {
            exibirResultado('resultadoDelete', `Usuário ${id} foi deletado com sucesso!`, response.status);
        } else if (response.status === 404) {
            throw new Error(`404 - Usuário ${id} não encontrado para deletar`);
        } else {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        // Limpar campo
        document.getElementById('deleteId').value = '';
        
    } catch (erro) {
        exibirResultado('resultadoDelete', erro.message, null, true);
    }
}

// ============================================================
// EXERCÍCIO 5: TRATAMENTO DE DIFERENTES ERROS HTTP
// ============================================================
async function testarErro() {
    const errorType = document.getElementById('errorType').value;
    let url = '';
    
    // Escolhe URLs diferentes para simular diferentes erros
    switch(errorType) {
        case '200':
            url = 'https://jsonplaceholder.typicode.com/users/1';
            break;
        case '404':
            url = 'https://jsonplaceholder.typicode.com/users/9999';
            break;
        case '500':
            url = 'https://httpstat.us/500';
            break;
        case '401':
            url = 'https://httpstat.us/401';
            break;
        case '403':
            url = 'https://httpstat.us/403';
            break;
        default:
            url = 'https://jsonplaceholder.typicode.com/users/1';
    }
    
    try {
        const response = await fetch(url);
        
        // Analisa o status code
        let mensagem = '';
        let statusClass = '';
        
        switch(response.status) {
            case 200:
                mensagem = '✅ Sucesso! Dados carregados normalmente.';
                statusClass = 'status-success';
                const dados = await response.json();
                exibirResultado('resultadoErro', { mensagem, dados }, response.status);
                return;
            case 404:
                mensagem = '❌ 404 - Página Não Encontrada! O recurso solicitado não existe.';
                statusClass = 'status-error';
                break;
            case 500:
                mensagem = '💥 500 - Erro Interno do Servidor! Tente novamente mais tarde.';
                statusClass = 'status-error';
                break;
            case 401:
                mensagem = '🔒 401 - Não Autorizado! Você precisa fazer login.';
                statusClass = 'status-warning';
                break;
            case 403:
                mensagem = '🚫 403 - Acesso Proibido! Você não tem permissão.';
                statusClass = 'status-warning';
                break;
            default:
                mensagem = `⚠️ Código ${response.status}: ${response.statusText}`;
                statusClass = 'status-warning';
        }
        
        // Exibe o resultado formatado com o erro específico
        const resultadoElement = document.getElementById('resultadoErro');
        resultadoElement.innerHTML = `
            <strong>Código HTTP: ${response.status}</strong><br>
            ${mensagem}<br><br>
            <em>Dica: Verifique se o recurso existe ou se você tem permissão.</em>
        `;
        resultadoElement.style.borderLeftColor = '#e53e3e';
        
        const statusElement = document.getElementById('statusErro');
        statusElement.innerHTML = `📊 Status: ${response.status} - ${response.statusText}`;
        statusElement.className = `status ${statusClass}`;
        
    } catch (erro) {
        exibirResultado('resultadoErro', `Erro na requisição: ${erro.message}`, null, true);
    }
}

// ============================================================
// FUNÇÃO EXTRA: Explicação dos métodos HTTP
// ============================================================
function explicarMetodos() {
    console.log(`
    ========================================
    MÉTODOS HTTP - RESUMO:
    ========================================
    
    GET    → Buscar dados (Ler)
    POST   → Criar novos dados (Escrever)
    PUT    → Atualizar dados existentes (Substituir)
    DELETE → Remover dados (Apagar)
    
    STATUS CODE IMPORTANTES:
    
    200 → OK (Sucesso)
    201 → Criado (POST bem sucedido)
    400 → Requisição inválida
    401 → Não autorizado (precisa login)
    403 → Proibido (sem permissão)
    404 → Não encontrado
    500 → Erro interno do servidor
    `);
}

// Mostrar explicação no console ao carregar a página
explicarMetodos();