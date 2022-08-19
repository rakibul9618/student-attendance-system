const router = require('express').Router();
const userController = require('../controller/user');

/**
 * get user by Id
 * @method GET
 */

router.get('/:userId', userController.getUserById);

/**
 * change user values
 * @method PATCH
 */
router.patch('/:userId', userController.patchUserById);

/**
 * put a user by Id
 * @method PUT
 */
router.put('/:userId', userController.putUser);

/**
 * delete a user by Id
 * @method DELETE
 */
router.delete('/:userId', userController.deleteUserById);

/**
 *  get all users, include
 *  - filter
 *  - sort
 *  - pagination
 *  - select properties
 * @method GET
 * @route api/v1/users?sort["by","name"]
 *  @visibility private
 */
router.get('/', userController.getAllUsers);

/**
 * create a user
 * @method POST
 */
router.post('/', userController.createUser);

module.exports = router;
