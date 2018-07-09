const githubURL = 'https://api.github.com/users';
const githubRepos = 'https://api.github.com/repositories?since=1000';

var axios = require('axios');

var appRouter = function(app) {
  // query Github API for list of repositories
  app.get('/repos', function (req, response) {
    axios.get(githubRepos)
    .then(res=> {
      var dict = {};
      // remove unnecessary information
      // front end only needs username, avatar, followers
      for (var repo in res.data) {
        if(res.data[repo].private == false) {
          var username = res.data[repo].owner.login;
          var githubUser = {
            "username": res.data[repo].owner.login,
            "avatar": res.data[repo].owner.avatar_url,
            "followers": res.data[repo].owner.followers_url
          }
          dict[username] = githubUser;
        }
      }
      response.send(dict);
    })
    .catch(err=>{
      response.send({message: `Error`, error: err});
    })
  });
  app.get('/followers/:username', function (req, response) {
    // query Github API for specific user's followers list
    axios.get(githubURL + '/' + req.params.username + '/followers')
    .then(res=> {
      var followArr = [];
      for (var follow in res.data) {
          followArr.push(res.data[follow].login);
      }
      response.send(followArr);
    })
    .catch(err=>{
      response.send({message: `Error`, error: err});
    })
  });
}

module.exports = appRouter;
