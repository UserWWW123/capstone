const draggable_list = document.getElementById('draggable-list');
    const checkButton = document.getElementById('check');
    const resetButton = document.getElementById('reset');
    let codingSectionArray = [];

    const ifFunction = [
      'if (subject colliding object)',
      '{',
      '}',
      'block',
      'crate',
      'stairs',
      'closed door',
      'opened door',
      'move to right',
      'move up'
    ];

    // store listitems
    const listItems = [];

    let dragStartIndex;

    createList();

    // insert list items into DOM
    function createList() {
      [...ifFunction]
        .map(a => ({ value: a, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .forEach((block, index) => {
          const listItem = document.createElement('li');

          listItem.setAttribute('data-index', index);

          listItem.innerHTML = `
            <span class="number"></span>
            <div class="draggable" draggable="true">
              <p class="block-name">${block}</p>
            </div>
          `;

          listItems.push(listItem);

          draggable_list.appendChild(listItem);
        });

      addEventListeners();
    }

    function dragStart() {
      dragStartIndex = +this.closest('li').getAttribute('data-index'); //get the dragging element index
    }

    function dragEnter() {
      this.classList.add('over');
    }

    function dragLeave() {
      this.classList.remove('over');
    }

    function dragOver(e) {
      e.preventDefault();
    }

    function dragDrop(event) {
      event.preventDefault(); 
      const draggedItem = document.querySelector(`[data-index='${dragStartIndex}']`); //get the dragged element by using data-index attribute

      if (this.classList.contains('codingSection')) { //if droped into codingSection
        this.appendChild(draggedItem); 
        codingSectionArray.push(draggedItem.querySelector('.draggable').innerText.trim()); //get text content, remove start/end spaces, add to the array
      } else {
        const dragEndIndex = +this.getAttribute('data-index'); //get the dragging element data-index
        if (!isNaN(dragEndIndex)) { //check if it is a number, if dragEndIndex is a number...
          dropItems(dragStartIndex, dragEndIndex); //chance sequence
        }
      }
      this.classList.remove('over');
    }
    //swap items
    function dropItems(fromIndex, toIndex) {
      if (fromIndex === toIndex) return;

      const itemOne = listItems[fromIndex].querySelector('.draggable');
      const itemTwo = listItems[toIndex].querySelector('.draggable');

      listItems[fromIndex].appendChild(itemTwo);
      listItems[toIndex].appendChild(itemOne);

    }


    function addEventListeners() {
      const draggables = document.querySelectorAll('.draggable');
      const dragListItems = document.querySelectorAll('.draggable-list li');
      
      draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
      });

      dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
      });
    }

    const codingSection = document.querySelector('.codingSection');
    codingSection.addEventListener('dragover', dragOver);
    codingSection.addEventListener('drop', dragDrop);
    codingSection.addEventListener('dragenter', dragEnter);
    codingSection.addEventListener('dragleave', dragLeave);

    //click checkbox to check order
    checkButton.addEventListener('click', checkOrder);
