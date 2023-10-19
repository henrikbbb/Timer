let img1, img2
let shake = 0
let alarm
let slider
let time = 1000 * 60
let buttonStart
let playAlarm
let deltaTime
let timerIsRunning = false
let timerLength

function preload() {
	img1 = loadImage("wecker4.png")
	img2 = loadImage("wecker3.png")
	alarm = loadSound("alarm clock.mp3")
}

function setup() {
	createCanvas(600, 600)

	slider = createSlider(0, 20, 1)
	slider.input(() => {
		time = slider.value() * 60 * 1000
		timerIsRunning = false
	})

	buttonStart = createButton('start timer')
	buttonStart.mousePressed(() => {
		deltaTime = millis()
		playAlarm = true
		timerIsRunning = true
		timerLength = time
	})
}

function draw() {
	background(255)

	push()
	translate(width/2, height/2)
	if (alarm.isPlaying()) {
		shake += 0.5
		rotate(sin(shake)/20)
		image(img2, -width/2, -height/2)
	} else {
		image(img1, -width/2, -height/2)
	}
	if (time > - 1000) {
		let minutes = int(time / 60 / 1000)
		let remainingTime = time - minutes * 60 * 1000
		let seconds = int(remainingTime / 1000)
		textAlign(CENTER, CENTER)
		textSize(60)
		fill(0)
		stroke(0)
		strokeWeight(1)
		text(nf(minutes, 2) + ":" + nf(seconds, 2), 0, 0)
	}
	pop()

	if (timerIsRunning) {
		let progressbarWidth = width/2
		let progressbarX = (width - progressbarWidth) / 2
		fill(255, 0, 0)
		noStroke()
		let w = map(time, 0, timerLength, 0, progressbarWidth)
		rect(progressbarX, height*0.8, w, 50)
		noFill()
		stroke(0)
		strokeWeight(5)
		rect(progressbarX, height*0.8, progressbarWidth, 50)
	}

	if (time <= 0) {
		if (playAlarm && !alarm.isPlaying()) {
			timerIsRunning = false
			alarm.play()
			playAlarm = false
		}		
	}
	if (timerIsRunning) {
		let elapsedTime = millis() - deltaTime
		time -= elapsedTime
		deltaTime = millis()
	}
}