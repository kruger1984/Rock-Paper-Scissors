/*

1.Зробити відкриття модального вікна. - готово
    - Зробити клік по кнопці "Правила"
    - Додати клас "modal--isActive" до блоку div.modal
2.Зробити закриття модального вікна: - готово
    - Прибрати клас "modal--isActive" div.modal

3.При обиранні фігури:
    - додати клас "gameContent--isActive" блоку div.gameContent 

    <!-- GAME CHOICES-->
    - при виборі бумаги - gameContent__gameChoice gameContent__gameChoice--isPaper gameContent__gameChoice--isActive
    - при виборі камінь - gameContent__gameChoice gameContent__gameChoice--isRock gameContent__gameChoice--isActive
    - при виборі ножиці - gameContent__gameChoice gameContent__gameChoice--isScissors ** gameContent__gameChoice--isActive

    gameContent__gameChoice gameContent__gameChoice--isComputer
    - запустити таймер 
    - після закінчення таймеру
            - обрати випадкову фігуру
                        - додати клас що вибрав компьютер  {{gameContent__gameChoice--isScissors}}
                        - gameContent__image - прописати src (шлях до картинки)

4.Після завершення гри
    - додати клас "gameContent--isActive gameContent--revealResult" блоку div.gameConten
    - gameContent__resultText прописати текст 
        - Draw
        - Win
        - Lose
    - header__scoreNumber додавати/віднімати рахунок


5. Після перезапуску гри видаляти всі класи блоку div.gameConten


*/

/*
    modal functionality
*/
let btnOpenModal = document.querySelector('.container__rules');
console.dir(btnOpenModal);


//зони для закриття модального вікна
let btnCloseModal = document.querySelector ('.modal__closeIcon');
let modalOverlay = document.querySelector ('.modal__overlay');

 btnOpenModal.onclick = function () {
    let modalWindow = document.querySelector('.modal');
    modalWindow.classList.add('modal--isActive');
    //modalWindow.className = "modal modal--isActive";
 }

 btnCloseModal.onclick = closeModal;
 modalOverlay.onclick = closeModal;
 function closeModal (){
    let modalWindow = document.querySelector('.modal');
    modalWindow.classList.remove('modal--isActive');

 }
 
 /**
  * Робимо клік по фугурам
  */
 //===============
 //обираємо фігури
 //===============
let gameChoicePaper = document.querySelector ('.gameContent__gameChoice--isPaper');
let gameChoiceRock = document.querySelector ('.gameContent__gameChoice--isRock');
let gameChoiceScissors = document.querySelector ('.gameContent__gameChoice--isScissors');
let gameContent = document.querySelector('.gameContent');
let playerChoice = 0;
let computerChoice = 0;
let gameScore = 0;
//=====================
//Функціонал кліків по кнопкам
//=====================

 //Робимо клік по бумазі
 gameChoicePaper.onclick = function(event) {
    console.dir(gameChoicePaper);
    startChoice(event.target);
    playerChoice = 1;
 }

 //Робимо клік по Камню
 gameChoiceRock.onclick = function(event) {
    console.dir(event);
    startChoice(event.target);
    playerChoice = 3;
 }
 //Робимо клік по ножицям
 gameChoiceScissors.onclick = function(event) {
    console.dir(gameChoiceScissors);
    startChoice(event.target);
    playerChoice = 2;
 }

 function startChoice(element){
    gameContent.classList.add('gameContent--isActive');
    element.classList.add("gameContent__gameChoice--isActive");

    //==================
 //Запускаємо таймер
 //==================
 let countDownText = document.querySelector(".gameContent__countdownText");
 let timer = 3;
 let timerID = setInterval(function(){
   timer--;
   countDownText.innerText = timer;
   if (timer == 0){
      countDownText.innerText = ""; //по закінченню таймера цифра зникала
      finish(); // запуск функції кінец гри
      clearInterval(timerID);
   }
 }, 500 );


 }

 function finish(){
   console.dir("end");
   choiceComputer ();
   result();
   
   
}

