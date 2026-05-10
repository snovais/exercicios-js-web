// ============================================
// EXERCÍCIO 1: Saudação Personalizada
// ============================================
function saudar() {
    let nome = document.getElementById("nomeUsuario").value;
    
    if (nome.trim() === "") {
        document.getElementById("saudacao").innerHTML = "⚠️ Por favor, digite seu nome!";
        document.getElementById("saudacao").style.color = "#e53e3e";
    } else {
        document.getElementById("saudacao").innerHTML = `✨ Olá, ${nome}! Seja bem-vindo(a)! ✨`;
        document.getElementById("saudacao").style.color = "#2c3e50";
    }
}

// ============================================
// EXERCÍCIO 2: Calculadora Simples
// ============================================
function somar() {
    let a = Number(document.getElementById("num1").value);
    let b = Number(document.getElementById("num2").value);
    
    if (isNaN(a) || isNaN(b) || document.getElementById("num1").value === "" || document.getElementById("num2").value === "") {
        document.getElementById("resultadoSoma").innerHTML = "❌ Preencha os dois números!";
        document.getElementById("resultadoSoma").style.color = "#e53e3e";
    } else {
        let soma = a + b;
        document.getElementById("resultadoSoma").innerHTML = `${a} + ${b} = ${soma}`;
        document.getElementById("resultadoSoma").style.color = "#2c3e50";
    }
}

// ============================================
// EXERCÍCIO 3: Mudar Cor do Quadrado
// ============================================
function mudarCor(cor) {
    const quadrado = document.getElementById("quadrado");
    quadrado.style.backgroundColor = cor;
    
    // Feedback visual opcional (pode remover se quiser)
    console.log(`Cor alterada para: ${cor}`);
}

// ============================================
// EXERCÍCIO 4: Lista de Tarefas
// ============================================
function adicionarTarefa() {
    let tarefaTexto = document.getElementById("tarefa").value;
    
    if (tarefaTexto.trim() === "") {
        alert("⚠️ Digite uma tarefa antes de adicionar!");
        return;
    }
    
    let li = document.createElement("li");
    li.textContent = tarefaTexto;
    
    // Adicionar botão de remover em cada tarefa (funcionalidade extra)
    let btnRemover = document.createElement("button");
    btnRemover.textContent = "❌";
    btnRemover.style.marginLeft = "10px";
    btnRemover.style.padding = "2px 8px";
    btnRemover.style.backgroundColor = "#fc8181";
    btnRemover.style.border = "none";
    btnRemover.style.borderRadius = "5px";
    btnRemover.style.cursor = "pointer";
    btnRemover.onclick = function() {
        li.remove();
    };
    
    li.appendChild(btnRemover);
    document.getElementById("minhaLista").appendChild(li);
    document.getElementById("tarefa").value = ""; // limpar campo
}

// ============================================
// EXERCÍCIO 5: Validação de Formulário
// ============================================
function validarFormulario() {
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    let feedback = document.getElementById("feedback");
    
    if (email.indexOf("@") === -1) {
        feedback.innerHTML = "❌ Email inválido! O email deve conter '@'";
        feedback.style.backgroundColor = "#fed7d7";
        feedback.style.color = "#c53030";
        return false;
    }
    
    if (senha.length < 4) {
        feedback.innerHTML = "❌ Senha muito curta! Mínimo de 4 caracteres";
        feedback.style.backgroundColor = "#fed7d7";
        feedback.style.color = "#c53030";
        return false;
    }
    
    feedback.innerHTML = "✅ Formulário enviado com sucesso!";
    feedback.style.backgroundColor = "#c6f6d5";
    feedback.style.color = "#22543d";
    
    // Limpar campos (opcional)
    document.getElementById("email").value = "";
    document.getElementById("senha").value = "";
    
    return false; // evita recarregar a página
}