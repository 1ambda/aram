module.exports = {
  "development": {
    "db": 'mongodb://planner:collector@localhost/workspace',
    "mode": "development",
    "port": 3000
    
  },
  
  "test": {
    "db": 'mongodb://planner:collector@localhost/workspace',
    "mode": "test"
  },

  "production": {
    "db": 'mongodb://planner:collector@localhost/workspace',
    "mode": "production",
    "port": 3000
  }
};
