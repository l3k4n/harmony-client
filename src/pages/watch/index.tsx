import { onMount } from 'solid-js';
import videojs from 'video.js';
// import 'video.js/dist/video-js.css';
import './style.css';
import './video.css';
//

// "mediaLoader"
// "posterImage"
// "titleBar"
// "textTrackDisplay"
// "loadingSpinner"
// "bigPlayButton"
// "liveTracker"
// "controlBar"
// "errorDisplay"
// "textTrackSettings"
// "resizeManager"

function x() {
	// Initialize the player
	const player = videojs('netflix-player', {
		autoplay: true,
		controls: true,
		loop: false,
		fluid: false,
		disablePictureInPicture: true,
		textTrackSettings: false,
		bigPlayButton: false,
		posterImage: false,

		titleBar: false, // move to overlay
		// fullscreen:
		// enableSmoothSeeking
		inactivityTimeout: 1000,

		// children: ["bigPlayButton", "controlBar"],
		controlBar: {
			controlTextVisible: false,

			children: [
				'playToggle',

				'currentTimeDisplay',
				// 'timeDivider',
				// 'durationDisplay',
				// 'remainingTimeDisplay',

				'progressControl',

				'customControlSpacer', // gap
			],
		},
	});

	// TV Remote Navigation logic
	document.addEventListener('keydown', function(e) {
		// Wake up UI on any key press
		player.userActive(true);

		switch (e.keyCode) {
			case 13: // Enter
				if (player.paused()) {
					player.play();
				} else {
					player.pause();
				}
				break;
			case 37: // Left Arrow (Rewind 10s)
				player.currentTime(Math.max(0, player.currentTime() - 10));
				break;
			case 39: // Right Arrow (Forward 10s)
				player.currentTime(
					Math.min(player.duration(), player.currentTime() + 10),
				);
				break;
			case 38: // Up Arrow (Volume Up)
				player.volume(Math.min(1, player.volume() + 0.1));
				break;
			case 40: // Down Arrow (Volume Down)
				player.volume(Math.max(0, player.volume() - 0.1));
				break;
			case 32: // Spacebar
				player.paused() ? player.play() : player.pause();
				break;
		}
	});

	// Ensure the player fills the screen even on odd TV resolutions
	window.addEventListener('resize', function() {
		player.width(window.innerWidth);
		player.height(window.innerHeight);
	});

	const rawVtt = `WEBVTT

00:00:00.000 --> 00:00:02.000 line:0% position:0% align:start
Top Left (Region 1)

00:00:02.000 --> 00:00:04.000 line:50% position:50% align:center
Dead Center (Region 2)

00:00:04.000 --> 00:00:30.000 line:100% position:100% align:end
Bottom Right (Region 3)`;
	const vttBlob = new Blob([rawVtt], { type: 'text/vtt' });
	const vttUrl = URL.createObjectURL(vttBlob);

	player.loadMedia(
		{
			title: 'Oceans',
			description:
				'Journey in to the depths... and race with dolphins at play.',
			src: 'https://vjs.zencdn.net/v/oceans.mp4',
		},
		() => null,
	);

	player.addRemoteTextTrack(
		{
			kind: 'subtitles',
			src: vttUrl,
			label: 'Regions',
			language: 'en',
			default: true, // This makes it show immediately
		},
		false,
	);
}

export default function Watch() {
	const on_back = () => null;

	onMount(x);

	return (
		<section class="watch-page">
			<div class="video-container">
				<button type="button" class="back-button" onClick={on_back}>
					<svg viewBox="0 0 24 24">
						<path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
					</svg>
				</button>

				<div class="video-title-overlay">
					<h1 id="video-title">The Deep Blue</h1>
					<p id="video-subtitle">Season 1 : Episode 4</p>
				</div>

				<video
					id="netflix-player"
					class="video-js vjs-skin"
					title="Media Title"
				/>
			</div>
		</section>
	);
}
