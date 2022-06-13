const nameElem = document.querySelector('.cursor');

document.onmousemove = (e) => {
    nameElem.style.left = (e.pageX - 5) + "px";
    nameElem.style.top = (e.pageY - 5) + "px";
    nameElem.style.display = "block";
}

const gradients = [
	'linear-gradient(to right, #fffcdc, #d9a7c7)',
	'linear-gradient(to bottom left, rgba(105, 178, 251, 1.0), rgba(32, 74, 83, 1.0))',
	'linear-gradient(to right, #00223E, #FFA17F)',
	'linear-gradient(to bottom left, rgba(13, 67, 137, 1.0), rgba(219, 188, 166, 1.0))',
	'linear-gradient(to right, #dc2430, #7b4397)',
	'linear-gradient(to right, #fcb045, #fd1d1d, #833ab4)',
	'linear-gradient(to bottom left, rgba(13, 67, 137, 1.0), rgba(219, 188, 166, 1.0))',
	'linear-gradient(to right, #BDFFF3, #4AC29A)',
	'linear-gradient(to right, #00dbde, #fc00ff)',
	'linear-gradient(to bottom left, rgba(105, 173, 38, 1.0), rgba(217, 181, 194, 1.0))',
	'linear-gradient(to right, #4BC0C8, #C779D0, #FEAC5E)',
	'linear-gradient(to bottom left, rgba(158, 255, 181, 1.0), rgba(35, 152, 19, 1.0))',
	'linear-gradient(to right, #33001b, #ff0084)',
	'linear-gradient(to right, #135058, #F1F2B5)',
	'linear-gradient(to bottom left, rgba(223, 195, 50, 1.0), rgba(84, 107, 166, 1.0))',
	'linear-gradient(to right, #000000, #EB5757)',
	'linear-gradient(to bottom left, rgba(178, 13, 254, 1.0), rgba(106, 163, 16, 1.0))',
	'linear-gradient(to right, #2a0845, #6441A5)',
	'linear-gradient(to bottom left, rgba(50, 145, 126, 1.0), rgba(248, 131, 179, 1.0))',
	'linear-gradient(to right, #001510, #00bf8f)',
	'linear-gradient(to bottom left, rgba(122, 55, 232, 1.0), rgba(254, 50, 196, 1.0))',
	'linear-gradient(to right, #cbb4d4, #20002c)',
	'linear-gradient(to right, #ffdde1, #ee9ca7)',
	'linear-gradient(to bottom left, rgba(134, 73, 10, 1.0), rgba(55, 61, 137, 1.0))',
	'linear-gradient(to right, #eef2f3, #8e9eab)',
	'linear-gradient(to bottom left, rgba(77, 89, 237, 1.0), rgba(228, 31, 44, 1.0))',
	'linear-gradient(to right, #29ffc6, #20e3b2, #0cebeb)',
	'linear-gradient(to right, #C6426E, #642B73)',
	'linear-gradient(to right, #FFFFFF, #EF3B36)'
]

const bodyElem = document.querySelector('#body');
const contentElem = document.querySelector('.content');
const headerElem = document.querySelector('.header');
const timerElem = document.querySelector('.bottom__wrap');
const hiddenTextElem = document.querySelector('.hidden-text');
const removeElem = document.querySelector('.remove');
const lottieBoxBang = document.querySelector('.lottie__box_bang');
const baseTimerElem = document.querySelector('.base-timer-label');
const cursorElem = document.querySelector('.cursor');

function arrayRandElement(arr) {
	let rand = Math.floor(Math.random() * arr.length);
	return arr[rand];
}

headerElem.addEventListener('mouseenter', () => {
	let color = arrayRandElement(gradients);
	bodyElem.style.background = `${color}`;
	nameElem.style.transform = 'scale(2.5)';
})

headerElem.addEventListener('mouseleave', () => {
	nameElem.style.transform = 'scale(1)';
})

let hoverText = document.querySelectorAll('.bang');

hoverText.forEach((item) => {
	item.addEventListener('mouseover', () => {
		item.classList.add('active')
	});
	item.addEventListener('mouseleave', () => {
		function remove() {
			item.classList.remove('active')
		}
		setTimeout(remove)
	});
});

bodyElem.addEventListener('click', () => {
	headerElem.classList.add('up');
	timerElem.classList.add('show');
	if(!removeElem.classList.contains('show')) {
		hiddenTextElem.classList.add('show');
	}
	lottieBoxBang.classList.add('show');
	countdownStart();
	setTimeout(() => {
		timerElem.classList.remove('show');
		hiddenTextElem.classList.remove('show');
		lottieBoxBang.classList.remove('show');
		headerElem.classList.remove('up');
	}, 6000)
});

document.addEventListener('keyup', function (event) {
	if (event.keyCode == '32') {
		headerElem.classList.add('up');
		headerElem.remove();
		timerElem.classList.add('show');
		if(!hiddenTextElem.classList.contains('show')) {
			removeElem.classList.add('show');
		}
		lottieBoxBang.classList.add('show');
		countdownStart();
		setTimeout(() => {
			timerElem.classList.remove('show');
			removeElem.classList.remove('show');
			lottieBoxBang.classList.remove('show');
			headerElem.classList.remove('up');
			headerElem.classList.add('pre');
			contentElem.appendChild(headerElem);
			setTimeout(() => {
				headerElem.classList.remove('pre');
			}, 100)
		}, 6000)
	}
});

