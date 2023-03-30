<script lang="ts">
	import { Alert, Button, Modal } from 'flowbite-svelte';
	import { InMemoryDatabase } from 'brackets-memory-db';
	import { BracketsManager, helpers } from 'brackets-manager';
	import BracketView from '../components/BracketView.svelte';
	import Battle from '../components/Battle.svelte';
	import Result from '../components/Result.svelte';
	import Register from '../components/Register.svelte';
	import VictoryView from '../components/VictoryView.svelte';
	import { onMount } from 'svelte';
	import { members, members16 } from '../lib/member';
	import { Status, type Match } from 'brackets-model';

	const storage = new InMemoryDatabase();
	const manager = new BracketsManager(storage);

	let page = 0;
	let isFirstRound = false;
	const TotalPage = 2;
	let lastOpponent = '';
	let currentOpponent = '';
	let opponentStance = '';
	let randnum: number;
	let user = '';
	let tournament = {};
	let currentRound = 0;
	// let lastRound: { [key: number] : object} = {}
	let lastRound: object[] = [];

	let participantList: { [key: number]: string } = {};

	const StanceResult = ['Rock', 'Paper', 'Scissors'];

	let foxNumber: number = 1;
	onMount(() => {
		foxNumber = (Math.floor(Math.random() * 100) % 100) + 1;
	});

	const passFirstRound = () => {
		isFirstRound = false;
	};

	const setUser = (u: string) => {
		user = u;
	};

	const nextPage = () => {
		if (isVictorious) {
			page = -1
		}
		if (page < TotalPage) {
			page += 1;
		} else {
			page = 1;
		}
	};

	const previousPage = () => {
		if (page > 0) {
			page -= 1;
		}
	};

	const shuffleArray = (array: any[]) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	};

	const opponent1Wins = async (manager: BracketsManager, match: Match) => {
		await manager.update.match({
			id: match.id,
			opponent1: { score: 1, result: 'win' },
			opponent2: { score: 0, result: 'loss' }
		});
	};

	const opponent2Wins = async (manager: BracketsManager, match: Match) => {
		await manager.update.match({
			id: match.id,
			opponent1: { score: 0, result: 'loss' },
			opponent2: { score: 1, result: 'win' }
		});
	};

	const battle = (stance: 0 | 1 | 2) => {
		// default is 0.5
		// subjected to be changed to 0.3
		if (Math.random() > 0.5) {
			if (stance === 0) {
				return {
					opponentStance: StanceResult[2],
					result: 'win'
				};
			} else {
				return {
					opponentStance: StanceResult[stance - 1],
					result: 'win'
				};
			}
		} else {
			if (stance === 2) {
				return {
					opponentStance: StanceResult[0],
					result: 'loss'
				};
			}
			return {
				opponentStance: StanceResult[stance + 1],
				result: 'loss'
			};
		}
	};

	// console.log(battle(0))

	$: user && console.log(user);

	const getTotalRound = async () => {
		return Math.ceil(Math.log2((await manager.get.seeding(0)).length));
	};

	let total_round: number;

	let isDefeated = false;
	let isVictorious = false;

	// let ;
	let openBracket = false;
	const toggleBracket = async () => {
		openBracket = !openBracket;
	};

	const resetTournament = async () => {
		await manager.delete.tournament(0);
		let participant: (string | null)[] = [];
		members.map((member) => {
			participant.push(member);
		});
		shuffleArray(participant);
		participant.push(user);
		if (Math.log2(participant.length) % 1 !== 0) {
			let diff = Math.pow(2, Math.ceil(Math.log2(participant.length))) - participant.length;
			for (let i = 0; i < diff; i++) {
				participant.push(null);
			}
		}
		await manager.create({
			name: 'Janken Tournament 2023 Online',
			tournamentId: 0, //

			type: 'single_elimination',
			seeding: participant,
			settings: { balanceByes: true }
		});
		tournament = await manager.get.tournamentData(0);
		tournament.participant.map((participant) => {
			participantList[participant.id] = participant.name;
		});
		console.log(tournament.match[0]);
	};

	const startTournament = async () => {
		let round = (await manager.get.currentRound(0))?.id;
		randnum = 2;
		let participant: (string | null)[] = [];
		members.map((member) => {
			participant.push(member);
		});
		shuffleArray(participant);
		participant.push(user);
		if (Math.log2(participant.length) % 1 !== 0) {
			let diff = Math.pow(2, Math.ceil(Math.log2(participant.length))) - participant.length;
			for (let i = 0; i < diff; i++) {
				participant.push(null);
			}
		}
		await manager.create({
			name: 'Janken Tournament 2023 Online',
			tournamentId: 0, //

			type: 'single_elimination',
			seeding: participant
			// settings: { balanceByes: true }
		});
		tournament = await manager.get.tournamentData(0);
		tournament.participant.map((participant) => {
			participantList[participant.id] = participant.name;
		});
		console.log(tournament.participant);
		total_round = await getTotalRound();
		for (const match of tournament.match) {
			if (match.round_id === 0) {
				if (
					(match.opponent1?.id == 75 && match.opponent2 == null) ||
					(match.opponent2?.id == 75 && match.opponent1 == null)
				) {
					await proceed(0);
					break;
				}
				if (match.opponent1?.id == 75) {
					lastOpponent = currentOpponent;
					currentOpponent = participantList[match.opponent2?.id];
				}
				if (match.opponent2?.id == 75) {
					lastOpponent = currentOpponent;
					currentOpponent = participantList[match.opponent1?.id];
				}
			}
		}
		currentRound = round;
	};



	// onMount(async () => {
	// 	let round = (await manager.get.currentRound(0))?.id;
	// 	randnum = 2;
	// 	let participant: (string | null)[] = [];
	// 	members.map((member) => {
	// 		participant.push(member);
	// 	});
	// 	shuffleArray(participant);
	// 	participant.push(user);
	// 	if (Math.log2(participant.length) % 1 !== 0) {
	// 		let diff = Math.pow(2, Math.ceil(Math.log2(participant.length))) - participant.length;
	// 		for (let i = 0; i < diff; i++) {
	// 			participant.push(null);
	// 		}
	// 	}
	// 	await manager.create({
	// 		name: 'Janken Tournament 2023 Online',
	// 		tournamentId: 0, //

	// 		type: 'single_elimination',
	// 		seeding: participant,
	// 		settings: { balanceByes: true }
	// 	});
	// 	tournament = await manager.get.tournamentData(0);
	// 	console.log(tournament.participant);
	// 	total_round = await getTotalRound()
	// 	if (round == 0) {
	// 		for (const match of tournament.match) {
	// 			if ((match.opponent1?.id == 75 && match.opponent2 != null) || (match.opponent2?.id == 75 && match.opponent1 != null)) {
	// 				await proceed(0)
	// 			}
	// 		}
	// 	}
	// });

	const proceed = async (stance: 0 | 1 | 2) => {
		let round = (await manager.get.currentRound(0))?.id;
		console.log(round);
		tournament = await manager.get.tournamentData(0);
		for (const match of tournament.match) {
			if (match.opponent1 == null || match.opponent2 == null) {
				if (match.opponent1?.id == 75 || match.opponent2?.id == 75) {
					console.log(match.opponent1, match.opponent2);
				}
				await manager.storage.update('match', { id: match.id }, { status: 4 });
				continue;
			}
			if (match.status === Status.Locked) {
				if (match.round_id == round) console.log(match.status);
				continue;
			}

			if (match.round_id === round) {
				const result = battle(stance);
				opponentStance = result.opponentStance;
				if (match.opponent1.id == 75 && match.opponent2 != null) {
					console.log(match);
					if (result.result == 'win') {
						await opponent1Wins(manager, match);
					} else {
						await opponent2Wins(manager, match);
						isDefeated = true;
					}
					console.log(await manager.find.nextMatches(match.id, 75));
				} else if (match.opponent2.id == 75 && match.opponent1 != null) {
					console.log(match);
					if (result.result == 'loss') {
						await opponent1Wins(manager, match);
						isDefeated = true;
					} else {
						await opponent2Wins(manager, match);
					}
					console.log(await manager.find.nextMatches(match.id, 75));
					// } else if (match.opponent1 == null || match.opponent2 == null) {
					// 	await manager.storage.update('match', { id: match.id }, { status: 4 });
				} else {
					if (Math.random() > 0.5) {
						await opponent1Wins(manager, match);
					} else {
						await opponent2Wins(manager, match);
					}
				}
			}
		}
		round = (await manager.get.currentRound(0))?.id;
		currentRound = round;
		// console.log(round);

		tournament = await manager.get.tournamentData(0);

		for (const match of tournament.match) {
			if (match.opponent1?.id == 75) {
				lastOpponent = currentOpponent;
				currentOpponent = participantList[match.opponent2?.id];
			}
			if (match.opponent2?.id == 75) {
				lastOpponent = currentOpponent;
				currentOpponent = participantList[match.opponent1?.id];
			}
		}
		console.log(currentOpponent);

		if (
			(tournament.match[126].opponent1?.id == 75 &&
				tournament.match[126].opponent1.result == 'win') ||
			(tournament.match[126].opponent2?.id == 75 && tournament.match[126].opponent2.result == 'win')
		) {
			isVictorious = true;
		}

		lastRound = [];
		// let cnt = 0
		for (const match of tournament.match) {
			// if (match.round_id == (await manager.get.currentRound(0))?.id)
			lastRound.push(match);
		}
	};

	const forceProceed = async () => {
		for (let i = 0; i < total_round; i++) {
			await proceed(0);
		}
		// await proceed(0);
	};

	const getNum = () => {
		randnum = Math.random();
	};
