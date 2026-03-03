import videojs from 'video.js';

videojs.registerComponent(
    'CustomLoader',
    class extends videojs.getComponent('LoadingSpinner') {
        createEl() {
            return videojs.dom.createEl('div', {
                className: 'vjs-custom-loader',
                innerHTML: '<div></div>',
            });
        }
    },
);

videojs.registerComponent(
    'CustomOverlay',
    class extends videojs.getComponent('Component') {
        createEl() {
            return videojs.dom.createEl('div', { className: 'vjs-custom-overlay' });
        }
    },
);

videojs.registerComponent(
    'CustomPlayToggle',
    class extends videojs.getComponent('Component') {
        constructor(player: any, options: any) {
            super(player, options);

            this.addClass('vjs-paused');

            player.on('play', () => {
                this.addClass('vjs-playing');
                this.removeClass('vjs-paused');
            });

            player.on('pause', () => {
                this.addClass('vjs-paused');
                this.removeClass('vjs-playing');
            });

            this.on('click', () => {
                if (this.player_.paused()) this.player_.play();
                else this.player_.pause();
            });
        }

        createEl() {
            return videojs.dom.createEl('div', {
                className: 'vjs-custom-play-toggle',
            });
        }
    },
);
