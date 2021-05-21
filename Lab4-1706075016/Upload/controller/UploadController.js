const UploadController = (req, res) => {
  const files = req.files;

  if (!files)
    return res
      .status(400)
      .send({ error: "Masukkan beberapa file untuk mulai compress!" });

  res.send({ message: "Upload Success!" });
};

module.exports = UploadController;
