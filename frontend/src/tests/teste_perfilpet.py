from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.get("http://localhost:3000/perfilpet/1")  # troque o ID se necessário

time.sleep(5)
print("Título da página:", driver.title)

driver.quit()