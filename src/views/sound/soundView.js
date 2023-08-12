import since04 from '../../base/since04.js';
let recorder;
let chunks = [];

class soundView extends since04 {
    constructor() {
        super();
        this.timeVoice = 0;
        this.autoVoice = 0;
        this.voiceCheck();
        this.TimeClose = 0;
        this.listSound = [];
    }

    deleteSound = (id,haveRun = false) => {
        let findIndex = this.listSound.findIndex(e => e.id == id);
        if(findIndex != -1) {
            if(haveRun == false)
            {
                this.listSound[findIndex].sound.stop();
                this.listSound.splice(findIndex, 1);
            }
            else 
            {
                let sound = this.listSound[findIndex].sound;
                // check sound is playing
                if(sound.playing()) {
                    // sound is finished
                    sound.on('end', () => {
                        sound.stop();
                        this.listSound.splice(findIndex, 1);
                    }
                    );
                }
                sound.on('end', () => {
                    sound.stop();
                    this.listSound.splice(findIndex, 1);
                }
                );

            }
        }
        return id;
    }

    stopMusic = () => {
        /**
         * @idea :
         * - Hàm này chạy khi tải map mới
         * - Nếu như có âm thanh đang phát, thì sẽ dừng lại, sẽ tạm dừng nó. Vì nó là nhạc nền của bản đồ.
         */
        this.listSound.forEach(element => {
            let sound = element.sound;
            if(element.type && element.type == 'music') {
                sound.pause();
            }
        });
    }

    resumeMusic = () => {
        /**
         * @idea :
         */
        this.listSound.forEach(element => {
            let sound = element.sound;
            if(element.type && element.type == 'music') {
                // check is now playing, update value volume
                if(sound.playing()) {
                    if(this.offMusic.backgroundMusic) {
                        this.stopMusic();
                    }
                    sound.volume(this.offMusic.valueSound);
                }

                if(sound.playing() == false && element.name == this.mapMore.music) {
                    sound.play();
                }
            }

        });
    }

    playMusic = (name,loop = false) => {
        /**
         * @author: snowlyvn
         * @desc: Phát nhạc nền bản đồ.
         * @idea :
         * - Nếu bản đồ có dữ liệu phát âm thanh sẽ tiến hành khởi tạo âm thanh.
         * - Bài toán bây giờ, nếu mỗi lần chuyển map lại phát lại thì rất khó chịu.
         * - Thay vào đó tạo 1 mảng, gán nó vào để lưu dữ liệu phát video, nếu ví dụ nhân vật quay lại map cũ thì sẽ phát lại âm thanh ở thời điểm out map.
         * - Nếu nhân vật vào map mới, thì sẽ phát âm thanh mới.
         * - Nếu nhân vật vào map cũ, thì sẽ phát âm thanh cũ.
         * 
         */
        let id = name+"_since04_music_map";
        let findIndex = this.listSound.findIndex(e => e.id == id);
        if(this.offMusic.backgroundMusic) {
            return false;
        }
        if(findIndex != -1) {
            let sound = this.listSound[findIndex].sound;
            if(sound.playing()) return id;
            // check sound is stop 
            if(sound.playing() == false) {
                // resume sound
                sound.play();

            }

            return id;
        }
        const sound = new Howl({
            src : ['assets/sound/' + name + '.mp3'],
            format : ['mp3'],
            volume : this.offMusic.valueSound,
            spatial : true,
        });
        if(loop) sound.loop(true);
        sound.pos(0,0,0);
        sound.play();
        this.listSound.push({
            id : id,
            sound : sound,
            type : 'music',
            name : name,
        });
        // fineshed
    }

