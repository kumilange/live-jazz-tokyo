const sendRes = (res, code, data, json = true) => {
  res.status(code).send(json ? JSON.stringify(data) : data);
};

module.exports = { sendRes };
