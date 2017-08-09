const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true}
}, {
  timestamps: true
});

commentSchema.methods.belongsTo = function commentBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};


const carSchema = new mongoose.Schema({
  model: { type: String, required: true },
  brand: { type: String, required: true },
  speed: { type: Number },
  acceleration: { type: Number },
  image: { type: String },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true},
  comments: [ commentSchema ]
});

carSchema.methods.belongsTo = function carBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};


module.exports = mongoose.model('Car', carSchema);
