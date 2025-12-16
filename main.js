const launchButton = document.getElementById('main');
const dragBox = document.getElementById('dragbox');
let isDragging = false;
let startX= 0, startY= 0, dydx = 0, offsetX= 0, offsetY= 0, halfX = 0, halfY = 0;
const canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 1;
const contxt = canvas.getContext("2d");
let cursorIcon = document.getElementById("cursorIcon");

launchButton.addEventListener('mousedown', function(event) {
	startX = event.clientX
	startY = event.clientY
	launchButton.style.cursor = 'grabbing';
	isDragging = true;
	offsetX = 0, offsetY = 0;
	launchButton.style.transform = "translate(-50%, -50%) scale(1.1)";
});


document.addEventListener('mouseup', function(event) {
	launchButton.style.cursor = 'grab';
	if (isDragging == true) {
	isDragging = false
        dragBox.style.left = `50%`;
        dragBox.style.top= `50%`;
	contxt.clearRect(0, 0, canvas.width, canvas.height);
	launchButton.style.transform = "translate(-50%, -50%) scale(1)";
	}
	hideElements();

});


document.addEventListener('mousemove', function(event) {
            if (isDragging) {
		offsetX = event.clientX - startX
		offsetY = event.clientY - startY
		offsetY = offsetY * -1
                dragBox.style.left = `${event.clientX}px`;
                dragBox.style.top = `${event.clientY}px`;
		halfX = window.innerWidth / 2 
		halfY = window.innerHeight / 2
		contxt.beginPath();
		contxt.moveTo(halfX,halfY);
		contxt.lineTo(event.clientX,event.clientY);
		contxt.lineWidth = 12;
		contxt.clearRect(0, 0, canvas.width, canvas.height);
		contxt.stroke();
		displayIcon(offsetX, offsetY);
}
        });

function displayIcon(x,y) {
	dydx = y / x; 
	if (dydx > 1 || dydx < -1) {
		if (y > 0) {
		 cursorIcon.innerText = "school";	
		styleCursor("#7DAEA3");
		hideElements();
		document.getElementById("schoolIcon").style.display = "none";
		}
		if (y < 0) {
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
	contxt.strokeStyle = color;
	dragBox.style.borderColor = color;
	dragBox.style.backgroundColor = color;
}

function hideElements() {
	let elements = document.getElementsByClassName('circle');
	for (let i = 0; i < elements.length; i++) {
    		elements[i].style.display = 'block';
}

}
