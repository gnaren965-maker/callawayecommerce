pipeline {
    agent any

    parameters {
        choice(
            name: 'REGION',
            choices: ['US', 'Canada', 'Japan', 'Europe', 'South Pacific', 'Latin America and Other', 'Republic of Korea'],
            description: 'Select region to run Playwright tests'
        )

        choice(
            name: 'HEAD_MODE',
            choices: ['headless', 'headed'],
            description: 'Run browser in headless or headed mode'
        )

        string(
            name: 'TESTCASE',
            defaultValue: '',
            description: 'Optional: specify test file, line number, or test title (leave blank to run all)'
        )
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/gnaren965-maker/callawayecommerce.git'
            }
        }

        stage('Clean Old Reports') {
            steps {
                bat '''
                if exist allure-results rmdir /s /q allure-results
                if exist allure-report rmdir /s /q allure-report
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
                bat 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {

                    def testCommand = "npx playwright test"

                    if (params.TESTCASE?.trim()) {
                        testCommand += " ${params.TESTCASE}"
                    }

                    if (params.HEAD_MODE == 'headed') {
                        testCommand += " --headed"
                    }

                    bat """
                    set REGION=${params.REGION}
                    ${testCommand} --reporter=line,allure-playwright || exit 0
                    """
                }
            }
        }

        stage('Generate Allure Report') {
            steps {
                bat 'npx allure generate allure-results --clean -o allure-report'
            }
        }
    }

    post {
        always {

            allure([
                includeProperties: false,
                jdk: '',
                results: [[path: 'allure-results']]
            ])

            archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true
        }
    }
}