pipeline {
  agent {
    // This image provides everything needed to run Cypress
    docker {
      image 'cypress/base:latest'
    //   args '-u root:root'
    }
  }

  stages {
    stage('build') {
      //   environment {
      //     // We will be recording test results and video on Cypress dashboard
      //     // to record we need to set an environment variable
      //     // we can load the record key variable from credentials store
      //     // see https://jenkins.io/doc/book/using/using-credentials/
      //     CYPRESS_RECORD_KEY = credentials('cypress-example-kitchensink-record-key')
      //   }

      steps {
        echo "Running build ${env.BUILD_ID} on ${env.JENKINS_URL}"
        // dir("my-app/") {
          sh 'npm ci'
          sh 'npm run cypress:verify'
          //   sh 'npm start'
          //   sh 'npm run cy:run'
          //   sh "npm run test:ci:record"
        // }
      }
    }

      stage('start-server') {
        steps {
          // Start local server in the background
          // we will shut it down in "post" command block
          sh 'nohup npm run start &'
        }
      }

      // This stage runs end-to-end tests, and each agent uses the workspace
      // from the previous stage
      stage('execute-parallel-tests') {
        environment {
          // We will be recording test results and video on Cypress dashboard
          // to record we need to set an environment variable
          // we can load the record key variable from credentials store
          // see https://jenkins.io/doc/book/using/using-credentials/
          CYPRESS_RECORD_KEY = credentials('cypress-record-key')
          // because parallel steps share the workspace they might race to delete
          // screenshots and videos folders. Tell Cypress not to delete these folders
          CYPRESS_trashAssetsBeforeRuns = 'false'
        }

        // https://jenkins.io/doc/book/pipeline/syntax/#parallel
        parallel {
          // start several test jobs in parallel, and they all
          // will use Cypress Dashboard to load balance any found spec files
          stage('testing-a') {
            steps {
              echo "Running build ${env.BUILD_ID}"
              sh "npm run cypress:run:record"
            //   sh "npm run e2e"
            //   sh "npm run e2e:record:parallel"
            }
          }
        }
      }
  }

    //   post {
    //     // Shutdown the server running in the background
    //     always {
    //       echo 'Stopping local server'
    //       sh 'pkill -f http-server'
    //     }
    //   }
  }