import express from 'express';
const router = express.Router();

router.post('', (req, res) => {
  return res.json({ accessToken: 'kjasdhaskjdhk' });
});

export default router;
