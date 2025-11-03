# Emraay Bank Application - Build, Deploy & Deployment Guide

## Overview
This guide provides step-by-step instructions to build, package, and deploy the Emraay Bank Java web application. We'll start with a **student-friendly manual deployment approach** to help you understand the fundamentals, then progress to **professional artifact repository deployment** using Nexus.

### 🎓 Learning Path
1. **Build** your Java application with Maven
2. **Manual Deployment** - Copy WAR file directly to Tomcat (understand the basics)
3. **Artifact Repository** - Learn about Nexus and professional deployment practices
4. **Automation** - Create scripts and CI/CD pipelines

This progressive approach helps you understand both the "how" and the "why" behind modern deployment practices!

## Prerequisites
- Java Development Kit (JDK) 17 or higher
- Apache Maven 3.6 or higher
- Nexus Repository Manager running on EC2
- Tomcat server running on EC2
- Access to both EC2 instances

## Step 0: Install Required Tools

### 0.1 Install Java Development Kit (JDK)
If you don't have Java installed, install OpenJDK 17:

**On Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install openjdk-17-jdk -y
```

**On CentOS/RHEL:**
```bash
sudo yum install java-17-openjdk-devel -y
```

**Verify Java Installation:**
```bash
java -version
javac -version
```

### 0.2 Install Apache Maven

#### Option A: Install Maven via Package Manager (Recommended for Students)

**On Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install maven -y
```

**On CentOS/RHEL:**
```bash
sudo yum install maven -y
```

**Verify Maven Installation:**
```bash
mvn -version
```

#### Option B: Manual Maven Installation (Advanced)

If you prefer to install Maven manually or need a specific version:

```bash
# Create Maven directory
sudo mkdir -p /opt/maven
cd /opt/maven

# Download Maven (check https://maven.apache.org/download.cgi for latest version)
sudo wget https://archive.apache.org/dist/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.tar.gz

# Extract Maven
sudo tar xzf apache-maven-3.9.6-bin.tar.gz

# Create symlink for easy access
sudo ln -s apache-maven-3.9.6 maven

# Set environment variables
echo 'export MAVEN_HOME=/opt/maven/maven' | sudo tee -a /etc/environment
echo 'export PATH=$MAVEN_HOME/bin:$PATH' | sudo tee -a /etc/environment

# Apply environment variables
source /etc/environment

# Verify installation
mvn -version
```

### 0.3 Configure Maven (Optional but Recommended)

Create Maven settings directory:
```bash
mkdir -p ~/.m2
```

Create a basic `settings.xml` file:
```bash
cat > ~/.m2/settings.xml << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 
          http://maven.apache.org/xsd/settings-1.0.0.xsd">
  
  <localRepository>${user.home}/.m2/repository</localRepository>
  
  <mirrors>
    <!-- Use Maven Central as default mirror -->
    <mirror>
      <id>central</id>
      <mirrorOf>*</mirrorOf>
      <name>Maven Central</name>
      <url>https://repo1.maven.org/maven2/</url>
    </mirror>
  </mirrors>
  
</settings>
EOF
```

### 0.4 Verify Complete Setup
Run these commands to ensure everything is properly installed:

```bash
# Check Java
java -version
echo "Java installation: ✅"

# Check Maven
mvn -version
echo "Maven installation: ✅"

# Test Maven with a simple command
mvn help:system
echo "Maven functionality: ✅"
```

You should see output similar to:
```
openjdk version "17.0.x" 2023-xx-xx
Apache Maven 3.9.x
Maven home: /usr/share/maven
Java version: 17.0.x, vendor: Eclipse Adoptium
```

🎉 **Great!** You now have Java and Maven installed and ready to build Java applications!

## Project Structure
```
emraay-bank-app/
├── pom.xml
├── src/
│   └── main/
│       ├── java/
│       │   └── com/
│       │       └── emraay/
│       │           └── bank/
│       │               ├── model/
│       │               │   ├── Customer.java
│       │               │   └── Transaction.java
│       │               ├── servlet/
│       │               │   ├── LoginServlet.java
│       │               │   └── DashboardServlet.java
│       │               └── service/
│       │                   └── CustomerService.java
│       └── webapp/
│           ├── WEB-INF/
│           │   └── web.xml
│           ├── css/
│           │   └── style.css
│           ├── js/
│           │   ├── main.js
│           │   ├── login.js
│           │   └── dashboard.js
│           ├── index.html
│           ├── login.jsp
│           └── dashboard.jsp
```

## Step 1: Build the Application

