const launchButton = document.getElementById('main');
const dragBox = document.getElementById('dragbox');
let isDragging = false;
const canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
let cursorIcon = document.getElementById("cursorIcon");
let joint = document.getElementById('joint');
let dydx = 0, offsetX = 0, offsetY = 0, startX = canvas.width / 2, startY = canvas.height / 2, halfX = 0, halfY = 0; persistentLineX = 0;
let alreadyCalled = false;
ctx.lineWidth = 12;

launchButton.addEventListener('mousedown', function(event) {
	launchButton.style.cursor = 'grabbing';
	isDragging = true;
	offsetX = 0, offsetY = 0;
	launchButton.style.transform = "translate(-50%, -50%) scale(1.1)";
});


document.addEventListener('mouseup', function(event) {
	launchButton.style.cursor = 'grab';
	if (isDragging == true) {
	isDragging = false
	resetCanvas();
	}
});


document.addEventListener('mousemove', function(event) {
            if (isDragging) {
		offsetY = offsetY * -1
                dragBox.style.left = `${event.clientX}px`;
                dragBox.style.top = `${event.clientY}px`;
		distance = Math.hypot(Math.abs(offsetX),Math.abs(offsetY))
		offsetX = event.clientX - startX; 
		offsetY = event.clientY - startY;
		if (distance > 300 && previousDistance < 300) {
			startX = event.clientX;
			startY = event.clientY;
			persistentLineX = startX;
			persistentLineY = startY;
			joint.style.left = `${persistentLineX}px`;
			joint.style.top = `${persistentLineY}px`;
			divs = document.getElementsByClassName('div');
			for (let index = 0; index < divs.length; index++) {
				divs[index].style.left = `${persistentLineX}px`;
				divs[index].style.top = `${persistentLineY}px`;
			}
		document.getElementById('jointText').innerText = cursorIcon.innerText;
		}
		previousDistance = distance
		drawLine(startX,startY)
}
        });

function displayIcon(x,y) {
	dydx = y / x; 
	if (dydx > 1 || dydx < -1) {
		if (y < 0) {
		cursorIcon.innerText = "school";	
		styleCursor("#7DAEA3");
		hideElements();
		document.getElementById("schoolIcon").style.display = "none";
		}
		if (y > 0) {
		cursorIcon.innerText = "group";	
		styleCursor("#a8b665");
		hideElements();
		document.getElementById("groupIcon").style.display = "none";
		}
	} else {
		if (x > 0) {
		cursorIcon.innerText = "photo_camera";	
		styleCursor("#e96962");
		hideElements();
		document.getElementById("photoIcon").style.display = "none";
		}
		if (x < 0) {
		cursorIcon.innerText = "home";	
		styleCursor("#d7a657");
		hideElements();
		document.getElementById("homeIcon").style.display = "none";
		}
	}
}

function styleCursor(color) {
	ctx.strokeStyle = color;
	dragBox.style.borderColor = color;
	dragBox.style.backgroundColor = color;
	joint.style.backgroundColor = color;
}
function resetCanvas() {
        dragBox.style.left = `50%`;
        dragBox.style.top= `50%`;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	launchButton.style.transform = "translate(-50%, -50%) scale(1)";
	joint.style.left = '50%';
	joint.style.top = '50%';
	persistentLineX = 0;
	hideElements();
	divs = document.getElementsByClassName('div');
	for (let index = 0; index < divs.length; index++) {
		divs[index].style.left = '50%';
		divs[index].style.top = '50%';
	}
}

function hideElements() {
	let elements = document.getElementsByClassName('circle');
	for (let i = 0; i < elements.length; i++) {
    		elements[i].style.display = 'block';
}

}

function drawLine(startXc, startYc,clear = true,endX = event.clientX, endY = event.clientY) {
	if (clear == true) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.beginPath();
	} 
	ctx.moveTo(startXc,startYc);
	ctx.lineTo(endX,endY);
	ctx.stroke();
	if (persistentLineX != 0 && alreadyCalled == false) {
		alreadyCalled = true;
		drawLine(persistentLineX,persistentLineY, false,canvas.width / 2, canvas.height / 2);
		alreadyCalled = false;
	}
	displayIcon(offsetX, offsetY, false);
}