    playSound = (name,loop = false, x = null, id = null) => {

        id = id == null ? this.randomAZ(10) : id;
        let findIndex = this.listSound.findIndex(e => e.id == id);
        if(this.offMusic[name] || this.offMusic.hieuung) {
            if(findIndex != -1) {
                this.listSound[findIndex].sound.stop();
                this.listSound.splice(findIndex, 1);
            }
            return false;
        }
        if(findIndex != -1) {
            // update sound
            let sound = this.listSound[findIndex].sound;
            if(x != null && this.my.id >=1)
            {
                sound.pos(0,0,0);
                let player = this.NhanVat;
                let manhinh = this.gameWidth / 2;
                if(x + manhinh <= this.NhanVat.x || x - manhinh >= this.NhanVat.x) return this.deleteSound(id);
                let dx = Math.abs(x - player.x);
                if(dx <= 50) sound.pos(0,0,0);
                else if(x < player.x)
                {
                    sound.pos(-1,0,0);
                    let tile = x / player.x; 
                    sound.volume(tile);
                }
                else if(x > player.x)
                {
                    sound.pos(1,0,0);
                    let tile = player.x / x;
                    sound.volume(tile);
                }
            }
            return id;
        }

        const sound = new Howl({
            src : ['assets/sound/' + name + '.mp3'],
            format : ['mp3'],
            volume : this.offMusic.valueSound,
            spatial : true,
        });
        if(loop) sound.loop(true);
        sound.pos(0,0,0);
        if(x != null && this.my.id >=1) 
        {
            let player = this.NhanVat;
            let manhinh = this.gameWidth / 2;

            /* Phải nằm trong phạm vi màn hình của nhân vật */

            if(x + manhinh <= this.NhanVat.x || x - manhinh >= this.NhanVat.x) return id;

            /* nếu khoảng cách là dưới 50px thì phát âm thanh ở chính giữa */
            let dx = Math.abs(x - player.x);
            if(dx <= 50)
            {
                sound.pos(0,0,0);
            }
            else 
            if(x < player.x)
            {
                /* Nếu chỗ phát âm thanh nhỏ hơn, thì phát bên trái */
                sound.pos(-1,0,0);

                /* Tính toán giảm âm thanh theo chiều xa */
                let tile = x / player.x; 
                sound.volume(tile);

            }
            else
            if(x > player.x)
            {
                /* Nếu chỗ phát âm thanh nhỏ hơn, thì phát bên phải */
                sound.pos(1,0,0);
                /* Tính toắn giảm âm thanh theo chiều xa */
                let tile = player.x / x;
                sound.volume(tile);
            }

            sound.play();
        }
        else 
        {
            sound.play();
        }

        this.listSound.push({
            id : id,
            sound : sound,
        });

        // fineshed
        sound.on('end', () => {
            if(loop == false) {
                this.deleteSound(id);
            }
        });

    }

    voiceOn = () => {
        this.startRecording();
        this.danger(this._('Đã bật mic, vui lòng phát ngôn lịch sự.'));
        this.TimeClose = Date.now() + 30000;
    }

    voiceOff = () => {
        this.autoVoice = false;
        this.danger(this._('Đã tắt mic. Người xung quanh sẽ không nghe thấy bạn nói.'));
        this.stopRecording();
    }

    voiceCheck = () => {

        if(this.TimeClose < Date.now() && this.autoVoice) {
            this.voiceOff();
            this.CreateDisplayOnScreen();
        }
        if(this.timeVoice < Date.now() && this.autoVoice) {
            this.timeVoice = 0;
            this.stopRecording();
        }

        setTimeout(() => {
            this.voiceCheck();
        }, 500);

    }

    startRecording = () => {
        let self = this;
        navigator.mediaDevices.getUserMedia({
                audio: true
            })
            .then((stream) => {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                const audioContext = new AudioContext();
                const input = audioContext.createMediaStreamSource(stream);
                recorder = new Recorder(input);

                this.autoVoice = true;

                recorder.record();
            })
            .catch((error) => {
                console.error('Error accessing microphone:', error);
            });
    }

    stopRecording = () => {
        let self = this;
        if(recorder) {
            recorder.stop();
            recorder.exportWAV((blob) => {
                const reader = new FileReader();
                reader.onload = () => {
                    const arrayBuffer = reader.result;
                    if(this.autoVoice == true) {
                        this.startRecording();
                    }
                    this.to('audioData', arrayBuffer);
                };
                reader.readAsArrayBuffer(blob);
            });
            recorder.clear();
        }
    }


    coverAudio = (data) => {

        const blob = new Blob([data], {
            type: 'audio/webm'
        });
        const reader = new FileReader();
        reader.onload = () => {
            const arrayBuffer = reader.result;
            this.to('audioData', arrayBuffer);
        };
        reader.readAsArrayBuffer(blob);
    }


    playAudio = (data) => {
        console.log(data)
        let id = data._2;

        let player = this.my.id == id ? NhanVat : this.nguoichoi.getChildByName(id);
        if(player) {
            player.sound = true;
        }

        data = data._1;
        const blob = new Blob([data], {
            type: 'audio/webm'
        });

        // Tạo URL đại diện cho Blob
        const blobUrl = URL.createObjectURL(blob);

        // Tạo đối tượng Howl từ URL âm thanh
        const sound = new Howl({
            src: [blobUrl],
            format: ['webm'],
        });
        // set max volume
        // Phát lại âm thanh
        sound.play();
        sound.on('end', () => {
            let player = this.my.id == id ? NhanVat : this.nguoichoi.getChildByName(id);
            if(player) {
                player.sound = false;
            }
        });
        // 
    }

    stopRecording_atMy = () => {
        recorder.addEventListener('stop', () => {
            const audioBlob = new Blob(chunks);
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.play();
        });
        recorder.stop();
    }

}
export default soundView;
