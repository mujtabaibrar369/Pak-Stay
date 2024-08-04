import express from 'express';
const router = express.Router();
import Rental from '../models/Rental.js';  
import Car from '../models/Car.js';
// Rent a car (Client)
router.post('/rent', async (req, res) => {
  const { carId, userId, start_date, end_date } = req.body;
  try {
    const car = await Car.findById(carId);
    if (!car || !car.availability_status) {
      return res.status(400).json({ message: 'Car not available' });
    }
    
    const total_days = (new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24);
    const total_price = total_days * car.price_per_day;

    const newRental = new Rental({
      car: carId,
      user: userId,
      start_date,
      end_date,
      total_price
    });

    await newRental.save();
    car.availability_status = false;
    await car.save();

    res.status(201).json(newRental);
  } catch (error) {
    res.status(400).json({ message: 'Error renting car', error });
  }
});

export default router;