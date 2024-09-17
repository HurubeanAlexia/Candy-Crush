document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const width = 8
    // 8 * 70 = 560
    const squares = []
    let score = 0

    const candyColors = [
        'url(photos/red-candy.png)',
        'url(photos/yellow-candy.png)',
        'url(photos/orange-candy.png)',
        'url(photos/purple-candy.png)',
        'url(photos/green-candy.png)',
        'url(photos/blue-candy.png)'

    ]

    function createBoard(){
        for (let i = 0; i < width*width; i++){
            const square = document.createElement('div')
            square.setAttribute('draggable', true)
            square.setAttribute('id', i)
            let randomColor = Math.floor(Math.random() * candyColors.length)
            square.style.backgroundImage = candyColors[randomColor]
            grid.append(square)
            squares.push(square)
        }
    }

    createBoard();


    let draggedColor
    let replacedColor
    let squareDraggedId
    let squareReplacedId


    squares.forEach(square => square.addEventListener('dragstart', dragStart))
    squares.forEach(square => square.addEventListener('dragend', dragEnd))
    squares.forEach(square => square.addEventListener('dragover', dragOver))
    squares.forEach(square => square.addEventListener('dragenter', dragEnter))
    squares.forEach(square => square.addEventListener('dragleave', dragLeave))
    squares.forEach(square => square.addEventListener('drop', dragDrop))


    function dragStart(){
        draggedColor = this.style.backgroundImage
        squareDraggedId = parseInt(this.id)
        console.log(draggedColor)
        console.log(this.id, 'dragstart')
    }

    function dragEnd(){
        console.log(this.id, 'dragend')
        let validMoves = [
            squareDraggedId - 1, 
            squareDraggedId - width, 
            squareDraggedId + 1,
            squareDraggedId + width
        ]

        let validMove = validMoves.includes(squareReplacedId)

        if(squareReplacedId && validMove){
            squareReplacedId = null
        } else if (squareReplacedId && !validMove){
            squares[squareReplacedId].style.backgroundImage = replacedColor
            squares[squareDraggedId].style.backgroundImage = draggedColor
        } else squares[squareDraggedId].style.backgroundImage = draggedColor
    }




    //drop candies
    function moveDown(){
        for(i = 0; i < 55; i++){
            if(squares[i+width].style.backgroundImage === ''){
                squares[i + width].style.backgroundImage = squares[i].style.backgroundImage
                squares[i].style.backgroundImage = ''
                const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
                const isFirstRow = firstRow.includes(i)
                if(isFirstRow && squares[i].style.backgroundImage === ''){
                    let randomColor = Math.floor(Math.random() * candyColors.length)
                    squares[i].style.backgroundImage = candyColors[randomColor]
                }
            }
        }
    }



    //four row of candies
    function checkFourRow(){
        for(i = 0; i < 60; i++){
            let fourRow = [i, i+1, i+2, i+3]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
            if(notValid.includes(i)) continue

            if(fourRow.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank))
            {   score += 4
                scoreDisplay.innerHTML= score
                fourRow.forEach(index => {
                squares[index].style.backgroundImage = ''
                })
        }
        }

    }
    checkFourRow()



    //four column of candies
    function checkFourColumn(){
        for(i = 0; i < 39; i++){
            let fourColumn = [i, i+width, i+width*2, i+width*3]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            if(fourColumn.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank))
            {   score += 4
                scoreDisplay.innerHTML= score
                fourColumn.forEach(index => {
                squares[index].style.backgroundImage = ''
                })
            }
        }

    }
    checkFourColumn()





    //three row of candies
    function checkThreeRow(){
        for(i = 0; i < 61; i++){
            let threeRow = [i, i+1, i+2]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
            if(notValid.includes(i)) continue

            if(threeRow.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank))
            {   score += 3
                scoreDisplay.innerHTML= score
                threeRow.forEach(index => {
                squares[index].style.backgroundImage = ''
                })
        }
        }

    }
    checkThreeRow()



    //three column of candies
    function checkThreeColumn(){
        for(i = 0; i < 47; i++){
            let threeColumn = [i, i+width, i+width*2]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            if(threeColumn.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank))
            {   score += 3
                scoreDisplay.innerHTML= score
                threeColumn.forEach(index => {
                squares[index].style.backgroundImage = ''
                })
        }
        }

    }
    checkThreeColumn()





    window.setInterval(function(){
        moveDown()
        checkFourRow()
        checkFourColumn()
        checkThreeRow()
        checkThreeColumn()
        
    }, 100)

    



    function dragOver(e){
        e.preventDefault()
        console.log(this.id, 'dragover')
    }

    function dragEnter(e){
        e.preventDefault()
        console.log(this.id, 'dragenter')
    }

    function dragLeave(){
        console.log(this.id, 'dragleave')
    }

    function dragDrop(){
        console.log(this.id, 'drop')
        replacedColor = this.style.backgroundImage
        squareReplacedId = parseInt(this.id)
        this.style.backgroundImage = draggedColor
        squares[squareDraggedId].style.backgroundImage = replacedColor
    }













})