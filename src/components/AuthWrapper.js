import kc from '../keycloak';
const AuthWrapper = ({ children }) => {
    kc.init({
     onLoad: "login-required",
     checkLoginIframe: true,
     pkceMethod: "S256"
 }).then((authenticated) => {
     if (!authenticated) {
        window.location.reload()
    } else {
        kc.loadUserProfile().then((profile) => {
            localStorage.setItem("username", profile.username)
            localStorage.setItem("firstname", profile.firstName)
            localStorage.setItem("email", profile.email)
            localStorage.setItem("token", kc.token)
        })
    }
 }).catch(console.error)

    return children
};

export default AuthWrapper;
