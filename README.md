# Internship Management System - README

# Overview

The Internship Management System is an API-based system that allows creating and managing colleges and interns for internship programs. It provides endpoints to create colleges, create interns, retrieve college details, and retrieve associated interns. The system is designed to be easy to use and efficient in managing internship-related data.
Models

The system consists of two main models:
# College Model

The College model represents a college participating in the internship program. It has the following attributes:

    name: Abbreviated name of the college (mandatory, unique).
    fullName: Full name of the college (mandatory).
    logoLink: Public link to the college's logo stored on Amazon S3 (mandatory).
    isDeleted: Indicates if the college is deleted (boolean, default: false).

# Intern Model

The Intern model represents an intern participating in the internship program. It has the following attributes:

    name: Name of the intern (mandatory).
    email: Email address of the intern (mandatory, valid email, unique).
    mobile: Mobile number of the intern (mandatory, valid mobile number, unique).
    collegeId: Reference to the college the intern is associated with (mandatory, ObjectId, ref to college model).
    isDeleted: Indicates if the intern is deleted (boolean, default: false).

# API Endpoints

The system provides the following API endpoints:

# Create College

    Endpoint: POST /functionup/colleges
    Description: Creates a college document.

    Request Body:
{
  "name": "iith",
  "fullName": "Indian Institute of Technology, Hyderabad",
  "logoLink": "https://functionup.s3.ap-south-1.amazonaws.com/colleges/iith.png"
}

Response:

    Successful Response:
{
  "status": true,
  "data": {
    "name": "iith",
    "fullName": "Indian Institute of Technology, Hyderabad",
    "logoLink": "https://functionup.s3.ap-south-1.amazonaws.com/colleges/iith.png",
    "isDeleted": false
  }
}

Error Response:
        {
          "status": false,
          "message": "Error message describing the issue"
        }

# Create Intern

    Endpoint: POST /functionup/interns
    Description: Creates an intern document.
    Request Body:
{
  "name": "Jane Doe",
  "email": "jane.doe@iith.in",
  "mobile": "90000900000",
  "collegeName": "iith"
}

Response:

    Successful Response:
{
  "status": true,
  "data": {
    "isDeleted": false,
    "name": "Jane Doe",
    "email": "jane.doe@iith.in",
    "mobile": "90000900000",
    "collegeId": "888771129c9ea621dc7f5e3b"
  }
}

Error Response:
        {
          "status": false,
          "message": "Error message describing the issue"
        }

# Get College Details

    Endpoint: GET /functionup/collegeDetails?collegeName=iith
    Description: Retrieves the college details for the requested college.
    Query Parameters:
        collegeName: Abbreviated name of the college.
    Response:
        Successful Response:
{
  "status": true,
  "data": {
    "name": "iith",
    "fullName": "Indian Institute of Technology, Hyderabad",
    "logoLink": "some public s3 link for a college logo",
    "interns": [
      {
        "_id": "123a47301a53ecaeea02be59",
        "name": "Jane Doe",
        "email": "jane.doe@miet.ac.in",
        "mobile": "8888888888"
      },
      {
        "_id": "45692c0e1a53ecaeea02b1ac",
        "name": "John Doe",
        "email": "john.doe@miet.ac.in",
        "mobile": "9999999999"
      },
      {
        "_id": "7898d0251a53ecaeea02a623",
        "name": "Sukruti",
        "email": "dummy.email@miet.ac.in",
        "mobile": "9191919191"
      },
      {
        "_id": "999803da1a53ecaeea02a07e",
        "name": "Neeraj Kumar",
        "email": "another.example@miet.ac.in",
        "mobile": "9898989898"
      }
    ]
  }
}

Error Response:
        {
          "status": false,
          "message": "Error message describing the issue"
        }

# Testing

To test the API endpoints:

    Install Postman.
    Create a new collection in Postman named "Project 2 Internship."
    Add a request to the collection for each API endpoint.
    Name each request correctly to identify its purpose.
    Send requests from the collection to test the API functionalities.

# Dependencies

The following dependencies are used in the project:

    axios: Used for validating the logoLink for colleges.
    dotenv: Used for loading environment variables from a .env file.

Make sure to install these dependencies using npm install before running the project.
Environment Variables

The system uses environment variables to configure certain settings. Create a .env file in the project root directory and provide the following variables:

    PORT: Port number for the server to listen on.
    MONGODB_URL: mongoDb Url
    Other environment variables as required by your setup.

# Setup Instructions

To set up the project:

    Clone the project repository.
    Install the required dependencies using npm install.
    Configure the environment variables by creating a .env file (see the "Environment Variables" section above).
    Start the server using npm start.

# Conclusion

The Internship Management System provides a comprehensive solution for managing colleges and interns in an internship program. It offers APIs to create colleges and interns, retrieve college details, and associate interns with colleges. By following the provided documentation, you can effectively use and test the API endpoints to streamline the internship management process.