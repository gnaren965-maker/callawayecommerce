pipeline {
    agent any
    parameters {
        choice(
            name: 'REGION',
            choices: ['US', 'Canada', 'Japan', 'Europe', 'South Pacific', 'Latin America and Other', 'Republic of Korea'],
            description: 'Select region to run Playwright tests'
        )
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/gnaren965-maker/callawayecommerce.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                sh 'npx playwright install'
            }
        }
        stage('Run Tests') {
            steps {
                sh "REGION=${params.REGION} npx playwright test"
            }
        }
        stage('Generate Allure Report') {
            steps {
                sh 'npx allure generate ./allure-results --clean -o ./reports/allure'
            }
        }
        stage('Archive Report') {
            steps {
                archiveArtifacts artifacts: 'reports/allure/**', fingerprint: true
            }
        }
    }
}
