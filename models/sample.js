import mongoose from 'mongoose';

const sampleSchema = new mongoose.Schema(
  {
    fName: { type: String, required: true },
    lName: { type: String, required: true },
    isHuman: { type: Boolean, required: true },
    identification: {
      type: {
        idType: { type: String, required: true },
        idNumber: { type: String, required: true },
        expiryDate: { type: Date },
      },
      required: true,
    },
    employmentHistory: [
      {
        employer: {
          employerName: { type: String, required: true },
          employerAddress: { type: String },
          employerTelephone: { type: String },
        },
        responsibilities: [
          { type: String, required: true },
        ],
        duration: { type: Number },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Sample', sampleSchema);
