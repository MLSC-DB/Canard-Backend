import mongoose from "mongoose";

const phaseSchema = new mongoose.Schema({
  tasks: {
    type: Map,
    of: new mongoose.Schema({
      timeTaken: {
        type: Number,
        default: -1,
        enum: [
          -1, // not completed
          -2, // -2 when this is a minor task and has been completed
        ],
      },
      completedAt: {
        type: Date,
        default: null,
      },
      status: {
        type: String,
        enum: ["completed", "inProgress", "notStarted"],
        default: "notStarted",
      },
      type: {
        type: String,
        enum: ["major", "minor"],
        required: true,
      },
    }),
    default: () => new Map(),
  },
  timeTaken: {
    type: Number,
    default: -1,
  },
  completedAt: {
    type: Date,
    default: null,
  },
  taskOrder: {
    type: [Number],
    default: () => [],
  },
  currentTask: {
    type: Number,
    default: -1,
  },
  completedTasks: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["completed", "failed", "inProgress", "notStarted", "completedAll"],
    default: "notStarted",
  },
});

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    phase1: { type: phaseSchema, default: () => ({}) },
    phase2: { type: phaseSchema, default: () => ({}) },
    phase3: { type: phaseSchema, default: () => ({}) },
    currentPhase: {
      type: Number,
      default: -1,
      enum: [1, 2, 3, -1],
    },
    phaseOrder: {
      type: [Number],
      default: () => [],
    },
    completedPhases: {
      type: Number,
      default: 0,
    },
    totalScore: {
      type: Number,
      default: -1,
    },
    totalTimeTaken: {
      type: Number,
      default: -1,
    },
    completedAt: {
      type: Date,
      default: null,
    },
    state: {
      type: String,
      enum: ["busy", "idle", "completed", "blocked"],
      default: "idle",
    },
    callingCard: {
      type: Number,
      default: 0,
    },
    powerups: {
      type: [String],
      default: () => [],
    },
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.model("Team", teamSchema);

export default Team;
