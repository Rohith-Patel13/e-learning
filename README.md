

```sh
git clone https://github.com/Rohith-Patel13/e-learning.git
```

```sh
cd server 
```

```sh
npm install
```

```sh
touch .env
```

# Add below code in .env file  and also replace some fields
```sh
MONGODB_URI = mongodb+srv://<username>:<password>@cluster0.vbr0tsa.mongodb.net/<databse_name>

SALT = 10

SECRET_STRING = MY_SECRET_TOKEN_STRING

HOST = smtp.gmail.com
SERVICE = gmail
EMAIL_PORT = 587
SECURE = true 
USER = your email address
PASS = generate pass key from provided email

BASE_URL = http://localhost:9090/api/users

JWT_SECRET = MY_PASSWORD_RESET

```


# Sample course data
```sh
    {
        "title": "Introduction to JavaScript",
        "description": "Learn the basics of JavaScript programming language.",
        "category": "Programming",
        "level": "Beginner",
        "popularity": "1500"
    }
```

```sh
    {
        "title": "ReactJS Fundamentals",
        "description": "Get started with ReactJS framework.",
        "category": "Web Development",
        "level": "Intermediate",
        "popularity": "2300"
    }
```

```sh
    {
        "title": "Data Structures and Algorithms",
        "description": "Explore common data structures and algorithms.",
        "category": "Computer Science",
        "level": "Advanced",
        "popularity": "1800"
    }
```
