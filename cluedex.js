#!/usr/bin/env node
const WebSocketClient = require('websocket').client;
const jsonic = require('jsonic');
const cluedex_api_key = "YOURCLUEDEXAPIKEYHERE";

var cluedex = new WebSocketClient();

function init(){

    cluedex.connect('wss://www.cldxio.com/subs?channel=oneminticks&key='+cluedex_api_key,null,null,{'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:56.0) Gecko/20100101 Firefox/56.0'});

    cluedex.connect('wss://www.cldxio.com/subs?channel=trends&key='+cluedex_api_key,null,null,{'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:56.0) Gecko/20100101 Firefox/56.0'});
}

cluedex.on('connectFailed', function(error) {

    console.log('Connect Error: ' + error.toString());

    process.exitCode = 1;
});

cluedex.on('connect', function(connection) {

    console.log('Connected to OneMinTicks on ClueDex');

    connection.on('error', function(error) {

        console.log("Connection Error: " + error.toString());

        process.exitCode = 1;
    });

    connection.on('close', function() {

        console.log('echo-protocol Connection Closed');

        process.exitCode = 1;
    });

    connection.on('message', function(message) {

        if (message.type === 'utf8') {

            console.log("Received: ", jsonic(message.utf8Data) );
        }
    });
});

init();