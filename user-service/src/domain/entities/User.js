class User {
    constructor({ id, name, lastname, email, phone, password, dob, photo, country, school, graduation_year, facebookId, googleId, active, terms, roles }) {
        this.id = id;
        this.name = name;
        this.lastname = lastname || '';
        this.email = email;
        this.phone = phone || null;
        this.password = password;
        this.dob = dob ? new Date(dob).toISOString().split('T')[0] : null;
        this.photo = photo || null;
        this.country = country || null;
        this.school = school || null;
        this.graduation_year = graduation_year || null;
        this.facebookId = facebookId || null;
        this.googleId = googleId || null;
        this.active = active;
        this.terms = terms;
        this.roles = roles;
    }
}

module.exports = User;
