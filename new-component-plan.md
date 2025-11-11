#COMPONENT:  I changed my previous choosen component to "Express-rate-limit" component as it's easy
and simple to implement without much code change. Second, it will help my api to limit 
the excessive requests level by users.

##PURPOSE: As my api includes student, course and enrollment endpoints that most oftenly used
which can slow down my api later because of too many requests.

###The steps we need to take to implement is:
- installing the package
- importing this as  middleware in our app.ts file before routes where we going to set the 
limit rate of requests and message response.
- So, that it will apply on all endpoints in App.ts file.

####INTEGRATION: I can check it integration by setting the limit of my request to 5 in one minute and then \
sending more than 5 requests in one minute, it should then prompt up with message reponse
like Too Many requests, Please try after some time.