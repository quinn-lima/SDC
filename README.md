# SDC
Atelier Ecommerce - Backend

This is a horrizontally scalable microservice architecture back end.
RESTful API endpoint with full CRUD functionality. 
PostgresQL has been seeded over 1 million records and queries were optimised to take < 3ms.
The backed was Load-tested and scaled backend using a custom load balancer with Redis Caching on AWS EC2 instances to be able to handle greater than 1000 rps.
API endpoints were testing using Loader.io

1000 GET requests per second over one minute:
<img width="900" alt="Screen Shot 2021-12-13 at 12 17 22 PM" src="https://user-images.githubusercontent.com/75652493/145882202-be92010f-af81-48c2-9a91-71a8d0ffd1ae.png">

1000 PUT requests per second over 1 minute:
<img width="900" alt="Screen Shot 2021-12-13 at 12 23 56 PM" src="https://user-images.githubusercontent.com/75652493/145883229-cb312889-8707-42c5-bb89-8ddba1fea543.png">


