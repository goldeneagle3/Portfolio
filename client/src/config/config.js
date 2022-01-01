const config = {
  ServerURI : 'http://localhost:5000/api',
  ClientURI : 'http://localhost:3000'
}

const isDev = false

const errorHandler = (error) => {
  if (isDev) {
    console.log(error)
  } else {
  }
}

export {config , errorHandler}