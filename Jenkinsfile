pipeline {
    agent any

    environment {
        // Redefined environment variables
        DOCKER_CREDENTIALS_ID = credentials('dckr_pat_rOiA9akaPdaPa4uwz6fFQ060AcM')
        SOURCE_CODE_REPO = 'https://github.com/Fwdkhan10/TerminalTocs.git'
        IMAGE_NAME = 'bmi-calculator'
        DOCKER_USERNAME = 'fwdkhan10'
        DOCKER_REPO_NAME = 'tocs'
        DOCKER_PWD = 'fawadahmad110801%40' // URL encoded password
        NOTIFICATION_LIST = 'fwdk91@gmail.com' // Your email recipients
        BACKUP_IMAGE_TAG = 'backup'
    }

    stages {
        stage('Get Source Code') {
            steps {
                script {
                    checkout([$class: 'GitSCM', branches: [[name: 'main']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: SOURCE_CODE_REPO]]])
                }
            }
        }

        stage('Prepare Rollback Image') {
            steps {
                script {
                    // Check if there is a previous build and a corresponding image
                    if (currentBuild.previousBuild) {
                        // Tag the previous successful image as a backup
                        bat "docker tag %DOCKER_USERNAME%/%DOCKER_REPO_NAME%:latest %DOCKER_USERNAME%/%DOCKER_REPO_NAME%:%BACKUP_IMAGE_TAG%"
                        bat "docker push %DOCKER_USERNAME%/%DOCKER_REPO_NAME%:%BACKUP_IMAGE_TAG%"
                    }
                }
            }
        }

        stage('Create Docker Image') {
            steps {
                script {
                    bat 'docker build -t %IMAGE_NAME% .'
                }
            }
        }

        stage('Upload to Docker Hub') {
            steps {
                script {
                    withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'dckr_pat_rOiA9akaPdaPa4uwz6fFQ060AcM', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PWD']]) {
                        bat 'docker login -u %DOCKER_USERNAME% -p %DOCKER_PWD%'
                        bat 'docker tag %IMAGE_NAME% %DOCKER_USERNAME%/%DOCKER_REPO_NAME%:%BUILD_NUMBER%'
                        bat 'docker push %DOCKER_USERNAME%/%DOCKER_REPO_NAME%:%BUILD_NUMBER%'
                    }
                }
            }
        }

    }

    post {
        success {
            emailext body: 'Build succeeded. Check it out here: ${BUILD_URL}',
                    subject: 'Success: Build #${BUILD_NUMBER}',
                    to: NOTIFICATION_LIST
        }
        failure {
            script {
                // Roll back to the backup image on failure
                bat "docker tag %DOCKER_USERNAME%/%DOCKER_REPO_NAME%:%BACKUP_IMAGE_TAG% %DOCKER_USERNAME%/%DOCKER_REPO_NAME%:latest"
                bat "docker push %DOCKER_USERNAME%/%DOCKER_REPO_NAME%:latest"
                // Here, you might need additional steps to redeploy the backup image
            }
            emailext body: 'Build failed. Rollback to previous version executed.\nDetails: ${BUILD_URL}',
                    subject: 'Failure: Build #${BUILD_NUMBER}, Rolled Back',
                    to: NOTIFICATION_LIST
        }
    }
}
