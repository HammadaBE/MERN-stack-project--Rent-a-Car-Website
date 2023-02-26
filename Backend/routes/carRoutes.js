const express = require('express')
const router = express.Router()
const carsController = require('../controllers/carsController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(carsController.getAllCars)
    .post(carsController.createNewCar)
    .patch(carsController.updateCar)
    .delete(carsController.deleteCar)

module.exports = router
