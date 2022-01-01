import {config,errorHandler} from '../config/config.js'



const create = async (credentials,book) => {
  try {
    let response = await fetch(config.ServerURI + "/books",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization' : 'Bearer ' + credentials.t
      },
      body: book
    });
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const listBooks = async (signal) => {
  try {
    let response = await fetch(config.ServerURI + "/books",{
      method: 'GET',
      signal:signal,
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}



// -------------------- READ and UPDATE APIs ------------------------

const read = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/books/" + params.bookId,{
      method: 'GET',
      signal: signal,

    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const update = async (params,credentials,book) => {
  try {
    let response = await fetch(config.ServerURI + "/books/" + params.bookId,{
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Authorization' : 'Bearer ' + credentials.t
      },
      body: book
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const remove = async (params,credentials) => {
  try {
    let response = await fetch(config.ServerURI + "/books/" + params.bookId,{
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
  listBooks,
  read,
  update,
  remove
}