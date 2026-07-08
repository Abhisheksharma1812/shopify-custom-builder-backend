const express = require('express');
const upload = require('../middleware/upload');
const { uploadBufferToCloudinary } = require('../utils/cloudinaryUpload');

const router = express.Router();

router.post(
  '/upload',
  upload.fields([
    { name: 'original_upload', maxCount: 1 },
    { name: 'merged_preview', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const originalFile = req.files?.original_upload?.[0];
      const previewFile = req.files?.merged_preview?.[0];

      if (!originalFile) {
        return res.status(400).json({ success: false, message: 'original_upload file is required' });
      }

      if (!previewFile) {
        return res.status(400).json({ success: false, message: 'merged_preview file is required' });
      }

      const timestamp = Date.now();

      const originalUpload = await uploadBufferToCloudinary({
        buffer: originalFile.buffer,
        folder: 'shopify-custom-builder/originals',
        publicId: `original-${timestamp}`
      });

      const previewUpload = await uploadBufferToCloudinary({
        buffer: previewFile.buffer,
        folder: 'shopify-custom-builder/previews',
        publicId: `preview-${timestamp}`
      });

      return res.json({
        success: true,
        uploaded_image_url: originalUpload.secure_url,
        merged_preview_url: previewUpload.secure_url
      });
    } catch (error) {
      console.error('Upload route error:', error);
      return res.status(500).json({ success: false, message: error.message || 'Upload failed' });
    }
  }
);

module.exports = router;
