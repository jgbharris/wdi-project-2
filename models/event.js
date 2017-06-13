const mongoose = require('mongoose');
const s3 = require('../lib/s3');



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

const eventSchema = new mongoose.Schema({
  image: {type: String },
  name: { type: String, required: true },
  location: { type: String, required: true },
  lat: {type: Number, required: true },
  lng: {type: Number, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true},
  comments: [ commentSchema ],
  attendees: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
});

eventSchema
  .virtual('imageSRC')
  .get(function getImageSRC() {
    if(!this.image) return null;
    return `https://s3-eu-west-1.amazonaws.com/wdi-27-ldn-project-2/${this.image}`;
  });

eventSchema.pre('remove', function removeImage(next) {
  if(!this.image) return next();
  s3.deleteObject({ Key: this.image }, next);
});


eventSchema.methods.belongsTo = function eventBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};


module.exports = mongoose.model('Event', eventSchema);
