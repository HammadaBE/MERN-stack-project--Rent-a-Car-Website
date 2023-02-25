const User = require('../models/User')
const Note = require('../models/Note')
const Car = require('../models/Car')
const bcrypt = require('bcrypt')

// @desc Get all cars
// @route GET /cars
// @access Private
const getAllCars = async (req, res) => {
    // Get all cars from MongoDB
    const cars = await Car.find().lean()

    // If no cars 
    if (!cars?.length) {
        return res.status(400).json({ message: 'No cars found' })
    }

    res.json(cars)
}
 
// @desc Create new car
// @route POST /cars
// @access Private
const createNewCar = async (req, res) => {
    const {registration, brand, model, color, type, year } = req.body

    // Confirm data
    if (!registration || !brand || !model || !color || !type || !year) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate car 
    const duplicate = await Car.findOne({ registration }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate registration' })
    }

    

    // Create and store new user 
    const car = await Car.create(carObject)

    if (car) { //created 
        res.status(201).json({ message: `New car  ${registration} ${brand} ${model} ${color} ${year}  added` })
    } else {
        res.status(400).json({ message: 'Invalid car data received' })
    }
}

// @desc Update a car
// @route PATCH /car
// @access Private
const updateCar = async (req, res) => {
    const { registration, brand, model, color, type, year } = req.body

    // Confirm data 
    if (!registration || !brand || !model || !color|| !type || !year) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Does the car exist to update?
    const car = await Car.findById(registration).exec()

    if (!car) {
        return res.status(400).json({ message: 'Car not found' })
    }

    // Check for duplicate 
    const duplicate = await Car.findOne({ registration }).collation({ locale: 'en', strength: 2 }).lean().exec()

    // Allow updates to the original user car
    if (duplicate && duplicate?.registration.toString() !== registration) {
        return res.status(409).json({ message: 'Duplicate car' })
    }

    car.registration = registration
    car.brand = brand
    car.model = model
    car.color = color
    car.type = type
    car.year = year

    

    const updatedCar = await car.save()

    res.json({ message: `${updatedCar.brand} ${updatedCar.model} ${updatedCar.registration}  updated` })
}

// @desc Delete a car
// @route DELETE /cars
// @access Private
const deleteCar = async (req, res) => {
    const { registration } = req.body

    // Confirm data
    if (!registration) {
        return res.status(400).json({ message: 'Car registration Required' })
    }

    // Does the car still have assigned notes?
    const note = await Note.findOne({ car: registration }).lean().exec()
    if (note) {
        return res.status(400).json({ message: 'Car has assigned notes' })
    }

    // Does the car exist to delete?
    const car = await Car.findById(registration).exec()

    if (!car) {
        return res.status(400).json({ message: 'Car not found' })
    }

    const result = await car.deleteOne()

    const reply = `Car ${result.brand} ${result.color} with Registration ${result.registration} deleted`

    res.json(reply)
}

module.exports = {
    getAllCars,
    createNewCar,
    updateCar,
    deleteCar
}