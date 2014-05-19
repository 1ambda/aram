module.exports = {
  "development": {
    "db": 'mongodb://planner:collector@localhost/workspace',
    "mode": "development",
    "port": 3000
    
  },
  
  "test": {
    "db": 'mongodb://test-id:test-pw@localhost/test',
    "mode": "test",
    'rootDir': '/home/anster/Github/force-revival'
  },

  "production": {
    "db": 'mongodb://planner:collector@localhost/workspace',
    "mode": "production",
    "port": 3000
  }
};
