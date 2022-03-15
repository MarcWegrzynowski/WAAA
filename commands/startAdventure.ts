import { Channel, Client, ThreadManager } from "discord.js";
import { ICommand } from "wokcommands";


export default {
    category: 'Testing',
    description: 'Begin your text RPG adventure',

    slash: true,
    testOnly: true,

    callback: ({}) => {
        return "work in progress :cry:"
    },
} as ICommand


// /start

// Purpose: Creating a discord thread, specifically for a user

// WORK IN PROGRESS INCOMPLETE