const express = require('express')
const User = require('./user') 
const router = express.Router()

// Read - Get all //
router.get('/', (req, res) => {
    User.find({}, (err, allUsers) => {
        if(err) {
            res.status(500).json({msg:err})
        } else {
            res.status(200).json(allUsers)
        }
    })
})
// Read One //
router.get('/:id', (req, res) => {
    User.findOne({_id: req.params.id}, (err, foundUser) => {
        if(err) {
            res.status(500).json({msg:err})
        } else {
            res.status(200).json(foundUser)
        }
    })
})
//Create//
router.post('/', (req, res) => {
    // create user obj//
    let user = new User()
    user.firstName = req.body.firstName
    user.lastName = req.body.lastName
    user.email = req.body.email
    // save to DB//
    user.save((err, newUser) => {
        if(err) {
            res.status(500).json({msg:err})
        } else {
            res.status(200).json({msg: 'Added new user', newUser})
        }
    })
})
// Update //
router.put('/:id', (req, res) => {
    User.find(req.params.id, (err, foundUser) => {
        if (err) {
            res.status(500).json({msg:err})
        } else {
            foundUser.firstName = req.body.firstName
            foundUser.lastName = req.body.lastName
            foundUser.email =  req.body.email
            // save to DB//
            foundUser.save((err, updatedUser) => {
                if(err) {
                    res.status(500).json({msg:err})
                } else {
                    res.status(200).json({msg: 'Updated user data successfully', updatedUser})
                }
            })
        }
    })
})
// Delete//
router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.status(500).json({msg:err})
        } else {
            res.status(200).json({msg: 'Deleted Successfully'})
        }
    })
})
// Delete //

module.exports = router