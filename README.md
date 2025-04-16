# Group 2 Project - G2 Medical Center

# How to Run This Project

This project is a full-stack web application with a React frontend and Node.js + Express backend.


## Installation Steps

### 1. Clone the project

```bash
git clone <your-repo-url>
cd <project-root>
```

### 2. Install dependencies

#### Backend (server)

```bash
cd server
npm install
```

#### Frontend (client)

```bash
cd ../client
npm install
```

### 3. Create `.env` file in `server/`

In the `server` directory, create a `.env` file:

```env
PORT=5000
MONGO_URL=mongodb://localhost:27017/g2medical
```

### 4. Create `uploads/` folder

Required for image uploads:

```bash
server/uploads/
```

### 5. Start the servers

#### Backend

```bash
cd server
npm start
```

#### Frontend (in a separate terminal)

```bash
cd client
npm start
```

## Features Implemented

### User Authentication (Login & Register)
- Login using email + password
- Sign up with:
  - Full name
  - Email
  - Password
  - Role (Admin / Employee / Client)
  - Avatar (optional, with preview)
- Passwords securely hashed using `bcrypt`
- Avatar images uploaded and stored using `multer`

### Avatar Management
- Avatar preview before sign-up
- Avatar stored in `/uploads` folder
- Default avatar shown if none is uploaded
- Ability to modify avatar after registration
- Avatar change updates across the system immediately

### Role-based Access
- Admin: sees admin-only options like Manage Jobs
- Employee: sees jobs and company info
- Client: basic access
- Guest: can browse Home only, sees default navbar and guest info

### Navbar Behavior
- Displays logged-in user's name and avatar
- Dropdown appears when avatar is clicked
- For guest: shows `guest` + default avatar
- For others: allows "Modify Avatar" and "Logout"

### Guest Browsing Mode
- No registration/login required
- Sees only public Home content
- Role-specific features hidden
- Label and avatar shown as guest

### Forgot Password (Reset)
- Dedicated page to reset password via email + new password
- No email verification needed
- Password updated directly

---

## Tech Stack

- **Frontend**: React, Bootstrap 5
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **File Upload**: `multer`
- **Password Security**: `bcrypt`
- **Routing**: React Router
- **State**: LocalStorage-based role and image management

---

## Pages Included

- `/login` – Login or switch to Sign Up
- `/home` – Public Home (dynamic content)
- `/register` – Full registration with avatar
- `/modify-avatar` – Update avatar with live preview
- `/forgot-password` – Reset password via email input

---

## Folder Structure Overview

```
client/
  ├── assets/           # Avatar images
  ├── components/       # Navbar, Footer
  ├── pages/            # Home, Login, Register, etc.
  └── App.js

server/
  ├── routes/           # auth.js (register/login)
  ├── models/           # User.js
  ├── uploads/          # Avatar images
  └── index.js          # Express config
```

---

## Tested Scenarios

- Avatar preview works correctly
- Default avatar shown when image not uploaded
- Guest access works independently of user system
- Navbar reflects role and identity properly
- Avatar modification triggers refresh without reload
- Password reset page validates and updates securely

---
# Backend API Overview (Express.js)

This project exposes a series of RESTful API endpoints under `/api/auth` to support authentication and avatar handling.

---

## Base URL
```
http://localhost:5000/api/auth
```

---

## Endpoints

### 1. `POST /register` – User Registration

Registers a new user with optional avatar upload.

**FormData Parameters:**

| Field      | Type     | Required | Description                      |
|------------|----------|----------|----------------------------------|
| fullName   | String   | ✅       | User's full name                 |
| email      | String   | ✅       | User's email                     |
| password   | String   | ✅       | Password (min 6 characters)      |
| type       | String   | ✅       | `admin` / `employee` / `client`  |
| image      | File     | ❌       | Optional avatar image            |

**Returns:**
```json
{ "message": "User registered successfully." }
```

---

### 2. `POST /login` – User Login

Authenticates user with email and password.

