import { apiAddress } from "./constants";

const login = (email, pass) => {
    return new Promise((resolve, reject) => {
        fetch(apiAddress + 'users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, password: pass })
        }).then(res => res.json())
            .then(res => {
                localStorage.setItem("jwtKey", res.token);
                localStorage.setItem("loggedUser", JSON.stringify({ userId: res.userId, userRole: res.userRole }));
                resolve(res.msg === "success");
            }).catch(err => reject(err));
    })

}

export default login;