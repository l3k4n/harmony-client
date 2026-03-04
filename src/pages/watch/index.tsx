import { onMount } from 'solid-js';
import { useBeforeLeave } from '@solidjs/router';
import videojs from 'video.js';
import { videojs_config } from './videojsconfig';
import './videojscomponents';
import './style.css';

export default function Watch() {
	let player_ref: HTMLVideoElement | undefined;
	onMount(() => {
		const player = videojs(player_ref!, videojs_config);

		player.loadMedia(
			{
				title: 'Oceans',
				description: 'S1 E11: "Here comes the rain"',
				src: [
					{
						src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
						type: 'video/mp4',
					},
				],
				textTracks: [
					{
						kind: 'subtitles',
						src: URL.createObjectURL(
							new Blob(
								[`WEBVTT\n\n00:00:00.000 --> 00:01:00.000\nSample Text`],
								{
									type: 'text/vtt',
								},
							),
						),
						label: 'English',
						language: 'en',
						default: true,
					},
				],
			},
			() => null,
		);
	});

	useBeforeLeave(() => {
		const player = videojs(player_ref!);
		if (player) player.dispose();
	});

	return (
		<section class="watch-page">
			<video ref={player_ref} id="main-player" class="video-js vjs-skin" />
		</section>
	);
}

// function Watch() {
// 	let player_ref: HTMLVideoElement | undefined;
// 	onMount(() => {
// 		// this throws err
// 		const player = videojs('main-player', player_ref);
//
// 	});
//
// 	return (
// 		<section class="watch-page">
// 			<video ref={player_ref} id="main-player" class="video-js vjs-skin" />
// 		</section>
// 	);
// }
