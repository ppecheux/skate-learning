import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function logout() {
    for (const cookie of ["accessToken", "refreshToken"]) {
        cookies.remove(cookie)
    }
    window.location.replace("/");
}