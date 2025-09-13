async function extract(file) {
  return {
    doc_type: file.mimetype,
    file_size: file.size,
    created_time: new Date(file.lastModified || Date.now()).toISOString(),
    processed_time: new Date().toISOString(),
    original_filename: file.originalname,
  };
}

module.exports = { extract };
