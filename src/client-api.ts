import { Router } from 'express';
import {
  studyServiceList,
  studyServiceCreate,
  studyServiceGet,
  studyServiceUpdate,
  studyServiceDelete,
  studyServiceSummary
} from './sdk-client';

const router = Router();

// List all studies
router.get('/studies', async (_req, res) => {
  const { data, error } = await studyServiceList();
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// Get study by ID
router.get('/studies/:id', async (req, res) => {
  const { data, error } = await studyServiceGet({
    path: { id: req.params.id }
  });
  if (error) return res.status(404).json({ error });
  res.json(data);
});

// Create study
router.post('/studies', async (req, res) => {
  const { data, error } = await studyServiceCreate({
    body: req.body
  });
  if (error) return res.status(400).json({ error });
  res.status(201).json(data);
});

// Update study
router.patch('/studies/:id', async (req, res) => {
  const { data, error } = await studyServiceUpdate({
    path: { id: req.params.id },
    body: req.body
  });
  if (error) return res.status(404).json({ error });
  res.json(data);
});

// Delete study
router.delete('/studies/:id', async (req, res) => {
  const { data, error } = await studyServiceDelete({
    path: { id: req.params.id }
  });
  if (error) return res.status(404).json({ error });
  res.json(data);
});

// Summary
router.get('/summary', async (_req, res) => {
  const { data, error } = await studyServiceSummary();
  if (error) return res.status(500).json({ error });
  res.json(data);
});

export default router;