### 1.1 Navigate to Project Directory
```bash
git clone https://github.com/emraay-devops/emraay-bank-app.git
cd emraay-bank-app
```

### 1.2 Clean and Compile
```bash
mvn clean compile
```

### 1.3 Run Tests (Optional)
```bash
mvn test
```

### 1.4 Package Application
```bash
mvn clean package
```

This will create a WAR file in the `target/` directory: `emraay-bank-app.war`

## Step 2: Manual Deployment to Tomcat (Student-Friendly Approach)

### 2.1 Locate the WAR File
After building, you'll find the WAR file in the `target/` directory:
```bash
ls -la target/
# You should see: emraay-bank-app.war
```

### 2.2 Copy WAR File to Tomcat Server
**Option A: Using SCP (if Tomcat is on a remote server)**
```bash
# Copy WAR file to your Tomcat server
scp target/emraay-bank-app.war tomcat@your-tomcat-server-ip:/tmp/
```

**Option B: Direct Copy (if Tomcat is on the same machine)**
```bash
# Copy WAR file directly to Tomcat webapps directory
sudo cp target/emraay-bank-app.war /opt/tomcat/webapps/
```

### 2.3 Set Proper Permissions
```bash
# Set ownership to tomcat user
sudo chown tomcat:tomcat /opt/tomcat/webapps/emraay-bank-app.war

# Set appropriate permissions
sudo chmod 644 /opt/tomcat/webapps/emraay-bank-app.war
```

### 2.4 Restart Tomcat Service
```bash
sudo systemctl restart tomcat
```

### 2.5 Verify Manual Deployment
```bash
# Check Tomcat status
sudo systemctl status tomcat

# Check if application is deployed
ls -la /opt/tomcat/webapps/
# You should see:
# - emraay-bank-app.war (WAR file)
# - emraay-bank-app/ (extracted application directory)
```

## Step 3: Access Your Application

### 3.1 Open Application in Browser
Navigate to: `http://your-tomcat-server-ip:8080/emraay-bank-app/`

### 3.2 Test Login
- **Username**: `william.lycee`
- **Password**: `password123`

### 3.3 Verify Functionality
1. **Home Page**: Should display Emraay Bank welcome page
2. **Login Page**: Should show login form with demo credentials
3. **Dashboard**: Should display William Lycee's account information
4. **Account Balance**: Should show $9,573.00 CAD
5. **Transactions**: Should display 6 demo transactions

🎉 **Congratulations!** You've successfully deployed your first Java web application!

## Step 4: Understanding Artifact Repositories (Nexus)

Now that you've experienced manual deployment, let's learn about artifact repositories and why they're important in professional environments.

### 4.1 What is an Artifact Repository?
An artifact repository is a centralized storage system for software artifacts (like your WAR file). Think of it as a "library" where you can:
- Store your application versions
- Share artifacts with team members
- Download dependencies
- Track what versions are deployed where

### 4.2 Why Use Nexus Instead of Manual Copy?
- **Version Control**: Keep track of different versions
- **Team Collaboration**: Share artifacts with your team
- **Automation**: Enable CI/CD pipelines
- **Security**: Control who can access what
- **Dependencies**: Manage third-party libraries

### 4.3 Configure Maven for Nexus Deployment

#### 4.3.1 Update Maven Settings
Edit your Maven `settings.xml` file (usually located at `~/.m2/settings.xml`):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 
          http://maven.apache.org/xsd/settings-1.0.0.xsd">
  
  <servers>
    <server>
      <id>nexus</id>
      <username>admin</username>
      <password>your-nexus-password</password>
    </server>
  </servers>
  
  <mirrors>
    <mirror>
      <id>nexus</id>
      <mirrorOf>*</mirrorOf>
      <url>http://your-nexus-server-ip:8081/repository/maven-public/</url>
    </mirror>
  </mirrors>
  
</settings>
```

#### 4.3.2 Update Project POM for Nexus
Update the `distributionManagement` section in `pom.xml`:

```xml
<distributionManagement>
    <repository>
        <id>nexus</id>
        <name>Nexus Release Repository</name>
        <url>http://your-nexus-server-ip:8081/repository/maven-releases/</url>
    </repository>
    <snapshotRepository>
        <id>nexus</id>
        <name>Nexus Snapshot Repository</name>
        <url>http://your-nexus-server-ip:8081/repository/maven-snapshots/</url>
    </snapshotRepository>
