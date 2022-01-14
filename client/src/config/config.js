const config = {
  ServerURI : 'https://ensar-protfolio.herokuapp.com/api',
  // ClientURI : 'http://localhost:3000'
}

const isDev = false

const errorHandler = (error) => {
  if (isDev) {
    console.log(error)
  } else {
  }
}

export {config , errorHandler}