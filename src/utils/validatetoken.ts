export function validatetoken() {
    const token = localStorage.getItem("token");
    const expiration = localStorage.getItem("expiration");
    if (token && expiration) {
        const expirationTime = parseInt(expiration);
        if (expirationTime < new Date().getTime()) {
            localStorage.removeItem('token')
            localStorage.removeItem('expiration')
            return {expired: true}
        }
        else{
            return {expired: false}
        }
    }
}