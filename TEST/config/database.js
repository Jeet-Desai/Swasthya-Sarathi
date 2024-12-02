import mongoose from 'mongoose';

export const connectDB = async (url) => {
    try {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.close();
        }
        const conn = await mongoose.connect(url);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export const closeDB = async () => {
    try {
        await mongoose.connection.close();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Error closing database:', error);
        throw error;
    }
}; 