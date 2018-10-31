const announcementService = require('./announcement.service');

module.exports = (socket, io) => {
    socket.on('announcement', (data) => {
        console.log(data);
        io.emit(data.id);
    });


};

