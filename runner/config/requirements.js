module.exports = {
  "context": [
    { "siteName" : 'accounts',
      "url" : "https://accounts.openknowl.com/public",
      "tagToTest" : '#info-welcometex',
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
};
