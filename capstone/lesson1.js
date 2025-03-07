function changePage(pageNumber) {
    let pages = document.querySelectorAll('.lessonMiddle');
    
    pages.forEach(page => {
        page.style.display = 'none';
    });

    let getPage = document.querySelector(`.lessonpage${pageNumber}`);
    if (getPage) {
        getPage.style.display = 'block';
    }
}

function checkAnswer(answer) {
    const response = document.getElementById('answer');
    if (answer === 'answer1') {
        response.innerHTML = "Correct!";
    } else {
        response.innerHTML = "Wrong!";
    }
}

function toggleNoteIframe(){
    let iframe = document.getElementById("noteIframe");
    if(iframe.style.display === "none" || iframe.style.display === ""){
        iframe.style.display = "block";
    } else {
        iframe.style.display = "none";
    }
}