</distributionManagement>
```

## Step 5: Deploy to Nexus Repository

### 5.1 Deploy to Nexus
```bash
mvn clean deploy
```

This command will:
- Clean the project
- Compile the source code
- Run tests
- Package the application
- Deploy the artifact to Nexus Repository

### 5.2 Verify Deployment in Nexus
1. Open Nexus web interface: `http://your-nexus-server-ip:8081`
2. Login with admin credentials
3. Navigate to **Browse** → **maven-releases**
4. Verify that `com.emraay.bank:emraay-bank-app:1.0.0` is listed

## Step 6: Deploy from Nexus to Tomcat

### 6.1 Download WAR from Nexus
On your Tomcat server (EC2 instance):

```bash
# Create deployment directory
sudo mkdir -p /opt/deployments
cd /opt/deployments

# Download WAR file from Nexus
wget http://your-nexus-server-ip:8081/repository/maven-releases/com/emraay/bank/emraay-bank-app/1.0.0/emraay-bank-app-1.0.0.war
```

### 6.2 Deploy to Tomcat
```bash
# Copy WAR file to Tomcat webapps directory
sudo cp emraay-bank-app-1.0.0.war /opt/tomcat/webapps/

# Set proper permissions
sudo chown tomcat:tomcat /opt/tomcat/webapps/emraay-bank-app-1.0.0.war
sudo chmod 644 /opt/tomcat/webapps/emraay-bank-app-1.0.0.war
```

### 6.3 Restart Tomcat Service
```bash
sudo systemctl restart tomcat
```

### 6.4 Verify Deployment
```bash
# Check Tomcat status
sudo systemctl status tomcat

# Check if application is deployed
ls -la /opt/tomcat/webapps/
```

You should see:
- `emraay-bank-app-1.0.0.war` (WAR file)
- `emraay-bank-app-1.0.0/` (extracted application directory)

## Step 7: Access Your Application (Nexus Deployment)

### 7.1 Open Application in Browser
Navigate to: `http://your-tomcat-server-ip:8080/emraay-bank-app-1.0.0/`

### 7.2 Test Login
- **Username**: `william.lycee`
- **Password**: `password123`

### 7.3 Verify Functionality
1. **Home Page**: Should display Emraay Bank welcome page
2. **Login Page**: Should show login form with demo credentials
3. **Dashboard**: Should display William Lycee's account information
4. **Account Balance**: Should show $9,573.00 CAD
5. **Transactions**: Should display 6 demo transactions

🎉 **Excellent!** You've now experienced both manual deployment and artifact repository deployment!

## Step 8: Automated Deployment Script

### 8.1 Create Deployment Script
Create a script `deploy.sh` for automated deployment:

```bash
#!/bin/bash

# Configuration
NEXUS_URL="http://your-nexus-server-ip:8081"
TOMCAT_HOME="/opt/tomcat"
APP_NAME="emraay-bank-app"
VERSION="1.0.0"

echo "Starting deployment process..."

# Step 1: Build application
echo "Building application..."
mvn clean package

if [ $? -ne 0 ]; then
    echo "Build failed!"
    exit 1
fi

# Step 2: Deploy to Nexus
echo "Deploying to Nexus..."
mvn deploy

if [ $? -ne 0 ]; then
    echo "Nexus deployment failed!"
    exit 1
fi

# Step 3: Download from Nexus
echo "Downloading from Nexus..."
wget -O ${APP_NAME}-${VERSION}.war \
    ${NEXUS_URL}/repository/maven-releases/com/emraay/bank/${APP_NAME}/${VERSION}/${APP_NAME}-${VERSION}.war

# Step 4: Deploy to Tomcat
echo "Deploying to Tomcat..."
sudo cp ${APP_NAME}-${VERSION}.war ${TOMCAT_HOME}/webapps/
sudo chown tomcat:tomcat ${TOMCAT_HOME}/webapps/${APP_NAME}-${VERSION}.war

# Step 5: Restart Tomcat
echo "Restarting Tomcat..."
sudo systemctl restart tomcat

# Step 6: Wait for deployment
echo "Waiting for deployment to complete..."
sleep 30

# Step 7: Verify deployment
echo "Verifying deployment..."
if curl -f http://localhost:8080/${APP_NAME}-${VERSION}/ > /dev/null 2>&1; then
    echo "Deployment successful!"
    echo "Application available at: http://your-tomcat-server-ip:8080/${APP_NAME}-${VERSION}/"
else
    echo "Deployment verification failed!"
    exit 1
fi

echo "Deployment completed successfully!"
```

### 8.2 Make Script Executable
```bash
chmod +x deploy.sh
```

### 8.3 Run Deployment Script
```bash
./deploy.sh
```

## Step 9: CI/CD Pipeline Integration

