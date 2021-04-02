from locust import HttpUser, TaskSet, task
import json
  
class WebsiteUser(HttpUser):
    min_wait = 5000
    max_wait = 9000

    @task()
    def login(self):
        # admin login  and retrieving it's access token
        response = self.client.post("/oauth/resource", data = None, headers = {'Authorization': 'Bearer lwmroczwfkftk8tgb5gejjryj0upajr5umktjsq0nzjml18njx'})
        return json.loads(response._content)