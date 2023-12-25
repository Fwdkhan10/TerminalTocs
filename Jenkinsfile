pipeline {
    agent any

    environment {
        // Redefined environment variables
        DOCKER_CREDENTIALS_ID = credentials('dckr_pat_rOiA9akaPdaPa4uwz6fFQ060AcM')
        SOURCE_CODE_REPO = 'https://github.com/Fwdkhan10/TerminalTocs.git'
        IMAGE_NAME = 'bmi-calculator'
        DOCKER_USERNAME = 'fwdkhan10'
        DOCKER_REPO_NAME = 'terminaltocs'
        DOCKER_PWD = 'fawadahmad110801%40' // URL encoded password
        NOTIFICATION_LIST = 'fwdk91@gmail.com' // Your email recipients
    }

    stages {
        stage('Get Source Code') {
            steps {
                script {
                    checkout([$class: 'GitSCM', branches: [[name: 'main']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: SOURCE_CODE_REPO]]])
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
            emailext body: 'Build failed. Review details here: ${BUILD_URL}',
                    subject: 'Failure: Build #${BUILD_NUMBER}',
                    to: NOTIFICATION_LIST
        }
    }
}
