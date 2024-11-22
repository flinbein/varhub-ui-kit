import room from "varhub:room";

setInterval(() => {
    room.broadcast("I'm alive!")
}, 5000)