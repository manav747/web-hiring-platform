

# Web Hiring Platform Application

## Overview
This React-based web application allows admins to manage job postings, track candidates, and create job-specific assessments. It streamlines the hiring process by providing tools to post jobs, review candidates, and assign assessments for open positions. The platform is intuitive and responsive, built with best practices in mind.

## Features

### Dashboard for Managing Job Postings
- Admins can add, edit, and delete job postings.
- Each job listing includes:
  - Job title
  - Job description
  - Number of candidates applied

### Candidate Tracking & Details Page
- Admins can view a list of candidates who have applied for a job.
- For each candidate, the following details are shown:
  - Candidate name
  - Resume link or document (upload/download feature)
  - Application date
  - Application status (e.g., "Under Review", "Interview Scheduled", etc.)
- Clicking on a candidate’s name opens a detailed profile displaying:
  - Candidate profile information (name, email, skills, experience)
  - Resume preview or download link
  - Option to update the candidate's status

### Job-Specific Test/Assessment Creation
- Admins can create unique assessments for each job.
- The admin selects a job from a dropdown list, then creates a set of multiple-choice questions specific to that job.
- Admins can add, edit, or remove questions and answers for each job.
- Each job has a unique assessment; no two jobs share the same test.

### User Interface & User Experience
- Fully responsive, ensuring a seamless experience on both desktop and mobile.
- Clean and modular code adhering to React best practices.
- State management via **React Context API** for efficient data handling.
- Uses **Material-UI** for consistent and user-friendly design.

### Additional Requirements
- **React Router** for routing between pages (job postings, candidates, assessments).
- Mock APIs or **local storage** used for data persistence (no backend required).
  
## Setup & Installation

### Prerequisites
- Node.js (v14 or above)
- npm (or yarn)

### Installation Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/manav747/web-hiring-platform.git
   ```
2. Navigate into the project directory:
   ```bash
   cd web-hiring-platform
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
   or, if using yarn:
   ```bash
   yarn install
   ```

4. Start the development server:
   ```bash
   npm start
   ```
   or:
   ```bash
   yarn start
   ```

   This will start the app on `http://localhost:3000`.

### Running Tests
To run tests (if applicable), you can use the following command:
```bash
npm test
```

## Deployment

The application has been deployed to [Vercel](#link-to-deployment), and can be accessed directly from the following URL:
- [Deployed Application](#link-to-deployment)

## Evaluation Criteria
- **Code quality**: The code is modular, clean, and follows best practices.
- **Functionality**: All features including job management, candidate tracking, and assessment creation work seamlessly.
- **UI/UX**: The application is intuitive, responsive, and user-friendly, utilizing Material-UI.
- **Performance**: The application is optimized for performance and handles data efficiently.
- **Error handling**: The app gracefully handles errors and provides feedback to users.

## Conclusion
This hiring platform is a user-friendly, full-featured React application built to streamline the hiring process. It enables efficient management of job postings, candidates, and assessments with intuitive interfaces for admins.

