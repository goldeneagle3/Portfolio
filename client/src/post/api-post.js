import {config,errorHandler} from '../config/config.js'



const createPost = async (credentials,post) => {
  try {
    let response = await fetch(config.ServerURI + "/posts",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization' : 'Bearer ' + credentials.t
      },
      body: post
    });
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const list = async (signal) => {
  try {
    let response = await fetch(config.ServerURI + "/posts",{
      method: 'GET',
      signal:signal,
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const topList = async (signal) => {
  try {
    let response = await fetch(config.ServerURI + "/top/posts",{
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
    let response = await fetch(config.ServerURI + "/posts/" + params.postId,{
      method: 'GET',
      signal: signal,

    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const update = async (params,credentials,post) => {
  try {
    let response = await fetch(config.ServerURI + "/posts/" + params.postId,{
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Authorization' : 'Bearer ' + credentials.t
      },
      body: post
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const remove = async (params,credentials) => {
  try {
    let response = await fetch(config.ServerURI + "/posts/" + params.postId,{
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
  createPost,
  list,
  topList,
  read,
  update,
  remove
}