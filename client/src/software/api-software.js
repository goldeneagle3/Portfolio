import {config,errorHandler} from '../config/config.js'



const create = async (params,credentials,software) => {
  try {
    let response = await fetch(config.ServerURI + "/softwares",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization' : 'Bearer ' + credentials.t
      },
      body: software
    });
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const listSoftwares = async (signal) => {
  try {
    let response = await fetch(config.ServerURI + "/softwares",{
      method: 'GET',
      signal:signal,
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}


// -------------------- READ and UPDATE APIs ------------------------

const read = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/softwares/" + params.softwareId,{
      method: 'GET',
      signal: signal,

    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const update = async (params,credentials,software) => {
  try {
    let response = await fetch(config.ServerURI + "/softwares/" + params.softwareId,{
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Authorization' : 'Bearer ' + credentials.t
      },
      body: software
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const remove = async (params,credentials) => {
  try {
    let response = await fetch(config.ServerURI + "/softwares/" + params.softwareId,{
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}




export {
  create,
  listSoftwares,
  read,
  update,
  remove
}