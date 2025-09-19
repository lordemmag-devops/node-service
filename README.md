# Node.js Service with Docker and AWS Deployment

This project is a simple web app built with Node.js. It has two web pages:
- **Home page** (`/`): Shows "Hello, world!" to anyone who visits.
- **Secret page** (`/secret`): Asks for a username and password. If you enter the right ones, it shows a secret message.

The app is packaged in a **Docker container** (like a sealed box that runs the app) and deployed to an **AWS server** (a computer in the cloud) using **GitHub Actions** (a tool that automates deploying the app).

## What You Need
To run this project, you need:
- **Docker Desktop** (to run the app in a container).
- **Node.js** and **npm** (to run the app locally without Docker).
- An **AWS account** (to set up the server).
- A **GitHub account** (to store the code and automate deployment).
- A **Docker Hub account** (to store the Docker image).

## Project Files
Here’s what’s in the project folder:
- `server.js`: The main app code that runs the web server.
- `.env`: A file with secret settings (like the username and password). **Never share this file!**
- `Dockerfile`: Instructions for Docker to build the app’s container.
- `.dockerignore`: Tells Docker which files to skip (like secrets).
- `.github/workflows/deploy.yml`: Automates deploying the app to AWS.
- `README.md`: This file, explaining everything.

## How to Run Locally on Your Mac
Follow these steps to run the app on your computer.

### Step 1: Install Tools
1. **Install Docker Desktop**:
   - Go to [docker.com](https://www.docker.com/products/docker-desktop/) and download Docker Desktop for Mac.
   - Open the downloaded file, drag Docker to Applications, and run it.
   - Look for the whale icon in your menu bar (top of screen). It should be green when running.
2. **Install Node.js** (optional, for running without Docker):
   - Go to [nodejs.org](https://nodejs.org/) and download the LTS version.
   - Install it by following the prompts.
   - Check it worked by typing in Terminal:
     ```
     node --version
     npm --version
     ```

### Step 2: Get the Project
1. Open **Terminal** (search “Terminal” in Spotlight).
2. Go to a folder where you want the project:
   ```
   cd ~/Desktop
   ```
3. Clone the project from GitHub (replace `yourusername` with your GitHub username):
   ```
   git clone https://github.com/yourusername/node-service.git
   cd node-service
   ```

### Step 3: Set Up the .env File
1. Create a file called `.env` in the `node-service` folder.
2. Open it in TextEdit:
   ```
   open -e .env
   ```
3. Add these lines (use your own values for security):
   ```
   SECRET_MESSAGE=This is the secret!
   USERNAME=admin
   PASSWORD=supersecurepassword
   PORT=3000
   ```
4. Save and close.

### Step 4: Run Without Docker (Optional)
1. Install dependencies:
   ```
   npm install
   ```
2. Start the app:
   ```
   npm start
   ```
3. Open your browser to `http://localhost:3000` (see “Hello, world!”) or `http://localhost:3000/secret` (enter `admin`/`supersecurepassword`).

### Step 5: Run With Docker
1. Build the Docker image:
   ```
   docker build -t node-service .
   ```
2. Run the container:
   ```
   docker run -p 3000:3000 --env-file .env node-service
   ```
3. Test in your browser:
   - `http://localhost:3000` → “Hello, world!”
   - `http://localhost:3000/secret` → Enter `admin`/`supersecurepassword` to see the secret message.
   - Or use Terminal:
     ```
     curl http://localhost:3000/
     curl -u admin:supersecurepassword http://localhost:3000/secret
     ```

## Deploying to AWS
This project uses **GitHub Actions** to automatically deploy the app to an **AWS EC2 server**. Here’s how it’s set up:

### AWS Setup
1. **Create an EC2 Instance**:
   - Sign in to [aws.amazon.com](https://aws.amazon.com/).
   - Go to EC2 > Instances > Launch Instances.
   - Choose “Ubuntu Server 24.04 LTS,” `t2.micro` type (free tier).
   - Create a key pair (`node-key.pem`) and download it.
   - Allow ports 22 (SSH) and 3000 (app) in the security group.
2. **Set Up the Server**:
   - SSH into the server:
     ```
     ssh -i ~/Downloads/node-key.pem ubuntu@your-ec2-DNS
     ```
   - Install Docker:
     ```
     sudo apt update
     sudo apt install docker.io -y
     sudo usermod -aG docker deployuser
     ```
   - Log out and back in, then test: `docker ps`.

### GitHub Actions Setup
1. **Push Code to GitHub**:
   - Create a repository on GitHub (e.g., `node-service`).
   - Push your code:
     ```
     git add .
     git commit -m "Initial commit"
     git push origin main
     ```
2. **Add Secrets** in GitHub (Settings > Secrets and variables > Actions):
   - `DOCKER_USERNAME`: Your Docker Hub username.
   - `DOCKER_PASSWORD`: Your Docker Hub access token.
   - `SERVER_IP`: Your EC2 public IP.
   - `SERVER_USER`: `ubuntu`.
   - `SERVER_SSH_KEY`: Contents of `node-key.pem`.
   - `SECRET_MESSAGE`, `USERNAME`, `PASSWORD`: Match your `.env`.
3. **Workflow**: The `.github/workflows/deploy.yml` file builds the Docker image, pushes it to Docker Hub, and deploys it to AWS when you push to the `main` branch.

### Test the Deployed App
- Open your browser to `http://your-ec2-ip:3000/` → “Hello, world!”.
- Go to `http://your-ec2-ip:3000/secret` → Enter `admin`/`supersecurepassword`.
- Or use Terminal:
  ```
  curl http://your-ec2-ip:3000/
  curl -u admin:supersecurepassword http://your-ec2-ip:3000/secret
  ```

## Troubleshooting
- **Local errors**: Ensure Docker Desktop is running (whale icon green). Check `.env` exists.
- **Deployment errors**: Verify GitHub secrets and AWS security group (port 3000 open).
- Contact the project owner for help!

## License
This is an open-source project from "https://roadmap.sh/projects/dockerized-service-deployment" for learning purposes
