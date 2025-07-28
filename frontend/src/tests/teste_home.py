from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.get("http://localhost:3000/")

time.sleep(3)

print("Título da página:", driver.title)

time.sleep(5)
driver.quit()
