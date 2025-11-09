const BaseRepository = require('./BaseRepository');
const UserModel = require('../models/UserModel');

class UserRepository extends BaseRepository {
  constructor() {
    super(UserModel);
  }

  async findByEmail(email) {
    return this.findOne({ email });
  }
}

module.exports = UserRepository;