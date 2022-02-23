import fetch from "node-fetch";

class SafeRequest {
  constructor() {}
  async fetch(url) {
    // bff 自己的返回规范
    let result = {
      code: 0,
      message: "",
      data: null
    };
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => res.json())
        .then(res => {
          result.data = res;
          resolve(result);
        })
        .catch(error => {
          result.code = 1;
          result.message = error.message;
          result.data = [
          ];
          resolve(result);
          //   reject(error);
        });
    });
  }
}

export default SafeRequest;