</script>

<svelte:head>
	<link rel="preload" href="https://randomfox.ca/images/{foxNumber}.jpg"  as="image"/>
</svelte:head>

<section class="p-0 justify-center flex max-h-screen {openBracket? "overflow-y-hidden": ""}">
	<!-- <Alert>
		{JSON.stringify(members.length)}
	</Alert>
	<div class="w-2/3 flex flex-row">
		<Button on:click={toggleBracket}>Toggle Bracket</Button>
		<Button on:click={proceed} color="green">Proceed</Button>
		<Button on:click={resetTournament} color="red">Reset</Button>
		<Button on:click={getNum}>Random</Button>
	</div> -->
	<!-- <Modal open={isDefeated}>You Lose</Modal>
	<Modal open={isVictorious}>You Win</Modal> -->
	{#if isVictorious}
		<VictoryView victoryPageData={{user, foxNumber}}/>
	{:else if page == 0}
		<Register
			{foxNumber}
			on:next={async (event) => {
				setUser(event.detail.user);
				nextPage();
				await startTournament();
			}}
		/>
	{:else if page == 3}
		<Button on:click={async () => await proceed(0)}>Rock</Button>
		<Button on:click={async () => await proceed(1)}>Paper</Button>
		<Button on:click={async () => await proceed(2)}>Scissors</Button>
	{:else if page == 2}
		<Result
			resultPageData={{
				user: user,
				currentOpponent: lastOpponent,
				foxNumber: foxNumber,
				isDefeated: isDefeated,
				isFirstRound: isFirstRound,
				currentRound: currentRound,
				lastRound: lastRound,
				participantList: participantList
			}}
			on:next={() => {
				nextPage();
			}}
		/>
		<div class="absolute top-4 right-4">
			<Button
				on:click={toggleBracket}
				btnClass="border-2 border-white p-2 rounded-lg flex flex-col justify-center items-center"
				><img src="https://img.icons8.com/ios-filled/32/ffffff/tournament-mode.png" /></Button
			>
		</div>
	{:else if page == 1}
		<Battle
			resultPageData={{
				user: user,
				currentOpponent: currentOpponent,
				foxNumber: foxNumber,
				currentRound: currentRound
			}}
			on:next={(e) => {
				nextPage();
				proceed(e.detail.stance);
				passFirstRound();
			}}
		/>
	{/if}

	<!-- <Modal open={openBracket}>
	</Modal> -->
</section>
{#if openBracket}
	<BracketView {tournament} on:close={toggleBracket} />
{/if}
