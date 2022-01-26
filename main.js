let controlDiv = document.querySelector('.control-button');
let controlBtn = document.querySelector('.control-button span');
let userName = document.querySelector('.info-container .name span');


controlBtn.onclick = function() {
    let yourName = prompt("Please enter your name");

    if (yourName == null || yourName == '' || yourName == " "){
        userName.innerHTML = 'Unknown'
    }else {
        userName.innerHTML = yourName
    }
    controlDiv.remove();
}

let duration = 1000;

let blocksContainer = document.querySelector('.memory-blocks');

let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);

blocks.forEach((block, index) => {
    block.style.order = orderRange[index];

    block.addEventListener('click', function(){
        flipBlock(block)
    })
});

// flip function
function flipBlock(selectedBlock) {
    selectedBlock.classList.add('flipped');
    let allFlippedBlocks = blocks.filter(filppedBlock => filppedBlock.classList.contains('flipped'));
    if (allFlippedBlocks.length === 2) {
        // stop clicking function
        stopClicking();

        // check correct chose function
        checkMatched(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}

// stop clickinng function

function stopClicking(){
    blocksContainer.classList.add('stop-clicking');
    setTimeout(() => {
        blocksContainer.classList.remove('stop-clicking');
    }, duration)
}
// checked matched blocks
function checkMatched(firstBlock, secondBlock) {
    let tries = document.querySelector('.tries span');
    if (firstBlock.dataset.tech === secondBlock.dataset.tech){

        firstBlock.classList.remove('flipped');
        secondBlock.classList.remove('flipped');

        firstBlock.classList.add('matched');
        secondBlock.classList.add('matched');

        document.getElementById('success').play();

    }else {
        tries.innerHTML = parseInt(tries.innerHTML) + 1
        setTimeout( () => {
            firstBlock.classList.remove('flipped');
            secondBlock.classList.remove('flipped');
        }, duration);
        document.getElementById('fail').play();
    }
}

// shuffle function

function shuffle(array) {
    let current = array.length,
        temp,
        random;
    while(current > 0) {
        random = Math.floor(Math.random() * current);
        current--;

        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }
    return array;
}

