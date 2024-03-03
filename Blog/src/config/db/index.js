const mongoose = require('mongoose');

// Function connect to DB
async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/f8_education_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect success');
    } catch (error) {
        console.log('Connect failed');
    }
}

module.exports = { connect };