### 9.1 Jenkins Pipeline Example
Create a `Jenkinsfile` in your project root:

```groovy
pipeline {
    agent any
    
    environment {
        NEXUS_URL = 'http://your-nexus-server-ip:8081'
        TOMCAT_SERVER = 'your-tomcat-server-ip'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                sh 'mvn clean compile'
            }
        }
        
        stage('Test') {
            steps {
                sh 'mvn test'
            }
        }
        
        stage('Package') {
            steps {
                sh 'mvn clean package'
            }
        }
        
        stage('Deploy to Nexus') {
            steps {
                sh 'mvn deploy'
            }
        }
        
        stage('Deploy to Tomcat') {
            steps {
                sh '''
                    wget -O emraay-bank-app-1.0.0.war \
                        ${NEXUS_URL}/repository/maven-releases/com/emraay/bank/emraay-bank-app/1.0.0/emraay-bank-app-1.0.0.war
                    
                    scp emraay-bank-app-1.0.0.war tomcat@${TOMCAT_SERVER}:/tmp/
                    
                    ssh tomcat@${TOMCAT_SERVER} '
                        sudo cp /tmp/emraay-bank-app-1.0.0.war /opt/tomcat/webapps/
                        sudo chown tomcat:tomcat /opt/tomcat/webapps/emraay-bank-app-1.0.0.war
                        sudo systemctl restart tomcat
                    '
                '''
            }
        }
        
        stage('Health Check') {
            steps {
                sh '''
                    sleep 30
                    curl -f http://${TOMCAT_SERVER}:8080/emraay-bank-app-1.0.0/ || exit 1
                '''
            }
        }
    }
    
    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
```

## Step 10: Monitoring and Logging

### 10.1 Application Logs
Monitor Tomcat logs for application status:

```bash
# View Tomcat logs
sudo tail -f /opt/tomcat/logs/catalina.out

# View application-specific logs
sudo tail -f /opt/tomcat/logs/localhost.$(date +%Y-%m-%d).log
```

### 10.2 Health Check Script
Create a health check script `health-check.sh`:

```bash
#!/bin/bash

APP_URL="http://localhost:8080/emraay-bank-app-1.0.0/"
EXPECTED_STATUS="200"

echo "Performing health check..."

# Check if application responds
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" $APP_URL)

if [ "$HTTP_STATUS" = "$EXPECTED_STATUS" ]; then
    echo "✅ Application is healthy (HTTP $HTTP_STATUS)"
    exit 0
else
    echo "❌ Application health check failed (HTTP $HTTP_STATUS)"
    exit 1
fi
```

## Step 11: Troubleshooting

### 11.1 Common Issues

#### Build Failures
```bash
# Check Java version
java -version

# Check Maven version
mvn -version

# Clean Maven cache
mvn clean
```

#### Deployment Failures
```bash
# Check Tomcat status
sudo systemctl status tomcat

# Check Tomcat logs
sudo tail -f /opt/tomcat/logs/catalina.out

# Check application logs
sudo tail -f /opt/tomcat/logs/localhost.$(date +%Y-%m-%d).log
```

#### Nexus Connection Issues
```bash
# Test Nexus connectivity
curl -I http://your-nexus-server-ip:8081

# Check Maven settings
cat ~/.m2/settings.xml
```

### 11.2 Rollback Procedure
If deployment fails, rollback to previous version:

```bash
# Stop Tomcat
sudo systemctl stop tomcat

# Remove current deployment
sudo rm -rf /opt/tomcat/webapps/emraay-bank-app-1.0.0*

# Deploy previous version (if available)
sudo cp /opt/backups/emraay-bank-app-previous.war /opt/tomcat/webapps/

# Start Tomcat
sudo systemctl start tomcat
```

## Step 12: Security Considerations

### 12.1 Application Security
- Change default passwords
- Use HTTPS in production
- Implement proper authentication
- Regular security updates

### 12.2 Server Security
- Configure firewall rules
- Use SSH keys for authentication
- Regular system updates
- Monitor access logs

## Conclusion

This guide provides a complete deployment pipeline for the Emraay Bank application:

1. **Build**: Maven compilation and packaging
2. **Package**: WAR file creation
3. **Deploy to Nexus**: Artifact storage and management
4. **Deploy to Tomcat**: Application deployment on EC2
5. **Verify**: Health checks and monitoring

The application is now ready for production use with proper CI/CD integration, monitoring, and security measures in place.

## Next Steps
- Set up automated backups
- Configure SSL certificates
- Implement monitoring and alerting
- Set up log aggregation
- Configure load balancing (if needed)
- Implement blue-green deployments
