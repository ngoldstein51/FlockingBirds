let nodes = [];
let birds = 100;
let clost_dist = 20;
let med_dist = 50;
let far_dist = 150;
let speed = 10;
let width = 1920;
let height = 900;


function setup() {
	createCanvas(width, height);
	console.log(width, height);
	for (var i=0;i<birds;i++) {
		let adding = {name:i.toString(), pos:[900,450], dir:0, vel:speed};
		adding.dir = random(0,359);
		adding.pos[0] += random(50,100);
		adding.pos[1] += random(50,100);
		nodes.push(adding);
	}
}

function draw() {
	clear();
	drawNodes(nodes);
	updatePos(nodes);
	updateDir(nodes);
	for (var i = 0; i < nodes.length; i++) {
		
	}
}

function drawNodes(node_list) {
	for (var i = 0; i < node_list.length; i++) {
		let curr = node_list[i];
		ellipse(curr.pos[0], curr.pos[1], 20, 20);
	}
}

function updatePos(node_list) {
	for (var i = 0; i < node_list.length; i++) {
		let curr = node_list[i];
		curr.pos[0] = (width+ curr.pos[0] + curr.vel*cos(radians(curr.dir)))%width;
		curr.pos[1] = (height + curr.pos[1] + curr.vel*sin(radians(curr.dir)))%height;
	}
}

function updateDir(node_list) {
	let len = node_list.length;
	for (var i = 0; i < len; i++) {
		let curr = node_list[i];

		let avg_pos=[0,0];
		let closest = node_list[0];
		let min_dist = dist(curr.pos[0], curr.pos[1], closest.pos[0], closest.pos[1]);
		
		if(closest.name = curr.name) {
			closest = node_list[1];
			min_dist = dist(curr.pos[0], curr.pos[1], closest.pos[0], closest.pos[1]);
		}
		for (var k = 0; k < len; k++) {
			let a = node_list[k];
			avg_pos[0]+=a.pos[0];
			avg_pos[1]+=a.pos[1];
			if(curr.name != a.name && dist(curr.pos[0], curr.pos[1], a.pos[0], a.pos[1]) < min_dist) {
				closest = a;
				min_dist = dist(curr.pos[0], curr.pos[1], closest.pos[0], closest.pos[1]);
			}
		}
		avg_pos[0] = avg_pos[0]/len;
		avg_pos[1] = avg_pos[1]/len;

		let close = dist(curr.pos[0], curr.pos[1], closest.pos[0], closest.pos[1]);
		
		if(close < clost_dist) {
			curr.dir = 180 + degrees(atan2(closest.pos[1]-curr.pos[1],closest.pos[0]-curr.pos[0]));
		}

		if(close > med_dist && close < far_dist) {
			curr.dir = ((curr.dir + closest.dir)%360) / 2
		}

		if (close < 30) {
			curr.dir = (curr.dir + closest.dir)/2;
		}
	}
}