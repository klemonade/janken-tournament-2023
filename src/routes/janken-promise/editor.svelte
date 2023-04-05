<script lang="ts">
  import Typeahead from "svelte-typeahead";
  import { createEventDispatcher } from "svelte";
  import { Button } from 'flowbite-svelte'
  import { members } from "../../lib/member";
  const dispatch = createEventDispatcher();

  const submit = () => {
	if (!members.includes(data.query) || data.promise === undefined) {
	  alert("กรุณากรอกข้อมูลให้ครบถ้วน");
	  return;
	}
	dispatch("submit", data);
  }

  const memberState = [
    { state: "Angel" },
	{ state: "Aom" },
	{ state: "Champoo" },
	{ state: "Fahsai" },
	{ state: "Fortune" },
	{ state: "Izurina" },
	{ state: "Jayda" },
	{ state: "Jjae" },
	{ state: "Kaiwan" },
	{ state: "Kaning" },
	{ state: "Kyla" },
	{ state: "Latin" },
	{ state: "Marmink" },
	{ state: "Meen" },
	{ state: "Mei" },
	{ state: "Milk" },
	{ state: "Nena" },
	{ state: "Nenie" },
	{ state: "Parima" },
	{ state: "Pim" },
	{ state: "Ping" },
	{ state: "Punch" },
	{ state: "Sita" },
	{ state: "Papang" },
	{ state: "Ginna" },
	{ state: "Twobam" },
	{ state: "Emma" },
	{ state: "Nana" },
	{ state: "Jingjing" },
	{ state: "Lookked" },
	{ state: "Berry" },
	{ state: "Cherprang" },
	{ state: "Earn" },
	{ state: "Earth" },
	{ state: "Emmy" },
	{ state: "Eve" },
	{ state: "Fame" },
	{ state: "Fond" },
	{ state: "Grace" },
	{ state: "Gygee" },
	{ state: "Hoop" },
	{ state: "Janry" },
	{ state: "Jaokhem" },
	{ state: "Kaofrang" },
	{ state: "Khamin" },
	{ state: "L" },
	{ state: "Marine" },
	{ state: "Mean" },
	{ state: "Micha" },
	{ state: "Minmin" },
	{ state: "Miori" },
	{ state: "Monet" },
	{ state: "Myyu" },
	{ state: "Nene" },
	{ state: "New" },
	{ state: "Niky" },
	{ state: "Nine" },
	{ state: "Paeyah" },
	{ state: "Pakwan" },
	{ state: "Palmmy" },
	{ state: "Pampam" },
	{ state: "Pancake" },
	{ state: "Panda" },
	{ state: "Patt" },
	{ state: "Peak" },
	{ state: "Phukkhom" },
	{ state: "Popper" },
	{ state: "Ratah" },
	{ state: "Satchan" },
	{ state: "Sindy" },
	{ state: "Stang" },
	{ state: "Wawa" },
	{ state: "Wee" },
	{ state: "Yayee" },
	{ state: "Yoghurt" },
  ];


  export let data: {query: string; promise: string}
  let query: string, promise: string
  $: data = {query, promise}

  const extract = (item: any) => item.state;
</script>

<div class="flex flex-col justify-center items-center h-[100vh] gap-4">
	<h1>เลือกเมมเบอร์</h1>
	<Typeahead data={memberState} {extract} let:result let:index class="text-gray-800 rounded" hideLabel limit={3} bind:value={query}>
	  <div class="flex flex-row gap-4 text-gray-800 h-[40px] items-center justify-start">
		  <img class="w-auto h-[40px] rounded-full" src="profile/icon/{result.original.state}.webp" alt="">
		  <strong class="text-lg">{@html result.string}</strong>
	</div>
	</Typeahead>
	คำสัญญา
	<textarea name="" id="" cols="30" rows="10" bind:value={promise} class="text-gray-800 rounded"></textarea>
	<Button size="xl" on:click={() => submit()}>Preview</Button>
</div>
{query}
{promise}