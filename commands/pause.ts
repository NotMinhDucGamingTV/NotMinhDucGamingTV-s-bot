import { Command, CommandContext } from './Command';
import Deps from '../utils/deps';
import Music from '../modules/music/music';
import { ModuleString } from '../data/models/guild';

export default class PauseCommand implements Command {
    name = 'pause';
    summary = 'Pause playback if playing.';
    module: ModuleString = 'Music';

    constructor(private music = Deps.get<Music>(Music)) {}
    
    execute = (ctx: CommandContext) => {
        const player = this.music.joinAndGetPlayer(ctx);

        if (!player.playing)
            throw new TypeError('Player is already paused.');
        
        player.pause(true);
        ctx.channel.send(`**Paused**: \`${player.queue[0].title}\``);
    }
}
