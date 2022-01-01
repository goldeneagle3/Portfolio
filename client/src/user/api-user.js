import {config,errorHandler} from '../config/config.js'



const create = async (user) =>{
  try {
    let response = await fetch(config.ServerURI + "/users",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const list = async(signal) =>{
  try {
    let response = await fetch(config.ServerURI + '/users',{
      method: 'GET',
      signal: signal,
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const read = async (params,credentials,signal) =>{
  try {
    let response = await fetch(config.ServerURI + "/users/" + params.userId, {
      method: "GET",
      signal: signal,
      headers: {
        'Accept': "application/json",
        'Content-Type': "application/json",
        'Authorization': "Bearer " + credentials.t,
      }
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const update = async (params,credentials,user) =>{
  try {
    let response = await fetch(config.ServerURI + "/users/" + params.userId, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type":"application/json",
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(user)
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const remove = async (params,credentials)=>{
  try {
    let response = await fetch(config.ServerURI + "/users/" + params.userId, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + credentials.t,
      }
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}



export {
  create,
  list,
  read,
  update,
  remove
}