var running = false; // Se o app está rodando ou não

//Botões
const startBtn = document.getElementById("startbtn");
const stopBtn = document.getElementById("stopbtn");
const resetBtn = document.getElementById("resetbtn");

//Elementos
const dvdBlock = document.getElementById("dvdblock"); //Bloco Outline onde está o DVD
const dvd = document.getElementById("dvd"); //Div DVD (com a imagem dentro)
var speedSlider = document.getElementById("speedslider"); //Slider Velocidade
var speedText = document.getElementById("speedtext"); //Texto "Speed -> x"

//Styles
const dvdStyle = window.getComputedStyle(dvd);
const dvdBlockStyle = window.getComputedStyle(dvdBlock);

//Variáveis Movimento
const displacement = 1; //Deslocamento
var speed; //Velocidade
var xDirection = 1; //Direção Eixo X; Inverter quando bater nas paredes esquerda e direita
var yDirection = 1; //Direção Eixo Y; Inverter quando  bater no teto e chao

//Variáveis Colisão
const dvdWidth = parseInt(dvdStyle.getPropertyValue("width")); //Largura DVD
const dvdHeight = parseInt(dvdStyle.getPropertyValue("height")); //Altura DVD
var dvdBlockW = parseInt(dvdBlockStyle.getPropertyValue("width"));; //Largura DVD Block
var dvdBlockH = parseInt(dvdBlockStyle.getPropertyValue("height"));; //Altura DVD Block

var dvdLeft; //Margem esquerda do DVD
var dvdTop; //Margem top DVD

//Loops (serão usados para repetir as funções move e collision
var move_loop;
var collision_loop;

//Colocando os botões para ficarem na ativa para clicks
startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
resetBtn.addEventListener("click", reset);

function start() {
	//Só inicia caso não esteja rodando
	if (!running) {
		//Sinaliza que o programa está rodando
		running = true;
		
		//Seta os loops para acionarem a cada 5 e 10ms. Collision aciona 2x mais para que não hajam bugs
		collision_loop = setInterval(collision, 5);
		move_loop = setInterval(move, 10);
	}
}

function stop() {
	//Só para caso já esteja rodando
	if (running) {
		//Parar o loop de movimento
		clearInterval(move_loop);
		
		//Sinaliza que o programa não está rodando mais
		running = false;
	}
}

function reset() {
	//Se estiver rodando, parar
	if (running) {
		stop();
	}
	
	//Colocar o DVD no canto superior esquerdo do DVD Block (seu espaço inicial)
	dvd.style.left = "0px";
	dvd.style.top = "0px";
}

function move() {
	//Adicionar o deslocamento (1px) multiplicado pela velocidade e direção à margem esquerda do DVD
	dvd.style.left = dvdLeft + displacement * speed * xDirection + "px";
	//Adicionar o deslocamento (1px) multiplicado pela velocidade e direção à margem top do DVD
	dvd.style.top = dvdTop + displacement * speed * yDirection + "px";
}

function collision() {
	//Atualizar as variáveis
	updDvdBlock();
	updDvd();
	
	//Pingar nos cantos da tela
	//Eixo X
	if(dvdLeft == (dvdBlockW - dvdWidth) && xDirection == 1){
		xDirection = -1;
	}
	else if (xDirection == -1 && dvdLeft == 0) {
		xDirection = 1;
	}
	
	//Eixo Y
	if(dvdTop == (dvdBlockH - dvdHeight) && yDirection == 1){
		yDirection = -1;
	}
	else if (yDirection == -1 && dvdTop == 0) {
		yDirection = 1;
		
	}
	
	//Impedir de sair do dvdblock
	//Eixo X
	if(dvdLeft > (dvdBlockW - dvdWidth)) { // Caso passe da parede direita do (DVD Block - Altura DVD)
		dvd.style.left = dvdBlockW - dvdWidth + "px";
	}
	else if (dvdLeft < 0) { // Caso vá para a esquerda além da parede do DVD Block
		dvd.style.left = "0px";
	}
	
	//Eixo Y
	if(dvdTop > (dvdBlockH - dvdHeight)) { // Caso passe da base do (DVD Block - Altura DVD)
		dvd.style.top = dvdBlockH - dvdHeight + "px";
	}
	else if (dvdTop < 0) { // Caso vá para cima além do topo do DVD Block
		dvd.style.top = "0px";
	}
}

function updDvdBlock() {
	//Atualizar largura e altura do Bloco Outline onde o dvd está
	dvdBlockH = parseInt(dvdBlockStyle.getPropertyValue("height"));
	dvdBlockW = parseInt(dvdBlockStyle.getPropertyValue("width"));
}

function updDvd() {
	//Atualizar os atributos left e top do dvd
	dvdLeft = parseInt(dvdStyle.getPropertyValue("left"));
	dvdTop = parseInt(dvdStyle.getPropertyValue("top"));
}


//Mudar speed e Texto "Speed -> x" sempre que houver alteração no slider
speedSlider.oninput = function () {
	speed = this.value;
	speedText.innerHTML = "Speed -> " + this.value;
}


window.onload = function () {
	//Resetar o slider de velocidade
	speedSlider.value = "1";
	speed = speedSlider.value;
}

