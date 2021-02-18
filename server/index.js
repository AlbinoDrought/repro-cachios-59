// was not included in repro, made it up
import http from 'http';

const validIDs = [17482, 20189, /* 47908999999, */ 20185, 28754];

const route = /universe\/types\/([\d]+)/;

const server = http.createServer((req, res) => {
  console.log('hit', req.url);
  const matches =  req.url.match(route);
  if (matches.length !== 2) {
    res.writeHead(500);
    res.end('Failed to parse route');
    return;
  }

  const id = parseInt(matches[1], 10);

  if (validIDs.includes(id)) {
    res.writeHead(200);
    res.end('ID valid :)');
  } else {
    // Server will respond with a 400 error because id is invalid
    res.writeHead(400);
    res.end('ID invalid :(');
  }
});

server.listen(8080);
