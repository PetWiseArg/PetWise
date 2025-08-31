import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: dbjiwrxhg
  api_key: 976775272596255
  api_secret: aBBlOGr4Iy6WeLitQazBqsTHqkI
});

export default async function handler(req, res) {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'petwise/',
      max_results: 100
    });

    const photos = result.resources.map(photo => ({
      url: photo.secure_url,
      username: photo.context?.custom?.username || 'Anónimo',
      public_id: photo.public_id
    }));

    res.status(200).json(photos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
