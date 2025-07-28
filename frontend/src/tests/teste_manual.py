rom selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager


driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))


driver.get("http://localhost:3000/")

print("🟢 Site aberto no navegador.")

# Passo 1: Entrar
input("➡️ 1. Clique no botão 'Entrar' na página inicial e pressione Enter aqui quando for redirecionada(o)...")

# Passo 2: Login
input("➡️ 2. Preencha o e-mail e a senha na tela de login.\n   ➤ Use e-mail: teste@email.com e senha: 123456\n   Depois clique no botão de login e pressione Enter aqui...")

# Passo 3: Ver animais
input("➡️ 3. Agora, acesse a lista de pets (pode estar como 'Ver Pets', 'Listar Pets' ou outro).\n   Explore a lista e pressione Enter aqui quando terminar...")

# Passo 4: Cadastrar pet
input("➡️ 4. Clique no botão 'Cadastrar Pet' ou equivalente.\n   Preencha os dados do pet manualmente e pressione Enter aqui quando finalizar o cadastro...")

# Final
print("✅ Teste manual completo! Obrigada por testar 💛🐶")
driver.quit()