pipeline {
    agent any

    environment {
        DOCKER_USERNAME = 'fwdkhan10'
        DOCKER_REPOSITORY = 'tocsterminal'
        DOCKER_IMAGE_NAME = 'bmi_calculator'
        DOCKER_PASSWORD = 'fawadahmad'
        CONTAINER_NAME = 'my_container'
    }

    stages {
        stage('Clone Source Code') {
            steps {
                // Clone the main branch of the repository
                git branch: 'main', url: 'https://github.com/Fwdkhan10/TerminalTocs.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Building the Docker image from Dockerfile
                    sh "docker build -t ${DOCKER_USERNAME}/${DOCKER_IMAGE_NAME} ."
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    // Secure login to Docker Hub
                    sh "echo ${DOCKER_PASSWORD} | docker login --username ${DOCKER_USERNAME} --password-stdin"

                    // Tagging and pushing the Docker image to Docker Hub
                    sh "docker tag ${DOCKER_USERNAME}/${DOCKER_IMAGE_NAME} ${DOCKER_USERNAME}/${DOCKER_REPOSITORY}:${BUILD_NUMBER}"
                    sh "docker push ${DOCKER_USERNAME}/${DOCKER_REPOSITORY}:${BUILD_NUMBER}"
                }
            }
        }

        stage('Update Docker Container') {
            steps {
                script {
                    // Check if the container exists and stop/remove it
                    if (sh(script: "docker container inspect $CONTAINER_NAME > /dev/null 2>&1", returnStatus: true) == 0) {
                        sh "docker stop $CONTAINER_NAME"
                        sh "docker rm $CONTAINER_NAME"
                    }

                    // Pull the latest Docker image and run the container
                    sh "docker pull ${DOCKER_USERNAME}/${DOCKER_REPOSITORY}:${BUILD_NUMBER}"
                    sh "docker run -d --name ${CONTAINER_NAME} -p 80:80 ${DOCKER_USERNAME}/${DOCKER_REPOSITORY}:${BUILD_NUMBER}"
                }
            }
        }
    }
}
