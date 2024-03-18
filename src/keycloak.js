import Keycloak from 'keycloak-js'

const keycloak = new Keycloak({
    "url": "http://localhost:8081/",
    "realm": "powerchainger",
    "clientId": "powerchainger-frontend-client"
})
export default keycloak