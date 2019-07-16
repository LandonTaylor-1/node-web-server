var http = require('http');
let users = require("./state").users;
let server = http.createServer(messageReceived);

server.listen(80);

function messageReceived(req, res) {
   res.writeHead(200, {'Content-Type': 'text/plain'});
   let usersJSON = JSON.stringify(users);
   res.write(usersJSON);
    if(req.method === "GET" && req.url.indexOf("/users/") > -1){
        let id = req.url.split("/");
        let user = users.find(p=>p["_id"] == id[2]);
        let userJSON = JSON.stringify(user);
        res.write(userJSON);
    }
    else if(req.method === "POST" && req.url === "/products"){
        res.write("you wanted to make a product")
    }
    else if(req.method === "PUT" && req.url === "/products"){
    res.write("you wanted to update a product")
    }
    else if(req.method === "DELETE" && req.url === "/products"){
    res.write("you wanted to delete a product")
    }
    else{
    res.write("Not Found");
    }
  res.end();
}
