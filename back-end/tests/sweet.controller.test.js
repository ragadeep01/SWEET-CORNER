import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { createSweet, updateSweet, deleteSweet, getMySweets, allSweets } from '../controllers/sweetController.js';
import Crop from '../models/sweets.js';

// Helper to create mock response
const makeRes = () => {
  const res = {};
  res.status = jest.fn(function (code) {
    res.statusCode = code;
    return res;
  });
  res.json = jest.fn(function (data) {
    res.body = data;
    return res;
  });
  return res;
};

// Reset all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
  Crop.create = jest.fn();
  Crop.findOne = jest.fn();
  Crop.findById = jest.fn();
  Crop.findByIdAndUpdate = jest.fn();
  Crop.find = jest.fn();
});

describe('Sweet Controller (unit)', () => {
  describe('createSweet', () => {
    it('creates a sweet when data is valid', async () => {
      const req = {
        body: { name: 'Test', category: 'Cat', quantity: 1, price: 10 },
        user: { _id: 'seller123' },
        file: { filename: 'img.png' },
      };
      const created = { _id: 's1', name: 'Test', sellerId: 'seller123' };
      Crop.create.mockResolvedValue(created);
      Crop.findOne.mockResolvedValue(null);

      const res = makeRes();
      await createSweet(req, res);

      expect(Crop.create).toHaveBeenCalledWith(expect.objectContaining({ name: 'Test', image: '/uploads/img.png', sellerId: 'seller123' }));
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(created);
    });

    it('returns error when adding duplicate sweet', async () => {
      const req = {
        body: { name: 'Test', category: 'Cat', quantity: 1, price: 10 },
        user: { _id: 'seller123' },
        file: { filename: 'img.png' },
      };
      Crop.findOne.mockResolvedValue({ _id: 's1', name: 'Test', sellerId: 'seller123' });

      const res = makeRes();
      await createSweet(req, res);

      expect(Crop.findOne).toHaveBeenCalledWith({ name: 'Test', sellerId: 'seller123' });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Sweet already exists' });
    });
  });

  describe('updateSweet', () => {
    it('updates a sweet when authorized and data valid', async () => {
      Crop.findById.mockResolvedValue({ _id: 's1', sellerId: 'seller123' });
      Crop.findByIdAndUpdate.mockResolvedValue({ _id: 's1', name: 'Test', price: 20, quantity: 5 });

      const req = { params: { id: 's1' }, body: { price: 20, quantity: 5 }, user: { _id: 'seller123' } };
      const res = makeRes();
      await updateSweet(req, res);

      expect(Crop.findById).toHaveBeenCalledWith('s1');
      expect(Crop.findByIdAndUpdate).toHaveBeenCalledWith('s1', { price: 20, quantity: 5 }, expect.objectContaining({ new: true, runValidators: true }));
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('rejects update when not authorized', async () => {
      Crop.findById.mockResolvedValue({ _id: 's1', sellerId: 'seller123' });

      const req = { params: { id: 's1' }, body: { price: 25 }, user: { _id: 'otherSeller' } };
      const res = makeRes();
      await updateSweet(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Not authorized to update this sweet' });
      expect(Crop.findByIdAndUpdate).not.toHaveBeenCalled();
    });
  });

  describe('deleteSweet', () => {
    it('deletes a sweet when authorized', async () => {
      const mockDoc = { _id: 's1', sellerId: 'seller123', deleteOne: jest.fn().mockResolvedValue(undefined) };
      Crop.findById.mockResolvedValue(mockDoc);

      const req = { params: { id: 's1' }, user: { _id: 'seller123' } };
      const res = makeRes();
      await deleteSweet(req, res);

      expect(Crop.findById).toHaveBeenCalledWith('s1');
      expect(mockDoc.deleteOne).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Sweet deleted successfully' });
    });

    it('rejects delete when not authorized', async () => {
      const mockDoc = { _id: 's1', sellerId: 'seller123', deleteOne: jest.fn() };
      Crop.findById.mockResolvedValue(mockDoc);

      const req = { params: { id: 's1' }, user: { _id: 'otherSeller' } };
      const res = makeRes();
      await deleteSweet(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Not authorized to delete this sweet' });
      expect(mockDoc.deleteOne).not.toHaveBeenCalled();
    });
  });;
  
  describe('getMySweets & allSweets', () => {
    it('returns seller sweets', async () => {
      Crop.find.mockResolvedValue([{ name: 'A' }]);

      const res = makeRes();
      await getMySweets({ user: { _id: 's1' } }, res);

      expect(Crop.find).toHaveBeenCalledWith({ sellerId: 's1' });
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('returns all sweets', async () => {
      Crop.find.mockResolvedValue([{ name: 'X' }]);

      const res = makeRes();
      await allSweets({}, res);

      expect(Crop.find).toHaveBeenCalledWith({});
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});
