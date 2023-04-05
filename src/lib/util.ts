import html2canvas from 'html2canvas';

const floatingVowel = [
	'ั',
	'ี',
	'้',
	'่',
	'ิ',
	'ื',
	'ุ',
	'ู',
	'ึ',
	'ํ',
	'๊',
	'็',
	'๋',
	'ฺ',
	'์',
	'ํ'
];
const halfChar = ['ใ', 'ไ', 'เ'];
export const thaiLength = (txt: string) => {
	let counter = 0;
	for (let index = 0; index < txt.length; index++) {
		const element = txt.charAt(index);
		if (floatingVowel.includes(element)) {
			continue;
		} else if (halfChar.includes(element)) {
			counter += 0.5;
			continue;
		}
		counter++;
	}
	return counter;
};

export const exportImage = async (el: HTMLElement, fileName: string) => {
	el.classList.remove('hidden');
	const canvas = await html2canvas(el, { scale: 1 });
	const img = canvas.toDataURL('image/jpeg', 0.95);
	// const img = window.URL.createObjectURL(canvas.toBlob())
	downloadImage(img, fileName);
	el.classList.add('hidden');
};

export const downloadImage = async (blob: string, fileName: string) => {
	const link = window.document.createElement('a');
	link.setAttribute('style', 'display:none;');
	link.download = fileName;
	link.href = blob;
	link.click();
	link.remove();
};
