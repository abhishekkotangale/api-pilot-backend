const axios = require("axios");

async function sendHttpRequest({ url, method, headers, body }) {
  const start = Date.now();

  console.log(url);

  try {
    const response = await axios({
      url,
      method,
      headers,
      data: body
    });

    console.log(response ,"=========================================")

    const time = Date.now() - start;
    const size = JSON.stringify(response.data).length;

    return {
      status: response.status,
      responseTime: time,
      size,
      data: response.data,
      headers: response.headers
    };
  } catch (err) {
    console.log(err, "--------------");

    const time = Date.now() - start;

    return {
      status: err.response?.status || 500,
      responseTime: time,
      size: 0,
      data: err.response?.data || { error: "Request Failed" },
      headers: err.response?.headers || {}
    };
  }
}

module.exports = sendHttpRequest;
