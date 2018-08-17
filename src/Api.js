let URL = 'http://viniciusaugusto.azurewebsites.net/api/'

export default {
  post (path, body) {
    const request = new Request(URL + path, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(body)
    })
    const promise = new Promise((resolve, reject) => {
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              resolve(data)
            })
          } else {
            response.json().then((error) => {
              reject(error)
            })
          }
        })
        .catch((erro) => {
          reject(erro)
        })
    })

    return promise
  },
  put (path, body) {
    const request = new Request(URL + path, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(body)
    })
    const promise = new Promise((resolve, reject) => {
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              resolve(data)
            })
          } else {
            response.json().then((error) => {
              reject(error)
            })
          }
        })
        .catch((erro) => {
          reject(erro)
        })
    })

    return promise
  },
  get (path) {
    const request = new Request(URL + path, {
      method: 'GET'
    })
    const promise = new Promise((resolve, reject) => {
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              resolve(data)
            })
          } else {
            response.json().then((error) => {
              reject(error)
            })
          }
        })
        .catch((erro) => {
          reject(erro)
        })
    })

    return promise
  },
  delete (path) {
    const request = new Request(URL + path, {
      method: 'DELETE'
    })
    const promise = new Promise((resolve, reject) => {
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              resolve(data)
            })
          } else {
            response.json().then((error) => {
              reject(error)
            })
          }
        })
        .catch((erro) => {
          reject(erro)
        })
    })

    return promise
  }
}
