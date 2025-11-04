# Capstone Project Proposal: Student Course Enrollment API

Project Concept
-Theme: The student course enrolment API is designed to manage the relationship between students and courses in an academic courses’ enrollment setting. It will allow administrators to manage courses and student information, while authenticated students can view and enroll in available courses.

- Purpose: This backend application ensures that the course enrollment system includes user – authentication (for security purposes), role-based authorization(to limit the access to specific users), data validation(like student id, student email,  admin email etc.) and CRUD Operations.
- Reason: I choose to make this Backend application because of my curiosity to see how an app authenticates their every student when they enrolled in their own provided hub accounts, learn account etc. and also how available courses are open for every student during their planning for next term. Also, I have some idea already that what will be the endpoints for this api.
- New Component: Node mailer for Email Notifications

## Scope and Functionality

- The scope of my api is having the data of all students, courses and enrollments as these are the main resource of my API.
- Data Needs:
  #Students: Student id, Full name and last name, academic email, program they are study, year of enrollment.
  #Courses: Course id, Course name, Course description, Course credits, Course duration, course code.
  #Enrollments: enrollment id, student id, course id, enrollment year and date, enrollment status.
- Endpoints for Students:
  #GET  /api/students  -  to get all list of students.
  #POST  /api/students – to create a new student  in system.
  #PUT  /api/students/:id – to find a student with id.
  #DELETE  /api/students/:id - to delete a student after confirming id.

- Endpoints for Courses:
  #GET  /api/courses  -  to get  all courses.
  #POST  /api/courses – to create a new course  in system.
  #PUT  /api/courses/:id – to find a course with id.
  #DELETE  /api/courses/:id - to delete a course after confirming id.
- Endpoints for Enrollments:
  #GET  /api/enrollments  -  to get all enrollments.
  #POST  /api/enrollments – to create a new enrollment  in system.
  #DELETE  /api/enrollments/:id - to delete an enrollment after confirming id.
- Endpoints for Authentication:
  #POST  /api/auth/signup – to create a new signup
  #POST  /api/auth/login – to authenticate a  login

### Course Content Alignment

- Taking the reference of all the assignment notes first I will install all the required dependencies like node.js, express.js, jest, typescript, swagger etc.

- To meet the requirement of good architecture, I will use the layered architecture like routes (where my all-necessary endpoints will be defined) – controllers(where my all endpoints related business logic and request response will be defined)-services-repository

- For data input validation  I will use Joi such as when we need to validate that if the student enters the right id or email. For error handling I will use the centralized error handling to provide consistent responses as learned in module 4

- Swagger setup for API documentation from module 5 course notes

- Firebase authentication while authenticating students and using role-based authorization with firebase custom claims for students and admins

- CRUD operations for creating my endpoints
