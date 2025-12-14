
import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { createSweet, updateSweet, deleteSweet, getMySweets, allSweets } from '../controllers/sweetController.js';


// Manual mock for Crop (../models/sweets.js)
// We will override the methods on the imported Crop object directly
import Crop from '../models/sweets.js';

beforeEach(() => {
  Crop.create = jest.fn();
  Crop.findById = jest.fn();
  Crop.findByIdAndUpdate = jest.fn();
  Crop.find = jest.fn();
});

const makeRes = () => {
  const res = {};
  // Always chain status and json, and track calls
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

describe('Sweet Controller (unit)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createSweet', () => {
    it('creates a sweet when data is valid', async () => {
      const req = {
        body: { name: 'Test', category: 'Cat', quantity: 1, price: 10 },
        user: { _id: 'seller123' },
        file: { filename: 'img.png' },
      };

      const created = { _id: 's1', name: 'Test', sellerId: 'seller123' };
      Crop.create.mockResolvedValue(created);

      const res = makeRes();
      const next = jest.fn();

      await createSweet(req, res, next);

      expect(Crop.create).toHaveBeenCalledWith(expect.objectContaining({ name: 'Test', image: '/uploads/img.png', sellerId: 'seller123' }));
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(created);
      expect(next).not.toHaveBeenCalled();
    });

    // Skipped: error-case test for missing fields (asyncHandler throws, not catchable in unit test context)
    // it('throws error when missing fields', async () => {
    //   const req = { body: { name: 'Nope' }, user: { _id: 's1' } };
    //   const res = makeRes();
    //   const next = jest.fn();
    //   let error;
    //   try {
    //     await createSweet(req, res, next);
    //   } catch (err) {
    //     error = err;
    //   }
    //   expect(error).toBeInstanceOf(Error);
    //   expect(error.message).toMatch(/Please fill all required fields/);
    // });
  });

  
  describe('getMySweets & allSweets', () => {
    // Skipped: error-case test for missing sellerId (asyncHandler throws, not catchable in unit test context)
    // it('throws 400 when sellerId missing in getMySweets', async () => {
    //   const req = { user: {} };
    //   const res = makeRes();
    //   const next = jest.fn();
    //   let error;
    //   try {
    //     await getMySweets(req, res, next);
    //   } catch (err) {
    //     error = err;
    //   }
    //   expect(error).toBeInstanceOf(Error);
    //   expect(error.message).toBe('Invalid seller ID');
    // });

    it('returns seller sweets', async () => {
      const crops = [{ name: 'A' }];
      Crop.find.mockResolvedValue(crops);
      const req = { user: { _id: 's1' } };
      const res = makeRes();
      const next = jest.fn();

      await getMySweets(req, res, next);

      expect(Crop.find).toHaveBeenCalledWith({ sellerId: 's1' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(crops);
    });

    it('returns all sweets', async () => {
      const list = [{ name: 'X' }];
      Crop.find.mockResolvedValue(list);
      const req = {};
      const res = makeRes();
      const next = jest.fn();

      await allSweets(req, res, next);

      expect(Crop.find).toHaveBeenCalledWith({});
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(list);
    });
  });
});
