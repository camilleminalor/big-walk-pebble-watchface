import Poco from "commodetto/Poco";

let render = new Poco(screen);

const font = new render.Font("Gothic-Bold", 24);

const black = render.makeColor(0, 0, 0);
const white = render.makeColor(255, 255, 255);

const red = render.makeColor(255, 0, 0);
const blue = render.makeColor(90, 120, 255);




function posOnClock(progress, dist=80) {
	const angle = progress * 360;
	const rad = (angle - 90) * Math.PI / 180;
	const x = 130 + Math.cos(rad) * dist;
	const y = 130 + Math.sin(rad) * dist;
	return { x, y };
}





function draw() {
	render.begin();
	render.fillRectangle(blue, 0, 0, render.width, render.height);
	
	const date = new Date

	

	// Taille écran : 260x260

	// CADRAN
	
	// Contour bleu (donc dessin du cercle blanc sur le fond déjà bleu)
	render.drawCircle(white, 130, 130, 120);

	// Nombres
	for (let i = 1; i <= 12; i++) {
		const { x, y } = posOnClock(i / 12, 95);
		const width = render.getTextWidth(i.toString(), font);
		render.drawText(i.toString(), font, black, x - width / 2, y - font.height / 2);
	}

	// Points
	for (let i = 0; i < 60; i++) {
		const { x, y } = posOnClock(i / 60, 110);

		let thickness = (i % 5 === 0) ? 2 : 1;

		render.drawCircle(black, x, y, thickness);
	}


	//big hand
	// Après observations in-game:
	// Cette hand est 8x plus rapide qu'une minute hand
	// Elle fait un tour toutes les 7.5 minutes (450 secondes)
	// Egalement, elle part avec un décalage de -6° (un point) par rapport à la trotteuse. 
	// -> En tout cas, elle passe par ce point à un moment, et le système est régulier.
	// -> Point de départ : Trotteuse sur 12 pile, et big hand sur 12h -1 point.
	// La période du système est de 900 secondes, deux tours de big hand. (15minutes)
	// const { x: x_big, y: y_big } = posOnClock((date.getMinutes() % 7.5 / 7.5 + date.getSeconds()/450 + date.getMilliseconds()/450000 - 6/360), 80);
	const { x: x_big, y: y_big } = posOnClock((date.getMinutes() % 7.5 / 7.5 + date.getSeconds()/450 - 6/360), 80);
	render.drawLine(130, 130, x_big, y_big, black, 10);
	render.drawCircle(white, x_big, y_big, 4);

	//second hand
	const { x: x_trot, y: y_trot } = posOnClock(date.getSeconds() / 60, 104);
	render.drawLine(130, 130, x_trot, y_trot, red, 5);
	// second hand tail
	// const { x: x_trot_tail, y: y_trot_tail } = posOnClock((date.getSeconds() + 30) / 60 % 1, 10);
	const tail_size = 0.1;
	render.drawLine(130, 130, 130 + 130*tail_size + x_trot*tail_size*-1, 130 + 130*tail_size + y_trot*tail_size*-1, red, 5);

	// Red circle in the middle
	render.drawCircle(red, 130, 130, 8);
	



	render.end();
}

watch.addEventListener('secondchange', draw);
// 20 FPS
// setInterval(draw, 50);
watch.addEventListener("resize", draw);
