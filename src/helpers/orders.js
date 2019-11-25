import { apiAddress } from "./constants";

export const getAllOrders = () => {
    return new Promise((resolve, reject) => {
        fetch(apiAddress + 'orders/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem("jwtKey")
            },
        }).then(res => res.json())
            .then(res => {
                resolve(res);
            }).catch(err => reject(err));
    })

}
export const acceptOrder = (orderId) => {
    return new Promise((resolve, reject) => {
        fetch(apiAddress + 'orders/accept', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem("jwtKey")
            },
            body: JSON.stringify({ _id: orderId })
        }).then(res => res.json())
            .then(res => {
                if (res.result) resolve(res.result); else resolve(false);
            }).catch(err => reject(err));
    })
}
export const deliverOrder = (orderId) => {
    return new Promise((resolve, reject) => {
        fetch(apiAddress + 'orders/deliver', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem("jwtKey")
            },
            body: JSON.stringify({ _id: orderId })
        }).then(res => res.json())
            .then(res => {
                if (res.result) resolve(res.result); else resolve(false);
            }).catch(err => reject(err));
    })
}
export const addNewOrder = (name, quantity) => {
    return new Promise((resolve, reject) => {
        fetch(apiAddress + 'orders/addnew', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem("jwtKey")
            },
            body: JSON.stringify({ name, quantity })
        }).then(res => res.json())
            .then(res => {
                if (res.result) resolve(res.result); else resolve(false);
            }).catch(err => reject(err));
    })
}