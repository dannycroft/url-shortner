function responseProxy(response, config) {
  const presets = {
    status: 200,
    data: {},
    error: null,
  };
  const payload = Object.assign(presets, config);

  return response.status(payload.status).json(payload);
}

module.exports = responseProxy;