**Body (JSON):**
```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

**Returns:**
```json
{
  "user": {
    "fullName": "John Doe",
    "email": "user@example.com",
    "type": "admin",
    "image": "filename.png"
  }
}
```

---

### 3. `GET /avatar/:email` – Get Avatar by Email

Returns avatar file path if exists.

**Example:**
```
GET /api/auth/avatar/user@example.com
```

**Returns:**
```json
{ "avatarUrl": "/uploads/filename.png" }
```

If not found:

```json
{ "avatarUrl": null }
```

---

### 4. `POST /update-password` – Reset Password

Used in "Forgot Password" flow to update password.

**Body (JSON):**
```json
{
  "email": "user@example.com",
  "newPassword": "newpass123"
}
```

**Returns:**
```json
{ "message": "Password updated successfully." }
```

---

### 5. `POST /update-avatar` – Update Avatar

Allows logged-in user to replace their avatar.

**FormData Parameters:**

| Field | Type | Required | Description            |
|-------|------|----------|------------------------|
| email | String | ✅     | Email of the user      |
| image | File   | ✅     | New avatar image       |

**Returns:**
```json
{ "message": "Avatar updated successfully.", "image": "filename.png" }
```

---

## Login Page and Home Page
### **1. Purpose of the Website**
The website is designed to provide a seamless connection between patients and medical professionals. It can enable patients to obtain more information about Medical Centers and receive assistance. Users can easily sign in or sign up with their email address and password in this page. Also, the navbar on the top can direct them to some useful information about the Medical Center.

In the future, the Login Page will serve as the entry point for users who wish to access various healthcare-related services on Home Page. Such as:

- Booking medical appointments
- Accessing medical records
- Consulting with doctors
- Managing patient information


### **2. Bootstrap Components Used**
This login page incorporates various **Bootstrap 5** components to enhance its layout, responsiveness, and styling. Below is a list of Bootstrap components used:

### **Navbar**
- `.navbar` - Creates a responsive navigation bar.
- `.navbar-toggler` - Button to toggle navigation on mobile.
- `.collapse navbar-collapse` - Enables collapsing for smaller screens.

### **Form Elements**
- `.form-control` - Standard input fields for email and password.
- `.form-label` - Labels associated with form fields.
- `.mb-3` - Adds margin between form elements.

### **Buttons**
- `.btn` - Standard button styling.
- `.btn-custom` - Custom-styled buttons.
- `.w-100` - Ensures full-width buttons for responsiveness.

### **Card Layout**
- `.login-card` - Structured card layout for the login form.

### **Dropdown**
- `.dropdown` - Creates dropdown navigation for departments.
- `.dropdown-toggle` - Used to toggle the dropdown.
- `.dropdown-menu` - Container for dropdown options.

  ### Carousel for Announcements
- **`.carousel`**: Showcases the latest news and announcements in a dynamic slideshow format.
- **`.carousel-inner`**: Contains individual items within the carousel.
- **`.carousel-item`**: Represents each slide within the carousel.
- **`.carousel-control-prev` & `.carousel-control-next`**: Navigation arrows for moving to the previous or next slide.

### Cards for Doctor Profiles
- **`.card`**: Displays information about doctors including photos, specialties, and contact options.
- **`.card-img-top`**: Responsive image placement at the top of each card.
- **`.card-body`**: Container for text content within each card.
- **`.card-title` & `.card-text`**: For headings and additional information within cards.

### Alerts for Important Notices
- **`.alert`**: Provides significant alerts or warnings (e.g., medical advisories).
- **`.alert-warning`**: Specific styling for warning messages.
- **`.fade show`**: Transition effects for alert visibility.

### Modal for Detailed Messages
- **`.modal`**: Contains detailed messages from healthcare providers.
- **`.modal-dialog`**: Wraps the modal content.
- **`.modal-content`**: The content area which includes the header, body, and footer of the modal.
- **`.modal-header`, `.modal-body`, and `.modal-footer`**: Structure the content within the modal.

### Accordion for FAQs
- **`.accordion`**: Used for collapsible items which expand to show more content.
- **`.accordion-item`**: Each collapsible section within the accordion.
- **`.accordion-header` & `.accordion-collapse`**: Controls for expanding and collapsing accordion content.

### Progress Bar for Appointment Scheduling
- **`.progress`**: Visual indicator of progress, such as appointment completion rates.
- **`.progress-bar`**: The actual bar that represents the progress percentage.

### Navigation and Layout
- **`.navbar` and `.dropdown`**: For top-level navigation across different sections of the website.
- **`.container`, `.row`, and `.col`**: For structured layout and alignment of content.

### **Grid System & Utilities**
- `.container-fluid` - Full-width container for responsive design.
- `.row`, `.col` - Bootstrap's flexible grid system.
- `.text-center` - Centers text elements.
- `.mt-3`, `.text-start` - Adds margins and text alignment.

### **3. Future Enhancements**
- Implement the functionality of all interaction modules (such as buttons and links)

