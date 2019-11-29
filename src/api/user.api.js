import request from '../utils/request'

export function login(credential){
    return request({
        method: 'post',
        url:'/login',
        data: credential
    })
}

export function getUserInfo(){
    return request({
        method: 'get',
        url: '/users-info'
    })
}

export function getUser(){
    return request({
        method: 'get',
        url: '/users'
    })
}

export function addUser(data){
    return request({
        method: 'post',
        url: 'users/store',
        data
    })
}

export function logout(){
    return request({
        method: 'post',
        url: '/logout'
    })
}