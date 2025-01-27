
# **Job Posting Board with Email Automation**

This guide provides the setup instructions to run the project locally.

---

## **Setup Process**

### **Frontend Setup**
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

### **Backend Setup**

#### **Environment Configuration**
Create a `.env` file in the `backend` directory and configure the following variables:

```env
PORT=             # Specify the port number
GOOGLE_CLIENT_ID=""  # Add your Google OAuth Client ID
GOOGLE_CLIENT_SECRET=""  # Add your Google OAuth Client Secret
MONGODB_URI=""    # Add your MongoDB connection string
JWT_SECRET=""     # Specify your JWT secret key
JWT_TIMEOUT=""    # Set the JWT expiration time (e.g., "1h", "7d")
EMAIL=            # Add the email address for automation
APP_PASSWORD=     # Add the app password for the email account
```

#### **Run the Backend**
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Install `nodemon` for development purposes:
   ```bash
   npm install --save-dev nodemon
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

