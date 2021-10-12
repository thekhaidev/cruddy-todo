const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  // var id = counter.getNextUniqueId(callback);
  // items[id] = text;
  // callback(null, { id, text });

  // get the unique id
  // write the text with the filename of the unique id
  // if error callback(err)
  // else
  // items[id] = text;
  // callback(null, { id, text });

  counter.getNextUniqueId(getIDCB = (err, id) => {
    fs.writeFile(path.join(exports.dataDir, `${id}.txt`), text, (err) => {
      if (err) {
        callback(err);
      } else {
        items[id] = text;
        callback(null, { id, text });
      }
    });
  });

};

exports.readAll = (callback) => {
  // var data = _.map(items, (text, id) => {
  //   return { id, text };
  // });
  // callback(null, data);

  // read the data
  // if error
  // throw error
  // map the data

  fs.readdir(exports.dataDir, (err, data) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      var data = _.map(data, (value) => ({id: value.slice(0, 5), text: value.slice(0, 5)}));
      callback(null, data);
    }
  });
};

exports.readOne = (id, callback) => {
  // var text = items[id];
  // if (!text) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback(null, { id, text });
  // }

  fs.readFile(`${exports.dataDir}/${id}.txt`, (err, fileContents) => {
    if (err) {
      callback(err);
    } else {
      callback(null, {id, text: fileContents.toString()});
    }
  });
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
