from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time


driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))


driver.get("http://localhost:3000/")


time.sleep(2)


try:
    botao_entrar = driver.find_element(By.XPATH, "//button[contains(text(), 'Entrar')]")
    botao_entrar.click()
except:
    print("❌ Botão 'Entrar' não encontrado!")
    driver.quit()
    exit()


time.sleep(2)


driver.find_element(By.NAME, "email").send_keys("teste@email.com")
driver.find_element(By.NAME, "password").send_keys("123456")


driver.find_element(By.TAG_NAME, "form").submit()


input("✅ Teste concluído! Pressione Enter para fechar o navegador...")
driver.quit()
