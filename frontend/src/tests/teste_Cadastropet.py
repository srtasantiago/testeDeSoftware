from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.get("http://localhost:3000/cadastropet")

time.sleep(2)


driver.find_element(By.NAME, "nome").send_keys("Bolinha")
driver.find_element(By.NAME, "raca").send_keys("Poodle")
driver.find_element(By.NAME, "idade").send_keys("2")

driver.find_element(By.TAG_NAME, "form").submit()

time.sleep(5)
driver.quit()