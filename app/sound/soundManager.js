/**
 * Created by hackathon on 11/12/2015.
 */

function backgroundMusic(){
    if(!mute){
        var sound = new buzz.sound
    }
}



function soundController(soundType,id){
    if(!mute) {
        if(soundType == 'attack') {
            var sound = new buzz.sound('/rghack2015/app/sound/sounds/attack/' + id + '.ogg',{volume:50});
            sound.play();
        }
        if(soundType == 'summon'){
            console.log("summoning card");
            console.log(id);
            var sound = new buzz.sound('/rghack2015/app/sound/sounds/summon/' + id + '.ogg',{volume:50});
            sound.play();
        }
        if(soundType == 'death'){
            var sound = new buzz.sound('/rghack2015/app/sound/sounds/death/'+ id + '.ogg',{volume:50});
            sound.play();
        }
        if(soundType == 'yourTurn'){
            var sound = new buzz.sound('/rghack2015/app/sound/sounds/misc/yourTurn.mp3',{volume:30});
            sound.play();
        }
    }
}

function mute(){
    mute = true;
}

function unmute(){
    mute = false;
}