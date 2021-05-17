import mongoose from 'mongoose';

export const blipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  description: {
    type: String,
    required: false,
    minlength: 10,
    maxlength: 2500,
  },
  ring: {
    type: String,
    enum: ['Adopt', 'Trial', 'Assess', 'Hold'],
    required: true,
  },
  quadrant: {
    type: String,
    enum: ['Programming Languages and Frameworks', 'Tools', 'Platforms', 'Techniques'],
    required: true,
  },
});

export const Blip = mongoose.model('Blip', blipSchema, 'blips');
