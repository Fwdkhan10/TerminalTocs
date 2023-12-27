pipeline {
    agent any

    environment {
        DOCKER_USERNAME = 'fwdkhan10'
        DOCKER_REPOSITORY = 'tocsterminal'
        DOCKER_IMAGE_NAME = 'bmi_calculator'
        DOCKER_PASSWORD = 'fawadahmad' // Use the correct credential ID for Docker Hub
        CONTAINER_NAME = 'my_container'
    }

    stages {
        stage('Clone from GitHub') {
            steps {
                // Clone the repository
                git branch: 'main', url: 'https://github.com/Fwdkhan10/TerminalTocs.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    sh "docker build -t ${DOCKER_IMAGE_NAME} ."
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    // Login to Docker Hub
                    sh "docker login --username ${DOCKER_USERNAME} --password ${DOCKER_PASSWORD}"

                    // Tag the Docker image
                    sh "docker tag ${DOCKER_IMAGE_NAME} ${DOCKER_USERNAME}/${DOCKER_REPOSITORY}"

                    // Push the Docker image to DockerHub
                    sh "docker push ${DOCKER_USERNAME}/${DOCKER_REPOSITORY}"
                }
            }
        }

        stage('Stop and Remove Existing Container') {
            steps {
script {
    // Stop and remove existing container if it exists
    if (sh(script: "docker inspect $CONTAINER_NAME > /dev/null 2>&1", returnStatus: true) == 0) {
        sh "docker stop $CONTAINER_NAME"
        sh "docker rm -f $CONTAINER_NAME"
    }
}
                    }
            }

        stage('Pull and Run Docker Container') {
            steps {
                script {
                    // deleting existing image if already exists
                    // sh "docker inspect ${DOCKER_USERNAME}/${DOCKER_REPOSITORY}:latest > /dev/null 2>&1 && docker rmi -f ${DOCKER_USERNAME}/${DOCKER_REPOSITORY}:latest || true"
                    // Pull the Docker image
                    sh "docker pull ${DOCKER_USERNAME}/${DOCKER_REPOSITORY}"

                    // Run the Docker container
                    sh "docker run -d --name ${CONTAINER_NAME} -p 80:80 ${DOCKER_USERNAME}/${DOCKER_REPOSITORY}"
                }
            }
        }
    }
}
