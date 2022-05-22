import mongoose, { Schema } from 'mongoose'

const schema = new Schema({
    // User ID
    _id: String,
})

const name = 'instanceTracker'

export default mongoose.models[name] || mongoose.model(name, schema)