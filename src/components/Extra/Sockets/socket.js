import * as io from "socket.io-client";

export const socket = io.connect("https://puzzle.araratchess.ru:8080");