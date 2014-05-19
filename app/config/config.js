module.exports = {
  "development": {
    "db": 'mongodb://planner:collector@localhost/workspace',
    "mode": "development",
    "port": 3000
    
  },
  
  "test": {
    "db": 'mongodb://test-id:test-pw@localhost/test',
    "mode": "test"
  },

  "production": {
    "db": 'mongodb://planner:collector@localhost/workspace',
    "mode": "production",
    "port": 3000
  }
};
