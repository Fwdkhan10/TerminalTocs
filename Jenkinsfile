// pipeline {
//     agent any

//     environment {
//         // Redefined environment variables
//         DOCKER_CREDENTIALS_ID = credentials('dckr_pat_rOiA9akaPdaPa4uwz6fFQ060AcM')
//         SOURCE_CODE_REPO = 'https://github.com/Fwdkhan10/TerminalTocs.git'
//         IMAGE_NAME = 'bmicalculator'
//         DOCKER_USERNAME = 'fwdkhan10'
//         DOCKER_REPO_NAME = 'tocsterminal'
//         DOCKER_PWD = 'fawadahmad110801%40' // URL encoded password
//         NOTIFICATION_LIST = 'fwdk91@gmail.com' // Your email recipients
//     }

//     stages {
//         stage('Get Source Code') {
//             steps {
//                 script {
//                     checkout([$class: 'GitSCM', branches: [[name: 'main']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: SOURCE_CODE_REPO]]])
//                 }
//             }
//         }

//         stage('Create Docker Image') {
//             steps {
//                 script {
//                     bat 'docker build -t %IMAGE_NAME% .'
//                 }
//             }
//         }

//         stage('Upload to Docker Hub') {
//             steps {
//                 script {
//                     withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'dckr_pat_rOiA9akaPdaPa4uwz6fFQ060AcM', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PWD']]) {
//                         bat 'docker login -u %DOCKER_USERNAME% -p %DOCKER_PWD%'
//                         bat 'docker tag %IMAGE_NAME% %DOCKER_USERNAME%/%DOCKER_REPO_NAME%:%BUILD_NUMBER%'
//                         bat 'docker push %DOCKER_USERNAME%/%DOCKER_REPO_NAME%:%BUILD_NUMBER%'
//                     }
//                 }
//             }
//         }

//     }

//     post {
//         success {
//             emailext body: 'Build succeeded. Check it out here: ${BUILD_URL}',
//                     subject: 'Success: Build #${BUILD_NUMBER}',
//                     to: NOTIFICATION_LIST
//         }
//         failure {
//             emailext body: 'Build failed. Review details here: ${BUILD_URL}',
//                     subject: 'Failure: Build #${BUILD_NUMBER}',
//                     to: NOTIFICATION_LIST
//         }
//     }
// }

pipeline {
    agent any

    environment {
        DOCKER_USERNAME = 'fwdkhan10'
        DOCKER_REPOSITORY = 'tocsterminal'
        DOCKER_IMAGE_NAME = 'bmi_calculator'
        DOCKER_PASSWORD = 'fawadahmad110801%40' // Use the correct credential ID for Docker Hub
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
