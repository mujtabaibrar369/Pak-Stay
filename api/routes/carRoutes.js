import express from 'express'; 
const router = express.Router();
import Car from '../models/Car.js';
// Add a new car (Admin)
router.post('/add', async (req, res) => {
  const { make, model, year, price_per_day, description, image_url } = req.body;
  try {
    const newCar = new Car({ make, model, year, price_per_day, description, image_url });
    await newCar.save();
    res.status(201).json(newCar);
  } catch (error) {
    res.status(400).json({ message: 'Error adding car', error });
  }
});

// Get all available cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find({ availability_status: true });
    res.status(200).json(cars);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching cars', error });
  }
});

export default  router;