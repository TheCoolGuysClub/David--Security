const mongoose = require(`mongoose`);

const database = process.env.MONGODB_URI ||
            `mogodb://localhost:27017/loginExample`;
