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
                bat 'npm install'
                bat 'npx playwright install'
            }
        }
       stage('Run Tests') {
    steps {
        bat """
        set REGION=${params.REGION}
        npx playwright test
        """
    }
}

        stage('Generate Allure Report') {
            steps {
                bat 'npx allure generate ./allure-results --clean -o ./reports/allure'
            }
        }
        stage('Archive Report') {
            steps {
                archiveArtifacts artifacts: 'reports/allure/**', fingerprint: true
            }
        }
    }
}
