const express = require('express')
const router = express.Router()
const carsController = require('../controllers/carsController')
const verifyJWT = require('../middleware/verifyJWT')

//router.use(verifyJWT)

router.route('/')
    .get(carsController.getAllCars)
    .post(verifyJWT,carsController.createNewCar)
    .patch(verifyJWT,carsController.updateCar)
    .delete(verifyJWT,carsController.deleteCar)

module.exports = router
