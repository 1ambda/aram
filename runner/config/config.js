module.exports = {
  "development": {
    "db": 'mongodb://test-id:test-pw@localhost/workspace',
    "mode": "development",
    "port": 3000,
    "requirements": [
      { "siteName" : 'accounts',
	"url" : "https://accounts.openknowl.com/public",
	"tagToTest" : '#info-welcometext',
	"action": 'knowlauth_restart.js' },
      { "siteName" : 'company',
	"url" : "https://company.openknowl.com/",
	"tagToTest" : '#sidebar' },
      { "siteName" : 'camp',
	"url" : "https://camp.openknowl.com/",
	"tagToTest" : '#carousel' },
      { "siteName" : 'planner',
	"url" : "https://planner.openknowl.com/home",
	"tagToTest" : 'link' },
      { "siteName" : 'story',
	"url" : "https://story.openknowl.com",
	"tagToTest" : '#welcome' }
    ]
  },
  
  "test": {
    "db": 'mongodb://test-id:test-pw@localhost/test',
    "mode": "test",
    'rootDir': '/home/anster/Github/force-revival'
  }
};
