# Email Scheduler API

## Description

The Email Scheduler API allows users to schedule email tasks using cron jobs. Users can create, edit, delete, stop, and restart scheduled email tasks. The API is built using Node.js, Express, and MongoDB, and it provides a simple interface for managing email reminders.

## Technologies Used

* Node.js
* Express.js
* Mongoose (MongoDB ODM)
* dotenv (for environment variable management)
* CORS (Cross-Origin Resource Sharing)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/email-scheduler.git
   cd email-scheduler

###  Set up environment variables:
Create a .env file in the root directory of the project and add the following variables:


           SERVER=LOCAL # or REMOTE
           DB_LOCAL=mongodb://localhost:27017/your_local_db_name
           DB_USERNAME=your_mongo_username
           DB_PASSWORD=your_mongo_password
           PORT=5000
           your_email=your_email@gmail.com
           your_pass=your_email_password  


## 1. Get All Scheduled Tasks
Method: GET
Endpoint: /api/v1/mail/
Description: Retrieve a list of all scheduled email tasks.
Response:
200 OK

    {
      "listOfScheduled": [{
      "id": "unique_id",
      "displayName": "Task Name",
      "schedule": "*/5 * * * *",
      "message": "This is a reminder.",
      "lastSuccess": "",
      "status": "running",
      "nextSchedule": ""
     } ],
      "success": true,
      "message": "Retrieved the list of scheduled jobs."
    }

## 2. Add a New Task
Method: POST
Endpoint: /api/v1/mail/add-task
Description: Create a new scheduled email task.
Request Body:

    {
     "displayName": "Task Name",
     "schedule": "*/5 * * * *",
     "message": "This is a reminder.",
    "to": "recipient@example.com"
    }

Response:
201 Created

    {
     "success": true,
     "message": "Job scheduled. Let's complete your task!"
    }

### 3. Edit a Task
Method: PATCH
Endpoint: /api/v1/mail/edit
Description: Update an existing scheduled email task.
Request Body:

       {
       "displayName": "Task Name",
       "schedule": "*/10 * * * *", // New schedule
       "message": "Updated reminder message."
       }

Response:
200 OK

    {
    "status": { "n": 1, "nModified": 1, "ok": 1 },
    "success": true,
    "message": "Job updated successfully."
    }

###  4. Delete a Task
Method: DELETE
Endpoint: /api/v1/mail/remove
Description: Delete a scheduled email task.
Request Body:

       {
        "displayName": "Task Name"
       }

Response:
200 OK

    {
    "status": { "n": 1, "ok": 1 },
    "success": true,
    "message": "Job deleted successfully."
    }

### 5. Stop a Task
Method: PATCH
Endpoint: /api/v1/mail/stop
Description: Stop a scheduled email task.
Request Body:

    {
     "displayName": "Task Name"
    }

Response:
200 OK

    {
    "success": true,
    "message": "Scheduled job stopped successfully."
    }

###  6. Restart a Task
Method: PATCH
Endpoint: /api/v1/mail/restart
Description: Restart a scheduled email task.
Request Body:

    {
     "displayName": "Task Name"
    }

Response:
200 OK

    {
    "success": true,
    "message": "Scheduled job restarted successfully."
    }

    
### Key Formatting Changes

1. **Consistent Markdown**: Each section is clearly defined with appropriate headers.
2. **Code Blocks**: JSON examples are enclosed in code blocks for clarity.
3. **Clear Instructions**: Installation and usage instructions are clearly laid out for ease of understanding.

Feel free to customize any part of this `README.md` file based on your project's specific requirements and features. If you have any further questions or need additional adjustments, let me know!
    
