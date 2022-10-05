import * as http from 'http';
import * as url from 'url';
import { IncomingMessage, ServerResponse } from 'http';
import * as fs from 'fs';


const HOSTNAME = 'localhost';
const PORT = 4000;

const users = [
    {
        id: 1,
        firstName: "Marto",
        lastName: "Atanasov",
        userName: "Dedo Masanga",
        password: "12345678ma!",
        gender: 1,
        role: 3,
        picture: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGhvdG98ZW58MHx8MHx8&w=1000&q=80",
        shortDescription: "Hello, I love training and this app is my best buddy for workouts, 10/10",
        status: 1,
        registeredOn: "2022-08-29",
        modifiedOn: "2022-09-23"
    },
    {
        id: 2,
        firstName: "Gosho",
        lastName: "Goshev",
        userName: "groshko123",
        password: "1234578M!",
        gender: 1,
        role: 1,
        picture: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGhvdG98ZW58MHx8MHx8&w=1000&q=80",
        shortDescription: "I have a crystal problem, pls help me!",
        status: 1,
        registeredOn: "2022-08-29",
        modifiedOn: "2022-09-06"
    },
    {
        id: 3,
        firstName: "Dinko",
        lastName: "Dinkovic",
        userName: "dinkacha1",
        password: "123411111",
        gender: 1,
        role: 1,
        picture: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGhvdG98ZW58MHx8MHx8&w=1000&q=80",
        shortDescription: "we have successffully edited this element riiiight here",
        status: 1,
        registeredOn: "2022-08-29",
        modifiedOn: "2022-09-06"
    },
    {
        firstName: "Traicho",
        lastName: "Traiski",
        userName: "traikolini12",
        password: "1234",
        gender: 1,
        role: 1,
        picture: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGhvdG98ZW58MHx8MHx8&w=1000&q=80",
        shortDescription: "haaaaaiiiiideeeeeee",
        status: 1,
        registeredOn: "2022-08-29",
        modifiedOn: "2022-08-29",
        id: 4
    }
];

export let reqUserId;
let nextId = 4;

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    const path = url.parse(req.url).pathname
    if (req.method === 'GET' && path === '/users') {
        fs.readFile('users.json', (err, allUsers) => {
            if (err) {
                console.log(err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Error opening JSON file :(' }))
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            console.log(allUsers.toString())
            res.end(allUsers.toString());
        })
    } else if (req.method === 'GET' && path === '/users/1') {
        const parts = path.split('/').slice(2);
        fs.readFile('users.json', (err, users) => {
            if (err) {
                console.log(err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Error opening JSON file :(' }))
                return;
            }
            const parsedUsers = JSON.parse(users.toString());
            const user = parsedUsers.filter((u) => {
                return u.id === parseInt(parts[0])
            })
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(user[0]))
            res.end();
        })
    } else if (req.method === 'GET') {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Wrong url :)' }))
    } else if (req.method === 'POST') {
        let bodyChunks: Uint8Array[] = [];

        req.on('data', chunk => bodyChunks.push(chunk))
            .on('end', async () => {
                let body = Buffer.concat(bodyChunks).toString().trim();
                console.log(body);
                const newUser = JSON.parse(body);
                newUser.id = ++nextId;
                users.push(newUser);
                fs.writeFile('users.json', JSON.stringify(users), (err) => {
                    if (err) {
                        console.log(err);
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'Error writing to JSON file :(' }))
                        return;
                    }
                    res.writeHead(201, {
                        'Content-Type': 'application/json',
                        'Location': `http://${HOSTNAME}:${PORT}/users/${newUser.id}`
                    });
                    res.end(JSON.stringify(newUser));
                })
            })
    } else if (req.method === 'DELETE' && path === `/users/4`) {
        const parts = path.split('/').slice(2);
        const remaining = users.filter(u => u.id !== parseInt(parts[0]))
        fs.writeFile('users.json', JSON.stringify(remaining), (err) => {
            if (err) {
                console.log(err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Error writing to JSON file :(' }))
                return;
            }
            res.writeHead(201, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(remaining));
        })
    } else if (req.method === 'DELETE') {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Wrong url :)' }))
    } else if (req.method === 'PUT' && path === `/users/2`) {
        const parts = path.split('/').slice(2);
        let bodyChunks: Uint8Array[] = [];

        req.on('data', chunk => bodyChunks.push(chunk))
            .on('end', async () => {
                let body = Buffer.concat(bodyChunks).toString().trim();
                console.log(body);
                const editedUser = JSON.parse(body);
                users.find((u, i) => {
                    if (u.id === parseInt(parts[0])) {
                        users[i] = editedUser
                    }
                });
                fs.writeFile('users.json', JSON.stringify(users), (err) => {
                    if (err) {
                        console.log(err);
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'Error writing to JSON file :(' }))
                        return;
                    }
                    res.writeHead(201, {
                        'Content-Type': 'application/json',
                        'Location': `http://${HOSTNAME}:${PORT}/users/${editedUser.id}`
                    });
                    res.end(JSON.stringify(editedUser));
                })
            })
    } else if (req.method === 'PUT') {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Wrong url :)' }))
    }
})

server.listen(PORT, HOSTNAME, () => {
    console.log(`HTTP Server listening on: http://${HOSTNAME}:${PORT}`);
})

server.on('error', err => {
    console.log('Server error:', err);
});