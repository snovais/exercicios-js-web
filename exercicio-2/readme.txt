📚 EXPLICAÇÃO

🔹 Métodos HTTP (VERBOS)
Método	O que faz	Exemplo
GET	Buscar dados	GET /usuarios/1 → Retorna o usuário 1
POST	Criar dados	POST /usuarios → Cria um novo usuário
PUT	Atualizar TUDO	PUT /usuarios/1 → Substitui o usuário 1
DELETE	Remover dados	DELETE /usuarios/1 → Remove o usuário 1

🔹 Status Codes (Códigos de Resposta)
Código	Significado	O que fazer
200	OK ✅	Tudo funcionou!
201	Criado ✅	Recurso foi criado com sucesso
400	Requisição inválida ❌	Verifique os dados enviados
401	Não autorizado 🔒	Faça login primeiro
403	Acesso proibido 🚫	Você não tem permissão
404	Não encontrado ❓	O recurso não existe
500	Erro no servidor 💥	Tente novamente mais tarde


🎯 EXERCÍCIOS
Teste o GET: Busque o usuário 1, 2, 3... depois tente o 999 (vai dar 404)
Teste o POST: Crie um usuário com seu nome e email
Teste o PUT: Atualize o nome do usuário 1
Teste o DELETE: Delete o usuário 5 (depois tente buscar ele com GET)
Teste erros: Selecione 404, 500, 401 no dropdown e veja as mensagens
