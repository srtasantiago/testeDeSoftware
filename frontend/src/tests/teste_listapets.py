from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.get("http://localhost:3000/listapets")

time.sleep(3)


pets = driver.find_elements(By.CLASS_NAME, "card-pet") 
print(f"Total de pets exibidos: {len(pets)}")

time.sleep(5)
driver.quit()
