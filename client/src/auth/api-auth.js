import {config,errorHandler} from './../config/config.js'


const signin = async (user) => {  
  try {    
    let response = await fetch(config.ServerURI + '/auth/signin', {      
      method: 'POST',      
      headers: {        
        'Accept': 'application/json',        
        'Content-Type': 'application/json'      
      },      
      body: JSON.stringify(user)    
    })    
    return await response.json()  
  } catch(error) {    
    errorHandler(error)
  }
}



const signout = async () => {  
  try {    
    let response = await fetch(config.ServerURI + '/auth/signout/', { method: 'GET' 
    })    
    return await response.json()  
  } catch(error) {    
    errorHandler(error)
  }
}

export { signin, signout }