function result(){
   /**
    * win
    * lose
    * draw
    * 
    * 1. - isPaper
    * 2. - isScissors
    * 3. - isRock
    *    1 > 3 || 2 > 1 || 3 > 2
    */
   let resultText = document.querySelector('.gameContent__resultText');
   if (playerChoice == computerChoice){
      resultText.innerText = "Draw";
   } else if(
      (playerChoice == 1 && computerChoice == 3) ||
      (playerChoice == 2 && computerChoice == 1) ||
      (playerChoice == 3 && computerChoice == 2)
   ) {
      resultText.innerText = "Win";
      changeScore(1);
   } else {
      resultText.innerText = "Lose";
      changeScore(-1);
   }
   gameContent.classList.add('gameContent--revealResult'); // виводить результат (lose,win,draw);
}



   function changeScore(score){
      /**
       * 1 якщо score < 0 і очки у нас 0 - нічого не робимо
       */
      if(score < 0 && gameScore == 0){
         return;
      }
      gameScore = gameScore + score;
      let scoreBlockText = document.querySelector('.header__scoreNumber');
      scoreBlockText.innerText = gameScore;

   }
//Функція вибору фігури комп'ютера
   function choiceComputer (){
      computerChoice = random (1, 3);
      let image = "";
      let className = "";
   
      /* 1. якщо choice = 1
*******     image = "images/icon-paper.svg"
*******     className = "gameContent__gameChoice--isPaper"
*******     gameChoiceComputer.classList.add(className);
*******     замінити картинку gameContent__gameChoiceImage = image
*******
*******
      */

// if (choice == 1){
//    image = "images/icon-paper.svg";
//    className = ".gameContent__gameChoice--isPaper";
// } else if (choice == 2){
//    image = "images/icon-scissors.svg";
//    className = ".gameContent__gameChoice--isScissors";
// } else if (choice == 3) {
//    image = "images/icon-rock.svg";
//    className = ".gameContent__gameChoice--isRock";
// }

switch (computerChoice){ //в залежності від вибору змінює картинку та вибір компьютера
   case 1:
          image = "images/icon-paper.svg"; //шлях до картинки
          className = ".gameContent__gameChoice--isPaper";
      break;

      case 2:
         image = "images/icon-scissors.svg";
         className = ".gameContent__gameChoice--isScissors";
      break;

      case 3:
         image = "images/icon-rock.svg";
         className = ".gameContent__gameChoice--isRock";
      break;
      
}

//Міняємо клас комп'ютера
      let gameChoiceComputer = document.querySelector(".gameContent__gameChoice--isComputer");

      gameChoiceComputer.classList.add("className");
      
// Міняємо картинку      
      let gameChoiceComputerImage= document.querySelector('.gameContent__gameChoiceImage');
      gameChoiceComputerImage.src = image; //вставляє зображення фігури

   }

function random (min, max){
   let rand = min + Math.random() * (max + 1 - min);
   return Math.floor(rand);
}

/**
 * Перезапуск гри 
 * 
 */
let reloadButton = document.querySelector('.gameContent__resultButton');
console.dir(reloadButton);
reloadButton.onclick = reload;

//Функція перезапуску гри
 function reload (){
   gameContent.classList.remove("gameContent--isActive", "gameContent--revealResult");
   let activeElement = document.querySelector('.gameContent__gameChoice--isActive');
   activeElement.classList.remove("gameContent__gameChoice--isActive"); //прибираємо клас

   // //очщаемо вибір опонента
   let gameChoiceComputerImage = document.querySelector('.gameContent__gameChoiceImage');
    gameChoiceComputerImage.src = ""; //прибираємо зображення фігури вибору опонента

   let gameChoiceComputer = document.querySelector(".gameContent__gameChoice--isComputer");
   gameChoiceComputer.className = "gameContent__gameChoice gameContent__gameChoice--isComputer";
   let countDownText = document.querySelector(".gameContent__countdownText");
   countDownText.innerText = 3; //повернути таймеру цифру 3 якщо не зробити то буде пусте поле а потім 2,1,0
}