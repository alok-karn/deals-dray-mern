<p>This is an admin pannel to manage the employee </p>

### Getting Started

1. Clone the repository
   `bash git clone https://github.com/alok-karn/deals-dray-mern `
2. Install dependencies
   `bash npm install `
3. Start the server
   `bash npm start `

### NOTE

-   set .env file in root directory with following

```bash
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
FIREBASE_API_KEY=your_firebase_api_key
```

### Features

-   Admin can add, update, delete employee
-   Admin can view all the employees
-   Admin can search employee by name, email, mobile and designation

### Few Things to Note

-   if user register with name as `admin` then it will be considered as admin user.
-   if user register with name as `any name` then it will be considered as normal user.
-   Only admin is allowed to add, update, delete employee.

### Techonologies Used

-   Next.js and TailwindCSS: For frontend and API
-   MongoDB: For database
-   Firebase: For storing and serving images of employee

### Tech Stack

![image](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![image](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![image](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![image](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![image](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![image](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
![image](https://img.shields.io/badge/json-5E5C5C?style=for-the-badge&logo=json&logoColor=white)
![image](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)
![image](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![image](https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![image](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![image](https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white)

### API Endpoints

-   POST /api/auth/register - Register user
-   POST /api/auth/login - Login user
-   POST /api/employee - Add employee
-   GET /api/employee - Get all employees
-   GET /api/employee/:id - Get employee by id
-   PUT /api/employee/:id - Update employee
-   DELETE /api/employee/:id - Delete employee
-   GET /api/employee/search?name=alok - Search employee by name
-   GET /api/employee/search?email=xyz@xyz.com - Search employee by email
-   GET /api/employee/search?mobile=1234567890 - Search employee by mobile
-   GET /api/employee/search?designation=developer - Search employee by designation
