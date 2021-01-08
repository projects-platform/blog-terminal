import '@stylus/terminal'

$(function(){
	const API = 'https://api.github.com/repos/silencehvk/blog';
	let folder = [];
	const commandList = ['ls', 'cd', 'cat', 'rm', 'clear', 'help', 'uname'];
	let position = '~';

	const $prefix = $('.prefix');
	const $cmdput = $('.input-text');
	const $content = $('.content');
	const $html = $('body,html');

	const doCommand = (cancel = false) => {
			const input = $cmdput.text().trim();
			if (input === '') {
					$content.append(`${$prefix.html()}&nbsp;<br>`);
					return;
			}
			const commands = input.replace(/\s+/g, ' ').split(' ');
			const cmd = $.trim(commands[0].toLowerCase());
			let resultContent = `${$prefix.html()}&nbsp;${input}&nbsp;`;

			if(!cancel){
				switch(cmd) {
					case 'help':
							resultContent += `command[ Options...]<br>You can use following commands:<br><br>${commandList.join('<br>')}<br><br>Besides, there are some hidden commands, try to find them!`;
					break;
					case 'exit':
							resultContent += `（＾∀＾●）ﾉｼ вyё вyё~ <br>`;
							window.open('https://blog.hvkcoder.me');
					break
					case 'clear':
						$content.html(`<br>`);
						$cmdput.html('&ensp;');
					return;
					case 'ls':
						const folders = folder.map(item => `<span class='folder'><span class='iconfont icon-folder'></span>&ensp;${item.name}</span>`);
						resultContent += `<div class='folder-container'>${folders.join(' ')}</div>`;
					break;
					case 'cd':
						if(commands.length === 2) {
							const [_, folder] = commands;
							// const $contentTest = $(`<div>${resultContent}</div>`);
							// $contentTest.find('#pos').eq(0).html('fda');
							// resultContent += `${$contentTest.html()}`;
						}
						if(commands.length > 2) {
							resultContent = `<span class="error">${resultContent}</span><br>cd: string not in pwd: ${commands[1]}`;
						}
					break;
					default:
							resultContent = `<span class="error">${resultContent}</span><br>zsh: command not found: ${cmd}`;
					break;
				}
			}
			$content.append(resultContent + '<br>');
			$cmdput.html('&ensp;');
	}

	const getLabels =  async () => {
			const { data } = await axios.get(`${API}/labels`);
			folder = data;
	};

	document.addEventListener('keydown', event => {
			$cmdput.focus();
			if(event.keyCode === 13) {
				  event.preventDefault();
					doCommand();
					$html.animate({ scrollTop: $(document).height() },0);
			} else if(event.ctrlKey && event.keyCode === 75) { // Ctrl + K
				$content.html('<br>');
			} else if(event.ctrlKey && event.keyCode === 67) { // Ctrl + C
				doCommand(true);
			}
	}, false);

	$cmdput.focus();
	getLabels();
});
