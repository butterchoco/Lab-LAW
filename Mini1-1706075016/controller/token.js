module.exports = (req, res, _) => {
  const { username, password, client_id, client_secret } = req.body;
  if (!username || !password || !client_id || !client_secret) {
    return ErrorInvalidRequest(res);
  }

  return res.json({
    access_token: "[40 karakter token]",
    expires_in: 300,
    token_type: "Bearer",
    scope: null,
    refresh_token: "[40 karakter token]",
  });
};
