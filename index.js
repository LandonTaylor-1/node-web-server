var http = require('http');
let users = require("./state").users;
//let newUser = require("./newUser").newUser;
let server = http.createServer(messageReceived);

server.listen(8080);

function messageReceived(req, res) {
   res.writeHead(200, {'Content-Type': 'text/plain'});
    if(req.method === "GET" && req.url === "/users"){
      let usersJSON = JSON.stringify(users);
      res.write(usersJSON);
    }else if(req.method === "GET" && req.url.indexOf("/users/") > -1){
      let id = req.url.split("/");
      let user = users.find(p=>p["_id"] == id[2]);
      let userJSON = JSON.stringify(user);
      res.write(userJSON);
    }else if(req.method === "POST" && req.url === "/users"){
      postUsers(req, res);
    // }else if(req.method === "PUT" && req.url.indexOf("/users/") > -1){
    //   let id = req.url.split("/");
    //   let user = users.find(p=>p["_id"] == id[2]);
    //   let userJSON = JSON.stringify(user);
    //   userJSON = [];
    //   let body = userJSON
    //   req.on('data', (chunk) => {
    //     body.push(chunk);
    //   }).on('end', () => {
    //     body = Buffer.concat(body).toString();
    //     let changedUser = JSON.parse(body);
    //     user.push(changedUser);
    //   });
    //   //putUsers(req, res);
    }else if(req.method === "DELETE" && req.url.indexOf("/users/") > -1){
      let id = req.url.split("/");
      let user = users.find(p=>p["_id"] == id[2]);
      users.splice(user, 1)
    }else{
      res.write("Not Found");
    }
  res.end();
}

function postUsers(request, response){
   let body = [];
   request.on('data', (chunk) => {
     body.push(chunk);
   }).on('end', () => {
     body = Buffer.concat(body).toString();
     let newUser = JSON.parse(body);
     users.push(newUser);
   });
  }

  // function putUsers(request, response){
  //   let id = request.url.split("/");
  //   let user = users.find(p=>p["_id"] == id[2]);
  //   let body = [];
  //   request.on('data', (chunk) => {
  //     body.push(chunk);
  //   }).on('end', () => {
  //     body = Buffer.concat(body).toString();
  //     let changedUser = JSON.parse(body);
  //     user.push(changedUser);
  //   });
  //  }