const User = require('../../domain/entities/User');
const helper = require('../../utils/helper');
const passwordHelper = require('../../utils/passwordHelper');

class AuthUseCase {
    constructor({ userRepository, firebaseAuthService }) {
        this.userRepository = userRepository;
        this.firebaseAuthService = firebaseAuthService;
    }

    async auth(email, password) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) return { success: false, message: helper.lang("messages.not_found") };

        const isValid = await passwordHelper.comparePasswords(password, user.password);
        if (!isValid) return { success: false, message: "Incorrect password" };

        return { success: true, data: user };
    }

    async authSocial(socialToken, provider) {
        try {
            const decodedToken = await this.firebaseAuthService.verifySocialToken(socialToken);
            const { email, name, picture, user_id } = decodedToken;

            let user = await this.userRepository.findByEmail(email);

            if (!user) {
                const password = await passwordHelper.hashPassword(passwordHelper.randomPassword());
                const saveUser = new User({
                    name,
                    email,
                    photo: picture,
                    password: password,
                    facebookId: provider === 'facebook' ? user_id : null,
                    googleId: provider === 'google' ? user_id : null,
                    active: 1,
                });

                user = await this.userRepository.create(saveUser);
            }

            return user;
        } catch (error) {
            throw new Error(`Error logging with ${provider.toUpperCase()}: ${error.message}`);
        }
    }

    async register(body) {
        try {
            const { email, lastname, name, phone, password, dob, country, school, photo } = body;

            let user = await this.userRepository.findByEmail(email);

            if (user) return { success: false, message: helper.lang("messages.already_exists") };
            const passwordHash = await passwordHelper.hashPassword(password);
            const saveUser = new User({
                name,
                lastname,
                email,
                phone,
                password: passwordHash,
                dob,
                photo,
                country,
                school,
                active: 0
            });

            user = await this.userRepository.create(saveUser);

            return { success: true, data: user };
        } catch (error) {
            throw new Error('Error register: ' + error.message);
        }
    }

    async resetPassword(id, email, password) {
        try {
            const passwordHash = await passwordHelper.hashPassword(password);
            this.userRepository.update(id, { password: passwordHash })
            return { success: true, data: [] };
        } catch (error) {
            throw new Error('Error reset password: ' + error.message);
        }
    }

    async verifyEmail(id) {
        try {
            this.userRepository.update(id, { active: true })
            return { success: true, data: [] };
        } catch (error) {
            throw new Error('Error verified email: ' + error.message);
        }
    }
}

module.exports = AuthUseCase;