const countdownStart = () => {
	const FULL_DASH_ARRAY = 283;
	const WARNING_THRESHOLD = 10;
	const ALERT_THRESHOLD = 5;

	const COLOR_CODES = {
		info: {
			color: "green"
		},
		warning: {
			color: "orange",
			threshold: WARNING_THRESHOLD
		},
		alert: {
			color: "red",
			threshold: ALERT_THRESHOLD
		}
	};

	const TIME_LIMIT = 5;
	let timePassed = 0;
	let timeLeft = TIME_LIMIT;
	let timerInterval = null;
	let remainingPathColor = COLOR_CODES.info.color;

	document.getElementById("app").innerHTML = `
	<div class="base-timer">
		<svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
			<g class="base-timer__circle">
			<circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
			<path
				id="base-timer-path-remaining"
				stroke-dasharray="283"
				class="base-timer__path-remaining ${remainingPathColor}"
				d="
				M 50, 50
				m -45, 0
				a 45,45 0 1,0 90,0
				a 45,45 0 1,0 -90,0
				"
			></path>
			</g>
		</svg>
		<span id="base-timer-label" class="base-timer__label">${formatTime(
			timeLeft
		)}</span>
	</div>
	`;

	startTimer();

	function onTimesUp() {
		clearInterval(timerInterval);
	}

	function startTimer() {
		timerInterval = setInterval(() => {
			timePassed = timePassed += 1;
			timeLeft = TIME_LIMIT - timePassed;
			document.getElementById("base-timer-label").innerHTML = formatTime(
				timeLeft
			);
			setCircleDasharray();
			setRemainingPathColor(timeLeft);

			if (timeLeft === 0) {
				onTimesUp();
			}
		}, 1000);
	}

	function formatTime(time) {
		let seconds = time % 60;

		if (seconds < 5) {
			seconds = `${seconds}`;
		}

		return `${seconds}`;
	}

	function setRemainingPathColor(timeLeft) {
		const { alert, warning, info } = COLOR_CODES;
		if (timeLeft <= alert.threshold) {
			document
				.getElementById("base-timer-path-remaining")
				.classList.remove(warning.color);
			document
				.getElementById("base-timer-path-remaining")
				.classList.add(alert.color);
		} else if (timeLeft <= warning.threshold) {
			document
				.getElementById("base-timer-path-remaining")
				.classList.remove(info.color);
			document
				.getElementById("base-timer-path-remaining")
				.classList.add(warning.color);
		}
	}

	function calculateTimeFraction() {
		const rawTimeFraction = timeLeft / TIME_LIMIT;
		return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
	}

	function setCircleDasharray() {
		const circleDasharray = `${(
			calculateTimeFraction() * FULL_DASH_ARRAY
		).toFixed(0)} 283`;
		document
			.getElementById("base-timer-path-remaining")
			.setAttribute("stroke-dasharray", circleDasharray);
	}
}

//Countdown events
// const countdownStarter = () => {
// 	let $circleBorder = $('.countdown__icon__circle').get(0);
// 	let $countdown = $('.countdown');

// 	let length = $circleBorder.getTotalLength();
// 	let counter = {
// 		let: 5
// 	};

// 	let tl = new TimelineMax({
// 		delay: 0.75,
// 		repeatDelay: 1,
// 		repeat: 1,
// 	});


// 	tl.play();
// 	opacity();

// 	tl.set($countdown, {
// 		scale: 0,
// 	}).to($countdown, 0.4, {
// 		scale: 1,
// 		ease: Back.easeOut.config(1.4),
// 	}).to($circleBorder, 5, {
// 		strokeDashoffset: length,
// 		stroke: '#FB7593',
// 		ease: Power0.easeNone
// 	}).to(counter, 5, {
// 		let: 0,
// 		onUpdate: function () {
// 			$('.countdown__number').html(Math.ceil(counter.let));
// 		},
// 		ease: Power0.easeNone
// 	}, '-= 10')
// 		.to($countdown, 0.4, {
// 			scale: 0,
// 			ease: Back.easeIn.config(1.4),
// 			onComplete: function () {
// 				$('.countdown__number').html('10');
// 			}
// 		});
// }

let cx, cy, mouseX, mouseY, posX, posY, clientX, clientY, dx, dy, tiltx, tilty, request, radius, degree

document.addEventListener('DOMContentLoaded', () => {

	// Custom JS

const body = document.querySelector('body')

	cx = window.innerWidth / 2
	cy = window.innerHeight / 2

	body.addEventListener('mousemove', e => {

		clientX = e.pageX
		clientY = e.pageY

		request = requestAnimationFrame(updateMe)

		mouseCoords(e)
	})

	function updateMe() {

		dx     = clientX - cx
		dy     = clientY - cy
		tiltx  = dy / cy
		tilty  = dx / cx
		radius = Math.sqrt(Math.pow(tiltx, 2) + Math.pow(tilty, 2))
		degree = radius * 30
		gsap.to('.content', 1, { transform: `rotate3d( ${tiltx}, ${tilty}, 0, ${degree}deg )` })

	}
})