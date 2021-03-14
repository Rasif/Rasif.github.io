const onContentLoaded = () => {
	function Tabs() {
		let tab = document.querySelector('.tabs');
		let contents = document.querySelectorAll('.tabs__item');

		const makeLinkActive = element => {
			const activeTabLink = document.querySelector('.tabs__link-active');

			activeTabLink.classList.remove('tabs__link-active');

			element.classList.add('tabs__link-active');
		};

		const makeContentActive = index => {
			const activeContent = document.querySelector('.tabs__item-active');

			activeContent.classList.remove('tabs__item-opacity');

			setTimeout(() => {
				activeContent.classList.remove('tabs__item-active');
				contents[index - 1].classList.add('tabs__item-active');

				setTimeout(() => {
					contents[index - 1].classList.add('tabs__item-opacity');
				}, 10);
			}, 400);
		};

		const onTabClicked = e => {
			const el = e.target;

			if (!el.classList.contains('tabs__link') || el.classList.contains('tabs__link-active')) {
				return;
			}

			makeLinkActive(el);
			makeContentActive(el.innerText);
		};

		const initialize = () => {
			if (!tabs || !contents) {
				console.log('You dont have elements tabs and tabs__item');
				return;
			}

			tab.addEventListener('click', onTabClicked);
		};

		return {
			initialize
		};
	}

	let tabs = new Tabs();
	tabs.initialize();

	$('.shop__wrapper').slick({
		dots: false,
		infinite: false,
		speed: 200,
		slidesToShow: 3,
		slidesToScroll: 1,
		centerMode: false,
		variableWidth: true
	});

	$('.favorites').slick({
		dots: false,
		infinite: false,
		speed: 200,
		slidesToShow: 2,
		slidesToScroll: 1,
		centerMode: false,
		variableWidth: true
	});
};

document.addEventListener('DOMContentLoaded', onContentLoaded);
