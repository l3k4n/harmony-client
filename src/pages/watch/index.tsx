import { onMount } from 'solid-js';
import videojs from 'video.js';
import { videojs_config } from './videojsconfig';
import './videojscomponents';
import './style.css';

export default function Watch() {
	onMount(() => {
		const player = videojs('main-player', videojs_config);

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

	return (
		<section class="watch-page">
			<video id="main-player" class="video-js vjs-skin" />
		</section>
	);
}
